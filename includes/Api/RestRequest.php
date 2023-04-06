<?php

namespace NewfoldLabs\WP\Module\Patterns\Api;

class RestRequest {
	
	/**
     * The API endpoint
     *
     * @var string
     */
    public $baseUrl = '';

    /**
     * Request data sent to the server
     *
     * @var array
     */
    public $data = [];

    /**
     * Request headers sent to the server
     *
     * @var array
     */
    public $headers = [];

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
    public function __construct( $request )
    {
        if ( ! \wp_verify_nonce( sanitize_text_field( wp_unslash( $request->get_header( 'x_wp_nonce' ) ) ), 'wp_rest' ) ) {
            return;
        }

        // Some special cases for library development.
        $this->baseUrl = 'http://localhost:3003'; // @todo

        $this->data = [
            'wp_language' => \get_locale(),
            'wp_theme' => \get_option('template'),
            // 'mode' => Config::$environment,
            // 'uuid' => User::data('uuid'),
            // 'library_version' => Config::$version,
            'wp_active_plugins' => $request->get_method() === 'POST' ? \get_option('active_plugins') : [],
        ];

        $this->headers = [
            'Accept' => 'application/json',
            'referer' => $request->get_header('referer'),
            'user_agent' => $request->get_header('user_agent'),
        ];
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
    public function getHandler( $endpoint, $data = [], $headers = [] )
    {
        $url = \esc_url_raw(
            \add_query_arg(
                \urlencode_deep( \urldecode_deep( array_merge( $this->data, $data ) ) ),
                $this->baseUrl . $endpoint
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

        $responseBody = \wp_remote_retrieve_body( $response );
        return json_decode( $responseBody, true );
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
    public function postHandler( $endpoint, $data = [], $headers = [] ) {
        $response = \wp_remote_post(
            $this->baseUrl . $endpoint,
            array(
                'headers' => array_merge( $this->headers, $headers ),
                'body' => array_merge( $this->data, $data ),
			)
        );
        if ( \is_wp_error( $response ) ) {
            return $response;
        }

        $responseBody = \wp_remote_retrieve_body( $response );
        return json_decode( $responseBody, true );
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

        if ( $name === 'init' ) {
            self::$instance = new static( $arguments[0] );
            return;
        }

        $name = "{$name}Handler";
        $r = self::$instance;

        return $r->$name( ...$arguments );
    }
}