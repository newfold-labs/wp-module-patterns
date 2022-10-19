<?php

use NewfoldLabs\WP\ModuleLoader\Container;
use function NewfoldLabs\WP\ModuleLoader\register;

if ( function_exists( 'add_action' ) ) {

	add_action(
		'plugins_loaded',
		function () {

			register(
				[
					'name'     => 'wp-module-patterns',
					'label'    => __( 'wp module patterns', 'newfold-wp-module-patterns-module' ),
					'callback' => function ( Container $container ) {
						new WpModulePatterns( $container );
					},
					'isActive' => true,
					'isHidden' => true,
				]
			);

		}
	);

}
