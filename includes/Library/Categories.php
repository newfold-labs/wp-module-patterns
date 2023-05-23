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

		// If the transient is empty, get the categories from the remote API.
		if ( false === $data ) {

			$data = RemoteRequest::get(
				'/categories',
				array(
					'type' => $type,
				)
			);

			// @todo: remove this when API returns the template categories.
			if ( 'templates' === $type ) {
				$data = array(
					array(
						'id'    => '344566',
						'label' => 'Home',
						'title' => 'home',
						'count' => '4',
					),
				);
			}

			if ( \is_wp_error( $data ) ) {
				return $data;
			}

			if ( isset( $data['data'] ) ) {
				$data = $data['data'];
			}

			\set_transient( "wba_{$type}_categories", $data, DAY_IN_SECONDS );
		}

		// Return the categories.
		return $data;
	}
}
