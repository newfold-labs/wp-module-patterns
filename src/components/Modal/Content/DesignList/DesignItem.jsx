/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { BlockPreview } from '@wordpress/block-editor';
import { rawHandler } from '@wordpress/blocks';
import { Button } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { memo, useMemo } from '@wordpress/element';
import { sprintf, __ } from '@wordpress/i18n';
import { Icon, plus, starEmpty, starFilled } from '@wordpress/icons';
import { store as noticesStore } from '@wordpress/notices';
import { REST_URL } from '../../../../constants';

/**
 * Internal dependencies
 */
import { blockInserter } from '../../../../helpers/blockInserter';
import { store as nfdPatternsStore } from '../../../../store';

const DesignItem = ({ item }) => {
	const blocks = useMemo(
		() => rawHandler({ HTML: item.source }),
		[item.source]
	);

	const { createErrorNotice, createSuccessNotice } =
		useDispatch(noticesStore);
	const { setIsModalOpen } = useDispatch(nfdPatternsStore);

	/**
	 * Insert the pattern or a collection of patterns (template) into the editor.
	 *
	 * @return {void}
	 * @throws {Error} If the pattern cannot be inserted.
	 */
	const insertDesignHandler = async () => {
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
			setIsModalOpen(false);
		}
	};

	const addToFavoritesHandler = async () => {
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
				className="nfd-wba-cursor-pointer nfd-wba-overflow-hidden nfd-wba-rounded-t-md nfd-wba-border nfd-wba-border-solid nfd-wba-border-grey"
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
						label={__('Insert', 'nfd-wonder-blocks')}
						icon={
							<Icon
								fill="currentColor"
								className="nfd-wba-shrink-0"
								icon={plus}
								onClick={() => insertDesignHandler()}
							/>
						}
					/>

					<Button
						className="nfd-wba-h-8 nfd-wba-w-8 !nfd-wba-min-w-0 nfd-wba-bg-white"
						label={__('Add to Favorites', 'nfd-wonder-blocks')}
						icon={
							<Icon
								fill="currentColor"
								className="nfd-wba-shrink-0"
								icon={starEmpty}
								onClick={() => addToFavoritesHandler()}
							/>
						}
					/>
				</div>
			</div>
		</div>
	);
};
export default memo(DesignItem);
