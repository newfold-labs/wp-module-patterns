/**
 * Internal dependencies
 */
import Header from './Header';

const Content = ({ selectedTab }) => {
	return (
		<div className="nfd-min-w-[400px] nfd-grow">
			<Header />
			<div>Selected Tab: {selectedTab}</div>
		</div>
	);
};
export default Content;
