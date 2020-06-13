<?php
/**
 * Example Sidebar.
 *
 * Load the PHP methods that support the block editor plugin within
 * /src/plugins/example-sidebar.
 *
 * @package wholesomecode/wholesome_boilerplate
 */

namespace WholesomeCode\WholesomeBoilerplate\ExampleSidebar; // @codingStandardsIgnoreLine

use const WholesomeCode\WholesomeBoilerplate\PLUGIN_PREFIX;
use const WholesomeCode\WholesomeBoilerplate\ROOT_DIR;

// The Meta Key for the example toggle meta field.
const META_KEY_EXAMPLE_TOGGLE = PLUGIN_PREFIX . '_example_toggle';

/**
 * Setup
 *
 * @return void
 */
function setup() : void {
	add_action( 'init', __NAMESPACE__ . '\\register_meta_fields', 10 );
	add_filter( PLUGIN_PREFIX . '_block_settings', __NAMESPACE__ . '\\block_settings' );
}

/**
 * Register Meta Fields.
 *
 * Meta Fields need to be registered to allow access to them via the REST API
 * and subsequently the WordPress block editor.
 *
 * @return void
 */
function register_meta_fields() : void {

	// Get all public post types.
	$post_types = get_post_types(
		[
			'public' => true,
		],
		'names'
	);

	// Register meta for all public post types.
	foreach ( $post_types as $post_type ) {
		register_post_meta(
			$post_type,
			META_KEY_EXAMPLE_TOGGLE,
			[
				'auth_callback' => function() {
					return current_user_can( 'edit_posts' );
				},
				'show_in_rest'  => true,
				'single'        => true,
				'type'          => 'boolean',
			]
		);
	}
}

/**
 * Block Settings.
 *
 * Pass the meta key into the block settings so that it can be accessed via
 * the settings import via /src/settings.js.
 *
 * @param array $settings Existing block settings.
 * @return array
 */
function block_settings( $settings ) : array {
	$settings['metaKeyExampleToggle'] = META_KEY_EXAMPLE_TOGGLE;

	return $settings;
}
