/**
 * External dependencies
 */
import Masonry from 'react-masonry-css';

/**
 * WordPress dependencies
 */
import { memo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import DesignItem from './DesignItem';

const DesignList = ({ data }) => {
	if (!data || !Array.isArray(data)) {
		return null;
	}

	return (
		<>
			<Masonry
				breakpointCols={{
					default: 2,
					1600: 2,
					1100: 1,
				}}
				className="nfd-wba-design-list nfd-wba-flex nfd-wba-w-auto sm:-nfd-wba-ml-[var(--nfd-wba-masonry-gap)]"
				columnClassName="nfd-wba-design-list__column sm:nfd-wba-pl-[var(--nfd-wba-masonry-gap)]"
			>
				{data?.map((pattern, index) => (
					<DesignItem
						key={`${pattern.key}-${index}`}
						item={pattern}
					/>
				))}
			</Masonry>
		</>
	);
};

export default memo(DesignList);
