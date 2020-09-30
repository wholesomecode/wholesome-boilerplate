<?php
/**
 * Main plugin file.
 *
 * @package wholesomecode/wholesome_boilerplate
 */

namespace WholesomeCode\WholesomeBoilerplate; // @codingStandardsIgnoreLine

/**
 * Setup
 *
 * - Load text domain.
 * - Enqueue assets.
 * - Create custom block category.
 *
 * @return void
 */
function setup() : void {

	// Load text domain.
	load_plugin_textdomain( 'wholesome-boilerplate', false, ROOT_DIR . '\languages' );

	// Block categories -
	add_action( 'block_categories', __NAMESPACE__ . '\\block_categories', 10, 2 );

	/**
	 * Enqueue Assets
	 *
	 * Block assets enqueued with `enqueue_block_assets` and
	 * `enqueue_block_editor_assets`, allowing multiple blocks within the project.
	 */
	enqueue_assets();

	/**
	 * Load plugin features.
	 *
	 * Load the namespace of each of the plugin features.
	 */

	/**
	 * Example Settings.
	 *
	 * Settings for the Plugin.
	 */
	require_once ROOT_DIR . '/inc/example-settings/namespace.php';
	ExampleSettings\setup();

	/**
	 * Example Sidebar.
	 *
	 * Sidebar for Posts.
	 */
	require_once ROOT_DIR . '/inc/example-sidebar/namespace.php';
	ExampleSidebar\setup();
}

/**
 * Enqueue Assets.
 */
function enqueue_assets() {

	// Block Styles - styles for the front end and block editor.
	add_action( 'enqueue_block_assets', __NAMESPACE__ . '\\enqueue_block_styles', 10 );

	// Block Editor Assets - scripts and styles for the block editor only.
	// Note, originally used `enqueue_block_editor_assets` hook, however
	// there was an issue with third party blocks. Solved with this:
	// https://github.com/WordPress/gutenberg/issues/9757#issuecomment-486088850
	add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\enqueue_block_editor_assets', 10 );

	// Plugin Assets - scripts and styles for the front end of the site.
	add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\\enqueue_plugin_assets', 10 );

	// Admin Assets - scripts and styles for the WordPress admin area.
	add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\enqueue_admin_assets', 10 );

	// Customizer Assets - scripts and styles for the Customizer screen.
	add_action( 'customize_preview_init', __NAMESPACE__ . '\\enqueue_customizer_assets', 10 );

	// Classic Editor Styles - styles for the classic editor TinyMCE textarea.
	add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\\enqueue_classic_editor_styles', 10 );
}

/**
 * Enqueue Block Styles
 *
 * - block-styles.scss: styles for the front end and the block
 *   editor.
 *
 * @return void
 */
function enqueue_block_styles() : void {

	$block_styles = '/build/block-styles.css';

	wp_enqueue_style(
		PLUGIN_SLUG . '-block-styles',
		plugins_url( $block_styles, ROOT_FILE ),
		[],
		filemtime( ROOT_DIR . $block_styles )
	);
}

/**
 * Enqueue Block Editor Assets
 *
 * - block-editor.js: scripts for the block editor.
 * - block-editor.scss: styles for the block editor only.
 * - localize the script with custom settings.
 *
 * @return void
 */
function enqueue_block_editor_assets() : void {

	$block_editor_asset_path = ROOT_DIR . '/build/block-editor.asset.php';

	if ( ! file_exists( $block_editor_asset_path ) ) {
		throw new \Error(
			esc_html__( 'You need to run `npm start` or `npm run build` in the root of the plugin "wholesomecode/wholesome-boilerplate" first.', 'wholesome-boilerplate' )
		);
	}

	$block_editor_scripts = '/build/block-editor.js';
	$block_editor_styles  = '/build/block-editor.css';
	$script_asset         = include $block_editor_asset_path;

	/**
	 * Settings.
	 *
	 * Settings have a filter so other parts of the plugin can append settings
	 * without the code
	 */
	// Settings has a filter so that other parts of the plugin can append settings.
	$block_settings = apply_filters( PLUGIN_PREFIX . '_block_settings', get_block_settings() );

	wp_enqueue_script(
		PLUGIN_SLUG . '-block-editor',
		plugins_url( $block_editor_scripts, ROOT_FILE ),
		$script_asset['dependencies'],
		$script_asset['version'],
		true
	);

	wp_enqueue_style(
		PLUGIN_SLUG . '-block-editor',
		plugins_url( $block_editor_styles, ROOT_FILE ),
		[],
		filemtime( ROOT_DIR . $block_editor_styles )
	);

	wp_localize_script(
		PLUGIN_SLUG . '-block-editor',
		'WholesomeBoilerplateSettings',
		$block_settings
	);
}

