/**
 * WordPress dependencies
 */
import { Button, SearchControl } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useRef, useState, useTransition } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Icon, search } from '@wordpress/icons';

/**
 * External dependencies
 */
import classNames from 'classnames';
import debounce from 'lodash/debounce';

/**
 * Internal dependencies
 */
import { INPUT_DEBOUNCE_TIME } from '../../../../constants';
import { store as nfdPatternsStore } from '../../../../store';

const KeywordFilter = () => {
	const [searchValue, setSearchValue] = useState('');
	const [hasFocus, setHasFocus] = useState(false);
	const [isPending, startTransition] = useTransition();
	const searchRef = useRef(null);

	const { setKeywordsFilter, setShouldResetKeywords } =
		useDispatch(nfdPatternsStore);

	const { isSidebarLoading, shouldResetKeywords } = useSelect((select) => ({
		isSidebarLoading: select(nfdPatternsStore).isSidebarLoading(),
		shouldResetKeywords: select(nfdPatternsStore).shouldResetKeywords(),
	}));

	// Debounce search value changes in store.
	useEffect(() => {
		const delayedSearch = debounce(
			() => {
				startTransition(() => {
					setKeywordsFilter(searchValue.trim());
				});
			},
			searchValue.trim() === '' ? 0 : INPUT_DEBOUNCE_TIME // Don't debounce empty searches.
		);

		if (typeof searchValue === 'string' && searchValue.trim().length >= 2) {
			delayedSearch();
		} else {
			startTransition(() => {
				setKeywordsFilter(''); // Clear the filter if the searchValue has less than 3 chars
			});
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
			{!hasFocus && (
				<Button
					label={__('Search', 'nfd-wonder-blocks')}
					aria-label={__('Search', 'nfd-wonder-blocks')}
					aria-haspopup="true"
					aria-expanded={hasFocus}
					aria-controls="nfd-wba-filter-patterns"
					aria-busy={isPending}
					className="nfd-wba-search-toggle sm:nfd-wba-hidden"
					type="button"
					showTooltip={true}
					onClick={() => {
						setHasFocus(true);
						setTimeout(() => {
							searchRef.current?.focus();
						}, 50);
					}}
				>
					<Icon icon={search} iconSize={24} />
				</Button>
			)}

			<SearchControl
				id="nfd-wba-filter-patterns"
				ref={searchRef}
				className={classNames(
					'nfd-wba-keyword-filter nfd-wba-m-0',
					!hasFocus && 'nfd-wba-invisible sm:nfd-wba-visible'
				)}
				disabled={isSidebarLoading}
				label={__('Search', 'nfd-wonder-blocks')}
				hideLabelFromVision={false}
				placeholder=""
				value={searchValue}
				onFocus={() => {
					setHasFocus(true);
				}}
				onBlur={() => {
					setHasFocus(false);
				}}
				onChange={(value) => {
					setSearchValue(value);
				}}
			/>
		</div>
	);
};
export default KeywordFilter;
