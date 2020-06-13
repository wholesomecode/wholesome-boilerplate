/**
 * React Imports.
 *
 * - PropTypes
 *   Typechecking for React components.
 *   @see https://reactjs.org/docs/typechecking-with-proptypes.html
 */
import PropTypes from 'prop-types';

/**
 * External Imports
 *
 * - _get
 *   Gets the value at path of object. If the resolved value is undefined,
 *   the defaultValue is returned in its place.
 *   @see https://lodash.com/docs/4.17.15#get
 */
import _get from 'lodash/get';

/**
 * WordPress Imports.
 *
 * - Button
 *   Generates a button.
 *   @see https://developer.wordpress.org/block-editor/components/button/
 *
 * - PanelBody
 *   Provides a collapsable panel component.
 *   @see https://developer.wordpress.org/block-editor/components/panel/#development-guidelines
 *
 * - ResponsiveWrapper
 *   Make the image responsive to the current viewpoint.
 *   @see https://developer.wordpress.org/block-editor/components/responsive-wrapper/
 *
 * - Spinner
 *   Spinners notify users that their action is being processed.
 *   @see https://developer.wordpress.org/block-editor/components/spinner/
 *
 * - InspectorControls
 *   Controls for the block that appear in the block sidebar.
 *   @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/block-controls-toolbar-and-sidebar
 *   /#inspector
 *
 * - MediaUpload
 *   UI button to open the media library.
 *   @see https://developer.wordpress.org/block-editor/packages/packages-media-utils/#mediaupload
 *
 * - MediaUploadCheck
 *   Check the current user has Upload permissions.
 *   @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#MediaUpload
 *
 * - Component
 *   A base class to create WordPress Components (Refs, state and lifecycle hooks).
 *   @see https://developer.wordpress.org/block-editor/packages/packages-element/#Component
 *
 * - Fragment
 *   A component which renders its children without any wrapping element.
 *   @see https://developer.wordpress.org/block-editor/packages/packages-element/#Fragment
 *
 * - __
 *   Internationalization - multilingual translation support.
 *   @see https://developer.wordpress.org/block-editor/developers/internationalization/
 */
import { Button, PanelBody, ResponsiveWrapper, Spinner } from '@wordpress/components';
import { InspectorControls as InspectorControlsOriginal, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Component, Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Register Component
 *
 * Create a sidebar panel for the block that allows us to edit an image.
 *
 * Note: We are using the classes that the block editor (Gutenberg) uses natively for
 * the featured image selector, this keeps our styles inline with the WordPress dashboard.
 */
export default class InspectorControls extends Component {
	render() {
		const {
			attributes: {
				imageAlt,
				imageID,
				imageURL,
			},
			imageObject,
			onChangeImageID,
			setAttributes,
		} = this.props;

		const imageHeight = _get( imageObject, 'media_details.height', 0 );
		const imageWidth = _get( imageObject, 'media_details.width', 0 );

		return (
			<MediaUploadCheck>
				<InspectorControlsOriginal>
					<PanelBody
						className="example-block-inspector-controls__panel"
						initialOpen={ false }
						title={ __( 'Edit Image', 'wholesome-boilerplate' ) }
					>
						<div className="editor-post-featured-image">
							<MediaUpload
								onSelect={ onChangeImageID }
								allowedTypes={ [ 'image' ] }
								type="image"
								modalClass="editor-post-featured-image__media-modal"
								value={ imageID }
								render={ ( { open } ) => (
									<Fragment>
										{ imageURL ? (
											<Button className="editor-post-featured-image__preview" onClick={ open }>
												{ imageWidth && imageHeight ? (
													<ResponsiveWrapper
														isInline
														naturalWidth={ imageWidth }
														naturalHeight={ imageHeight }
													>
														<img src={ imageURL } alt={ imageAlt } />
													</ResponsiveWrapper>
												) : (
													<Spinner />
												) }
											</Button>
										) : (
											<Button className="editor-post-featured-image__toggle" onClick={ open }>
												{ __( 'Set block image', 'wholesome-boilerplate' ) }
											</Button>
										) }
									</Fragment>
								) }
							/>

							{ imageURL && (
								<Fragment>
									<MediaUpload
										title={ __( 'Replace image', 'wholesome-boilerplate' ) }
										onSelect={ onChangeImageID }
										type="image"
										modalClass="editor-post-featured-image__media-modal"
										render={ ( { open } ) => (
											<Button onClick={ open } isSecondary isLarge>
												{ __( 'Replace image', 'wholesome-boilerplate' ) }
											</Button>
										) }
									/>
									<Button
										isLink
										isDestructive
										label={ __( 'Remove block image', 'wholesome-boilerplate' ) }
										onClick={ () => setAttributes( {
											imageID: 0,
											imageURL: null,
											imageAlt: null,
										} ) }
									>
										{ __( 'Remove Image', 'wholesome-boilerplate' ) }
									</Button>
								</Fragment>
							) }
						</div>
					</PanelBody>
				</InspectorControlsOriginal>
			</MediaUploadCheck>
		);
	}
}

// Typechecking the Component props.
InspectorControls.propTypes = {
	attributes: PropTypes.shape( {
		imageAlt: PropTypes.string,
		imageID: PropTypes.number,
		imageURL: PropTypes.string,
	} ).isRequired,
	imageObject: PropTypes.objectOf( PropTypes.any ),
	onChangeImageID: PropTypes.func.isRequired,
	setAttributes: PropTypes.func.isRequired,
};

InspectorControls.defaultProps = {
	imageObject: {},
};
