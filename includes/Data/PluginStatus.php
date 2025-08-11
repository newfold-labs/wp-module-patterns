<?php
namespace NewfoldLabs\WP\Module\Patterns\Data;

/**
 * Class PluginStatus
 *
 * Provides utility methods to check the installation and activation status of WordPress plugins.
 *
 * @package NewfoldLabs\WP\Module\Patterns\Data
 */
class PluginStatus {

	/**
	 * Check the status of a plugin.
	 *
	 * @param string $slug Plugin slug, e.g., 'jetpack/jetpack.php'.
	 * @return string Plugin status: 'installed', 'active', 'inactive', or 'not_installed'.
	 */
	public static function check( $slug ) {

		// Check if the plugin is installed
		if ( ! array_key_exists( $slug, get_plugins() ) ) {
			return 'not_installed';
		}

		// Check if the plugin is active
		if ( is_plugin_active( $slug ) ) {
			// Special handling for Jetpack - check required modules
			if ( 'jetpack/jetpack.php' === $slug ) {
				return self::check_jetpack_modules() ? 'active' : 'inactive';
			}

			return 'active';
		}

		// The plugin is installed but inactive
		return 'inactive';
	}

	/**
	 * Check if required Jetpack modules are active.
	 *
	 * @return bool True if blocks and contact-form modules are active, false otherwise.
	 */
	private static function check_jetpack_modules() {
		// Return false if Jetpack class doesn't exist
		if ( ! class_exists( 'Jetpack' ) ) {
			return false;
		}

		// Check if both required modules are active
		$required_modules = array( 'blocks', 'contact-form' );

		foreach ( $required_modules as $module ) {
			if ( ! \Jetpack::is_module_active( $module ) ) {
				return false;
			}
		}

		return true;
	}
}
