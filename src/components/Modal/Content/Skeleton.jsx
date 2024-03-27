/**
 * External dependencies
 */
import Masonry from "react-masonry-css";

/**
 * WordPress dependencies
 */
import { useMemo, memo } from "@wordpress/element";

const Skeleton = ({ count = 6, minHeight = 120, maxHeight = 320 }) => {
	const items = useMemo(() => {
		const result = [];

		for (let i = 0; i < count; i++) {
			const height = Math.floor(Math.random() * (minHeight - maxHeight + 1) + maxHeight);
			result.push(<SkeletonItem key={i} height={height} />);
		}

		return result;
	}, [count, minHeight, maxHeight]);

	return (
		<Masonry
			breakpointCols={{
				default: 2,
				1600: 2,
				1024: 1,
			}}
			className="nfd-wba-design-list -nfd-wba-ml-[var(--nfd-wba-masonry-gap)] nfd-wba-flex"
			columnClassName="nfd-wba-design-list__column nfd-wba-pl-[var(--nfd-wba-masonry-gap)]"
		>
			{items}
		</Masonry>
	);
};
export default memo(Skeleton);

export const SkeletonItem = ({ height }) => {
	return (
		<div className="nfd-wba-skeleton--item nfd-wba-mb-[var(--nfd-wba-masonry-gap)] nfd-wba-flex nfd-wba-w-full nfd-wba-flex-col nfd-wba-gap-6 nfd-wba-rounded-2xl nfd-wba-bg-grey nfd-wba-p-6">
			<div
				className="nfd-wba-rounded-[9px] nfd-wba-border-2 nfd-wba-border-solid nfd-wba-border-grey-darker/20"
				style={{
					height: `${height}px`,
				}}
			></div>

			<div className="nfd-wba-flex nfd-wba-items-center nfd-wba-justify-between nfd-wba-gap-14">
				<div className="nfd-wba-h-12 nfd-wba-max-w-[270px] nfd-wba-grow nfd-wba-rounded-lg nfd-wba-bg-grey-darker/20"></div>

				<div className="items-center nfd-wba-flex nfd-wba-gap-3">
					<div className="nfd-wba-h-12 nfd-wba-w-12 nfd-wba-rounded-lg nfd-wba-bg-grey-darker/20"></div>
					<div className="nfd-wba-h-12 nfd-wba-w-12 nfd-wba-rounded-lg nfd-wba-bg-grey-darker/20"></div>
				</div>
			</div>
		</div>
	);
};
