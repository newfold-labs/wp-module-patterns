<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Api\RestRequest;

class TemplateCategoriesController {

	/**
	 * Return all template categories.
	 *
	 */
	public static function index() {

		$response = RestRequest::get( '/templateCategories' );

		return new \WP_REST_Response( $response );
	}
} 