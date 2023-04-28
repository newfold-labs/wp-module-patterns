<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Api\RemoteRequest;

class TemplateCategoriesController {

	/**
	 * Return all template categories.
	 */
	public static function index() {
		
		$categories = get_transient( 'wba_template_categories' );

		if ( false === $categories ) {
			$categories = RemoteRequest::get( '/templateCategories' );
			set_transient( 'wba_template_categories', $categories, 60 * 60 * 24 );
		}

		return new \WP_REST_Response( $categories );
	}
} 