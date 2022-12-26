<?php

namespace NewfoldLabs\WP\Module\Patterns;

class LoadAssets {

	/**
	 * Constructor.
	 */
	public function __construct() {
		\add_action( 'wp_enqueue_scripts', array( $this, 'enqueue' ) );
		\add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue' ) );
	}

	/**
	 * Enqueue assets used on front-end and back-end.
	 *
	 * @return void
	 */
	public function enqueue() {

		\wp_register_style( 
			'nfd-patterns-utilities',
			NFD_PATTERNS_URL . '/assets/styles/utilities.css',
			array(),
			NFD_PATTERNS_VERSION
		);

		\wp_enqueue_style( 'nfd-patterns-utilities' );
		
		\wp_add_inline_style( 'nfd-patterns-utilities', $this->get_inline_css() );
	}
	
	private function get_inline_css() {
		
		$theme = \wp_get_theme()->get_template();
		$css   = '';

		if ( 'yith-wonder' === $theme ) {
			$css = "body, .editor-styles-wrapper {
				--nfd-cp-text-sm: var(--wp--preset--font-size--x-small, var(--nfd-cp-text-sm--default));
				--nfd-cp-text-huge: var(--wp--preset--font-size--huge, var(--nfd-cp-text-huge--default));
				--nfd-cp-gap-y: var(--wp--custom--vertical-spacing, 0px);
                
                --nfd-cp-bg-accent: var(--wp--preset--color--primary, #000);
                --nfd-cp-border-accent: var(--wp--preset--color--primary, #000);
				--nfd-cp-text-primary: var(--wp--preset--color--primary, #000);
                --nfd-cp-text-secondary: var(--wp--preset--color--secondary, #000);
				
				/* Final */
				--nfd-cp-spacing-x-lg: clamp(2.375rem, 7vw, 6.25rem);
				--nfd-cp-spacing-x-md: clamp(2.375rem, 7vw, 3.5rem);
			}";
		}

		if ( 'twentytwentytwo' === $theme ) {
			$css = "body, .editor-styles-wrapper {
				--nfd-cp-gap-y: var(--wp--custom--vertical-spacing, 0px);
               
                --nfd-cp-bg-accent: var(--wp--preset--color--primary, #000);
                --nfd-cp-border-accent: var(--wp--preset--color--primary, #000);
				--nfd-cp-text-primary: var(--wp--preset--color--primary, #000);
                --nfd-cp-text-secondary: var(--wp--preset--color--secondary, #000);
                
				--nfd-cp-container: var(--wp--style--global--wide-size, 1140px);
			}";
		}
        
        if ( 'twentytwentythree' === $theme ) {
            $css = "body, .editor-styles-wrapper {
                --nfd-cp-bg-accent: var(--wp--preset--color--secondary, #000);
                --nfd-cp-border-accent: var(--wp--preset--color--primary, #000);
                --nfd-cp-text-primary: var(--wp--preset--color--secondary, #000);
                --nfd-cp-text-secondary: var(--wp--preset--color--primary, #000);
            }";
        }
		
		return $css;
	}
}
