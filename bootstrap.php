<?php

namespace NewfoldLabs\WP\Module\Patterns;

// Set Global Constants
if ( ! defined( 'NFD_WONDER_BLOCKS_VERSION' ) ) {
	define( 'NFD_WONDER_BLOCKS_VERSION', '2.8.1' );
}
if ( ! defined( 'NFD_WONDER_BLOCKS_DIR' ) ) {
	define( 'NFD_WONDER_BLOCKS_DIR', __DIR__ );
}
if ( ! defined( 'NFD_WONDER_BLOCKS_BUILD_DIR' ) && defined( 'NFD_WONDER_BLOCKS_VERSION' ) ) {
	define( 'NFD_WONDER_BLOCKS_BUILD_DIR', NFD_WONDER_BLOCKS_DIR . '/build/' . NFD_WONDER_BLOCKS_VERSION );
}
if ( ! defined( 'NFD_MODULE_DATA_EVENTS_API' ) ) {
	define( 'NFD_MODULE_DATA_EVENTS_API', '/newfold-data/v1/events' );
}

// Register the PatternsFeature class in the features filter
if ( function_exists( 'add_filter' ) ) {
	add_filter(
		'newfold/features/filter/register',
		function ( $features ) {
			return array_merge( $features, array( PatternsFeature::class ) );
		}
	);
}
