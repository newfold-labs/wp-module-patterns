<?php

namespace NewfoldLabs\WP\Module\Patterns;

class LoadAssets {

	/**
	 * Constructor.
	 */
	public function __construct() {
		\add_action( 'wp_enqueue_scripts', array( $this, 'enqueue' ) );
		\add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue' ) );
	}

	/**
	 * Enqueue assets used on front-end and back-end.
	 *
	 * @return void
	 */
	public function enqueue() {

		\wp_register_style( 
			'nfd-patterns-utilities',
			NFD_PATTERNS_URL . '/assets/styles/utilities.css',
			array(),
			NFD_PATTERNS_VERSION
		);

		\wp_enqueue_style( 'nfd-patterns-utilities' );
	}
}
