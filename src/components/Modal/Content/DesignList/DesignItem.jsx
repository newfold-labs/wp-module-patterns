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
import { memo, useEffect, useMemo, useState } from '@wordpress/element';
import { sprintf, __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import { REST_URL } from '../../../../constants';
import { blockInserter } from '../../../../helpers/blockInserter';
import useFavorites from '../../../../hooks/useFavorites';
import { store as nfdPatternsStore } from '../../../../store';
import { heart, heartEmpty, plus } from '../../../Icons';

const DesignItem = ({ item }) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [insertingDesign, setInsertingDesign] = useState(false);
	const { data: favData, mutate } = useFavorites();

	const blocks = useMemo(
		() => rawHandler({ HTML: item.source }),
		[item.source]
	);

	const { createErrorNotice, createSuccessNotice } =
		useDispatch(noticesStore);
	const { setIsModalOpen } = useDispatch(nfdPatternsStore);

	const { activeTab } = useSelect((select) => ({
		activeTab: select(nfdPatternsStore).getActiveTab(),
	}));

	useEffect(() => {
		let isFav = false;

		if (!Array.isArray(favData)) {
			return;
		}

		isFav = favData.find((fav) => fav.title === item.title);

		setIsFavorite(!!isFav);
	}, [favData, item.title]);

	/**
	 * Insert the pattern or a collection of patterns (template) into the editor.
	 *
	 * @return {void}
	 * @throws {Error} If the pattern cannot be inserted.
	 */
	const insertDesignHandler = async () => {
		setInsertingDesign(true);

		setTimeout(async () => {
			try {
				await blockInserter(blocks);
				createSuccessNotice(
					sprintf(
						// translators: %s is the pattern title
						__(
							'"%s" pattern successfully added.',
							'nfd-wonder-blocks'
						),
						item.title
					),
					{
						type: 'snackbar',
					}
				);
			} catch (error) {
				createErrorNotice(
					__(
						'Failed to add pattern. Please try again.',
						'nfd-wonder-blocks'
					),
					{
						type: 'snackbar',
						explicitDismiss: true,
					}
				);
			} finally {
				setInsertingDesign(false);
				setIsModalOpen(false);
			}
		}, 30);
	};

	/**
	 * Add or remove the pattern from the favorites list.
	 *
	 * @return {void}
	 * @throws {Error} If the pattern cannot be added or removed.
	 */
	const addToFavoritesHandler = async () => {
		setIsFavorite((prev) => !prev);

		const method = isFavorite ? 'DELETE' : 'POST';

		const updater = async () =>
			await apiFetch({
				url: `${REST_URL}/favorites`,
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
				? favData.filter((fav) => fav.id !== item.id)
				: [...favData, { ...item, type: activeTab }];

		mutate(updater, {
			optimisticData: [...newData],
			rollbackOnError: false,
			populateCache: true,
			revalidate: false,
		});
	};

	return (
		<div className="nfd-wba-relative nfd-wba-mb-[var(--nfd-wba-masonry-gap)] nfd-wba-flex nfd-wba-flex-col nfd-wba-gap-6 nfd-wba-overflow-hidden nfd-wba-rounded-2xl nfd-wba-bg-grey nfd-wba-p-6">
			<div className="nfd-wba-rounded-lg nfd-wba-border-2 nfd-wba-border-dashed nfd-wba-border-grey-darker nfd-wba-p-8">
				<div
					className={classNames(
						'nfd-wba-design-item nfd-wba-cursor-pointer nfd-wba-overflow-hidden nfd-wba-border-[16px] nfd-wba-border-solid nfd-wba-border-white nfd-wba-shadow-design-item nfd-wba-transition-opacity',
						item?.type === 'templates' &&
							'nfd-wba-design-item--template',
						insertingDesign && 'nfd-wba-inserting-design'
					)}
					role="button"
					tabIndex="0"
					onClick={() => insertDesignHandler()}
					onKeyUp={(e) => {
						if (e.key === 'Enter') {
							insertDesignHandler();
						}
					}}
				>
					{blocks && (
						<BlockPreview blocks={blocks} viewportWidth={1140} />
					)}
				</div>
			</div>

			<div className="nfd-wba-flex nfd-wba-items-center nfd-wba-justify-between nfd-wba-gap-3 nfd-wba-bg-grey">
				<h2 className="nfd-wba-m-0 nfd-wba-text-xl nfd-wba-font-normal">
					{item.title}
				</h2>

				<div className="nfd-wba-flex nfd-wba-shrink-0 nfd-wba-items-center nfd-wba-gap-3">
					<Button
						className={classNames(
							'nfd-wba-h-12 nfd-wba-w-12 !nfd-wba-min-w-0 nfd-wba-rounded-lg nfd-wba-bg-white nfd-wba-transition-all nfd-wba-duration-100 hover:nfd-wba-bg-white/50 hover:nfd-wba-text-red-600',
							isFavorite
								? 'nfd-wba-text-red-600'
								: 'nfd-wba-text-zinc-500'
						)}
						showTooltip={true}
						label={
							isFavorite
								? __(
										'Remove from Favorites',
										'nfd-wonder-blocks'
								  )
								: __('Add to Favorites', 'nfd-wonder-blocks')
						}
						onClick={() => addToFavoritesHandler()}
						icon={
							<Icon
								className="nfd-wba-shrink-0"
								fill="currentColor"
								size={24}
								icon={isFavorite ? heart : heartEmpty}
							/>
						}
					/>

					<Button
						className="nfd-wba-h-12 nfd-wba-w-12 !nfd-wba-min-w-0 nfd-wba-rounded-lg nfd-wba-bg-white nfd-wba-text-zinc-500 nfd-wba-transition-all nfd-wba-duration-100 hover:nfd-wba-bg-white/50"
						isBusy={insertingDesign}
						isPressed={insertingDesign}
						label={__('Add pattern to page', 'nfd-wonder-blocks')}
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
	);
};
export default memo(DesignItem);
