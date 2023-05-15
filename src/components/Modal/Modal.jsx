/**
 * WordPress dependencies
 */
import { Modal as WPModal } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { store as nfdPatternsStore } from '../../store';
import Content from './Content/Content';
import Sidebar from './Sidebar/Sidebar';
import Header from './Content/Header/Header';

const Modal = () => {
	const { setIsModalOpen, setActiveTab } = useDispatch(nfdPatternsStore);

	// Check if we are editing a template, via site editor or page.
	const { isModalOpen } = useSelect((select) => ({
		isModalOpen: select(nfdPatternsStore).isModalOpen(),
	}));

	// Check if we should automatically open the modal and pre-select.
	useEffect(() => {
		const searchParams = new URLSearchParams(window?.location?.search);
		let timer;

		if (searchParams.has('wonder-blocks-library')) {
			timer = setTimeout(() => {
				if (searchParams.get('wonder-blocks-library') === 'templates') {
					setActiveTab('templates');
				}

				setIsModalOpen(true);
			}, 300);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [setActiveTab, setIsModalOpen]);

	if (!isModalOpen) {
		return null;
	}

	return (
		<WPModal
			className="nfd-wba-modal nfd-wba-shadow-none sm:nfd-wba-max-h-[90%] md:nfd-wba-max-w-[90%]"
			__experimentalHideHeader={true}
			aria-expanded={true}
			isFullScreen={true}
			onRequestClose={() => setIsModalOpen(false)}
		>
			<div className="nfd-wba-library-modal-grid nfd-wba-grow nfd-wba-bg-white nfd-wba-text-dark-lighter">
				<Sidebar />
				<Header />
				<Content />
			</div>
		</WPModal>
	);
};

export default Modal;
