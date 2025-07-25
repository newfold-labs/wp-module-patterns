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
}
