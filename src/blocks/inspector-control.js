import { InspectorControls } from "@wordpress/block-editor";
import {
	Button,
	Notice,
	PanelBody,
	SelectControl,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalTruncate as Truncate,
} from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";
import { useSelect } from "@wordpress/data";
import { useMemo } from "@wordpress/element";
import { addFilter } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";

import classnames from "classnames";

import TitleWithLogo from "../components/TitleWithLogo";

// These block types do not support custom attributes.
const skipBlockTypes = [
	"core/archives",
	"core/calendar",
	"core/latest-comments",
	"core/rss",
	"core/tag-cloud",
];

function addAttributes(settings, name) {
	if (skipBlockTypes.includes(name)) {
		return settings;
	}

	if (name === "core/group") {
		settings.attributes = {
			...settings.attributes,
			nfdGroupDivider: {
				type: "string",
			},
			nfdGroupTheme: {
				type: "string",
			},
			nfdGroupEffect: {
				type: "string",
			},
		};
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			nfdAnimation: {
				type: "string",
			},
			nfdAnimationDelay: {
				type: "string",
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

		const openStylesTab = () => {
			const stylesTabButton = document.querySelector(
				".block-editor-block-inspector__tab-item[aria-label='Styles']"
			);

			if (stylesTabButton) {
				stylesTabButton.click();
			}
		};

		const selectedGroupDivider = props?.attributes?.nfdGroupDivider ?? "default";
		const selectedGroupTheme = props?.attributes?.nfdGroupTheme ?? "";
		const selectedGroupEffect = props?.attributes?.nfdGroupEffect ?? "";
		const selectedAnimation = props?.attributes?.nfdAnimation ?? "";
		const selectedAnimationDelay = props?.attributes?.nfdAnimationDelay ?? "";

		const isTopLevel = useSelect(
			(select) => {
				const { getBlockRootClientId } = select("core/block-editor");
				return !getBlockRootClientId(clientId);
			},
			[clientId]
		);

		const customDividerStyles = useMemo(
			() => [
				{
					name: "",
					label: __("Default", "nfd-wonder-blocks"),
					isDefault: true,
				},
				{
					name: "nfd-divider-arrow",
					label: __("Arrow", "nfd-wonder-blocks"),
				},
				{
					name: "nfd-divider-ellipse",
					label: __("Ellipse", "nfd-wonder-blocks"),
				},
				{
					name: "nfd-divider-rounded",
					label: __("Rounded", "nfd-wonder-blocks"),
				},
				{
					name: "nfd-divider-slant",
					label: __("Slant", "nfd-wonder-blocks"),
				},
				{
					name: "nfd-divider-slant-invert",
					label: __("Slant Invert", "nfd-wonder-blocks"),
				},
				{
					name: "nfd-divider-triangle",
					label: __("Triangle", "nfd-wonder-blocks"),
				},
				{
					name: "nfd-divider-zigzag",
					label: __("Zigzag", "nfd-wonder-blocks"),
				},
			],
			[]
		);

		const customAnimationStyles = useMemo(
			() => [
				{
					value: "",
					label: __("None", "nfd-wonder-blocks"),
				},
				{
					value: "nfd-wb-fade-in-bottom",
					label: __("Fade In Bottom", "nfd-wonder-blocks"),
				},
				{
					value: "nfd-wb-fade-in-top-short",
					label: __("Fade In Top Short", "nfd-wonder-blocks"),
				},
				{
					value: "nfd-wb-fade-in-right-short",
					label: __("Fade In Right Short", "nfd-wonder-blocks"),
				},
				{
					value: "nfd-wb-fade-in-bottom-short",
					label: __("Fade In Bottom Short", "nfd-wonder-blocks"),
				},
				{
					value: "nfd-wb-fade-in-left-short",
					label: __("Fade In Left Short", "nfd-wonder-blocks"),
				},
				{
					value: "nfd-wb-twist-in",
					label: __("Twist In", "nfd-wonder-blocks"),
				},
				{
					value: "nfd-wb-zoom-in",
					label: __("Zoom In", "nfd-wonder-blocks"),
				},
				{
					value: "nfd-wb-zoom-in-short",
					label: __("Zoom In Short", "nfd-wonder-blocks"),
				},
				{
					value: "nfd-wb-reveal-right",
					label: __("Reveal Right", "nfd-wonder-blocks"),
				},
			],
			[]
		);

		const customAnimationDelay = useMemo(
			() => [
				{
					value: "",
					label: __("None", "nfd-wonder-blocks"),
				},
				{
					value: "nfd-delay-50",
					label: __("50ms", "nfd-wonder-blocks"),
				},
				{
					value: "nfd-delay-150",
					label: __("150ms", "nfd-wonder-blocks"),
				},
				{
					value: "nfd-delay-300",
					label: __("300ms", "nfd-wonder-blocks"),
				},
				{
					value: "nfd-delay-450",
					label: __("450ms", "nfd-wonder-blocks"),
				},
				{
					value: "nfd-delay-600",
					label: __("600ms", "nfd-wonder-blocks"),
				},
				{
					value: "nfd-delay-750",
					label: __("750ms", "nfd-wonder-blocks"),
				},
				{
					value: "nfd-delay-900",
					label: __("900ms", "nfd-wonder-blocks"),
				},
				{
					value: "nfd-delay-1050",
					label: __("1050ms", "nfd-wonder-blocks"),
				},
				{
					value: "nfd-delay-1200",
					label: __("1200ms", "nfd-wonder-blocks"),
				},
				{
					value: "nfd-delay-1350",
					label: __("1350ms", "nfd-wonder-blocks"),
				},
				{
					value: "nfd-delay-1500",
					label: __("1500ms", "nfd-wonder-blocks"),
				},
			],
			[]
		);

		const customThemeStyles = useMemo(
			() => [
				{
					name: "",
					label: __("Default", "nfd-wonder-blocks"),
					isDefault: true,
				},
				{
					name: "white",
					label: __("White", "nfd-wonder-blocks"),
				},
				{
					name: "light",
					label: __("Light", "nfd-wonder-blocks"),
				},
				{
					name: "dark",
					label: __("Dark", "nfd-wonder-blocks"),
				},
				{
					name: "darker",
					label: __("Darker", "nfd-wonder-blocks"),
				},
				{
					name: "primary",
					label: __("Primary", "nfd-wonder-blocks"),
				},
			],
			[]
		);

		const groupEffectStyles = useMemo(
			() => [
				{
					name: "",
					label: __("None", "nfd-wonder-blocks"),
					isDefault: true,
				},
				{
					name: "dots",
					label: __("Dots", "nfd-wonder-blocks"),
				},
				{
					name: "grid",
					label: __("Grid", "nfd-wonder-blocks"),
				},
				{
					name: "grid-2",
					label: __("Grid 2", "nfd-wonder-blocks"),
				},
				{
					name: "grid-3",
					label: __("Grid 3", "nfd-wonder-blocks"),
				},
				{
					name: "grid-perspective",
					label: __("Grid Perspective", "nfd-wonder-blocks"),
				},
				{
					name: "lines",
					label: __("Lines", "nfd-wonder-blocks"),
				},
				{
					name: "lines-2",
					label: __("Lines 2", "nfd-wonder-blocks"),
				},
			],
			[]
		);

		return (
			<>
				<BlockEdit {...props} />
				{name === "core/group" && isTopLevel && (
					<InspectorControls>
						<PanelBody
							title={<TitleWithLogo title={__("Section Divider", "nfd-wonder-blocks")} />}
							initialOpen={false}
							className="nfd-wb-panel__body"
						>
							<div className="block-editor-block-styles">
								<div className="block-editor-block-styles__variants">
									{customDividerStyles.map((style) => {
										const buttonText = style.isDefault
											? __("Default", "nfd-wonder-blocks")
											: style.label || style.name;

										return (
											<Button
												className={classnames("block-editor-block-styles__item", {
													"is-active": selectedGroupDivider === style.name,
												})}
												key={style.name}
												variant="secondary"
												label={buttonText}
												onClick={() =>
													props.setAttributes({
														nfdGroupDivider: style.name,
													})
												}
												aria-current={selectedGroupDivider === style.name}
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

				{name === "core/group" && (
					<InspectorControls>
						<PanelBody
							title={<TitleWithLogo title={__("Section Theme Color", "nfd-wonder-blocks")} />}
							initialOpen={false}
						>
							<div className="block-editor-block-styles">
								<div className="block-editor-block-styles__variants">
									<Notice
										className="nfd-wba-mt-2 nfd-wba-mb-1"
										status="warning"
										isDismissible={false}
									>
										{__("This feature is now located in the", "nfd-wonder-blocks")}{" "}
										<Button onClick={openStylesTab} variant="link">
											{__("Block Styles", "nfd-wonder-blocks")}
										</Button>
										{" " + __("section.", "nfd-wonder-blocks")}
									</Notice>
									{customThemeStyles.map((style) => {
										const buttonText = style.isDefault
											? __("Default", "nfd-wonder-blocks")
											: style.label || style.name;

										return (
											<Button
												className={classnames("nfd-wba-w-[calc(50%-4px)] nfd-wba-inline-block")}
												key={style.name}
												variant="secondary"
												label={buttonText}
												onClick={() => {
													props.setAttributes({
														nfdGroupTheme: style.name,
													});
												}}
												disabled
												aria-current={selectedGroupTheme === style.name}
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

				{name === "core/group" && (
					<InspectorControls>
						<PanelBody
							title={<TitleWithLogo title={__("Section Background Effect", "nfd-wonder-blocks")} />}
							initialOpen={false}
						>
							<div className="block-editor-block-styles">
								<div className="block-editor-block-styles__variants">
									{groupEffectStyles.map((style) => {
										const buttonText = style.label || style.name;

										return (
											<Button
												className={classnames("block-editor-block-styles__item", {
													"is-active": selectedGroupEffect === style.name,
												})}
												key={style.name}
												variant="secondary"
												label={buttonText}
												onClick={() => {
													props.setAttributes({
														nfdGroupEffect: style.name,
													});
												}}
												aria-current={selectedGroupEffect === style.name}
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
							title={<TitleWithLogo title={__("Entrance Animations", "nfd-wonder-blocks")} />}
							initialOpen={false}
						>
							<SelectControl
								label={__("Animation", "nfd-wonder-blocks")}
								options={customAnimationStyles}
								value={selectedAnimation}
								onChange={(selectedItem) => {
									props.setAttributes({
										nfdAnimation: selectedItem,
									});

									document.dispatchEvent(
										new CustomEvent("wonder-blocks/animation-changed", {
											detail: {
												clientId: props?.clientId,
											},
										})
									);
								}}
							/>

							<SelectControl
								label={__("Delay", "nfd-wonder-blocks")}
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
}, "withInspectorControl");

function addSaveProps(saveElementProps, blockType, attributes) {
	const generatedClasses = saveElementProps?.className ?? [];
	const classes = [
		...(attributes?.nfdGroupDivider ? [attributes.nfdGroupDivider] : []),
		...(attributes?.nfdAnimation ? ["nfd-wb-animate", attributes.nfdAnimation] : []),
		...(attributes?.nfdAnimationDelay && attributes?.nfdAnimation
			? [attributes.nfdAnimationDelay]
			: []),
		...(attributes?.nfdGroupEffect ? [`nfd-bg-effect-${attributes.nfdGroupEffect}`] : []),
	];

	const additionalClasses = attributes?.className ?? [];

	if (!classes) {
		return saveElementProps;
	}

	const normalizeAsArray = (item) => {
		switch (Object.prototype.toString.call(item)) {
			case "[object String]":
				return item.split(" ");
			case "[object Array]":
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
		className: [...classesCombined].join(" "),
	});
}

addFilter("blocks.registerBlockType", "nfd-wonder-blocks/utilities/attributes", addAttributes);

addFilter("blocks.registerBlockType", "nfd-wonder-blocks/utilities/addEditProps", addEditProps);

addFilter(
	"editor.BlockEdit",
	"nfd-wonder-blocks/utilities/inspectorControl",
	withInspectorControls
);

addFilter(
	"blocks.getSaveContent.extraProps",
	"nfd-wonder-blocks/utilities/extraProps",
	addSaveProps
);
