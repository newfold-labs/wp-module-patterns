import { forwardRef } from '@wordpress/element';
import classNames from 'classnames';

const ListItem = forwardRef(({ category, className, ...otherProps }, ref) => {
	return (
		<li className="nfd-m-0 nfd-p-0">
			<button
				className={classNames(
					'nfd-cloud-patterns-list-item nfd-relative nfd-flex nfd-w-full nfd-cursor-pointer nfd-items-center nfd-justify-between nfd-gap-x-2 nfd-rounded-none nfd-border-0 nfd-bg-transparent nfd-px-6 nfd-py-2 before:nfd-absolute hover:nfd-bg-gray-100',
					className
				)}
				type="button"
				ref={ref}
				{...otherProps}
			>
				<span>{category?.label}</span>

				{category?.count && (
					<span className="nfd-rounded-full nfd-bg-gray-100 nfd-py-1 nfd-px-2">
						{category.count}
					</span>
				)}
			</button>
		</li>
	);
});
export default ListItem;
ListItem.displayName = 'ListItem';
