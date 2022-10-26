const subscribe = (eventName, listener) => {
	document.addEventListener(eventName, listener);
};

const unsubscribe = (eventName, listener) => {
	document.removeEventListener(eventName, listener);
};

const dispatch = (eventName, payload = null) => {
	const event = new CustomEvent(eventName, { payload });
	document.dispatchEvent(event);
};

export { dispatch, subscribe, unsubscribe };
