/**
 * WordPress dependencies
 */
import { TabPanel } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { memo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Icon, starEmpty } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { store as nfdPatternsStore } from '../../../store';
import Logo from '../../Logo';
import useFavorites from '../../../hooks/useFavorites';
import Categories from './Categories';
import ListElement from './ListElement';

const Sidebar = ({ isSiteEditor }) => {
	const { setActiveTab } = useDispatch(nfdPatternsStore);
	const { data: favoritesData } = useFavorites();

	// Store actions and states.
	const { setActivePatternsCategory, setActiveTemplatesCategory } =
		useDispatch(nfdPatternsStore);

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

			<ul className="nfd-wba-m-0 nfd-wba-flex nfd-wba-list-none nfd-wba-flex-col nfd-wba-p-0 nfd-wba-text-md nfd-wba-leading-5">
				{/* Add Favorites list element. Depends on the type. */}
				<ListElement
					className="nfd-wba-mt-4"
					category={{
						id: `favorites`,
						label: __('Favorites', 'nfd-wonder-blocks'),
						title: 'favorites',
						count: favoritesData?.length,
					}}
					categoryType={activeTab}
					icon={
						<Icon
							fill="currentColor"
							className="-nfd-wba-ml-1"
							icon={starEmpty}
						/>
					}
					onClick={() => {
						setActivePatternsCategory('favorites');
						setActiveTemplatesCategory('favorites');
					}}
				/>
			</ul>

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
							type={tab.name} // "patterns" | "templates"
						/>
					</>
				)}
			</TabPanel>
		</div>
	);
};

export default memo(Sidebar);
