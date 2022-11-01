/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import classnames from 'classnames';

const TaxonomyList = ({
	taxonomies,
	className,
	selectedTaxonomy,
	setSelectedTaxonomy,
}) => {
	return (
		<ul
			className={classnames(
				'nfd-m-0 nfd-mt-4 nfd-flex nfd-list-none nfd-flex-col nfd-gap-[2px] nfd-p-0',
				className
			)}
		>
			{taxonomies.map((taxonomy) => (
				<li key={taxonomy.id} className="nfd-m-0">
					<Button
						className="nfd-group nfd-flex nfd-w-full hover:nfd-bg-gray-100  focus:!nfd-shadow-none focus-visible:nfd-ring-2 focus-visible:nfd-ring-wp-admin focus-visible:nfd-ring-offset-2"
						isPressed={selectedTaxonomy === taxonomy.title}
						onClick={() => setSelectedTaxonomy(taxonomy.title)}
					>
						<div className="nfd-flex nfd-grow nfd-items-center nfd-justify-between nfd-gap-2">
							<span>{taxonomy.label}</span>
							{taxonomy.count && (
								<span className="nfd-opacity-50 group-hover:nfd-opacity-100">
									{taxonomy.count}
								</span>
							)}
						</div>
					</Button>
				</li>
			))}
		</ul>
	);
};
export default TaxonomyList;
