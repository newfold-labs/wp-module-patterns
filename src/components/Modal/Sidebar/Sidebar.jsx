/**
 * WordPress dependencies
 */
import { TabPanel } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Logo from '../../Logo';
import Categories from './Categories';

const Sidebar = ({ selectedTab, setSelectedTab, isSiteEditor }) => {
	return (
		<div className="nfd-wba-flex nfd-wba-w-full nfd-wba-max-w-[var(--nfd-wba-sidebar-width)] nfd-wba-shrink-0 nfd-wba-flex-col nfd-wba-overflow-y-auto nfd-wba-border-0 nfd-wba-border-r nfd-wba-border-solid nfd-wba-border-grey-b">
			<div className="nfd-wba-modal__header nfd-wba-justify-start">
				<Logo />
			</div>

			<TabPanel
				className="nfd-wba-tab-panel nfd-wba-flex nfd-wba-grow nfd-wba-flex-col"
				activeClass="nfd-wba--is-active"
				initialTabName={selectedTab}
				onSelect={(tab) => {
					setSelectedTab(tab);
				}}
				tabs={[
					{
						name: 'patterns',
						title: __('Patterns', 'nfd-wonder-blocks'),
					},
					{
						name: 'templates',
						title: __('Templates', 'nfd-wonder-blocks'),
					},
				]}
			>
				{(tab) => (
					<>
						<Categories
							isSiteEditor={isSiteEditor}
							type={tab.name}
						/>
					</>
				)}
			</TabPanel>
		</div>
	);
};

export default Sidebar;
