/**
 * Attributes.
 *
 * The block, and any components it uses will use these
 * attributes to store data.
 *
 * We break it into its own file, as otherwise the index file
 * can become bloated, and we can easily see which attributes
 * are available in each component if we extract the props at the
 * start of the component.
 *
 * TODO: Note about summary.
 */
const attributes = {
	imageAlt: {
		type: 'string',
	},
	imageID: {
		type: 'string',
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
