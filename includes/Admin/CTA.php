<?php

namespace NewfoldLabs\WP\Module\Patterns\Admin;

/**
 * CTA for the edit pages screen.
 */
class CTA {

	/**
	 * Constructor.
	 */
	public function __construct() {

		if ( ! $this->is_edit_page_screen() ) {
			return;
		}

		\add_action( 'admin_footer', array( $this, 'add_cta_to_add_new_button' ) );
		\add_action( 'admin_head', array( $this, 'add_style' ) );
	}

	/**
	 * Add custom HTML to the Add New button on the Pages screen.
	 */
	public function add_cta_to_add_new_button() {
		$cta_text = sprintf(
			// Translators: %1$s is the opening anchor tag, %2$s is the closing anchor tag.
			__( 'Create pages fast with the %1$sPattern Library%2$s.', 'nfd-wonder-blocks' ),
			'<a href=\"' . \esc_url( \admin_url( 'post-new.php?post_type=page&wonder-blocks-library=templates' ) ) . '\">',
			'</a>'
		);

		?>
		<script>
			document.addEventListener('DOMContentLoaded', function() {
				let pageTitleAction = document.querySelector('.wrap .page-title-action');
				if (pageTitleAction) {
					let newElement = document.createElement('span');
					newElement.innerHTML = "<?php echo $cta_text; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>"; 
					newElement.classList.add('nfd-wba-cta-edit-screen');
					pageTitleAction.insertAdjacentElement('afterend', newElement);
				}
			});
		</script>
		<?php
	}

	/**
	 * Add a style tag to the head of the edit pages screen.
	 */
	public function add_style() {
		?>
		<style>
			:root {
				--nfd-wba-cta-text-color: #1e1e1e;
			}

			.nfd-wba-cta-edit-screen {
				font-size: 16px;
				line-height: 19px;
				top: -3px;
				position: relative;
				margin-left: 16px;
				color: var(--nfd-wba-cta-text-color);
			}

			.nfd-wba-cta-edit-screen a {
				text-decoration: none;
			}

			@media only screen and (max-width: 960px) {
				.nfd-wba-cta-edit-screen {
					display: block;
					margin-left: 0;
					margin-top: 8px;
				}
			}
		</style>
		<?php
	}

	/**
	 * Check if the current page is the edit pages screen.
	 *
	 * @return bool
	 */
	private function is_edit_page_screen() {
		global $pagenow;

		return 'edit.php' === $pagenow && isset( $_GET['post_type'] ) && 'page' === $_GET['post_type']; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
	}
}
