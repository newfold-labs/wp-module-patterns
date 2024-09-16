<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Services\PluginService;

/**
 * Controller for plugins.
 */
class PluginsController {

	public static function activate( $request ) {

		$plugins = $request->get_param( 'plugins' );

		PluginService::activate_plugins( $plugins );

		PluginService::setup_plugins( $plugins );

		return new \WP_REST_Response( array() );
	}
}
