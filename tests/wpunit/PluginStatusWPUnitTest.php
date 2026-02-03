<?php

namespace NewfoldLabs\WP\Module\Patterns;

use NewfoldLabs\WP\Module\Patterns\Data\PluginStatus;

/**
 * PluginStatus wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Patterns\Data\PluginStatus
 */
class PluginStatusWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * check returns not_installed for non-existent plugin slug.
	 *
	 * @return void
	 */
	public function test_check_returns_not_installed_for_unknown_slug() {
		$status = PluginStatus::check( 'nonexistent-plugin/nonexistent-plugin.php' );
		$this->assertSame( 'not_installed', $status );
	}

	/**
	 * check returns active or inactive for an installed plugin.
	 *
	 * @return void
	 */
	public function test_check_returns_active_or_inactive_for_installed_plugin() {
		$all_plugins = get_plugins();
		if ( empty( $all_plugins ) ) {
			$this->markTestSkipped( 'No plugins installed in test environment' );
		}
		$slug   = array_key_first( $all_plugins );
		$status = PluginStatus::check( $slug );
		$this->assertContains( $status, array( 'active', 'inactive' ), 'Installed plugin should be active or inactive' );
	}
}
