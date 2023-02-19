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
			className="nfd-wba-modal nfd-wba-shadow-none sm:nfd-wba-max-h-[90%] md:nfd-wba-max-w-[90%]"
			__experimentalHideHeader={true}
			aria-expanded={true}
			isFullScreen={true}
			onRequestClose={() =>
				dispatch(nfdPatternsStore).setIsModalOpen(false)
			}
		>
			<div className="nfd-wba-grid nfd-wba-grow nfd-wba-grid-cols-library-modal nfd-wba-bg-white nfd-wba-text-dark-lighter">
				<Sidebar
					selectedTab={selectedTab}
					setSelectedTab={setSelectedTab}
					isSiteEditor={isSiteEditor}
				/>

				<Content selectedTab={selectedTab} />
			</div>
		</WPModal>
	);
};
export default Modal;
