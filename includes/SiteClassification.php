<?php

namespace NewfoldLabs\WP\Module\Patterns;

use NewfoldLabs\WP\Module\Data\SiteClassification\PrimaryType;
use NewfoldLabs\WP\Module\Data\SiteClassification\SecondaryType;

/**
 * Site classification.
 */
class SiteClassification {

	/**
	 * Retrieve primary type.
	 *
	 * @var string
	 */
	public static function get_primary_type() {

		if ( ! class_exists( 'NewfoldLabs\WP\Module\Data\SiteClassification\PrimaryType' ) ) {
			return '';
		}

		$primary_type = PrimaryType::instantiate_from_option();

		if ( ! $primary_type ) {
			return '';
		}

		$primary_type = $primary_type->to_array();

		return isset( $primary_type['value'] ) ? $primary_type['value'] : '';
	}

	/**
	 * Retrieve secondary type.
	 *
	 * @var string
	 */
	public static function get_secondary_type() {

		if ( ! class_exists( 'NewfoldLabs\WP\Module\Data\SiteClassification\SecondaryType' ) ) {
			return '';
		}

		$secondary_type = SecondaryType::instantiate_from_option();

		if ( ! $secondary_type ) {
			return '';
		}

		$secondary_type = $secondary_type->to_array();

		return isset( $secondary_type['value'] ) ? $secondary_type['value'] : '';
	}
}
