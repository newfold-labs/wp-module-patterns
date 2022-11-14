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
	}
	
	private function get_inline_css() {
		
		$theme = \wp_get_theme()->get_template();
		$css   = '';

		if ( 'yith-wonder' === $theme ) {
			$css = "body, .editor-styles-wrapper {
				--nfd-cp-text-sm: var(--wp--preset--font-size--x-small, var(--nfd-cp-text-sm--default));
				--nfd-cp-text-md: var(--wp--preset--font-size--normal, var(--nfd-cp-text-md--default));
				--nfd-cp-text-huge: var(--wp--preset--font-size--huge, var(--nfd-cp-text-huge--default));
				--nfd-cp-gap-y: var(--wp--custom--vertical-spacing, 0px);
			}";
		}

		if ( 'twentytwentytwo' === $theme ) {
			$css = "body, .editor-styles-wrapper {
				--nfd-cp-text-md: var(--wp--preset--font-size--medium, var(--nfd-cp-text-md--default));
				--nfd-cp-gap-y: var(--wp--custom--vertical-spacing, 0px);
			}";
		}
		
		return $css;
	}
}
