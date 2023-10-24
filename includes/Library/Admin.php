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
					'assets'     => \esc_url( NFD_WONDER_BLOCKS_URL . '/assets' ),
					'wpVer'      => \esc_html( get_bloginfo( 'version' ) ),
				)
			);

			\wp_enqueue_script( 'nfd-wonder-blocks' );
			\wp_enqueue_style( 'nfd-wonder-blocks' );
		}
	}

	/**
	 * Register Block Patterns
	 */
	public function register_block_patterns() {

		// Disable opening default WP Patterns modal on empty pages.
		$patterns = \WP_Block_Patterns_Registry::get_instance()->get_all_registered();

		foreach ( $patterns as $pattern ) {
			if ( ! empty( $pattern['blockTypes'] ) && in_array( 'core/post-content', $pattern['blockTypes'], true ) ) {
				\unregister_block_pattern( $pattern['name'] );
				$pattern['blockTypes'] = array_diff( $pattern['blockTypes'], array( 'core/post-content' ) );
				\register_block_pattern( $pattern['name'], $pattern );
			}
		}

		// Remove Yith Wonder patterns.
		$all_registered_patterns = \WP_Block_Patterns_Registry::get_instance()->get_all_registered();
		foreach ( $all_registered_patterns as $pattern ) {
			if ( strpos( $pattern['name'], 'yith-wonder/' ) !== false && ! in_array( 'yith-wonder-pages', $pattern['categories'], true ) ) {
				\unregister_block_pattern( $pattern['name'] );
			}
		}

		// Add Wonder Blocks patterns.
		$wb_patterns = Items::get_data_from_transients( 'patterns' );

		if ( is_array( $wb_patterns ) && ! empty( $wb_patterns ) ) {

			$wb_pattern_categories = \get_transient( 'wba_patterns_categories' );

			// Register Wonder Blocks pattern categories.
			if ( is_array( $wb_pattern_categories ) && ! empty( $wb_pattern_categories ) ) {
				foreach ( $wb_pattern_categories as $category ) {
					register_block_pattern_category(
						'wonder-blocks-' . $category['title'],
						array( 'label' => 'Wonder Blocks - ' . $category['label'] )
					);
				}
			}

			foreach ( $wb_patterns as $pattern ) {

				$categories = array();

				// Build categories array.
				if ( is_array( $pattern['categories'] ) && ! empty( $pattern['categories'] ) ) {
					foreach ( $pattern['categories'] as $category ) {
						$categories[] = 'wonder-blocks-' . $category;
					}
				} elseif ( is_string( $pattern['categories'] ) ) {
					$categories[] = 'wonder-blocks-' . $pattern['categories'];
				}

				\register_block_pattern(
					'wonder-blocks/' . $pattern['title'],
					array(
						'title'       => $pattern['title'],
						'content'     => $pattern['content'],
						'description' => $pattern['title'],
						'categories'  => $categories,
					)
				);
			}
		}
	}
}
