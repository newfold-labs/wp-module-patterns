/**
 * WordPress dependencies
 */

import { forwardRef } from "@wordpress/element";

/**
 * External dependencies
 */
import classNames from "classnames";

const CategoryButton = forwardRef(({ category, className, icon, isActive, ...otherProps }, ref) => {
	return (
		<button
			className={classNames(
				"nfd-wba-text-base nfd-wba-pl-5 nfd-wba-pr-6 nfd-wba-py-3 nfd-wba-rounded-[4px] nfd-wba-cursor-pointer nfd-wba-border nfd-wba-bg-transparent nfd-wba-border-solid focus-visible:nfd-wba-outline-brand nfd-wba-border-grey-b nfd-wba-text-current hover:nfd-wba-text-brand hover:nfd-wba-border-brand",
				className
			)}
			type="button"
			ref={ref}
			{...otherProps}
		>
			<span className="nfd-wba-flex nfd-wba-items-center nfd-wba-gap-2 nfd-wba-text-left">
				{icon && icon}
				<span>{category}</span>
			</span>
		</button>
	);
});

export default CategoryButton;
CategoryButton.displayName = "CategoryButton";
