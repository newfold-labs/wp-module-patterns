/**
 * Internal dependencies
 */
import SidebarHeader from './SidebarHeader';
import PatternsSidebar from './PatternsSidebar';
import TemplatesSidebar from './TemplatesSidebar';
import { LibraryModalContext } from '../../../context/library-modal-context';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useContext } from '@wordpress/element';
import { TabPanel, Button } from '@wordpress/components';

const Sidebar = () => {
	const { setSelectedTab } = useContext(LibraryModalContext);

	return (
		<aside className="nfd-flex nfd-flex-col nfd-overflow-auto nfd-bg-white nfd-shadow-sidebar">
			<SidebarHeader />

			<TabPanel
				className="nfd-tab-panel"
				activeClass="nfd-is-active"
				onSelect={(tab) => {
					setSelectedTab(tab);
				}}
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
				{(tab) => (
					<div className="nfd-p-6">
						{tab.name === 'patterns' && <PatternsSidebar />}
						{tab.name === 'templates' && <TemplatesSidebar />}
					</div>
				)}
			</TabPanel>

			<div className="nfd-pointer-events-none nfd-sticky nfd-bottom-[-12px] nfd-z-20 nfd-mt-auto nfd-flex nfd-items-center nfd-bg-gradient-to-t nfd-from-white nfd-to-transparent nfd-px-6 nfd-pb-6 nfd-pt-8">
				<Button
					iconPosition="left"
					icon={DotsIcon}
					className="nfd-pointer-events-auto nfd-flex nfd-h-11 nfd-grow nfd-flex-row-reverse nfd-items-center !nfd-justify-between nfd-rounded-sm nfd-bg-gray-100 !nfd-pl-3 !nfd-pr-1"
				>
					<span>Online Store</span>
				</Button>
			</div>
		</aside>
	);
};

const DotsIcon = () => {
	return (
		<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
			<path d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z"></path>
			<path d="M9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z"></path>
			<path d="M17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11C16.5523 11 17 11.4477 17 12Z"></path>
		</svg>
	);
};

export default Sidebar;
