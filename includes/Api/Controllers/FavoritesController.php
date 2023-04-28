<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

class FavoritesController {

	/**
	 * Return all favorites.
	 *
	 */
	public static function index( $request ) {

		$user_id = get_current_user_id();
		$data    = get_user_meta( $user_id, 'nfd_wb_favorites', true );
		
		if ( is_array( $data ) ) {			
			return new \WP_REST_Response( $data );
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
		$type = sanitize_text_field( $body['type'] );
		
		if ( ! in_array( $type, array( 'patterns', 'templates' ) ) ) {
			return new \WP_REST_Response( __( 'Invalid request', 'nfd-wonder-blocks' ), 400 );			
		}
		
		$item = array(
			'id'     => sanitize_text_field( $body['id'] ),
			'title'  => sanitize_text_field( $body['title'] ),
			'source' => $body['source'],
			'type'   => $type,
		);

		$user_id = get_current_user_id();
		
		$data = get_user_meta( $user_id, 'nfd_wb_favorites', true );
		
		if ( ! is_array( $data ) ) {
			$data = array();
		}	
		
		if ( ! in_array( $item, $data ) ) {
			$data[] = $item;
		}
		
		update_user_meta( $user_id, 'nfd_wb_favorites', $data );
		
		return new \WP_REST_Response( $data );
	}
	
	/**
	 * Remove from Favorites.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public static function delete( $request ) {
		
		$body = $request->get_json_params();
		$type = sanitize_text_field( $body['type']);
		
		if ( ! in_array( $type, array( 'patterns', 'templates' ) ) ) {
			return new \WP_REST_Response( __( 'Invalid request', 'nfd-wonder-blocks' ), 400 );			
		}
		
		$item = array(
			'id'     => sanitize_text_field( $body['id'] ),
			'title'  => sanitize_text_field( $body['title'] ),
			'source' => $body['source'],
			'type'   => $type,
		);

		$user_id = get_current_user_id();
		
		$favorites = get_user_meta( $user_id, 'nfd_wb_favorites', true );
		
		if ( ! is_array( $favorites ) ) {
			$favorites = array();
		}
		
		$new = array();
		
		if ( ! empty( $favorites ) ) {
			foreach( $favorites as $favorite ) {
				if ( $item['id'] !== $favorite['id'] ) {
					$new[] = $favorite;
				}
			}
		}
		
		update_user_meta( $user_id, 'nfd_wb_favorites', $new );

		return new \WP_REST_Response( $new );
	}
} 