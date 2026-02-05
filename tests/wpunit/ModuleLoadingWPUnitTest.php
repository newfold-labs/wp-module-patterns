<?php

namespace NewfoldLabs\WP\Module\Patterns;

use NewfoldLabs\WP\Module\Patterns\Data\PluginStatus;
use NewfoldLabs\WP\Module\Patterns\Api\RestApi;

/**
 * Module loading wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Patterns\Patterns
 */
class ModuleLoadingWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Verify core module classes exist.
	 *
	 * @return void
	 */
	public function test_module_classes_load() {
		$this->assertTrue( class_exists( Patterns::class ) );
		$this->assertTrue( class_exists( PatternsFeature::class ) );
		$this->assertTrue( class_exists( Permissions::class ) );
		$this->assertTrue( class_exists( PluginStatus::class ) );
		$this->assertTrue( class_exists( RestApi::class ) );
		$this->assertTrue( class_exists( Data\Brands::class ) );
		$this->assertTrue( class_exists( Api\Controllers\RestApiController::class ) );
	}

	/**
	 * Verify WordPress factory is available.
	 *
	 * @return void
	 */
	public function test_wordpress_factory_available() {
		$this->assertTrue( function_exists( 'get_option' ) );
		$this->assertNotEmpty( get_option( 'blogname' ) );
	}

	/**
	 * Wonder Blocks constants are defined when bootstrap loaded.
	 *
	 * @return void
	 */
	public function test_wonder_blocks_constants_defined() {
		$this->assertTrue( defined( 'NFD_WONDER_BLOCKS_VERSION' ) );
		$this->assertTrue( defined( 'NFD_WONDER_BLOCKS_DIR' ) );
	}
}
