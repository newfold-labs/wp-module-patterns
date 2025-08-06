<?php
namespace NewfoldLabs\WP\Module\Patterns\Services;

use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginActivationTask;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginInstallTask;

/**
 * Class PluginService
 *
 * Provides utility methods for managing WordPress plugins within the Patterns module.
 * This service handles plugin installation, activation, and integration setup for
 * plugins required by various patterns. It offers both individual and bulk operations
 * for plugin management with special handling for premium plugins.
 */
class PluginService {

	/**
	 * Check if a single plugin is installed.
	 *
	 * @param string|array $plugin Plugin slug or plugin array with 'slug' key.
	 * @return boolean True if installed, false otherwise.
	 */
	public static function is_installed( $plugin ) {
		$slug        = is_array( $plugin ) ? $plugin['slug'] : $plugin;
		$plugin_type = PluginInstaller::get_plugin_type( $slug );
		$plugin_path = isset( $plugin['path'] ) ? $plugin['path'] : '';

		if ( ! $plugin_path ) {
			if ( isset( $plugin['basename'] ) ) {
				$plugin_path = $plugin['basename'];
			} else {
				return false;
			}
		}

		return PluginInstaller::is_plugin_installed( $plugin_path );
	}

	/**
	 * Check if a single plugin is active.
	 *
	 * @param string|array $plugin Plugin slug or plugin array with 'slug' key.
	 * @return boolean True if active, false otherwise.
	 */
	public static function is_active( $plugin ) {
		$slug        = is_array( $plugin ) ? $plugin['slug'] : $plugin;
		$plugin_type = PluginInstaller::get_plugin_type( $slug );
		$plugin_path = isset( $plugin['path'] ) ? $plugin['path'] : '';

		if ( ! $plugin_path ) {
			if ( isset( $plugin['basename'] ) ) {
				$plugin_path = $plugin['basename'];
			} else {
				return false;
			}
		}

		if ( ! PluginInstaller::is_plugin_installed( $plugin_path ) ) {
			return false;
		}

		return is_plugin_active( $plugin_path );
	}

	/**
	 * Install a single plugin.
	 *
	 * @param string|array $plugin Plugin slug or plugin array with 'slug' key.
	 * @param boolean      $activate Whether to activate the plugin after installation.
	 * @return boolean True on success, false on failure.
	 */
	public static function install( $plugin, $activate = true ) {
		if ( is_string( $plugin ) ) {
			$plugin = array( 'slug' => $plugin );
		}

		if ( empty( $plugin['slug'] ) ) {
			return false;
		}

		if ( isset( $plugin['isPremium'] ) && $plugin['isPremium'] ) {
			return PluginInstaller::install_premium_plugin( $plugin['plsSlug'], $plugin['plsProviderName'], $activate );
		}

		$plugin_installation_task = new PluginInstallTask(
			$plugin['slug'],
			$activate,
			isset( $plugin['priority'] ) ? $plugin['priority'] : 0
		);
		return $plugin_installation_task->execute();
	}

	/**
	 * Activate a single plugin.
	 *
	 * @param string|array $plugin Plugin slug or plugin array with 'slug' key.
	 * @return boolean True on success, false on failure.
	 */
	public static function activate_plugin( $plugin ) {

		if ( ! self::is_installed( $plugin ) ) {
			return false;
		}

		if ( isset( $plugin['isPremium'] ) && $plugin['isPremium'] ) {
			$basename = $plugin['basename'] ?? $plugin['path'] ?? '';
			$activate_plugin_response = activate_plugin( $basename );
			if ( is_wp_error( $activate_plugin_response ) ) {
				$activate_plugin_response->add(
					'nfd_installer_error',
					__( 'Failed to activate the plugin: ', 'nfd-wonder-blocks' ) . $plugin['slug'],
					array(
						'plugin'   => $plugin['slug'],
						'provider' => $plugin['provider'],
						'basename' => $basename,
					)
				);
				return $activate_plugin_response;
			}
			return true;
		}

		$slug                   = is_array( $plugin ) ? $plugin['slug'] : $plugin;
		$plugin_activation_task = new PluginActivationTask( $slug );
		$result                 = $plugin_activation_task->execute();

		if ( is_wp_error( $result ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Setup a single plugin integration.
	 *
	 * @param string|array $plugin Plugin slug or plugin array with 'slug' key.
	 * @return boolean True if setup was performed, false otherwise.
	 */
	public static function setup_plugin( $plugin ) {
		$slug = is_array( $plugin ) ? $plugin['slug'] : $plugin;

		// Currently we only have special setup for Jetpack
		if ( 'jetpack' === $slug ) {
			self::enable_jetpack_forms_module();
			return true;
		}

		if ( 'wordpress-seo-premium' === $slug ) {
			return self::enable_yoast_seo_premium();
		}

		return false;
	}

	/**
	 * Activate or install the specified plugins.
	 *
	 * @param array $plugins Array of plugins to be activated or installed.
	 * @return array Results with status for each plugin operation
	 */
	public static function activate( $plugins ) {
		$results = array();

		if ( ! is_array( $plugins ) || empty( $plugins ) ) {
			return $results;
		}

		foreach ( $plugins as $plugin ) {
			if ( self::is_installed( $plugin ) ) {
				$results[ $plugin['slug'] ] = self::activate_plugin( $plugin );
			} else {
				$results[ $plugin['slug'] ] = self::install( $plugin, true );
			}
		}

		return $results;
	}

	/**
	 * Setup the integration for specific plugins.
	 *
	 * This method loops through the provided list of plugins and enables
	 * specific functionality or modules based on the plugin slug.
	 *
	 * @param array $plugins Array of plugins to be integrated. Each element is expected to have a 'slug' key.
	 * @return array Results of setup operations
	 */
	public static function setup( $plugins ) {
		$results = array();

		if ( ! is_array( $plugins ) || empty( $plugins ) ) {
			return $results;
		}

		foreach ( $plugins as $plugin ) {
			if ( isset( $plugin['slug'] ) ) {
				$results[ $plugin['slug'] ] = self::setup_plugin( $plugin );
			}
		}

		return $results;
	}

	/**
	 * Enable the Jetpack Forms module.
	 *
	 * @return boolean True if module was activated or was already active
	 */
	public static function enable_jetpack_forms_module() {
		if ( class_exists( 'Jetpack' ) ) {
			if ( ! \Jetpack::is_module_active( 'contact-form' ) ) {
				\Jetpack::activate_module( 'contact-form', false, false );
			}

			if ( ! \Jetpack::is_module_active( 'blocks' ) ) {
				\Jetpack::activate_module( 'blocks', false, false );
			}

			return \Jetpack::is_module_active( 'contact-form' ) && \Jetpack::is_module_active( 'blocks' );
		}

		// Return true if module is already active
		return class_exists( 'Jetpack' ) && \Jetpack::is_module_active( 'contact-form' ) && \Jetpack::is_module_active( 'blocks' );
	}

	/**
	 * Enable the Yoast SEO Premium module.
	 *
	 * @return boolean True if module was activated or was already active
	 */
	public static function enable_yoast_seo_premium() {
		if ( class_exists( 'WPSEO_Options' ) ) {
			// Disable redirect to Yoast onboarding.
			\WPSEO_Options::set( 'should_redirect_after_install', false );
		}

		return true;
	}
}
