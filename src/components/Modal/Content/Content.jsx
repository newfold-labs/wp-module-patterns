/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Header from './Header';
import { store as nfdPatternsStore } from '../../../store';

const Content = ({ selectedTab }) => {
	const { activePatternCategory, keywordsFilter } = useSelect((select) => ({
		activePatternCategory:
			select(nfdPatternsStore).getActivePatternCategory(),
		keywordsFilter: select(nfdPatternsStore).getKeywordsFilter(),
	}));

	return (
		<div className="nfd-wba-min-w-[400px] nfd-wba-grow nfd-wba-overflow-y-auto">
			<Header />

			<div className="nfd-wba-flex nfd-wba-flex-col nfd-wba-gap-y-10 nfd-wba-py-10 nfd-wba-px-6">
				<h1 className="nfd-wba-my-0 nfd-wba-text-2xl nfd-wba-font-normal nfd-wba-text-dark">
					Results for Fitness
				</h1>

				<pre className="nfd-wba-m-0 nfd-wba-rounded-md nfd-wba-bg-grey nfd-wba-p-6">
					{JSON.stringify(
						{ selectedTab, activePatternCategory, keywordsFilter },
						null,
						2
					)}
				</pre>
			</div>
		</div>
	);
};
export default Content;
