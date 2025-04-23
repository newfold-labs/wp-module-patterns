<?php
namespace NewfoldLabs\WP\Module\Patterns\Data;

final class PluginRequirements {

	protected static $patterns = array(
		'form-1'     => array(
			// array(
			// 	'slug' => 'jetpack',
			// 	'name' => 'Jetpack',
			// 	'path' => 'jetpack/jetpack.php',
			// 	'isPremium' => true,
			// ),
			array(
				'slug' => 'nfd_slug_yith_woocommerce_customize_myaccount_page',
				'name' => 'YITH WooCommerce Customize My Account Page Extended',
				'path' => 'yith-woocommerce-customize-myaccount-page-extended/init.php',
				'isPremium' => true,
			),
		),
		'form-2'     => array(
			array(
				'slug'        => 'jetpack',
				'name'        => 'Jetpack',
				'path'        => 'jetpack/jetpack.php',
				'description' => 'This plugin is essential for adding the contact form to this block and enhancing its functionality!',
				'isPremium'   => true,
			),
		),
		'form-3'     => array(
			array(
				'slug'        => 'jetpack',
				'name'        => 'Jetpack',
				'path'        => 'jetpack/jetpack.php',
				'description' => 'This plugin is essential for adding the contact form to this block and enhancing its functionality!',
			),
		),
		'form-4'     => array(
			array(
				'slug'        => 'jetpack',
				'name'        => 'Jetpack',
				'path'        => 'jetpack/jetpack.php',
				'description' => 'This plugin is essential for adding the contact form to this block and enhancing its functionality!',
			),
		),
		'form-5'     => array(
			array(
				'slug'        => 'jetpack',
				'name'        => 'Jetpack',
				'path'        => 'jetpack/jetpack.php',
				'description' => 'This plugin is essential for adding the contact form to this block and enhancing its functionality!',
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
