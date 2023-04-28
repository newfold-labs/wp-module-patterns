<?php

namespace NewfoldLabs\WP\Module\Patterns\Library;

use NewfoldLabs\WP\Module\Patterns\Api\RemoteRequest;

class Items {
	
	/** 
	 * Get items.
	 * 
	 * @param array $args Array of arguments.
	 * @return array
	*/
	public static function get( $type = 'patterns', $args = array() ) {
		
		$data = self::get_cached_data( $type );
		
		if ( isset( $args['category'] ) ) {
			$data = self::filter( $data, 'category', sanitize_text_field( $args['category'] ) );
		}
		
		if ( isset( $args['keywords'] ) ) {
			$data = self::filter( $data, 'keywords', sanitize_text_field( $args['keywords'] ) );
		}
		
		if ( isset( $args['per_page'] ) ) {
			$page = isset( $args['page'] ) ? $args['page'] : 1;
			$data = array_slice( $data, ( $page - 1 ) * $args['per_page'], $args['per_page'] );			
		}
		
		return $data;
	}
	
	/**
	 * Get all items from transients or remote API.
	 *
	 * @param array $args
	 * 
	 * @return array $data
	 */
	private static function get_cached_data( $type = 'patterns', $args = array()) {
		
		$args = wp_parse_args(
			$args,
			array(
				'primary_type'   => '',
				'secondary_type' => '',
			)
		);
		
		// Ensure we only get templates or patterns.
		$id   = md5( serialize( $args ) );
		$type = $type === 'templates' ? 'templates' : 'patterns';
		$data = get_transient( "wba_{$type}_{$id}" );		

		if ( false === $data ) {
			
			$data = RemoteRequest::get( "/{$type}", $args );
			
			if ( \is_wp_error( $data ) ) {
				return new \WP_REST_Response( $data->get_error_message(), 503 );
			}
			
			// set_transient( "wba_{$type}_{$id}", $data, 60 * 60 * 24 );
			set_transient( "wba_{$type}_{$id}", $data, 1 );
		}
		
		return $data;
	}
	
	/**
	 * Filter data by key and value.
	 *
	 * @param array $data
	 * @param string $key
	 * @param string $value
	 * 
	 * @return array $filtered
	 */
	private static function filter( $data, $key, $value ) {

		if ( ! is_array( $data ) ) {
			return array();
		}
		
		if ( empty( $data ) ) {
			return array();
		}

		if ( 'category' === $key ) {
			return self::filter_by_category( $data, $value );
		}
		
		if ( 'keywords' === $key ) {
			return self::filter_by_keywords( $data, $value );
		}
	}
	
	/**
	 * Filter an array by category.
	 *
	 * @param array $data
	 * @param string $value
	 * 
	 * @return array $filtered
	 */
	private static function filter_by_category( $data, $value ) {

		$filtered = array();
 
		foreach ( $data as $item ) {

			if ( isset( $item['category'] ) ) {

				$item['category'] = (array) $item['category'];

				foreach( $item['category'] as $v ) {		
					if ( strpos( $v, $value ) !== false ) {
						$filtered[] = $item;
					}
				}
			}
		}

		return $filtered;
	}
	
	/**
	 * Filter an array by keywords.
	 *
	 * @param array $data
	 * @param string $value
	 * 
	 * @return array $filtered
	 */
	private static function filter_by_keywords( $data, $value ) {

		$filtered = array();
 
		foreach ( $data as $item ) {
			
			if ( false !== strpos( strtolower( $item['title'] ), $value ) ) {
				$filtered[] = $item;
			} elseif ( isset( $item['keywords'] ) ) {

				$item['keywords'] = (array) $item['keywords'];

				foreach( $item['keywords'] as $v ) {		
					if ( strpos( $v, $value ) !== false ) {
						$filtered[] = $item;
					}
				}
			}
		}

		return $filtered;
	}
}
