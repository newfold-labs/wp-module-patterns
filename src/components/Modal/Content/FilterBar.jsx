/**
 * External dependencies
 */
import {
	ArrowUpDownIcon,
	Columns2Icon,
	Columns3Icon,
	Columns4Icon,
	Grid2X2Icon,
} from "lucide-react";

/**
 * WordPress dependencies
 */
import { DropdownMenu } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import { store as nfdPatternsStore } from "../../../store";
import KeywordFilter from "./Header/KeywordFilter";

const FilterBar = () => {
	const { setModalGridColumns } = useDispatch(nfdPatternsStore);

	const { gridColumns } = useSelect((select) => ({
		gridColumns: select(nfdPatternsStore).getModalGridColumns(),
	}));

	return (
		<div className="nfd-wba-modal__content-filter">
			<KeywordFilter />

			<div className="nfd-wba-flex nfd-wba-items-center nfd-wba-gap-x-2">
				<DropdownMenu
					icon={<ArrowUpDownIcon className="!nfd-wba-fill-none nfd-wba-w-4 nfd-wba-h-4" />}
					toggleProps={{
						className: "!nfd-wba-px-3",
						children: <span className="nfd-wba-ml-2">{__("Sort", "nfd-wonder-blocks")}</span>,
					}}
					label={__("Sort", "nfd-wonder-blocks")}
					popoverProps={{
						className: "nfd-wba-filter-dropdown",
					}}
					controls={[
						{
							title: __("Newest", "nfd-wonder-blocks"),
							onClick: () => console.log("newest"),
						},
						{
							title: __("Oldest", "nfd-wonder-blocks"),
							onClick: () => console.log("oldest"),
						},
					]}
				/>

				<DropdownMenu
					icon={<Grid2X2Icon className="!nfd-wba-fill-none nfd-wba-w-4 nfd-wba-h-4" />}
					toggleProps={{
						className: "!nfd-wba-px-3",
						children: <span className="nfd-wba-ml-2">{__("Grid View", "nfd-wonder-blocks")}</span>,
					}}
					popoverProps={{
						className: "nfd-wba-filter-dropdown",
					}}
					label={__("Grid View", "nfd-wonder-blocks")}
					controls={[
						{
							title: __("2 columns", "nfd-wonder-blocks"),
							icon: <Columns2Icon className="nfd-wba-w-4 nfd-wba-h-4 !nfd-wba-fill-none" />,
							onClick: () => setModalGridColumns(2),
							isActive: 2 === gridColumns,
						},
						{
							title: __("3 columns", "nfd-wonder-blocks"),
							icon: <Columns3Icon className="nfd-wba-w-4 nfd-wba-h-4 !nfd-wba-fill-none" />,
							onClick: () => setModalGridColumns(3),
							isActive: 3 === gridColumns,
						},
						{
							title: __("4 columns", "nfd-wonder-blocks"),
							icon: <Columns4Icon className="nfd-wba-w-4 nfd-wba-h-4 !nfd-wba-fill-none" />,
							onClick: () => setModalGridColumns(4),
							isActive: 4 === gridColumns,
						},
					]}
				/>
			</div>
		</div>
	);
};

export default FilterBar;
