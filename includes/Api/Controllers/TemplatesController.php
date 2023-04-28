<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Library\Items;

class TemplatesController {

	/**
	 * Return templates based on category.
	 */
	public static function index( $request ) {
	
		$params = $request->get_query_params();

		$data = Items::get( 'templates', $params );

		return new \WP_REST_Response( $data );
	}
}
