/**
 * WordPress dependencies
 */
import { rawHandler } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';
import { useMemo } from '@wordpress/element';
import { sprintf, __ } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';

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
					__('"%s" pattern successfully added.', 'nfd-wonder-blocks'),
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

	return (
		<button
			type="button"
			onClick={() => {
				insertDesignHandler();
			}}
			onKeyUp={(e) => {
				if (e.key === 'Enter') {
					insertDesignHandler();
				}
			}}
		>
			{item.title}
		</button>
	);
};
export default DesignItem;
