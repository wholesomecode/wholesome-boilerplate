import PropTypes from 'prop-types';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

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
export default function Edit( { className } ) {
	return (
		<p className={ className }>
			{__( 'Wholesome Boilerplate – hello from the editor!', 'wholesomecode' )}
		</p>
	);
}

Edit.propTypes = {
	className: PropTypes.string.isRequired,
};
