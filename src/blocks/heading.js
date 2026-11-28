import { InspectorControls } from "@wordpress/block-editor";
import { createHigherOrderComponent } from "@wordpress/compose";
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanel as ToolsPanel,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalToolsPanelItem as ToolsPanelItem,
	BorderControl,
	PanelBody,
} from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { useEffect } from "@wordpress/element";
import { addFilter } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import {
	applyFormat,
	create as createRT,
	registerFormatType,
	toHTMLString,
} from "@wordpress/rich-text";

import TitleWithLogo from "../components/TitleWithLogo";

const STYLE_CLASS = "is-style-nfd-heading-highlight";
const FORMAT_TYPE = "nfd/heading-highlight";
const FORMAT_CLASS = "nfd-heading-highlight__text";

const resolveColor = (value) => {
	if (typeof value !== "string" || !value) {
		return undefined;
	}
	const isLiteral = value.startsWith("#") || value.startsWith("rgb") || value.startsWith("hsl");
	return isLiteral ? value : `var(--wp--preset--color--${value})`;
};

const resolveWidth = (value) => {
	if (typeof value !== "string" || !value) {
		return undefined;
	}
	const trimmed = value.trim();
	if (/(px|em|rem|vh|vw|%)$/i.test(trimmed)) {
		return trimmed;
	}
	if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
		return `${trimmed}px`;
	}
	return undefined;
};

const resolveBorderStyle = (value) => {
	const allowed = new Set([
		"solid",
		"dashed",
		"dotted",
		"double",
		"groove",
		"ridge",
		"inset",
		"outset",
		"none",
		"hidden",
	]);
	if (typeof value !== "string" || !value) {
		return undefined;
	}
	const v = value.trim().toLowerCase();
	return allowed.has(v) ? v : undefined;
};

/**
 * CSS custom properties for heading border controls (editor + save).
 *
 * @param {Object} atts Heading block attributes.
 * @return {Object|null} CSS custom properties for heading borders, if any are set.
 */
export const getHeadingStyleObject = (atts) => {
	const borderColor = resolveColor(atts?.nfdHeadingBorderColor || "");
	const borderWidth = resolveWidth(atts?.nfdHeadingBorderWidth || "");
	const borderStyle = resolveBorderStyle(atts?.nfdHeadingBorderStyle || "") || "solid";

	const nextStyle = {};

	if (borderColor) {
		nextStyle["--nfd-heading-border"] = borderColor;
	}
	if (borderWidth) {
		nextStyle["--nfd-heading-border-size"] = borderWidth;
	}
	if (borderStyle && (atts?.nfdHeadingBorderStyle || borderWidth || borderColor)) {
		nextStyle["--nfd-heading-border-style"] = borderStyle;
	}

	if (Object.keys(nextStyle).length === 0) {
		return null;
	}

	return nextStyle;
};

export const applyHeadingStylesInPlace = (props, blockType, atts) => {
	if (!blockType || blockType.name !== "core/heading") {
		return;
	}

	const styleObj = getHeadingStyleObject(atts);
	if (!styleObj) {
		return;
	}

	props.style = { ...(props.style || {}), ...styleObj };
};

