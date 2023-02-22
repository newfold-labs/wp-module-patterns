<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Api\RestRequest;

class PatternsController {

	/**
	 * Return all patterns.
	 *
	 */
	public static function index() {

		$response = RestRequest::get( '/patterns' );

		return new \WP_REST_Response( $response );
	}
} 