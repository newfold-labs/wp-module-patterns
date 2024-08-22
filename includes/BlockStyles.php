<?php

namespace NewfoldLabs\WP\Module\Patterns;

class BlockStyles {

	/**
	 * Constructor to hook into WordPress.
	 */
	public function __construct() {
		add_action( 'init', [ $this, 'register_block_styles' ] );
	}

	/**
	 * Register custom block styles for the core/group block.
	 */
	public function register_block_styles() {
		
		$styles = [
			[
				'name'  => 'nfd-theme-white',
				'label' => __( 'White', 'nfd-wonder-blocks' ),
			],
			[
				'name'  => 'nfd-theme-light',
				'label' => __( 'Light', 'nfd-wonder-blocks' ),
			],
			[
				'name'  => 'nfd-theme-dark',
				'label' => __( 'Dark', 'nfd-wonder-blocks' ),
			],
			[
				'name'  => 'nfd-theme-darker',
				'label' => __( 'Darker', 'nfd-wonder-blocks' ),
			],
			[
				'name'  => 'nfd-theme-primary',
				'label' => __( 'Primary', 'nfd-wonder-blocks' ),
			],
		];

		foreach ( $styles as $style ) {
			register_block_style(
				'core/group',
				$style
			);
		}
	}
}
