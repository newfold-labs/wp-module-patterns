/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";
import { useDispatch } from "@wordpress/data";
import { useEffect } from "@wordpress/element";
import { buttons } from "@wordpress/icons";

/**
 * Internal dependencies
 */
import { DEFAULT_PATTERNS_CATEGORY } from "../constants";
import { trackHiiveEvent } from "../helpers/analytics";
import { store as nfdPatternsStore } from "../store";
import metadata from "./block.json";
import { variations } from "./variations";

registerBlockType(metadata, {
	icon: {
		foreground: "var(--nfd-wba-color-brand)",
		src: buttons,
	},
	category: "nfd-wonder-blocks",
	example: {
		attributes: {
			preview: "https://hiive.cloud/workers/wonderblocks-assets/previews/default.webp",
		},
	},
	variations: [...variations],
	edit: function Edit({ clientId, attributes }) {
		const { removeBlock } = useDispatch("core/block-editor");
		const { setIsModalOpen, setActivePatternsCategory, setActiveTab } =
			useDispatch(nfdPatternsStore);

		useEffect(() => {
			if (attributes.preview) {
				return;
			}

			removeBlock(clientId);

			setActiveTab("patterns");
			setActivePatternsCategory(
				attributes.category ? attributes.category : DEFAULT_PATTERNS_CATEGORY
			);

			trackHiiveEvent("modal_open", {
				label_key: "trigger",
				trigger: "block",
			});

			setIsModalOpen(true);
		}, [
			attributes.category,
			attributes.preview,
			clientId,
			removeBlock,
			setActivePatternsCategory,
			setActiveTab,
			setIsModalOpen,
		]);

		return (
			<img
				style={{ display: "block", maxWidth: "100%" }}
				src={attributes.preview}
				alt="WonderBlocks"
			/>
		);
	},
});
