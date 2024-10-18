<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Library\UsageTags;
use NewfoldLabs\WP\Module\Patterns\Api\RemoteRequest;

/**
 * Controller for templates.
 */
class PatternUsageTagsController {

	/**
	 * Return all pattern categories.
	 */
	public static function index() {

		$data = UsageTags::get();

		if ( \is_wp_error( $data ) ) {
			return new \WP_REST_Response( RemoteRequest::format_error_data( $data ), 503 );
		}

		return new \WP_REST_Response( $data );
	}
}
