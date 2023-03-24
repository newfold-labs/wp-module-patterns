/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import useFavorites from '../../../hooks/useFavorites';
import usePatterns from '../../../hooks/usePatterns';
import { store as nfdPatternsStore } from '../../../store';
import ContentTitle from './ContentTitle';
import DesignList from './DesignList/DesignList';
import Header from './Header/Header';
import LoadingBar from './LoadingBar';

const Content = () => {
	const {
		activePatternsCategory,
		activeTemplatesCategory,
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
	const { data, isValidating, isFavorites } = usePatterns();
	const { data: favData } = useFavorites();

	const { setIsContentLoading } = useDispatch(nfdPatternsStore);

	// Set the global content loading state when the data is loading.
	useEffect(() => {
		setIsContentLoading(!data && isValidating);
	}, [data, isValidating, setIsContentLoading]);

	return (
		<div className="nfd-wba-flex nfd-wba-min-w-[400px] nfd-wba-grow nfd-wba-flex-col nfd-wba-overflow-y-auto">
			<Header />

			<div className="nfd-wba-relative nfd-wba-flex nfd-wba-grow nfd-wba-flex-col nfd-wba-gap-y-10">
				{<LoadingBar isComplete={isFavorites ? favData : data} />}

				<div className="nfd-wba-absolute nfd-wba-inset-0 nfd-wba-flex nfd-wba-flex-col nfd-wba-overflow-auto nfd-wba-py-8 nfd-wba-px-6">
					<ContentTitle
						activeTab={activeTab}
						title={keywordsFilter}
						currentCategory={
							activeTab === 'patterns'
								? activePatternsCategory
								: activeTemplatesCategory
						}
					/>

					{data && !isFavorites && (
						<DesignList data={data} isFavorites={false} />
					)}
					{favData && isFavorites && (
						<DesignList data={favData} isFavorites={true} />
					)}
				</div>
			</div>
		</div>
	);
};
export default Content;
