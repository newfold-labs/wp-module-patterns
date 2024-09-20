/**
 * External dependencies
 */
import { EllipsisVerticalIcon, HeartIcon, InfoIcon, StoreIcon } from "lucide-react";
import classNames from "classnames";

/**
 * WordPress dependencies
 */
import { Button, DropdownMenu } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { close } from "@wordpress/icons";

/**
 * Internal dependencies
 */
import useSetCurrentView from "../../../../hooks/useSetCurrentView";
import { store as nfdPatternsStore } from "../../../../store";
import KeywordFilter from "../KeywordFilter";
import TrialNotice from "./TrialNotice";

const Header = () => {
	const showTrial = true;

	const [isFavoritesView, setIsFavoritesView] = useState(false);
	const {
		setIsModalOpen,
		setActivePatternsCategory,
		setActiveTemplatesCategory,
		setShouldResetKeywords,
	} = useDispatch(nfdPatternsStore);

	const { activeTab, activePatternsCategory, activeTemplatesCategory, keywords } = useSelect(
		(select) => ({
			activePatternsCategory: select(nfdPatternsStore).getActivePatternsCategory(),
			activeTemplatesCategory: select(nfdPatternsStore).getActiveTemplatesCategory(),
			keywords: select(nfdPatternsStore).getKeywordsFilter(),
			activeTab: select(nfdPatternsStore).getActiveTab(),
		})
	);

	const setCurrentView = useSetCurrentView();

	useEffect(() => {
		if (keywords) {
			setIsFavoritesView(false);
		} else if ("patterns" === activeTab && "favorites" === activePatternsCategory) {
			setIsFavoritesView(true);
		} else if ("templates" === activeTab && "favorites" === activeTemplatesCategory) {
			setIsFavoritesView(true);
		} else {
			setIsFavoritesView(false);
		}
	}, [activeTab, keywords, activePatternsCategory, activeTemplatesCategory, setIsFavoritesView]);

	return (
		<header className="nfd-wba-modal__header">
			<KeywordFilter />

			<div className="nfd-items-center nfd-wba-ml-auto nfd-wba-flex nfd-wba-gap-x-1">
				{showTrial && <TrialNotice />}

				<button
					className={classNames(
						"nfd-wba-cursor-pointer nfd-wba-border-none nfd-wba-bg-transparent focus-visible:nfd-wba-outline-brand hover:nfd-wba-text-brand hover:nfd-wba-border-brand nfd-wba-p-2",
						isFavoritesView ? "nfd-wba-text-brand nfd-wba-font-semibold" : ""
					)}
					onClick={() => {
						if ("templates" === activeTab) {
							setActiveTemplatesCategory("favorites");
							setActivePatternsCategory(null);
						} else if ("patterns" === activeTab) {
							setActivePatternsCategory("favorites");
							setActiveTemplatesCategory(null);
						}
						setShouldResetKeywords(true);
					}}
				>
					<span className="nfd-wba-flex nfd-wba-items-center nfd-wba-gap-2 nfd-wba-text-left nfd-wba-text-[14px]">
						<HeartIcon className="!nfd-wba-fill-none nfd-wba-shrink-0 nfd-wba-size-5" />
						<span>{__("Favorites", "nfd-wonder-blocks")}</span>
					</span>
				</button>

				<DropdownMenu
					icon={<EllipsisVerticalIcon className="!nfd-wba-fill-none nfd-wba-w-4 nfd-wba-h-4" />}
					toggleProps={{
						className: "!nfd-wba-px-3",
					}}
					popoverProps={{
						className: "nfd-wba-filter-dropdown",
					}}
					label={__("WonderBlocks Menu", "nfd-wonder-blocks")}
					controls={[
						{
							title: __("Info", "nfd-wonder-blocks"),
							icon: <InfoIcon className="nfd-wba-w-4 nfd-wba-h-4 !nfd-wba-fill-none" />,
							onClick: () => setCurrentView("info"),
						},
						{
							title: __("About", "nfd-wonder-blocks"),
							icon: <StoreIcon className="nfd-wba-w-4 nfd-wba-h-4 !nfd-wba-fill-none" />,
							onClick: () => setCurrentView("about"),
						},
					]}
				/>

				<Button
					className="nfd-wba-ml-auto nfd-wba-text-current hover:nfd-wba-text-dark"
					showTooltip={true}
					onClick={() => {
						setIsModalOpen(false);
					}}
					icon={close}
					iconSize={24}
					label={__("Close dialog", "nfd-wonder-blocks")}
				/>
			</div>
		</header>
	);
};
export default Header;
