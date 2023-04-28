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
			// set_transient( "wba_{$type}_categories", $data, 60 * 60 * 24 );
			set_transient( "wba_{$type}_categories", $data, 5 );
		}

		// Return the categories.
		return $data;
	}
}