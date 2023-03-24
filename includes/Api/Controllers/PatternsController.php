<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Api\RestRequest;

class PatternsController {

	/**
	 * Return all patterns.
	 *
	 */
	public static function index( $request ) {
	
		$params = $request->get_query_params();

		$response = RestRequest::get(
			'/patterns',
			array(
				'category'      => isset( $params['category'] ) ? sanitize_text_field( $params['category'] ) : '',
				'keywords_like' => isset( $params['keywords'] ) ? sanitize_text_field( $params['keywords'] ) : '',
			)
		);

		return new \WP_REST_Response( $response );
	}
} 