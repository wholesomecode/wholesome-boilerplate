/**
 * Edit Container.
 *
 * A container for the Edit Component, that we use to wrap it with
 * Higher-Order Component(s) HOC.
 */

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
 * - compose
 *   Composes multiple higher-order components into a single higher-order
 *   component.
 *   @see https://developer.wordpress.org/block-editor/packages/packages-compose/#compose
 *
 * - withSelect
 *   Higher-order component used to inject state-derived props using
 *   registered selectors.
 *   @see https://developer.wordpress.org/block-editor/packages/packages-data/#withSelect
 */
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

// Import the component that we are going to wrap.
import Edit from '../components/Edit';

/**
 * Map Select to Props.
 *
 * Listen for a state change.
 *
 * - imageObject
 *   Returns the image object based on the ID.
 *
 * @param function select Calls a registered data store selector.
 */
export const mapSelectToProps = ( select, props ) => {
	const imageID = _get( props, 'attributes.imageID', 0 );

	return {
		imageObject: imageID ? select( 'core' ).getMedia( imageID ) : undefined,
	};
};

// Compose the HOC, and apply it to the Sidebar Component, and Export it.
export default compose(
	withSelect( mapSelectToProps ),
)( Edit );
