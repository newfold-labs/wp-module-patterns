<?php

namespace NewfoldLabs\WP\Module\Patterns;

/**
 * Responsive block classes wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Patterns\ResponsiveBlockClasses
 */
class ResponsiveBlockClassesWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Swipe attribute adds nfd-swiper-enabled on columns markup.
	 *
	 * @return void
	 */
	public function test_adds_swiper_class_from_columns_attributes() {
		$handler = new ResponsiveBlockClasses();
		$html    = '<div class="wp-block-columns is-layout-flex"></div>';
		$block   = array(
			'blockName' => 'core/columns',
			'attrs'     => array(
				'nfdSwipeContent' => true,
			),
		);

		$filtered = $handler->add_utility_classes( $html, $block );

		$this->assertStringContainsString( 'nfd-swiper-enabled', $filtered );
	}
}
