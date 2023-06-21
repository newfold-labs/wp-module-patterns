<?php

namespace NewfoldLabs\WP\Module\Patterns\Library;

/**
 * Admin library class
 */
final class Admin {
	/**
	 * Admin pages that require WonderBlock assets.
	 *
	 * @var array
	 */
	private static $admin_pages = array( 'page', 'post', 'page-new', 'post-new', 'site-editor' );

	/**
	 * Constructor.
	 */
	public function __construct() {
		foreach ( self::$admin_pages as $admin_page ) {
			\add_action( "load-{$admin_page}.php", array( __CLASS__, 'load_wonder_blocks' ) );
		}
	}

	/**
	 * Load wonder block assets into the respective admin editor page and suppress the core patterns modal.
	 *
	 * @return void
	 */
	public static function load_wonder_blocks() {
		\add_action( 'enqueue_block_editor_assets', array( __CLASS__, 'register_assets' ) );
		self::register_block_patterns();
	}

	/**
	 * Register assets.
	 */
	public static function register_assets() {
		$asset_file = NFD_WONDER_BLOCKS_BUILD_DIR . '/wonder-blocks.asset.php';

		if ( is_readable( $asset_file ) ) {
			$asset = include_once $asset_file;

			\wp_register_script(
				'nfd-wonder-blocks',
				NFD_WONDER_BLOCKS_BUILD_URL . '/wonder-blocks.js',
				array_merge( $asset['dependencies'], array() ),
				$asset['version'],
				true
			);

			\wp_register_style(
				'nfd-wonder-blocks',
				NFD_WONDER_BLOCKS_BUILD_URL . '/wonder-blocks.css',
				array(),
				$asset['version']
			);

			\wp_localize_script(
				'nfd-wonder-blocks',
				'nfdWonderBlocks',
				array(
					'nonce'      => \wp_create_nonce( 'wp_rest' ),
					'nfdRestURL' => \esc_url_raw( \rest_url( 'nfd-wonder-blocks/v1' ) ),
					'assets'     => \esc_url( NFD_WONDER_BLOCKS_URL . '/assets' ),
				)
			);

			\wp_enqueue_script( 'nfd-wonder-blocks' );
			\wp_enqueue_style( 'nfd-wonder-blocks' );
		}
	}

	/**
	 * Disable opening default WP Patterns modal on empty pages.
	 */
	public static function register_block_patterns() {

		$patterns = \WP_Block_Patterns_Registry::get_instance()->get_all_registered();

		foreach ( $patterns as $pattern ) {
			if ( ! empty( $pattern['blockTypes'] ) && in_array( 'core/post-content', $pattern['blockTypes'], true ) ) {
				\unregister_block_pattern( $pattern['name'] );
				$pattern['blockTypes'] = array_diff( $pattern['blockTypes'], array( 'core/post-content' ) );
				\register_block_pattern( $pattern['name'], $pattern );
			}
		}
	}
}
