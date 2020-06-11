/**
 * Sidebar Container.
 *
 * A container for the Sidebar Component, that we use to wrap it with
 * Higher-Order Component(s) HOC.
 */

/**
 * WordPress Imports.
 * - compose
 *   Composes multiple higher-order components into a single higher-order
 *   component.
 *   @see https://developer.wordpress.org/block-editor/packages/packages-compose/#compose
 *
 * - withDispatch
 *   Higher-order component used to add dispatch props using registered
 *   action creators.
 *   @see https://developer.wordpress.org/block-editor/packages/packages-data/#withDispatch
 *
 * - withSelect
 *   Higher-order component used to inject state-derived props using
 *   registered selectors.
 *   @see https://developer.wordpress.org/block-editor/packages/packages-data/#withSelect
 */
import { compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';

// Import the component that we are going to wrap.
import Sidebar from '../components/Sidebar';

/**
 * Map Dispatch to Props.
 *
 * Dispatch an action to trigger a state change.
 *
 * - editPost
 *   Returns an action object used in signalling that attributes of the post
 *   have been edited.
 *   - Used to update the metadata of a post.
 *
 * @param function dispatch Calls a registered data store reducer.
 */
const mapDispatchToProps = ( dispatch ) => {
	const { editPost } = dispatch( 'core/editor' );
	return {
		editPost,
	};
};

/**
 * Map Select to Props.
 *
 * Listen for a state change.
 *
 * - getEditedPostAttribute
 *   Returns a single attribute of the post being edited
 *   - The attribute we are wanting is `meta` to get the current metadata of a post.
 *
 * @param function select Calls a registered data store selector.
 */
const mapSelectToProps = ( select ) => {
	const { getEditedPostAttribute } = select( 'core/editor' );
	return {
		postMeta: getEditedPostAttribute( 'meta' ),
	};
};

// Compose the HOC, and apply it to the Sidebar Component, and Export it.
export default compose(
	withDispatch( mapDispatchToProps ),
	withSelect( mapSelectToProps ),
)( Sidebar );
