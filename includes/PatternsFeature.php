<?php

namespace NewfoldLabs\WP\Module\Patterns;

use NewfoldLabs\WP\Module\Patterns\Patterns;

use function NewfoldLabs\WP\ModuleLoader\container as getContainer;

/**
 * Child class for a feature
 *
 * Child classes should define a name property as the feature name for all API calls. This name will be used in the registry.
 * Child class naming convention is {FeatureName}Feature.
 */
class PatternsFeature extends \NewfoldLabs\WP\Module\Features\Feature {
	/**
	 * The feature name.
	 *
	 * @var string
	 */
	protected $name  = 'patterns';

	/**
	 * The feature value. Defaults to on.
	 *
	 * @var boolean
	 */
	protected $value = true;

	/**
	 * Initialize staging feature.
	 */
	public function initialize() {
		if ( function_exists( 'add_action' ) ) {

			// Register module
			add_action(
				'plugins_loaded',
				function () {
					$container = getContainer();
					// Set Global Constants.
                    if ( ! defined( 'NFD_WONDER_BLOCKS_VERSION' ) ) {
                        define( 'NFD_WONDER_BLOCKS_VERSION', '1.0.0' );
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
				}
			);
		}
	}
}
