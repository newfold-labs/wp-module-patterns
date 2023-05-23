<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Library\Items;
use NewfoldLabs\WP\Module\Patterns\Api\RemoteRequest;

/**
 * Controller for templates.
 */
class TemplatesController {

	/**
	 * Return templates based on category.
	 *
	 * @param WP_REST_Request $request Request object.
	 */
	public static function index( $request ) {

		$params = $request->get_query_params();

		$data = Items::get( 'templates', $params );

		if ( \is_wp_error( $data ) ) {
			return new \WP_REST_Response( RemoteRequest::format_error_data( $data ), 503 );
		}

		return new \WP_REST_Response( $data );
	}
}
