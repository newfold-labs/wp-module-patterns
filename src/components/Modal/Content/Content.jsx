/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import Header from './Header';
import { store as nfdPatternsStore } from '../../../store';

const Content = ({ selectedTab }) => {
	const { activePatternCategory } = useSelect((select) => ({
		activePatternCategory:
			select(nfdPatternsStore).getActivePatternCategory(),
	}));

	return (
		<div className="nfd-wba-min-w-[400px] nfd-wba-grow">
			<Header />
			<pre>
				{JSON.stringify(
					{ selectedTab, activePatternCategory },
					null,
					2
				)}
			</pre>
		</div>
	);
};
export default Content;
