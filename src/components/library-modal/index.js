/**
 * Internal dependencies
 */
import { subscribe, unsubscribe } from '../../helpers/events';
import DesignsList from './DesignsList';
import ContentHeader from './ContentHeader';
import Sidebar from './sidebar/Sidebar';

/**
 * WordPress dependencies
 */
import { Modal } from '@wordpress/components';
import { useEffect, useState, useCallback } from '@wordpress/element';

const LibraryModal = () => {
	const [modalOpen, setModalOpen] = useState(false);

	/**
	 * Open modal.
	 */
	const openModal = useCallback(() => {
		setModalOpen(true);
	}, [setModalOpen]);

	/**
	 * Close modal.
	 */
	const closeModal = useCallback(() => {
		setModalOpen(false);
	}, [setModalOpen]);

	// Allow Patterns Library modal to be opened by dispatching custom event.
	useEffect(() => {
		subscribe('nfd/cloudPatterns/openLibrary', openModal);
		subscribe('nfd/cloudPatterns/closeLibrary', closeModal);

		return () => {
			unsubscribe('nfd/cloudPatterns/openLibrary', openModal);
			unsubscribe('nfd/cloudPatterns/closeLibrary', closeModal);
		};
	}, []);

	if (!modalOpen) {
		return null;
	}

	return (
		<Modal
			__experimentalHideHeader={true}
			aria-expanded={true}
			className="nfd-patterns-library__modal nfd-shadow-none sm:nfd-max-h-[90%] md:nfd-max-w-[90%]"
			onRequestClose={closeModal}
			isFullScreen={true}
		>
			<div className="nfd-patterns-library__content nfd-grid nfd-grid-cols-1 nfd-overflow-hidden nfd-bg-gray-50 md:nfd-grid-cols-libraryModal">
				<Sidebar />

				<div className="nfd-flex nfd-flex-col nfd-overflow-auto">
					<ContentHeader />
					<DesignsList />
				</div>
			</div>
		</Modal>
	);
};

export default LibraryModal;
