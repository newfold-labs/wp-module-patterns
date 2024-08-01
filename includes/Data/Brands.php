<?php
namespace NewfoldLabs\WP\Module\Patterns\Data;

use function NewfoldLabs\WP\ModuleLoader\container;

/**
 * Contains Brand information.
 */
final class Brands {

	/**
	 * Brand specific data
	 *
	 * @return array
	 */
	public static function get_brands() {
		return array(
			'bluehost'      => array(
				'brand'               => 'bluehost',
				'name'                => 'Bluehost',
				'pluginDashboardPage' => \admin_url( 'admin.php?page=bluehost#/settings' ),
			),
			'crazy-domains' => array(
				'brand'               => 'crazy-domains',
				'name'                => 'Crazy Domains',
				'pluginDashboardPage' => \admin_url( 'admin.php?page=crazy-domains' ),
			),
			'hostgator'     => array(
				'brand'               => 'hostgator',
				'name'                => 'HostGator',
				'pluginDashboardPage' => \admin_url( 'admin.php?page=hostgator' ),
			),
			'wordpress'     => array(
				'brand'               => 'wordpress',
				'name'                => 'WordPress',
				'pluginDashboardPage' => \admin_url(),
			),
		);
	}

	/**
	 * Get the current brand.
	 *
	 * @return array
	 */
	public static function getCurrentBrand() {
		$brandID         = container()->plugin()->brand;
		$brands          = self::get_brands();
		$brand           = isset( $brands[ $brandID ] ) ? $brands[ $brandID ] : $brands['wordpress'];
		$brand['plugin'] = container()->plugin()->name;
		return $brand;
	}
}
