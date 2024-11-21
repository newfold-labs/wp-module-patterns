/**
 * External dependencies
 */
import { useInView } from "react-intersection-observer";

/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { trackHiiveEvent } from "../../../../helpers";
import { usePatterns } from "../../../../hooks";
import { store as nfdPatternsStore } from "../../../../store";
import DesignList from "../DesignList/DesignList";
import Error from "../DesignList/Error";
import NoResults from "../DesignList/NoResults";
import FilterBar from "../FilterBar";
import LoadingSpinner from "../LoadingSpinner";
import Skeleton from "../Skeleton";
import Spinner from "../Spinner";
import UpdateNotice from "../UpdateNotice";

const Library = () => {
	const [ready, setReady] = useState(false);
	const [loadMoreRef, inView] = useInView({ threshold: 0 });

	const { activeTab, isContentLoading, isSidebarLoading, keywordsFilter } = useSelect((select) => ({
		activeTab: select(nfdPatternsStore).getActiveTab(),
		isSidebarLoading: select(nfdPatternsStore).isSidebarLoading(),
		isContentLoading: select(nfdPatternsStore).isContentLoading(),
		keywordsFilter: select(nfdPatternsStore).getKeywordsFilter(),
	}));

	// Fetch data.
	const { data, isValidating, isFavorites, isError, size, setSize, hasMore } = usePatterns();

	const { setIsContentLoading, setSidebarDisplayMode } = useDispatch(nfdPatternsStore);

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
	}, [inView, hasMore, data?.length]);

	// Delay showing the content to avoid flickering
	useEffect(() => {
		const t = setTimeout(() => {
			setReady(true);
		}, 300);

		return () => {
			clearTimeout(t);
		};
	}, []);

	useEffect(() => {
		if (!keywordsFilter) {
			return;
		}

		if (hasMore === undefined) {
			return;
		}

		if (hasMore && data?.length === 0) {
			return;
		}

		const eventData = {
			label_key: "search_term",
			search_term: keywordsFilter,
			count: data?.length,
		};

		if (activeTab === "patterns") {
			trackHiiveEvent("pattern_searched", eventData);
		} else if (activeTab === "templates") {
			trackHiiveEvent("template_searched", eventData);
		}
	}, [activeTab, data?.length, hasMore, keywordsFilter]);

	useEffect(() => {
		if (activeTab === "templates") {
			setSidebarDisplayMode("categories");
		}
	}, [activeTab, setSidebarDisplayMode]);

	return (
		<>
			{isSidebarLoading && !isError && <LoadingSpinner />}
			<div className="nfd-wba-inset-0 nfd-wba-flex nfd-wba-grow nfd-wba-flex-col nfd-wba-px-4 nfd-wba-py-2 sm:nfd-wba-py-0 sm:nfd-wba-px-6">
				<UpdateNotice />

				<FilterBar />

				{(!isSidebarLoading && isContentLoading && !isError) || (!ready && <Skeleton />)}

				{isError && <Error />}

				{data?.length === 0 && !isError && !isValidating && <NoResults isFavorites={isFavorites} />}

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
		</>
	);
};
export default Library;
