<?php
namespace NewfoldLabs\WP\Module\Patterns\Data;

final class PluginRequirements {

	protected static $patterns = array(
		'form-1'     => array(
			array(
				'slug'        => 'jetpack',
				'name'        => 'Jetpack',
				'path'        => 'jetpack/jetpack.php',
				'url'         => 'https://wordpress.org/plugins/jetpack/',
				'description' => 'This plugin is essential for adding the contact form to this pattern!',
			),
		),
		'form-2'     => array(
			array(
				'slug'        => 'jetpack',
				'name'        => 'Jetpack',
				'path'        => 'jetpack/jetpack.php',
				'url'         => 'https://wordpress.org/plugins/jetpack/',
				'description' => 'This plugin is essential for adding the contact form to this pattern!',
			),
		),
		'form-3'     => array(
			array(
				'slug'        => 'jetpack',
				'name'        => 'Jetpack',
				'path'        => 'jetpack/jetpack.php',
				'url'         => 'https://wordpress.org/plugins/jetpack/',
				'description' => 'This plugin is essential for adding the contact form to this pattern!',
			),
		),
		'form-4'     => array(
			array(
				'slug'        => 'jetpack',
				'name'        => 'Jetpack',
				'path'        => 'jetpack/jetpack.php',
				'url'         => 'https://wordpress.org/plugins/jetpack/',
				'description' => 'This plugin is essential for adding the contact form to this pattern!',
			),
		),
		'form-5'     => array(
			array(
				'slug'        => 'jetpack',
				'name'        => 'Jetpack',
				'path'        => 'jetpack/jetpack.php',
				'url'         => 'https://wordpress.org/plugins/jetpack/',
				'description' => 'This plugin is essential for adding the contact form to this pattern!',
			),
		),
		'products-1' => array(
			array(
				'slug'        => 'woocommerce',
				'name'        => 'WooCommerce',
				'path'        => 'woocommerce/woocommerce.php',
				'url'         => 'https://wordpress.org/plugins/woocommerce/',
				'description' => 'This plugin is essential for adding the product grid to this pattern!',
			),
		),
		'products-2' => array(
			array(
				'slug'        => 'woocommerce',
				'name'        => 'WooCommerce',
				'path'        => 'woocommerce/woocommerce.php',
				'url'         => 'https://wordpress.org/plugins/woocommerce/',
				'description' => 'This plugin is essential for adding the product grid to this pattern!',
			),
		),
		'products-3' => array(
			array(
				'slug'        => 'woocommerce',
				'name'        => 'WooCommerce',
				'path'        => 'woocommerce/woocommerce.php',
				'url'         => 'https://wordpress.org/plugins/woocommerce/',
				'description' => 'This plugin is essential for adding the product grid to this pattern!',
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
			self::get_patterns_requirements();
		}

		return array();
	}

	/**
	 * Retrieves the plugin requirements for patterns.
	 *
	 * @return array The array of plugin requirements for patterns.
	 */
	private static function get_patterns_requirements() {

		$patterns = apply_filters( 'nfd_wb_patterns_plugin_requirements', self::$patterns );

		$patterns = array_map(
			function( $pattern ) {
				$pattern = self::enhance_requirements( $pattern );
				return $pattern;
			},
			$patterns
		);

		return $patterns;
	}

	/**
	 * Enhances the plugin requirements with additional information.
	 *
	 * @param array $requirements The original plugin requirements.
	 *
	 * @return array The enhanced plugin requirements.
	 */
	private static function enhance_requirements( $requirements ) {

		$solutions = get_transient( 'newfold_solutions' );

		if ( ! $solutions || empty( $solutions['entitlements'] ) ) {
			return $requirements;
		}

		$entitlements = isset( $solutions['entitlements'] ) ? $solutions['entitlements'] : array();

		foreach ( $requirements as $key => $requirement ) {

			$slug = isset( $requirement['slug'] ) ? $requirement['slug'] : '';

			if ( ! $slug ) {
				continue;
			}

			if ( !isset( $requirement['isPremium'] ) || isset( $requirement['isPremium'] ) && ! $requirement['isPremium'] ) {
				continue;
			}

			if ( ! empty( $entitlements ) ) {
				foreach ( $entitlements as $entitlement ) {
					$entitlement_slug = isset( $entitlement['slug'] ) ? $entitlement['slug'] : '';
					$entitlement_pls_slug = isset( $entitlement['plsSlug'] ) ? $entitlement['plsSlug'] : '';

					if ( $slug === $entitlement_slug || $slug === $entitlement_pls_slug ) {
						$requirements[$key] = array_merge(
						    $requirement,
						    $entitlement,
						    [
						        'isPremium' => $requirement['isPremium'] ?? false,
								'isEntitled' => true,
						    ]
						);
					}
				}
			}
		}

		return $requirements;
	}
}
