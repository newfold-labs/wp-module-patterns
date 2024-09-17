/**
 * External dependencies
 */
import classNames from "classnames";
import { HeartIcon, HeartOffIcon, PlusIcon } from "lucide-react";

/**
 * WordPress dependencies
 */
import apiFetch from "@wordpress/api-fetch";
import { BlockPreview } from "@wordpress/block-editor";
import { rawHandler } from "@wordpress/blocks";
import { Button } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { store as editorStore } from "@wordpress/editor";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import { store as noticesStore } from "@wordpress/notices";

/**
 * Internal dependencies
 */
import { NFD_REST_URL } from "../../../../constants";
import { blockInserter, optimizePreview, trackHiiveEvent } from "../../../../helpers";
import { replaceThemeClasses } from "../../../../helpers/utils";
import { usePatterns, useReplacePlaceholders } from "../../../../hooks";
import { store as nfdPatternsStore } from "../../../../store";
import RequiredPluginManager from "./RequiredPluginManager";

const DesignItem = ({ item }) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [insertingDesign, setInsertingDesign] = useState(false);
	const { data, mutate } = usePatterns({ onlyFavorites: true });
	const blockRef = useRef();
	const [loading, setLoading] = useState(false);

	const { adminEmail } = useSelect((select) => ({
		adminEmail: select("core").getEntityRecord("root", "site")?.email,
	}));

	const replace = useReplacePlaceholders();
	const replacePlaceholders = useMemo(() => {
		return {
			"email@example.com": adminEmail,
		};
	}, [adminEmail]);

	const { data: allFavs, mutate: mutateAllFavs } = usePatterns({
		onlyFavorites: true,
		perPage: -1,
	});

	const rawContent = item?.content ?? "";

	const content = useMemo(() => {
		const replacedContent = replace(rawContent, replacePlaceholders);
		return replaceThemeClasses(replacedContent);
	}, [replace, rawContent, replacePlaceholders, replaceThemeClasses]);

	const blocks = useMemo(() => rawHandler({ HTML: content }), [content]);

	const previewBlocks = useMemo(() => {
		const optimizedContent = optimizePreview(rawContent);
		return rawHandler({ HTML: replaceThemeClasses(optimizedContent) });
	}, [rawContent, replaceThemeClasses]);

	const { createErrorNotice, createSuccessNotice } = useDispatch(noticesStore);
	const { editPost } = useDispatch(editorStore);
	const { setIsModalOpen } = useDispatch(nfdPatternsStore);

	const {
		activeTab,
		activeTemplatesCategory,
		activePatternsCategory,
		selectedTemplateSlug,
		keywords,
		currentTheme,
	} = useSelect((select) => ({
		activeTab: select(nfdPatternsStore).getActiveTab(),
		activeTemplatesCategory: select(nfdPatternsStore).getActiveTemplatesCategory(),
		activePatternsCategory: select(nfdPatternsStore).getActivePatternsCategory(),
		selectedTemplateSlug: select(editorStore).getEditedPostAttribute("template"),
		keywords: select(nfdPatternsStore).getKeywordsFilter(),
		currentTheme: select("core").getCurrentTheme(),
	}));

	/**
	 * Check if the trash icon should be shown.
	 *
	 * @return {boolean}
	 */
	const shouldShowTrash = useCallback(() => {
		return (
			(activeTab === "patterns" &&
				activePatternsCategory === "favorites" &&
				isFavorite &&
				!keywords) ||
			(activeTab === "templates" &&
				activeTemplatesCategory === "favorites" &&
				isFavorite &&
				!keywords)
		);
	}, [activePatternsCategory, activeTab, activeTemplatesCategory, isFavorite, keywords]);

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

	useEffect(() => {
		let isFav = false;

		if (!Array.isArray(allFavs)) {
			return;
		}

		isFav = allFavs.find((fav) => fav.id === item.id);

		setIsFavorite(!!isFav);
	}, [allFavs, item.id]);

	/**
	 * Insert the pattern or a collection of patterns (template) into the editor.
	 *
	 * @return {void}
	 * @throws {Error} If the pattern cannot be inserted.
	 */
	const insertDesignHandler = async () => {
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
	};

	/**
	 * Add or remove the pattern from the favorites list.
	 *
	 * @param {Object} toggleState The toggle state.
	 *
	 * @return {void}
	 * @throws {Error} If the pattern cannot be added or removed.
	 */
	const favoritesClickHandler = async (toggleState = true) => {
		// Do nothing if the pattern is already in the favorites list and toggleState is false.
		if (isFavorite && !toggleState) {
			return;
		}

		// Track favorite events.
		if (!isFavorite) {
			if (activeTab === "patterns") {
				trackHiiveEvent("pattern_favorited", {
					label_key: "pattern_slug",
					pattern_id: item.id,
					pattern_slug: item.slug,
				});
			} else if (activeTab === "templates") {
				trackHiiveEvent("template_favorited", {
					label_key: "template_slug",
					template_id: item.id,
					template_slug: item.slug,
				});
			}
		}

		setIsFavorite((prev) => !prev);
		const method = isFavorite ? "DELETE" : "POST";

		const updater = async () =>
			await apiFetch({
				url: `${NFD_REST_URL}/favorites`,
				method,
				data: {
					...item,
					type: activeTab,
				},
				headers: {
					"x-nfd-wonder-blocks": "nfd_wonder_blocks",
				},
			});

		const newData =
			method === "DELETE"
				? data.filter((fav) => fav.id !== item.id)
				: [...data, { ...item, type: activeTab }];

		const updatedFavs =
			method === "DELETE"
				? allFavs.filter((fav) => fav.id !== item.id)
				: [...allFavs, { ...item, type: activeTab }];

		mutate(updater, {
			optimisticData: [...newData],
			rollbackOnError: false,
			populateCache: true,
			revalidate: false,
		});

		mutateAllFavs(() => [...updatedFavs], {
			optimisticData: [...updatedFavs],
			rollbackOnError: false,
			populateCache: true,
			revalidate: false,
		});
	};

	useEffect(() => {
		setLoading(true);

		const timerId = setTimeout(() => {
			setLoading(false);
		}, 600);

		const timerId2 = setTimeout(() => {
			setLoading((prev) => !prev);
		}, 1000);

		return () => {
			clearTimeout(timerId);
			clearTimeout(timerId2);
		};
	}, [activeTab, activeTemplatesCategory, activePatternsCategory]);

	useEffect(() => {
		let timerId;

		const adjustIframeHeight = () => {
			const container = blockRef.current;
			const frame = container?.querySelector("iframe[title]");
			const contentDocument = frame?.contentDocument;

			if (contentDocument) {
				const rootContainer = contentDocument.querySelector(".is-root-container");

				const height = rootContainer?.scrollHeight || 0;

				let scale = container
					.querySelector('[style*="scale"]')
					?.style?.transform?.match(/scale\((.*?)\)/)?.[1];

				scale = scale ? parseFloat(scale) : 1;

				// Reset offset if height is less than 500px
				const scollerHeight = window.innerWidth * 0.3; // 30vw
				const scaledOffset = scollerHeight / scale;

				if (height < scaledOffset) {
					frame.style.setProperty("--offset", `100%`);
				} else {
					frame.style.setProperty("--offset", `${scaledOffset}px`);
				}

				frame.style.maxHeight = `${height}px`;
				frame.style.setProperty("--nfd-wba-design-item--scale", scale);

				// constant scroll speed
				const speedConstant = 200 / (scale * 2) + 300; // pixels per second

				frame?.style.setProperty(
					"--nfd-wba-design-item--scroll-duration",
					`${height / speedConstant}s`
				);
			} else {
				clearTimeout(timerId);
				timerId = setTimeout(adjustIframeHeight, 300); // Retry after 300ms
			}
		};

		// Set up the resize event listener
		const onResize = () => {
			clearTimeout(timerId); // Clear any existing timers
			timerId = setTimeout(adjustIframeHeight, 500); // Throttle resize calls
		};

		// Add resize listener
		window.addEventListener("resize", onResize);

		// Initial call
		adjustIframeHeight();
		timerId = setTimeout(adjustIframeHeight, 1000); // give browser time to render

		return () => {
			clearTimeout(timerId); // Clear the timer
			window.removeEventListener("resize", onResize); // Remove resize listener
		};
	}, [item?.type, loading]);

	return (
		<div className="nfd-wba-relative nfd-wba-mb-[var(--nfd-wba-masonry-gap)] nfd-wba-flex nfd-wba-flex-col nfd-wba-border-grey-b nfd-wba-transition-all nfd-wba-duration-75 hover:nfd-wba-border-gray-300 nfd-wba-border nfd-wba-overflow-clip nfd-wba-rounded nfd-wba-border-solid">
			{item?.plugin_requirements?.length > 0 && <RequiredPluginManager item={item} />}

			<div
				className={classNames(
					"nfd-wba-design-item nfd-wba-flex nfd-wba-min-h-[116px] nfd-wba-cursor-pointer nfd-wba-flex-col nfd-wba-justify-center nfd-wba-bg-white nfd-wba-transition-opacity focus-visible:nfd-wba-outline-2 focus-visible:nfd-wba-outline-brand nfd-wba-rounded",
					item?.type === "templates" && "nfd-wba-design-item--template",
					insertingDesign && "nfd-wba-inserting-design"
				)}
				ref={blockRef}
				role="button"
				tabIndex="0"
				onClick={() => insertDesignHandler()}
				onKeyUp={(e) => {
					if (e.key === "Enter") {
						insertDesignHandler();
					}
				}}
			>
				{previewBlocks && <BlockPreview blocks={previewBlocks} viewportWidth={1200} />}
			</div>

			<div className="nfd-wba-flex nfd-wba-py-2 nfd-wba-px-5 nfd-wba-items-center nfd-wba-justify-between nfd-wba-gap-3 nfd-wba-border-0 nfd-wba-border-grey-b nfd-wba-border-solid nfd-wba-border-t">
				{/* <div>{item.title}</div> */}
				<div></div>

				<div className="nfd-wba-flex nfd-wba-gap-0.5 nfd-wba-shrink-0 nfd-wba-items-center">
					{item?.isPremium && (
						<span className="nfd-wba-rounded nfd-wba-bg-dark nfd-wba-px-[10px] nfd-wba-py-[5px] nfd-wba-text-white">
							Premium
						</span>
					)}

					{!shouldShowTrash() && (
						<Button
							className={classNames(
								"nfd-wba-size-9 nfd-wba-text-gray-500 hover:nfd-wba-text-gray-900 hover:nfd-wba-bg-gray-100 !nfd-wba-min-w-0 nfd-wba-rounded-full nfd-wba-bg-white nfd-wba-transition-all nfd-wba-duration-75",
								isFavorite
									? "nfd-wba-cursor-default nfd-wba-bg-gray-100 !nfd-wba-text-red-600"
									: "nfd-wba-cursor-not-pointer hover:nfd-wba-text-red-600"
							)}
							showTooltip={true}
							label={
								isFavorite
									? __("Added to favorites", "nfd-wonder-blocks")
									: __("Add to favorites", "nfd-wonder-blocks")
							}
							onClick={() => favoritesClickHandler(false)}
							icon={
								<HeartIcon
									className={classNames(
										" nfd-wba-shrink-0 nfd-wba-size-5",
										!isFavorite && "!nfd-wba-fill-none"
									)}
								/>
							}
						/>
					)}

					{shouldShowTrash() && (
						<Button
							className={classNames(
								"nfd-wba-size-9 nfd-wba-text-gray-500 hover:nfd-wba-bg-gray-100 !nfd-wba-min-w-0 nfd-wba-rounded-full nfd-wba-bg-white nfd-wba-transition-all nfd-wba-duration-75 hover:nfd-wba-text-red-600"
							)}
							showTooltip={true}
							label={__("Remove from Favorites", "nfd-wonder-blocks")}
							onClick={() => favoritesClickHandler()}
							icon={<HeartOffIcon className="nfd-wba-shrink-0 nfd-wba-size-5 !nfd-wba-fill-none" />}
						/>
					)}
					<Button
						className="nfd-wba-size-9 nfd-wba-text-gray-500 hover:nfd-wba-text-gray-900 hover:nfd-wba-bg-gray-100 !nfd-wba-min-w-0 nfd-wba-rounded-full nfd-wba-bg-white nfd-wba-transition-all nfd-wba-duration-75"
						isBusy={insertingDesign}
						isPressed={insertingDesign}
						label={__("Add pattern to page", "nfd-wonder-blocks")}
						showTooltip={true}
						onClick={() => insertDesignHandler()}
						icon={<PlusIcon className="nfd-wba-shrink-0 !nfd-wba-fill-none nfd-wba-size-5" />}
					/>
				</div>
			</div>
		</div>
	);
};
export default memo(DesignItem);
