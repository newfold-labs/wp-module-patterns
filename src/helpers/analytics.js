import {
	HiiveAnalytics,
	HiiveEvent,
} from '@newfold-labs/js-utility-ui-analytics';
import { HIIVE_ANALYTICS_CATEGORY } from '../constants';

export const trackHiiveEvent = (action, data) => {
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
