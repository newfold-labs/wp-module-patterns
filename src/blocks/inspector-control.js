import { InspectorControls } from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalTruncate as Truncate,
} from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

import classnames from 'classnames';

function addAttributes(settings) {
	return {
		...settings,
		attributes: {
			...settings.attributes,
			nfdGroupDivider: {
				type: 'string',
				default: '',
			},
		},
	};
}

function addEditProps(settings) {
	const existingGetEditWrapperProps = settings.getEditWrapperProps;
	settings.getEditWrapperProps = (attributes) => {
		let props = {};

		if (existingGetEditWrapperProps) {
			props = existingGetEditWrapperProps(attributes);
		}

		return addSaveProps(props, settings, attributes);
	};

	return settings;
}

const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const { name, clientId } = props;

		const activeStyle = props?.attributes?.nfdGroupDivider ?? 'default';

		const isTopLevel = useSelect(
			(select) => {
				const { getBlockRootClientId } = select('core/block-editor');
				return !getBlockRootClientId(clientId);
			},
			[clientId]
		);

		const customStyles = useMemo(
			() => [
				{
					name: '',
					label: 'Default',
					isDefault: true,
				},
				{
					name: 'nfd-divider-arrow',
					label: 'Arrow',
				},
				{
					name: 'nfd-divider-ellipse',
					label: 'Ellipse',
				},
				{
					name: 'nfd-divider-rounded',
					label: 'Rounded',
				},
				{
					name: 'nfd-divider-slant',
					label: 'Slant',
				},
				{
					name: 'nfd-divider-slant-invert',
					label: 'Slant Invert',
				},
				{
					name: 'nfd-divider-triangle',
					label: 'Triangle',
				},
				{
					name: 'nfd-divider-zigzag',
					label: 'Zigzag',
				},
			],
			[]
		);

		return (
			<>
				<BlockEdit {...props} />
				{name === 'core/group' && isTopLevel && (
					<InspectorControls>
						<PanelBody
							title={__('Divider Style', 'nfd-wonder-blocks')}
							initialOpen={true}
						>
							<div className="block-editor-block-styles">
								<div className="block-editor-block-styles__variants">
									{customStyles.map((style) => {
										const buttonText = style.isDefault
											? __('Default', 'nfd-wonder-blocks')
											: style.label || style.name;

										return (
											<Button
												className={classnames(
													'block-editor-block-styles__item',
													{
														'is-active':
															activeStyle ===
															style.name,
													}
												)}
												key={style.name}
												variant="secondary"
												label={buttonText}
												onClick={() =>
													props.setAttributes({
														nfdGroupDivider:
															style.name,
													})
												}
												aria-current={
													activeStyle === style.name
												}
											>
												<Truncate
													numberOfLines={1}
													className="block-editor-block-styles__item-text"
												>
													{buttonText}
												</Truncate>
											</Button>
										);
									})}
								</div>
							</div>
						</PanelBody>
					</InspectorControls>
				)}
			</>
		);
	};
}, 'withInspectorControl');

function addSaveProps(saveElementProps, blockType, attributes) {
	const generatedClasses = saveElementProps?.className ?? [];
	const classes = attributes?.nfdGroupDivider
		? [attributes.nfdGroupDivider]
		: [];
	const additionalClasses = attributes?.className ?? [];

	if (!classes) {
		return saveElementProps;
	}

	// EK seems to be converting string values to objects in some situations
	const normalizeAsArray = (item) => {
		switch (Object.prototype.toString.call(item)) {
			case '[object String]':
				return item.split(' ');
			case '[object Array]':
				return item;
			default:
				return [];
		}
	};
	const classesCombined = new Set([
		...normalizeAsArray(additionalClasses),
		...normalizeAsArray(generatedClasses),
		...normalizeAsArray(classes),
	]);

	return Object.assign({}, saveElementProps, {
		className: [...classesCombined].join(' '),
	});
}

addFilter(
	'blocks.registerBlockType',
	'nfd-wonder-blocks/utilities/attributes',
	addAttributes
);

addFilter(
	'blocks.registerBlockType',
	'nfd-wonder-blocks/utilities/addEditProps',
	addEditProps
);

addFilter(
	'editor.BlockEdit',
	'nfd-wonder-blocks/utilities/inspectorControl',
	withInspectorControls
);

addFilter(
	'blocks.getSaveContent.extraProps',
	'nfd-wonder-blocks/utilities/extra-props',
	addSaveProps
);
