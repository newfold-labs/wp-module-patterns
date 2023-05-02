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

const Content = () => {
	const [loadMoreRef, inView] = useInView();

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
		setIsContentLoading(!data && isValidating);
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
				{isSidebarLoading && (
					<LoadingSpinner isComplete={data || !!isError} />
				)}

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

					{!isSidebarLoading && isContentLoading && <Skeleton />}

					{isError && <Error />}

					{(!data || data?.length === 0) && !isError && (
						<NoResults isFavorites={isFavorites} />
					)}

					{data && data?.length > 0 && (
						<>
							<DesignList data={data} />

							{hasMore && (
								<>
									<div className="nfd-wba-z-[2] nfd-wba-flex nfd-wba-flex-col nfd-wba-items-center nfd-wba-justify-center nfd-wba-gap-y-6 nfd-wba-bg-white nfd-wba-px-6">
										<div
											className="nfd-wba-inline-block nfd-wba-h-[60px] nfd-wba-w-[60px] nfd-wba-animate-spin nfd-wba-rounded-full nfd-wba-border-2 nfd-wba-border-solid nfd-wba-border-brand nfd-wba-border-r-brand/10 nfd-wba-align-[-0.125em]"
											role="status"
										>
											<span className="nfd-wba-sr-only">
												{__(
													'Loading…',
													'nfd-wonder-blocks'
												)}
											</span>
										</div>
									</div>
									<div
										className="relative flex flex-col items-end justify-end -top-1/4 h-4"
										ref={loadMoreRef}
										style={{ zIndex: -1 }}
									/>
								</>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};
export default Content;
