<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Library\Events;
use NewfoldLabs\WP\Module\Patterns\Api\RemoteRequest;

/**
 * Controller for events.
 */
class EventsController {

	/**
	 * Return all patterns.
	 *
	 * @param WP_REST_Request $request Request object.
	 */
	public static function send( $request ) {

		$params = $request->get_params();

		$data = Events::send( $params );

		if ( \is_wp_error( $data ) ) {
			return new \WP_REST_Response( RemoteRequest::format_error_data( $data ), 503 );
		}

		return new \WP_REST_Response( $data );
	}

	/**
	 * Sends an array of Hiive Events to the data module API programmatically.
	 *
	 * @param \WP_REST_Request $request The incoming request object.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public static function send_batch( \WP_REST_Request $request ) {
		$events = $request->get_json_params();
		if ( ! rest_is_array( $events ) ) {

			$error = new \WP_Error(
				'nfd_wonder_blocks_error',
				__( 'Request does not contain an array of events.', 'nfd-wonder-blocks' )
			);

			return new \WP_REST_Response( RemoteRequest::format_error_data( $error ), 503 );
		}

		$response_errors = array();
		foreach ( $events as $index => $event ) {
			$response = Events::send( $event );
			if ( is_wp_error( $response ) ) {
				array_push(
					$response_errors,
					array(
						'index' => $index,
						'data'  => $response,
					)
				);
			}
		}

		if ( ! empty( $response_errors ) ) {
			$error = new \WP_Error(
				'nfd_wonder_blocks_error',
				__( 'Some events failed.', 'nfd-wonder-blocks' ),
				array(
					'data' => $response_errors,
				)
			);

			return new \WP_REST_Response( RemoteRequest::format_error_data( $error ), 503 );
		}

		return new \WP_REST_Response(
			array(),
			202
		);
	}

	/**
	 * Args for a single event.
	 *
	 * @return array
	 */
	public static function get_send_event_args() {
		return array(
			'action'   => array(
				'required'          => true,
				'description'       => __( 'Event action', 'nfd-wonder-blocks' ),
				'type'              => 'string',
				'sanitize_callback' => 'sanitize_title',
				'validate_callback' => array( Events::class, 'validate_action' ),
			),
			'category' => array(
				'default'           => Events::get_category(),
				'description'       => __( 'Event category', 'nfd-wonder-blocks' ),
				'type'              => 'string',
				'sanitize_callback' => 'sanitize_title',
				'validate_callback' => array( Events::class, 'validate_category' ),
			),
			'data'     => array(
				'description' => __( 'Event data', 'nfd-wonder-blocks' ),
				'type'        => 'object',
			),
		);
	}
}
