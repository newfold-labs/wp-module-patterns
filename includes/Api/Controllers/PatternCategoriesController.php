<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Library\Categories;
use NewfoldLabs\WP\Module\Patterns\Api\RemoteRequest;

/**
 * Controller for pattern categories.
 */
class PatternCategoriesController {

	/**
	 * Return all pattern categories.
	 */
	public static function index() {

		$data = Categories::get( 'patterns' );

		if ( \is_wp_error( $data ) ) {
			return new \WP_REST_Response( RemoteRequest::format_error_data( $data ), 503 );
		}

		return new \WP_REST_Response( $data );
	}
}
