<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Services\PluginService;
use WP_REST_Response;
use WP_Error;

/**
 * Controller for plugins.
 */
class PluginsController {

	/**
	 * Activate multiple plugins (legacy endpoint).
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return WP_REST_Response Response object.
	 */
	public static function activate( $request ) {
		$plugins = $request->get_param( 'plugins' );

		PluginService::activate( $plugins );
		PluginService::setup( $plugins );

		return new \WP_REST_Response( array() );
	}

	/**
	 * Check status of a single plugin.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object or error.
	 */
	public static function check_plugin_status( $request ) {
		$plugin = $request->get_param( 'plugin' );

		if ( empty( $plugin ) ) {
			return new WP_Error(
				'missing_plugin_param',
				__( 'The plugin parameter is required.', 'nfd-wonder-blocks' ),
				array( 'status' => 400 )
			);
		}

		return new WP_REST_Response(
			array(
				'slug'   => is_array( $plugin ) ? $plugin['slug'] : $plugin,
				'status' => $plugin['status'] ?? 'not-installed',
			)
		);
	}

	/**
	 * Install a single plugin.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object or error.
	 */
	public static function install_plugin( $request ) {
		$plugin = $request->get_param( 'plugin' );

		if ( empty( $plugin ) ) {
			return new WP_Error(
				'missing_plugin_param',
				__( 'The plugin parameter is required.', 'nfd-wonder-blocks' ),
				array( 'status' => 400 )
			);
		}

		$activate = $request->get_param( 'activate' ) !== false;
		$result   = PluginService::install( $plugin, $activate );

		if ( is_wp_error( $result ) ) {
			return $result;
		}

		return new WP_REST_Response(
			array(
				'success'   => $result,
				'slug'      => is_array( $plugin ) ? $plugin['slug'] : $plugin,
				'activated' => $activate && $result,
			)
		);
	}

	/**
	 * Activate a single plugin.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object or error.
	 */
	public static function activate_plugin( $request ) {
		$plugin = $request->get_param( 'plugin' );

		if ( empty( $plugin ) ) {
			return new WP_Error(
				'missing_plugin_param',
				__( 'The plugin parameter is required.', 'nfd-wonder-blocks' ),
				array( 'status' => 400 )
			);
		}

		$success = PluginService::activate_plugin( $plugin );

		return new WP_REST_Response(
			array(
				'success' => $success,
				'slug'    => is_array( $plugin ) ? $plugin['slug'] : $plugin,
			)
		);
	}

	/**
	 * Setup a single plugin integration.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object or error.
	 */
	public static function setup_plugin( $request ) {
		$plugin = $request->get_param( 'plugin' );

		if ( empty( $plugin ) ) {
			return new WP_Error(
				'missing_plugin_param',
				__( 'The plugin parameter is required.', 'nfd-wonder-blocks' ),
				array( 'status' => 400 )
			);
		}

		$success = PluginService::setup_plugin( $plugin );

		return new WP_REST_Response(
			array(
				'success' => $success,
				'slug'    => is_array( $plugin ) ? $plugin['slug'] : $plugin,
			)
		);
	}

	/**
	 * Process a single plugin completely - check, install, activate, and setup.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object or error.
	 */
	public static function process_plugin( $request ) {
		$plugin = $request->get_param( 'plugin' );

		if ( empty( $plugin ) ) {
			return new WP_Error(
				'missing_plugin_param',
				__( 'The plugin parameter is required.', 'nfd-wonder-blocks' ),
				array( 'status' => 400 )
			);
		}

		$slug   = is_array( $plugin ) ? $plugin['slug'] : $plugin;
		$result = array(
			'slug'  => $slug,
			'steps' => array(),
		);

		// Step 1: Check status
		$is_installed = PluginService::is_installed( $plugin );
		$is_active    = $is_installed && PluginService::is_active( $plugin );

		$result['initial_status'] = $is_active ? 'active' : ( $is_installed ? 'inactive' : 'not-installed' );

		// Step 2: Install if needed
		if ( ! $is_installed ) {
			$install_success            = PluginService::install( $plugin, true );
			$result['steps']['install'] = $install_success;

			if ( $install_success ) {
				$is_active = true; // install() activates by default
			} else {
				// If installation failed, return early
				$result['final_status'] = 'not-installed';
				$result['success']      = false;
				return new WP_REST_Response( $result );
			}
		}

		// Step 3: Activate if needed
		if ( $is_installed && ! $is_active ) {
			$activate_success            = PluginService::activate_plugin( $plugin );
			$result['steps']['activate'] = $activate_success;

			if ( $activate_success ) {
				$is_active = true;
			} else {
				$result['final_status'] = 'inactive';
				$result['success']      = false;
				return new WP_REST_Response( $result );
			}
		}

		// Step 4: Setup if active
		if ( $is_active ) {
			$setup_success            = PluginService::setup_plugin( $plugin );
			$result['steps']['setup'] = $setup_success;
		}

		$result['final_status'] = $is_active ? 'active' : ( $is_installed ? 'inactive' : 'not-installed' );
		$result['success']      = $is_active;

		return new WP_REST_Response( $result );
	}
}
