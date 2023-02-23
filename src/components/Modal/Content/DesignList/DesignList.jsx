/**
 * External dependencies
 */
import Masonry from 'react-masonry-css';

/**
 * WordPress dependencies
 */
import { useEffect, useState, memo } from '@wordpress/element';

/**
 * Internal dependencies
 */
import DesignItem from './DesignItem';

const DesignList = ({ data }) => {
	const [isDelayed, setIsDelayed] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsDelayed(false);
		}, 150);

		return () => clearTimeout(timer);
	});

	// Delay rendering of the list to prevent layout shift.
	if (isDelayed) {
		return null;
	}

	if (!data) {
		return null;
	}

	return (
		<>
			<Masonry
				breakpointCols={{
					default: 3,
					1600: 2,
					1024: 1,
				}}
				className="nfd-wba-design-list -nfd-wba-ml-[var(--nfd-wba-masonry-gap)] nfd-wba-flex nfd-wba-w-auto"
				columnClassName="nfd-wba-design-list__column nfd-wba-pl-[var(--nfd-wba-masonry-gap)]"
			>
				{data?.length === 0 && <p>No results</p>}

				{data?.map((item) => (
					<DesignItem key={item.key} item={item} />
				))}
			</Masonry>
		</>
	);
};
export default memo(DesignList);
