<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Api\RestRequest;

class TemplatesController {

	/**
	 * Return templates based on cateory.
	 *
	 */
	public static function index( $request ) {
	
		$params = $request->get_query_params();

		$response = RestRequest::get(
			'/templates',
			array(
				'category' => isset( $params['category'] ) ? sanitize_text_field( $params['category'] ) : '',
			)
		);

		return new \WP_REST_Response( $response );
	}
} 