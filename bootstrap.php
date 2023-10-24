<?php
use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\Patterns\Patterns;
use function NewfoldLabs\WP\ModuleLoader\register;

/**
 * Register patterns module with Newfold Labs Module Loader.
 */
function nfd_wp_module_patterns_register() {
	register(
		array(
			'name'     => 'wp-module-patterns',
			'label'    => __( 'Patterns & Templates', 'nfd-wp-module-patterns' ),
			'callback' => function ( Container $container ) {

				// Set Global Constants.
				if ( ! defined( 'NFD_WONDER_BLOCKS_VERSION' ) ) {
					define( 'NFD_WONDER_BLOCKS_VERSION', '0.1.8' );
				}
				if ( ! defined( 'NFD_WONDER_BLOCKS_DIR' ) ) {
					define( 'NFD_WONDER_BLOCKS_DIR', __DIR__ );
				}
				if ( ! defined( 'NFD_WONDER_BLOCKS_BUILD_DIR' ) && defined( 'NFD_WONDER_BLOCKS_VERSION' ) ) {
					define( 'NFD_WONDER_BLOCKS_BUILD_DIR', __DIR__ . '/build/' . NFD_WONDER_BLOCKS_VERSION );
				}
				if ( ! defined( 'NFD_WONDER_BLOCKS_BUILD_URL' ) && defined( 'NFD_WONDER_BLOCKS_VERSION' ) ) {
					define( 'NFD_WONDER_BLOCKS_BUILD_URL', $container->plugin()->url . 'vendor/newfold-labs/wp-module-patterns/build/' . NFD_WONDER_BLOCKS_VERSION );
				}
				if ( ! defined( 'NFD_WONDER_BLOCKS_URL' ) ) {
					define( 'NFD_WONDER_BLOCKS_URL', $container->plugin()->url . 'vendor/newfold-labs/wp-module-patterns' );
				}
				if ( ! defined( 'NFD_MODULE_DATA_EVENTS_API' ) ) {
					define( 'NFD_MODULE_DATA_EVENTS_API', '/newfold-data/v1/events' );
				}

				new Patterns( $container );
			},
			'isActive' => true,
			'isHidden' => true,
		)
	);
}

/**
 * Tap WordPress Hooks to instantiate Module Loader.
 */
if ( is_callable( 'add_action' ) ) {
	add_action( 'plugins_loaded', 'nfd_wp_module_patterns_register' );
}
