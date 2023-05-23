<?php

namespace NewfoldLabs\WP\Module\Patterns\Library;

/**
 * Favorites library.
 */
class Favorites {
	/**
	 * Get items.
	 *
	 * @param array $args Array of arguments.
	 * @return array
	 */
	public static function get( $args = array() ) {

		$user_id = \get_current_user_id();

		$data = \get_user_meta( $user_id, 'nfd_wb_favorites', true );
		$data = is_array( $data ) ? $data : array();

		if ( isset( $args['per_page'] ) ) {
			$page = isset( $args['page'] ) ? $args['page'] : 1;
			$data = array_slice( $data, ( $page - 1 ) * $args['per_page'], $args['per_page'] );
		}

		return $data;
	}

	/**
	 * Add to Favorites.
	 *
	 * @param array  $item Item to add.
	 * @param string $type Type of item to add.
	 *
	 * @return array $data Updated array of favorite items.
	 */
	public static function add( $item, $type ) {

		$user_id = \get_current_user_id();

		$item = array(
			'id'      => \sanitize_text_field( $item['id'] ),
			'title'   => \sanitize_text_field( $item['title'] ),
			'content' => $item['content'],
			'type'    => $type,
		);

		$data = \get_user_meta( $user_id, 'nfd_wb_favorites', true );

		if ( ! is_array( $data ) ) {
			$data = array();
		}

		if ( ! in_array( $item, $data, true ) ) {
			$data[] = $item;
		}

		\update_user_meta( $user_id, 'nfd_wb_favorites', $data );

		return $data;
	}

	/**
	 * Remove from Favorites.
	 *
	 * @param array $item Item to add.
	 *
	 * @return array $data Updated array of favorite items.
	 */
	public static function delete( $item ) {

		$user_id = \get_current_user_id();

		$favorites = \get_user_meta( $user_id, 'nfd_wb_favorites', true );

		if ( ! is_array( $favorites ) ) {
			$favorites = array();
		}

		$data = array();

		if ( ! empty( $favorites ) ) {
			foreach ( $favorites as $favorite ) {
				if ( $item['id'] !== $favorite['id'] ) {
					$data[] = $favorite;
				}
			}
		}

		\update_user_meta( $user_id, 'nfd_wb_favorites', $data );

		return $data;
	}
}
