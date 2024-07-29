import { HiiveAnalytics, HiiveEvent } from "@newfold-labs/js-utility-ui-analytics";
import { HIIVE_ANALYTICS_CATEGORY } from "../constants";

export const trackHiiveEvent = (action, data) => {
	// Check if the label key for the event is present and not empty
	const labelKey = data.label_key;
	if (labelKey && !data[labelKey]) {
		return;
	}
	
	data = {
		...data,
		page: window.location.href, // todo: check if this is what we want.
	};
	const hiiveEvent = new HiiveEvent(
		HIIVE_ANALYTICS_CATEGORY,
		action,
		data,
		HIIVE_ANALYTICS_CATEGORY
	);

	HiiveAnalytics.track(hiiveEvent);
};
