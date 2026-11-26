import {
	InspectorControls,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from "@wordpress/block-editor";
import { createHigherOrderComponent } from "@wordpress/compose";
import { Fragment } from "@wordpress/element";
import { addFilter } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";

const SUPPORTED_BLOCKS = new Set(["core/paragraph", "core/heading", "core/group"]);

function addHoverAttributes(settings, name) {
	if (!SUPPORTED_BLOCKS.has(name)) {
		return settings;
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			nfdHoverColor: {
				type: "string",
				default: "",
			},
			nfdBackgroundHover: {
				type: "string",
				default: "",
			},
		},
	};
}

function mergeHoverSaveProps(props, blockType, attributes) {
	if (!SUPPORTED_BLOCKS.has(blockType.name)) {
		return props;
	}

	const { nfdBackgroundHover, nfdHoverColor } = attributes;
	const classes = props.className ? props.className.split(/\s+/).filter(Boolean) : [];
	const style = { ...(props.style || {}) };
	let hasHover = false;

	if (nfdHoverColor) {
		hasHover = true;
		classes.push("nfd-hover-text");
		style["--nfd-hover-text"] = nfdHoverColor;
	}

	if (nfdBackgroundHover) {
		hasHover = true;
		classes.push("nfd-hover-bg");
		style["--nfd-hover-bg"] = nfdBackgroundHover;
	}

	if (hasHover) {
		classes.push("nfd-hoverable");
	}

	if (!hasHover) {
		return props;
	}

	return {
		...props,
		className: [...new Set(classes)].join(" "),
		style,
	};
}

const withHoverInspectorControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (!SUPPORTED_BLOCKS.has(props.name)) {
			return <BlockEdit {...props} />;
		}

		const { attributes, setAttributes, isSelected, clientId } = props;
		const { nfdHoverColor, nfdBackgroundHover } = attributes;
		const colorGradientSettings = useMultipleOriginColorsAndGradients();

		return (
			<>
				<BlockEdit {...props} />
				{isSelected && (
					<InspectorControls group="color">
						<ColorGradientSettingsDropdown
							panelId={clientId}
							__experimentalIsRenderedInSidebar
							heading={__("Hover color", "nfd-wonder-blocks")}
							settings={[
								{
									label: __("Hover text", "nfd-wonder-blocks"),
									colorValue: nfdHoverColor || undefined,
									onColorChange: (color) => setAttributes({ nfdHoverColor: color || "" }),
									gradientValue: undefined,
									onGradientChange: undefined,
								},
								{
									label: __("Hover background", "nfd-wonder-blocks"),
									colorValue: nfdBackgroundHover || undefined,
									onColorChange: (color) => setAttributes({ nfdBackgroundHover: color || "" }),
									gradientValue: undefined,
									onGradientChange: undefined,
								},
							]}
							{...colorGradientSettings}
						/>
					</InspectorControls>
				)}
			</>
		);
	};
}, "nfdWonderBlocksWithHoverInspectorControls");

const withHoverEditorPreview = createHigherOrderComponent((BlockListBlock) => {
	return (props) => {
		if (!SUPPORTED_BLOCKS.has(props.name)) {
			return <BlockListBlock {...props} />;
		}

		const { nfdHoverColor, nfdBackgroundHover } = props.attributes;
		const classes = new Set((props.className || "").split(/\s+/).filter(Boolean));
		const style = { ...(props?.wrapperProps?.style || {}) };
		let hasHover = false;

		if (nfdHoverColor) {
			hasHover = true;
			classes.add("nfd-hover-text");
			style["--nfd-hover-text"] = nfdHoverColor;
		}

		if (nfdBackgroundHover) {
			hasHover = true;
			classes.add("nfd-hover-bg");
			style["--nfd-hover-bg"] = nfdBackgroundHover;
		}

		if (!hasHover) {
			return <BlockListBlock {...props} />;
		}

		classes.add("nfd-hoverable");

		return (
			<BlockListBlock
				{...props}
				wrapperProps={{
					...(props.wrapperProps || {}),
					className: [...classes].join(" "),
					style,
				}}
			/>
		);
	};
}, "nfdWonderBlocksWithHoverEditorPreview");

addFilter(
	"blocks.registerBlockType",
	"nfd-wonder-blocks/hover-states/attributes",
	addHoverAttributes
);
addFilter(
	"blocks.getSaveContent.extraProps",
	"nfd-wonder-blocks/hover-states/save-props",
	mergeHoverSaveProps
);
addFilter(
	"editor.BlockEdit",
	"nfd-wonder-blocks/hover-states/inspector",
	withHoverInspectorControls
);
addFilter(
	"editor.BlockListBlock",
	"nfd-wonder-blocks/hover-states/editor-preview",
	withHoverEditorPreview
);
