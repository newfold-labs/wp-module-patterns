<?php

namespace NewfoldLabs\WP\Module\Patterns;

use NewfoldLabs\WP\ModuleLoader\Container;

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
	protected $name = 'patterns';

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
					$this->defineConstants( $container );
					new Patterns( $container );
				}
			);
		}
	}

	/**
	 * Define constnats that require container values
	 */
	public function defineConstants( Container $container ) {
		if ( ! defined( 'NFD_WONDER_BLOCKS_BUILD_URL' ) && defined( 'NFD_WONDER_BLOCKS_VERSION' ) ) {
			define(
				'NFD_WONDER_BLOCKS_BUILD_URL',
				$container->plugin()->url . 'vendor/newfold-labs/wp-module-patterns/build/' . NFD_WONDER_BLOCKS_VERSION
			);
		}
		if ( ! defined( 'NFD_WONDER_BLOCKS_URL' ) ) {
			define(
				'NFD_WONDER_BLOCKS_URL',
				$container->plugin()->url . 'vendor/newfold-labs/wp-module-patterns'
			);
		}
	}
}
