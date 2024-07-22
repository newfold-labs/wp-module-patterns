/**
 * WordPress dependencies
 */

import { forwardRef } from "@wordpress/element";

/**
 * External dependencies
 */
import classNames from "classnames";

const ListElement = forwardRef(({ category, className, icon, isActive, ...otherProps }, ref) => {
	const categoryCount = category?.count ?? null; // 0 is a valid count.

	return (
		<li className="nfd-wba-m-0 nfd-wba-p-0">
			<button
				className={classNames(
					"nfd-wba-list-element nfd-wba-relative nfd-wba-flex nfd-wba-min-h-10 nfd-wba-w-full nfd-wba-select-none nfd-wba-items-center nfd-wba-justify-between nfd-wba-gap-x-2 nfd-wba-rounded-none nfd-wba-border-0 nfd-wba-bg-transparent nfd-wba-py-1 nfd-wba-pl-6 nfd-wba-text-[15px] focus-visible:nfd-wba-outline-brand",
					categoryCount !== null && "nfd-wba-pr-5",
					categoryCount === null && "nfd-wba-pr-6",
					!isActive && "nfd-wba-cursor-pointer nfd-wba-text-current hover:nfd-wba-text-brand", // inactive
					isActive &&
						"nfd-wba--is-active nfd-wba-pointer-events-none nfd-wba-font-medium nfd-wba-text-brand", // active
					className
				)}
				type="button"
				ref={ref}
				{...otherProps}
			>
				<span className="nfd-wba-flex nfd-wba-items-center nfd-wba-gap-3 nfd-wba-text-left">
					{icon && icon}
					<span>{category?.label}</span>
				</span>

				{categoryCount !== null && (
					<span
						className={classNames(
							"nfd-wba-list-element__count nfd-wba-px-2.5 nfd-wba-py-1 nfd-wba-text-sm nfd-wba-text-dark-lighter",
							category?.title !== "favorites" && "nfd-wba-rounded-full nfd-wba-bg-gray-100"
						)}
					>
						{categoryCount}
					</span>
				)}
			</button>
		</li>
	);
});

export default ListElement;
ListElement.displayName = "ListElement";
