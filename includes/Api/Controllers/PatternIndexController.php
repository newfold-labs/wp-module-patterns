<?php

namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Library\Items;
use NewfoldLabs\WP\Module\Patterns\Api\RemoteRequest;

/**
 * Controller for pattern index and pattern-by-slug endpoints.
 *
 * Provides lightweight access to the pattern library for AI editor chat integration.
 */
class PatternIndexController {

	/**
	 * Return all patterns with content stripped (lightweight index for search).
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response
	 */
	public static function index( $request ) {
		$data = Items::get( 'patterns' );

		if ( \is_wp_error( $data ) ) {
			return new \WP_REST_Response( RemoteRequest::format_error_data( $data ), 503 );
		}

		// Strip content field to keep the index lightweight
		$index = array_map(
			function ( $pattern ) {
				return array(
					'slug'        => $pattern['slug'] ?? '',
					'title'       => $pattern['title'] ?? '',
					'description' => $pattern['description'] ?? '',
					'categories'  => $pattern['categories'] ?? array(),
					'tags'        => $pattern['tags'] ?? array(),
				);
			},
			$data
		);

		return new \WP_REST_Response( array_values( $index ) );
	}

	/**
	 * Return a single pattern by slug, including full content markup.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response
	 */
	public static function getBySlug( $request ) {
		$slug = $request->get_param( 'slug' );

		if ( empty( $slug ) ) {
			return new \WP_REST_Response(
				array( 'error' => 'Missing required parameter: slug' ),
				400
			);
		}

		$data = Items::get( 'patterns' );

		if ( \is_wp_error( $data ) ) {
			return new \WP_REST_Response( RemoteRequest::format_error_data( $data ), 503 );
		}

		// Find the pattern matching the slug
		$match = null;
		foreach ( $data as $pattern ) {
			if ( isset( $pattern['slug'] ) && $pattern['slug'] === $slug ) {
				$match = $pattern;
				break;
			}
		}

		if ( ! $match ) {
			return new \WP_REST_Response(
				array( 'error' => 'Pattern not found: ' . $slug ),
				404
			);
		}

		return new \WP_REST_Response(
			array(
				'slug'        => $match['slug'] ?? '',
				'title'       => $match['title'] ?? '',
				'content'     => $match['content'] ?? '',
				'categories'  => $match['categories'] ?? array(),
				'tags'        => $match['tags'] ?? array(),
				'description' => $match['description'] ?? '',
			)
		);
	}
}
