<?php

namespace NewfoldLabs\WP\Module\Patterns\Api;

use NewfoldLabs\WP\Module\Patterns\Api\Controllers\RestApiController;
use NewfoldLabs\WP\Module\Patterns\Api\Controllers\PatternsController;
use NewfoldLabs\WP\Module\Patterns\Api\Controllers\PatternCategoriesController;
use NewfoldLabs\WP\Module\Patterns\Api\Controllers\TemplatesController;
use NewfoldLabs\WP\Module\Patterns\Api\Controllers\TemplateCategoriesController;
use NewfoldLabs\WP\Module\Patterns\Api\Controllers\FavoritesController;
use NewfoldLabs\WP\Module\Patterns\Api\Controllers\EventsController;
use NewfoldLabs\WP\Module\Patterns\Api\Controllers\CacheController;
use NewfoldLabs\WP\Module\Patterns\Api\Controllers\PatternUsageTagsController;
use NewfoldLabs\WP\Module\Patterns\Api\Controllers\PluginsController;

/**
 * Instantiate controllers and register routes.
 */
final class RestApi {

	/**
	 * Constructor.
	 */
	public function __construct() {
		\add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register routes.
	 */
	public function register_routes() {
		RestApiController::get( '/patterns', array( PatternsController::class, 'index' ) );
		RestApiController::get( '/categories', array( PatternCategoriesController::class, 'index' ) );
		RestApiController::get( '/usage_tags', array( PatternUsageTagsController::class, 'index' ) );

		RestApiController::get( '/templates', array( TemplatesController::class, 'index' ) );
		RestApiController::get( '/templateCategories', array( TemplateCategoriesController::class, 'index' ) );

		RestApiController::get( '/favorites', array( FavoritesController::class, 'index' ) );
		RestApiController::post( '/favorites', array( FavoritesController::class, 'add' ) );
		RestApiController::delete( '/favorites', array( FavoritesController::class, 'delete' ) );

		RestApiController::post( '/events', array( EventsController::class, 'send' ), EventsController::get_send_event_args() );
		RestApiController::post( '/events/batch', array( EventsController::class, 'send_batch' ) );

		RestApiController::post( '/clear-cache', array( CacheController::class, 'clear_cache' ) );

		RestApiController::post( '/plugins/activate', array( PluginsController::class, 'activate' ) );
	}
}
