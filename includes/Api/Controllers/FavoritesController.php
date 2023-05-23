<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Library\Favorites;

/**
 * Controller for favorites.
 */
class FavoritesController {

	/**
	 * Return all favorites.
	 *
	 * @param WP_REST_Request $request Request object.
	 */
	public static function index( $request ) {

		$params = $request->get_query_params();

		$data = Favorites::get( $params );

		return new \WP_REST_Response( $data );
	}

	/**
	 * Add to Favorites.
	 *
	 * @param WP_REST_Request $request Request object.
	 *
	 * @return WP_REST_Response $data Response data.
	 */
	public static function add( $request ) {

		$body = $request->get_json_params();
		$type = \sanitize_text_field( $body['type'] );

		if ( ! in_array( $type, array( 'patterns', 'templates' ), true ) ) {
			return new \WP_REST_Response( __( 'Invalid request', 'nfd-wonder-blocks' ), 400 );
		}

		$item = array(
			'id'      => \sanitize_text_field( $body['id'] ),
			'title'   => \sanitize_text_field( $body['title'] ),
			'content' => $body['content'],
		);

		$data = Favorites::add( $item, $type );

		return new \WP_REST_Response( $data );
	}

	/**
	 * Remove from Favorites.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response $data Response data.
	 */
	public static function delete( $request ) {

		$body = $request->get_json_params();
		$type = \sanitize_text_field( $body['type'] );

		if ( ! in_array( $type, array( 'patterns', 'templates' ), true ) ) {
			return new \WP_REST_Response( __( 'Invalid request', 'nfd-wonder-blocks' ), 400 );
		}

		$item = array(
			'id'      => \sanitize_text_field( $body['id'] ),
			'title'   => \sanitize_text_field( $body['title'] ),
			'content' => $body['content'],
		);

		$data = Favorites::delete( $item );

		return new \WP_REST_Response( $data );
	}
}
