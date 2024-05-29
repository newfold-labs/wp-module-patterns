<?php

namespace NewfoldLabs\WP\Module\Patterns\Library;

use NewfoldLabs\WP\Module\Patterns\SiteClassification;
use NewfoldLabs\WP\Module\Data\WonderBlocks\Requests\Fetch as WonderBlocksFetchRequest;
use NewfoldLabs\WP\Module\Data\WonderBlocks\WonderBlocks;

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

		$request = new WonderBlocksFetchRequest(
			array(
				'endpoint'       => $type,
				'primary_type'   => SiteClassification::get_primary_type(),
				'secondary_type' => SiteClassification::get_secondary_type(),
			)
		);

		$data = WonderBlocks::fetch( $request );
		if ( ! $data ) {
			return new \WP_Error(
				'nfd_wonder_blocks_error',
				__( 'Error fetching data from the platform.', 'nfd-wonder-blocks' )
			);
		}

		$data = self::add_featured_categories( $data );

		if ( isset( $args['category'] ) ) {
			$data = self::filter( $data, 'category', \sanitize_text_field( $args['category'] ) );
		}

		if ( isset( $args['keywords'] ) ) {
			$data = self::filter( $data, 'keywords', \sanitize_text_field( $args['keywords'] ) );
		}

		$data = self::sort( $data );

		if ( isset( $args['per_page'] ) ) {
			$page = isset( $args['page'] ) ? $args['page'] : 1;
			$data = array_slice( $data, ( $page - 1 ) * $args['per_page'], $args['per_page'] );
		}

		if ( ! class_exists( 'WooCommerce' ) ) {
			$data = array_filter(
				$data,
				function ( $item ) {
					return ! in_array( 'products', $item['categories'], true );
				}
			);
		}

		return $data;
	}

	/**
	 * Sorts a multidimensional array.
	 *
	 * @param array $data The array to sort.
	 *
	 * @return array The sorted array.
	 */
	private static function sort( $data ) {
		// Reverse the array.
		$data = array_reverse( $data );
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

	/**
	 * Get featured items.
	 *
	 * @return array
	 */
	private static function get_featured_slugs() {

		$featured = array(
			'pricing-table-2',
			'features-9',
			'hero-4',
			'cta-22',
			'gallery-2',
			'cta-7',
			'faq-2',
			'features-4',
			'pricing-table-6',
			'features-5',
			'gallery-6',
			'home-1',
			'home-2',
			'home-4',
			'home-5',
		);

		return apply_filters( 'bptds_featured_items', $featured );
	}

	/**
	 * Check if item is featured.
	 *
	 * @param string $slug Slug of item.
	 * @return boolean $is_featured True if item is featured.
	 */
	private static function is_featured( $slug ) {

		$featured = self::get_featured_slugs();

		return in_array( $slug, $featured, true );
	}

	/**
	 * Add featured category to item if it belongs to a featured category.
	 *
	 * @param array $data List of items
	 * @return object $data List of items updated with featured category
	 */
	private static function add_featured_categories( $data ) {
		$data = array_map(
			function ( $item ) {
				if ( ! isset( $item['categories'] ) ) {
					$item['categories'] = array();
				}

				if ( ! is_array( $item['categories'] ) ) {
					$item['categories'] = array( $item['categories'] );
				}

				if ( self::is_featured( $item['slug'] ) ) {
					$item['categories'][] = 'featured';
				}

				return $item;
			},
			$data
		);

		return $data;
	}
}
