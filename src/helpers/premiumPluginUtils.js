/**
 * Utility functions for premium plugin handling
 */

/**
 * Get premium plugin information and button properties
 *
 * @param {Object} item - Design item with plugin requirements
 * @param {boolean} hasInactivePlugins - Whether there are inactive plugins
 * @returns {Object} Premium plugin properties
 */
export const getPremiumPluginAttributes = (item, hasInactivePlugins) => {
	const isEntitled = item?.plugin_requirements?.some((plugin) => plugin.isEntitled) || false;

	const getPremiumPluginInfo = () => {
		if (item?.plugin_requirements?.length) {
			const premiumPlugin = item.plugin_requirements.find(
				(plugin) => !plugin.isEntitled && plugin.isPremium && plugin.ctbId
			);

			return {
				ctbId: premiumPlugin?.ctbId || "",
				url: premiumPlugin?.url || "",
			};
		}
		return { ctbId: "", url: "" };
	};

	const { ctbId, url } = getPremiumPluginInfo();

	const premiumButtonProps = {};

	// Only add CTB properties when we have an inactive premium plugin that needs CTB
	if (hasInactivePlugins && !isEntitled) {
		if (ctbId) {
			premiumButtonProps["data-ctb-id"] = ctbId;
		}

		if (ctbId && url) {
			premiumButtonProps.href = url;
			premiumButtonProps.target = "_blank";
			premiumButtonProps.rel = "noopener noreferrer";
		}
	}

	const shouldUseOnClick = !(hasInactivePlugins && !isEntitled && ctbId);

	return {
		ctbId,
		url,
		premiumButtonProps,
		shouldUseOnClick,
		isEntitled,
	};
};
