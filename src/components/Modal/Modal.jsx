/**
 * WordPress dependencies
 */
import { Modal as WPModal } from '@wordpress/components';
import { dispatch, useSelect } from '@wordpress/data';
import { useMemo, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { store as nfdPatternsStore } from '../../store';
import Content from './Content/Content';
import Sidebar from './Sidebar/Sidebar';

const Modal = () => {
	const [selectedTab, setSelectedTab] = useState('patterns');

	// Check if we are editing a template, via site editor or page.
	const { editedPostType, isModalOpen, getEditedPostId, isEditingTemplate } =
		useSelect((select) => ({
			editedPostType: select('core/edit-site')?.getEditedPostType(),
			getEditedPostId: select('core/edit-site')?.getEditedPostId(),
			isEditingTemplate: select('core/edit-post')?.isEditingTemplate(),
			isModalOpen: select(nfdPatternsStore).isModalOpen(),
		}));

	// Check if we are editing a template, via page or site editor.
	const isSiteEditor = useMemo(() => {
		return isEditingTemplate || !!editedPostType;
	}, [isEditingTemplate, editedPostType]);

	if (!isModalOpen) {
		return null;
	}

	return (
		<WPModal
			__experimentalHideHeader={true}
			aria-expanded={true}
			className="nfd-cloud-patterns-modal nfd-shadow-none sm:nfd-max-h-[90%] md:nfd-max-w-[90%]"
			onRequestClose={() =>
				dispatch(nfdPatternsStore).setIsModalOpen(false)
			}
			isFullScreen={true}
		>
			<div className="nfd-flex nfd-grow nfd-flex-wrap nfd-bg-white lg:nfd-flex-nowrap">
				<Sidebar
					selectedTab={selectedTab}
					setSelectedTab={setSelectedTab}
				/>

				<Content selectedTab={selectedTab} />
			</div>
		</WPModal>
	);
};
export default Modal;
