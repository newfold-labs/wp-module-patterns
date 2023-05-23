<?php

namespace NewfoldLabs\WP\Module\Patterns\Library;

use NewfoldLabs\WP\Module\Patterns\Api\RemoteRequest;
use NewfoldLabs\WP\Module\Patterns\SiteClassification;

/**
 * Library for items.
 */
class Items {

	/**
	 * Get items.
	 *
	 * @param string $type Type of items to get.
	 * @param array  $args Array of arguments.
	 *
	 * @return array|WP_Error $data Array of items or WP_Error.
	 */
	public static function get( $type = 'patterns', $args = array() ) {

		$data = self::get_cached_data( $type );

		if ( \is_wp_error( $data ) ) {
			return $data;
		}

		if ( isset( $args['category'] ) ) {
			$data = self::filter( $data, 'category', \sanitize_text_field( $args['category'] ) );
		}

		if ( isset( $args['keywords'] ) ) {
			$data = self::filter( $data, 'keywords', \sanitize_text_field( $args['keywords'] ) );
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
	 * @param string $type Type of items to get.
	 * @param array  $args Array of arguments.
	 *
	 * @return array $data
	 */
	private static function get_cached_data( $type = 'patterns', $args = array() ) {

		$args = wp_parse_args(
			$args,
			array(
				'primary_type'   => SiteClassification::get_primary_type(),
				'secondary_type' => SiteClassification::get_secondary_type(),
			)
		);

		// Ensure we only get templates or patterns.
		$id   = md5( serialize( $args ) ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.serialize_serialize
		$type = 'templates' === $type ? 'templates' : 'patterns';
		$data = \get_transient( "wba_{$type}_{$id}" );

		if ( false === $data ) {

			$data = RemoteRequest::get( "/{$type}", $args );

			if ( \is_wp_error( $data ) ) {
				return $data;
			}

			if ( isset( $data['data'] ) ) {
				$data = $data['data'];
			}

			\set_transient( "wba_{$type}_{$id}", $data, DAY_IN_SECONDS );
		}

		return $data;
	}

	/**
	 * Filter data by key and value.
	 *
	 * @param array  $data  Array of data.
	 * @param string $key   Key to filter by.
	 * @param string $value Value to filter by.
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
	 * @param array  $data  Array of data.
	 * @param string $value Value to filter by.
	 *
	 * @return array $filtered
	 */
	private static function filter_by_category( $data, $value ) {

		$filtered = array();

		foreach ( $data as $item ) {

			if ( isset( $item['categories'] ) ) {

				$item['categories'] = (array) $item['categories'];

				foreach ( $item['categories'] as $v ) {
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
	 * @param array  $data  Array of data.
	 * @param string $value Value to filter by.
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

				foreach ( $item['keywords'] as $v ) {
					if ( strpos( $v, $value ) !== false ) {
						$filtered[] = $item;
					}
				}
			}
		}

		return $filtered;
	}
}
