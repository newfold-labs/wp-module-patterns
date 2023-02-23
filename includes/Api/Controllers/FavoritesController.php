<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Api\RestRequest;

class FavoritesController {

	/**
	 * Return all favorites.
	 *
	 */
	public static function index( $request ) {

		$type = self::resolve_type( $request );
		
		if ( ! in_array( $type, array( 'patterns', 'templates' ) ) ) {
			return new \WP_REST_Response( __( 'Invalid request', 'nfd-wonder-blocks' ), 400 );			
		}

		$user_id = get_current_user_id();
		$data    = get_user_meta( $user_id, 'nfd_wb_favorites', true );
		
		if ( isset( $data[ $type ] ) ) {			
			return new \WP_REST_Response( $data[ $type ] );
		}

		return new \WP_REST_Response( array() );
	}
	
	/**
	 * Add to Favorites.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public static function add( $request ) {
		
		$body = $request->get_json_params();
		$type = self::resolve_type( $request );
		
		if ( ! in_array( $type, array( 'patterns', 'templates' ) ) ) {
			return new \WP_REST_Response( __( 'Invalid request', 'nfd-wonder-blocks' ), 400 );			
		}
		
		$item = array(
			'id'     => sanitize_text_field( $body['id'] ),
			'title'  => sanitize_text_field( $body['title'] ),
			'source' => sanitize_text_field( $body['source'] ),
		);

		$user_id = get_current_user_id();
		
		$data = get_user_meta( $user_id, 'nfd_wb_favorites', true );
		
		if ( ! is_array( $data ) ) {
			$data = array();
		}
		
		if ( ! isset( $data[ $type ] ) ) {
			$data[ $type ] = array();
		}
		
		if ( ! in_array( $item, $data[ $type ] ) ) {
			$data[ $type ][] = $item;
		}
		
		update_user_meta( $user_id, 'nfd_wb_favorites', $data );
		
		return new \WP_REST_Response( $data );
	}
	
	/**
	 * Resolve type.
	 *
	 * @param WP_REST_Request $request
	 * @return string
	 */
	private static function resolve_type( $request ) {
		$route = $request->get_route();
		$route = str_replace( 'nfd-wonder-blocks/v1/favorites', '', $route );
		$route = str_replace( '/', '', $route );
		return $route;
	}
} 