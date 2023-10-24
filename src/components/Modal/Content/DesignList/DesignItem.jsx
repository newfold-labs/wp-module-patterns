/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { BlockPreview } from '@wordpress/block-editor';
import { rawHandler } from '@wordpress/blocks';
import { Button } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import {
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { Icon } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import { NFD_REST_URL } from '../../../../constants';
import {
	blockInserter,
	optimizePreview,
	trackHiiveEvent,
} from '../../../../helpers';
import { usePatterns, useReplacePlaceholders } from '../../../../hooks';
import { store as nfdPatternsStore } from '../../../../store';
import { heart, heartEmpty, plus, trash } from '../../../Icons';
import { SkeletonItem } from '../Skeleton';

const DesignItem = ({ item }) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [insertingDesign, setInsertingDesign] = useState(false);
	const { data, mutate } = usePatterns({ onlyFavorites: true });
	const blockRef = useRef();
	const [loading, setLoading] = useState(false);

	const { adminEmail } = useSelect((select) => ({
		adminEmail: select('core').getEntityRecord('root', 'site')?.email,
	}));

	const replace = useReplacePlaceholders();
	const replacePlaceholders = useMemo(() => {
		return {
			'email@example.com': adminEmail,
		};
	}, [adminEmail]);

	const { data: allFavs, mutate: mutateAllFavs } = usePatterns({
		onlyFavorites: true,
		perPage: -1,
	});

	const rawContent = item?.content ?? '';

	const content = useMemo(() => {
		return replace(rawContent, replacePlaceholders);
	}, [replace, rawContent, replacePlaceholders]);

	const blocks = useMemo(() => rawHandler({ HTML: content }), [content]);

	const previewBlocks = useMemo(
		() => rawHandler({ HTML: optimizePreview(rawContent) }),
		[rawContent]
	);

	const { createErrorNotice, createSuccessNotice } =
		useDispatch(noticesStore);
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
		activeTemplatesCategory:
			select(nfdPatternsStore).getActiveTemplatesCategory(),
		activePatternsCategory:
			select(nfdPatternsStore).getActivePatternsCategory(),
		selectedTemplateSlug:
			select(editorStore).getEditedPostAttribute('template'),
		keywords: select(nfdPatternsStore).getKeywordsFilter(),
		currentTheme: select('core').getCurrentTheme(),
	}));

	/**
	 * Check if the trash icon should be shown.
	 *
	 * @return {boolean}
	 */
	const shouldShowTrash = useCallback(() => {
		return (
			(activeTab === 'patterns' &&
				activePatternsCategory === 'favorites' &&
				isFavorite &&
				!keywords) ||
			(activeTab === 'templates' &&
				activeTemplatesCategory === 'favorites' &&
				isFavorite &&
				!keywords)
		);
	}, [
		activePatternsCategory,
		activeTab,
		activeTemplatesCategory,
		isFavorite,
		keywords,
	]);

	/**
	 * Check if a template should be set
	 *
	 * @return {boolean}
	 */
	const resolveTemplateUpdate = useCallback(() => {
		if (
			item?.type === 'templates' &&
			currentTheme?.template === 'yith-wonder'
		) {
			if (
				item?.slug.includes('coming-soon') ||
				item?.slug.includes('link-in-bio')
			) {
				if (selectedTemplateSlug !== 'no-header-footer') {
					return 'no-header-footer';
				}
			} else if (selectedTemplateSlug !== 'no-title') {
				return 'no-title';
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
		if (activeTab === 'patterns') {
			trackHiiveEvent('pattern_inserted', {
				label_key: 'pattern_slug',
				pattern_id: item.id,
				pattern_slug: item.slug,
			});
		} else if (activeTab === 'templates') {
			trackHiiveEvent('template_inserted', {
				label_key: 'template_slug',
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
					__('Block pattern "%s" inserted.', 'nfd-wonder-blocks'),
					item.title
				),
				{
					type: 'snackbar',
				}
			);
		} catch (error) {
			createErrorNotice(
				__(
					'Failed to insert block pattern. Please try again.',
					'nfd-wonder-blocks'
				),
				{
					type: 'snackbar',
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
			if (activeTab === 'patterns') {
				trackHiiveEvent('pattern_favorited', {
					label_key: 'pattern_slug',
					pattern_id: item.id,
					pattern_slug: item.slug,
				});
			} else if (activeTab === 'templates') {
				trackHiiveEvent('template_favorited', {
					label_key: 'template_slug',
					template_id: item.id,
					template_slug: item.slug,
				});
			}
		}

		setIsFavorite((prev) => !prev);
		const method = isFavorite ? 'DELETE' : 'POST';

		const updater = async () =>
			await apiFetch({
				url: `${NFD_REST_URL}/favorites`,
				method,
				data: {
					...item,
					type: activeTab,
				},
				headers: {
					'x-nfd-wonder-blocks': 'nfd_wonder_blocks',
				},
			});

		const newData =
			method === 'DELETE'
				? data.filter((fav) => fav.id !== item.id)
				: [...data, { ...item, type: activeTab }];

		const updatedFavs =
			method === 'DELETE'
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
			const frame = container?.querySelector('iframe[title]');
			const contentDocument = frame?.contentDocument;

			const speedConstant = 600; // pixels per second

			if (contentDocument) {
				const rootContainer =
					contentDocument.querySelector('.is-root-container');

				const height = rootContainer?.scrollHeight || 0;

				let scale = container
					.querySelector('[style*="scale"]')
					?.style?.transform?.match(/scale\((.*?)\)/)?.[1];

				scale = scale ? parseFloat(scale) : null;

				const scaledOffset = 500 / scale;

				if (height <= scaledOffset) {
					frame.style.setProperty(
						'--nfd-wba-translate-offset',
						`0px`
					);
				}

				frame.style.maxHeight = `${height}px`;
				frame.style.setProperty('--nfd-wba-design-item--scale', scale);

				const duration = height / speedConstant;
				frame?.style.setProperty(
					'--nfd-wba-design-item--scroll-duration',
					`${duration}s`
				);
			} else {
				timerId = setTimeout(adjustIframeHeight, 300); // Retry after 300ms
			}
		};

		adjustIframeHeight(); // Initial call

		return () => {
			clearTimeout(timerId); // Clear the timer
		};
	}, [loading]);

	return (
		<>
			<div className="nfd-wba-relative nfd-wba-mb-[var(--nfd-wba-masonry-gap)] nfd-wba-flex nfd-wba-flex-col nfd-wba-gap-6 nfd-wba-overflow-hidden nfd-wba-rounded-2xl nfd-wba-bg-grey nfd-wba-p-6">
				<div className="nfd-wba-rounded-lg nfd-wba-border-2 nfd-wba-border-dashed nfd-wba-border-grey-darker nfd-wba-p-4">
					<div
						className={classNames(
							'nfd-wba-design-item nfd-wba-flex nfd-wba-min-h-[116px] nfd-wba-cursor-pointer nfd-wba-flex-col nfd-wba-justify-center nfd-wba-overflow-hidden nfd-wba-rounded-sm nfd-wba-border-[16px] nfd-wba-border-solid nfd-wba-border-white nfd-wba-bg-white nfd-wba-shadow-design-item nfd-wba-transition-opacity focus-visible:nfd-wba-outline-2 focus-visible:nfd-wba-outline-brand',
							item?.type === 'templates' &&
								'nfd-wba-design-item--template',
							insertingDesign && 'nfd-wba-inserting-design'
						)}
						ref={blockRef}
						role="button"
						tabIndex="0"
						onClick={() => insertDesignHandler()}
						onKeyUp={(e) => {
							if (e.key === 'Enter') {
								insertDesignHandler();
							}
						}}
					>
						{previewBlocks && (
							<BlockPreview
								blocks={previewBlocks}
								viewportWidth={1200}
								live={false}
							/>
						)}
					</div>
				</div>

				<div className="nfd-wba-flex nfd-wba-items-center nfd-wba-justify-between nfd-wba-gap-3 nfd-wba-bg-grey">
					{/* <div>{item.title}</div> */}
					<div></div>

					<div className="nfd-wba-flex nfd-wba-shrink-0 nfd-wba-items-center nfd-wba-gap-3">
						{item?.isPremium && (
							<span className="nfd-wba-rounded nfd-wba-bg-dark nfd-wba-px-[10px] nfd-wba-py-[5px] nfd-wba-text-white">
								Premium
							</span>
						)}

						{!shouldShowTrash() && (
							<Button
								className={classNames(
									'nfd-wba-h-12 nfd-wba-w-12 !nfd-wba-min-w-0 nfd-wba-rounded-lg nfd-wba-bg-white nfd-wba-transition-all nfd-wba-duration-100',
									isFavorite
										? 'nfd-wba-cursor-default !nfd-wba-text-red-600'
										: 'nfd-wba-cursor-not-pointer nfd-wba-text-zinc-500 hover:nfd-wba-bg-white/50 hover:nfd-wba-text-red-600'
								)}
								showTooltip={true}
								label={
									isFavorite
										? __(
												'In Favorites',
												'nfd-wonder-blocks'
										  )
										: __(
												'Add to Favorites',
												'nfd-wonder-blocks'
										  )
								}
								onClick={() => favoritesClickHandler(false)}
								icon={
									<Icon
										className="nfd-wba-shrink-0"
										fill="currentColor"
										size={24}
										icon={isFavorite ? heart : heartEmpty}
									/>
								}
							/>
						)}

						{shouldShowTrash() && (
							<Button
								className={classNames(
									'nfd-wba-h-12 nfd-wba-w-12 !nfd-wba-min-w-0 nfd-wba-rounded-lg nfd-wba-bg-white nfd-wba-text-zinc-500 nfd-wba-transition-all nfd-wba-duration-100 hover:nfd-wba-bg-white/50 hover:nfd-wba-text-red-600'
								)}
								showTooltip={true}
								label={__(
									'Remove from Favorites',
									'nfd-wonder-blocks'
								)}
								onClick={() => favoritesClickHandler()}
								icon={
									<Icon
										className="nfd-wba-shrink-0"
										fill="currentColor"
										width={32}
										height={32}
										icon={trash}
									/>
								}
							/>
						)}
						<Button
							className="nfd-wba-h-12 nfd-wba-w-12 !nfd-wba-min-w-0 nfd-wba-rounded-lg nfd-wba-bg-white nfd-wba-text-zinc-500 nfd-wba-transition-all nfd-wba-duration-100 hover:nfd-wba-bg-white/50"
							isBusy={insertingDesign}
							isPressed={insertingDesign}
							label={__(
								'Add pattern to page',
								'nfd-wonder-blocks'
							)}
							showTooltip={true}
							onClick={() => insertDesignHandler()}
							icon={
								<Icon
									fill="currentColor"
									className="nfd-wba-shrink-0"
									size={24}
									icon={plus}
								/>
							}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
export default memo(DesignItem);
