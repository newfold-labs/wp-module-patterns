/**
 * WordPress dependencies
 */
import { useMemo } from "@wordpress/element";

const Skeleton = ({ count, minWidth = 40, maxWidth = 110 }) => {
	const items = useMemo(() => {
		const result = [];

		for (let i = 0; i < count; i++) {
			const width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
			result.push(<SkeletonItem key={i} width={width} />);
		}

		return result;
	}, [count, minWidth, maxWidth]);

	return (
		<ul className="nfd-wba-m-0 nfd-wba-hidden nfd-wba-list-none nfd-wba-flex-col nfd-wba-py-4 nfd-wba-pl-6 nfd-wba-pr-5 sm:nfd-wba-flex">
			{items}
		</ul>
	);
};
export default Skeleton;

export const SkeletonItem = ({ width }) => {
	return (
		<li className="nfd-wba-my-0 nfd-wba-flex nfd-wba-min-h-[43px] nfd-wba-items-center nfd-wba-justify-between">
			<span
				className="nfd-wba-skeleton--item nfd-wba-h-4 nfd-wba-rounded nfd-wba-bg-grey"
				style={{
					width: `${width}px`,
				}}
			/>
			<span className="nfd-wba-skeleton--item nfd-wba-h-6 nfd-wba-w-8 nfd-wba-rounded-full nfd-wba-bg-grey"></span>
		</li>
	);
};
