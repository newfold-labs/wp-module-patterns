/**
 * External dependencies
 */
import classNames from "classnames";

/**
 * WordPress dependencies
 */
import { ToolbarButton as WPToolbarButton } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { Icon } from "@wordpress/icons";
import { rectangleGroup } from "./Icons";

/**
 * Internal dependencies
 */
import { BRAND_NAME } from "../constants";
import { trackHiiveEvent } from "../helpers";
import { store as nfdPatternsStore } from "../store";

const ToolbarButton = () => {
	const { isModalOpen } = useSelect((select) => ({
		isModalOpen: select(nfdPatternsStore).isModalOpen(),
	}));

	const { setIsModalOpen } = useDispatch(nfdPatternsStore);

	return (
		<WPToolbarButton
			icon={<Icon icon={rectangleGroup} />}
			className={classNames(
				"nfd-wba-gap-1 nfd-wba-mr-2 nfd-wba-flex !nfd-wba-h-9 !nfd-wba-min-w-[36px] nfd-wba-shrink-0 nfd-wba-bg-brand !nfd-wba-p-0 nfd-wba-text-white hover:nfd-wba-bg-brand-darker hover:!nfd-wba-text-white focus-visible:nfd-wba-text-white active:nfd-wba-bg-brand-darker-10 active:!nfd-wba-text-white lg:!nfd-wba-pl-3 lg:!nfd-wba-pr-[15px]",
				isModalOpen && "!nfd-wba-bg-dark nfd-wba-text-white"
			)}
			isPressed={isModalOpen}
			onClick={() => {
				trackHiiveEvent("modal_open", {
					label_key: "trigger",
					trigger: "toolbarButton",
				});

				setIsModalOpen(true);
			}}
		>
			<span className="nfd-wba-ml-0.5 nfd-wba-hidden lg:nfd-wba-inline">{BRAND_NAME}</span>
		</WPToolbarButton>
	);
};

export default ToolbarButton;
