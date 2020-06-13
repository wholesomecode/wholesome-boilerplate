/**
 * WordPress dependencies
 */

/**
 * WordPress Imports.
 *
 * - api
 *   The REST API interface.
 *   @see https://developer.wordpress.org/rest-api/reference/
 *   - loadPromise @see https://developer.wordpress.org/rest-api/using-the-rest-api/
 *     backbone-javascript-client/#waiting-for-the-client-to-load
 *   - models @see https://developer.wordpress.org/rest-api/using-the-rest-api/
 *     backbone-javascript-client/#model-examples
 *
 * - BaseControl
 *   BaseControl component is used to generate labels and help text for components handling user inputs.
 *   @see https://developer.wordpress.org/block-editor/components/base-control/
 *
 * - Button
 *   Buttons let users take actions and make choices with a single click or tap.
 *   @see https://developer.wordpress.org/block-editor/components/button/
 *
 * - PanelBody
 *   The PanelBody creates a collapsible container that can be toggled open or closed.
 *   @see https://developer.wordpress.org/block-editor/components/panel/#panelbody
 *
 * - PanelRow
 *   The is a generic container for panel content. Default styles add a top margin
 *   and arrange items in a flex row.
 *   @see https://developer.wordpress.org/block-editor/components/panel/#panelrow
 *
 * - Placeholder
 *   @see https://developer.wordpress.org/block-editor/components/placeholder/
 *
 * - Spinner
 *   Spinners notify users that their action is being processed.
 *   @see https://developer.wordpress.org/block-editor/components/spinner/
 *
 * - ToggleControl
 *   ToggleControl is used to generate a toggle user interface.
 *   @see https://developer.wordpress.org/block-editor/components/toggle-control/
 *
 * - render
 *   Abstraction of the React render command.
 *   @see https://reactjs.org/docs/react-dom.html#render
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
import api from '@wordpress/api';

import {
	BaseControl,
	Button,
	PanelBody,
	PanelRow,
	Placeholder,
	SelectControl,
	Spinner,
	ToggleControl,
} from '@wordpress/components';

import {
	render,
	Component,
	Fragment,
} from '@wordpress/element';

import { __ } from '@wordpress/i18n';

/**
 * Plugin Imports.
 *
 * - settings
 *   Localized settings from the PHP part of the application.
 *
 * Used here to retrieve the page templates.
 */
import settings from '../../settings';

class App extends Component {
	constructor() {
		// eslint-disable-next-line prefer-rest-params
		super( ...arguments );

		this.changeOptions = this.changeOptions.bind( this );

		const {
			exampleDropdown,
			exampleInput,
			exampleInputSave,
			exampleToggle,
		} = settings;

		this.state = {
			isAPILoaded: false,
			isAPISaving: false,
			[ exampleDropdown ]: '',
			[ exampleInput ]: '',
			[ exampleInputSave ]: '',
			[ exampleToggle ]: false,
		};
	}

	componentDidMount() {
		api.loadPromise.then( () => {
			this.settings = new api.models.Settings();

			const { isAPILoaded } = this.state;

			const {
				exampleDropdown,
				exampleInput,
				exampleInputSave,
				exampleToggle,
			} = settings;

			if ( isAPILoaded === false ) {
				this.settings.fetch().then( ( response ) => {
					this.setState( {
						[ exampleDropdown ]: response[ exampleDropdown ],
						[ exampleInput ]: response[ exampleInput ],
						[ exampleInputSave ]: response[ exampleInputSave ],
						[ exampleToggle ]: Boolean( response[ exampleToggle ] ),
						isAPILoaded: true,
					} );
				} );
			}
		} );
	}

	changeOptions( option, value ) {
		this.setState( { isAPISaving: true } );

		const model = new api.models.Settings( {
			[ option ]: value,
		} );

		model.save().then( ( response ) => {
			this.setState( {
				[ option ]: response[ option ],
				isAPISaving: false,
			} );
		} );
	}

