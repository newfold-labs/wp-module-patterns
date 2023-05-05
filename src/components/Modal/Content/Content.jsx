/**
 * External dependencies
 */
import { useInView } from 'react-intersection-observer';

/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import usePatterns from '../../../hooks/usePatterns';
import { store as nfdPatternsStore } from '../../../store';
import ContentTitle from './ContentTitle';
import DesignList from './DesignList/DesignList';
import Error from './DesignList/Error';
import NoResults from './DesignList/NoResults';
import Header from './Header/Header';
import LoadingSpinner from './LoadingSpinner';
import Skeleton from './Skeleton';
import Spinner from './Spinner';

const Content = () => {
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

	return (
		<div className="nfd-wba-flex nfd-wba-min-w-[400px] nfd-wba-grow nfd-wba-flex-col nfd-wba-overflow-y-auto">
			<Header />

			<div className="nfd-wba-relative nfd-wba-flex nfd-wba-grow nfd-wba-flex-col nfd-wba-gap-y-10">
				{isSidebarLoading && !isError && <LoadingSpinner />}

				<div className="nfd-wba-absolute nfd-wba-inset-0 nfd-wba-flex nfd-wba-flex-col nfd-wba-overflow-auto nfd-wba-px-6 nfd-wba-py-8">
					<ContentTitle
						activeTab={activeTab}
						title={keywordsFilter}
						currentCategory={
							activeTab === 'patterns'
								? activePatternsCategory
								: activeTemplatesCategory
						}
					/>

					{!isSidebarLoading && isContentLoading && !isError && (
						<Skeleton />
					)}

					{isError && <Error />}

					{data?.length === 0 && !isError && !isValidating && (
						<NoResults isFavorites={isFavorites} />
					)}

					{data && data?.length > 0 && (
						<>
							<DesignList data={data} />

							<div
								className="nfd-wba-z-[2] nfd-wba-flex nfd-wba-flex-col nfd-wba-items-center nfd-wba-justify-center nfd-wba-gap-y-6 nfd-wba-bg-white nfd-wba-px-6 nfd-wba-pt-6"
								ref={loadMoreRef}
							>
								{hasMore ? (
									<Spinner size={40} />
								) : (
									<p className="nfd-wba-text-md">
										{__(
											'No more items to show',
											'nfd-wonder-blocks'
										)}
									</p>
								)}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};
export default Content;
