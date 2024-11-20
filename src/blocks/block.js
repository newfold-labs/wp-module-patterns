/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";
import { useDispatch } from "@wordpress/data";
import { useEffect } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { DEFAULT_PATTERNS_CATEGORY } from "../constants";
import { rectangleGroup } from "../components/Icons";
import { store as nfdPatternsStore } from "../store";
import { trackHiiveEvent } from "../helpers/analytics";
import { variations } from "./variations";
import metadata from "./block.json";
import { Icon } from "@wordpress/icons";

registerBlockType(metadata, {
	icon: <Icon icon={rectangleGroup} className="!nfd-wba-fill-none !nfd-wba-stroke-brand" />,
	category: "nfd-wonder-blocks",
	example: {
		attributes: {
			preview: "https://hiive.cloud/workers/wonderblocks-assets/previews/default.webp",
		},
	},
	variations: [...variations],
	edit: function Edit({ clientId, attributes }) {
		const { removeBlock } = useDispatch("core/block-editor");
		const { setIsModalOpen, setActivePatternsCategory, setActiveTab, setSidebarDisplayMode } =
			useDispatch(nfdPatternsStore);

		useEffect(() => {
			if (attributes.preview) {
				return;
			}

			removeBlock(clientId);

			setActiveTab("patterns");
			setSidebarDisplayMode("categories");
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
