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
		if ( false === $data || ( \defined( 'NFD_WB_DEV_MODE' ) && NFD_WB_DEV_MODE ) ) {

			if ( 'templates' === $type ) {
				$data = self::get_template_categories();
			} else {
				$data = RemoteRequest::get(
					'/categories',
					array(
						'type' => $type,
					)
				);
			}

			if ( \is_wp_error( $data ) ) {
				return $data;
			}

			if ( isset( $data['data'] ) ) {
				$data = $data['data'];
			}

			$data = self::add_featured_category( $data );

			\set_transient( "wba_{$type}_categories", $data, DAY_IN_SECONDS );
		}

		// Return the categories.
		return $data;
	}

	/**
	 * Get template categories from the templates array.
	 *
	 * @return array $categories Array of template categories.
	 */
	private static function get_template_categories() {

		// Get the templates.
		$templates  = Items::get( 'templates' );
		$categories = array();

		// Return the empty categories array if there is an error.
		if ( \is_wp_error( $templates ) ) {
			return $categories;
		}

		// Iterate through the templates and get the categories.
		if ( is_array( $templates ) && ! empty( $templates ) ) {
			foreach ( $templates as $template ) {

				// Check if the template belongs to categories.
				if ( isset( $template['categories'] ) ) {

					// Ensure the categories are an array.
					$_categories = is_array( $template['categories'] ) ? $template['categories'] : explode( ',', str_replace( ' ', '', $template['categories'] ) );

					foreach ( $_categories as $_category_slug ) {

						$category_slug = sanitize_text_field( $_category_slug );

						$category_item = array(
							'id'    => md5( $category_slug ),
							'title' => $category_slug,
							'label' => ucwords( str_replace( '-', ' ', $category_slug ) ),
						);

						if ( ! isset( $categories[ $category_item['id'] ] ) ) {
							$categories[ $category_item['id'] ] = $category_item;
						}
					}
				}
			}
		}

		// Get only the values of the categories.
		if ( ! empty( $categories ) ) {
			$categories = array_values( $categories );
		}

		return $categories;
	}

	/**
	 * Manually add the featured category to the categories array.
	 *
	 * @param array $data Array of categories.
	 * @return array $data Array of categories with the featured category.
	 */
	private static function add_featured_category( $data ) {

		$featured_category = array(
			'id'    => '99262afa-322a-4f3c-92e4-c297ba153763',
			'title' => 'featured',
			'label' => 'Featured',
		);

		$data = array_filter(
			$data,
			function( $category ) {
				return $category['title'] !== 'featured';
			}
		);

		$data = array_merge( array( $featured_category ), $data );

		return $data;
	}
}
