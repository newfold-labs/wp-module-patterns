/**
 * WordPress dependencies
 */
import { SearchControl } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import debounce from 'lodash/debounce';

/**
 * Internal dependencies
 */
import { INPUT_DEBOUNCE_TIME } from '../../../../constants';
import { store as nfdPatternsStore } from '../../../../store';

const KeywordFilter = () => {
	const [searchValue, setSearchValue] = useState('');

	const { setKeywordsFilter, setShouldResetKeywords } =
		useDispatch(nfdPatternsStore);

	const { isSidebarLoading, isContentLoading, shouldResetKeywords } =
		useSelect((select) => ({
			isSidebarLoading: select(nfdPatternsStore).isSidebarLoading(),
			isContentLoading: select(nfdPatternsStore).isContentLoading(),
			shouldResetKeywords: select(nfdPatternsStore).shouldResetKeywords(),
		}));

	// Debounce search value changes in store.
	useEffect(() => {
		const delayedSearch = debounce(
			() => {
				setKeywordsFilter(searchValue.trim());
			},
			searchValue.trim() === '' ? 0 : INPUT_DEBOUNCE_TIME // Don't debounce empty searches.
		);

		if (typeof searchValue === 'string') {
			delayedSearch();
		}

		return delayedSearch.cancel;
	}, [searchValue, setKeywordsFilter]);

	useEffect(() => {
		if (shouldResetKeywords) {
			setSearchValue('');
			setShouldResetKeywords(false);
		}
	}, [setShouldResetKeywords, shouldResetKeywords]);

	return (
		<div className="nfd-wba-flex nfd-wba-items-center nfd-wba-gap-x-3">
			<SearchControl
				className="nfd-wba-keyword-filter nfd-wba-m-0"
				disabled={isSidebarLoading || isContentLoading}
				label={__('Search', 'nfd-wonder-blocks')}
				hideLabelFromVision={false}
				placeholder=""
				value={searchValue}
				onChange={(value) => {
					setSearchValue(value);
				}}
			/>
		</div>
	);
};
export default KeywordFilter;