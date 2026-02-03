<?php

namespace NewfoldLabs\WP\Module\Patterns;

use NewfoldLabs\WP\Module\Patterns\Api\RestApi;

/**
 * RestApi wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Patterns\Api\RestApi
 */
class RestApiWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * rest_api_init registers nfd-wonder-blocks REST routes.
	 *
	 * @return void
	 */
	public function test_rest_api_init_registers_patterns_routes() {
		new RestApi();
		do_action( 'rest_api_init' );
		$server = rest_get_server();
		$routes = $server->get_routes();
		$found  = array_filter(
			array_keys( $routes ),
			function ( $route ) {
				return strpos( $route, 'nfd-wonder-blocks' ) !== false;
			}
		);
		$this->assertNotEmpty( $found, 'Expected nfd-wonder-blocks routes to be registered' );
	}
}
