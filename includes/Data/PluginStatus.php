<?php
namespace NewfoldLabs\WP\Module\Patterns\Data;

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
			return 'active';
		}

		// The plugin is installed but inactive
		return 'inactive';
	}
}
