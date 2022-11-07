<?php

namespace NewfoldLabs\WP\Module\Patterns;

use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\Patterns\Permissions;
use NewfoldLabs\WP\Module\Patterns\Library\Admin as PatternsLibrary;

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

		// Module functionality goes here
		new LoadAssets();

	}

}
