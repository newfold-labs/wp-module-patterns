<?php
namespace NewfoldLabs\WP\Module\Patterns\Admin;

/**
 * CTA for the edit pages screen.
 */
class CTA {

    /**
     * WordPress option name for posts
     */
    const POST_OPTION_NAME = 'nfd_wb_cta_enabled_posts';

    /**
     * WordPress option name for pages
     */
    const PAGE_OPTION_NAME = 'nfd_wb_cta_enabled_pages';

    /**
     * Nonce action name
     */
    const NONCE_ACTION = 'nfd_wonderblocks_toggle';

    /**
     * Constructor.
     */
    public function __construct() {
        // Initialize options if they don't exist
        $this->maybe_init_options();

        // Global AJAX handler registration
        add_action('wp_ajax_toggle_wonderblocks_cta', array($this, 'handle_ajax_toggle'));

        if (!$this->is_core_post_type()) {
            return;
        }

        add_action('admin_head', array($this, 'add_style'));
        add_action('admin_footer', array($this, 'add_toggle_script'));
        add_action('admin_footer', array($this, 'add_cta_to_add_new_button'));
        add_filter('screen_settings', array($this, 'add_screen_option_html'), 10, 2);
    }

    /**
     * Initialize options if they don't exist
     */
    private function maybe_init_options() {
        if (false === get_option(self::POST_OPTION_NAME)) {
            add_option(self::POST_OPTION_NAME, true);
        }
        if (false === get_option(self::PAGE_OPTION_NAME)) {
            add_option(self::PAGE_OPTION_NAME, true);
        }
    }

    /**
     * Get the appropriate option name based on screen
     */
    private function get_option_name_for_screen($screen_id) {
        return $screen_id === 'edit-page' ? self::PAGE_OPTION_NAME : self::POST_OPTION_NAME;
    }

    /**
     * Handle the AJAX toggle
     */
    public function handle_ajax_toggle() {
        check_ajax_referer(self::NONCE_ACTION, 'nonce');

        if (!current_user_can('manage_options')) {
            wp_die('', '', 403);
        }

        $screen_id = isset($_POST['screen_id']) ? sanitize_text_field($_POST['screen_id']) : 'edit-post';
        $enabled = (bool) ($_POST['enabled'] === 'true');
        $option_name = $this->get_option_name_for_screen($screen_id);

        $updated = update_option($option_name, $enabled);

        if ($updated) {
            wp_send_json_success([
                'enabled' => $enabled,
                'option_name' => $option_name,
                'screen_id' => $screen_id
            ]);
        } else {
            wp_send_json_error('Failed to update option');
        }
    }

    /**
     * Add the screen option HTML
     */
    public function add_screen_option_html($settings, $screen) {
        if (!in_array($screen->id, array('edit-page', 'edit-post'), true)) {
            return $settings;
        }

        $option_name = $this->get_option_name_for_screen($screen->id);
        $enabled = get_option($option_name);

        $html = '<fieldset class="metabox-prefs wonderblocks">';
        $html .= '<legend>' . esc_html__('WonderBlocks', 'nfd-wonder-blocks') . '</legend>';
        $html .= '<label>';
        $html .= '<input type="checkbox" id="wonderblocks-toggle"' . checked($enabled, true, false) . ' /> ';
        $html .= esc_html__('Show WonderBlocks Button', 'nfd-wonder-blocks');
        $html .= '</label>';
        $html .= '</fieldset>';
        $html .= wp_nonce_field(self::NONCE_ACTION, 'wonderblocks_nonce', true, false);

        $allowed_html = array(
            'fieldset' => array(
                'class' => true,
            ),
            'legend' => array(),
            'label' => array(),
            'input' => array(
                'type' => true,
                'id' => true,
                'checked' => true,
                'name' => true,
                'value' => true,
            ),
        );

        return wp_kses($settings . $html, $allowed_html);
    }

    /**
     * Add toggle script to footer
     */
    public function add_toggle_script() {
        $screen = \get_current_screen();
        ?>
        <script>
            jQuery(document).ready(function($) {
                $('#wonderblocks-toggle').on('change', function() {
                    const enabled = this.checked ? 'true' : 'false';
                    $.post(ajaxurl, {
                        action: 'toggle_wonderblocks_cta',
                        nonce: $('#wonderblocks_nonce').val(),
                        enabled: enabled,
                        screen_id: '<?php echo esc_js($screen->id); ?>'
                    })
                    .done(function(response) {
                        if (response.success) {
                            window.location.reload();
                        } else {
                            $('#wonderblocks-toggle').prop('checked', !this.checked);
                            console.error('Failed to update WonderBlocks setting:', response);
                        }
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        $('#wonderblocks-toggle').prop('checked', !this.checked);
                        console.error('AJAX request failed:', textStatus, errorThrown);
                    });
                });
            });
        </script>
        <?php
    }

