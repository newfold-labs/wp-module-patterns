<?php

namespace NewfoldLabs\WP\Module\Patterns\Library;

use NewfoldLabs\WP\Module\Patterns\Data\Brands;
use NewfoldLabs\WP\Module\Patterns\Services\PluginService;

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

		\add_action( 'init', array( PluginService::class, 'setup' ) );
	}

	/**
	 * Load wonder block assets into the respective admin editor page and suppress the core patterns modal.
	 *
	 * @return void
	 */
	public static function load_wonder_blocks() {
		\add_action( 'enqueue_block_editor_assets', array( __CLASS__, 'register_assets' ) );
		self::register_block_patterns();
		\add_filter( 'admin_body_class', array( __CLASS__, 'add_admin_body_class' ) );
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
					'nonce'        => \wp_create_nonce( 'wp_rest' ),
					'nfdRestURL'   => \esc_url_raw( \rest_url( 'nfd-wonder-blocks/v1' ) ),
					'assets'       => \esc_url( NFD_WONDER_BLOCKS_URL . '/assets' ),
					'wpVer'        => \esc_html( get_bloginfo( 'version' ) ),
					'nfdWBVersion' => \esc_html( NFD_WONDER_BLOCKS_VERSION ),
					'brand'        => Brands::getCurrentBrand(),
				)
			);

			\wp_enqueue_script( 'nfd-wonder-blocks' );
			\wp_enqueue_style( 'nfd-wonder-blocks' );
		}
	}

	/**
	 * Register Block Patterns
	 */
	public static function register_block_patterns() {

		// Disable opening default WP Patterns modal on empty pages.
		$patterns = \WP_Block_Patterns_Registry::get_instance()->get_all_registered();

		foreach ( $patterns as $pattern ) {
			if ( ! empty( $pattern['blockTypes'] ) && in_array( 'core/post-content', $pattern['blockTypes'], true ) ) {
				\unregister_block_pattern( $pattern['name'] );
				$pattern['blockTypes'] = array_diff( $pattern['blockTypes'], array( 'core/post-content' ) );
				\register_block_pattern( $pattern['name'], $pattern );
			}
		}

		// Add WonderBlocks patterns.
		$wb_patterns = Items::get( 'patterns' );

		if ( is_array( $wb_patterns ) && ! empty( $wb_patterns ) ) {

			$wb_pattern_categories = Categories::get( 'patterns' );

			// Register WonderBlocks pattern categories.
			if ( is_array( $wb_pattern_categories ) && ! empty( $wb_pattern_categories ) ) {
				foreach ( $wb_pattern_categories as $category ) {
					register_block_pattern_category(
						'wonder-blocks-' . $category['title'],
						array( 'label' => 'WonderBlocks - ' . $category['label'] )
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

	/**
	 * Add custom admin class on block editor pages.
	 *
	 * @param string $classes Body classes.
	 * @return string
	 */
	public static function add_admin_body_class( $classes ) {
		$current_screen = get_current_screen();

		if ( method_exists( $current_screen, 'is_block_editor' ) && $current_screen->is_block_editor() ) {
			$classes .= ' nfd-wb--hide-theme-patterns';
		}

		return $classes;
	}
}
