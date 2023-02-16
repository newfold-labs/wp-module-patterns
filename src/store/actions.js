/**
 * Toggles the patterns modal.
 *
 * @param {boolean} isOpen
 * @return {Object} Action object.
 */
export function setIsModalOpen(isOpen) {
	return {
		type: 'SET_MODAL_OPEN',
		isOpen,
	};
}
