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

	return {
		hasInactivePlugins: hasInactivePlugins(),
		hasPremiumPlugins: hasPremiumPlugins(),
	};
};
