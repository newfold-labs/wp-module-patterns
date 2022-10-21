<?php
/**
 * Newfold Labs WordPress Patterns Module.
 */

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
			'label'    => __( 'Patterns', 'nfd-wp-module-patterns' ),
			'callback' => function ( Container $container ) {

				new Patterns( $container );
			},
			'isActive' => true,
			'isHidden' => true,
		)
	);
}

/**
 * Tap WordPress Hooks to Instantiate Module Loader
 */
if ( is_callable( 'add_action' ) ) {
	add_action( 'plugins_loaded', 'nfd_wp_module_patterns_register' );
}
