<?php
namespace NewfoldLabs\WP\Module\Patterns\Library;

/**
 * Contains data related to WonderBlocks Hiive Events.
 */
final class Events {
	/**
	 * The category of an event.
	 *
	 * @var string
	 */
	protected static $category = 'wonder_blocks';

	/**
	 * List of valid actions that an event can perform.
	 *
	 * A value of true indicates that the action is valid, set it to null if you want to invalidate an action.
	 *
	 * @var array
	 */
	protected static $valid_actions = array(
		'template_inserted'  => true,
		'template_searched'  => true,
		'pattern_searched'   => true,
		'pattern_inserted'   => true,
		'pattern_favorited'  => true,
		'template_favorited' => true,
		'modal_open'         => true,
	);

	/**
	 * Returns the list of valid actions that an event can perform
	 *
	 * @return array
	 */
	public static function get_valid_actions() {
		return self::$valid_actions;
	}

	/**
	 * Valid category of on event.
	 *
	 * @return string
	 */
	public static function get_category() {
		return self::$category;
	}

	/**
	 * Sends a Hiive Event to the data module API.
	 *
	 * @param array $event The event to send.
	 * @return WP_REST_Response|WP_Error
	 */
	public static function send( $event ) {
		$event = self::validate( $event );
		if ( ! $event ) {
			return new \WP_Error(
				'nfd_wonder_blocks_error',
				__( 'Bad event structure/value.', 'nfd-wonder-blocks' )
			);
		}

		$event_data_request = new \WP_REST_Request(
			\WP_REST_Server::CREATABLE,
			NFD_MODULE_DATA_EVENTS_API
		);
		$event_data_request->set_body_params( $event );

		$response = rest_do_request( $event_data_request );

		if ( $response->is_error() ) {
			return $response->as_error();
		}

		return $response;
	}

	/**
	 * Validates the action performed in an event.
	 *
	 * @param string $action The action performed in an event.
	 * @return boolean
	 */
	public static function validate_action( $action ) {
		$valid_actions = self::get_valid_actions();
		if ( ! isset( $valid_actions[ $action ] ) ) {
			return false;
		}

		return true;
	}

	/**
	 * Validates the category of an event.
	 *
	 * @param string $category The category of an event.
	 * @return boolean
	 */
	public static function validate_category( $category ) {
		return self::get_category() === $category;
	}

	/**
	 * Sanitizes and validates the action and category parameters of an event.
	 *
	 * @param array $event The event to sanitize and validate.
	 * @return array|boolean
	 */
	public static function validate( $event ) {
		if ( ! isset( $event['action'] ) || ! self::validate_action( $event['action'] ) ) {
			return false;
		}

		if ( ! isset( $event['category'] ) || ! self::validate_category( $event['category'] ) ) {
			return false;
		}

		return $event;
	}
}
