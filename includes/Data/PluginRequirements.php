<?php
namespace NewfoldLabs\WP\Module\Patterns\Data;

final class PluginRequirements {

	protected static $patterns = array(
		'form-1'     => array(
			array(
				'slug' => 'jetpack',
				'name' => 'Jetpack',
				'path' => 'jetpack/jetpack.php',
			),
		),
		'form-2'     => array(
			array(
				'slug' => 'jetpack',
				'name' => 'Jetpack',
				'path' => 'jetpack/jetpack.php',
			),
		),
		'form-3'     => array(
			array(
				'slug' => 'jetpack',
				'name' => 'Jetpack',
				'path' => 'jetpack/jetpack.php',
			),
		),
		'form-4'     => array(
			array(
				'slug' => 'jetpack',
				'name' => 'Jetpack',
				'path' => 'jetpack/jetpack.php',
			),
		),
		'form-5'     => array(
			array(
				'slug' => 'jetpack',
				'name' => 'Jetpack',
				'path' => 'jetpack/jetpack.php',
			),
		),
		'products-1' => array(
			array(
				'slug' => 'woocommerce',
				'name' => 'WooCommerce',
				'path' => 'woocommerce/woocommerce.php',
			),
		),
		'products-2' => array(
			array(
				'slug' => 'woocommerce',
				'name' => 'WooCommerce',
				'path' => 'woocommerce/woocommerce.php',
			),
		),
		'products-3' => array(
			array(
				'slug' => 'woocommerce',
				'name' => 'WooCommerce',
				'path' => 'woocommerce/woocommerce.php',
			),
		),
	);

	/**
	 * Retrieves plugin requirements for a specific type.
	 *
	 * @param string $type The type of requirements to retrieve. Defaults to 'patterns'.
	 *
	 * @return array The array of plugin requirements for the specified type.
	 */
	public static function get( $type = 'patterns' ) {

		if ( 'patterns' === $type ) {
			return self::$patterns;
		}

		return array();
	}
}
