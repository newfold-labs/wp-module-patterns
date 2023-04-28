<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Library\Items;

class PatternsController {

	/**
	 * Return all patterns.
	 *
	 */
	public static function index( $request ) {
		
		$params = $request->get_query_params();

		$data = Items::get( 'patterns', $params );

		return new \WP_REST_Response( $data );
	}
}
