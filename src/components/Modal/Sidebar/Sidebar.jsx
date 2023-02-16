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
		<div className="nfd-flex nfd-w-full nfd-max-w-[290px] nfd-shrink-0 nfd-flex-col nfd-border-0 nfd-border-solid md:nfd-border-r md:nfd-border-black/10">
			<Logo />

			<TabPanel
				className="nfd-cloud-patterns-tab-panel nfd-flex nfd-grow nfd-flex-col"
				activeClass="nfd-cloud-patterns--is-active"
				initialTabName={selectedTab}
				onSelect={(tab) => {
					setSelectedTab(tab);
				}}
				tabs={[
					{
						name: 'patterns',
						title: __('Patterns', 'nfd-cloud-patterns'),
					},
					{
						name: 'templates',
						title: __('Templates', 'nfd-cloud-patterns'),
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
