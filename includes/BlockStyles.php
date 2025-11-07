<?php

namespace NewfoldLabs\WP\Module\Patterns;

/**
 * Class BlockStyles
 *
 * Registers custom block styles for the WordPress block editor.
 * Provides additional styling options for core blocks.
 */
class BlockStyles {

	/**
	 * Constructor to hook into WordPress.
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'register_block_styles' ) );

		add_filter( 'render_block_core/cover', array( $this, 'render_cover_block' ), 10, 3 );
	}

	/**
	 * Register custom block styles for the core/group block.
	 */
	public function register_block_styles() {

		$image_styles = array(
			array(
				'name'  => 'nfd-dots-bottom-left',
				'label' => __( 'Dots BL', 'nfd-wonder-blocks' ),
			),
			array(
				'name'  => 'nfd-waves-bottom-left',
				'label' => __( 'Waves BL', 'nfd-wonder-blocks' ),
			),
			array(
				'name'  => 'nfd-dots-bottom-right',
				'label' => __( 'Dots BR', 'nfd-wonder-blocks' ),
			),
			array(
				'name'  => 'nfd-waves-bottom-right',
				'label' => __( 'Waves BR', 'nfd-wonder-blocks' ),
			),
			array(
				'name'  => 'nfd-dots-top-left',
				'label' => __( 'Dots TL', 'nfd-wonder-blocks' ),
			),
			array(
				'name'  => 'nfd-waves-top-left',
				'label' => __( 'Waves TL', 'nfd-wonder-blocks' ),
			),
			array(
				'name'  => 'nfd-dots-top-right',
				'label' => __( 'Dots TR', 'nfd-wonder-blocks' ),
			),
			array(
				'name'  => 'nfd-waves-top-right',
				'label' => __( 'Waves TR', 'nfd-wonder-blocks' ),
			),
		);

		$theme_styles = array(
			array(
				'name'  => 'nfd-theme-white',
				'label' => __( 'White', 'nfd-wonder-blocks' ),
			),
			array(
				'name'  => 'nfd-theme-light',
				'label' => __( 'Light', 'nfd-wonder-blocks' ),
			),
			array(
				'name'  => 'nfd-theme-dark',
				'label' => __( 'Dark', 'nfd-wonder-blocks' ),
			),
			array(
				'name'  => 'nfd-theme-darker',
				'label' => __( 'Darker', 'nfd-wonder-blocks' ),
			),
			array(
				'name'  => 'nfd-theme-primary',
				'label' => __( 'Primary', 'nfd-wonder-blocks' ),
			),
			array(
				'name'  => 'nfd-theme-primary-15',
				'label' => __( 'Primary Light', 'nfd-wonder-blocks' ),
			),
		);

		foreach ( $image_styles as $image_style ) {
			register_block_style(
				array( 'core/group', 'core/image' ),
				$image_style
			);
		}

		foreach ( $theme_styles as $theme_style ) {
			register_block_style(
				'core/group',
				$theme_style
			);
		}
	}

	/**
	 * Modifies the HTML output of the Cover block by adding link-related attributes and elements.
	 *
	 * @param string $html       The original HTML content of the Cover block.
	 * @param array  $block      The parsed block data, including its attributes.
	 * @param array  $attributes The block attributes passed to the Cover block.
	 * @return string The modified HTML content of the Cover block.
	 */
	public function render_cover_block( $html, $block, $attributes ) {
		if( empty( $block['attrs'] ) ) {
			return $html;
		}

		$attrs = $block['attrs'];
		$url = isset( $attrs['linkUrl'] ) ? trim( $attrs['linkUrl'] ) : '';
		if( $url === '' ){
			return $html;
		}

		$blank  = ! empty( $attrs['linkOpensInNewTab'] );
		$target = $blank ? '_blank' : '_self';
		$relBits = [];
		if( $blank ) {
			$relBits[] = 'noopener';
		}
		if( !empty( $attrs['linkRel'] ) ) {
			$relBits[] = $attrs['linkRel'];
		}

		$rel = implode( ' ', array_unique( array_filter( $relBits ) ) );

		$html = preg_replace_callback(
			'/^(\s*<div\b[^>]*class="([^"]*)"(.*?)>)/i',
			function ( $m ) use ( $url, $blank ) {
				$openTag = $m[1];
				$classes = $m[2];
				$rest    = $m[3];

				if( strpos( $classes, 'nfd-is-linked-group' ) === false ) {
					$classes .= ' nfd-is-linked-group';
				}

				$openTag = preg_replace( '/\sdata-link-url="[^"]*"/i', '', $openTag );
				$openTag = preg_replace( '/\sdata-link-blank="[^"]*"/i', '', $openTag );
				$openTag = preg_replace( '/class="[^"]*"/i', 'class="' . esc_attr( trim( $classes ) ) . '"', $openTag );
				$openTag = rtrim( $openTag, '>' ) . ' data-link-url="' . esc_attr( $url ) . '" data-link-blank="' . ( $blank ? '1' : '' ) . '">';

				return $openTag;
			},
			$html,
			1
		);

		$linkTag = sprintf(
			'<a class="wp-block-cover__link" href="%s"%s%s aria-hidden="true" tabindex="-1"></a>',
			esc_url( $url ),
			$target ? ' target="' . esc_attr( $target ) . '"' : '',
			$rel ? ' rel="' . esc_attr( $rel ) . '"' : ''
		);

		$pos = strpos( $html, '>' );
		if( $pos !== false ) {
			$html = substr_replace( $html, '>' . $linkTag, $pos, 1 );
		}

		return $html;
	}

}
