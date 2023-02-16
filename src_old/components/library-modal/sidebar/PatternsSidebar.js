/**
 * Internal dependencies
 */
import TaxonomyList from './TaxonomyList';
import { LibraryModalContext } from '../../../context/library-modal-context';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useRef, useEffect, useContext } from '@wordpress/element';
import { SearchControl, Button } from '@wordpress/components';

const PatternsSidebar = () => {
	const searchRef = useRef(null);
	const categories = [
		{
			id: 12345,
			label: 'Headers',
			title: 'headers',
			count: 12,
		},
		{
			id: 22345,
			label: 'Footers',
			title: 'footer',
			count: 8,
		},
		{
			id: 32345,
			label: 'Hero',
			title: 'hero',
			count: 18,
		},
		{
			id: 42345,
			label: 'About',
			title: 'about',
			count: 21,
		},
		{
			id: 52345,
			label: 'Testimonials',
			title: 'testimonials',
			count: 12,
		},
		{
			id: 62345,
			label: 'Call to Action',
			title: 'call-to-action',
			count: 25,
		},
		{
			id: 72345,
			label: 'Gallery',
			title: 'gallery',
			count: 12,
		},
		{
			id: 82345,
			label: 'Team',
			title: 'team',
			count: 7,
		},
		{
			id: 823451,
			label: 'Pricing',
			title: 'pricing',
			count: 10,
		},
		{
			id: 823452,
			label: 'FAQ',
			title: 'faq',
			count: 10,
		},
	];

	const {
		selectedTaxonomy,
		setSelectedTaxonomy,
		searchValue,
		setSearchValue,
	} = useContext(LibraryModalContext);

	// Focus the search field on component mount.
	useEffect(() => {
		searchRef?.current?.focus();
	}, []);

	return (
		<>
			<SearchControl
				className="nfd-search-component nfd-m-0"
				placeholder={__('Search Patterns', 'nfd-patterns')}
				ref={searchRef}
				value={searchValue}
				onChange={(value) => setSearchValue(value)}
			/>

			{/* Taxonomies */}
			<ul className="nfd-m-0 nfd-mt-8 nfd-flex nfd-list-none nfd-flex-col nfd-gap-[2px] nfd-p-0">
				<li className="nfd-m-0">
					<Button
						className="nfd-flex nfd-w-full !nfd-pr-4 hover:nfd-bg-gray-100 focus:!nfd-shadow-none focus-visible:nfd-ring-2 focus-visible:nfd-ring-wp-admin focus-visible:nfd-ring-offset-2"
						isPressed={selectedTaxonomy === 'featured'}
						onClick={() => setSelectedTaxonomy('featured')}
						icon={
							<svg
								width="24"
								height="24"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									className="nfd-fill-none"
									d="M12 4.75L13.75 10.25H19.25L14.75 13.75L16.25 19.25L12 15.75L7.75 19.25L9.25 13.75L4.75 10.25H10.25L12 4.75Z"
								></path>
							</svg>
						}
					>
						<div className="nfd-flex nfd-grow nfd-items-center nfd-justify-between nfd-gap-2">
							<span>Featured</span>
							<span className="nfd-opacity-50 group-hover:nfd-opacity-100">
								183
							</span>
						</div>
					</Button>
				</li>

				<li className="nfd-m-0">
					<Button
						className="nfd-flex nfd-h-10 nfd-w-full !nfd-pr-4 hover:nfd-bg-gray-100 focus:!nfd-shadow-none focus-visible:nfd-ring-2 focus-visible:nfd-ring-wp-admin focus-visible:nfd-ring-offset-2"
						isPressed={selectedTaxonomy === 'favorites'}
						onClick={() => setSelectedTaxonomy('favorites')}
						icon={
							<svg
								width="24"
								height="24"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									fillRule="evenodd"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="1.5"
									className="nfd-fill-none"
									d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z"
									clipRule="evenodd"
								></path>
							</svg>
						}
					>
						<div className="nfd-flex nfd-grow nfd-items-center nfd-justify-between nfd-gap-2">
							<span>Favorites</span>
							<span className="nfd-opacity-50 group-hover:nfd-opacity-100">
								7
							</span>
						</div>
					</Button>
				</li>
			</ul>

			<h2 className="block-editor-inserter__panel-title nfd-mt-8 nfd-pl-3">
				Categories
			</h2>

			<TaxonomyList
				taxonomies={categories}
				selectedTaxonomy={selectedTaxonomy}
				setSelectedTaxonomy={setSelectedTaxonomy}
			/>
		</>
	);
};

export default PatternsSidebar;
