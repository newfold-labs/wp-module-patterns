<?php

namespace NewfoldLabs\WP\Module\Patterns;

/**
 * BlockStyles linked block rendering tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\Patterns\BlockStyles
 */
class BlockStylesWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Group block gets overlay link when linkUrl is set.
	 *
	 * @return void
	 */
	public function test_injects_group_overlay_link() {
		$handler = new BlockStyles();
		$html    = '<div class="wp-block-group"></div>';
		$block   = array(
			'blockName' => 'core/group',
			'attrs'     => array(
				'linkUrl'           => 'https://example.org',
				'linkOpensInNewTab' => true,
			),
		);

		$filtered = $handler->render_linked_group_block( $html, $block );

		$this->assertStringContainsString( 'nfd-is-linked-group', $filtered );
		$this->assertStringContainsString( 'wp-block-group__link', $filtered );
		$this->assertStringContainsString( 'href="https://example.org"', $filtered );
		$this->assertStringContainsString( 'target="_blank"', $filtered );
	}

	/**
	 * Cover block leaves markup unchanged when no linkUrl.
	 *
	 * @return void
	 */
	public function test_skips_cover_without_link() {
		$handler = new BlockStyles();
		$html    = '<div class="wp-block-cover"></div>';
		$block   = array(
			'blockName' => 'core/cover',
			'attrs'     => array(),
		);

		$filtered = $handler->render_linked_cover_block( $html, $block );

		$this->assertSame( $html, $filtered );
	}
}
