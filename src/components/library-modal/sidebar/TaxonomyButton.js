/**
 * WordPress dependencies
 */
import classnames from 'classnames';
import { Button } from '@wordpress/components';

const TaxonomyButton = ({ children, className, icon, ...args }) => {
	return (
		<Button
			{...args}
			icon={icon}
			className={classnames(
				'nfd-h-10 nfd-w-full hover:nfd-bg-gray-100 focus:!nfd-shadow-none focus-visible:nfd-ring-2 focus-visible:nfd-ring-wp-admin focus-visible:nfd-ring-offset-2',
				!!icon && '!nfd-pr-4',
				className
			)}
		>
			{children}
		</Button>
	);
};
export default TaxonomyButton;
