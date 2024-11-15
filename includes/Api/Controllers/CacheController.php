<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\SiteClassification;
use NewfoldLabs\WP\Module\Data\WonderBlocks\Requests\Fetch as WonderBlocksFetchRequest;
use NewfoldLabs\WP\Module\Data\WonderBlocks\WonderBlocks;
use NewfoldLabs\WP\Module\Patterns\CSSUtilities;

/**
 * Controller for cache.
 */
class CacheController {

	public static function clear_cache( \WP_REST_Request $request ) {

		$type = $request->get_param( 'type' );

		$primary_type   = SiteClassification::get_primary_type();
		$secondary_type = SiteClassification::get_secondary_type();

		// Initialize response
		$response = array();

		if ( ! $type || 'patterns' === $type ) {
			// Clear cache for patterns
			$pattern_request = new WonderBlocksFetchRequest(
				array(
					'endpoint'       => 'patterns',
					'primary_type'   => $primary_type,
					'secondary_type' => $secondary_type,
				)
			);
			WonderBlocks::clear_cache( $pattern_request );
			$response['patterns'] = 'Cache cleared';
		}

		if ( ! $type || 'templates' === $type ) {
			// Clear cache for templates
			$template_request = new WonderBlocksFetchRequest(
				array(
					'endpoint'       => 'templates',
					'primary_type'   => $primary_type,
					'secondary_type' => $secondary_type,
				)
			);
			WonderBlocks::clear_cache( $template_request );
			$response['templates'] = 'Cache cleared';
		}

		if ( ! $type || 'categories' === $type ) {

			// Clear cache for categories
			$category_request = new WonderBlocksFetchRequest(
				array(
					'endpoint'       => 'categories',
					'slug'           => 'patterns',
					'primary_type'   => $primary_type,
					'secondary_type' => $secondary_type,
				)
			);
			WonderBlocks::clear_cache( $category_request );

			$category_request = new WonderBlocksFetchRequest(
				array(
					'endpoint'       => 'categories',
					'slug'           => 'templates',
					'primary_type'   => $primary_type,
					'secondary_type' => $secondary_type,
				)
			);
			WonderBlocks::clear_cache( $category_request );

			$response['categories'] = 'Cache cleared';
		}

		// Refresh the CSS utilities assets.
		CSSUtilities::get_instance()->refresh_assets();

		return new \WP_REST_Response( $response, 200 );
	}
}
