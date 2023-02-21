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
		add_action( 'enqueue_block_editor_assets', array( __CLASS__, 'register_assets' ) );
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
					'nonce' => \wp_create_nonce('wp_rest'),
					// 'baseUrl' => \esc_url_raw( rest_url( 'nfd-wonder-blocks/v1' ) ),
					'restURL' => \esc_url_raw( rest_url( 'nfd-wonder-blocks/v1' ) ),
					// 'restURL' => 'http://localhost:3000',
				)
			);

			\wp_enqueue_script( 'nfd-wonder-blocks' );
			\wp_enqueue_style( 'nfd-wonder-blocks' );
		}
	}

}
