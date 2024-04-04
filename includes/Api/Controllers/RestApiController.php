<?php
namespace NewfoldLabs\WP\Module\Patterns\Api\Controllers;

use NewfoldLabs\WP\Module\Patterns\Api\RemoteRequest;
use NewfoldLabs\WP\Module\Patterns\Permissions;

/**
 * RestApiController class.
 */
class RestApiController extends \WP_REST_Controller {

	/**
	 * The class instance.
	 *
	 * @var $instance
	 */
	protected static $instance = null;

	/**
	 * The constructor
	 */
	public function __construct() {
		$this->namespace = 'nfd-wonder-blocks/v1';

		\add_filter(
			'rest_request_before_callbacks',
			function ( $response, $handler, $request ) {

				if ( $request->get_header( 'x_nfd_wonder_blocks' ) ) {
					RemoteRequest::init( $request );
				}

				return $response;
			},
			10,
			3
		);
	}

	/**
	 * Check the authorization of the request
	 *
	 * @return boolean
	 */
	public function checkPermission() {

		// Check for the nonce on the server (used by WP REST).
		if ( isset( $_SERVER['HTTP_X_WP_NONCE'] ) && \wp_verify_nonce( \sanitize_text_field( \wp_unslash( $_SERVER['HTTP_X_WP_NONCE'] ) ), 'wp_rest' ) ) {
			return Permissions::is_editor();
		}

		return false;
	}

	/**
	 * Handle GET request.
	 *
	 * @param string   $namespace - The api name space.
	 * @param string   $endpoint  - The endpoint.
	 * @param function $callback  - The callback to run.
	 * @param array    $args      - The arguments to pass in.
	 *
	 * @return void
	 */
	public function get_handler( $namespace, $endpoint, $callback, $args = array() ) {
		\register_rest_route(
			$namespace,
			$endpoint,
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => $callback,
				'permission_callback' => array(
					$this,
					'checkPermission',
				),
				'args'                => $args,
			)
		);
	}

	/**
	 * Handle POST request.
	 *
	 * @param string $namespace - The api name space.
	 * @param string $endpoint  - The endpoint.
	 * @param string $callback  - The callback to run.
	 * @param array  $args      - The arguments to pass in.
	 *
	 * @return void
	 */
	public function post_handler( $namespace, $endpoint, $callback, $args = array() ) {
		\register_rest_route(
			$namespace,
			$endpoint,
			array(
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => $callback,
				'permission_callback' => array(
					$this,
					'checkPermission',
				),
				'args'                => $args,
			)
		);
	}

	/**
	 * Handle DELETE request.
	 *
	 * @param string $namespace - The api name space.
	 * @param string $endpoint  - The endpoint.
	 * @param string $callback  - The callback to run.
	 * @param array  $args      - The arguments to pass in.
	 *
	 * @return void
	 */
	public function delete_handler( $namespace, $endpoint, $callback, $args = array() ) {
		\register_rest_route(
			$namespace,
			$endpoint,
			array(
				'methods'             => 'DELETE',
				'callback'            => $callback,
				'permission_callback' => array(
					$this,
					'checkPermission',
				),
				'args'                => $args,
			)
		);
	}

	/**
	 * The caller
	 *
	 * @param string $name      - The name of the method to call.
	 * @param array  $arguments - The arguments to pass in.
	 *
	 * @return mixed
	 */
	public static function __callStatic( $name, array $arguments ) {
		$name = "{$name}_handler";

		if ( is_null( self::$instance ) ) {
			self::$instance = new static();
		}

		$r = self::$instance;
		return $r->$name( $r->namespace, ...$arguments );
	}
}
