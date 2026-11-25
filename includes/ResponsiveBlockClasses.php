<?php

namespace NewfoldLabs\WP\Module\Patterns;

/**
 * Injects Wonder Blocks utility classes on the frontend from block JSON attributes.
 *
 * Mirrors inspector-control.js addSaveProps (animations, group effects, columns swipe).
 */
class ResponsiveBlockClasses {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_filter( 'render_block', array( $this, 'add_utility_classes' ), 10, 2 );
	}

	/**
	 * Map block attributes to utility CSS classes.
	 *
	 * @param array<string, mixed> $attributes Block attributes.
	 * @return string[] Class names.
	 */
	private function get_classes_from_attributes( array $attributes ): array {
		$classes = array();

		if ( ! empty( $attributes['nfdGroupDivider'] ) ) {
			$classes[] = $attributes['nfdGroupDivider'];
		}

		if ( ! empty( $attributes['nfdAnimation'] ) ) {
			$classes[] = 'nfd-wb-animate';
			$classes[] = $attributes['nfdAnimation'];
		}

		if ( ! empty( $attributes['nfdAnimationDelay'] ) && ! empty( $attributes['nfdAnimation'] ) ) {
			$classes[] = $attributes['nfdAnimationDelay'];
		}

		if ( ! empty( $attributes['nfdGroupEffect'] ) ) {
			$classes[] = 'nfd-bg-effect-' . $attributes['nfdGroupEffect'];
		}

		if ( ! empty( $attributes['nfdSwipeContent'] ) ) {
			$classes[] = 'nfd-swiper-enabled';
		}

		return $classes;
	}

	/**
	 * Add missing utility classes to the block wrapper element.
	 *
	 * @param string $block_content Block HTML.
	 * @param array  $block         Parsed block data.
	 * @return string Filtered block HTML.
	 */
	public function add_utility_classes( string $block_content, array $block ): string {
		if ( '' === $block_content || empty( $block['blockName'] ) ) {
			return $block_content;
		}

		$attrs  = isset( $block['attrs'] ) && is_array( $block['attrs'] ) ? $block['attrs'] : array();
		$to_add = $this->get_classes_from_attributes( $attrs );

		if ( empty( $to_add ) ) {
			return $block_content;
		}

		$processor = new \WP_HTML_Tag_Processor( $block_content );
		if ( ! $processor->next_tag() ) {
			return $block_content;
		}

		$existing = $processor->get_attribute( 'class' );
		$existing = is_string( $existing ) ? preg_split( '/\s+/', trim( $existing ) ) : array();
		$existing = is_array( $existing ) ? array_filter( $existing ) : array();

		$merged = array_unique( array_merge( $existing, $to_add ) );
		$processor->set_attribute( 'class', implode( ' ', $merged ) );

		return $processor->get_updated_html();
	}
}
