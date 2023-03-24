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
	if (!data) {
		return null;
	}

	if (!Array.isArray(data)) {
		return null;
	}

	return (
		<>
			<Masonry
				breakpointCols={{
					default: 2,
					1600: 2,
					1024: 1,
				}}
				className="nfd-wba-design-list -nfd-wba-ml-[var(--nfd-wba-masonry-gap)] nfd-wba-flex nfd-wba-w-auto"
				columnClassName="nfd-wba-design-list__column nfd-wba-pl-[var(--nfd-wba-masonry-gap)]"
			>
				{data?.map((item) => (
					<DesignItem key={item.key} item={item} />
				))}
			</Masonry>
		</>
	);
};
export default memo(DesignList);
