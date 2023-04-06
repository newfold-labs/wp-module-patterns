<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Api\RestRequest;

class TemplatesController {

	/**
	 * Return templates based on category.
	 */
	public static function index( $request ) {
	
		$params = $request->get_query_params();
		
		$args = array();
		
		if ( isset( $params['category'] ) ) {
			$args['category_like'] = sanitize_text_field( $params['category'] );
		}
		
		if ( isset( $params['keywords'] ) ) {
			$args['keywords_like'] = sanitize_text_field( $params['keywords'] );
		}
		
		$response = RestRequest::get(
			'/templates',
			$args			
		);
		
		if ( \is_wp_error( $response ) ) {
			return new \WP_REST_Response( $response->get_error_message(), 503 );
		}

		return new \WP_REST_Response( $response );
	}
} 