<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Library\Categories;

class TemplateCategoriesController {

	/**
	 * Return all template categories.
	 */
	public static function index() {
		
		$categories = Categories::get( 'templates' );

		return new \WP_REST_Response( $categories );
	}
} 