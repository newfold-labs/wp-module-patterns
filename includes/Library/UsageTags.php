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
				'label' => __( 'Layout', 'wp-module-patterns' ),
			),
			array(
				'title' => 'content',
				'label' => __( 'Content', 'wp-module-patterns' ),
			),
			array(
				'title' => 'info',
				'label' => __( 'Info', 'wp-module-patterns' ),
			),
			array(
				'title' => 'commerce',
				'label' => __( 'Commerce', 'wp-module-patterns' ),
			),
			array(
				'title' => 'marketing',
				'label' => __( 'Marketing', 'wp-module-patterns' ),
			),
			array(
				'title' => 'interactive',
				'label' => __( 'Interactive', 'wp-module-patterns' ),
			),
		);

		return $data;
	}
}
