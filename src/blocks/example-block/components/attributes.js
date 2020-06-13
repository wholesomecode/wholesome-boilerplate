/**
 * Attributes.
 *
 * The block, and any components it uses will use these
 * attributes to store data.
 *
 * We break it into its own file, as otherwise the index file
 * will become bloated.
 *
 * Note: The summary attribute uses a CSS class as its selector.
 * The value of this attribute will be saved in the blocks Save view
 * that matches this class, not in the surrounding block comment.
 */
const attributes = {
	imageAlt: {
		type: 'string',
	},
	imageID: {
		type: 'number',
	},
	imageURL: {
		type: 'string',
	},
	summary: {
		type: 'array',
		source: 'children',
		selector: '.example-block__summary',
	},
	title: {
		type: 'string',
	},
};

export default attributes;
