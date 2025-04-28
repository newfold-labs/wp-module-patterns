/**
 * Hook to manage plugin requirements and installation
 *
 * @param {Object} item The pattern item with plugin requirements
 * @return {Object} Functions and values related to plugin requirements
 */
export const usePluginRequirements = (item) => {
	/**
	 * Check if pattern requires plugins that aren't installed/active
	 *
	 * @return {boolean} True if any required plugin is not active
	 */
	const hasInactivePlugins = () => {
		if (!item?.plugin_requirements?.length) {
			return false;
		}

		// Check if any required plugin is not active
		return item.plugin_requirements.some((plugin) => plugin && "active" !== plugin.status);
	};

	/**
	 * Check if pattern requires premium plugins
	 *
	 * @return {boolean} True if any required plugin is premium
	 */
	const hasPremiumPlugins = () => {
		if (!item?.plugin_requirements?.length) {
			return false;
		}

		// Check if any required plugin is premium
		return item.plugin_requirements.some((plugin) => plugin && plugin.isPremium);
	};

	// Check if user is entitled to premium plugins
	const isEntitledToPlugins =
		item?.plugin_requirements?.some((plugin) => plugin.isEntitled) || false;

	/**
	 * Get premium plugin information for CTB integration
	 */
	const getPremiumPluginInfo = () => {
		if (!item?.plugin_requirements?.length) {
			return { ctbId: "", url: "" };
		}

		const premiumPlugin = item.plugin_requirements.find(
			(plugin) => !plugin.isEntitled && plugin.isPremium && plugin.ctbId
		);

		return {
			ctbId: premiumPlugin?.ctbId || "",
			url: premiumPlugin?.url || "",
		};
	};

	// Get CTB ID and URL
	const { ctbId, url } = getPremiumPluginInfo();

	// Create premium button properties
	const premiumButtonProps = {};

	const hasInactivePluginsValue = hasInactivePlugins();

	// Only add CTB properties when we have an inactive premium plugin that needs CTB
	if (hasInactivePluginsValue && !isEntitledToPlugins) {
		if (ctbId) {
			premiumButtonProps["data-ctb-id"] = ctbId;
		}

		if (url) {
			premiumButtonProps.href = url;
			premiumButtonProps.target = "_blank";
			premiumButtonProps.rel = "noopener noreferrer";
		}
	}

	// Helper for conditional onClick
	const shouldUseOnClick = !(hasInactivePluginsValue && !isEntitledToPlugins && ctbId);

	return {
		hasInactivePlugins: hasInactivePluginsValue,
		hasPremiumPlugins: hasPremiumPlugins(),
		isEntitledToPlugins,
		ctbId,
		url,
		premiumButtonProps,
		shouldUseOnClick,
	};
};
