<?php
/**
 * Example Settings.
 *
 * Settings for the plugin, using Gutenberg Components.
 *
 * Original example taken from CodeinWP.
 * @see https://www.codeinwp.com/blog/plugin-options-page-gutenberg/
 *
 * @package wholesomecode/wholesome_boilerplate
 */

namespace WholesomeCode\WholesomeBoilerplate\ExampleSettings; // @codingStandardsIgnoreLine

use const WholesomeCode\WholesomeBoilerplate\PLUGIN_PREFIX;
use const WholesomeCode\WholesomeBoilerplate\ROOT_DIR;

const SETTING_ANALYTICS           = 'wholesome_boilerplate_settings';
const SETTING_ANALYTICS_KEY       = 'wholesome_boilerplate_analytics_key';
const SETTING_ANALYTICS_STATUS    = 'wholesome_boilerplate_analytics_status';
const SETTING_LOGGED_OUT          = 'wholesome_boilerplate_logged_out';
const SETTING_LOGGED_OUT_TEMPLATE = 'wholesome_boilerplate_logged_out_template';

/**
 * Example Settings
 *
 * - Register Settings.
 * - Add Settings Page.
 * - Add Page Templates to settings.
 *
 * @return void
 */
function setup() : void {
	add_action( 'init', __NAMESPACE__ . '\\register_settings' );
	add_action( 'admin_menu', __NAMESPACE__ . '\\add_settings_page' );
	add_filter( PLUGIN_PREFIX . '_block_settings', __NAMESPACE__ . '\\block_settings' );
}

/**
 * Register Settings.
 *
 * Register the settings so they can be used via the WordPress API.
 *
 * @return void
 */
function register_settings() : void {
	register_setting(
		SETTING_ANALYTICS,
		SETTING_ANALYTICS_KEY,
		array(
			'default'      => '',
			'show_in_rest' => true,
			'type'         => 'string',
		)
	);

	register_setting(
		SETTING_ANALYTICS,
		SETTING_ANALYTICS_STATUS,
		array(
			'default'      => false,
			'show_in_rest' => true,
			'type'         => 'boolean',
		)
	);

	register_setting(
		SETTING_LOGGED_OUT,
		SETTING_LOGGED_OUT_TEMPLATE,
		array(
			'default'      => '',
			'show_in_rest' => true,
			'type'         => 'string',
		)
	);
}

/**
 * Add Settings Page.
 *
 * Add a settings page to the settings menu item.
 *
 * @return void
 */
function add_settings_page() : void {
	$page_hook_suffix = add_options_page(
		__( 'Wholesome Boilerplate Settings', 'wholesome-boilerplate' ),
		__( 'Wholesome Boilerplate Settings', 'wholesome-boilerplate' ),
		'manage_options',
		'wholesome_boilerplate',
		__NAMESPACE__ . '\\render_html'
	);
}

/**
 * Render HTML.
 *
 * Renders the settings page html. In this instance a placeholder for React.
 *
 * @return void
 */
function render_html() : void {
	?>
	<div id="wholesome-boilerplate-settings"></div>
	<?php
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
	$page_templates         = get_page_templates();
	$page_templates_options = [];

	foreach ( $page_templates as $key => $value ) {
		$page_templates_options[] = [
			'label' => $key,
			'value' => $value,
		];
	}

	$settings['pageTemplates'] = $page_templates_options;

	return $settings;
}
