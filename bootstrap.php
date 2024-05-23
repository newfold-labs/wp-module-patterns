<?php

namespace NewfoldLabs\WP\Module\Patterns;

if ( function_exists( 'add_filter' ) ) {
	add_filter(
		'newfold/features/filter/register',
		function ( $features ) {
			return array_merge( $features, array( PatternsFeature::class ) );
		}
	);
}
