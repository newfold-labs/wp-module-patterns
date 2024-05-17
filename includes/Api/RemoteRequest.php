<?php

namespace NewfoldLabs\WP\Module\Patterns\Api;

/**
 * Remote request class.
 */
class RemoteRequest {

	/**
	 * The API endpoint
	 *
	 * @var string
	 */
	public $base_url = '';

	/**
	 * Request data sent to the server
	 *
	 * @var array
	 */
	public $data = array();

	/**
	 * Request headers sent to the server
	 *
	 * @var array
	 */
	public $headers = array();

	/**
	 * The class instance.
	 *
	 * @var $instance
	 */
	protected static $instance = null;

	/**
	 * Set up the base object to send with every request
	 *
	 * @param \WP_REST_Request $request - The request.
	 * @return void
	 */
	public function __construct( $request ) {
		if ( ! \wp_verify_nonce( \sanitize_text_field( \wp_unslash( $request->get_header( 'x_wp_nonce' ) ) ), 'wp_rest' ) ) {
			return;
		}

		$this->headers = array(
			'Accept'     => 'application/json',
			'referer'    => $request->get_header( 'referer' ),
			'user_agent' => $request->get_header( 'user_agent' ),
		);
	}

	/**
	 * Register dynamic routes
	 *
	 * @param string $endpoint - The endpoint.
	 * @param array  $data     - The data to include.
	 * @param array  $headers  - The headers to include.
	 *
	 * @return array
	 */
	public function get_handler( $endpoint, $data = array(), $headers = array() ) {
		$url = \esc_url_raw(
			\add_query_arg(
				\urlencode_deep( \urldecode_deep( array_merge( $this->data, $data ) ) ),
				$this->base_url . $endpoint
			)
		);

		$response = \wp_remote_get(
			$url,
			array(
				'headers' => array_merge( $this->headers, $headers ),
			)
		);
		if ( \is_wp_error( $response ) ) {
			return $response;
		}

		// Check for other errors
		$status_code = \wp_remote_retrieve_response_code( $response );

		if ( $status_code < 200 || $status_code >= 300 ) {
			return new \WP_Error(
				'remote_request_error',
				\wp_remote_retrieve_response_message( $response ),
				array(
					'status_code' => $status_code,
				)
			);
		}

		$response_body = \wp_remote_retrieve_body( $response );
		return json_decode( $response_body, true );
	}

	/**
	 * Register dynamic routes
	 *
	 * @param string $endpoint - The endpoint.
	 * @param array  $data     - The arguments to include.
	 * @param array  $headers  - The headers to include.
	 *
	 * @return array
	 */
	public function post_handler( $endpoint, $data = array(), $headers = array() ) {
		$response = \wp_remote_post(
			$this->base_url . $endpoint,
			array(
				'headers' => array_merge( $this->headers, $headers ),
				'body'    => array_merge( $this->data, $data ),
			)
		);
		if ( \is_wp_error( $response ) ) {
			return $response;
		}

		$response_body = \wp_remote_retrieve_body( $response );
		return json_decode( $response_body, true );
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

		if ( 'init' === $name ) {
			self::$instance = new static( $arguments[0] );
			return;
		}

		$name = "{$name}_handler";
		$r    = self::$instance;

		return $r->$name( ...$arguments );
	}

	/**
	 * Format error data
	 *
	 * @param \WP_Error $error - The error.
	 * @return array
	 */
	public static function format_error_data( \WP_Error $error ) {
		return array(
			'code'    => $error->get_error_code(),
			'message' => $error->get_error_message(),
			'data'    => $error->get_error_data(),
		);
	}
}
