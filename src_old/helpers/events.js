export const subscribe = (eventName, listener) => {
	document.addEventListener(eventName, listener);
};

export const unsubscribe = (eventName, listener) => {
	document.removeEventListener(eventName, listener);
};

export const dispatch = (eventName, payload = null) => {
	const event = new window.CustomEvent(eventName, { payload });
	document.dispatchEvent(event);
};
