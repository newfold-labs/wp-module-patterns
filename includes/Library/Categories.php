<?php

namespace NewfoldLabs\WP\Module\Patterns\Library;

use NewfoldLabs\WP\Module\Patterns\Api\RemoteRequest;

class Categories {
	
	/**
	 * Get the categories from transient or the remote API.
	 *
	 * @param string $type
	 * @return array
	 */
	public static function get( $type = 'patterns' ) {
		
		// Ensure we only get templates or patterns.
		$type     = $type === 'templates' ? 'templates' : 'patterns';
		$endpoint = $type === 'templates' ? 'templateCategories' : 'categories';
		
		// Get the categories from the transient.
		$data = get_transient( "wba_{$type}_categories" );

		// If the transient is empty, get the categories from the remote API.
		if ( false === $data ) {
			$data = RemoteRequest::get( "/{$endpoint}" );
			
			if ( \is_wp_error( $data ) ) {
				return new \WP_REST_Response( $data->get_error_message(), 503 );
			}

			set_transient( "wba_{$type}_categories", $data, DAY_IN_SECONDS );
		}

		// Return the categories.
		return $data;
	}
}