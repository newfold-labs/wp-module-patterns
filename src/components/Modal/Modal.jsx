/**
 * WordPress dependencies
 */
import { Modal as WPModal } from "@wordpress/components";
import { useDispatch, useSelect } from "@wordpress/data";
import { useEffect, useMemo } from "@wordpress/element";

/**
 * Internal dependencies
 */
import { trackHiiveEvent } from "../../helpers";
import useMonitorBlockOrder from "../../hooks/useMonitorBlockOrder";
import useUpdateThemeClasses from "../../hooks/useUpdateThemeClasses";
import { store as nfdPatternsStore } from "../../store";
import Content from "./Content/Content";
import Header from "./Content/Header/Header";
import Sidebar from "./Sidebar/Sidebar";

const Modal = () => {
	const {
		setIsModalOpen,
		setActiveTab,
		setActivePatternsCategory,
		setActiveTemplatesCategory,
		setSidebarDisplayMode,
	} = useDispatch(nfdPatternsStore);

	const { isModalOpen, isEditingTemplate, editedPostType, currentView, renderingMode } = useSelect(
		(select) => ({
			currentView: select(nfdPatternsStore).getCurrentView(),
			editedPostType: select("core/edit-site")?.getEditedPostType(),
			isEditingTemplate: select("core/editor")?.getCurrentPostType() === "wp_template",
			isModalOpen: select(nfdPatternsStore).isModalOpen(),
		})
	);

	// Check if we are editing a template, via site editor or page.
	const isSiteEditor = useMemo(() => {
		return isEditingTemplate || !!editedPostType;
	}, [isEditingTemplate, editedPostType]);

	// Monitor block order.
	useMonitorBlockOrder();

	// Update theme classes in blocks.
	useUpdateThemeClasses();

	// Check if we should automatically open the modal and pre-select.
	useEffect(() => {
		const searchParams = new URLSearchParams(window?.location?.search);
		let timer;

		if (searchParams.has("wb-library")) {
			timer = setTimeout(() => {
				if (searchParams.get("wb-library") === "templates") {
					setActiveTab("templates");
					if (searchParams.has("wb-category")) {
						setActiveTemplatesCategory(searchParams.get("wb-category"));
					}
				} else if (searchParams.has("wb-category")) {
					setActiveTab("patterns");
					setActivePatternsCategory(searchParams.get("wb-category"));

					if (
						searchParams.has("wb-display-mode") &&
						"usage_tags" === searchParams.get("wb-display-mode")
					) {
						setSidebarDisplayMode("usage_tags");
					}
				}

				trackHiiveEvent("modal_open", {
					label_key: "trigger",
					trigger: "url",
				});

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
				<Sidebar isSiteEditor={isSiteEditor} />
				<Header />
				<Content view={currentView} />
			</div>
		</WPModal>
	);
};

export default Modal;
