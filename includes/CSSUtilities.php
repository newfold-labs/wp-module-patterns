<?php

namespace NewfoldLabs\WP\Module\Patterns;

use NewfoldLabs\WP\Module\Data\WonderBlocks\Requests\Fetch;
class CSSUtilities {
	
	/**
	 * The production base URL.
	 *
	 * @var string
	 */
	protected static $production_base_url = 'https://patterns.hiive.cloud';

	/**
	 * The local base URL.
	 *
	 * @var string
	 */
	protected static $local_base_url = 'http://localhost:8888';

	/**
	 * Constructor.
	 */
	public function __construct() {
		\add_action( 'enqueue_block_assets', array( $this, 'enqueue' ) );
		\add_action( 'enqueue_nfd_wonder_blocks_utilities', array( $this, 'enqueue' ) );
	}

	/**
	 * Enqueue assets used on front-end and back-end.
	 *
	 * @return void
	 */
	public function enqueue() {

		$base_url = $this->get_base_url();
		
		$remote_css = $base_url . '/assets/css/utilities.css';
		$remote_js  = $base_url . '/assets/js/utilities.js';

		$css_url = $this->is_valid_remote_file( $remote_css )
			? $remote_css
			: constant( 'NFD_WONDER_BLOCKS_URL' ) . '/assets/build/utilities.css';
		$css_version = $css_url === $remote_css
			? strtotime( 'midnight' )
			: constant( 'NFD_WONDER_BLOCKS_VERSION' );

		$js_url = $this->is_valid_remote_file( $remote_js )
			? $remote_js
			: constant( 'NFD_WONDER_BLOCKS_URL' ) . '/assets/build/utilities.js';
		$js_version = $js_url === $remote_js
			? strtotime( 'midnight' )
			: constant( 'NFD_WONDER_BLOCKS_VERSION' );

		\wp_register_style(
			'nfd-wonder-blocks-utilities',
			$css_url,
			array(),
			$css_version
		);

        \wp_register_script(
            'nfd-wonder-blocks-utilities',
            $js_url,
            array(),
            $js_version
        );

		\wp_enqueue_style( 'nfd-wonder-blocks-utilities' );
		\wp_enqueue_script( 'nfd-wonder-blocks-utilities' );

		\wp_add_inline_style( 'nfd-wonder-blocks-utilities', $this->get_inline_css() );
	}
	
	/**
	 * Generates inline CSS based on the current active theme.
	 *
	 * This function returns a set of CSS variables that are used to style the front-end 
	 * and editor based on the active theme. Different themes may define their own color, 
	 * font, and spacing presets, which are reflected in the generated CSS.
	 *
	 * @return string The generated CSS.
	 */
	private function get_inline_css() {

		$theme = \wp_get_theme()->get_template();
		$css   = '';

		if ( 'yith-wonder' === $theme ) {
			$css = "body, .editor-styles-wrapper {
                /* Colors */
                --wndb--color--primary: var(--wp--preset--color--primary);
                --wndb--color--secondary: var(--wp--preset--color--secondary);
				--wndb--color--body: var(--wp--preset--color--base);
                
				--wndb--p: var(--wp--preset--spacing--40);
                
                --wndb--text--sm: var(--wp--preset--font-size--x-small);
				--wndb--text--md: var(--wp--preset--font-size--normal);

                
				--nfd-cp-text-sm: var(--wp--preset--font-size--x-small, 0.875rem);
                --nfd-cp-text-lg: var(--wp--preset--font-size--medium, 1.625rem);
                --nfd-cp-text-huge: var(--wp--preset--font-size--huge, 2.25rem);
                
                --nfd-cp-bg-accent: var(--wp--preset--color--primary, #000);
                --nfd-cp-border-accent: var(--wp--preset--color--primary, #000);
				--nfd-cp-text-primary: var(--wp--preset--color--primary, #000);
                --nfd-cp-text-secondary: var(--wp--preset--color--secondary, #000);
			}";
		}

		if ( 'twentytwentytwo' === $theme ) {
			$css = "body, .editor-styles-wrapper {
				--nfd-cp-p-base: var(--wp--custom--spacing--outer, 0px);
                --nfd-cp-bg-accent: var(--wp--preset--color--primary, #000);
                --nfd-cp-border-accent: var(--wp--preset--color--primary, #000);
				--nfd-cp-text-primary: var(--wp--preset--color--primary, #000);
                --nfd-cp-text-secondary: var(--wp--preset--color--secondary, #000);
			}";
            
            $css = "body .is-layout-constrained:has(.wndb-container.is-layout-constrained) > .wndb-container.is-layout-constrained {
                width: 100%;
                max-width: unset;
            }";
		}
        
        if ( 'twentytwentythree' === $theme ) {
            $css = "body, .editor-styles-wrapper {
				--nfd-cp-p-base: var(--wp--style--root--padding-left);
                --nfd-cp-bg-accent: var(--wp--preset--color--secondary, #000);
                --nfd-cp-border-accent: var(--wp--preset--color--primary, #000);
                --nfd-cp-text-primary: var(--wp--preset--color--secondary, #000);
                --nfd-cp-text-secondary: var(--wp--preset--color--primary, #000);
				
            }";
        }
		
		return $css;
	}

	/**
	 * Check if a remote file is valid.
	 *
	 * Stores the resulting HTTP status (or "error") in a transient for 24 hours.
	 * {@see wp_remote_retrieve_response_code()} returns 200 even for redirects.
	 *
	 * @param string $url URL of the remote file.
	 */
	private function is_valid_remote_file( string $url ): bool {
		// Reverse the url because transient key length is limited and truncated and the unique part of the URL is its end.
		$transient_key = 'nfd_css_utilities_valid_' . strrev($url );

		$status_code = get_transient( $transient_key );

		if( false === $status_code || ! is_numeric( $status_code ) ) {

			$response = \wp_remote_head( $url, array( 'timeout' => 5 ) );

			$status_code = is_wp_error( $response )
				? 'error'
				: \wp_remote_retrieve_response_code( $response );

			set_transient( $transient_key, $status_code, constant( 'DAY_IN_SECONDS' ) );
		}

		return 200 === intval( $status_code );
	}

	/**
	 * Get the base URL
	 * 
	 * @return string The base URL.
	 */
	public function get_base_url(): string {
		if ( defined( 'NFD_DATA_WB_DEV_MODE' ) && constant( 'NFD_DATA_WB_DEV_MODE' ) ) {
			return self::$local_base_url;
		}

		return self::$production_base_url;
	}
}
