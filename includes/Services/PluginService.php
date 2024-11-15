<?php
namespace NewfoldLabs\WP\Module\Patterns\Services;

use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginActivationTask;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginInstallTask;

class PluginService {

	/**
	 * Activate or install the specified plugins.
	 *
	 * @param array $plugins Array of plugins to be activated or installed.
	 *
	 * @return void
	 */
	public static function activate( $plugins ) {

		if ( ! \is_array( $plugins ) || empty( $plugins ) ) {
			return;
		}

		foreach ( $plugins as $plugin ) {

			$plugin_type = PluginInstaller::get_plugin_type( $plugin['slug'] );
			$plugin_path = PluginInstaller::get_plugin_path( $plugin['slug'], $plugin_type );

			if ( ! $plugin_path ) {
				continue;
			}

			if ( PluginInstaller::is_plugin_installed( $plugin_path ) ) {
				$plugin_activation_task = new PluginActivationTask(
					$plugin['slug']
				);
				$plugin_activation_task->execute();

				continue;
			}

			$plugin_installation_task = new PluginInstallTask(
				$plugin['slug'],
				true,
				isset( $plugin['priority'] ) ? $plugin['priority'] : 0
			);
			$plugin_installation_task->execute();
		}
	}

	/**
	 * Setup the integration for specific plugins.
	 *
	 * This method loops through the provided list of plugins and enables
	 * specific functionality or modules based on the plugin slug.
	 *
	 * @param array $plugins Array of plugins to be integrated. Each element is expected to have a 'slug' key.
	 *
	 * @return void
	 */
	public static function setup( $plugins ) {
		if ( ! is_array( $plugins ) || empty( $plugins ) ) {
			return;
		}

		foreach ( $plugins as $plugin ) {
			if ( isset( $plugin['slug'] ) && 'jetpack' === $plugin['slug'] ) {
				self::enable_jetpack_forms_module();
			}
		}
	}

	/**
	 * Enable the Jetpack Forms module.
	 */
	public static function enable_jetpack_forms_module() {
		if ( class_exists( 'Jetpack' ) && ! \Jetpack::is_module_active( 'contact-form' ) ) {
			\Jetpack::activate_module( 'contact-form', false, false );
		}
	}
}
