/**
 * Internal dependencies
 */
import DesignItem from './DesignItem';

const DesignList = ({ data }) => {
	if (!data) {
		return null;
	}

	return (
		<div className="nfd-wba-grid nfd-wba-grid-cols-1 nfd-wba-bg-red-500 lg:nfd-wba-grid-cols-3">
			{data?.map((item) => (
				<DesignItem key={item.key} item={item} />
			))}
		</div>
	);
};
export default DesignList;
