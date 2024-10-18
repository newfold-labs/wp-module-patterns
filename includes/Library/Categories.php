<?php

namespace NewfoldLabs\WP\Module\Patterns\Library;

use NewfoldLabs\WP\Module\Patterns\SiteClassification;
use NewfoldLabs\WP\Module\Data\WonderBlocks\Requests\Fetch as WonderBlocksFetchRequest;
use NewfoldLabs\WP\Module\Data\WonderBlocks\WonderBlocks;

/**
 * Library for categories.
 */
class Categories {

	/**
	 * Get the categories from transient or the remote API.
	 *
	 * @param string $type Type of categories to get.
	 * @param string $orderby Attribute of the category to sort by. Default is 'order'.
	 * @param string $order  Specifies the order of sorting. Acceptable values are 'ASC' for ascending order or 'DESC' for descending order. Default is 'ASC'.
	 *
	 * @return array|WP_Error Array of categories or WP_Error if there was an error fetching the data.
	 */
	public static function get( $type = 'patterns', $orderby = 'order', $order = 'ASC' ) {

		// Ensure we only get templates or patterns.
		$type = 'templates' === $type ? 'templates' : 'patterns';

		$request = new WonderBlocksFetchRequest(
			array(
				'endpoint'       => 'categories',
				'slug'           => $type,
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

		// Sort categories.
		$data = self::sort_categories( $data, $orderby, $order );

		$data = self::add_featured_category( $data, $type );

		// Return the categories.
		return $data;
	}

	/**
	 * Sorts an array of categories based on a specified order and ordering attribute.
	 * By default, it sorts by 'order' in ascending ('ASC') order. The function
	 * currently only applies sorting if the 'order' attribute is specified for ordering.
	 * If 'order' is used, categories without a specified 'order' are placed at the end.
	 *
	 * @param array  $data    The array of categories to sort. Each category should be an associative array that potentially includes the 'order' key.
	 * @param string $orderby Attribute of the category to sort by. Default is 'order'.
	 * @param string $order   Specifies the order of sorting. Acceptable values are 'ASC' for ascending order or 'DESC' for descending order. Default is 'ASC'.
	 *
	 * @return array Returns the sorted array of categories. If 'order' is not the sorting attribute, returns the input array without changes.
	 */
	private static function sort_categories( $data, $orderby = 'order', $order = 'ASC' ) {

		if ( 'order' === $orderby ) {
			usort(
				$data,
				function ( $a, $b ) use ( $orderby, $order ) {
					$value_a = isset( $a[ $orderby ] ) ? $a[ $orderby ] : PHP_INT_MAX;
					$value_b = isset( $b[ $orderby ] ) ? $b[ $orderby ] : PHP_INT_MAX;

					if ( 'ASC' === $order ) {
						return $value_a <=> $value_b;
					} else {
						return $value_b <=> $value_a;
					}
				}
			);
		}

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
			function ( $category ) {
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
