/**
 * Internal dependencies
 */
import { blockInserter } from '../../helpers/blockInserter';
import { dispatch } from '../../helpers/events';
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockPreview } from '@wordpress/block-editor';
import { rawHandler } from '@wordpress/blocks';
import { useMemo, memo } from '@wordpress/element';

const DesignItem = memo(({ item }) => {
	const blocks = useMemo(
		() => rawHandler({ HTML: item.content }),
		[item.content]
	);

	const insertDesignHandler = async () => {
		try {
			await blockInserter(blocks);
			dispatch('nfd/cloudPatterns/closeLibrary');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div
			className="nfd-relative nfd-flex nfd-cursor-pointer nfd-flex-col nfd-items-center nfd-overflow-hidden nfd-rounded-sm nfd-bg-white nfd-ring-1 nfd-ring-gray-300 focus-visible:nfd-ring-2 focus-visible:nfd-ring-wp-admin"
			role="button"
			aria-label={__('Click to insert design', 'nfd-patterns')}
			aria-describedby={`nfd-design-item__description-${item.id}`}
			tabIndex="0"
			onClick={() => insertDesignHandler()}
			onKeyUp={(e) => {
				if (e.key === 'Enter') {
					insertDesignHandler();
				}
			}}
		>
			{blocks && (
				<BlockPreview
					blocks={blocks}
					live={false}
					viewportWidth={1200}
				/>
			)}

			{item.title && (
				<span
					id={`nfd-design-item__description-${item.id}`}
					className="nfd-sr-only"
				>
					{item.title}
				</span>
			)}
		</div>
	);
});
export default DesignItem;
