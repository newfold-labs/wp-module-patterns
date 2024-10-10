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
		
		$data = [
			[
				'title' => 'layout',
				'label' => __( 'Layout', 'nfd-wonder-blocks' ),
			],
			[
				'title' => 'content',
				'label' => __( 'Content', 'nfd-wonder-blocks' ),
			],
			[
				'title' => 'info',
				'label' => __( 'Info', 'nfd-wonder-blocks' ),
			],
			[
				'title' => 'commerce',
				'label' => __( 'Commerce', 'nfd-wonder-blocks' ),
			],
			[
				'title' => 'marketing',
				'label' => __( 'Marketing', 'nfd-wonder-blocks' ),
			],
			[
				'title' => 'interactive',
				'label' => __( 'Interactive', 'nfd-wonder-blocks' ),
			]
		];
		
		return $data;
	}
}