<?php

namespace NewfoldLabs\WP\Module\Patterns;

class CSSUtilities {
	
	/**
	 * The single instance of the class.
	 *
	 * @var CSSUtilities|null
	 */
	private static $instance = null;

	/**
	 * The production base URL.
	 *
	 * @var string
	 */
	protected static $production_base_url = 'https://patterns.hiive.cloud/cdn';

	/**
	 * The local base URL.
	 *
	 * @var string
	 */
	protected static $local_base_url = 'http://localhost:8888';

	/**
	 * Get the single instance of the class.
	 *
	 * @return CSSUtilities The instance of the class.
	 */
	public static function get_instance(): CSSUtilities {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor.
	 */
	private function __construct() {

		if ( \is_admin() ) {
			\add_action( 'enqueue_block_assets', array( $this, 'enqueue' ) );
		} else {
			\add_action( 'wp_enqueue_scripts', array( $this, 'enqueue' ) );
		}

		\add_action( 'enqueue_nfd_wonder_blocks_utilities', array( $this, 'enqueue' ) );
	}

	/**
	 * Enqueue assets used on front-end and back-end.
	 *
	 * @return void
	 */
	public function enqueue() {
		// Skip if the current page is the onboarding page to prevent conflicts with the onboarding styling.
		if ( isset( $_GET['page'] ) && stripos( \sanitize_text_field( $_GET['page'] ), 'nfd-onboarding' ) === 0 ) {
			return;
		}

		// Refresh assets if 24 hours have passed since the last refresh.
		$this->conditional_refresh_assets();
		
		$css_content = $this->get_asset_content( 'utilities_css' );
		$js_content  = $this->get_asset_content( 'utilities_js' );
		
		if ( $css_content ) {
			\wp_register_style( 'nfd-wonder-blocks-utilities', false );
			\wp_enqueue_style( 'nfd-wonder-blocks-utilities');
			\wp_add_inline_style( 'nfd-wonder-blocks-utilities', $css_content );
		} else {
			\wp_enqueue_style(
				'nfd-wonder-blocks-utilities',
				constant( 'NFD_WONDER_BLOCKS_URL' ) . '/assets/build/utilities.css',
				array(),
				constant( 'NFD_WONDER_BLOCKS_VERSION' )
			);
		}
		
		if ( $js_content ) {
			\wp_register_script( 'nfd-wonder-blocks-utilities', false );
			\wp_enqueue_script( 'nfd-wonder-blocks-utilities' );
			\wp_add_inline_script( 'nfd-wonder-blocks-utilities', $js_content );
		} else {
			\wp_enqueue_script(
				'nfd-wonder-blocks-utilities',
				constant( 'NFD_WONDER_BLOCKS_URL' ) . '/assets/build/utilities.js',
				array(),
				constant( 'NFD_WONDER_BLOCKS_VERSION' )
			);
		}

		\wp_add_inline_style( 'nfd-wonder-blocks-utilities', $this->get_inline_css() );
	}
	
	/**
	 * Get the content of an asset.
	 *
	 * @param string $asset The asset to get the content of.
	 * @return string The content of the asset.
	 */
	private function get_asset_content( string $option_key ) {
		$sanitized_key = \sanitize_key( 'nfd_' . $option_key );
		return \wp_unslash( \get_option( $sanitized_key, false ) );
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

		if ( 'bluehost-blueprint' === $theme ) {
			$css = "body, .editor-styles-wrapper {
				--wndb--color--primary: var(--wp--preset--color--accent-2);
				--wndb--color--secondary: var(--wp--preset--color--accent-5);
				--wndb--color--tertiary: var(--wp--preset--color--accent-3);
				--wndb--color--body: var(--wp--preset--color--base);
				--wndb--color--text: var(--wp-preset--color--contrast);
				--wndb--color--text--contrast: var(--wp--preset--color--contrast);
				--wndb--color--text--faded: color-mix(in srgb, var(--wp--preset--color--contrast), transparent 20%);
				--wndb--color--surface: var(--wp--preset--color--base-midtone);

				--wndb--text--sm: var(--wp--preset--font-size--small);

				--wndb--p--xs: var(--wp--preset--spacing--20);
				--wndb--p--sm: var(--wp--preset--spacing--40);
				--wndb--p--md: var(--wp--preset--spacing--60);
				--wndb--p--lg: var(--wp--preset--spacing--80);

				--wndb--max-w--prose: 650px;
			}";
		}

		if ( 'yith-wonder' === $theme ) {
			$css = "body, .editor-styles-wrapper {
                --wndb--color--primary: var(--wp--preset--color--primary);
                --wndb--color--secondary: var(--wp--preset--color--secondary);
				--wndb--color--body: var(--wp--preset--color--base);
				--wndb--p: var(--wp--preset--spacing--40);
                --wndb--text--sm: var(--wp--preset--font-size--x-small);
				--wndb--text--md: var(--wp--preset--font-size--normal);
			}";
		}
		
		return $css;
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

	/**
	 * Conditionally refresh CSS and JS assets from remote sources if 24 hours have passed.
	 *
	 * @return void
	 */
	public function conditional_refresh_assets() {
		$last_refresh = \get_option( 'nfd_utilities_last_refresh_time', 0 );
		$current_time = time();
		
		if ( ( $current_time - $last_refresh ) > DAY_IN_SECONDS || ( defined( 'NFD_DATA_WB_DEV_MODE' ) && constant( 'NFD_DATA_WB_DEV_MODE' ) ) ) {
			$this->refresh_assets();
			\update_option( 'nfd_utilities_last_refresh_time', $current_time );
		}
	}

	/**
	 * Refresh CSS and JS assets from remote sources.
	 * This method can be manually triggered by other actions or hooks as needed.
	 *
	 * @return void
	 */
	public function refresh_assets() {
		$this->fetch_and_store_asset( '/assets/css/utilities.css', 'utilities_css' );
		$this->fetch_and_store_asset( '/assets/js/utilities.js', 'utilities_js' );
	}

	/**
	 * Fetch and store the asset content in the database with minification.
	 *
	 * @param string $path The path of the remote asset.
	 * @param string $option_key The option key to store the content.
	 *
	 * @return void
	 */
	private function fetch_and_store_asset( string $path, string $option_key ) {
		$base_url = $this->get_base_url();
		$url = \esc_url_raw( $base_url . $path );

		$response = \wp_remote_get( $url );
		
		if ( ! \is_wp_error( $response ) && 200 === \wp_remote_retrieve_response_code( $response ) ) {
			$content = \wp_remote_retrieve_body( $response );
			$sanitized_key = \sanitize_key( 'nfd_' . $option_key );
			\update_option( $sanitized_key, \wp_slash( $content ) );
		}
	}
}
