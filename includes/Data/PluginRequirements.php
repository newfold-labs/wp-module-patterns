<?php
namespace NewfoldLabs\WP\Module\Patterns\Data;

/**
 * Class PluginRequirements
 *
 * Manages plugin dependencies in the Patterns module.
 * This class provides functionality to retrieve, enhance, and process plugin
 * requirements for different pattern types, adding additional information
 * such as logos and premium status.
 */
final class PluginRequirements {

	/**
	 * An array of pattern-specific plugin requirements.
	 *
	 * @var array
	 */
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
		'products-4' => array(
			array(
				'slug'        => 'woocommerce',
				'name'        => 'WooCommerce',
				'path'        => 'woocommerce/woocommerce.php',
				'url'         => 'https://wordpress.org/plugins/woocommerce/',
				'description' => 'This plugin is essential for adding the product grid to this pattern!',
			),
		),
		'products-5' => array(
			array(
				'slug'        => 'woocommerce',
				'name'        => 'WooCommerce',
				'path'        => 'woocommerce/woocommerce.php',
				'url'         => 'https://wordpress.org/plugins/woocommerce/',
				'description' => 'This plugin is essential for adding the product grid to this pattern!',
			),
		),
		'products-6' => array(
			array(
				'slug'        => 'woocommerce',
				'name'        => 'WooCommerce',
				'path'        => 'woocommerce/woocommerce.php',
				'url'         => 'https://wordpress.org/plugins/woocommerce/',
				'description' => 'This plugin is essential for adding the product grid to this pattern!',
			),
		),
		'table-of-contents-1' => array(
			array(
				'slug'        => 'yoast-seo-wordpress-premium',
				'name'        => 'Yoast SEO',
				'path'        => 'wordpress-seo-premium/wp-seo-premium.php',
				'url'         => 'https://yoast.com',
				'description' => 'SEO made easy! Improve your ranking in search engines, boost performance and visibility, and get 24/7 premium support.',
				'isPremium'   => true,
				'ctbId'       => '57d6a568-783c-45e2-a388-847cff155897',
			),
		),
		'table-of-contents-2' => array(
			array(
				'slug'        => 'yoast-seo-wordpress-premium',
				'name'        => 'Yoast SEO',
				'path'        => 'wordpress-seo-premium/wp-seo-premium.php',
				'url'         => 'https://yoast.com',
				'description' => 'SEO made easy! Improve your ranking in search engines, boost performance and visibility, and get 24/7 premium support.',
				'isPremium'   => true,
				'ctbId'       => '57d6a568-783c-45e2-a388-847cff155897',
			),
		),
		'table-of-contents-3' => array(
			array(
				'slug'        => 'yoast-seo-wordpress-premium',
				'name'        => 'Yoast SEO',
				'path'        => 'wordpress-seo-premium/wp-seo-premium.php',
				'url'         => 'https://yoast.com',
				'description' => 'SEO made easy! Improve your ranking in search engines, boost performance and visibility, and get 24/7 premium support.',
				'isPremium'   => true,
				'ctbId'       => '57d6a568-783c-45e2-a388-847cff155897',
			),
		),
		'header-20'  => array(
			array(
				'slug'        => 'woocommerce',
				'name'        => 'WooCommerce',
				'path'        => 'woocommerce/woocommerce.php',
				'url'         => 'https://wordpress.org/plugins/woocommerce/',
				'description' => 'This plugin is essential for adding the product grid to this pattern!',
			),
		),
		'header-21'  => array(
			array(
				'slug'        => 'woocommerce',
				'name'        => 'WooCommerce',
				'path'        => 'woocommerce/woocommerce.php',
				'url'         => 'https://wordpress.org/plugins/woocommerce/',
				'description' => 'This plugin is essential for adding the product grid to this pattern!',
			),
		),
		'header-22'  => array(
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
			return self::get_patterns_requirements();
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
			function ( $pattern ) {
				$pattern = self::enhance_requirements( $pattern );
				$pattern = self::add_logo( $pattern );
				return $pattern;
			},
			$patterns
		);

		return $patterns;
	}

	/**
	 * Adds a logo identifier to each plugin requirement in a pattern.
	 *
	 * @param array $pattern An array of plugin requirements for a specific pattern.
	 *               Each requirement is an associative array containing plugin details.
	 *
	 * @return array The pattern with logo identifiers added to each plugin requirement.
	 */
	private static function add_logo( $pattern ) {
		foreach ( $pattern as $key => $requirement ) {
			$slug     = isset( $requirement['slug'] ) ? $requirement['slug'] : '';
			$pls_slug = isset( $requirement['plsSlug'] ) ? $requirement['plsSlug'] : '';

			$pattern[ $key ]['logo'] = self::get_logo_for_plugin( $slug, $pls_slug );
		}

		return $pattern;
	}

	/**
	 * Get the logo identifier for a plugin based on its slug.
	 *
	 * @param string $slug    The plugin slug.
	 * @param string $pls_slug Optional PLS slug.
	 *
	 * @return string The logo identifier or empty string if no match.
	 */
	private static function get_logo_for_plugin( $slug, $pls_slug = '' ) {
		$known_logos = array(
			'yoast'       => array( 'yoast' ),
			'yith'        => array( 'yith' ),
			'jetpack'     => array( 'jetpack' ),
			'woocommerce' => array( 'woocommerce', 'wc-' ),
		);

		foreach ( $known_logos as $logo => $patterns ) {
			foreach ( $patterns as $pattern ) {
				if ( strpos( $slug, $pattern ) !== false || ( $pls_slug && strpos( $pls_slug, $pattern ) !== false ) ) {
					return $logo;
				}
			}
		}

		return '';
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

			if ( ! isset( $requirement['isPremium'] ) || ( isset( $requirement['isPremium'] ) && ! $requirement['isPremium'] ) ) {
				continue;
			}

			if ( ! empty( $entitlements ) ) {
				foreach ( $entitlements as $entitlement ) {
					$entitlement_slug     = isset( $entitlement['slug'] ) ? $entitlement['slug'] : '';
					$entitlement_pls_slug = isset( $entitlement['plsSlug'] ) ? $entitlement['plsSlug'] : '';

					if ( $slug === $entitlement_slug || $slug === $entitlement_pls_slug ) {
						$requirements[ $key ] = array_merge(
							$requirement,
							$entitlement,
							array(
								'isPremium'  => $requirement['isPremium'] ?? false,
								'isEntitled' => true,
								'ctbId'      => '',
							)
						);
					}
				}
			}
		}

		return $requirements;
	}
}
