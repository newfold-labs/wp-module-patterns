<?php

namespace NewfoldLabs\WP\Module\Patterns\Library;

use NewfoldLabs\WP\Module\Patterns\Api\RemoteRequest;

/**
 * Library for categories.
 */
class Categories {

	/**
	 * Get the categories from transient or the remote API.
	 *
	 * @param string $type Type of categories to get.
	 *
	 * @return array
	 */
	public static function get( $type = 'patterns' ) {

		// Ensure we only get templates or patterns.
		$type = 'templates' === $type ? 'templates' : 'patterns';

		// Get the categories from the transient.
		$data = \get_transient( "wba_{$type}_categories" );

		// If the transient is empty or if we are in dev mode get the categories from the remote API.
		if ( false === $data || ( \defined( 'NFD_WB_DEV_MODE' ) && NFD_WB_DEV_MODE ) ) {

			$data = RemoteRequest::get( "/categories/{$type}" );

			// Check if we can get the categories with the type param
			if ( \is_wp_error( $data ) ) {
				if ( 'remote_request_error' === $data->get_error_code() ) {
					// Try endpoint with 'type' param
					$data = RemoteRequest::get(
						'/categories',
						array(
							'type' => $type,
						)
					);
				} else {
					return $data;
				}
			}

			if ( isset( $data['data'] ) ) {
				$data = $data['data'];
			}

			// Temporarily add the featured category until API returns this.
			$data = self::add_featured_category( $data, $type );

			\set_transient( "wba_{$type}_categories", $data, DAY_IN_SECONDS );
		}

		// Return the categories.
		return $data;
	}

	/**
	 * Manually add the featured category to the categories array.
	 * This is a temporary solution until HIIVE returns the actual data.
	 *
	 * @param array  $data Array of categories.
	 * @param string $type Type of categories to get.
	 * @return array $data Array of categories with the featured category.
	 */
	private static function add_featured_category( $data, $type ) {

		$data = array_filter(
			$data,
			function( $category ) {
				return 'featured' !== $category['title'];
			}
		);

		$id = self::generate_uuid_v4();

		$featured_category = array(
			'id'    => $id,
			'title' => 'featured',
			'label' => 'Featured',
			'count' => 'templates' === $type ? 4 : 11,
		);

		$data = array_merge( array( $featured_category ), $data );

		return $data;
	}

	/**
	 * Temporary solution to add UUIDs to manual categories.
	 */
	private static function generate_uuid_v4() {
		return sprintf(
			'%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
			wp_rand( 0, 0xffff ),
			wp_rand( 0, 0xffff ),
			wp_rand( 0, 0xffff ),
			wp_rand( 0, 0x0fff ) | 0x4000,
			wp_rand( 0, 0x3fff ) | 0x8000,
			wp_rand( 0, 0xffff ),
			wp_rand( 0, 0xffff ),
			wp_rand( 0, 0xffff )
		);
	}
}
