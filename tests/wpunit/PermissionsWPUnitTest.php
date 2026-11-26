<?php

namespace NewfoldLabs\WP\Module\Patterns;

/**
 * Permissions wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Patterns\Permissions
 */
class PermissionsWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Permission constants are defined.
	 *
	 * @return void
	 */
	public function test_permission_constants() {
		$this->assertSame( 'manage_options', Permissions::ADMIN );
		$this->assertSame( 'install_themes', Permissions::INSTALL_THEMES );
		$this->assertSame( 'edit_themes', Permissions::EDIT_THEMES );
		$this->assertSame( 'edit_pages', Permissions::EDITOR );
	}

	/**
	 * Is_admin returns false when not logged in.
	 *
	 * @return void
	 */
	public function test_is_admin_when_logged_out() {
		wp_set_current_user( 0 );
		$this->assertFalse( Permissions::is_admin() );
	}

	/**
	 * Is_admin returns true for administrator.
	 *
	 * @return void
	 */
	public function test_is_admin_when_administrator() {
		$user_id = self::factory()->user->create( array( 'role' => 'administrator' ) );
		wp_set_current_user( $user_id );
		$this->assertTrue( Permissions::is_admin() );
	}

	/**
	 * Is_authorized_admin returns true for administrator.
	 *
	 * @return void
	 */
	public function test_is_authorized_admin_for_administrator() {
		$user_id = self::factory()->user->create( array( 'role' => 'administrator' ) );
		wp_set_current_user( $user_id );
		$this->assertTrue( Permissions::is_authorized_admin() );
	}
}
