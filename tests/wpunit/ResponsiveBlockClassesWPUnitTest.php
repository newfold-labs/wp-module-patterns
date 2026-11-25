<?php

namespace NewfoldLabs\WP\Module\Patterns\Tests\Wpunit;

use NewfoldLabs\WP\Module\Patterns\ResponsiveBlockClasses;

class ResponsiveBlockClassesWPUnitTest extends \Codeception\Test\Unit {

	/**
	 * @var ResponsiveBlockClasses
	 */
	private $handler;

	/**
	 * Set up test case.
	 */
	protected function _before() {
		parent::_before();
		$this->handler = new ResponsiveBlockClasses();
	}

	public function test_adds_swiper_class_from_columns_attributes() {
		$html  = '<div class="wp-block-columns is-layout-flex"></div>';
		$block = array(
			'blockName' => 'core/columns',
			'attrs'     => array(
				'nfdSwipeContent' => true,
			),
		);

		$filtered = apply_filters( 'render_block', $html, $block );

		$this->assertStringContainsString( 'nfd-swiper-enabled', $filtered );
	}

}