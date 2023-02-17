/**
 * WordPress dependencies
 */
import { useRef, useState, useEffect } from '@wordpress/element';
import { SearchControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { dispatch } from '@wordpress/data';

/**
 * External dependencies
 */
import debounce from 'lodash/debounce';

/**
 * Internal dependencies
 */
import { store as nfdPatternsStore } from '../../../store';
import { NFD_WONDER_BLOCKS_INPUT_DEBOUNCE_TIME } from '../../../constants';

const KeywordFilter = () => {
	const searchRef = useRef('');
	const [searchValue, setSearchValue] = useState('');

	// Focus the search input on mount.
	useEffect(() => {
		searchRef.current.focus();
	}, []);

	// Debounce search value changes in store.
	useEffect(() => {
		const delayedSearch = debounce(() => {
			dispatch(nfdPatternsStore).setKeywordsFilter(searchValue);
		}, NFD_WONDER_BLOCKS_INPUT_DEBOUNCE_TIME);

		delayedSearch();

		return delayedSearch.cancel;
	}, [searchValue]);

	return (
		<div className="nfd-wba-flex nfd-wba-items-center nfd-wba-gap-x-3">
			<SearchControl
				className="nfd-wba-keyword-filter nfd-wba-m-0"
				placeholder={__('Keywords', 'nfd-wonder-blocks')}
				ref={searchRef}
				value={searchValue}
				onChange={(value) => {
					setSearchValue(value);
				}}
			/>
		</div>
	);
};
export default KeywordFilter;
