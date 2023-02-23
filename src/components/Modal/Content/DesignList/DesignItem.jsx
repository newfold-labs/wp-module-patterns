/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { BlockPreview } from '@wordpress/block-editor';
import { rawHandler } from '@wordpress/blocks';
import { Button } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { memo, useMemo, useState } from '@wordpress/element';
import { sprintf, __ } from '@wordpress/i18n';
import { Icon, plus, starEmpty, starFilled } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';
import classNames from 'classnames';
import { REST_URL } from '../../../../constants';

/**
 * Internal dependencies
 */
import { blockInserter } from '../../../../helpers/blockInserter';
import { store as nfdPatternsStore } from '../../../../store';

const DesignItem = ({ item }) => {
	const [favorite, setFavorite] = useState(false);
	const [insertingDesign, setInsertingDesign] = useState(false);

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
							'"%s" pattern successfully inserted.',
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
						'Failed to insert the pattern. Please try again.',
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
		setFavorite((prev) => !prev);

		await apiFetch({
			url: `${REST_URL}/favorites/patterns`,
			method: 'POST',
			data: item,
			headers: {
				'x-nfd-wonder-blocks': 'nfd_wonder_blocks',
			},
		});
	};

	return (
		<div className="nfd-wba-relative nfd-wba-mb-[var(--nfd-wba-masonry-gap)] nfd-wba-flex nfd-wba-flex-col nfd-wba-overflow-hidden nfd-wba-rounded-b-md">
			<div
				className={classNames(
					'nfd-wba-design-item nfd-wba-cursor-pointer nfd-wba-overflow-hidden nfd-wba-rounded-t-md nfd-wba-border nfd-wba-border-solid nfd-wba-border-grey nfd-wba-transition-opacity',
					activeTab === 'templates' &&
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

			<div className="nfd-wba-flex nfd-wba-items-center nfd-wba-justify-between nfd-wba-gap-3 nfd-wba-bg-grey nfd-wba-px-6 nfd-wba-py-3">
				<h2 className="nfd-wba-m-0 nfd-wba-text-md nfd-wba-font-normal">
					{item.title}
				</h2>

				<div className="nfd-wba-flex nfd-wba-shrink-0 nfd-wba-items-center nfd-wba-gap-1">
					<Button
						className="nfd-wba-h-8 nfd-wba-w-8 !nfd-wba-min-w-0 nfd-wba-bg-white"
						isBusy={insertingDesign}
						isPressed={insertingDesign}
						label={__('Insert', 'nfd-wonder-blocks')}
						onClick={() => insertDesignHandler()}
						icon={
							<Icon
								fill="currentColor"
								className="nfd-wba-shrink-0"
								icon={plus}
							/>
						}
					/>

					<Button
						className={classNames(
							'nfd-wba-h-8 nfd-wba-w-8 !nfd-wba-min-w-0 nfd-wba-bg-white',
							favorite && 'nfd-wba-text-dark'
						)}
						label={__('Add to Favorites', 'nfd-wonder-blocks')}
						onClick={() => addToFavoritesHandler()}
						icon={
							<Icon
								className="nfd-wba-shrink-0"
								fill="currentColor"
								icon={favorite ? starFilled : starEmpty}
							/>
						}
					/>
				</div>
			</div>
		</div>
	);
};
export default memo(DesignItem);
