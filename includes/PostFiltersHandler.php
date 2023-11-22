<?php

namespace NewfoldLabs\WP\Module\Patterns;

/**
 * Site classification.
 */
class PostFiltersHandler {

	/**
	 * Sample post data.
	 *
	 * @var array
	 */
	public $posts_data = array(
		array(
			'title' => 'Five Essential Tips for Effective Time Management',
		),
		array(
			'title' => 'The Secrets to Building Strong Professional Relationships',
		),
		array(
			'title' => 'Maximizing Productivity in a Remote Work Environment',
		),
		array(
			'title' => 'Balancing Work and Life: Strategies for Professionals',
		),
		array(
			'title' => 'Innovative Approaches to Problem-Solving in the Workplace',
		),
	);

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_filter( 'the_posts', array( $this, 'sample_posts' ), 10, 2 );
		add_filter( 'rest_prepare_post', array( $this, 'rest_prepare_post' ), 10, 3 );
	}

	/**
	 * Modifies the REST API response for posts with a non-positive ID.
	 *
	 * This function is hooked to the 'rest_prepare_post' filter. It checks if a post
	 * has a non-positive ID, indicating a virtual or dummy post. For such posts,
	 * it modifies the title in the REST API response.
	 *
	 * @param WP_REST_Response $response The response object.
	 * @param WP_Post          $post     The post object.
	 * @param WP_REST_Request  $request  The request object.
	 *
	 * @return WP_REST_Response The modified (or unmodified) response.
	 */
	public function rest_prepare_post( $response, $post, $request ) {

		if ( $post->ID <= 0 ) {
			$response->data['title']['rendered'] = $response->data['title']['raw'];
		}

		return $response;
	}

	/**
	 * Adds sample posts to the query result when fewer than two published posts are found.
	 *
	 * This function is intended to be used as a filter for 'the_posts'. It checks if the current query
	 * is for published 'post' type and if there are fewer than two posts found. If these conditions are met,
	 * it generates and adds up to five sample posts to the query result. Each sample post has a unique negative ID,
	 * a title from a predefined array, the current author's ID, a random date from the last week, and a 'publish' status.
	 *
	 * @param array    $posts The array of posts returned by the query.
	 * @param WP_Query $query The WP_Query instance (passed by reference).
	 *
	 * @return array The modified (or original) array of posts.
	 */
	public function sample_posts( $posts, $query ) {

		$post_type   = $query->get( 'post_type' );
		$post_status = $query->get( 'post_status' );

		if ( $post_type === 'post' && is_array( $post_status ) && in_array( 'publish', $post_status ) && count( $posts ) < 2 ) {

			for ( $i = 1; $i <= 5; $i++ ) {
				$post               = new \stdClass();
				$post->ID           = -1 * $i;
				$post->post_title   = $this->posts_data[ $i ]['title'];
				$post->post_author  = get_the_author_meta( 'ID' );
				$post->post_date    = $this->get_random_date_last_week();
				$post->post_status  = 'publish';
				$post->post_content = __( "This is placeholder text, designed to illustrate how actual text will look in this space. It doesn't contain meaningful content but mimics the flow and length of real sentences. Use it to evaluate layout, typography, and overall design before replacing it with your final, relevant content.", 'wp-module-patterns' );
				$post->filter       = 'raw'; // Important!

				$posts[] = $post;
			}
		}

		return $posts;
	}

	/**
	 * Generates a random date within the last week.
	 *
	 * This function calculates a random date and time between the current moment and exactly one week ago.
	 * It uses the current timestamp as a reference and generates a timestamp within the past week. The generated
	 * timestamp is then converted into the MySQL date format ('Y-m-d H:i:s').
	 *
	 * @return string The randomly generated date in MySQL format.
	 */
	function get_random_date_last_week() {

		$currentTimestamp = current_time( 'timestamp' );
		// One week ago timestamp
		$weekAgoTimestamp = strtotime( '-1 week', $currentTimestamp );

		// Generate a random timestamp between now and a week ago
		$randomTimestamp = mt_rand( $weekAgoTimestamp, $currentTimestamp );

		// Convert the random timestamp to MySQL date format
		return date( 'Y-m-d H:i:s', $randomTimestamp );
	}
}
