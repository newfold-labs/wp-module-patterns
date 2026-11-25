<?php

namespace NewfoldLabs\WP\Module\Patterns;

/**
 * Heading border inline styles.
 */
class HeadingStylesWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Build inline style string from border attributes.
	 *
	 * @return void
	 */
	public function test_build_inline_style_from_attributes() {
		$style = HeadingStyles::build_inline_style(
			array(
				'nfdHeadingBorderColor' => 'vivid-cyan-blue',
				'nfdHeadingBorderWidth' => '3px',
				'nfdHeadingBorderStyle' => 'dashed',
			)
		);

		$this->assertStringContainsString( '--nfd-heading-border:var(--wp--preset--color--vivid-cyan-blue)', $style );
		$this->assertStringContainsString( '--nfd-heading-border-size:3px', $style );
		$this->assertStringContainsString( '--nfd-heading-border-style:dashed', $style );
	}

	/**
	 * render_block filter adds CSS variables to the heading element.
	 *
	 * @return void
	 */
	public function test_render_block_adds_inline_style() {
		$service = new HeadingStyles();

		$html = $service->apply_heading_border_styles(
			'<h2 class="wp-block-heading is-style-nfd-heading-boxed">Hello</h2>',
			array(
				'blockName' => 'core/heading',
				'attrs'     => array(
					'nfdHeadingBorderColor' => '#336699',
					'nfdHeadingBorderWidth' => '2',
				),
			)
		);

		$this->assertStringContainsString( '--nfd-heading-border:#336699', $html );
		$this->assertStringContainsString( '--nfd-heading-border-size:2px', $html );
	}
}