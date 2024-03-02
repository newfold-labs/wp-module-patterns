<?php

namespace NewfoldLabs\WP\Module\Patterns;

use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\Patterns\Permissions;
use NewfoldLabs\WP\Module\Patterns\Library\Admin as PatternsLibrary;
use NewfoldLabs\WP\Module\Patterns\Api\RestApi;
use NewfoldLabs\WP\Module\Patterns\Admin\CTA;

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

		if (! $this->is_eligible() ) {
			return; 
		}

		if ( Permissions::is_editor() ) {
			new PatternsLibrary();
			new CTA();
		}

		new CSSUtilities();
		new RestApi();
	}

	/**
	 * Checks capabilities API or PHP constant for eligibility
	 *
	 * @return boolean
	 */
	protected function is_eligible() {
		$enabled_by_constant = defined('\\NFD_WONDER_BLOCKS_ELIGIBLE') && true === \NFD_WONDER_BLOCKS_ELIGIBLE;
		$enabled_by_capability = $this->container->get('capabilities')->get('canAccessWonderBlocks');

		if( $enabled_by_constant || $enabled_by_capability ) {
			return true;
		}

		return false;
	}
}
