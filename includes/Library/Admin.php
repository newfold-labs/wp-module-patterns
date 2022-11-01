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
		$asset_file = NFD_PATTERNS_BUILD_DIR . '/patterns.asset.php';

		if ( is_readable( $asset_file ) ) {
			$asset = include_once $asset_file;

			\wp_register_script(
				'nfd-cloud-patterns',
				NFD_PATTERNS_BUILD_URL . '/patterns.js',
				array_merge( $asset['dependencies'], array() ),
				$asset['version'],
				true
			);

			\wp_register_style(
				'nfd-cloud-patterns',
				NFD_PATTERNS_BUILD_URL . '/patterns.css',
				array(),
				$asset['version']
			);
			
			\wp_localize_script(
				'nfd-cloud-patterns',
				'nfdCloudPatterns',
				array(
					'nonce' => \wp_create_nonce('wp_rest'),
					// 'baseUrl' => \esc_url_raw( rest_url( 'nfd-cloud-patterns/v1' ) ),
					'baseUrl' => 'http://localhost:3000',
				)
			);

			\wp_enqueue_script( 'nfd-cloud-patterns' );
			\wp_enqueue_style( 'nfd-cloud-patterns' );
		}
	}

}
