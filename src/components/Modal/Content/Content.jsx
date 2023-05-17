/**
 * External dependencies
 */
import { useInView } from 'react-intersection-observer';

/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import usePatterns from '../../../hooks/usePatterns';
import { store as nfdPatternsStore } from '../../../store';
import ContentTitle from './ContentTitle';
import DesignList from './DesignList/DesignList';
import Error from './DesignList/Error';
import NoResults from './DesignList/NoResults';
import LoadingSpinner from './LoadingSpinner';
import Skeleton from './Skeleton';
import Spinner from './Spinner';

const Content = () => {
	const [ready, setReady] = useState(false);
	const [loadMoreRef, inView] = useInView({ threshold: 0 });

	const {
		activePatternsCategory,
		activeTab,
		activeTemplatesCategory,
		isContentLoading,
		isSidebarLoading,
		keywordsFilter,
	} = useSelect((select) => ({
		activePatternsCategory:
			select(nfdPatternsStore).getActivePatternsCategory(),
		activeTab: select(nfdPatternsStore).getActiveTab(),
		activeTemplatesCategory:
			select(nfdPatternsStore).getActiveTemplatesCategory(),
		isSidebarLoading: select(nfdPatternsStore).isSidebarLoading(),
		isContentLoading: select(nfdPatternsStore).isContentLoading(),
		keywordsFilter: select(nfdPatternsStore).getKeywordsFilter(),
	}));

	// Fetch data.
	const { data, isValidating, isFavorites, isError, size, setSize, hasMore } =
		usePatterns();

	const { setIsContentLoading } = useDispatch(nfdPatternsStore);

	// Set the global content loading state when the data is loading.
	useEffect(() => {
		setIsContentLoading((!data || data.length === 0) && isValidating);
	}, [data, isValidating, setIsContentLoading]);

	// Fetches when the load more is in view
	useEffect(() => {
		if (hasMore && inView) {
			setSize(size + 1);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [inView, hasMore]);

	// Delay showing the content to avoid flickering
	useEffect(() => {
		const t = setTimeout(() => {
			setReady(true);
		}, 300);

		return () => {
			clearTimeout(t);
		};
	}, []);

	return (
		<div className="nfd-wba-flex nfd-wba-grow nfd-wba-flex-col sm:nfd-wba-overflow-y-auto md:nfd-wba-min-w-[400px]">
			<div className="nfd-wba-relative nfd-wba-flex nfd-wba-min-h-[50vh] nfd-wba-grow nfd-wba-flex-col nfd-wba-gap-y-10">
				{isSidebarLoading && !isError && <LoadingSpinner />}

				<div className="nfd-wba-inset-0 nfd-wba-flex nfd-wba-grow nfd-wba-flex-col nfd-wba-px-4 nfd-wba-py-8 sm:nfd-wba-px-6">
					<ContentTitle
						activeTab={activeTab}
						title={keywordsFilter}
						currentCategory={
							activeTab === 'patterns'
								? activePatternsCategory
								: activeTemplatesCategory
						}
					/>

					{(!isSidebarLoading && isContentLoading && !isError) ||
						(!ready && <Skeleton />)}

					{isError && <Error />}

					{data?.length === 0 && !isError && !isValidating && (
						<NoResults isFavorites={isFavorites} />
					)}

					{ready && data && data?.length > 0 && (
						<>
							<DesignList data={data} />

							{hasMore && (
								<div
									className="nfd-wba-z-[2] nfd-wba-flex nfd-wba-flex-col nfd-wba-items-center nfd-wba-justify-center nfd-wba-gap-y-6 nfd-wba-bg-white nfd-wba-px-6 nfd-wba-pt-6"
									ref={loadMoreRef}
								>
									<Spinner size={40} />
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};
export default Content;
