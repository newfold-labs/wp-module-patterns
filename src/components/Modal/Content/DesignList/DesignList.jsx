/**
 * External dependencies
 */
import Masonry from 'react-masonry-css';

/**
 * WordPress dependencies
 */

import { useAsyncList } from '@wordpress/compose';
import { memo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { SkeletonItem } from '../Skeleton';
import DesignItem from './DesignItem';

const DesignList = ({ data }) => {
	// useAsyncList is a hook that helps to render the list of items asynchronously.
	const currentShown = useAsyncList(data);

	if (!data || !Array.isArray(data)) {
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
				{data?.map((pattern) => {
					const isShown = currentShown.includes(pattern);

					return isShown ? (
						<DesignItem key={pattern.key} item={pattern} />
					) : (
						<SkeletonItem height={150} />
					);
				})}
			</Masonry>
		</>
	);
};

export default memo(DesignList);
