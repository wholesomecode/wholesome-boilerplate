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
 * - BaseControl
 *   Generate labels and help text for components.
 *   @see https://developer.wordpress.org/block-editor/components/base-control/
 *
 * - Button
 *   Generates a button.
 *   @see https://developer.wordpress.org/block-editor/components/button/
 *
 * - PanelBody
 *   Provides a collapsable panel component.
 *   @see https://developer.wordpress.org/block-editor/components/panel/#development-guidelines
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
 * - __
 *   Internationalization - multilingual translation support.
 *   @see https://developer.wordpress.org/block-editor/developers/internationalization/
 */
import { BaseControl, Button, PanelBody } from '@wordpress/components';
import { InspectorControls as InspectorControlsOriginal, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Register Component
 *
 * Create a sidebar panel for the block that allows us to edit an image.
 */
export default class InspectorControls extends Component {
	render() {
		const {
			attributes: {
				imageID,
				imageURL,
			},
			onChangeImageID,
			setAttributes,
		} = this.props;

		return (
			<MediaUploadCheck>
				<InspectorControlsOriginal>
					<PanelBody
						className="example-block-inspector-controls__panel"
						initialOpen={ false }
						title={ __( 'Edit Image', 'wholesome-boilerplate' ) }
					>
						<BaseControl
							className="example-block-inspector-controls__media-upload"
							label={ __( 'Choose an Image', 'wholesome-boilerplate' ) }
						>
							<MediaUpload
								onSelect={ onChangeImageID }
								allowedTypes={ [ 'image' ] }
								type="image"
								value={ imageID }
								render={ ( { open } ) => (
									<Button
										label={ __( 'Choose Image', 'wholesome-boilerplate' ) }
										isSecondary
										isLarge
										onClick={ open }
									>
										{ __( 'Choose Image', 'wholesome-boilerplate' ) }
									</Button>
								) }
							/>
							{ imageURL && (
								<Button
									isLink
									isDestructive
									label={ __( 'Remove Image', 'wholesome-boilerplate' ) }
									onClick={ () => setAttributes( {
										imageID: '',
										imageURL: null,
										imageAlt: null,
										imageType: null,
									} ) }
								>
									{ __( 'Remove Image', 'wholesome-boilerplate' ) }
								</Button>
							) }
						</BaseControl>
					</PanelBody>
				</InspectorControlsOriginal>
			</MediaUploadCheck>
		);
	}
}

// Typechecking the Component props.
InspectorControls.propTypes = {
	attributes: PropTypes.shape( {
		imageID: PropTypes.string,
		imageURL: PropTypes.string,
	} ).isRequired,
	onChangeImageID: PropTypes.func.isRequired,
	setAttributes: PropTypes.func.isRequired,
};
