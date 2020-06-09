<?php
/**
 * Wholesome Boilerplate
 *
 * Plugin Name:     Wholesome Boilerplate
 * Plugin URI:      https://github.com/wholesomecode/wholesome-boilerplate
 * Description:     Wholesome Boilerplate is a WordPress plugin boilerplate that supports best practices and a modern workflow..
 * Version:         0.1.0
 * Author:          Wholesome Code <hello@wholesomecode.ltd>
 * Author URI:      https://wholesomecode.ltd
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     wholesome-boilerplate
 * Domain Path:     /languages
 *
 * @package         wholesomecode/wholesome_boilerplate
 */

namespace WholesomeCode\WholesomeBoilerplate; // @codingStandardsIgnoreLine

/**
 * Your main plugin.php file should include the plugin header comment
 * and any plugin constants (such as const FILE = __FILE__ for easiest
 * use of plugins_url() and related functions). It should load in the
 * main namespace file, and handle the initial hooking into WordPress.
 *
 * @see https://engineering.hmn.md/standards/structure/
 */
const PLUGIN_PREFIX = 'wholesomecode_wholesome_boilerplate';
const PLUGIN_SLUG   = 'wholesomecode-wholesome-boilerplate';
const ROOT_DIR      = __DIR__;
const ROOT_FILE     = __FILE__;

require_once ROOT_DIR . '/inc/namespace.php';

/**
 * Load Plugin
 *
 * Namespace Pattern
 *
 * File layout and namespacing pattern inspired by the
 * Human Made engineering handbook.
 *
 * @see https://engineering.hmn.md/standards/style/php/#namespaced-file-naming
 */
add_action( 'plugins_loaded', __NAMESPACE__ . '\\setup' );