/**
 * Enqueue Plugin Assets
 *
 * - scripts.js: scripts for the front end of the site.
 * - styles.scss: styles for the front end of the site.
 *
 * @return void
 */
function enqueue_plugin_assets() : void {

	$scripts = '/build/scripts.js';
	$styles  = '/build/styles.css';

	wp_enqueue_script(
		PLUGIN_SLUG . '-scripts',
		plugins_url( $scripts, ROOT_FILE ),
		[],
		filemtime( ROOT_DIR . $scripts ),
		true
	);

	wp_enqueue_style(
		PLUGIN_SLUG . '-styles',
		plugins_url( $styles, ROOT_FILE ),
		[],
		filemtime( ROOT_DIR . $styles )
	);
}

/**
 * Enqueue Admin Assets
 *
 * - admin.js: scripts for WordPress Admin area.
 * - admin.scss: styles for the WordPress Admin area.
 * - localize the script with custom settings.
 *
 * @return void
 */
function enqueue_admin_assets() : void {

	$admin_asset_path = ROOT_DIR . '/build/admin.asset.php';

	if ( ! file_exists( $admin_asset_path ) ) {
		throw new \Error(
			esc_html__( 'You need to run `npm start` or `npm run build` in the root of the plugin "wholesomecode/wholesome-boilerplate" first.', 'wholesome-boilerplate' )
		);
	}

	$admin_scripts = '/build/admin.js';
	$admin_styles  = '/build/admin.css';
	$script_asset  = include $admin_asset_path;

	/**
	 * Settings.
	 *
	 * Settings have a filter so other parts of the plugin can append settings
	 * without the code
	 */
	// Settings has a filter so that other parts of the plugin can append settings.
	$block_settings = apply_filters( PLUGIN_PREFIX . '_block_settings', get_block_settings() );

	wp_enqueue_script(
		PLUGIN_SLUG . '-admin',
		plugins_url( $admin_scripts, ROOT_FILE ),
		$script_asset['dependencies'],
		$script_asset['version'],
		true
	);

	wp_enqueue_style(
		PLUGIN_SLUG . '-admin',
		plugins_url( $admin_styles, ROOT_FILE ),
		[ 'wp-components' ], // Use Block Editor (Gutenberg) UI elements in admin pages.
		filemtime( ROOT_DIR . $admin_styles ),
	);

	wp_localize_script(
		PLUGIN_SLUG . '-admin',
		'WholesomeBoilerplateSettings',
		$block_settings
	);
}

/**
 * Enqueue Customizer Assets
 *
 * - customizer.js: scripts for the Customizer screen.
 * - customizer.scss: styles for the Customizer screen.
 *
 * @return void
 */
function enqueue_customizer_assets() : void {

	$customizer_scripts = '/build/customizer.js';
	$customizer_styles  = '/build/customizer.css';

	wp_enqueue_script(
		PLUGIN_SLUG . 'customizer',
		plugins_url( $customizer_scripts, ROOT_FILE ),
		[],
		filemtime( ROOT_DIR . $customizer_scripts ),
		true
	);

	wp_enqueue_style(
		PLUGIN_SLUG . 'customizer',
		plugins_url( $customizer_styles, ROOT_FILE ),
		[],
		filemtime( ROOT_DIR . $customizer_styles ),
	);
}

/**
 * Enqueue Classic Editor Styles
 *
 * - classic-editor.scss: styles for the classic editor TinyMCE
 *   textarea.
 *
 * @return void
 */
function enqueue_classic_editor_styles() : void {

	$classic_editor = '/build/classic-editor.css';

	add_editor_style(
		plugins_url( $classic_editor, ROOT_FILE ) .
		'?v=' . filemtime( ROOT_DIR . $classic_editor )
	);
}

/**
 * Get Block Settings.
 *
 * Returns an array of settings which can be passed into the
 * application.
 *
 * Populate this with settings unique to your application.
 *
 * @return array
 */
function get_block_settings() : array {
	return [
		'ajaxUrl' => esc_url( admin_url( 'admin-ajax.php', 'relative' ) ),
	];
}

/**
 * Block Categories
 *
 * Create a custom block category to categorize your blocks.
 * @see https://developer.wordpress.org/block-editor/developers/filters/block-filters/#managing-block-categories
 *
 * @param array $categories Array of categories.
 * @return array Array of categories.
 */
function block_categories( $categories ) : array {
	return array_merge(
		$categories,
		[
			[
				'slug'  => 'wholesome-blocks',
				'title' => __( 'Wholesome Blocks', 'wholesome-boilerplate' ),
			],
		]
	);
}
