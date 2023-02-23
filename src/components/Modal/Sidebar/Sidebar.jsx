/**
 * WordPress dependencies
 */
import { TabPanel } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { store as nfdPatternsStore } from '../../../store';
import Logo from '../../Logo';
import Categories from './Categories';

const Sidebar = ({ isSiteEditor }) => {
	const { setActiveTab } = useDispatch(nfdPatternsStore);

	const { activeTab } = useSelect((select) => {
		return {
			activeTab: select(nfdPatternsStore).getActiveTab(),
		};
	});

	return (
		<div className="nfd-wba-flex nfd-wba-w-full nfd-wba-max-w-[var(--nfd-wba-sidebar-width)] nfd-wba-shrink-0 nfd-wba-flex-col nfd-wba-overflow-y-auto nfd-wba-border-0 nfd-wba-border-r nfd-wba-border-solid nfd-wba-border-grey-b">
			<div className="nfd-wba-modal__header nfd-wba-justify-start">
				<Logo />
			</div>

			<TabPanel
				className="nfd-wba-tab-panel nfd-wba-flex nfd-wba-grow nfd-wba-flex-col"
				activeClass="nfd-wba--is-active"
				initialTabName={activeTab}
				onSelect={(tab) => {
					setActiveTab(tab);
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
