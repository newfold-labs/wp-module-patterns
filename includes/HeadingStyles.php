<?php

namespace NewfoldLabs\WP\Module\Patterns;

/**
 * Server-side support for Wonder Blocks heading styles and border attributes.
 */
class HeadingStyles {

	/**
	 * Constructor.
	 */
	public function __construct() {
		\add_filter( 'register_block_type_args', array( $this, 'register_heading_attributes' ), 10, 2 );
		\add_filter( 'render_block', array( $this, 'apply_heading_border_styles' ), 10, 2 );
	}

	/**
	 * Register custom attributes for core/heading.
	 *
	 * @param array  $args       Block type arguments.
	 * @param string $block_type Block type name.
	 * @return array
	 */
	public function register_heading_attributes( array $args, string $block_type ): array {
		if ( 'core/heading' !== $block_type ) {
			return $args;
		}

		if ( ! isset( $args['attributes'] ) || ! is_array( $args['attributes'] ) ) {
			$args['attributes'] = array();
		}

		$args['attributes']['nfdHeadingBorderColor'] = array(
			'type' => 'string',
		);
		$args['attributes']['nfdHeadingBorderWidth']  = array(
			'type' => 'string',
		);
		$args['attributes']['nfdHeadingBorderStyle']  = array(
			'type' => 'string',
		);

		return $args;
	}

	/**
	 * Apply heading border CSS variables on the front end.
	 *
	 * @param string $block_content Rendered block HTML.
	 * @param array  $block         Block data.
	 * @return string
	 */
	public function apply_heading_border_styles( string $block_content, array $block ): string {
		if ( empty( $block['blockName'] ) || 'core/heading' !== $block['blockName'] ) {
			return $block_content;
		}

		$atts  = isset( $block['attrs'] ) && is_array( $block['attrs'] ) ? $block['attrs'] : array();
		$style = self::build_inline_style( $atts );

		if ( '' === $style ) {
			return $block_content;
		}

		if ( ! class_exists( '\WP_HTML_Tag_Processor' ) ) {
			return $block_content;
		}

		$processor = new \WP_HTML_Tag_Processor( $block_content );
		if ( ! $processor->next_tag() ) {
			return $block_content;
		}

		$existing = $processor->get_attribute( 'style' );
		$merged   = trim( ( is_string( $existing ) ? $existing : '' ) . ';' . $style, '; ' );
		$processor->set_attribute( 'style', $merged );

		return $processor->get_updated_html();
	}

	/**
	 * Build inline style for heading border CSS custom properties.
	 *
	 * @param array $attributes Block attributes.
	 * @return string
	 */
	public static function build_inline_style( array $attributes ): string {
		$color = isset( $attributes['nfdHeadingBorderColor'] ) ? (string) $attributes['nfdHeadingBorderColor'] : '';
		$width = isset( $attributes['nfdHeadingBorderWidth'] ) ? (string) $attributes['nfdHeadingBorderWidth'] : '';
		$style = isset( $attributes['nfdHeadingBorderStyle'] ) ? (string) $attributes['nfdHeadingBorderStyle'] : '';

		$parts = array();

		$resolved_color = self::resolve_color( $color );
		if ( $resolved_color ) {
			$parts[] = '--nfd-heading-border:' . $resolved_color;
		}

		$resolved_width = self::resolve_width( $width );
		if ( $resolved_width ) {
			$parts[] = '--nfd-heading-border-size:' . $resolved_width;
		}

		$resolved_style = self::resolve_border_style( $style );
		if ( $resolved_style ) {
			$parts[] = '--nfd-heading-border-style:' . $resolved_style;
		}

		return implode( ';', $parts );
	}

	/**
	 * Resolve a color slug or literal into a CSS value.
	 *
	 * @param string $value Attribute value.
	 * @return string|null
	 */
	private static function resolve_color( string $value ): ?string {
		if ( '' === $value ) {
			return null;
		}

		if (
			str_starts_with( $value, '#' ) ||
			str_starts_with( $value, 'rgb' ) ||
			str_starts_with( $value, 'hsl' )
		) {
			return $value;
		}

		return 'var(--wp--preset--color--' . $value . ')';
	}

	/**
	 * Resolve border width.
	 *
	 * @param string $value Attribute value.
	 * @return string|null
	 */
	private static function resolve_width( string $value ): ?string {
		$value = trim( $value );
		if ( '' === $value ) {
			return null;
		}

		if ( preg_match( '/(px|em|rem|vh|vw|%)$/i', $value ) ) {
			return $value;
		}

		if ( preg_match( '/^-?\d+(\.\d+)?$/', $value ) ) {
			return $value . 'px';
		}

		return null;
	}

	/**
	 * Resolve border style keyword.
	 *
	 * @param string $value Attribute value.
	 * @return string|null
	 */
	private static function resolve_border_style( string $value ): ?string {
		$allowed = array(
			'solid',
			'dashed',
			'dotted',
			'double',
			'groove',
			'ridge',
			'inset',
			'outset',
			'none',
			'hidden',
		);

		$value = strtolower( trim( $value ) );
		if ( '' === $value ) {
			return null;
		}

		return in_array( $value, $allowed, true ) ? $value : null;
	}
}