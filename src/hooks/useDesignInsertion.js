/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from "@wordpress/data";
import { store as editorStore } from "@wordpress/editor";
import { useCallback, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { store as nfdPatternsStore } from "../store";
import { blockInserter, trackHiiveEvent } from "../helpers";

/**
 * Custom hook to handle design insertion functionality
 *
 * @param {Array} blocks - The blocks to insert
 * @param {Object} item - The design item being inserted
 * @returns {Object} Design insertion functions and state
 */
export const useDesignInsertion = (blocks, item) => {
	const [insertingDesign, setInsertingDesign] = useState(false);

	// Get editor dispatch functions
	const { insertBlocks } = useDispatch("core/block-editor");
	const { createSuccessNotice, createErrorNotice } = useDispatch("core/notices");
	const { editPost } = useDispatch(editorStore);
	const { setIsModalOpen } = useDispatch(nfdPatternsStore);

	// Get selected block information
	const { activeTab, selectedBlockClientId, selectedTemplateSlug, currentTheme } = useSelect(
		(select) => ({
			selectedBlockClientId: select("core/block-editor").getSelectedBlockClientId(),
			activeTab: select(nfdPatternsStore).getActiveTab(),
			currentTheme: select("core").getCurrentTheme(),
			selectedTemplateSlug: select(editorStore).getEditedPostAttribute("template"),
		})
	);

	/**
	 * Insert the design blocks into the editor
	 */
	const insertDesignHandler = useCallback(async () => {
		setInsertingDesign(true);

		try {
			// Update the template if needed.
			updateTemplate();

			// Insert the pattern.
			await blockInserter(blocks);

			trackInsertEvents();

			// Show a success notice.
			createSuccessNotice(
				sprintf(
					// translators: %s is the pattern title
					__('Block pattern "%s" inserted.', "nfd-wonder-blocks"),
					item.title
				),
				{
					type: "snackbar",
				}
			);
		} catch (error) {
			createErrorNotice(
				__("Failed to insert block pattern. Please try again.", "nfd-wonder-blocks"),
				{
					type: "snackbar",
				}
			);

			// eslint-disable-next-line no-console
			console.warn(error);
		} finally {
			setInsertingDesign(false);
			setIsModalOpen(false);
		}
	}, [
		blocks,
		item,
		insertingDesign,
		insertBlocks,
		selectedBlockClientId,
		createSuccessNotice,
		createErrorNotice,
	]);

	/**
	 * Track insert events.
	 *
	 * @return {void}
	 */
	const trackInsertEvents = useCallback(() => {
		if (activeTab === "patterns") {
			trackHiiveEvent("pattern_inserted", {
				label_key: "pattern_slug",
				pattern_id: item.id,
				pattern_slug: item.slug,
			});
		} else if (activeTab === "templates") {
			trackHiiveEvent("template_inserted", {
				label_key: "template_slug",
				template_id: item.id,
				template_slug: item.slug,
			});
		}
	}, [activeTab, item.id, item.slug]);

	/**
	 * Check if a template should be set
	 *
	 * @return {boolean}
	 */
	const resolveTemplateUpdate = useCallback(() => {
		if (item?.type === "templates" && currentTheme?.template === "yith-wonder") {
			if (item?.slug.includes("coming-soon") || item?.slug.includes("link-in-bio")) {
				if (selectedTemplateSlug !== "no-header-footer") {
					return "no-header-footer";
				}
			} else if (selectedTemplateSlug !== "no-title") {
				return "no-title";
			}
		}

		return false;
	}, [item?.type, item?.slug, currentTheme?.template, selectedTemplateSlug]);

	/**
	 * Update the template if needed.
	 *
	 * @return {void}
	 */
	const updateTemplate = useCallback(() => {
		const template = resolveTemplateUpdate();
		if (template) {
			editPost({
				template,
			});
		}
	}, [resolveTemplateUpdate, editPost]);

	return {
		insertDesignHandler,
		insertingDesign,
	};
};

export default useDesignInsertion;
