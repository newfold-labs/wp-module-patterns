/**
 * WordPress dependencies
 */
import { TabPanel } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Logo from './Logo';
import PatternsList from './PatternsList';
import TemplatesList from './TemplatesList';

const Sidebar = ({ selectedTab, setSelectedTab }) => {
	return (
		<div className="nfd-wba-flex nfd-wba-w-full nfd-wba-max-w-[var(--nfd-wba-sidebar-width)] nfd-wba-shrink-0 nfd-wba-flex-col nfd-wba-border-0 nfd-wba-border-solid md:nfd-wba-border-r md:nfd-wba-border-black/10">
			<Logo />

			<TabPanel
				className="nfd-wba-tab-panel nfd-wba-flex nfd-wba-grow nfd-wba-flex-col nfd-wba-border-0 nfd-wba-border-t nfd-wba-border-solid nfd-wba-border-black/10"
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
						{tab?.name === 'patterns' && <PatternsList />}
						{tab?.name === 'templates' && <TemplatesList />}
					</>
				)}
			</TabPanel>
		</div>
	);
};

export default Sidebar;
