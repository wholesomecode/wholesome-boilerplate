/**
 * Example Block.
 *
 * An example block that provides starter code and inline documentation.
 */

/**
 * WordPress Imports.
 *
 * - registerBlockType
 *   Function to register a WordPress editor (Gutenberg) block.
 *   @see https://developer.wordpress.org/block-editor/developers/block-api/block-registration/#registerblocktype
 *
 * - __
 *   Internationalization - multilingual translation support.
 *   @see https://developer.wordpress.org/block-editor/developers/internationalization/
 */
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

/**
 * Plugin Imports.
 *
 * - attributes
 *   Define the block attributes.
 *
 * - Edit
 *   The block Edit function (shows inside the block editor).
 *
 * - Save
 *   The block Save function (shows on the front end of the site).
 */
import attributes from './components/attributes';
import Edit from './components/Edit';
import Save from './components/Save';

/**
 * Register Block
 *
 * @param string Block Name.
 * @param object Block Configuration Object.
 */
export default registerBlockType( 'wholesome-boilerplate/example-block', {

	// Set the title.
	title: __( 'Example', 'wholesome-boilerplate' ),

	// Set the description.
	description: __( 'An example block that provides starter code and inline documentation.',
		'wholesome-boilerplate' ),

	// Select a category.
	category: 'wholesome-blocks', // Custom (see /inc/namespace.php)
	// category:   'common',
	// category:   'embed',
	// category:   'formatting',
	// category:   'layout',
	// category:   'widgets',

	/**
	 * Note that instead of using a custom category, we can take advantage
	 * of Block Collections.
	 *
	 * @see https://make.wordpress.org/core/2020/02/27/block-collections/
	 */

	// Import the attributes
	attributes,

	/**
	 * Icon
	 *
	 * Optionally define an icon, and its properties.
	 *
	 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-registration/#icon-optional
	 */
	icon: {
		background: '#e2dccd', // Icon custom background colour
		foreground: '#751621', // Icon custom foreground colour
		src: 'heart', // WordPress dashicon reference (we could also use an svg)
	},

	/**
	 * Keywords
	 *
	 * Aliases that help users discover it while searching.
	 * Only three are allowed.
	 *
	 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-registration/#keywords-optional
	 */
	keywords: [
		__( 'Example' ),
		__( 'Wholesome Code' ),
		__( 'Wholesome Boilerplate' ),
	],

	/**
	 * Example
	 *
	 * Provide structured data for the block, used to construct a preview in the help panel.
	 *
	 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-registration/#example-optional
	 */
	example: {
		attributes: {
			imageAlt: 'An example image',
			imageURL: 'https://via.placeholder.com/300.png/751621/fff',
			summary: 'Lorem ipsum dolor sit amet tellus proin fames sagittis fringilla eleifend vestibulum volutpat.',
			title: 'Example',
		},
	},

	/**
	 * Parent
	 *
	 * If this is a child block, identify which block it can be inserted into.
	 *
	 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-registration/#parent-optional
	 */
	// parent: [ 'core/columns' ],

	/**
	 * Styles
	 *
	 * Create custom style variations for the block. These are passed as automatically
	 * generated classes, which you use to style the block. You can access these via the
	 * 'Change Block Type' control.
	 *
	 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-registration/#styles-optional
	 */
	styles: [
		{ name: 'image-left', label: __( 'Image Left', 'wholesome-boilerplate' ), isDefault: true },
		{ name: 'image-right', label: __( 'Image Right', 'wholesome-boilerplate' ) },
	],

	/**
	 * Supports
	 *
	 * Identifies what features the block supports.
	 *
	 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-registration/#supports-optional
	 */
	supports: {
		//	alignWide: false,
		//	anchor: false,
		align: false, // [ 'left', 'right', 'full' ], // true
		//	html: false,
		//	multiple: false,
		//	reusable: false,
	},

	/**
	 * Transforms
	 *
	 * Allow options to transform this block type into another block type.
	 * If used, this should be extracted into its own file.
	 *
	 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-registration/#transforms-optional
	 */
	// transforms: {}

	/**
	 * Edit
	 *
	 * The view and behaviour of the block in the block editor.
	 */
	edit: Edit,

	/**
	 * Save
	 *
	 * The view of the block on the front end.
	 *
	 * Note: It is possible to render the save view via PHP.
	 */
	save: Save,
} );
