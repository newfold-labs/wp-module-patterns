/**
 * WordPress dependencies
 */
import { TabPanel } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { memo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { store as nfdPatternsStore } from "../../../store";
import Logo from "../../Logo";
import Categories from "./Categories";

const Sidebar = ({ isSiteEditor = false }) => {
	const { setActiveTab, setShouldResetKeywords } = useDispatch(nfdPatternsStore);

	const { activeTab } = useSelect((select) => {
		return {
			activeTab: select(nfdPatternsStore).getActiveTab(),
		};
	});

	return (
		<div className="nfd-wba-mx-4 nfd-wba-mt-1 nfd-wba-flex nfd-wba-shrink-0 nfd-wba-flex-col nfd-wba-border-0 sm:nfd-wba-row-span-2 sm:nfd-wba-mx-0 sm:nfd-wba-mt-0 sm:nfd-wba-w-full sm:nfd-wba-overflow-y-auto sm:nfd-wba-border-r sm:nfd-wba-border-solid sm:nfd-wba-border-grey-b">
			<div className="nfd-wba-modal__header nfd-wba-modal__sidebar-header nfd-wba-justify-center nfd-wba-rounded-t nfd-wba-border !nfd-wba-border-b-0 nfd-wba-border-solid nfd-wba-border-grey-b sm:nfd-wba-justify-start sm:nfd-wba-rounded-none sm:nfd-wba-border-none">
				<Logo />
			</div>

			<TabPanel
				className="nfd-wba-tab-panel nfd-wba-z-10 nfd-wba-flex nfd-wba-grow nfd-wba-flex-col"
				activeClass="nfd-wba--is-active"
				initialTabName={activeTab}
				onSelect={(tab) => {
					setActiveTab(tab);
					setShouldResetKeywords(true);
				}}
				tabs={[
					{
						name: "patterns",
						title: __("Patterns", "nfd-wonder-blocks"),
					},
					{
						name: "templates",
						title: __("Templates", "nfd-wonder-blocks"),
					},
				]}
			>
				{(tab) => <Categories isSiteEditor={isSiteEditor} type={tab.name} />}
			</TabPanel>
		</div>
	);
};

export default memo(Sidebar);
