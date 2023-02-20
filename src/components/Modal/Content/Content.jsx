/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { sprintf, __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { store as nfdPatternsStore } from '../../../store';
import DesignList from './DesignList/DesignList';
import Header from './Header/Header';
import LoadingBar from './LoadingBar';

const Content = ({ selectedTab }) => {
	const [data, setData] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setData(true);
		}, 1000);
	});

	const { activePatternCategory, keywordsFilter } = useSelect((select) => ({
		activePatternCategory:
			select(nfdPatternsStore).getActivePatternCategory(),
		keywordsFilter: select(nfdPatternsStore).getKeywordsFilter(),
	}));

	return (
		<div className="nfd-wba-flex nfd-wba-min-w-[400px] nfd-wba-grow nfd-wba-flex-col nfd-wba-overflow-y-auto">
			<Header />

			<div className="nfd-wba-relative nfd-wba-flex nfd-wba-grow nfd-wba-flex-col nfd-wba-gap-y-10 nfd-wba-py-8 nfd-wba-px-6">
				{keywordsFilter && (
					<h1 className="nfd-wba-my-0 nfd-wba-text-2xl nfd-wba-font-normal nfd-wba-text-dark">
						{sprintf(
							// translators: %s is the keywords filter value
							__('Results for %s', 'nfd-wonder-blocks'),
							keywordsFilter
						)}
					</h1>
				)}

				<LoadingBar isComplete={data} />

				<pre className="nfd-wba-m-0 nfd-wba-rounded-md nfd-wba-bg-grey nfd-wba-p-6">
					{JSON.stringify(
						{
							selectedTab,
							activePatternCategory,
							keywordsFilter,
							data,
						},
						null,
						2
					)}
				</pre>

				{data && <DesignList data={data} />}
			</div>
		</div>
	);
};
export default Content;
