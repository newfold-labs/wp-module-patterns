<?php
namespace NewfoldLabs\WP\Module\Patterns\Services;

use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginActivationTask;
use NewfoldLabs\WP\Module\Installer\Tasks\PluginInstallTask;

class PluginService {

    /**
     * Check if a single plugin is installed.
     *
     * @param string|array $plugin Plugin slug or plugin array with 'slug' key.
     * @return boolean True if installed, false otherwise.
     */
    public static function is_installed($plugin) {
        $slug = is_array($plugin) ? $plugin['slug'] : $plugin;
        $plugin_type = PluginInstaller::get_plugin_type($slug);
        $plugin_path = isset($plugin['path']) ? $plugin['path'] : '';

        if (!$plugin_path) {
            if ( isset($plugin['basename']) ) {
                $plugin_path = $plugin['basename'];
            } else {
                return false;
            }
        }

        return PluginInstaller::is_plugin_installed($plugin_path);
    }

    /**
     * Check if a single plugin is active.
     *
     * @param string|array $plugin Plugin slug or plugin array with 'slug' key.
     * @return boolean True if active, false otherwise.
     */
    public static function is_active($plugin) {
        $slug = is_array($plugin) ? $plugin['slug'] : $plugin;
        $plugin_type = PluginInstaller::get_plugin_type($slug);
        $plugin_path = isset($plugin['path']) ? $plugin['path'] : '';

        if (!$plugin_path) {
            if ( isset($plugin['basename']) ) {
                $plugin_path = $plugin['basename'];
            } else {
                return false;
            }
        }

        if (!PluginInstaller::is_plugin_installed($plugin_path)) {
            return false;
        }

        return is_plugin_active($plugin_path);
    }

    /**
     * Install a single plugin.
     *
     * @param string|array $plugin Plugin slug or plugin array with 'slug' key.
     * @param boolean $activate Whether to activate the plugin after installation.
     * @return boolean True on success, false on failure.
     */
    public static function install($plugin, $activate = true) {
        if (is_string($plugin)) {
            $plugin = ['slug' => $plugin];
        }

        if (empty($plugin['slug'])) {
            return false;
        }

        if ( isset( $plugin['isPremium'] ) && $plugin['isPremium'] ) {
			return PluginInstaller::install_premium_plugin( $plugin['plsSlug'], $plugin['plsProviderName'], $activate );
		}

        $plugin_installation_task = new PluginInstallTask(
            $plugin['slug'],
            $activate,
            isset($plugin['priority']) ? $plugin['priority'] : 0
        );
        return $plugin_installation_task->execute();
    }

    /**
     * Activate a single plugin.
     *
     * @param string|array $plugin Plugin slug or plugin array with 'slug' key.
     * @return boolean True on success, false on failure.
     */
    public static function activate_plugin($plugin) {

        if (!self::is_installed($plugin)) {
            return false;
        }

        if ( isset( $plugin['isPremium'] ) && $plugin['isPremium'] ) {
			return PluginInstaller::install_premium_plugin( $plugin['plsSlug'], $plugin['plsProviderName'], true );
		}
        
        $slug = is_array($plugin) ? $plugin['slug'] : $plugin;
        $plugin_activation_task = new PluginActivationTask($slug);
        $result = $plugin_activation_task->execute();
        return $result;
    }

    /**
     * Setup a single plugin integration.
     *
     * @param string|array $plugin Plugin slug or plugin array with 'slug' key.
     * @return boolean True if setup was performed, false otherwise.
     */
    public static function setup_plugin($plugin) {
        $slug = is_array($plugin) ? $plugin['slug'] : $plugin;

        // Currently we only have special setup for Jetpack
        if ('jetpack' === $slug) {
            self::enable_jetpack_forms_module();
            return true;
        }

        return false;
    }

    /**
     * Activate or install the specified plugins.
     *
     * @param array $plugins Array of plugins to be activated or installed.
     * @return array Results with status for each plugin operation
     */
    public static function activate($plugins) {
        $results = [];

        if (!is_array($plugins) || empty($plugins)) {
            return $results;
        }

        foreach ($plugins as $plugin) {
            if (self::is_installed($plugin)) {
                $results[$plugin['slug']] = self::activate_plugin($plugin);
            } else {
                $results[$plugin['slug']] = self::install($plugin, true);
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
    public static function setup($plugins) {
        $results = [];

        if (!is_array($plugins) || empty($plugins)) {
            return $results;
        }

        foreach ($plugins as $plugin) {
            if (isset($plugin['slug'])) {
                $results[$plugin['slug']] = self::setup_plugin($plugin);
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
        if (class_exists('Jetpack') && !\Jetpack::is_module_active('contact-form')) {
            if ( ! \Jetpack::is_module_active('blocks') ) {
                \Jetpack::activate_module('blocks', false, false);
            }

            return \Jetpack::activate_module('contact-form', false, false);
        }
        
        // Return true if module is already active
        return class_exists('Jetpack') && \Jetpack::is_module_active('contact-form');
    }
}
