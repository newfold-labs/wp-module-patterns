/**
 * WordPress dependencies
 */
import { forwardRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { store as nfdPatternsStore } from '../../../store';

const ListElement = forwardRef(
	({ category, className, ...otherProps }, ref) => {
		const { activePatternCategory } = useSelect((select) => ({
			activePatternCategory:
				select(nfdPatternsStore).getActivePatternCategory(),
		}));

		return (
			<li className="nfd-wba-m-0 nfd-wba-p-0">
				<button
					className={classNames(
						'nfd-wba-list-element nfd-wba-relative nfd-wba-flex nfd-wba-min-h-[43px] nfd-wba-w-full nfd-wba-select-none nfd-wba-items-center nfd-wba-justify-between nfd-wba-gap-x-2 nfd-wba-rounded-none nfd-wba-border-0 nfd-wba-bg-transparent nfd-wba-py-2 nfd-wba-pl-6 nfd-wba-transition-all nfd-wba-duration-100',
						category?.count && 'nfd-wba-pr-4',
						!category?.count && 'nfd-wba-pr-6',
						activePatternCategory !== category?.title &&
							'nfd-wba-cursor-pointer nfd-wba-text-current hover:nfd-wba-bg-grey/30 hover:nfd-wba-text-dark', // inactive
						activePatternCategory === category?.title &&
							'nfd-wba--is-active nfd-wba-pointer-events-none nfd-wba-text-brand', // active
						className
					)}
					type="button"
					ref={ref}
					{...otherProps}
				>
					<span className="nfd-wba-text-left">{category?.label}</span>

					{category?.count && (
						<span className="nfd-wba-rounded-full nfd-wba-bg-grey nfd-wba-py-1 nfd-wba-px-3 nfd-wba-text-sm nfd-wba-text-dark-lighter">
							{category.count}
						</span>
					)}
				</button>
			</li>
		);
	}
);
export default ListElement;
ListElement.displayName = 'ListElement';