	render() {
		const {
			exampleDropdown,
			exampleDropdownOptions,
			exampleInput,
			exampleInputSave,
			exampleToggle,
		} = settings;

		const {
			isAPILoaded,
			isAPISaving,
			[ exampleDropdown ]: exampleDropdownValue,
			[ exampleInput ]: exampleInputValue,
			[ exampleInputSave ]: exampleInputSaveValue,
			[ exampleToggle ]: exampleToggleValue,
		} = this.state;

		if ( ! isAPILoaded ) {
			return (
				<Placeholder>
					<Spinner />
				</Placeholder>
			);
		}

		return (
			<Fragment>
				<div className="wholesome-boilerplate-header">
					<div className="wholesome-boilerplate-container">
						<div className="wholesome-boilerplate-logo">
							<h1>{ __( 'Wholesome Boilerplate Settings', 'wholesome-boilerplate' ) }</h1>
						</div>
					</div>
				</div>

				<div className="wholesome-boilerplate-main">
					<PanelBody
						title={ __( 'Settings Panel One', 'wholesome-boilerplate' ) }
					>
						<PanelRow>
							<SelectControl
								className="wholesome-boilerplate-field"
								// eslint-disable-next-line
								help={ __( 'When you alter the dropdown, it saves the site option instantly in the background.', 'wholesome-boilerplate' ) }
								label={ __( 'Example Dropdown', 'wholesome-boilerplate' ) }
								onChange={ ( value ) => this.changeOptions(
									[ exampleDropdown ],
									value
								) }
								options={ [
									{
										label: __( 'Please Select...', 'wholesome-boilerplate' ),
										value: '',
									},
									...exampleDropdownOptions,
								] }
								value={ exampleDropdownValue }
							/>
						</PanelRow>
					</PanelBody>

					<PanelBody
						title={ __( 'Settings Panel Two', 'wholesome-boilerplate' ) }
					>
						<PanelRow>
							<BaseControl
								label={ __( 'Example Input', 'wholesome-boilerplate' ) }
								help={ __( 'When you type the site option is saved instantly in the background.',
									'wholesome-boilerplate' ) }
								id={ exampleInput }
								className="wholesome-boilerplate-field"
							>
								<input
									type="text"
									id={ exampleInput }
									value={ exampleInputValue }
									placeholder={ __( 'Example Input', 'wholesome-boilerplate' ) }
									onChange={ ( e ) => this.changeOptions(
										[ exampleInput ],
										e.target.value
									) }
								/>
							</BaseControl>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label={ __( 'Example Toggle', 'wholesome-boilerplate' ) }
								// eslint-disable-next-line max-len
								help={ __( 'When you slide the toggle the site option is saved instantly in the background',
									'wholesome-boilerplate' ) }
								checked={ exampleToggleValue }
								onChange={ () => this.changeOptions(
									[ exampleToggle ],
									! exampleToggleValue
								) }
							/>
						</PanelRow>
					</PanelBody>

					<PanelBody
						title={ __( 'Settings Panel Three', 'wholesome-boilerplate' ) }
					>
						<PanelRow>
							<BaseControl
								label={ __( 'Example Input with Save', 'wholesome-boilerplate' ) }
								help={ __( 'When you type, the option is not saved until you click the save button.',
									'wholesome-boilerplate' ) }
								id={ [ exampleInputSave ] }
								className="wholesome-boilerplate-field"
							>
								<input
									type="text"
									id={ [ exampleInputSave ] }
									value={ exampleInputSaveValue }
									placeholder={ __( 'Example Input with Save', 'wholesome-boilerplate' ) }
									disabled={ isAPISaving }
									onChange={ ( e ) => this.setState( {
										[ exampleInputSave ]: e.target.value,
									} ) }
								/>
								<div className="wholesome-boilerplate-field-button-group">
									<Button
										isPrimary
										isLarge
										disabled={ isAPISaving }
										onClick={ () => this.changeOptions(
											[ exampleInputSave ],
											exampleInputSaveValue
										) }
									>
										{ __( 'Save', 'wholesome-boilerplate' ) }
									</Button>
								</div>
							</BaseControl>
						</PanelRow>
					</PanelBody>
				</div>
			</Fragment>
		);
	}
}

const htmlOutput = document.getElementById( 'wholesome-boilerplate-settings' );

if ( htmlOutput ) {
	render(
		<App />,
		htmlOutput
	);
}
