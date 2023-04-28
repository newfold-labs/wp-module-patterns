<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Library\Categories;

class PatternCategoriesController {

	/**
	 * Return all pattern categories.
	 *
	 */
	public static function index() {

		$categories = Categories::get( 'patterns' );

		return new \WP_REST_Response( $categories );
	}
}
