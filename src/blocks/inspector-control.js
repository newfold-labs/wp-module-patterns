import { InspectorControls } from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalTruncate as Truncate,
	SelectControl,
} from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

import classnames from 'classnames';

// These block types do not support custom attributes.
const skipBlockTypes = [
	'core/archives',
	'core/calendar',
	'core/latest-comments',
	'core/rss',
	'core/tag-cloud',
];

function addAttributes(settings, name) {
	if (skipBlockTypes.includes(name)) {
		return settings;
	}

	if (name === 'core/group') {
		settings.attributes = {
			...settings.attributes,
			nfdGroupDivider: {
				type: 'string',
			},
		};
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			nfdAnimation: {
				type: 'string',
			},
			nfdAnimationDelay: {
				type: 'string',
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
		const selectedAnimation = props?.attributes?.nfdAnimation ?? '';
		const selectedAnimationDelay =
			props?.attributes?.nfdAnimationDelay ?? '';

		const isTopLevel = useSelect(
			(select) => {
				const { getBlockRootClientId } = select('core/block-editor');
				return !getBlockRootClientId(clientId);
			},
			[clientId]
		);

		const customDividerStyles = useMemo(
			() => [
				{
					name: '',
					label: __('Default', 'nfd-wonder-blocks'),
					isDefault: true,
				},
				{
					name: 'nfd-divider-arrow',
					label: __('Arrow', 'nfd-wonder-blocks'),
				},
				{
					name: 'nfd-divider-ellipse',
					label: __('Ellipse', 'nfd-wonder-blocks'),
				},
				{
					name: 'nfd-divider-rounded',
					label: __('Rounded', 'nfd-wonder-blocks'),
				},
				{
					name: 'nfd-divider-slant',
					label: __('Slant', 'nfd-wonder-blocks'),
				},
				{
					name: 'nfd-divider-slant-invert',
					label: __('Slant Invert', 'nfd-wonder-blocks'),
				},
				{
					name: 'nfd-divider-triangle',
					label: __('Triangle', 'nfd-wonder-blocks'),
				},
				{
					name: 'nfd-divider-zigzag',
					label: __('Zigzag', 'nfd-wonder-blocks'),
				},
				{
					name: 'nfd-divider-clouds',
					label: __('Clouds', 'nfd-wonder-blocks'),
				},
			],
			[]
		);

		const customAnimationStyles = useMemo(
			() => [
				{
					value: '',
					label: __('None', 'nfd-wonder-blocks'),
				},
				{
					value: 'nfd-wb-fade-in-bottom',
					label: __('Fade In Bottom', 'nfd-wonder-blocks'),
				},
				{
					value: 'nfd-wb-fade-in-top-short',
					label: __('Fade In Top Short', 'nfd-wonder-blocks'),
				},
				{
					value: 'nfd-wb-fade-in-right-short',
					label: __('Fade In Right Short', 'nfd-wonder-blocks'),
				},
				{
					value: 'nfd-wb-fade-in-bottom-short',
					label: __('Fade In Bottom Short', 'nfd-wonder-blocks'),
				},
				{
					value: 'nfd-wb-fade-in-left-short',
					label: __('Fade In Left Short', 'nfd-wonder-blocks'),
				},
				{
					value: 'nfd-wb-twist-in',
					label: __('Twist In', 'nfd-wonder-blocks'),
				},
				{
					value: 'nfd-wb-zoom-in',
					label: __('Zoom In', 'nfd-wonder-blocks'),
				},
				{
					value: 'nfd-wb-zoom-in-short',
					label: __('Zoom In Short', 'nfd-wonder-blocks'),
				},
				{
					value: 'nfd-wb-reveal-right',
					label: __('Reveal Right', 'nfd-wonder-blocks'),
				},
			],
			[]
		);

		const customAnimationDelay = useMemo(
			() => [
				{
					value: '',
					label: __('None', 'nfd-wonder-blocks'),
				},
				{
					value: 'nfd-delay-50',
					label: __('50ms', 'nfd-wonder-blocks'),
				},
				{
					value: 'nfd-delay-150',
					label: __('150ms', 'nfd-wonder-blocks'),
				},
				{
					value: 'nfd-delay-300',
					label: __('300ms', 'nfd-wonder-blocks'),
				},
				{
					value: 'nfd-delay-450',
					label: __('450ms', 'nfd-wonder-blocks'),
				},
				{
					value: 'nfd-delay-600',
					label: __('600ms', 'nfd-wonder-blocks'),
				},
				{
					value: 'nfd-delay-750',
					label: __('750ms', 'nfd-wonder-blocks'),
				},
				{
					value: 'nfd-delay-900',
					label: __('900ms', 'nfd-wonder-blocks'),
				},
				{
					value: 'nfd-delay-1050',
					label: __('1050ms', 'nfd-wonder-blocks'),
				},
				{
					value: 'nfd-delay-1200',
					label: __('1200ms', 'nfd-wonder-blocks'),
				},
				{
					value: 'nfd-delay-1350',
					label: __('1350ms', 'nfd-wonder-blocks'),
				},
				{
					value: 'nfd-delay-1500',
					label: __('1500ms', 'nfd-wonder-blocks'),
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
							title={__('Section Divider', 'nfd-wonder-blocks')}
							initialOpen={false}
						>
							<div className="block-editor-block-styles">
								<div className="block-editor-block-styles__variants">
									{customDividerStyles.map((style) => {
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

				{!skipBlockTypes.includes(name) && (
					<InspectorControls>
						<PanelBody
							title={__(
								'Entrance Animations',
								'nfd-wonder-blocks'
							)}
							initialOpen={false}
						>
							<SelectControl
								label={__('Animation', 'nfd-wonder-blocks')}
								options={customAnimationStyles}
								value={selectedAnimation}
								onChange={(selectedItem) => {
									props.setAttributes({
										nfdAnimation: selectedItem,
									});

									document.dispatchEvent(
										new CustomEvent(
											'wonder-blocks/animation-changed',
											{
												detail: {
													clientId: props?.clientId,
												},
											}
										)
									);
								}}
							/>

							<SelectControl
								label={__('Delay', 'nfd-wonder-blocks')}
								options={customAnimationDelay}
								value={selectedAnimationDelay}
								onChange={(selectedItem) => {
									props.setAttributes({
										nfdAnimationDelay: selectedItem,
									});
								}}
							/>
						</PanelBody>
					</InspectorControls>
				)}
			</>
		);
	};
}, 'withInspectorControl');

function addSaveProps(saveElementProps, blockType, attributes) {
	const generatedClasses = saveElementProps?.className ?? [];
	const classes = [
		...(attributes?.nfdGroupDivider ? [attributes.nfdGroupDivider] : []),
		...(attributes?.nfdAnimation
			? ['nfd-wb-animate', attributes.nfdAnimation]
			: []),
		...(attributes?.nfdAnimationDelay && attributes?.nfdAnimation
			? [attributes.nfdAnimationDelay]
			: []),
	];

	const additionalClasses = attributes?.className ?? [];

	if (!classes) {
		return saveElementProps;
	}

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
	'nfd-wonder-blocks/utilities/extraProps',
	addSaveProps
);
