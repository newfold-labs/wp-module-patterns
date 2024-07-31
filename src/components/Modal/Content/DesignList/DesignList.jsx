/**
 * External dependencies
 */
import Masonry from "react-masonry-css";

/**
 * WordPress dependencies
 */
import { useSelect } from "@wordpress/data";
import { memo } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { store as nfdPatternsStore } from "../../../../store";
import DesignItem from "./DesignItem";

const DesignList = ({ data }) => {
	const { gridColumns, sortOrder } = useSelect((select) => ({
		gridColumns: select(nfdPatternsStore).getModalGridColumns(),
		sortOrder: select(nfdPatternsStore).getSortOrder(),
	}));

	if (!data || !Array.isArray(data)) {
		return null;
	}

	return (
		<>
			<Masonry
				key={`nfd-wba-masonry-${gridColumns}`}
				breakpointCols={{
					default: gridColumns,
					1600: 2,
					1100: 1,
				}}
				className="nfd-wba-design-list nfd-wba-flex nfd-wba-w-auto sm:-nfd-wba-ml-[var(--nfd-wba-masonry-gap)]"
				columnClassName="nfd-wba-design-list__column sm:nfd-wba-pl-[var(--nfd-wba-masonry-gap)]"
			>
				{data?.map((pattern, index) => (
					<DesignItem key={`${pattern.key}-${index}-${sortOrder}`} item={pattern} />
				))}
			</Masonry>
		</>
	);
};

export default memo(DesignList);
