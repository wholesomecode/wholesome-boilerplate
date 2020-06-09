/**
 * Sidebar Component.
 *
 * The Sidebar Component, some props are inherited from Higher-Order Component(s)
 * HOC. These are contained within their own components folder ../containers.
 *
 * Note that post metadata is used within this component. This is registered via
 * PHP within /inc/sidebar-permissions.
 */

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
 * - PanelBody
 *   The PanelBody creates a collapsible container that can be toggled open or closed.
 *   @see https://developer.wordpress.org/block-editor/components/panel/#panelbody
 *
 * - ToggleControl
 *   ToggleControl is used to generate a toggle user interface.
 *   @see https://developer.wordpress.org/block-editor/components/toggle-control/
 *
 * - PluginSidebar
 *   This slot allows for adding items into the Gutenberg Toolbar. Using
 *   this slot will add an icon to the bar that, when clicked, will open
 *   a sidebar with the content of the items wrapped in the <PluginSidebar />
 *   component.
 *   @see https://developer.wordpress.org/block-editor/developers/slotfills/plugin-sidebar/
 *
 * - PluginSidebarMoreMenuItem
 *   This slot allows the creation of a <PluginSidebar> with a menu item that when
 *   clicked will expand the sidebar to the appropriate Plugin section.
 *   @see https://developer.wordpress.org/block-editor/developers/slotfills/plugin-sidebar-more-menu-item/
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
import { PanelBody, ToggleControl } from '@wordpress/components';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { Component, Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Plugin Imports.
 *
 * - settings
 *   Localized settings from the PHP part of the application.
 *
 * Used here to retrieve the meta key for the Login Required
 * meta field, while at the same time allowing a JS friendly
 * name.
 */
import settings from '../../../settings';

// The prefix for our CSS classes.
const baseClassName = 'sidebar-permissions';

// The name and title of the plugin, so that it can be registered and if
// needed accessed within a filter.
export const sidebarName = 'sidebar-permissions'; // Could just set to baseClassName, but keeping full for example.
export const sidebarTitle = __( 'Permissions', 'wholesome-boilerplate' );

/**
 * Sidebar Permissions.
 *
 * Basic sidebar with one slide toggle that updates a post meta value.
 */
class SidebarPermissions extends Component {
	render() {
		// Props populated via Higher-Order Component.
		const {
			editPost,
			postMeta,
		} = this.props;

		// Retrieve the PHP meta key from the settings, and then access the
		// value from the postMeta object.
		const { metaKeyLoginRequired } = settings;
		const loginRequired = postMeta[ metaKeyLoginRequired ];

		return (
			<Fragment>
				<PluginSidebarMoreMenuItem target={ sidebarName }>
					{ sidebarTitle }
				</PluginSidebarMoreMenuItem>
				<PluginSidebar
					name={ sidebarName }
					title={ sidebarTitle }
				>
					<PanelBody
						className={ `${ baseClassName }__example` }
						title={ __( 'Permissions', 'wholesome-boilerplate' ) }
					>
						<ToggleControl
							checked={ loginRequired }
							help={ __( 'User must be logged-in in to view this post.', 'wholesome-boilerplate' ) }
							label={ __( 'Require Login', 'wholesome-boilerplate' ) }
							onChange={ ( value ) => {
								// On change use editPost to dispatch the updated
								// postMeta object.
								editPost( {
									...postMeta,
									meta: {
										[ metaKeyLoginRequired ]: value,
									},
								} );
							} }
						/>
					</PanelBody>
				</PluginSidebar>
			</Fragment>
		);
	}
}

// Export the Sidebar.
export default SidebarPermissions;

// Typechecking the Component props.
SidebarPermissions.propTypes = {
	editPost: PropTypes.func.isRequired,
	postMeta: PropTypes.arrayOf( PropTypes.any ).isRequired,
};
