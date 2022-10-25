/**
 * WordPress dependencies
 */
import { Modal, SearchControl } from '@wordpress/components';
import { useRef, useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Icon, symbol } from '@wordpress/icons';

const LibraryModal = ({ onClose }) => {
	const [searchValue, setSearchValue] = useState('');
	const searchField = useRef(null);

	// Focus the search field on component mount.
	useEffect(() => {
		setSearchValue('');
		searchField.current.focus();
	}, [setSearchValue]);

	return (
		<Modal
			title={<ModalTitle />}
			aria-expanded={true}
			className="nfd-patterns-library__modal nfd-h-full nfd-max-h-full nfd-w-[1400px] nfd-max-w-full nfd-shadow-none sm:nfd-max-h-[90%] md:nfd-max-w-[90%]"
			onRequestClose={onClose}
		>
			<div className="nfd-patterns-library__content nfd-grid nfd-grid-cols-1 nfd-overflow-hidden md:nfd-grid-cols-libraryModal">
				<aside className="nfd-flex nfd-flex-col nfd-overflow-auto nfd-bg-gray-100 nfd-px-4 nfd-py-6">
					<SearchControl
						className="nfd-search-component"
						placeholder="Search Patterns"
						ref={searchField}
						value={searchValue}
						onChange={(value) => setSearchValue(value)}
					/>

					<div className="nfd-flex nfd-flex-col nfd-px-4">
						<a href="#">Pricing</a>
						<a href="#">Team Members</a>
						<a href="#">Gallery</a>
					</div>
				</aside>

				<div className="nfd-flex nfd-flex-col nfd-overflow-auto nfd-px-8 nfd-py-6 nfd-shadow-content">
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
					<p>Hello World</p>
				</div>
			</div>
		</Modal>
	);
};

const ModalTitle = () => {
	return (
		<div className="nfd-flex nfd-items-center nfd-gap-2">
			<Icon size={24} icon={symbol} />
			{__('Cloud Patterns Library', 'cloud-patterns')}
		</div>
	);
};

export default LibraryModal;
