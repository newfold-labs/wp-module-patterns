import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import {
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	} from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { __ } from "@wordpress/i18n";


const SUPPORTED = new Set(['core/paragraph','core/heading', 'core/group']);

addFilter('blocks.registerBlockType','nfd-wonder-blocks/utilities/attributes',(settings,name)=>{
	if (!SUPPORTED.has(name)) return settings;
	return {
		...settings,
		attributes: {
			...settings.attributes,
			nfdHoverColor: {
				type: 'string',
				default: ''
			},
			nfdBackgroundHover: {
				type: 'string',
				default: ''
			},
		},
	};
});

const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (!SUPPORTED.has(props.name)) return <BlockEdit {...props} />;

		const { attributes, setAttributes, isSelected } = props;
		const { nfdHoverColor, nfdBackgroundHover } = attributes;

		const colorGradientSettings = useMultipleOriginColorsAndGradients();

		const panelId = props.clientId;

		const onHoverTextChange = (color) => {
			setAttributes({ nfdHoverColor: color || '' });
		};
		const onHoverBgChange = (color) => {
			setAttributes({ nfdBackgroundHover: color || '' });
		};

		return (
			<Fragment>
				<BlockEdit {...props} />
				{isSelected && (
					<InspectorControls group="color">
						<ColorGradientSettingsDropdown
							panelId={panelId}
							__experimentalIsRenderedInSidebar
							heading={__('Hover color', 'nfd-wonder-blocks')}
							settings={[
								{
									label: __('Text (hover)', 'nfd-wonder-blocks'),
									colorValue: nfdHoverColor || undefined,
									onColorChange: onHoverTextChange,
									gradientValue: undefined,
									onGradientChange: undefined,
								},
								{
									label: __('Background (hover)', 'nfd-wonder-blocks'),
									colorValue: nfdBackgroundHover || undefined,
									onColorChange: onHoverBgChange,
									gradientValue: undefined,
									onGradientChange: undefined,
								},
							]}
							{ ...colorGradientSettings }
						/>
					</InspectorControls>
				)}
			</Fragment>
		);
	};
}, 'withInspectorControls');

export default withInspectorControls;

function addSaveProps( props, blockType, attributes ) {
	if ( !SUPPORTED.has(blockType.name) ) {
		return props;
	}

	const { nfdBackgroundHover, nfdHoverColor } = attributes;

	const existingClasses = props.className ? props.className.split(' ') : [];
	const classes = [...existingClasses];

	const style = { ...(props.style||{}) };

	let hasHover = false;

	if (nfdHoverColor) {
		hasHover = true;
		classes.push('nfd-hover-text');
		style['--nfd-hover-text'] = nfdHoverColor;
	}
	if (nfdBackgroundHover) {
		hasHover = true;
		classes.push('nfd-hover-bg');
		style['--nfd-hover-bg'] = nfdBackgroundHover;
	}

	if (hasHover) {
		classes.push('nfd-hoverable');
	}

	return { ...props, className: Array.from(new Set(classes)).join(' '), style };
}

const withHoverEditorPreview = createHigherOrderComponent( ( OriginalComponent ) => {
	return ( props ) => {
		if ( !SUPPORTED.has(props.name) ) {
			return <OriginalComponent { ...props } />;
		}

		const { attributes } = props;
		const { nfdHoverColor, nfdBackgroundHover } = attributes;

		const classes = new Set((props.className||'').split(' ').filter(Boolean));
		const style = { ...(props?.wrapperProps?.style || {}) };

		let hasHover = false;

		if (nfdHoverColor) {
			hasHover = true;
			classes.add('nfd-hover-text');
			style['--nfd-hover-text'] = nfdHoverColor;
		}
		if (nfdBackgroundHover) {
			hasHover = true;
			classes.add('nfd-hover-bg');
			style['--nfd-hover-bg'] = nfdBackgroundHover;
		}
		if (hasHover) {
			classes.add('nfd-hoverable');
		}

		const wrapperProps = {
			...(props.wrapperProps||{}),
			className: Array.from(classes).join(' '),
			style,
		};

		return <OriginalComponent { ...props } wrapperProps={ wrapperProps } />;
	};
}, 'withHoverEditorPreview' );

addFilter('blocks.getSaveContent.extraProps', 'nfd-wonder-blocks/utilities/extraProps', addSaveProps );
addFilter('editor.BlockEdit', 'nfd-wonder-blocks/utilities/inspectorControl', withInspectorControls);
addFilter('editor.BlockListBlock', 'nfd-wonder-blocks/utilities/hoverEditorPreview', withHoverEditorPreview);
