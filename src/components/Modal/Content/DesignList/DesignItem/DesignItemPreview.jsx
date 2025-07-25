/**
 * WordPress dependencies
 */
import { BlockPreview } from "@wordpress/block-editor";
import { forwardRef } from "@wordpress/element";
import classNames from "classnames";

/**
 * Design Preview Component
 *
 * Handles the block preview
 */
const DesignItemPreview = forwardRef(
	({ previewBlocks, itemType, insertingDesign, insertDesignHandler }, ref) => {
		// Handle keyboard navigation
		const handleKeyUp = (e) => {
			if (e.key === "Enter") {
				insertDesignHandler();
			}
		};

		return (
			<div
				className={classNames(
					"nfd-wba-design-item nfd-wba-flex nfd-wba-min-h-[116px] nfd-wba-cursor-pointer nfd-wba-flex-col nfd-wba-justify-center nfd-wba-bg-white nfd-wba-transition-opacity focus-visible:nfd-wba-outline-2 focus-visible:nfd-wba-outline-brand nfd-wba-rounded",
					itemType === "templates" && "nfd-wba-design-item--template",
					insertingDesign && "nfd-wba-inserting-design"
				)}
				ref={ref}
				role="button"
				tabIndex="0"
				onClick={() => insertDesignHandler()}
				onKeyUp={handleKeyUp}
			>
				{previewBlocks && <BlockPreview blocks={previewBlocks} viewportWidth={1200} />}
			</div>
		);
	}
);

export default DesignItemPreview;
