<?php

namespace NewfoldLabs\WP\Module\Patterns\Library;

/**
 * Admin library class
 */
final class Admin {

	/**
	 * Constructor.
	 */
	public function __construct() {
		\add_action( 'enqueue_block_editor_assets', array( __CLASS__, 'register_assets' ) );
		\add_action( 'init', array( $this, 'register_block_patterns' ) );
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
					// 'supportURL' => \esc_url_raw( 'https://newfoldlabs.com/support' ),
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
	public function register_block_patterns() {

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
