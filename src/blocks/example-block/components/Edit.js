/**
 * React Imports.
 *
 * - PropTypes
 *   Typechecking for React components.
 *   @see https://reactjs.org/docs/typechecking-with-proptypes.html
 */
import PropTypes from 'prop-types';

/**
 * WordPress Imports.
 *
 * - MediaPlaceholder
 *   Image placeholder that allows media library image selection.
 *   @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#MediaPlaceholder
 *
 * - RichText
 *   Allows insertion of dynamic text inside a component.
 *   @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#RichText
 *
 * - __
 *   Internationalization - multilingual translation support.
 *   @see https://developer.wordpress.org/block-editor/developers/internationalization/
 */
import { MediaPlaceholder, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Plugin Imports.
 *
 * - BlockControls
 *   Define additional block toolbar controls.
 *
 * - InspectorControls
 *   Define additional block sidebar controls.
 */
import BlockControls from './BlockControls'; // (Toolbar)
import InspectorControls from './InspectorControls'; // (Sidebar)

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object} [props] - Properties passed from the editor.
 *
 * @returns {WPElement} Element to render.
 */
export default function Edit( props ) {
	/**
	 * Extract Props
	 *
	 * Extract the props into their own variables. Another way to do this is have the
	 * extraction occur as the props are passed into the function. See the Save component
	 * for an example of this.
	 */
	const {
		attributes,
		className,
		imageObject,
		setAttributes,
	} = props;

	const {
		imageAlt,
		imageID,
		imageURL,
		summary,
		title,
	} = attributes;

	/**
	 * Global Functions.
	 *
	 * Most setAttributes calls are inline with the component, however sometimes they are
	 * used more than once, for example, the onChangeImageID function below is used by this
	 * component and the InspectorControls and BlockControls components.
	 */
	const onChangeImageID = ( image ) => {
		setAttributes( {
			imageAlt: image.alt,
			imageID: parseInt( image.id, 10 ),
			imageURL: image.url,
		} );
	};

	/**
	 * Return
	 *
	 * Here is where we return our JSX. Note that we are returning an array.
	 * We are passing in:
	 *
	 * - InspectorControls
	 * - BlockControls
	 * - Edit View
	 *
	 * Note that props passed into custom components are explicit, we should
	 * avoid passing the entire props into the components.
	 *
	 * Notes:
	 *
	 * - OR and AND
	 *   JSX only allows us to use ternary operators. Put simply:
	 *   OR: { condition ? ( <div></div> ) : ( <div></div> ) }
	 *   Sometimes you don't want the else part of the or (:) in which case you can write:
	 *   { condition && <div></div> }
	 *   This will only display the JSX if the condition is met.
	 *
	 * - RichText
	 *   If you are using multiline, (as per the summary in this bloc), make sure that
	 *   your attribute is set to an array, and you have a corresponding area in the save
	 *   view.
	 *
	 *   Rather than being saved into an attribute, the content is saved directly to the
	 *   HTML of the block.
	 */
	return [
		<InspectorControls
			key="InspectorControls"
			{ ...{ attributes, imageObject, onChangeImageID, setAttributes } }
		/>,
		<BlockControls key="BlockControls" { ...{ attributes, onChangeImageID } } />,
		<article className={ `${ className } example-block h-entry hentry` } key="Block">
			{ ! imageURL ? (
				<MediaPlaceholder
					accept="image/*"
					className="example-block__figure"
					icon="format-image"
					labels={ {
						title: 'Upload Image',
						instructions: __( 'Upload an image for the header', 'wholesome-boilerplate' ),
					} }
					onSelect={ onChangeImageID }
				/>
			) : (
				<img
					alt={ imageAlt }
					className={ `example-block__figure wp-image-${ imageID }` }
					src={ imageURL }
				/>
			) }
			<div className="example-block__body">
				<RichText
					className="example-block__title p-name entry-title"
					keepPlaceholderOnFocus
					onChange={ ( title ) => setAttributes( { title } ) }
					placeholder={ __( 'Title', 'wholesome-boilerplate' ) }
					tagName="h2"
					value={ title }
				/>
				<RichText
					className="example-block__summary p-summary entry-summary"
					keepPlaceholderOnFocus
					multiline="p"
					onChange={ ( summary ) => setAttributes( { summary } ) }
					placeholder={ __( 'Summary', 'wholesome-boilerplate' ) }
					tagName="div"
					value={ summary }
				/>
			</div>
		</article>,
	];
}

// Typechecking the Component props.
Edit.propTypes = {
	className: PropTypes.string.isRequired,
	attributes: PropTypes.shape( {
		imageAlt: PropTypes.string,
		imageID: PropTypes.number,
		imageURL: PropTypes.string,
		summary: PropTypes.array,
		title: PropTypes.string,
	} ).isRequired,
	imageObject: PropTypes.objectOf( PropTypes.any ),
};

Edit.defaultProps = {
	imageObject: {},
};
