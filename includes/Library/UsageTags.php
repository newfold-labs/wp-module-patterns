<?php

namespace NewfoldLabs\WP\Module\Patterns\Library;

/**
 * Library for items.
 */
class UsageTags {

	/**
	 * Get items.
	 *
	 * @return array|WP_Error $data Array of items or WP_Error.
	 */
	public static function get() {

		$data = array(
			array(
				'title' => 'layout',
				'label' => __( 'Layout', 'nfd-wonder-blocks' ),
			),
			array(
				'title' => 'content',
				'label' => __( 'Content', 'nfd-wonder-blocks' ),
			),
			array(
				'title' => 'info',
				'label' => __( 'Info', 'nfd-wonder-blocks' ),
			),
			array(
				'title' => 'commerce',
				'label' => __( 'Commerce', 'nfd-wonder-blocks' ),
			),
			array(
				'title' => 'marketing',
				'label' => __( 'Marketing', 'nfd-wonder-blocks' ),
			),
			array(
				'title' => 'interactive',
				'label' => __( 'Interactive', 'nfd-wonder-blocks' ),
			),
		);

		return $data;
	}
}
