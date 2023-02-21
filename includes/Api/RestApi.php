<?php

namespace NewfoldLabs\WP\Module\Patterns\Api;

use NewfoldLabs\WP\Module\Patterns\Api\Controllers\PatternCategoriesController;
use NewfoldLabs\WP\Module\Patterns\Api\Controllers\PatternsController;
use NewfoldLabs\WP\Module\Patterns\Api\Controllers\RestApiController;
use NewfoldLabs\WP\Module\Patterns\Api\Controllers\TemplateCategoriesController;

/**
 * Instantiate controllers and register routes.
 */
final class RestApi {
	
	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}
	
	/**
	 * Register routes.
	 */
	public function register_routes() {
		RestApiController::get( '/categories', array( PatternCategoriesController::class, 'index' ) );
		RestApiController::get( '/patterns', array( PatternsController::class, 'index' ) );
	}
}