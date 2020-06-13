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
 * - Button
 *   Generates a button.
 *   @see https://developer.wordpress.org/block-editor/components/button/
 *
 * - Toolbar
 *   Group related items with an icon in the toolbar.
 *   @see https://developer.wordpress.org/block-editor/components/toolbar/
 *
 * - BlockControls
 *   Controls for the block that appear in the block toolbar.
 *   @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/block-controls-toolbar-and-sidebar/
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
import { Button, Toolbar } from '@wordpress/components';
import { BlockControls as BlockControlsOriginal, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Register Component
 *
 * Component that registers a toolbar with a button to edit the image.
 */
export default class BlockControls extends Component {
	render() {
		const {
			attributes: {
				imageID,
			},
			onChangeImageID,
		} = this.props;

		return (
			<BlockControlsOriginal>
				<MediaUploadCheck>
					<Toolbar>
						<MediaUpload
							allowedTypes={ [ 'image' ] }
							onSelect={ onChangeImageID }
							render={ ( { open } ) => (
								<Button
									className="components-toolbar__control"
									icon="edit"
									label={ __( 'Edit Image', 'wholesome-boilerplate' ) }
									onClick={ open }
								/>
							) }
							value={ imageID }
						/>
					</Toolbar>
				</MediaUploadCheck>
			</BlockControlsOriginal>
		);
	}
}

// Typechecking the Component props.
BlockControls.propTypes = {
	attributes: PropTypes.shape( {
		imageID: PropTypes.number,
	} ).isRequired,
	onChangeImageID: PropTypes.func.isRequired,
};
