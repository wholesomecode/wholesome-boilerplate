/**
 * Webpack Config
 *
 * Provides the following features:
 * - Extend wp-scripts to compile build and transpile JS
 * - JS linting and fixing
 * - JS minification
 * - Prevent incorrect file creation
 * - SCSS linting and fixing
 * - SCSS compile and build
 * - CSS autoprefix and polyfills
 * - CSS minification
 * - Friendly Webpack errors
 * - Multiple endpoints
 */

/**
 * Imports
 *
 * Import node modules (installed via npm install).
 *
 * @wordpress/scripts/config/webpack.config
 * (Extend wp-scripts to compile build and transpile JS)
 * Imports the wp-scripts config file, so it can be extended.
 * @see https://developer.wordpress.org/block-editor/packages/packages-scripts/
 *
 * ignore-emit-webpack-plugin
 * (Prevent incorrect file creation)
 * Prevent files from being emitted in a webpack build.
 * @see https://www.npmjs.com/package/ignore-emit-webpack-plugin
 *
 * friendly-errors-webpack-plugin
 * (Friendly Webpack errors)
 * Recognizes certain classes of webpack errors and cleans, aggregates
 * and prioritizes them to provide a better Developer Experience.
 * @see https://www.npmjs.com/package/friendly-errors-webpack-plugin
 *
 * mini-css-extract-plugin
 * (SCSS compile and build)
 * This plugin extracts CSS into separate files. It creates a CSS file
 * for each SCSS entry point. It supports On-Demand-Loading of CSS and
 * SourceMaps.
 * @see https://www.npmjs.com/package/mini-css-extract-plugin
 *
 * optimize-css-assets-webpack-plugin
 * (CSS minification)
 * Search for CSS assets during the Webpack build and optimize \
 * minimize.
 * @see https://www.npmjs.com/package/optimize-css-assets-webpack-plugin
 *
 * postcss-preset-env
 * (CSS autoprefix and polyfills)
 * Determines the polyfills you need.
 * @see https://www.npmjs.com/package/postcss-preset-env
 *
 * stylelint-webpack-plugin
 * (SCSS linting and fixing)
 * Check SCSS for style errors, and where possible automatically fix
 * them.
 * @see https://www.npmjs.com/package/stylelint-webpack-plugin
 *
 * terser-webpack-plugin
 * (JS minification)
 * Minify JavaScript.
 * @see https://www.npmjs.com/package/terser-webpack-plugin
 *
 * Note:
 * JS linting and fixing is done by eslint-loader which is inherited
 * from wp-scripts.
 */
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const IgnoreEmitWebPackPlugin = require( 'ignore-emit-webpack-plugin' );
const FriendlyErrorsWebpackPlugin = require( 'friendly-errors-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const OptimizeCssAssetsWebpackPlugin = require( 'optimize-css-assets-webpack-plugin' );
const postcssPresetEnv = require( 'postcss-preset-env' );
const StylelintWebpackPlugin = require( 'stylelint-webpack-plugin' );
const TerserWebpackPlugin = require( 'terser-webpack-plugin' );

/**
 * Import from Node
 *
 * The path module provides utilities for working with file and directory paths.
 * @see https://nodejs.org/api/path.html#path_path
 */
const path = require( 'path' );

/**
 * Variables
 */
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Config
 */
module.exports = {
	...defaultConfig,
	/**
	 * Entry Points
	 *
	 * Multiple entry points for WordPress style and script types.
	 *
	 * Admin
	 * - admin.js: scripts for WordPress Admin area.
	 * - admin.scss: styles for the WordPress Admin area.
	 *
	 * Block Styles
	 * - block-styles.scss: styles for the front end and the block
	 *   editor.
	 *
	 * Block Editor
	 * - block-editor.js: scripts for the block editor.
	 * - block-editor.scss: styles for the block editor only.
	 *
	 * Classic Editor
	 * - classic-editor.scss: styles for the classic editor TinyMCE
	 *   textarea.
	 *
	 * Customizer
	 * - customizer.js: scripts for the Customizer screen.
	 * - customizer.scss: styles for the Customizer screen.
	 *
	 * Scripts
	 * - scripts.js: scripts for the front end of the site.
	 *
	 * Styles
	 * - styles.scss: styles for the front end of the site.
	 */
	entry: {
		'admin': [
			path.resolve( process.cwd(), 'src', 'admin.js' ),
			path.resolve( process.cwd(), 'src', 'admin.scss' ),
		],
		'block-styles': path.resolve( process.cwd(), 'src', 'block-styles.scss' ),
		'block-editor': [
			path.resolve( process.cwd(), 'src', 'block-editor.js' ),
			path.resolve( process.cwd(), 'src', 'block-editor.scss' ),
		],
		'classic-editor': path.resolve( process.cwd(), 'src', 'classic-editor.scss' ),
		'customizer': [
			path.resolve( process.cwd(), 'src', 'customizer.js' ),
			path.resolve( process.cwd(), 'src', 'customizer.scss' ),
		],
		'scripts': path.resolve( process.cwd(), 'src', 'scripts.js' ),
		'styles': path.resolve( process.cwd(), 'src', 'styles.scss' ),
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			/**
			 * JS
			 * - JS Linting and Fixing
			 */
			{
				test: /\.js$/,
				include: /src/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
				options: {
					fix: true,
				},
			},
			/**
			 * SCSS / SASS
			 * - SCSS compile and build (MiniCssExtractPlugin)
			 * - CSS autoprefix and polyfills (postcssPresetEnv)
			 */
			{
				test: /\.s[ac]ss$/i,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'css-loader' },
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [ postcssPresetEnv( { stage: 3 } ) ],
						},
					},
					{ loader: 'sass-loader' },
				],
			},
		],
	},
	optimization: {
		...defaultConfig.optimization,
		minimize: true,
		/**
		 * Minification
		 * - CSS minification (OptimizeCssAssetsWebpackPlugin)
		 * - JS minification (TerserWebpackPlugin)
		 */
		minimizer: [
			new OptimizeCssAssetsWebpackPlugin( {
				cssProcessorOptions: {
					map: isProduction ? false : {
						inline: false,
					},
				},
			} ),
			new TerserWebpackPlugin(),
		],
	},
	output: {
		filename: './[name].js',
		path: path.resolve( __dirname, 'build' ),
	},
	/**
	 * Plugin Config
	 * - Prevent incorrect file creation (IgnoreEmitWebPackPlugin)
	 * - Friendly Webpack errors (FriendlyErrorsWebpackPlugin)
	 * - SCSS linting and fixing (StylelintWebpackPlugin)
	 * - Additional config for CSS minification (MiniCssExtractPlugin)
	 */
	plugins: [
		...defaultConfig.plugins,
		new IgnoreEmitWebPackPlugin( [
			// 'admin.asset.php',
			'block-styles.asset.php',
			'classic-editor.asset.php',
			'customizer.asset.php',
			'scripts.asset.php',
			'styles.asset.php',
		] ),
		new FriendlyErrorsWebpackPlugin(),
		new StylelintWebpackPlugin( {
			files: 'src/**/*.s?(a|c)ss',
			failOnError: true,
			fix: true,
			syntax: 'scss',
		} ),
		new MiniCssExtractPlugin( {
			filename: './[name].css',
		} ),
	],
};

// Prevent JS source maps in production.
if ( isProduction ) {
	module.exports.devtool = false;
}
