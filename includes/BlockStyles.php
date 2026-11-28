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
		add_filter( 'render_block_core/cover', array( $this, 'render_linked_cover_block' ), 10, 2 );
		add_filter( 'render_block_core/group', array( $this, 'render_linked_group_block' ), 10, 2 );
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
	 * Injects overlay link markup into Cover block output.
	 *
	 * @param string $html  Block HTML.
	 * @param array  $block Parsed block.
	 * @return string
	 */
	public function render_linked_cover_block( $html, $block ) {
		return $this->inject_overlay_link( $html, $block, 'wp-block-cover__link' );
	}

	/**
	 * Injects overlay link markup into Group block output.
	 *
	 * @param string $html  Block HTML.
	 * @param array  $block Parsed block.
	 * @return string
	 */
	public function render_linked_group_block( $html, $block ) {
		return $this->inject_overlay_link( $html, $block, 'wp-block-group__link' );
	}

	/**
	 * Add linked-group class and invisible overlay anchor when linkUrl is set.
	 *
	 * @param string $html       Block HTML.
	 * @param array  $block      Parsed block.
	 * @param string $link_class Anchor class name.
	 * @return string
	 */
	private function inject_overlay_link( $html, $block, $link_class ) {
		if ( '' === $html || empty( $block['attrs'] ) || ! is_array( $block['attrs'] ) ) {
			return $html;
		}

		$url = isset( $block['attrs']['linkUrl'] ) ? trim( (string) $block['attrs']['linkUrl'] ) : '';
		if ( '' === $url ) {
			return $html;
		}

		$opens_in_new_tab = ! empty( $block['attrs']['linkOpensInNewTab'] );
		$target           = $opens_in_new_tab ? '_blank' : '_self';
		$rel              = $opens_in_new_tab ? 'noopener noreferrer' : '';

		$processor = new \WP_HTML_Tag_Processor( $html );
		if ( ! $processor->next_tag() ) {
			return $html;
		}

		$class_attr = $processor->get_attribute( 'class' );
		$classes    = is_string( $class_attr ) ? trim( $class_attr ) : '';

		if ( strpos( $classes, 'nfd-is-linked-group' ) === false ) {
			$classes = trim( $classes . ' nfd-is-linked-group' );
			$processor->set_attribute( 'class', $classes );
		}

		$html = $processor->get_updated_html();

		$link_tag = sprintf(
			'<a class="%s" href="%s"%s%s aria-hidden="true" tabindex="-1"></a>',
			esc_attr( $link_class ),
			esc_url( $url ),
			'_blank' === $target ? ' target="_blank"' : '',
			'' !== $rel ? ' rel="' . esc_attr( $rel ) . '"' : ''
		);

		$pos = strpos( $html, '>' );
		if ( false === $pos ) {
			return $html;
		}

		return substr_replace( $html, '>' . $link_tag, $pos, 1 );
	}
}
