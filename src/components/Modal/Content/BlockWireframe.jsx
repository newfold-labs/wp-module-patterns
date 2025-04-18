/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { sprintf } from "@wordpress/i18n";

/**
 * Internal dependencies - Import SVGs
 * Note: You'll need to import each SVG you want to use
 */
import { ReactComponent as ContactForm } from "../../../svg/wireframes/ContactForm.svg";
import { ReactComponent as BookingForm } from "../../../svg/wireframes/BookingForm.svg";

// Import additional SVGs as needed

/**
 * Returns an SVG component based on the block name
 *
 * @param {Object} props Component props
 * @param {string} props.blockName The name of the block to render
 * @returns {JSX.Element} The block wireframe component
 */
const BlockWireframe = ({ blockName = "" }) => {
	// Get SVG component based on block name
	const WireframeSvg = getWireframeComponent(blockName);

	return (
		<div className="nfd-wba-block-wireframe">
			<WireframeSvg />
		</div>
	);
};

/**
 * Gets the appropriate wireframe component based on block name
 *
 * @param {string} blockName Name of the block
 * @returns {Function} SVG component to render
 */
const getWireframeComponent = (blockName) => {
	const wireframeMap = {
		"jetpack/contact-form": ContactForm,
		"jetpack/booking-form": BookingForm,
	};

	return wireframeMap[blockName] || null;
};

export default BlockWireframe;
