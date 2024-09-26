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
		
		$css_url = $this->get_asset_url($remote_css, NFD_WONDER_BLOCKS_URL . '/assets/build/utilities.css');
		$css_version = $this->get_asset_version($remote_css);

		$js_url = $this->get_asset_url($remote_js, NFD_WONDER_BLOCKS_URL . '/assets/build/utilities.js');
		$js_version = $this->get_asset_version($remote_js);

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
	 * Get the URL for the asset, checking if the remote URL is valid.
	 *
	 * @param string $remote_url The remote URL for the asset.
	 * @param string $fallback_url The fallback URL if the remote asset is invalid.
	 * @return string The valid URL for the asset.
	 */
	private function get_asset_url( string $remote_url, string $fallback_url ) : string {
		return $this->is_valid_remote_file( $remote_url ) ? $remote_url : $fallback_url;
	}

	/**
	 * Get the version number for the asset, either from remote or fallback.
	 *
	 * @param string $remote_url The remote URL for the asset.
	 * @return int|string The version number.
	 */
	private function get_asset_version( string $remote_url ) {
		return $this->is_valid_remote_file( $remote_url ) ? $this->get_remote_assets_version() : NFD_WONDER_BLOCKS_VERSION;
	}
	
	/**
	 * Check if a remote file is valid.
	 *
	 * @param string $url URL of the remote file.
	 *
	 * @return bool
	 */
	private function is_valid_remote_file( string $url ): bool {
		$response = \wp_remote_get( $url, array( 'timeout' => 5 ) );
		if ( is_wp_error( $response ) ) {
			return false;
		}

		$status_code = \wp_remote_retrieve_response_code( $response );
		return $status_code === 200;
	}
	
	/**
	 * Get the version number for remote assets.
	 *
	 * @return int The version number.
	 */
	private function get_remote_assets_version() : int {
		$version = get_transient('nfd_utilities_version');
		
		if ( ! $version ) {
			$version = time();
			set_transient('nfd_utilities_version', $version, DAY_IN_SECONDS);
		}
		
		return $version;
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
