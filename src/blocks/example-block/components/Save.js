/**
 * React Imports.
 *
 * - PropTypes
 *   Typechecking for React components.
 *   @see https://reactjs.org/docs/typechecking-with-proptypes.html
 */
import PropTypes from 'prop-types';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @returns {WPElement} Element to render.
 */
export default function Save( {
	attributes: {
		imageAlt,
		imageID,
		imageURL,
		summary,
		title,
	},
	className,
} ) {
	/**
	 * Return
	 *
	 * This should be plain HTML with a few { variables } scattered around.
	 *
	 * Notes:
	 *
	 * - Microformats
	 *   Note that we are using the following microformats:
	 *   - h-entry: http://microformats.org/wiki/h-entry
	 *   - hentry: http://microformats.org/wiki/hentry
	 *   As this is an article, in theory we could use https://schema.org/Article
	 *   but that is more appropriate for a full page article, not a component.
	 *
	 * - `wp-image-${imageID}`
	 *   This code is parsed by WordPress and produces a responsive srcset on the
	 *   image tag.
	 */
	return (
		<article className={ `${ className } example-block h-entry hentry` }>
			{ imageURL && (
				<img
					alt={ imageAlt }
					className={ `example-block__figure wp-image-${ imageID }` }
					src={ imageURL }
				/>
			) }
			<div className="example-block__body">
				<h2 className="example-block__title p-name entry-title">{ title }</h2>
				<div className="example-block__summary p-summary entry-summary">
					{ summary }
				</div>
			</div>
		</article>
	);
}

// Typechecking the Component props.
Save.propTypes = {
	className: PropTypes.string.isRequired,
	attributes: PropTypes.shape( {
		imageAlt: PropTypes.string,
		imageID: PropTypes.number,
		imageURL: PropTypes.string,
		summary: PropTypes.array,
		title: PropTypes.string,
	} ).isRequired,
};
