<?php

namespace NewfoldLabs\WP\Module\Patterns;

use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\Patterns\Permissions;
use NewfoldLabs\WP\Module\Patterns\Library\Admin as PatternsLibrary;
use NewfoldLabs\WP\Module\Patterns\Api\RestApi;
use NewfoldLabs\WP\Module\Patterns\Admin\CTA;
use NewfoldLabs\WP\Module\Patterns\BlockStyles;

/**
 * Patterns module.
 */
class Patterns {

	/**
	 * Dependency injection container.
	 *
	 * @var Container
	 */
	protected $container;

	/**
	 * Constructor.
	 *
	 * @param Container $container Dependency injection container.
	 */
	public function __construct( Container $container ) {

		$this->container = $container;

		if ( Permissions::is_editor() ) {
			new PatternsLibrary();
			new CTA();
		}

		CSSUtilities::get_instance();

		new RestApi();
		new BlockStyles();
	}
}
