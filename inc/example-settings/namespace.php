<?php
/**
 * Example Settings.
 *
 * Settings for the plugin that uses WordPress Block Editor (Gutenberg) Components.
 *
 * Original example taken from CodeinWP.
 * @see https://www.codeinwp.com/blog/plugin-options-page-gutenberg/
 *
 * @package wholesomecode/wholesome_boilerplate
 */

namespace WholesomeCode\WholesomeBoilerplate\ExampleSettings; // @codingStandardsIgnoreLine

use const WholesomeCode\WholesomeBoilerplate\PLUGIN_PREFIX;
use const WholesomeCode\WholesomeBoilerplate\ROOT_DIR;

// Settings.
const SETTING_EXAMPLE_SETTINGS = PLUGIN_PREFIX . '_example_settings';

// Fields.
const SETTING_EXAMPLE_DROPDOWN   = PLUGIN_PREFIX . '_example_dropdown';
const SETTING_EXAMPLE_INPUT      = PLUGIN_PREFIX . '_example_input';
const SETTING_EXAMPLE_INPUT_SAVE = PLUGIN_PREFIX . '_example_input_save';
const SETTING_EXAMPLE_TOGGLE     = PLUGIN_PREFIX . '_example_toggle';


/**
 * Example Settings
 *
 * - Register Settings.
 * - Add Settings Page.
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
		SETTING_EXAMPLE_SETTINGS,
		SETTING_EXAMPLE_DROPDOWN,
		array(
			'default'      => '',
			'show_in_rest' => true,
			'type'         => 'string',
		)
	);

	register_setting(
		SETTING_EXAMPLE_SETTINGS,
		SETTING_EXAMPLE_INPUT,
		array(
			'default'      => '',
			'show_in_rest' => true,
			'type'         => 'string',
		)
	);

	register_setting(
		SETTING_EXAMPLE_SETTINGS,
		SETTING_EXAMPLE_INPUT_SAVE,
		array(
			'default'      => '',
			'show_in_rest' => true,
			'type'         => 'string',
		)
	);

	register_setting(
		SETTING_EXAMPLE_SETTINGS,
		SETTING_EXAMPLE_TOGGLE,
		array(
			'default'      => false,
			'show_in_rest' => true,
			'type'         => 'boolean',
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
 * Pass dropdown values into the settings so that they
 * can be accessed via the settings block.
 *
 * @param array $settings Existing block settings.
 * @return array
 */
function block_settings( $settings ) : array {
	$example_dropdown_options = [
		[
			'label' => esc_html__( 'Example One', 'wholesome-boilerplate' ),
			'value' => 'example-one',
		],
		[
			'label' => esc_html__( 'Example Two', 'wholesome-boilerplate' ),
			'value' => 'example-two',
		],
	];

	$settings['exampleDropdown']        = SETTING_EXAMPLE_DROPDOWN;
	$settings['exampleDropdownOptions'] = $example_dropdown_options;
	$settings['exampleInput']           = SETTING_EXAMPLE_INPUT;
	$settings['exampleInputSave']       = SETTING_EXAMPLE_INPUT_SAVE;
	$settings['exampleToggle']          = SETTING_EXAMPLE_TOGGLE;

	return $settings;
}
