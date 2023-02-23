/**
 * WordPress dependencies
 */
import { Snackbar } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { sprintf, __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import useFavorites from '../../../hooks/useFavorites';
import usePatterns from '../../../hooks/usePatterns';
import { store as nfdPatternsStore } from '../../../store';
import DesignList from './DesignList/DesignList';
import Header from './Header/Header';
import LoadingBar from './LoadingBar';

const Content = () => {
	const {
		activePatternsCategory,
		activeTemplatesCategory,
		isContentLoading,
		isSidebarLoading,
		keywordsFilter,
		activeTab,
	} = useSelect((select) => ({
		activeTab: select(nfdPatternsStore).getActiveTab(),
		activePatternsCategory:
			select(nfdPatternsStore).getActivePatternsCategory(),
		activeTemplatesCategory:
			select(nfdPatternsStore).getActiveTemplatesCategory(),
		isContentLoading: select(nfdPatternsStore).isContentLoading(),
		isSidebarLoading: select(nfdPatternsStore).isSidebarLoading(),
		keywordsFilter: select(nfdPatternsStore).getKeywordsFilter(),
	}));

	// Fetch data.
	const { data, isValidating } = usePatterns();
	// const { data: favData } = useFavorites(selectedTab);

	const { setIsContentLoading } = useDispatch(nfdPatternsStore);

	// Set the global content loading state when the data is loading.
	useEffect(() => {
		setIsContentLoading(!data && isValidating);
	}, [data, isValidating, setIsContentLoading]);

	return (
		<div className="nfd-wba-flex nfd-wba-min-w-[400px] nfd-wba-grow nfd-wba-flex-col nfd-wba-overflow-y-auto">
			<Header />

			<div className="nfd-wba-relative nfd-wba-flex nfd-wba-grow nfd-wba-flex-col nfd-wba-gap-y-10">
				{<LoadingBar isComplete={data} />}

				<div className="nfd-wba-absolute nfd-wba-inset-0 nfd-wba-overflow-auto nfd-wba-py-8 nfd-wba-px-6">
					{keywordsFilter && (
						<h1 className="nfd-wba-my-0 nfd-wba-text-2xl nfd-wba-font-normal nfd-wba-text-dark">
							{sprintf(
								// translators: %s is the keywords filter value
								__('Results for %s', 'nfd-wonder-blocks'),
								keywordsFilter
							)}
						</h1>
					)}

					{data && <DesignList data={data} />}

					{
						// <pre className="nfd-wba-m-0 nfd-wba-whitespace-pre-wrap nfd-wba-rounded-md nfd-wba-bg-grey nfd-wba-p-6">
						// 	{JSON.stringify(
						// 		{
						// 			activeTab,
						// 			activePatternsCategory,
						// 			activeTemplatesCategory,
						// 			isContentLoading,
						// 			isSidebarLoading,
						// 			keywordsFilter,
						// 			data,
						// 		},
						// 		null,
						// 		2
						// 	)}
						// </pre>
					}
				</div>
			</div>
		</div>
	);
};
export default Content;
