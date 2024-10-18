<?php

namespace NewfoldLabs\WP\Module\Patterns\Library;

use NewfoldLabs\WP\Module\Patterns\SiteClassification;
use NewfoldLabs\WP\Module\Data\WonderBlocks\Requests\Fetch as WonderBlocksFetchRequest;
use NewfoldLabs\WP\Module\Data\WonderBlocks\WonderBlocks;
use NewfoldLabs\WP\Module\Patterns\Data\PluginRequirements;
use NewfoldLabs\WP\Module\Patterns\Data\PluginStatus;

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

		$data = self::add_featured_categories( $data, $type );
		$data = self::add_plugin_requirements( $data, $type );

		if ( isset( $args['category'] ) ) {
			$data = self::filter( $data, 'category', \sanitize_text_field( $args['category'] ) );
		}

		if ( isset( $args['keywords'] ) ) {
			$matchType = isset( $args['matchType'] ) ? \sanitize_text_field( $args['matchType'] ) : 'contains';
			$data      = self::filter( $data, 'keywords', \sanitize_text_field( $args['keywords'] ), $matchType );
		}

		if ( isset( $args['sort_by'] ) ) {
			$data = self::sort( $data, \sanitize_text_field( $args['sort_by'] ) );
		}

		if ( isset( $args['per_page'] ) ) {
			$page = isset( $args['page'] ) ? $args['page'] : 1;
			$data = array_slice( $data, ( $page - 1 ) * $args['per_page'], $args['per_page'] );
		}

		return $data;
	}

	/**
	 * Sorts a multidimensional array.
	 *
	 * @param array  $data The array to sort.
	 * @param string $sort_by The key to sort by.
	 *
	 * @return array The sorted array.
	 */
	private static function sort( $data, $sort_by ) {

		if ( $sort_by === 'newest' ) {
			$data = array_reverse( $data );
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
	private static function filter( $data, $key, $value, $matchType = 'contains' ) {

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
			return self::filter_by_keywords( $data, $value, $matchType );
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
	 * @param array  $data      Array of data.
	 * @param string $value     Value to filter by.
	 * @param string $matchType Type of matching: 'exact' or 'contains'.
	 *
	 * @return array $filtered
	 */
	private static function filter_by_keywords( $data, $value, $matchType = 'contains' ) {
		$filtered = array();
		$value    = strtolower( $value );

		foreach ( $data as $item ) {
			$title      = strtolower( $item['title'] );
			$matchFound = false;

			// Check title based on match type.
			if ( 'exact' === $matchType && $title === $value ) {
				$matchFound = true;
			} elseif ( 'contains' === $matchType && false !== strpos( $title, $value ) ) {
				$matchFound = true;
			}

			if ( $matchFound ) {
				$filtered[] = $item;
				continue;
			}

			// Check tags if available.
			if ( isset( $item['tags'] ) ) {
				$item['tags'] = (array) $item['tags'];

				foreach ( $item['tags'] as $tag ) {
					$tag = strtolower( $tag );

					if ( 'exact' === $matchType && $tag === $value ) {
						$filtered[] = $item;
						break;
					} elseif ( 'contains' === $matchType && false !== strpos( $tag, $value ) ) {
						$filtered[] = $item;
						break;
					}
				}
			}
		}

		return $filtered;
	}


	/**
	 * Get featured items.
	 *
	 * @param string $type Type of items to get.
	 *
	 * @return array
	 */
	private static function get_featured_slugs( $type = '' ) {

		$featured = array(
			'patterns'  => array(
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
			),
			'templates' => array(
				'home-1',
				'home-2',
				'home-4',
				'home-5',
				'contact-1',
				'contact-2',
				'link-in-bio-1',
				'link-in-bio-2',
				'coming-soon-3',
				'coming-soon-4',
				'contact-3',
				'contact-4',
			),
		);

		$featured = apply_filters( 'wonder_blocks_featured_items', $featured );

		if ( $type && isset( $featured[ $type ] ) ) {
			return $featured[ $type ];
		}

		return $featured;
	}

	/**
	 * Check if item is featured.
	 *
	 * @param string $slug Slug of item.
	 * @param string $type Type of item.
	 * @return boolean $is_featured True if item is featured.
	 */
	private static function is_featured( $slug, $type ) {

		$featured = self::get_featured_slugs( $type );

		return in_array( $slug, $featured, true );
	}

	/**
	 * Add featured category to item if it belongs to a featured category.
	 *
	 * @param array  $data List of items
	 * @param string $type Type of items
	 *
	 * @return object $data List of items updated with featured category
	 */
	private static function add_featured_categories( $data, $type = 'patterns' ) {
		$data = array_map(
			function ( $item ) use ( $type ) {

				if ( ! isset( $item['categories'] ) ) {
					$item['categories'] = array();
				}

				if ( ! is_array( $item['categories'] ) ) {
					$item['categories'] = array( $item['categories'] );
				}

				if ( self::is_featured( $item['slug'], $type ) ) {
					$item['categories'][] = 'featured';
				}

				return $item;
			},
			$data
		);

		return $data;
	}

	/**
	 * Add plugin requirements to item.
	 *
	 * @param array  $data List of items
	 * @param string $type Type of items
	 *
	 * @return object $data List of items updated with plugin requirements
	 */
	private static function add_plugin_requirements( $data, $type = 'patterns' ) {
		if ( 'patterns' !== $type ) {
			return $data;
		}

		$plugin_requirements = PluginRequirements::get();

		$data = array_map(
			function ( $item ) use ( $plugin_requirements ) {

				if ( ! isset( $item['slug'] ) ) {
					return $item;
				}

				$requirements = isset( $plugin_requirements[ $item['slug'] ] ) ? $plugin_requirements[ $item['slug'] ] : array();

				// Check the status of the required plugins and add it to the item
				foreach ( $requirements as &$requirement ) {
					$requirement['status'] = PluginStatus::check( $requirement['path'] );
				}

				$item['plugin_requirements'] = $requirements;

				return $item;
			},
			$data
		);

		return $data;
	}
}
