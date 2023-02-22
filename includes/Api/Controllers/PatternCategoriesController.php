<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Api\RestRequest;

class PatternCategoriesController {

	/**
	 * Return all pattern categories.
	 *
	 */
	public static function index() {

		$response = RestRequest::get( '/categories' );

		return new \WP_REST_Response( $response );
	}
} 