const withHeadingHighlightSync = (BlockEdit) => (props) => {
	if (props.name !== "core/heading") {
		return <BlockEdit {...props} />;
	}

	const { updateBlockAttributes } = useDispatch("core/block-editor");

	const { className, content } = useSelect(
		(select) => {
			const attrs = select("core/block-editor").getBlockAttributes(props.clientId) || {};
			return { className: attrs.className || "", content: attrs.content || "" };
		},
		[props.clientId]
	);

	useEffect(() => {
		const html = content || "";
		// DOMParser is provided by the block editor browser environment.
		const parser = new DOMParser(); // eslint-disable-line no-undef
		const doc = parser.parseFromString(html, "text/html");

		doc.querySelectorAll("span.nfd-heading-highlight__text").forEach((node) => {
			const parent = node.parentNode;
			while (node.firstChild) {
				parent.insertBefore(node.firstChild, node);
			}
			parent.removeChild(node);
		});

		const normalizedHTML = doc.body.innerHTML || "";
		let value = createRT({ html: normalizedHTML });

		if ((className || "").includes(STYLE_CLASS) && value.text.length > 0) {
			value = applyFormat(
				value,
				{ type: FORMAT_TYPE, attributes: { class: FORMAT_CLASS } },
				0,
				value.text.length
			);
		}

		const nextHTML = toHTMLString({ value });

		if (nextHTML !== content) {
			updateBlockAttributes(props.clientId, { content: nextHTML });
		}
	}, [className, content, props.clientId, updateBlockAttributes]);

	return <BlockEdit {...props} />;
};

addFilter("editor.BlockEdit", "nfd/heading-highlight/sync", withHeadingHighlightSync);

registerFormatType(FORMAT_TYPE, {
	title: "Heading Highlight",
	tagName: "span",
	className: FORMAT_CLASS,
	edit: () => null,
});

const listHeadingBlock = createHigherOrderComponent((BlockListBlock) => {
	return (props) => {
		if (props.name !== "core/heading") {
			return <BlockListBlock {...props} />;
		}

		const styleVars = getHeadingStyleObject(props.attributes);
		if (!styleVars) {
			return <BlockListBlock {...props} />;
		}

		return (
			<BlockListBlock
				{...props}
				wrapperProps={{
					...(props.wrapperProps || {}),
					style: {
						...(props.wrapperProps?.style || {}),
						...styleVars,
					},
				}}
			/>
		);
	};
}, "nfd-list-block");

addFilter("editor.BlockListBlock", "nfd-wonder-blocks/utilities/listBlock", listHeadingBlock);

const HeadingExtras = (props) => {
	const { attributes, setAttributes, clientId } = props;
	const { nfdHeadingBorderWidth, nfdHeadingBorderColor, nfdHeadingBorderStyle } = attributes;

	const borderValue = {
		width: nfdHeadingBorderWidth || "1px",
		color: nfdHeadingBorderColor || undefined,
		style: nfdHeadingBorderStyle || "solid",
	};

	const hasBorderValue = Boolean(
		nfdHeadingBorderWidth || nfdHeadingBorderColor || nfdHeadingBorderStyle
	);

	const onBorderChange = (border) => {
		setAttributes({
			nfdHeadingBorderWidth: border?.width || "1px",
			nfdHeadingBorderColor: border?.color || "",
			nfdHeadingBorderStyle: border?.style || "solid",
		});
	};

	const resetBorder = () => {
		setAttributes({
			nfdHeadingBorderWidth: undefined,
			nfdHeadingBorderColor: undefined,
			nfdHeadingBorderStyle: undefined,
		});
	};

	return (
		<InspectorControls group="styles">
			<PanelBody
				title={<TitleWithLogo title={__("Heading styles", "nfd-wonder-blocks")} />}
				initialOpen={true}
			>
				<ToolsPanel panelId={String(clientId)} className="nfd-heading-styles-panel">
					<ToolsPanelItem
						label={__("Border", "nfd-wonder-blocks")}
						hasValue={() => hasBorderValue}
						onDeselect={resetBorder}
						resetAllFilter={() => ({
							nfdHeadingBorderWidth: undefined,
							nfdHeadingBorderColor: undefined,
							nfdHeadingBorderStyle: undefined,
						})}
						isShownByDefault
					>
						<BorderControl
							label={__("Border", "nfd-wonder-blocks")}
							className="nfd-heading-styles-control"
							value={borderValue}
							onChange={onBorderChange}
							enableStyle
							enableAlpha
							withSlider
							__next40pxDefaultSize
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</PanelBody>
		</InspectorControls>
	);
};

export default HeadingExtras;
