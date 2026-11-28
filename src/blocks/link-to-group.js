import {
	BlockControls,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { ToolbarButton, ToolbarGroup, Popover } from "@wordpress/components";
import classnames from "classnames";
import { Fragment, useEffect, useRef, useState } from "@wordpress/element";
import { addFilter } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";
import { link as linkIcon } from "@wordpress/icons";

const TARGET_BLOCKS = ["core/group", "core/cover"];

function addLinkAttributes(settings, name) {
	if (!TARGET_BLOCKS.includes(name)) {
		return settings;
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			linkUrl: {
				type: "string",
				default: "",
			},
			linkOpensInNewTab: {
				type: "boolean",
				default: false,
			},
		},
	};
}

const withLinkToolbar = (BlockEdit) => (props) => {
	if (!TARGET_BLOCKS.includes(props.name)) {
		return <BlockEdit {...props} />;
	}

	const { attributes, setAttributes, isSelected } = props;
	const { linkUrl, linkOpensInNewTab } = attributes;

	const [open, setOpen] = useState(false);
	const anchorRef = useRef(null);
	const linkWrapRef = useRef(null);

	const value = { url: linkUrl || "", opensInNewTab: !!linkOpensInNewTab };

	useEffect(() => {
		if (!open || !linkWrapRef.current) {
			return undefined;
		}

		const id = window.setTimeout(() => {
			const input = linkWrapRef.current.querySelector('input[type="text"], input[type="search"]');
			input?.focus();
		}, 0);

		return () => window.clearTimeout(id);
	}, [open]);

	return (
		<Fragment>
			<BlockEdit {...props} />
			{isSelected && (
				<BlockControls>
					<ToolbarGroup>
						<div ref={anchorRef}>
							<ToolbarButton
								icon={linkIcon}
								label={__("Link", "nfd-wonder-blocks")}
								onClick={() => setOpen((isOpen) => !isOpen)}
								isPressed={open}
							/>
						</div>
					</ToolbarGroup>
				</BlockControls>
			)}

			{open && isSelected && (
				<Popover
					anchor={anchorRef.current}
					placement="bottom-start"
					onClose={() => setOpen(false)}
					focusOnMount={false}
					offset={8}
				>
					<div ref={linkWrapRef} style={{ width: 360 }}>
						<LinkControl
							key={open ? "lc-open" : "lc-closed"}
							value={value}
							onChange={(next) =>
								setAttributes({
									linkUrl: next?.url || "",
									linkOpensInNewTab: !!next?.opensInNewTab,
								})
							}
							settings={[
								{
									id: "opensInNewTab",
									title: __("Open in new tab", "nfd-wonder-blocks"),
								},
							]}
							onRemove={() => {
								setAttributes({
									linkUrl: "",
									linkOpensInNewTab: false,
								});
								setOpen(false);
							}}
							suggestionsQuery={{
								type: "post",
								subtype: "page",
								perPage: 20,
							}}
							initialSuggestionsSearchOptions={{
								type: "post",
								subtype: "page",
								perPage: 20,
							}}
						/>
					</div>
				</Popover>
			)}
		</Fragment>
	);
};

function addLinkSaveProps(extraProps, blockType, attributes) {
	if (!TARGET_BLOCKS.includes(blockType.name) || !attributes?.linkUrl) {
		return extraProps;
	}

	return {
		...extraProps,
		className: classnames(extraProps.className, "nfd-is-linked-group"),
	};
}

const withLinkEditorClass = (BlockListBlock) => (props) => {
	if (!TARGET_BLOCKS.includes(props.name) || !props.attributes?.linkUrl) {
		return <BlockListBlock {...props} />;
	}

	return (
		<BlockListBlock {...props} className={classnames(props.className, "nfd-is-linked-group")} />
	);
};

addFilter("blocks.registerBlockType", "nfd-wonder-blocks/group-link/attributes", addLinkAttributes);
addFilter("editor.BlockEdit", "nfd-wonder-blocks/group-link/toolbar", withLinkToolbar);
addFilter(
	"editor.BlockListBlock",
	"nfd-wonder-blocks/group-link/editor-class",
	withLinkEditorClass
);
addFilter(
	"blocks.getSaveContent.extraProps",
	"nfd-wonder-blocks/group-link/save-props",
	addLinkSaveProps
);