    /**
     * Add CTA to Add New button
     */
    public function add_cta_to_add_new_button() {
        $screen = \get_current_screen();
        $option_name = $this->get_option_name_for_screen($screen->id);
        $enabled = get_option($option_name);
        
        if (!$enabled) {
            return;
        }

        // Set the URL based on screen type
        if ($screen->id === 'edit-post') {
            $url = admin_url('post-new.php?wb-library=patterns&wb-category=text');
        } elseif ($screen->id === 'edit-page') {
            $url = admin_url('post-new.php?post_type=page&wb-library=patterns&wb-category=features');
        } else {
            // Default fallback URL
            $url = admin_url('post-new.php?wb-library=patterns');
        }

        $svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="2.25 6 19.5 13.5" width="19px" height="19px"><path stroke-linecap="round" stroke-linejoin="round" d="M3.34 7.754c0-.552.447-.999.999-.999h5.328a1 1 0 0 1 .999.999v3.329a1 1 0 0 1-.999.999H4.339a.999.999 0 0 1-.999-.999V7.754Zm10.655 1.331a1 1 0 0 1 .999-.998h4.662c.552 0 .999.447.999.998v7.326a.999.999 0 0 1-.999.999h-4.662a1 1 0 0 1-.999-.999V9.085Zm-9.323 6.66a1 1 0 0 1 .998-.999h4.662a1 1 0 0 1 .999.999v1.998a1 1 0 0 1-.999.999H5.67a1 1 0 0 1-.998-.999v-1.998Z" style="fill:none;stroke-width:1.5px;paint-order:stroke;stroke:currentColor"/></svg>';

        $cta_text = sprintf(
            __('%1$sAdd With WonderBlocks%2$s', 'nfd-wonder-blocks'),
            '<a class="page-title-action" href="' . esc_url($url) . '">' . $svg . '<span class="text">',
            '</span></a>'
        );

        ?>
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                const pageTitleAction = document.querySelector('.wrap .page-title-action');
                if (pageTitleAction) {
                    const newElement = document.createElement('div');
                    newElement.innerHTML = <?php echo wp_json_encode($cta_text); ?>;
                    newElement.classList.add('nfd-wba-cta-edit-screen');
                    pageTitleAction.insertAdjacentElement('afterend', newElement);
                }
            });
        </script>
        <?php
    }

    /**
     * Add styles for the CTA
     */
    public function add_style() {
        ?>
        <style>
            .nfd-wba-cta-edit-screen {
                display: inline-flex;
            }
            .nfd-wba-cta-edit-screen .page-title-action {
                align-items: center;
                border-color: #3d7e29;
                color: #3d7e29;
            }
            .nfd-wba-cta-edit-screen .page-title-action:hover,
            .nfd-wba-cta-edit-screen .page-title-action:active {
                border-color: #2f621f;
                color: #2f621f;
            }
            .nfd-wba-cta-edit-screen .page-title-action:focus {
                border-color: #2f621f;
                box-shadow: 0 0 0 1px #2f621f;
            }
            .nfd-wba-cta-edit-screen svg {
                margin-right: 5px;
                position: relative;
                top: 4px;
            }
			@media only screen and (max-width: 433px) {
				.nfd-wba-cta-edit-screen {
					margin-top: 6px;
				}
			}
        </style>
        <?php
    }

    /**
     * Check if we're on the edit pages screen
     */
    private function is_core_post_type() {
        if (!is_admin() || !is_user_logged_in()) {
            return false;
        }

        global $pagenow, $typenow;
        
        $is_core_post_type = ('edit.php' === $pagenow && (
            // Default post type (no post_type parameter)
            (!isset($_GET['post_type']) && empty($typenow)) ||
            // Explicit post type check
            (isset($_GET['post_type']) && in_array($_GET['post_type'], array('post', 'page'), true)) ||
            // Fallback to typenow
            in_array($typenow, array('post', 'page'), true)
        ));
        
        return $is_core_post_type;
    }
}