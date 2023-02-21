<?php

namespace NewfoldLabs\WP\Module\Patterns;

use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\Patterns\Permissions;
use NewfoldLabs\WP\Module\Patterns\Library\Admin as PatternsLibrary;
use NewfoldLabs\WP\Module\Patterns\Api\RestApi;

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
	 * @param Container $container
	 */
	public function __construct( Container $container ) {

		$this->container = $container;

		if ( Permissions::is_editor() ) {
			new PatternsLibrary();
		}

		new CSSUtilities();

		new RestApi();
	}
}
