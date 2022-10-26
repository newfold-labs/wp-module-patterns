/**
 * Internal dependencies
 */
import { LibraryModalContext } from '../../context/library-modal-context';
import SidebarHeader from './SidebarHeader';

/**
 * WordPress dependencies
 */
import { SearchControl, TabPanel } from '@wordpress/components';
import { useEffect, useContext } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const Sidebar = () => {
	const { searchValue, setSearchValue, searchRef } =
		useContext(LibraryModalContext);

	// Focus the search field on component mount.
	useEffect(() => {
		searchRef?.current?.focus();
	}, []);

	return (
		<aside className="nfd-flex nfd-flex-col nfd-overflow-auto nfd-bg-white nfd-shadow-sidebar">
			<SidebarHeader />

			<TabPanel
				className="nfd-tab-panel"
				activeClass="nfd-is-active"
				// onSelect={(e) => console.log(e)}
				tabs={[
					{
						name: 'patterns',
						title: __('Patterns', 'nfd-patterns'),
					},
					{
						name: 'templates',
						title: __('Templates', 'nfd-patterns'),
					},
				]}
			>
				{(tab) => <div className="nfd-px-6 nfd-py-4">{tab.title}</div>}
			</TabPanel>

			<div className="nfd-px-6">
				<SearchControl
					className="nfd-search-component"
					placeholder="Search Patterns"
					ref={searchRef}
					value={searchValue}
					onChange={(value) => setSearchValue(value)}
				/>
			</div>
		</aside>
	);
};

export default Sidebar;
