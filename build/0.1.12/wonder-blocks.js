/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/data/namespace.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/data/namespace.js ***!
  \****************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   namespace: function() { return /* binding */ namespace; }
/* harmony export */ });
const namespace = {
	urls: {
		single: undefined,
		batch: undefined,
	},
	queue: {
		events: [],
		threshold: 100,
	},
	debounce: {
		time: undefined,
		instance: undefined,
	},
};


/***/ }),

/***/ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/events/HiiveEvent.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/events/HiiveEvent.js ***!
  \*******************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HiiveEvent: function() { return /* binding */ HiiveEvent; }
/* harmony export */ });
/**
 * Defines the structure of a Hiive analytics event.
 *
 * @class HiiveEvent
 */
class HiiveEvent {
	/**
	 * Constructor for the HiiveEvent class.
	 *
	 * @param {string} category  The category of the event (This actual value will depend on the URL you are reporting to).
	 * @param {string} action    The action that triggered the event (The actual value will depend on the URL you are reporting to).
	 * @param {Object} data      Data related to the event.
	 * @param {string} namespace The namespace that the event belongs to.
	 */
	constructor( category, action, data, namespace ) {
		this.category = category;
		this.action = action;
		this.data = data;
		this.namespace = namespace;
	}
}


/***/ }),

/***/ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/events/index.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/events/index.js ***!
  \**************************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HiiveEvent: function() { return /* reexport safe */ _HiiveEvent__WEBPACK_IMPORTED_MODULE_0__.HiiveEvent; }
/* harmony export */ });
/* harmony import */ var _HiiveEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HiiveEvent */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/events/HiiveEvent.js");
// Exports related to Hiive events.



/***/ }),

/***/ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/index.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/index.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HiiveAnalytics: function() { return /* binding */ HiiveAnalytics; },
/* harmony export */   HiiveEvent: function() { return /* reexport safe */ _events__WEBPACK_IMPORTED_MODULE_1__.HiiveEvent; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/events/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/index.js");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);





/**
 * Determines whether Hiive analytics have been initialized or not for a particular namespace.
 *
 * @param {string} namespace The namespace the check.
 * @return {boolean} whether Hiive analytics have been initialized or not for a particular namespace.
 */
const initialized = ( namespace ) => {
	if ( window?.nfdUIAnalytics?.hiive ) {
		return namespace in window.nfdUIAnalytics.hiive;
	}
	return false;
};

/**
 * Validates that the parameter is an instance of HiiveEvent.
 *
 * @param {Object} event Any valid JS Object.
 * @return {boolean} whether the param is a valid HiiveEvent instance or not.
 */
const validate = ( event ) => {
	if ( ! ( event instanceof _events__WEBPACK_IMPORTED_MODULE_1__.HiiveEvent ) ) {
		return false;
	}

	return true;
};

/**
 * Initializes the module to send out Hiive analytics events.
 *
 * @param {Object} param0                          Data to initialize Hiive analytics.
 * @param {Object} param0.settings                 Settings that define the behavior of HiiveAnalytics.
 * @param {Object} param0.settings.debounce        Settings related to the debounce.
 * @param {number} param0.settings.debounce.time   The interval that must pass once an event has been tracked after which a batch request gets placed automatically to the batch URL.
 * @param {Object} param0.settings.queue           Settings related to the Hiive events queue.
 * @param {number} param0.settings.queue.threshold The limit that the number of events in the queue must cross after which a batch request gets placed automatically to the batch URL.
 * @param {Object} param0.urls                     Contains URL's to report analytics.
 * @param {string} param0.urls.single              The URL that can handle a single event.
 * @param {string} param0.urls.batch               The URL that can handle an array of events.
 * @param {string} param0.namespace                The namespace to initialize.
 * @return {boolean} Whether the module was initialized or not.
 */
const initialize = async ( {
	namespace,
	urls: { single, batch } = {},
	settings: { debounce: { time } = {}, queue: { threshold = 100 } = {} } = {},
} ) => {
	if ( ! namespace ) {
		return false;
	}

	// If the module is already initialized then skip initialization.
	if ( initialized( namespace ) ) {
		return true;
	}

	// If no reporting URL's are defined then fail initialization.
	if ( ! ( single || batch ) ) {
		return false;
	}

	(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).initializeNamespace( namespace );

	// Update Redux store with all the required data.
	(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).updateHiiveUrls(
		{
			single,
			batch,
		},
		namespace
	);
	(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).updateHiiveDebounceTime( time, namespace );
	(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).updateHiiveEventsQueueThreshold( threshold, namespace );

	// This helps us quickly determine whether Hiive analytics have been enabled.
	if ( window.nfdUIAnalytics?.hiive ) {
		window.nfdUIAnalytics.hiive[ namespace ] = true;
	} else {
		window.nfdUIAnalytics = {
			hiive: {
				[ namespace ]: true,
			},
		};
	}

	return true;
};

/**
 * Tracks the event by putting it in a queue.
 *
 * @param {HiiveEvent} event The event object to track.
 * @return {boolean} whether the event has been successfully queued for tracking or not.
 */
const track = ( event ) => {
	// Do not perform any activity if the module has not been initialized or the event is not valid.
	if ( ! ( validate( event ) && initialized( event.namespace ) ) ) {
		return false;
	}
	const namespace = event.namespace;
	delete event.namespace;
	// Add the event to a queue of tracked events.
	const events = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).getHiiveEventsQueue( namespace );
	events.push( event );
	(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).updateHiiveEventsQueue( events, namespace );

	// If the number of events in the queue have crossed the threshold then dispatch all of them.
	const threshold = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).getHiiveEventsQueueThreshold( namespace );
	if ( threshold && threshold < events.length ) {
		dispatchEvents( namespace );
	}

	// Reset the debounce setTimeout instance.
	resetDebounceInstance( namespace );

	return true;
};

/**
 * Reports the event to urls.single defined during initialization.
 *
 * @param {HiiveEvent} event The event object to send.
 * @return {Promise<boolean>} whether the event has been successfully sent or not.
 */
const send = async ( event ) => {
	// Do not perform any activity if the module has not been initialized or the event is not valid.
	if ( ! ( validate( event ) && initialized( event.namespace ) ) ) {
		return false;
	}

	const namespace = event.namespace;
	delete event.namespace;

	const url = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).getHiiveSingleUrl( namespace );
	if ( ! url ) {
		return false;
	}

	try {
		await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()( {
			url,
			method: 'POST',
			data: event,
		} );
	} catch ( error ) {
		console.error( error );
		return false;
	}
};

/**
 * Reports all the queued events to urls.batch defined during initialization.
 *
 * @param {string} namespace The namespace whose events must be dispatched.
 * @return {Promise<boolean>} whether or not all the events were sent to the batchUrl successfully.
 */
const dispatchEvents = async ( namespace ) => {
	if ( ! namespace || ! initialized( namespace ) ) {
		return false;
	}

	const url = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).getHiiveBatchUrl( namespace );
	if ( ! url ) {
		return false;
	}

	// If there are no events to report then return.
	const events = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).getHiiveEventsQueue( namespace );
	if ( 0 === events.length ) {
		return true;
	}

	// Rare case: Do this so that any other dispatchEvents calls do not dispatch redundant data.
	(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).updateHiiveEventsQueue( [], namespace );

	try {
		await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()( {
			url,
			method: 'POST',
			data: events,
		} );
	} catch ( error ) {
		// [TODO] Figure out a better error handling method and clear the queue.
		console.error( error );
		(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).updateHiiveEventsQueue( events, namespace );
	}

	return true;
};

/**
 * Resets the debounce instance countdown.
 *
 * @param {string} namespace The namespace in which the debounce instance should be reset.
 * @return {boolean} whether the reset occurred successfully or not.
 */
const resetDebounceInstance = ( namespace ) => {
	if ( ! namespace ) {
		return false;
	}

	const debounce = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).getHiiveDebounce( namespace );

	if ( ! debounce.time ) {
		return false;
	}

	clearInterval( debounce.instance );
	(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).updateHiiveDebounceInstance(
		setTimeout( () => {
			dispatchEvents( namespace );
			(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).updateHiiveDebounceInstance(
				undefined,
				namespace
			);
		}, debounce.time ),
		namespace
	);
	return true;
};

/**
 * Disables the debounce.
 *
 * @param {string} namespace The namespace in which the debounce instance should be disabled.
 * @return {boolean} whether the debounce has been successfully disabled or not.
 */
const disableDebounce = ( namespace ) => {
	if ( ! namespace ) {
		return false;
	}

	const debounce = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).getHiiveDebounce( namespace );
	if ( debounce.instance ) {
		clearInterval( debounce.instance );
		(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).updateHiiveDebounceInstance( undefined, namespace );
		(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)( _store__WEBPACK_IMPORTED_MODULE_2__.store ).updateHiiveDebounceTime( undefined, namespace );
	}
	return true;
};

const HiiveAnalytics = {
	initialize,
	initialized,
	validate,
	track,
	send,
	dispatchEvents,
	disableDebounce,
};



/***/ }),

/***/ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@newfold-labs/js-utility-ui-analytics/src/index.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HiiveAnalytics: function() { return /* reexport safe */ _hiive__WEBPACK_IMPORTED_MODULE_0__.HiiveAnalytics; },
/* harmony export */   HiiveEvent: function() { return /* reexport safe */ _hiive__WEBPACK_IMPORTED_MODULE_0__.HiiveEvent; }
/* harmony export */ });
/* harmony import */ var _hiive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hiive */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/index.js");
// Exports for the Hiive Platform.



/***/ }),

/***/ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/actions.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/actions.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initializeNamespace: function() { return /* binding */ initializeNamespace; },
/* harmony export */   updateHiiveDebounceInstance: function() { return /* binding */ updateHiiveDebounceInstance; },
/* harmony export */   updateHiiveDebounceTime: function() { return /* binding */ updateHiiveDebounceTime; },
/* harmony export */   updateHiiveEventsQueue: function() { return /* binding */ updateHiiveEventsQueue; },
/* harmony export */   updateHiiveEventsQueueThreshold: function() { return /* binding */ updateHiiveEventsQueueThreshold; },
/* harmony export */   updateHiiveUrls: function() { return /* binding */ updateHiiveUrls; }
/* harmony export */ });
/**
 * Initialize a Hiive Event namespace.
 *
 * @param {string} namespace The namespace to be initialized.
 * @return {Object} Type of action to perform with data.
 */
function initializeNamespace( namespace ) {
	return {
		type: 'INITIALIZE_NAMESPACE',
		namespace,
	};
}

/**
 * Update the Hiive URLs.
 *
 * @param {Object} urls      The Hiive URLs.
 * @param {string} namespace The namespace in which the URL's must be updated.
 * @return {Object} Type of action to perform with data.
 */
function updateHiiveUrls( urls, namespace ) {
	return {
		type: 'UPDATE_HIIVE_URLS',
		urls,
		namespace,
	};
}

/**
 * Update the Hiive events queue.
 *
 * @param {Array}  events    An array of events to be queued.
 * @param {string} namespace The namespace in which the queue must be updated.
 * @return {Object} Type of action to perform with data.
 */
function updateHiiveEventsQueue( events, namespace ) {
	return {
		type: 'UPDATE_HIIVE_EVENTS_QUEUE',
		events,
		namespace,
	};
}

/**
 *
 * @param {number} threshold The threshold for the queue.
 * @param {string} namespace The namespace in which the threshold must be updated.
 * @return {Object} Type of action to perform with data.
 */
function updateHiiveEventsQueueThreshold( threshold, namespace ) {
	return {
		type: 'UPDATE_HIIVE_EVENTS_QUEUE_THRESHOLD',
		threshold,
		namespace,
	};
}

/**
 * Update the Hiive events dispatch debounce time.
 *
 * @param {number} debounceTime The time to wait.
 * @param {string} namespace    The namespace in which the debounce time must be updated.
 * @return {Object} Type of action to perform with data.
 */
function updateHiiveDebounceTime( debounceTime, namespace ) {
	return {
		type: 'UPDATE_HIIVE_DEBOUNCE_TIME',
		debounceTime,
		namespace,
	};
}

/**
 * Updates the Hiive debounce instance.
 *
 * @param {Object} instance  A setTimeout instance of the debounce.
 * @param {string} namespace The namespace in which the debounce instance must be updated.
 * @return {Object} Type of action to perform with data.
 */
function updateHiiveDebounceInstance( instance, namespace ) {
	return {
		type: 'UPDATE_HIIVE_DEBOUNCE_INSTANCE',
		instance,
		namespace,
	};
}


/***/ }),

/***/ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/constants.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/constants.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STORE_NAME: function() { return /* binding */ STORE_NAME; }
/* harmony export */ });
/**
 * The name for the Redux store of this package.
 */
const STORE_NAME = 'newfold/ui-analytics';


/***/ }),

/***/ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/index.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/index.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   nfdUIAnalyticsStoreConfig: function() { return /* binding */ nfdUIAnalyticsStoreConfig; },
/* harmony export */   store: function() { return /* binding */ store; }
/* harmony export */ });
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reducer */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/reducer.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./actions */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/actions.js");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectors */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/selectors.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/constants.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);







/**
 * The Redux store configuration.
 */
const nfdUIAnalyticsStoreConfig = {
	reducer: _reducer__WEBPACK_IMPORTED_MODULE_0__["default"],
	actions: _actions__WEBPACK_IMPORTED_MODULE_1__,
	selectors: _selectors__WEBPACK_IMPORTED_MODULE_2__,
};

const store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.createReduxStore)( _constants__WEBPACK_IMPORTED_MODULE_3__.STORE_NAME, nfdUIAnalyticsStoreConfig );
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.register)( store );


/***/ }),

/***/ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/reducer.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/reducer.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hiive: function() { return /* binding */ hiive; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _hiive_data_namespace__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../hiive/data/namespace */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/hiive/data/namespace.js");




/**
 * A reducer for Hiive related actions.
 *
 * @param {Object} state  The current state of the store.
 * @param {Object} action The action to be performed to change the state.
 * @return {Object} state The new state of the store after the action is performed.
 */
const hiive = ( state, action ) => {
	switch ( action.type ) {
		case 'INITIALIZE_NAMESPACE': {
			return {
				...state,
				[ action.namespace ]: _hiive_data_namespace__WEBPACK_IMPORTED_MODULE_1__.namespace,
			};
		}
		case 'UPDATE_HIIVE_URLS':
			return {
				...state,
				[ action.namespace ]: {
					...state[ action.namespace ],
					urls: {
						single: action.urls.single,
						batch: action.urls.batch,
					},
				},
			};
		case 'UPDATE_HIIVE_EVENTS_QUEUE':
			return {
				...state,
				[ action.namespace ]: {
					...state[ action.namespace ],
					queue: {
						events: action.events,
						threshold: state[ action.namespace ].queue.threshold,
					},
				},
			};
		case 'UPDATE_HIIVE_EVENTS_QUEUE_THRESHOLD': {
			return {
				...state,
				[ action.namespace ]: {
					...state[ action.namespace ],
					queue: {
						events: state[ action.namespace ].queue.events,
						threshold: action.threshold,
					},
				},
			};
		}
		case 'UPDATE_HIIVE_DEBOUNCE_TIME':
			return {
				...state,
				[ action.namespace ]: {
					...state[ action.namespace ],
					debounce: {
						time: action.debounceTime,
						instance: state[ action.namespace ].debounce.instance,
					},
				},
			};
		case 'UPDATE_HIIVE_DEBOUNCE_INSTANCE':
			return {
				...state,
				[ action.namespace ]: {
					...state[ action.namespace ],
					debounce: {
						time: state[ action.namespace ].debounce.time,
						instance: action.instance,
					},
				},
			};
	}
	return state;
};

/**
 * Combines all the reducers in this file.
 */
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.combineReducers)( {
	hiive,
} ));


/***/ }),

/***/ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/selectors.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@newfold-labs/js-utility-ui-analytics/src/store/selectors.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getHiiveBatchUrl: function() { return /* binding */ getHiiveBatchUrl; },
/* harmony export */   getHiiveDebounce: function() { return /* binding */ getHiiveDebounce; },
/* harmony export */   getHiiveEventsQueue: function() { return /* binding */ getHiiveEventsQueue; },
/* harmony export */   getHiiveEventsQueueThreshold: function() { return /* binding */ getHiiveEventsQueueThreshold; },
/* harmony export */   getHiiveSingleUrl: function() { return /* binding */ getHiiveSingleUrl; }
/* harmony export */ });
/**
 * Retrieves all the queued Hiive events.
 *
 * @param {Object} state     The current state of the redux store.
 * @param {string} namespace The namespace from which the events must be retrieved.
 * @return {Array} events An array of events that are queued.
 */
function getHiiveEventsQueue( state, namespace ) {
	return state.hiive[ namespace ]?.queue.events;
}

/**
 *
 * @param {*}      state     The current state of the redux store.
 * @param {string} namespace The namespace from which the threshold must be read.
 * @return {Array} threshold Threshold of the queue.
 */
function getHiiveEventsQueueThreshold( state, namespace ) {
	return state.hiive[ namespace ]?.queue.threshold;
}

/**
 * Retrieves the default Hiive URL.
 *
 * @param {Object} state     The current state of the redux store.
 * @param {string} namespace The namespace from which the single URL must be read.
 * @return {string} The default URL in the store.
 */
function getHiiveSingleUrl( state, namespace ) {
	return state.hiive[ namespace ]?.urls.single;
}

/**
 * Retrieves the batch Hiive URL.
 *
 * @param {*}      state     The current state of the redux store.
 * @param {string} namespace The namespace from which the batch URL must be read.
 * @return {string} The batch URL in the store.
 */
function getHiiveBatchUrl( state, namespace ) {
	return state.hiive[ namespace ]?.urls.batch;
}

/**
 * Retrieves debounce data.
 *
 * @param {Object} state     The current state of the redux store.
 * @param {string} namespace The namespace from which the Hiive debounce must be read.
 * @return {Object} The debounce data.
 */
function getHiiveDebounce( state, namespace ) {
	return state.hiive[ namespace ]?.debounce;
}


/***/ }),

/***/ "./src/svg/Error.svg":
/*!***************************!*\
  !*** ./src/svg/Error.svg ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: function() { return /* binding */ SvgError; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _g, _defs;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SvgError = function SvgError(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 620 400"
  }, props), _g || (_g = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    clipPath: "url(#Error_svg__a)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    opacity: 0.38
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#Error_svg__b)",
    d: "M40.45 328.323c-1.99 0 3.914-1.581 5.828-2.748 4.172-2.54 8.309-5.409 12.45-8.192 13.096-8.803 22.273-16.03 35.641-22.686 38.051-18.95 76.561-32.617 115.273-43.904 117.192-34.162 240.924-4.415 352.576 77.833"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#fff",
    strokeMiterlimit: 10,
    strokeWidth: 0.462,
    d: "M40.45 328.323c-1.99 0 3.914-1.581 5.828-2.748 4.172-2.54 8.309-5.409 12.45-8.192 13.096-8.803 22.273-16.03 35.641-22.686 38.051-18.95 76.561-32.617 115.273-43.904 117.192-34.162 240.924-4.415 352.576 77.833"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004C76",
    d: "M295.177 103.969c-1.026-1.025-.667-4.813-.642-6.07.131-6.152 2.879-13.829 7.404-18.197 1.707-1.647 3.945-2.707 5.914-4.005 19.717-13.026 42.233-1.157 44.389 22.409 1.025 11.182-5.843 21.045-14.848 27.121-2.611 1.763-6.319 4.808-9.728 4.389-9.091-1.121-16.621-8.803-22.924-14.833-3.166-3.031-8.798-6.511-10.278-10.849",
    opacity: 0.15
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#4585C5",
    d: "M293.688 236.111c0-.132.469.485.494.52a17.27 17.27 0 0 1 1.046 1.924c.798 1.692 1.5 3.424 2.192 5.157 1.949 4.894 4.015 9.783 5.677 14.783 3.984 12 5.959 28.444 6.464 41.121.096 2.369.152 4.747.015 7.116-.212 3.571-.05 4.02 3.399 5.202.546.187 2.162 1.086 2.748.924 1.086-.298 1.964-4.793 2.161-5.576 1.531-5.934 2.293-12.065 2.809-18.166 1.601-18.909-1.657-43.298-7.758-61.253-1.551-4.56-3.576-8.954-5.586-13.328-.449-.975-1.212-3.601-2.439-4-1.243-.404-3.505 1.611-4.43 2.227-1.171.778-2.232 1.677-2.833 2.98-1.071 2.328-.99 5.248-1.364 7.737a112.115 112.115 0 0 1-2.348 11.617m2.57-116.889c0-2.076-4.207-4.192-5.672-4.844-6.404-2.848-15.166-1.272-20.116 3.627-9.904 9.803-14.944 35.883-14.808 49.262.01 1.227.096 2.46.859 3.47 1.464 1.944 10.651 8.404 13.555 8.091.97-.106 1.707-1.111 2.232-1.834 9.076-12.545 10.536-28.323 16.591-42.262 1.44-3.313 6.95-11.576 7.116-14.823"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#67CBE4",
    d: "M314.722 127.015c-.257 0 1.021-.5 1.273-.515 1.116-.056 2.243.242 3.086 1.005 2.076 1.873 2.141 5.101 1.732 7.651-1.666 10.485-8.045 20.834-12.101 30.556-.52 1.242-3.666 8.813-5.272 8.505-.672-.131-.425-2.308-.415-2.727a89.89 89.89 0 0 1 .647-9.177c1.48-11.753 4.97-24.722 11.025-35.01"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004C76",
    d: "M266.944 204.833c-.894-.894-.156-4.712-.081-5.768.42-6.06 1.349-12.192 2.399-18.171 3.516-20.01 7.591-39.667 19.117-56.849 4.267-6.363 12.383-14.894 21.06-10.964 5.783 2.621 7.389 10.823 6.258 16.348-1.349 6.576-4.44 12.919-6.197 19.424-3.101 11.465-4.707 23.677-4.788 35.541-.04 6.136-.076 12.237.566 18.348.065.647.863 6.248.641 6.49-2.727 2.975-9.798 2.571-13.379 3.131-6.197.97-12.485 2.061-18.767 1.207-1.43-.191-5.051-.495-6.076-1.747-.667-.813-.707-6.439-.808-7.758"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#FAB01D",
    d: "M245.909 83.57c-.076 0 .384-1.151.414-1.227.657-1.566 1.369-3.242 2.455-4.566.116-.14.368-.535.601-.46 1.424.476.353 4.612 1.182 5.652.904 1.132 4.767.551 5.025 2.268.197 1.318-2.46 2.02-2.621 3.43-.107.919.863 4.802.212 5.313-.798.626-3.622-2.894-4.768-2.97-1.485-.096-5.313 3.59-6.015 3.237-.419-.207 1-4.177 1.05-4.722.187-2.05-5.156-3.076-3.606-3.798 1.157-.535 2.47-.823 3.662-1.283m-39.772 79.187c-.036.066.489-.646.58-.773.253-.338 2.384-3.388 2.707-2.949.662.894-.772 2.51-.181 3.419.409.626 2.873.783 2.833 1.571-.046.843-2.157.672-2.429 1.399-.258.692.404 3.273-.349 3.631-.217.106-.545-.308-.661-.429a28.07 28.07 0 0 1-1.061-1.147c-1.546-1.788-2.344 1.187-3.965.778-.353-.091.571-2.146.541-2.495-.132-1.313-4.344-1.666-1.101-2.879m171.626 22.005c-.041 0 3.06-4.045 3.439-3.358.54.985-.5 2.424-.081 3.469.258.652 2.167 1.359 2.081 2.021-.096.732-1.848.535-2.162 1.161-.464.93-.08 3.056-.919 3.697-.394.303-1.636-2.394-2.358-2.469-1.869-.197-3.889.823-3.965.636-.227-.566 1.197-1.94 1.217-2.637.025-.989-2.151-1.757-1.914-2.565.146-.505 2.157.015 2.48.071"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#67CBE4",
    d: "M424.495 165.848c-36.207-38.803 25.748-84.808 54.662-41.434 21.217 31.823-23.01 72.782-54.662 41.434Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#F3F3F3",
    d: "M311.343 120.257c0 .071.041.021.081-.015.571-.475 1.041-1.116 1.556-1.651 1.106-1.162 4.045-2.359 5.272-.975 7.874 8.879 6.162-2.071 11.086-.359 4.702 1.632 3.147-1.06 5.642-4.272 2.176-2.803 5.171-4.662 7.52-7.278 1.207-1.349 3.939-4.111 2.737-6.147-2.252-3.818-6.747-3.692-10.414-4.848-3.454-1.091-8.449-4.712-11.944-4.232-7.177.984-8.702 11.282-12.652 15.863-1.672 1.935-5.268 3.48-6.227 5.884-.657 1.636 5.939 8.995 7.601 8.414"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#35444C",
    strokeMiterlimit: 10,
    strokeWidth: 1.75,
    d: "M311.343 120.257c0 .071.041.021.081-.015.571-.475 1.041-1.116 1.556-1.651 1.106-1.162 4.045-2.359 5.272-.975 7.874 8.879 6.162-2.071 11.086-.359 4.702 1.632 3.147-1.06 5.642-4.272 2.176-2.803 5.171-4.662 7.52-7.278 1.207-1.349 3.939-4.111 2.737-6.147-2.252-3.818-6.747-3.692-10.414-4.848-3.454-1.091-8.449-4.712-11.944-4.232-7.177.984-8.702 11.282-12.652 15.863-1.672 1.935-5.268 3.48-6.227 5.884-.657 1.636 5.939 8.995 7.601 8.414"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#FAB01D",
    d: "M303.142 110.485c0-.056.272-.243.318-.278 1.833-1.53 3.217-2.904 3.858-5.293.899-3.349-.161-7.091 1.066-10.338.828-2.197 4.121-3.697 5.874-7.505 1.788-3.884 4.419-9.48 9.419-9.692 6.742-.283 6 7.07 10.919 9.53 5.546 2.773 13.354 3.212 15.551 10.273a7.24 7.24 0 0 1 .257 3.085c-.182 1.399-1.025 2.531-2.283 3.162-5.348 2.677-5.863-3.056-9.313-3.95-2-.52-4.005 1.208-6.222.445-1.313-.45-1.707-2.667-2.985-2.828-2.419-.303-3.919 3.111-6.151 2.616-1.435-.318 1.05-6.465-2.753-5.404-2.429.677-4.464 7.48-3.192 9.47 1.157 1.803 7.47-.899 4.086 4.176-1.702 2.551-4.495-.207-6.495-.363-1.01-.076-1.964.469-2.909.747-1.571.465-8.889 6.177-8.475 2.253"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#4585C5",
    d: "M291.677 103.126c1.752 1.753 2.919 4.424 4.368 6.434 2.379 3.303 5.223 6.329 8.213 9.081 3.05 2.808 6.383 5.132 9.944 7.233 3.944 2.328 7.934 4.489 12.071 6.449 1.126.535 4.288-2.864 4.262-2.939-.116-.344-2.591-.955-2.939-1.122-2.747-1.318-5.48-2.833-8.106-4.378-7.207-4.248-13.657-10.177-19.404-16.202-1.783-1.874-3.424-3.894-4.662-6.177-.045-.081-.394-.884-.515-.869-.742.106-1.995 2.061-2.879 2.505"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#67CBE4",
    d: "M278.409 216.656c0-3.636-1.677-7.611-2.101-11.257-1.086-9.233-1.616-18.611-1.485-27.909.122-8.778.894-17.334 2.127-26.021 1.141-8.035 2.681-20.651 8.025-27.131 4.99-6.05 14.308-4.227 14.823 4.141.51 8.288-4.651 16.561-7.263 24.102-4.025 11.626-6.949 23.813-7.994 36.09-.561 6.571-.869 13.213-1.041 19.809-.111 4.287 2.182 8.555-2.737 8.126-.738-.066-1.667.222-2.359-.005"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004C76",
    d: "M221.041 304.919c0-.056.54-.162.575-.172 1.455-.419 2.834-.99 4.207-1.631 3.293-1.53 6.425-3.349 9.334-5.525 9.101-6.808 15.823-16.152 21.419-25.925 7.187-12.555 12.581-26.02 14.773-40.383.828-5.435.767-11.071.995-16.561.01-.303-.394-2.677-.324-2.96.005-.02.667.137.707.142.909.146 1.899-.02 2.808-.111 2.293-.218 4.581-.475 6.874-.713 5.52-.565 11.157-.959 16.591-2.121 1.126-.242 5.172-1.848 6.202-1.116.98.697 1.01 4.581 1.096 5.621.667 7.925-4.505 16.596-7.869 23.404-9.959 20.162-25.434 38.637-41.075 54.632-6.445 6.591-13.521 13.106-21.707 17.474-1.657.884-3.364 1.627-5.086 2.364-.192.081-2.222 1.217-2.399 1.131-.768-.383-1.409-2.591-2.091-3.293-1.525-1.58-3.591-2.075-5.369-3.257"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004C76",
    d: "M347.223 290.52c-.697-.348 4.863-.515 5.535-.414 3.369.51 13.46 1.434 14.328 5.853.031.162.041.334 0 .495-.838 3.182-19.909 1.081-20.596-3.343m20.182-31.758c-.122-.06 1.671-.172 1.853-.177 2.738-.07 5.475.117 8.202.303 6.429.44 12.813 1.223 19.192 2.142 20.389 2.939 41.207 6.954 60.081 15.53 4.106 1.869 17.146 7.323 15.414 13.864-2 7.576-23.667 5.889-29.055 5.358-23.122-2.293-46.48-9.202-67.854-18.232-2.45-1.035-31.01-13.707-12.763-15.944m-92.56 35.283c1.237-2.47 17.581-5.303 17.258-1.329-.526 6.404-24.379 9.031-18.278 3.404m-93.909-23.06c0-2.818 9.798-6.227 11.53-6.975 5.687-2.444 45.975-15.5 48.793-8.459 2.586 6.469-37.268 15.621-43.116 16.838-2.546.53-19.445 4.525-17.738 1.217m14.349 15.545c-.283-.282.303-.651.495-.798 1.323-1.025 9.212-5.141 10.156-2.444 1.016 2.894-13.247 9.884-11.899 6.379",
    opacity: 0.15
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#67CBE4",
    d: "M263.687 205.798c-.546 0 1.035.333 1.56.485 1.202.343 2.379.788 3.591 1.091 3.409.863 6.93 1.08 10.435 1.08 6.232 0 12.54-1.454 18.57-2.878 2.571-.606 5.217-1.208 7.707-2.112.308-.111 1.596-.899 1.914-.762.435.187 1.066 6.439.975 7.404-.192 2.005-11.924 4.177-13.843 4.571-7.323 1.495-15.631 1.474-23.061.621-1.545-.177-5.621.298-6.823-.904-.636-.637-1.056-6.985-1.237-8.445"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#4585C5",
    d: "M273.217 203.747c0-.333.151.621.166.692.102.535.223 1.066.354 1.591a85.683 85.683 0 0 1 1.131 5.141c1 5.465.98 6.591 6.581 7.056.581.05 3.379.439 3.844-.081.959-1.071.439-5.495.469-6.869.076-3.424.056-7.05.733-10.419.025-.126.131-.419.015-.535-.566-.561-14.985-.046-13.152 3.626"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#67CBE4",
    d: "M277.682 217.262c0-.116-.571 1.273-.692 1.546a4.882 4.882 0 0 1-2.465 2.464c-1.59.707-12.01-.474-7.934 4.728 3.293 4.202 11.586 4.464 14.869.308 1.217-1.536 4.035-7.031 1.212-8.793-1.288-.803-3.652-.298-5.126-.445m34.439 98.258c0 .086-1.813-1.141-1.959-1.283-.93-.909-3.869-4.449-1.273-5.277 2.571-.824 5.889 1.449 8.237 2.232 3.112 1.035 6.172.853 9.354 1.288 1.359.187 2.944.949 3.066 2.505.181 2.328-2.349 3.136-4.182 3.419-4.515.692-8.798-.167-12.687-2.485m-87.334-10.591c0 .02-1.086-.581-1.212-.652-.843-.459-1.727-.813-2.707-.656-1.692.273-1.323 2.581-.773 3.662 2.283 4.474 11.99 11.57 16.798 13.202 2.424.823 9.086.742 7.561-3.728-.854-2.495-5.339-3.197-7.536-3.873-4.252-1.319-9.484-4.228-12.025-8.041"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#4585C5",
    d: "M221.151 303.601c-.166-.339 1.52 1.05 1.697 1.207 1.268 1.101 2.505 2.232 3.753 3.353 4.141 3.743 5.581 4.41 10.474 1.445.46-.278 2.601-.934 2.697-1.505.283-1.642-3.722-4.399-4.787-5.45-1.056-1.04-4.329-5.53-5.364-5.853-.667-.212-1.581 1.096-2.005 1.464-1.611 1.41-5.187 2.899-6.136 4.793"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004C76",
    d: "M306.409 305.293c-.272-.167.657 1.792.768 2.166.167.561-.025 3.556.247 3.859.814.899 10.142 1.475 11.399.889.985-.465.864-1.884.99-2.531.132-.661 1.116-2.479.318-3.065-.545-.399-2.899-.177-3.666-.217-3.227-.152-6.318-.612-9.46-1.031"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004C76",
    d: "M423.702 118.05c-3.05-1.964-47.247-26.884-41.439-8.783 7.384 23.005 76.247 56.207 97.52 66.657 5.111 2.51 33.323 16.687 37.742 8.763 5.445-9.758-31.03-32.718-33.181-31.369-.425.262-1.495 1.454-1.167 1.964.369.581 1.151.96 1.697 1.344 6.838 4.843 17.111 10.914 20.661 18.864.379.848.612 1.883-.51 2.191-2.772.758-6.707-.919-9.257-1.792a82.528 82.528 0 0 1-7.389-2.945c-24.717-11.222-49.808-23.742-71.914-39.515-2.753-1.965-20.288-14.818-16.44-19.414 4.914-5.874 14.642 6.101 19.147 8.848",
    opacity: 0.15
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    opacity: 0.19
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#Error_svg__c)",
    d: "M239.536 315.222c.732 0-1.465-.066-2.192-.091-1.409-.045-2.813-.071-4.222-.126a2058.41 2058.41 0 0 1-13.601-.601c-13.243-.627-26.465-1.359-39.723-1.798-.429-.015-.858-.031-1.282-.051-.399-.015-.798-.03-1.197-.05-2.814-.121-5.556.03-8.344.03-.217 0-.308.076-.343.308-.238 1.46 2.02 17.727 2.404 18.076 2.076 1.909 8.848-.253 11.197-.566 10.384-1.374 20.671-3.121 30.884-5.454 5.585-1.278 11.227-2.374 16.792-3.758.521-.131 9.475-1.141 9.773-1.742"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#fff",
    strokeMiterlimit: 10,
    strokeWidth: 0.242,
    d: "M239.536 315.222c.732 0-1.465-.066-2.192-.091-1.409-.045-2.813-.071-4.222-.126a2058.41 2058.41 0 0 1-13.601-.601c-13.243-.627-26.465-1.359-39.723-1.798-.429-.015-.858-.031-1.282-.051-.399-.015-.798-.03-1.197-.05-2.814-.121-5.556.03-8.344.03-.217 0-.308.076-.343.308-.238 1.46 2.02 17.727 2.404 18.076 2.076 1.909 8.848-.253 11.197-.566 10.384-1.374 20.671-3.121 30.884-5.454 5.585-1.278 11.227-2.374 16.792-3.758.521-.131 9.475-1.141 9.773-1.742"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    opacity: 0.19
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#Error_svg__d)",
    d: "M321.349 315.222c.733 0-1.464-.066-2.192-.091-1.409-.045-2.813-.071-4.222-.126-4.535-.182-9.066-.389-13.601-.601-13.242-.627-26.465-1.359-39.722-1.798-.429-.015-.859-.031-1.283-.051-.399-.015-.798-.03-1.197-.05-2.813-.121-5.556.03-8.343.03-.218 0-.308.076-.344.308-.237 1.46 2.02 17.727 2.404 18.076 2.076 1.909 8.849-.253 11.197-.566 10.384-1.374 20.672-3.121 30.884-5.454 5.586-1.278 11.227-2.374 16.793-3.758.52-.131 9.475-1.141 9.773-1.742"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#fff",
    strokeMiterlimit: 10,
    strokeWidth: 0.242,
    d: "M321.349 315.222c.733 0-1.464-.066-2.192-.091-1.409-.045-2.813-.071-4.222-.126-4.535-.182-9.066-.389-13.601-.601-13.242-.627-26.465-1.359-39.722-1.798-.429-.015-.859-.031-1.283-.051-.399-.015-.798-.03-1.197-.05-2.813-.121-5.556.03-8.343.03-.218 0-.308.076-.344.308-.237 1.46 2.02 17.727 2.404 18.076 2.076 1.909 8.849-.253 11.197-.566 10.384-1.374 20.672-3.121 30.884-5.454 5.586-1.278 11.227-2.374 16.793-3.758.52-.131 9.475-1.141 9.773-1.742"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#004C76",
    strokeDasharray: "8.82 8.82",
    strokeMiterlimit: 10,
    strokeWidth: 1.471,
    d: "M150.106 135.146s37.268-37.217 85.298-46.383m-48.672 32.01c9.192-5.389 16.177-15.763 48.667-26.106"
  }))), _defs || (_defs = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "Error_svg__b",
    x1: 302.426,
    x2: 305.043,
    y1: 290.007,
    y2: 212.366,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#fff"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#51C7EA"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "Error_svg__c",
    x1: 169.062,
    x2: 240.164,
    y1: 322.041,
    y2: 322.494,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#fff"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#51C7EA"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "Error_svg__d",
    x1: 250.875,
    x2: 321.978,
    y1: 322.041,
    y2: 322.494,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#fff"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#51C7EA"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("clipPath", {
    id: "Error_svg__a"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M.91 0h618.18v400H.91z"
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MjAgNDAwIiBmaWxsPSJub25lIj48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxnIG9wYWNpdHk9Ii4zOCI+PHBhdGggZmlsbD0idXJsKCNiKSIgZD0iTTQwLjQ1IDMyOC4zMjNjLTEuOTkgMCAzLjkxNC0xLjU4MSA1LjgyOC0yLjc0OCA0LjE3Mi0yLjU0IDguMzA5LTUuNDA5IDEyLjQ1LTguMTkyIDEzLjA5Ni04LjgwMyAyMi4yNzMtMTYuMDMgMzUuNjQxLTIyLjY4NiAzOC4wNTEtMTguOTUgNzYuNTYxLTMyLjYxNyAxMTUuMjczLTQzLjkwNCAxMTcuMTkyLTM0LjE2MiAyNDAuOTI0LTQuNDE1IDM1Mi41NzYgNzcuODMzIi8+PHBhdGggc3Ryb2tlPSIjZmZmIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iLjQ2MiIgZD0iTTQwLjQ1IDMyOC4zMjNjLTEuOTkgMCAzLjkxNC0xLjU4MSA1LjgyOC0yLjc0OCA0LjE3Mi0yLjU0IDguMzA5LTUuNDA5IDEyLjQ1LTguMTkyIDEzLjA5Ni04LjgwMyAyMi4yNzMtMTYuMDMgMzUuNjQxLTIyLjY4NiAzOC4wNTEtMTguOTUgNzYuNTYxLTMyLjYxNyAxMTUuMjczLTQzLjkwNCAxMTcuMTkyLTM0LjE2MiAyNDAuOTI0LTQuNDE1IDM1Mi41NzYgNzcuODMzIi8+PC9nPjxwYXRoIGZpbGw9IiMwMDRDNzYiIGQ9Ik0yOTUuMTc3IDEwMy45NjljLTEuMDI2LTEuMDI1LS42NjctNC44MTMtLjY0Mi02LjA3LjEzMS02LjE1MiAyLjg3OS0xMy44MjkgNy40MDQtMTguMTk3IDEuNzA3LTEuNjQ3IDMuOTQ1LTIuNzA3IDUuOTE0LTQuMDA1IDE5LjcxNy0xMy4wMjYgNDIuMjMzLTEuMTU3IDQ0LjM4OSAyMi40MDkgMS4wMjUgMTEuMTgyLTUuODQzIDIxLjA0NS0xNC44NDggMjcuMTIxLTIuNjExIDEuNzYzLTYuMzE5IDQuODA4LTkuNzI4IDQuMzg5LTkuMDkxLTEuMTIxLTE2LjYyMS04LjgwMy0yMi45MjQtMTQuODMzLTMuMTY2LTMuMDMxLTguNzk4LTYuNTExLTEwLjI3OC0xMC44NDkiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGw9IiM0NTg1QzUiIGQ9Ik0yOTMuNjg4IDIzNi4xMTFjMC0uMTMyLjQ2OS40ODUuNDk0LjUyYTE3LjI3IDE3LjI3IDAgMCAxIDEuMDQ2IDEuOTI0Yy43OTggMS42OTIgMS41IDMuNDI0IDIuMTkyIDUuMTU3IDEuOTQ5IDQuODk0IDQuMDE1IDkuNzgzIDUuNjc3IDE0Ljc4MyAzLjk4NCAxMiA1Ljk1OSAyOC40NDQgNi40NjQgNDEuMTIxLjA5NiAyLjM2OS4xNTIgNC43NDcuMDE1IDcuMTE2LS4yMTIgMy41NzEtLjA1IDQuMDIgMy4zOTkgNS4yMDIuNTQ2LjE4NyAyLjE2MiAxLjA4NiAyLjc0OC45MjQgMS4wODYtLjI5OCAxLjk2NC00Ljc5MyAyLjE2MS01LjU3NiAxLjUzMS01LjkzNCAyLjI5My0xMi4wNjUgMi44MDktMTguMTY2IDEuNjAxLTE4LjkwOS0xLjY1Ny00My4yOTgtNy43NTgtNjEuMjUzLTEuNTUxLTQuNTYtMy41NzYtOC45NTQtNS41ODYtMTMuMzI4LS40NDktLjk3NS0xLjIxMi0zLjYwMS0yLjQzOS00LTEuMjQzLS40MDQtMy41MDUgMS42MTEtNC40MyAyLjIyNy0xLjE3MS43NzgtMi4yMzIgMS42NzctMi44MzMgMi45OC0xLjA3MSAyLjMyOC0uOTkgNS4yNDgtMS4zNjQgNy43MzdhMTEyLjExNSAxMTIuMTE1IDAgMCAxLTIuMzQ4IDExLjYxN00yOTYuNTA1IDExOC4yMDdjMC0yLjA3Ni00LjIwNy00LjE5Mi01LjY3Mi00Ljg0NC02LjQwNC0yLjg0OC0xNS4xNjYtMS4yNzItMjAuMTE2IDMuNjI3LTkuOTA0IDkuODAzLTE0Ljk0NCAzNS44ODMtMTQuODA4IDQ5LjI2Mi4wMSAxLjIyNy4wOTYgMi40Ni44NTkgMy40NyAxLjQ2NCAxLjk0NCAxMC42NTEgOC40MDQgMTMuNTU1IDguMDkxLjk3LS4xMDYgMS43MDctMS4xMTEgMi4yMzItMS44MzQgOS4wNzYtMTIuNTQ1IDEwLjUzNi0yOC4zMjMgMTYuNTkxLTQyLjI2MiAxLjQ0LTMuMzEzIDYuOTUtMTEuNTc2IDcuMTE2LTE0LjgyMyIvPjxwYXRoIGZpbGw9IiM2N0NCRTQiIGQ9Ik0zMTQuNzIyIDEyNy4wMTVjLS4yNTcgMCAxLjAyMS0uNSAxLjI3My0uNTE1IDEuMTE2LS4wNTYgMi4yNDMuMjQyIDMuMDg2IDEuMDA1IDIuMDc2IDEuODczIDIuMTQxIDUuMTAxIDEuNzMyIDcuNjUxLTEuNjY2IDEwLjQ4NS04LjA0NSAyMC44MzQtMTIuMTAxIDMwLjU1Ni0uNTIgMS4yNDItMy42NjYgOC44MTMtNS4yNzIgOC41MDUtLjY3Mi0uMTMxLS40MjUtMi4zMDgtLjQxNS0yLjcyN2E4OS44OSA4OS44OSAwIDAgMSAuNjQ3LTkuMTc3YzEuNDgtMTEuNzUzIDQuOTctMjQuNzIyIDExLjAyNS0zNS4wMSIvPjxwYXRoIGZpbGw9IiMwMDRDNzYiIGQ9Ik0yNjYuOTQ0IDIwNC44MzNjLS44OTQtLjg5NC0uMTU2LTQuNzEyLS4wODEtNS43NjguNDItNi4wNiAxLjM0OS0xMi4xOTIgMi4zOTktMTguMTcxIDMuNTE2LTIwLjAxIDcuNTkxLTM5LjY2NyAxOS4xMTctNTYuODQ5IDQuMjY3LTYuMzYzIDEyLjM4My0xNC44OTQgMjEuMDYtMTAuOTY0IDUuNzgzIDIuNjIxIDcuMzg5IDEwLjgyMyA2LjI1OCAxNi4zNDgtMS4zNDkgNi41NzYtNC40NCAxMi45MTktNi4xOTcgMTkuNDI0LTMuMTAxIDExLjQ2NS00LjcwNyAyMy42NzctNC43ODggMzUuNTQxLS4wNCA2LjEzNi0uMDc2IDEyLjIzNy41NjYgMTguMzQ4LjA2NS42NDcuODYzIDYuMjQ4LjY0MSA2LjQ5LTIuNzI3IDIuOTc1LTkuNzk4IDIuNTcxLTEzLjM3OSAzLjEzMS02LjE5Ny45Ny0xMi40ODUgMi4wNjEtMTguNzY3IDEuMjA3LTEuNDMtLjE5MS01LjA1MS0uNDk1LTYuMDc2LTEuNzQ3LS42NjctLjgxMy0uNzA3LTYuNDM5LS44MDgtNy43NTgiLz48cGF0aCBmaWxsPSIjRkFCMDFEIiBkPSJNMjQ1LjkwOSA4My41N2MtLjA3NiAwIC4zODQtMS4xNTEuNDE0LTEuMjI3LjY1Ny0xLjU2NiAxLjM2OS0zLjI0MiAyLjQ1NS00LjU2Ni4xMTYtLjE0LjM2OC0uNTM1LjYwMS0uNDYgMS40MjQuNDc2LjM1MyA0LjYxMiAxLjE4MiA1LjY1Mi45MDQgMS4xMzIgNC43NjcuNTUxIDUuMDI1IDIuMjY4LjE5NyAxLjMxOC0yLjQ2IDIuMDItMi42MjEgMy40My0uMTA3LjkxOS44NjMgNC44MDIuMjEyIDUuMzEzLS43OTguNjI2LTMuNjIyLTIuODk0LTQuNzY4LTIuOTctMS40ODUtLjA5Ni01LjMxMyAzLjU5LTYuMDE1IDMuMjM3LS40MTktLjIwNyAxLTQuMTc3IDEuMDUtNC43MjIuMTg3LTIuMDUtNS4xNTYtMy4wNzYtMy42MDYtMy43OTggMS4xNTctLjUzNSAyLjQ3LS44MjMgMy42NjItMS4yODNNMjAzLjcyOCAxNjMuNjMxYy0uMDM2LjA2Ni40ODktLjY0Ni41OC0uNzczLjI1My0uMzM4IDIuMzg0LTMuMzg4IDIuNzA3LTIuOTQ5LjY2Mi44OTQtLjc3MiAyLjUxLS4xODEgMy40MTkuNDA5LjYyNiAyLjg3My43ODMgMi44MzMgMS41NzEtLjA0Ni44NDMtMi4xNTcuNjcyLTIuNDI5IDEuMzk5LS4yNTguNjkyLjQwNCAzLjI3My0uMzQ5IDMuNjMxLS4yMTcuMTA2LS41NDUtLjMwOC0uNjYxLS40MjlhMjguMDcgMjguMDcgMCAwIDEtMS4wNjEtMS4xNDdjLTEuNTQ2LTEuNzg4LTIuMzQ0IDEuMTg3LTMuOTY1Ljc3OC0uMzUzLS4wOTEuNTcxLTIuMTQ2LjU0MS0yLjQ5NS0uMTMyLTEuMzEzLTQuMzQ0LTEuNjY2LTEuMTAxLTIuODc5TTM3Mi4yNjggMTg1Ljc2MmMtLjA0MSAwIDMuMDYtNC4wNDUgMy40MzktMy4zNTguNTQuOTg1LS41IDIuNDI0LS4wODEgMy40NjkuMjU4LjY1MiAyLjE2NyAxLjM1OSAyLjA4MSAyLjAyMS0uMDk2LjczMi0xLjg0OC41MzUtMi4xNjIgMS4xNjEtLjQ2NC45My0uMDggMy4wNTYtLjkxOSAzLjY5Ny0uMzk0LjMwMy0xLjYzNi0yLjM5NC0yLjM1OC0yLjQ2OS0xLjg2OS0uMTk3LTMuODg5LjgyMy0zLjk2NS42MzYtLjIyNy0uNTY2IDEuMTk3LTEuOTQgMS4yMTctMi42MzcuMDI1LS45ODktMi4xNTEtMS43NTctMS45MTQtMi41NjUuMTQ2LS41MDUgMi4xNTcuMDE1IDIuNDguMDcxIi8+PHBhdGggZmlsbD0iIzY3Q0JFNCIgZD0iTTQyNC40OTUgMTY1Ljg0OGMtMzYuMjA3LTM4LjgwMyAyNS43NDgtODQuODA4IDU0LjY2Mi00MS40MzQgMjEuMjE3IDMxLjgyMy0yMy4wMSA3Mi43ODItNTQuNjYyIDQxLjQzNFoiLz48cGF0aCBmaWxsPSIjRjNGM0YzIiBkPSJNMzExLjM0MyAxMjAuMjU3YzAgLjA3MS4wNDEuMDIxLjA4MS0uMDE1LjU3MS0uNDc1IDEuMDQxLTEuMTE2IDEuNTU2LTEuNjUxIDEuMTA2LTEuMTYyIDQuMDQ1LTIuMzU5IDUuMjcyLS45NzUgNy44NzQgOC44NzkgNi4xNjItMi4wNzEgMTEuMDg2LS4zNTkgNC43MDIgMS42MzIgMy4xNDctMS4wNiA1LjY0Mi00LjI3MiAyLjE3Ni0yLjgwMyA1LjE3MS00LjY2MiA3LjUyLTcuMjc4IDEuMjA3LTEuMzQ5IDMuOTM5LTQuMTExIDIuNzM3LTYuMTQ3LTIuMjUyLTMuODE4LTYuNzQ3LTMuNjkyLTEwLjQxNC00Ljg0OC0zLjQ1NC0xLjA5MS04LjQ0OS00LjcxMi0xMS45NDQtNC4yMzItNy4xNzcuOTg0LTguNzAyIDExLjI4Mi0xMi42NTIgMTUuODYzLTEuNjcyIDEuOTM1LTUuMjY4IDMuNDgtNi4yMjcgNS44ODQtLjY1NyAxLjYzNiA1LjkzOSA4Ljk5NSA3LjYwMSA4LjQxNCIvPjxwYXRoIHN0cm9rZT0iIzM1NDQ0QyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjEuNzUiIGQ9Ik0zMTEuMzQzIDEyMC4yNTdjMCAuMDcxLjA0MS4wMjEuMDgxLS4wMTUuNTcxLS40NzUgMS4wNDEtMS4xMTYgMS41NTYtMS42NTEgMS4xMDYtMS4xNjIgNC4wNDUtMi4zNTkgNS4yNzItLjk3NSA3Ljg3NCA4Ljg3OSA2LjE2Mi0yLjA3MSAxMS4wODYtLjM1OSA0LjcwMiAxLjYzMiAzLjE0Ny0xLjA2IDUuNjQyLTQuMjcyIDIuMTc2LTIuODAzIDUuMTcxLTQuNjYyIDcuNTItNy4yNzggMS4yMDctMS4zNDkgMy45MzktNC4xMTEgMi43MzctNi4xNDctMi4yNTItMy44MTgtNi43NDctMy42OTItMTAuNDE0LTQuODQ4LTMuNDU0LTEuMDkxLTguNDQ5LTQuNzEyLTExLjk0NC00LjIzMi03LjE3Ny45ODQtOC43MDIgMTEuMjgyLTEyLjY1MiAxNS44NjMtMS42NzIgMS45MzUtNS4yNjggMy40OC02LjIyNyA1Ljg4NC0uNjU3IDEuNjM2IDUuOTM5IDguOTk1IDcuNjAxIDguNDE0Ii8+PHBhdGggZmlsbD0iI0ZBQjAxRCIgZD0iTTMwMy4xNDIgMTEwLjQ4NWMwLS4wNTYuMjcyLS4yNDMuMzE4LS4yNzggMS44MzMtMS41MyAzLjIxNy0yLjkwNCAzLjg1OC01LjI5My44OTktMy4zNDktLjE2MS03LjA5MSAxLjA2Ni0xMC4zMzguODI4LTIuMTk3IDQuMTIxLTMuNjk3IDUuODc0LTcuNTA1IDEuNzg4LTMuODg0IDQuNDE5LTkuNDggOS40MTktOS42OTIgNi43NDItLjI4MyA2IDcuMDcgMTAuOTE5IDkuNTMgNS41NDYgMi43NzMgMTMuMzU0IDMuMjEyIDE1LjU1MSAxMC4yNzMuMzA4Ljk5NS4zOTQgMi4wNTUuMjU3IDMuMDg1LS4xODIgMS4zOTktMS4wMjUgMi41MzEtMi4yODMgMy4xNjItNS4zNDggMi42NzctNS44NjMtMy4wNTYtOS4zMTMtMy45NS0yLS41Mi00LjAwNSAxLjIwOC02LjIyMi40NDUtMS4zMTMtLjQ1LTEuNzA3LTIuNjY3LTIuOTg1LTIuODI4LTIuNDE5LS4zMDMtMy45MTkgMy4xMTEtNi4xNTEgMi42MTYtMS40MzUtLjMxOCAxLjA1LTYuNDY1LTIuNzUzLTUuNDA0LTIuNDI5LjY3Ny00LjQ2NCA3LjQ4LTMuMTkyIDkuNDcgMS4xNTcgMS44MDMgNy40Ny0uODk5IDQuMDg2IDQuMTc2LTEuNzAyIDIuNTUxLTQuNDk1LS4yMDctNi40OTUtLjM2My0xLjAxLS4wNzYtMS45NjQuNDY5LTIuOTA5Ljc0Ny0xLjU3MS40NjUtOC44ODkgNi4xNzctOC40NzUgMi4yNTMiLz48cGF0aCBmaWxsPSIjNDU4NUM1IiBkPSJNMjkxLjY3NyAxMDMuMTI2YzEuNzUyIDEuNzUzIDIuOTE5IDQuNDI0IDQuMzY4IDYuNDM0IDIuMzc5IDMuMzAzIDUuMjIzIDYuMzI5IDguMjEzIDkuMDgxIDMuMDUgMi44MDggNi4zODMgNS4xMzIgOS45NDQgNy4yMzMgMy45NDQgMi4zMjggNy45MzQgNC40ODkgMTIuMDcxIDYuNDQ5IDEuMTI2LjUzNSA0LjI4OC0yLjg2NCA0LjI2Mi0yLjkzOS0uMTE2LS4zNDQtMi41OTEtLjk1NS0yLjkzOS0xLjEyMi0yLjc0Ny0xLjMxOC01LjQ4LTIuODMzLTguMTA2LTQuMzc4LTcuMjA3LTQuMjQ4LTEzLjY1Ny0xMC4xNzctMTkuNDA0LTE2LjIwMi0xLjc4My0xLjg3NC0zLjQyNC0zLjg5NC00LjY2Mi02LjE3Ny0uMDQ1LS4wODEtLjM5NC0uODg0LS41MTUtLjg2OS0uNzQyLjEwNi0xLjk5NSAyLjA2MS0yLjg3OSAyLjUwNSIvPjxwYXRoIGZpbGw9IiM2N0NCRTQiIGQ9Ik0yNzguNDA5IDIxNi42NTZjMC0zLjYzNi0xLjY3Ny03LjYxMS0yLjEwMS0xMS4yNTctMS4wODYtOS4yMzMtMS42MTYtMTguNjExLTEuNDg1LTI3LjkwOS4xMjItOC43NzguODk0LTE3LjMzNCAyLjEyNy0yNi4wMjEgMS4xNDEtOC4wMzUgMi42ODEtMjAuNjUxIDguMDI1LTI3LjEzMSA0Ljk5LTYuMDUgMTQuMzA4LTQuMjI3IDE0LjgyMyA0LjE0MS41MSA4LjI4OC00LjY1MSAxNi41NjEtNy4yNjMgMjQuMTAyLTQuMDI1IDExLjYyNi02Ljk0OSAyMy44MTMtNy45OTQgMzYuMDktLjU2MSA2LjU3MS0uODY5IDEzLjIxMy0xLjA0MSAxOS44MDktLjExMSA0LjI4NyAyLjE4MiA4LjU1NS0yLjczNyA4LjEyNi0uNzM4LS4wNjYtMS42NjcuMjIyLTIuMzU5LS4wMDUiLz48cGF0aCBmaWxsPSIjMDA0Qzc2IiBkPSJNMjIxLjA0MSAzMDQuOTE5YzAtLjA1Ni41NC0uMTYyLjU3NS0uMTcyIDEuNDU1LS40MTkgMi44MzQtLjk5IDQuMjA3LTEuNjMxIDMuMjkzLTEuNTMgNi40MjUtMy4zNDkgOS4zMzQtNS41MjUgOS4xMDEtNi44MDggMTUuODIzLTE2LjE1MiAyMS40MTktMjUuOTI1IDcuMTg3LTEyLjU1NSAxMi41ODEtMjYuMDIgMTQuNzczLTQwLjM4My44MjgtNS40MzUuNzY3LTExLjA3MS45OTUtMTYuNTYxLjAxLS4zMDMtLjM5NC0yLjY3Ny0uMzI0LTIuOTYuMDA1LS4wMi42NjcuMTM3LjcwNy4xNDIuOTA5LjE0NiAxLjg5OS0uMDIgMi44MDgtLjExMSAyLjI5My0uMjE4IDQuNTgxLS40NzUgNi44NzQtLjcxMyA1LjUyLS41NjUgMTEuMTU3LS45NTkgMTYuNTkxLTIuMTIxIDEuMTI2LS4yNDIgNS4xNzItMS44NDggNi4yMDItMS4xMTYuOTguNjk3IDEuMDEgNC41ODEgMS4wOTYgNS42MjEuNjY3IDcuOTI1LTQuNTA1IDE2LjU5Ni03Ljg2OSAyMy40MDQtOS45NTkgMjAuMTYyLTI1LjQzNCAzOC42MzctNDEuMDc1IDU0LjYzMi02LjQ0NSA2LjU5MS0xMy41MjEgMTMuMTA2LTIxLjcwNyAxNy40NzQtMS42NTcuODg0LTMuMzY0IDEuNjI3LTUuMDg2IDIuMzY0LS4xOTIuMDgxLTIuMjIyIDEuMjE3LTIuMzk5IDEuMTMxLS43NjgtLjM4My0xLjQwOS0yLjU5MS0yLjA5MS0zLjI5My0xLjUyNS0xLjU4LTMuNTkxLTIuMDc1LTUuMzY5LTMuMjU3Ii8+PHBhdGggZmlsbD0iIzAwNEM3NiIgZD0iTTM0Ny4yMjMgMjkwLjUyYy0uNjk3LS4zNDggNC44NjMtLjUxNSA1LjUzNS0uNDE0IDMuMzY5LjUxIDEzLjQ2IDEuNDM0IDE0LjMyOCA1Ljg1My4wMzEuMTYyLjA0MS4zMzQgMCAuNDk1LS44MzggMy4xODItMTkuOTA5IDEuMDgxLTIwLjU5Ni0zLjM0M00zNjYuNjcyIDI2MS4zNTNjLS4xMjItLjA2IDEuNjcxLS4xNzIgMS44NTMtLjE3NyAyLjczOC0uMDcgNS40NzUuMTE3IDguMjAyLjMwMyA2LjQyOS40NCAxMi44MTMgMS4yMjMgMTkuMTkyIDIuMTQyIDIwLjM4OSAyLjkzOSA0MS4yMDcgNi45NTQgNjAuMDgxIDE1LjUzIDQuMTA2IDEuODY5IDE3LjE0NiA3LjMyMyAxNS40MTQgMTMuODY0LTIgNy41NzYtMjMuNjY3IDUuODg5LTI5LjA1NSA1LjM1OC0yMy4xMjItMi4yOTMtNDYuNDgtOS4yMDItNjcuODU0LTE4LjIzMi0yLjQ1LTEuMDM1LTMxLjAxLTEzLjcwNy0xMi43NjMtMTUuOTQ0TTI2OS4xODIgMjk5LjQ4YzEuMjM3LTIuNDcgMTcuNTgxLTUuMzAzIDE3LjI1OC0xLjMyOS0uNTI2IDYuNDA0LTI0LjM3OSA5LjAzMS0xOC4yNzggMy40MDRNMTc0LjI1MyAyNzguNDk1YzAtMi44MTggOS43OTgtNi4yMjcgMTEuNTMtNi45NzUgNS42ODctMi40NDQgNDUuOTc1LTE1LjUgNDguNzkzLTguNDU5IDIuNTg2IDYuNDY5LTM3LjI2OCAxNS42MjEtNDMuMTE2IDE2LjgzOC0yLjU0Ni41My0xOS40NDUgNC41MjUtMTcuNzM4IDEuMjE3TTE4OC4wNzEgMjk2LjY2MWMtLjI4My0uMjgyLjMwMy0uNjUxLjQ5NS0uNzk4IDEuMzIzLTEuMDI1IDkuMjEyLTUuMTQxIDEwLjE1Ni0yLjQ0NCAxLjAxNiAyLjg5NC0xMy4yNDcgOS44ODQtMTEuODk5IDYuMzc5IiBvcGFjaXR5PSIuMTUiLz48cGF0aCBmaWxsPSIjNjdDQkU0IiBkPSJNMjYzLjY4NyAyMDUuNzk4Yy0uNTQ2IDAgMS4wMzUuMzMzIDEuNTYuNDg1IDEuMjAyLjM0MyAyLjM3OS43ODggMy41OTEgMS4wOTEgMy40MDkuODYzIDYuOTMgMS4wOCAxMC40MzUgMS4wOCA2LjIzMiAwIDEyLjU0LTEuNDU0IDE4LjU3LTIuODc4IDIuNTcxLS42MDYgNS4yMTctMS4yMDggNy43MDctMi4xMTIuMzA4LS4xMTEgMS41OTYtLjg5OSAxLjkxNC0uNzYyLjQzNS4xODcgMS4wNjYgNi40MzkuOTc1IDcuNDA0LS4xOTIgMi4wMDUtMTEuOTI0IDQuMTc3LTEzLjg0MyA0LjU3MS03LjMyMyAxLjQ5NS0xNS42MzEgMS40NzQtMjMuMDYxLjYyMS0xLjU0NS0uMTc3LTUuNjIxLjI5OC02LjgyMy0uOTA0LS42MzYtLjYzNy0xLjA1Ni02Ljk4NS0xLjIzNy04LjQ0NSIvPjxwYXRoIGZpbGw9IiM0NTg1QzUiIGQ9Ik0yNzMuMjE3IDIwMy43NDdjMC0uMzMzLjE1MS42MjEuMTY2LjY5Mi4xMDIuNTM1LjIyMyAxLjA2Ni4zNTQgMS41OTFhODUuNjgzIDg1LjY4MyAwIDAgMSAxLjEzMSA1LjE0MWMxIDUuNDY1Ljk4IDYuNTkxIDYuNTgxIDcuMDU2LjU4MS4wNSAzLjM3OS40MzkgMy44NDQtLjA4MS45NTktMS4wNzEuNDM5LTUuNDk1LjQ2OS02Ljg2OS4wNzYtMy40MjQuMDU2LTcuMDUuNzMzLTEwLjQxOS4wMjUtLjEyNi4xMzEtLjQxOS4wMTUtLjUzNS0uNTY2LS41NjEtMTQuOTg1LS4wNDYtMTMuMTUyIDMuNjI2Ii8+PHBhdGggZmlsbD0iIzY3Q0JFNCIgZD0iTTI3Ny42ODIgMjE3LjI2MmMwLS4xMTYtLjU3MSAxLjI3My0uNjkyIDEuNTQ2YTQuODgyIDQuODgyIDAgMCAxLTIuNDY1IDIuNDY0Yy0xLjU5LjcwNy0xMi4wMS0uNDc0LTcuOTM0IDQuNzI4IDMuMjkzIDQuMjAyIDExLjU4NiA0LjQ2NCAxNC44NjkuMzA4IDEuMjE3LTEuNTM2IDQuMDM1LTcuMDMxIDEuMjEyLTguNzkzLTEuMjg4LS44MDMtMy42NTItLjI5OC01LjEyNi0uNDQ1TTMxMS45ODUgMzE1LjMyOGMwIC4wODYtMS44MTMtMS4xNDEtMS45NTktMS4yODMtLjkzLS45MDktMy44NjktNC40NDktMS4yNzMtNS4yNzcgMi41NzEtLjgyNCA1Ljg4OSAxLjQ0OSA4LjIzNyAyLjIzMiAzLjExMiAxLjAzNSA2LjE3Mi44NTMgOS4zNTQgMS4yODggMS4zNTkuMTg3IDIuOTQ0Ljk0OSAzLjA2NiAyLjUwNS4xODEgMi4zMjgtMi4zNDkgMy4xMzYtNC4xODIgMy40MTktNC41MTUuNjkyLTguNzk4LS4xNjctMTIuNjg3LTIuNDg1TTIyNS4yMDcgMzA1LjEzNmMwIC4wMi0xLjA4Ni0uNTgxLTEuMjEyLS42NTItLjg0My0uNDU5LTEuNzI3LS44MTMtMi43MDctLjY1Ni0xLjY5Mi4yNzMtMS4zMjMgMi41ODEtLjc3MyAzLjY2MiAyLjI4MyA0LjQ3NCAxMS45OSAxMS41NyAxNi43OTggMTMuMjAyIDIuNDI0LjgyMyA5LjA4Ni43NDIgNy41NjEtMy43MjgtLjg1NC0yLjQ5NS01LjMzOS0zLjE5Ny03LjUzNi0zLjg3My00LjI1Mi0xLjMxOS05LjQ4NC00LjIyOC0xMi4wMjUtOC4wNDEiLz48cGF0aCBmaWxsPSIjNDU4NUM1IiBkPSJNMjIxLjE1MSAzMDMuNjAxYy0uMTY2LS4zMzkgMS41MiAxLjA1IDEuNjk3IDEuMjA3IDEuMjY4IDEuMTAxIDIuNTA1IDIuMjMyIDMuNzUzIDMuMzUzIDQuMTQxIDMuNzQzIDUuNTgxIDQuNDEgMTAuNDc0IDEuNDQ1LjQ2LS4yNzggMi42MDEtLjkzNCAyLjY5Ny0xLjUwNS4yODMtMS42NDItMy43MjItNC4zOTktNC43ODctNS40NS0xLjA1Ni0xLjA0LTQuMzI5LTUuNTMtNS4zNjQtNS44NTMtLjY2Ny0uMjEyLTEuNTgxIDEuMDk2LTIuMDA1IDEuNDY0LTEuNjExIDEuNDEtNS4xODcgMi44OTktNi4xMzYgNC43OTMiLz48cGF0aCBmaWxsPSIjMDA0Qzc2IiBkPSJNMzA2LjQwOSAzMDUuMjkzYy0uMjcyLS4xNjcuNjU3IDEuNzkyLjc2OCAyLjE2Ni4xNjcuNTYxLS4wMjUgMy41NTYuMjQ3IDMuODU5LjgxNC44OTkgMTAuMTQyIDEuNDc1IDExLjM5OS44ODkuOTg1LS40NjUuODY0LTEuODg0Ljk5LTIuNTMxLjEzMi0uNjYxIDEuMTE2LTIuNDc5LjMxOC0zLjA2NS0uNTQ1LS4zOTktMi44OTktLjE3Ny0zLjY2Ni0uMjE3LTMuMjI3LS4xNTItNi4zMTgtLjYxMi05LjQ2LTEuMDMxIi8+PHBhdGggZmlsbD0iIzAwNEM3NiIgZD0iTTQyMy43MDIgMTE4LjA1Yy0zLjA1LTEuOTY0LTQ3LjI0Ny0yNi44ODQtNDEuNDM5LTguNzgzIDcuMzg0IDIzLjAwNSA3Ni4yNDcgNTYuMjA3IDk3LjUyIDY2LjY1NyA1LjExMSAyLjUxIDMzLjMyMyAxNi42ODcgMzcuNzQyIDguNzYzIDUuNDQ1LTkuNzU4LTMxLjAzLTMyLjcxOC0zMy4xODEtMzEuMzY5LS40MjUuMjYyLTEuNDk1IDEuNDU0LTEuMTY3IDEuOTY0LjM2OS41ODEgMS4xNTEuOTYgMS42OTcgMS4zNDQgNi44MzggNC44NDMgMTcuMTExIDEwLjkxNCAyMC42NjEgMTguODY0LjM3OS44NDguNjEyIDEuODgzLS41MSAyLjE5MS0yLjc3Mi43NTgtNi43MDctLjkxOS05LjI1Ny0xLjc5MmE4Mi41MjggODIuNTI4IDAgMCAxLTcuMzg5LTIuOTQ1Yy0yNC43MTctMTEuMjIyLTQ5LjgwOC0yMy43NDItNzEuOTE0LTM5LjUxNS0yLjc1My0xLjk2NS0yMC4yODgtMTQuODE4LTE2LjQ0LTE5LjQxNCA0LjkxNC01Ljg3NCAxNC42NDIgNi4xMDEgMTkuMTQ3IDguODQ4IiBvcGFjaXR5PSIuMTUiLz48ZyBvcGFjaXR5PSIuMTkiPjxwYXRoIGZpbGw9InVybCgjYykiIGQ9Ik0yMzkuNTM2IDMxNS4yMjJjLjczMiAwLTEuNDY1LS4wNjYtMi4xOTItLjA5MS0xLjQwOS0uMDQ1LTIuODEzLS4wNzEtNC4yMjItLjEyNmEyMDU4LjQxIDIwNTguNDEgMCAwIDEtMTMuNjAxLS42MDFjLTEzLjI0My0uNjI3LTI2LjQ2NS0xLjM1OS0zOS43MjMtMS43OTgtLjQyOS0uMDE1LS44NTgtLjAzMS0xLjI4Mi0uMDUxLS4zOTktLjAxNS0uNzk4LS4wMy0xLjE5Ny0uMDUtMi44MTQtLjEyMS01LjU1Ni4wMy04LjM0NC4wMy0uMjE3IDAtLjMwOC4wNzYtLjM0My4zMDgtLjIzOCAxLjQ2IDIuMDIgMTcuNzI3IDIuNDA0IDE4LjA3NiAyLjA3NiAxLjkwOSA4Ljg0OC0uMjUzIDExLjE5Ny0uNTY2IDEwLjM4NC0xLjM3NCAyMC42NzEtMy4xMjEgMzAuODg0LTUuNDU0IDUuNTg1LTEuMjc4IDExLjIyNy0yLjM3NCAxNi43OTItMy43NTguNTIxLS4xMzEgOS40NzUtMS4xNDEgOS43NzMtMS43NDIiLz48cGF0aCBzdHJva2U9IiNmZmYiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIuMjQyIiBkPSJNMjM5LjUzNiAzMTUuMjIyYy43MzIgMC0xLjQ2NS0uMDY2LTIuMTkyLS4wOTEtMS40MDktLjA0NS0yLjgxMy0uMDcxLTQuMjIyLS4xMjZhMjA1OC40MSAyMDU4LjQxIDAgMCAxLTEzLjYwMS0uNjAxYy0xMy4yNDMtLjYyNy0yNi40NjUtMS4zNTktMzkuNzIzLTEuNzk4LS40MjktLjAxNS0uODU4LS4wMzEtMS4yODItLjA1MS0uMzk5LS4wMTUtLjc5OC0uMDMtMS4xOTctLjA1LTIuODE0LS4xMjEtNS41NTYuMDMtOC4zNDQuMDMtLjIxNyAwLS4zMDguMDc2LS4zNDMuMzA4LS4yMzggMS40NiAyLjAyIDE3LjcyNyAyLjQwNCAxOC4wNzYgMi4wNzYgMS45MDkgOC44NDgtLjI1MyAxMS4xOTctLjU2NiAxMC4zODQtMS4zNzQgMjAuNjcxLTMuMTIxIDMwLjg4NC01LjQ1NCA1LjU4NS0xLjI3OCAxMS4yMjctMi4zNzQgMTYuNzkyLTMuNzU4LjUyMS0uMTMxIDkuNDc1LTEuMTQxIDkuNzczLTEuNzQyIi8+PC9nPjxnIG9wYWNpdHk9Ii4xOSI+PHBhdGggZmlsbD0idXJsKCNkKSIgZD0iTTMyMS4zNDkgMzE1LjIyMmMuNzMzIDAtMS40NjQtLjA2Ni0yLjE5Mi0uMDkxLTEuNDA5LS4wNDUtMi44MTMtLjA3MS00LjIyMi0uMTI2LTQuNTM1LS4xODItOS4wNjYtLjM4OS0xMy42MDEtLjYwMS0xMy4yNDItLjYyNy0yNi40NjUtMS4zNTktMzkuNzIyLTEuNzk4LS40MjktLjAxNS0uODU5LS4wMzEtMS4yODMtLjA1MS0uMzk5LS4wMTUtLjc5OC0uMDMtMS4xOTctLjA1LTIuODEzLS4xMjEtNS41NTYuMDMtOC4zNDMuMDMtLjIxOCAwLS4zMDguMDc2LS4zNDQuMzA4LS4yMzcgMS40NiAyLjAyIDE3LjcyNyAyLjQwNCAxOC4wNzYgMi4wNzYgMS45MDkgOC44NDktLjI1MyAxMS4xOTctLjU2NiAxMC4zODQtMS4zNzQgMjAuNjcyLTMuMTIxIDMwLjg4NC01LjQ1NCA1LjU4Ni0xLjI3OCAxMS4yMjctMi4zNzQgMTYuNzkzLTMuNzU4LjUyLS4xMzEgOS40NzUtMS4xNDEgOS43NzMtMS43NDIiLz48cGF0aCBzdHJva2U9IiNmZmYiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIuMjQyIiBkPSJNMzIxLjM0OSAzMTUuMjIyYy43MzMgMC0xLjQ2NC0uMDY2LTIuMTkyLS4wOTEtMS40MDktLjA0NS0yLjgxMy0uMDcxLTQuMjIyLS4xMjYtNC41MzUtLjE4Mi05LjA2Ni0uMzg5LTEzLjYwMS0uNjAxLTEzLjI0Mi0uNjI3LTI2LjQ2NS0xLjM1OS0zOS43MjItMS43OTgtLjQyOS0uMDE1LS44NTktLjAzMS0xLjI4My0uMDUxLS4zOTktLjAxNS0uNzk4LS4wMy0xLjE5Ny0uMDUtMi44MTMtLjEyMS01LjU1Ni4wMy04LjM0My4wMy0uMjE4IDAtLjMwOC4wNzYtLjM0NC4zMDgtLjIzNyAxLjQ2IDIuMDIgMTcuNzI3IDIuNDA0IDE4LjA3NiAyLjA3NiAxLjkwOSA4Ljg0OS0uMjUzIDExLjE5Ny0uNTY2IDEwLjM4NC0xLjM3NCAyMC42NzItMy4xMjEgMzAuODg0LTUuNDU0IDUuNTg2LTEuMjc4IDExLjIyNy0yLjM3NCAxNi43OTMtMy43NTguNTItLjEzMSA5LjQ3NS0xLjE0MSA5Ljc3My0xLjc0MiIvPjwvZz48cGF0aCBzdHJva2U9IiMwMDRDNzYiIHN0cm9rZS1kYXNoYXJyYXk9IjguODIgOC44MiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjEuNDcxIiBkPSJNMTUwLjEwNiAxMzUuMTQ2czM3LjI2OC0zNy4yMTcgODUuMjk4LTQ2LjM4M00xODYuNzMyIDEyMC43NzNjOS4xOTItNS4zODkgMTYuMTc3LTE1Ljc2MyA0OC42NjctMjYuMTA2Ii8+PC9nPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDE9IjMwMi40MjYiIHgyPSIzMDUuMDQzIiB5MT0iMjkwLjAwNyIgeTI9IjIxMi4zNjYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNTFDN0VBIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImMiIHgxPSIxNjkuMDYyIiB4Mj0iMjQwLjE2NCIgeTE9IjMyMi4wNDEiIHkyPSIzMjIuNDk0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzUxQzdFQSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJkIiB4MT0iMjUwLjg3NSIgeDI9IjMyMS45NzgiIHkxPSIzMjIuMDQxIiB5Mj0iMzIyLjQ5NCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNmZmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1MUM3RUEiLz48L2xpbmVhckdyYWRpZW50PjxjbGlwUGF0aCBpZD0iYSI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTS45MSAwSDYxOS4wOXY0MDBILjkxeiIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg==");

/***/ }),

/***/ "./src/svg/NoFavorites.svg":
/*!*********************************!*\
  !*** ./src/svg/NoFavorites.svg ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: function() { return /* binding */ SvgNoFavorites; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path, _path2, _path3, _path4, _path5, _path6, _path7, _path8, _path9, _path10, _path11, _g, _path12, _g2, _path13, _g3, _path14, _g4, _path15, _path16, _path17, _path18, _path19, _path20, _defs;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SvgNoFavorites = function SvgNoFavorites(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 620 400"
  }, props), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    clipPath: "url(#NoFavorites_svg__a)"
  }, _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#NoFavorites_svg__b)",
    d: "M335.586 362.46c-10.096-2.086-17.005-12.121-18.682-22.293-1.677-10.172.788-20.525 3.298-30.525s5.101-20.298 3.677-30.511c-1.419-10.151-6.687-19.313-9.636-29.126a65.37 65.37 0 0 1-1.697-30.348c.969-5.329 2.848-10.899 7.181-14.142 4.743-3.55 11.147-3.464 17.026-4.171 13.671-1.637 26.404-8.329 36.828-17.319 10.429-8.989 18.717-20.202 25.98-31.899 7.05-11.353 13.535-23.606 24.227-31.621 10.697-8.015 27.263-10.217 36.758-.808 2.873 2.849 4.863 6.515 6.07 10.384 2.389 7.641 1.748 16.192-1.762 23.389-5.768 11.828-18.02 18.773-27.813 27.566-11.409 10.242-20.248 26.151-15.127 40.601 1.531 4.323 4.197 8.136 6.213 12.252 4.237 8.657 5.52 18.823 3.055 28.141-2.465 9.319-8.768 17.657-17.303 22.132-10.091 5.288-22.253 4.99-32.742 9.429-8.349 3.535-15.374 10.106-19.45 18.202-7.555 15.005-5.066 34.207-15.05 47.717-3.036 4.106-9.566 7.323-12.788 3.364",
    opacity: 0.32
  })), _path2 || (_path2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#NoFavorites_svg__c)",
    d: "M159.293 336.086a203.975 203.975 0 0 1 41.151-54.212l9.521 6.409c.621.419 1.267.869 1.575 1.55.364.808.167 1.743-.03 2.606a367.08 367.08 0 0 0-8.293 53.581",
    opacity: 0.32
  })), _path3 || (_path3 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#NoFavorites_svg__d)",
    d: "M297.778 243.884c-6.47-2.521-13.964-.203-19.576 3.883-5.611 4.086-9.833 9.748-14.464 14.914-9.707 10.834-22.955 20.228-37.47 19.253-1.798-.121-3.677-.439-5.091-1.561-1.242-.984-1.975-2.479-2.47-3.984-3.126-9.465 1.662-19.92-.247-29.702-1.843-9.445-9.591-16.612-17.732-21.748-8.142-5.131-17.177-9.02-24.293-15.495s-12.081-16.651-8.924-25.742c3.07-8.849 12.459-13.627 21.151-17.111 8.697-3.485 18.258-7.137 22.919-15.258 4.919-8.581 2.94-19.919 8.147-28.323 3.737-6.031 10.596-9.475 17.485-11.187 9.378-2.328 21.292-.849 25.671 7.768 3.738 7.348.253 16.247 1.263 24.429 1.459 11.813 12.04 20.414 22.848 25.399 10.814 4.98 22.758 7.768 32.485 14.636 14.399 10.167 21.924 29.202 18.379 46.465-1.45 7.05-4.763 13.954-10.409 18.419-5.647 4.465-13.864 6.025-20.243 2.692-5.015-2.621-9.5-8.126-15.005-6.798",
    opacity: 0.32
  })), _path4 || (_path4 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#68CBE3",
    d: "M190.283 285.762c7.126-20.59 19.5-39.338 35.626-53.984 5.379-4.884 12.283-9.596 19.359-7.935 7.374 1.733 11.621 10.147 11.03 17.697-.591 7.551-4.848 14.283-9.399 20.339-9.49 12.626-21.025 23.99-34.974 31.394-3.642 1.934-7.611 3.626-11.733 3.439-4.121-.187-8.384-2.758-9.318-6.773-.949-4.086 1.636-8.076 4.096-11.48m205.859-20.217c-1.566-6.394-9.788-8.798-12.788-14.661-3.187-6.222.657-13.788 5.46-18.869 3.055-3.232 6.757-6.167 11.151-6.874 6.748-1.086 13.122 3.278 18.061 8 18.429 17.596 28.374 43.702 26.318 69.096-.288 3.556-2.298 8.223-5.763 7.379-1.212-.298-2.136-1.252-2.979-2.172-3.283-3.575-6.48-7.227-9.677-10.878-11.712-13.384-23.424-26.773-35.142-40.157"
  })), _path5 || (_path5 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#NoFavorites_svg__e)",
    d: "M487.955 340.96a193.122 193.122 0 0 0-38.969-51.334c-3.005 2.02-6.011 4.046-9.016 6.066-.585.394-1.202.823-1.495 1.465-.348.762-.161 1.651.031 2.469a347.764 347.764 0 0 1 7.853 50.738",
    opacity: 0.32
  })), _path6 || (_path6 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#NoFavorites_svg__f)",
    d: "M391.93 205.394c-3.884-8.101-10.642-10.545-17.763-13.364-11.879-4.697-24.394-8.151-37.161-8.545-12.768-.389-25.849 2.439-36.511 9.48-6.752 4.459-12.358 10.459-18.944 15.166a60.768 60.768 0 0 1-22.571 9.97c-7.267 1.561-14.762 1.773-22.06 3.167-7.298 1.399-14.687 4.202-19.546 9.823-5.702 6.601-6.894 16.742-2.879 24.485 4.202 8.096 12.809 12.687 20.263 17.944 7.455 5.258 14.727 13.036 13.813 22.111-.278 2.753-1.308 5.374-1.727 8.112-1.02 6.707 1.889 13.691 6.833 18.333 4.945 4.641 11.712 7.071 18.48 7.525 7.04.475 14.495-1.252 19.672-6.045 6.449-5.965 8.217-15.263 11.071-23.571 2.121-6.162 5.116-12.212 9.949-16.586 4.833-4.374 11.768-6.823 18.03-5.03 8.889 2.54 13.44 12.005 18.935 19.439a57.023 57.023 0 0 0 16.692 15.096c9.848 5.849 22.929 8.389 32.51 2.116 6.681-4.378 10.399-12.343 11.237-20.293.838-7.949-.859-15.944-3.071-23.621-1.697-5.894-3.692-12.293-1.414-17.99 1.101-2.752 3.121-5.06 4.197-7.823 2.758-7.071-1.278-14.934-6.02-20.864-4.732-5.924-10.53-11.59-12.015-19.035Z",
    opacity: 0.32
  })), _path7 || (_path7 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#NoFavorites_svg__g)",
    d: "M270.268 153.995c2.273 8.505 9.03 11.954 15.677 15.757 11.091 6.344 22.98 11.546 35.565 13.753 12.581 2.207 25.935 1.268 37.49-4.182 7.318-3.454 13.722-8.591 20.909-12.313a60.898 60.898 0 0 1 23.763-6.657c7.414-.505 14.864.349 22.288.005 7.424-.343 15.136-2.065 20.742-6.939 6.586-5.722 9.207-15.586 6.334-23.828-3.005-8.616-10.869-14.379-17.5-20.647-6.632-6.267-12.723-15-10.521-23.853.667-2.687 2.061-5.131 2.864-7.783 1.965-6.495.081-13.818-4.151-19.121-4.238-5.298-10.586-8.667-17.218-10.081-6.899-1.475-14.525-.823-20.333 3.182-7.232 4.985-10.308 13.934-14.318 21.752-2.975 5.798-6.808 11.359-12.212 15-5.404 3.642-12.616 5.076-18.566 2.414-8.434-3.777-11.591-13.798-15.97-21.939a57.02 57.02 0 0 0-14.373-17.323c-8.914-7.192-21.5-11.57-31.874-6.722-7.243 3.383-12.051 10.737-14.015 18.484-1.965 7.748-1.419 15.904-.323 23.819.838 6.075 1.904 12.692-1.162 18.01-1.48 2.565-3.808 4.565-5.268 7.146-3.737 6.606-.863 14.965 2.985 21.51 3.844 6.541 8.778 12.975 9.187 20.556Z",
    opacity: 0.32
  })), _path8 || (_path8 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004D76",
    d: "M222.531 258.288c.465 6.671.611 13.363.45 20.05 40 11.722 82.636 9.071 124.171 5.591 10.632-.889 21.278-1.833 31.788-3.656a191.442 191.442 0 0 0 39.773-11.445c1.025-.419 2.106-.894 2.753-1.793.641-.894.742-2.055.823-3.151.323-4.44.778-11.324 1.101-15.763-27.596 6.323-56.268 9.475-84.576 9.904-38.439.581-76.889.697-115.333.354"
  })), _path9 || (_path9 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#4684C5",
    d: "M239.46 250.566c15.02-5.879 41.732-6.278 59.116-7.495 40.747-2.854 53.52-2.687 93.136-1.818 10.036.217 20.091 1.909 29.566 5.227.879.308 1.864.747 2.116 1.646.293 1.026-.545 2.01-1.343 2.718-6.515 5.772-15.02 8.717-23.394 11.085-54.546 15.435-112.571 9.995-168.808 2.92-2.955-.374-8.172-3.702-7.313-6.556.262-.859 6.106-4.02 6.969-4.278 4.955-1.51 5.692-2.384 9.955-3.449Z"
  })), _path10 || (_path10 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004C76",
    d: "M233.783 258.354c.298-28.006-3.964-54.637-3.848-82.642.116-28.005 7.687-58.055 29.364-75.793 5.848-4.788 12.52-8.495 19.449-11.51 13.207-5.742 27.505-9.02 41.904-9.404a108.944 108.944 0 0 1 42.445 7.424c8.161 3.192 15.974 7.404 22.702 13.02 19.995 16.697 28.202 43.889 29.793 69.889 1.59 26-2.394 52.041-1.889 78.086.02.98.03 2.02-.475 2.864-.606 1.015-1.798 1.49-2.909 1.889-35.738 12.778-74.46 13.939-112.414 13.909-21.642-.015-41.546-4.137-64.122-7.732Z",
    opacity: 0.08
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "NoFavorites_svg__h",
    width: 187,
    height: 189,
    x: 229,
    y: 78,
    maskUnits: "userSpaceOnUse",
    style: {
      maskType: "luminance"
    }
  }, _path11 || (_path11 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M233.783 258.354c.298-28.006-3.964-54.637-3.848-82.642.116-28.005 7.687-58.055 29.364-75.793 5.848-4.788 12.52-8.495 19.449-11.51 13.207-5.742 27.505-9.02 41.904-9.404a108.944 108.944 0 0 1 42.445 7.424c8.161 3.192 15.974 7.404 22.702 13.02 19.995 16.697 28.202 43.889 29.793 69.889 1.59 26-2.394 52.041-1.889 78.086.02.98.03 2.02-.475 2.864-.606 1.015-1.798 1.49-2.909 1.889-35.738 12.778-74.465 14.348-112.414 13.909-22.344-.253-65.49-7.97-64.122-7.732Z"
  }))), _g || (_g = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#NoFavorites_svg__h)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#69CCE5",
    d: "M278.971 237.151h-.647v-80.803h.647v80.803Zm-3.995 0h-.647v-83.56h.647v83.56Zm-3.99-.161h-.647v-86.197h.647v86.197Zm11.979-.041h-.646v-78.484h.646v78.484Zm-15.974-.277h-.647v-88.516h.647v88.516Zm19.969-.122h-.646v-77.09h.646v77.09Zm-23.964-.358h-.647v-90.389h.647v90.389Zm27.959-.278h-.646V159.5h.646v76.414Zm-31.954-.359h-.647v-91.868h.647v91.868Zm35.949-.479h-.646v-76.01h.646v76.01Zm-39.944-.283h-.647v-92.945h.647v92.945Zm43.939-.798h-.646v-75.611h.646v75.611Zm-47.934-.116h-.646v-93.268h.646v93.268Zm-3.995-1h-.646v-92.707h.646v92.707Zm55.924-.243h-.646v-75.131h.646v75.131Zm-59.919-.954h-.646v-91.551h.646v91.551ZM306.93 231h-.646v-74.455h.646V231Zm-67.899-.601h-.646v-89.828h.646v89.828Zm71.894-1.318h-.646v-73.536h.646v73.536Zm-75.889-.116h-.646v-87.516h.646v87.516Zm-3.995-1.642h-.646v-84.596h.646v84.596Zm83.879-.515h-.646v-72.177h.646v72.177Zm-87.874-1.278h-.646v-81.126h.646v81.126Zm91.869-1.318h-.646v-70.5h.646v70.5Zm-95.864-.722h-.646v-77.01h.646v77.01Zm-3.995-2.238h-.646v-72.257h.646v72.257Zm103.854-.116h-.647V152.99h.647v68.146Zm-107.849-2.399h-.646V152.03h.646v66.707Zm111.844-1.156h-.647V152.51h.647v65.071Zm-115.833-1.758h-.647v-60.197h.647v60.197Zm119.828-2.439h-.647v-61.071h.647v61.071Zm-123.823-.879h-.647v-52.444h.647v52.444Zm127.818-4.152h-.652v-55.681h.647v55.681h.005Zm-131.813 0h-.647v-42.818h.647v42.818Zm-3.995-5.434h-.647v-30.035h.647v30.035ZM338.885 202h-.647v-48.172h.647V202Zm3.995-8.546h-.647v-36.787h.647v36.787Zm-147.788-1.757h-.647v-5.591h.647v5.591Zm151.783-16.217h-.647v-8.51h.647v8.51Z",
    opacity: 0.6
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "NoFavorites_svg__i",
    width: 187,
    height: 189,
    x: 229,
    y: 78,
    maskUnits: "userSpaceOnUse",
    style: {
      maskType: "luminance"
    }
  }, _path12 || (_path12 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M233.783 258.354c.298-28.006-3.964-54.637-3.848-82.642.116-28.005 7.687-58.055 29.364-75.793 5.848-4.788 12.52-8.495 19.449-11.51 13.207-5.742 27.505-9.02 41.904-9.404a108.944 108.944 0 0 1 42.445 7.424c8.161 3.192 15.974 7.404 22.702 13.02 19.995 16.697 28.202 43.889 29.793 69.889 1.59 26-2.394 52.041-1.889 78.086.02.98.03 2.02-.475 2.864-.606 1.015-1.798 1.49-2.909 1.889-35.738 12.778-74.465 14.348-112.414 13.909-22.344-.253-65.49-7.97-64.122-7.732Z"
  }))), _g2 || (_g2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#NoFavorites_svg__i)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    opacity: 0.31
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#NoFavorites_svg__j)",
    d: "M462.697 185.182c8.182-6.036 17.965-16.005 4.46-29.515-14.323-14.324-45.965 21.247-60.126-6.556-8.596-16.869 18.54-36.197 9.485-65.596-12.384-40.227-85.364-50.232-114.703-49.121-83.434 3.157-129.525 70.136-128.898 130.096.787 75.505 96.747 185.939 201.893 102.858 31.728-25.07 24.218-35.949 53.601-58.696"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#fff",
    strokeMiterlimit: 10,
    strokeWidth: 0.166,
    d: "M462.697 185.182c8.182-6.036 17.965-16.005 4.46-29.515-14.323-14.324-45.965 21.247-60.126-6.556-8.596-16.869 18.54-36.197 9.485-65.596-12.384-40.227-85.364-50.232-114.703-49.121-83.434 3.157-129.525 70.136-128.898 130.096.787 75.505 96.747 185.939 201.893 102.858 31.728-25.07 24.218-35.949 53.601-58.696"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#NoFavorites_svg__k)",
    stroke: "#fff",
    strokeMiterlimit: 10,
    strokeWidth: 0.166,
    d: "M443.015 134.379c-5.227 4.671-17.611 11.823-24.353 3.368-7.101-8.909 1.772-21.843 7.101-26.186 5.641-4.596 14.596-7.086 21.282-.485 7.354 7.272.738 19.04-4.03 23.303Z",
    opacity: 0.31
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#68CBE3",
    d: "M237.435 120.212c-.631-6.202 3.884-11.742 10.086-12.369 6.202-.631 11.737 3.889 12.368 10.086.632 6.202-3.883 11.738-10.085 12.369-6.202.631-11.738-3.884-12.369-10.086Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M272.849 243.278c0-.818.666-1.485 1.484-1.485a1.484 1.484 0 1 1-1.484 1.485Zm69.95-13.793a1.485 1.485 0 1 1 2.97 0 1.485 1.485 0 0 1-2.97 0Zm61.454-45.788c0-.818.667-1.485 1.485-1.485a1.485 1.485 0 1 1-1.485 1.485Zm-157.076 34.258a1.483 1.483 0 1 1 2.969 0c0 .818-.666 1.484-1.484 1.484a1.483 1.483 0 0 1-1.485-1.484Zm77.606-86.218c0-.818.667-1.485 1.485-1.485a1.484 1.484 0 1 1-1.485 1.485Zm54.359 5.369c0-.818.666-1.485 1.484-1.485.819 0 1.485.667 1.485 1.485 0 .818-.666 1.485-1.485 1.485a1.487 1.487 0 0 1-1.484-1.485Zm-4.238 90.364a1.122 1.122 0 1 1 2.244.002 1.122 1.122 0 0 1-2.244-.002ZM312.439 92.43a2.382 2.382 0 0 1 2.384-2.385 2.382 2.382 0 0 1 2.384 2.384 2.382 2.382 0 0 1-2.384 2.384 2.382 2.382 0 0 1-2.384-2.384Zm-76.807 16.479c0-.621.5-1.121 1.121-1.121s1.121.5 1.121 1.121-.5 1.121-1.121 1.121c-.616 0-1.121-.5-1.121-1.121Zm26.868 14.157c2.722-.389 3.035-.702 3.419-3.425.384 2.723.702 3.031 3.424 3.425-2.722.388-3.035.697-3.424 3.419-.384-2.722-.697-3.031-3.419-3.419Zm21.89-10.899c2.722-.389 3.035-.702 3.424-3.42.384 2.723.702 3.031 3.419 3.42-2.722.389-3.035.702-3.419 3.424-.389-2.722-.702-3.035-3.424-3.424Zm-3.425 18.368c2.722-.384 3.035-.697 3.424-3.419.384 2.722.697 3.035 3.424 3.419-2.722.389-3.035.702-3.424 3.425-.389-2.723-.702-3.036-3.424-3.425Zm127.556 103.531c1.282-.182 1.429-.329 1.611-1.611.181 1.277.328 1.429 1.611 1.611-1.283.182-1.43.328-1.611 1.611-.187-1.283-.334-1.429-1.611-1.611Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004C76",
    d: "m333.515 256.848 33.844-30.989a.237.237 0 0 1 .333.015.238.238 0 0 1 0 .318l-30.99 33.843a2.259 2.259 0 0 1-3.187.142 2.253 2.253 0 0 1 0-3.329Zm-88.631-86.969 22.929-21a.16.16 0 0 1 .228.01.163.163 0 0 1 0 .217l-21 22.929a1.526 1.526 0 1 1-2.253-2.06c.031-.036.066-.066.096-.096Z",
    opacity: 0.15
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M291.056 260.621a.89.89 0 1 1-.581 1.682.89.89 0 0 1 .581-1.682Zm-.616-9.192a1.195 1.195 0 1 1-.784 2.258 1.195 1.195 0 0 1 .784-2.258Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m290.64 261.369-5.664 9.099.295.184 5.664-9.099-.295-.184Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m289.874 252.571.349-.026.717 8.904-.349.031-.717-8.909Zm-57.798-91.869-.247.167-3.874-5.627.248-.171 3.873 5.631Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m232.102 160.769-.294.046 5.687 36.708.294-.046-5.687-36.708Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m246.293 194.232-8.58 3.399-.111-.277 8.58-3.399.111.277Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m246.384 194.096-.298-.01.278-7.399.298.01-.278 7.399Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m246.586 186.823-9.722 5.248-.141-.263 9.722-5.247.141.262Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M246.147 187.429a.823.823 0 1 1 .737-1.475.824.824 0 1 1-.737 1.475Zm-8.859 10.803a.821.821 0 0 1-.364-1.106.827.827 0 0 1 1.106-.368.823.823 0 0 1 .369 1.106.83.83 0 0 1-1.111.368Zm8.677-3.606a.596.596 0 0 1-.268-.803.598.598 0 1 1 .268.803Zm-9.44-2.151a.598.598 0 1 1 .537-1.071.598.598 0 0 1-.537 1.071Zm-5.04-31.253a.598.598 0 1 1 .535-1.07.598.598 0 0 1-.535 1.07Zm101.803-62.071a1.232 1.232 0 0 1-1.151-1.313 1.234 1.234 0 1 1 1.151 1.313Zm-.732 11.117a.916.916 0 0 1-.854-.98.924.924 0 0 1 .975-.859c.505.036.889.47.859.975a.926.926 0 0 1-.98.864Zm49.757-23.167a1.23 1.23 0 0 1-1.146-1.313 1.233 1.233 0 0 1 1.313-1.152 1.232 1.232 0 0 1 1.152 1.308 1.246 1.246 0 0 1-1.319 1.157Zm-56.535 28.758a1.233 1.233 0 0 1-1.146-1.314 1.233 1.233 0 0 1 1.313-1.151 1.23 1.23 0 0 1 1.151 1.308 1.242 1.242 0 0 1-1.318 1.157Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M271.995 71.828c-.03.05-.081.076-.116.116l53.874 42.824.222-.283-53.884-42.834c-.03.061-.061.122-.096.177Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m332.486 109.219-6.754 5.276.221.282 6.754-5.276-.221-.282Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m333.551 97.93-.758 11.434-.358-.021.757-11.434.359.02Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m333.546 97.869-.348.1-9.192-31.01.343-.106 9.197 31.016Zm15.348-52.056-.274.23 33.62 39.948.274-.23-33.62-39.948Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m380.369 137.328-.358-.01 2.207-51.454.358.015-2.207 51.449Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#68CBE3",
    d: "M276.233 171.611c8.616-4.121 18.974-.465 23.096 8.152 4.121 8.616.464 18.974-8.152 23.096a17.208 17.208 0 0 1-7.45 1.697c-6.464 0-12.681-3.632-15.651-9.844-4.116-8.616-.46-18.98 8.157-23.101Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004C76",
    d: "M252.566 203.318c.601 1.253 2.237 1.798 4.626 1.798 3.904 0 9.803-1.48 16.369-3.848 4.581-1.632 9.485-3.702 14.273-5.99 4.606-2.202 9.126-4.616 13.161-7.066 9.839-5.939 16.834-12.005 15.233-15.343-1.904-3.975-13.445-.627-20.526 1.879.465.429.899.899 1.313 1.399 11.824-4.086 17.021-3.778 17.627-2.521.697 1.465-3.541 6.308-13.647 12.546-3.798 2.343-8.419 4.889-13.919 7.525-5.727 2.732-10.773 4.793-15.091 6.298-10.889 3.773-17.141 4-17.828 2.566-.591-1.223 2.323-5.374 12.596-11.859a12.965 12.965 0 0 1-.273-1.909c-6.217 3.859-15.783 10.621-13.914 14.525Zm43.121-73.889 33.844-30.99a.238.238 0 0 1 .333.016.239.239 0 0 1 0 .318l-30.99 33.843a2.259 2.259 0 0 1-3.187.142 2.253 2.253 0 0 1-.141-3.187c.045-.051.096-.096.141-.142Z",
    opacity: 0.15
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "NoFavorites_svg__l",
    width: 187,
    height: 189,
    x: 229,
    y: 78,
    maskUnits: "userSpaceOnUse",
    style: {
      maskType: "luminance"
    }
  }, _path13 || (_path13 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M233.783 258.354c.298-28.006-3.964-54.637-3.848-82.642.116-28.005 7.687-58.055 29.364-75.793 5.848-4.788 12.52-8.495 19.449-11.51 13.207-5.742 27.505-9.02 41.904-9.404a108.944 108.944 0 0 1 42.445 7.424c8.161 3.192 15.974 7.404 22.702 13.02 19.995 16.697 28.202 43.889 29.793 69.889 1.59 26-2.394 52.041-1.889 78.086.02.98.03 2.02-.475 2.864-.606 1.015-1.798 1.49-2.909 1.889-35.738 12.778-74.465 14.348-112.414 13.909-22.344-.253-65.49-7.97-64.122-7.732Z"
  }))), _g3 || (_g3 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#NoFavorites_svg__l)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#68CBE3",
    d: "M330.904 229.495c-3.454-.288-7.086 1.358-8.858 4.338-1.773 2.975-1.384 7.177 1.136 9.556 1.05.99 2.379 1.636 3.742 2.116 1.566.551 3.308.894 4.864.328 1.051-.378 1.919-1.141 2.646-1.99 1.526-1.787 2.506-4.07 2.551-6.419.045-2.348-.894-4.737-2.657-6.288-.924-.813-2.277-1.474-3.424-1.641Z"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("mask", {
    id: "NoFavorites_svg__m",
    width: 187,
    height: 189,
    x: 229,
    y: 78,
    maskUnits: "userSpaceOnUse",
    style: {
      maskType: "luminance"
    }
  }, _path14 || (_path14 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M233.783 258.354c.298-28.006-3.964-54.637-3.848-82.642.116-28.005 7.687-58.055 29.364-75.793 5.848-4.788 12.52-8.495 19.449-11.51 13.207-5.742 27.505-9.02 41.904-9.404a108.944 108.944 0 0 1 42.445 7.424c8.161 3.192 15.974 7.404 22.702 13.02 19.995 16.697 28.202 43.889 29.793 69.889 1.59 26-2.394 52.041-1.889 78.086.02.98.03 2.02-.475 2.864-.606 1.015-1.798 1.49-2.909 1.889-35.738 12.778-74.465 14.348-112.414 13.909-22.344-.253-65.49-7.97-64.122-7.732Z"
  }))), _g4 || (_g4 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    mask: "url(#NoFavorites_svg__m)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#68CBE3",
    d: "M367.217 120.237c-36.444-.485-31.217 52.253 4.182 46.92 25.975-3.91 26.369-45.309-4.182-46.92Z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004C76",
    d: "M342.556 141.909c-2.404-.646-35.485-11.601-23.601-17.01 15.101-6.874 63.783 12.798 78.919 18.788 3.636 1.439 23.869 9.232 21.884 15.136-2.445 7.273-30.96-.666-31.268-2.379-.06-.338.051-1.429.46-1.5.464-.08 1.02.142 1.464.243 5.622 1.237 13.45 3.656 19.132 1.788.606-.197 1.242-.561.879-1.273-.899-1.758-3.566-2.985-5.187-3.879a57.227 57.227 0 0 0-4.909-2.399c-17.122-7.384-35.071-14.353-53.298-18.308-2.268-.49-16.899-3.47-17.46.611-.717 5.212 9.864 4.626 13.338 5.647",
    opacity: 0.15
  }))), _path15 || (_path15 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M406.673 202.096c2.767-4.707 2.919-10.445 3-15.904.116-7.975.227-15.965-.49-23.904a114.554 114.554 0 0 0-10.248-38.02c-2.762-5.925-6.091-11.692-10.782-16.243-3.894-3.778-8.596-6.596-13.253-9.384l-10.384-6.212c-2.904-1.737-5.828-3.485-8.98-4.727-6.878-2.707-14.454-2.874-21.848-3.005-7.667-.136-15.374-.268-22.96.848-6.05.89-11.969 2.571-17.722 4.652-7.298 2.641-14.833 6.364-18.566 13.172a809.703 809.703 0 0 1 30.581 4.641c5.475.939 10.975 1.944 16.172 3.894 8.066 3.03 15.111 8.222 21.98 13.424 13.424 10.167 26.707 20.677 37.995 33.172 11.288 12.495 20.575 27.141 24.823 43.439",
    opacity: 0.71
  })), _path16 || (_path16 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#F0B11D",
    d: "m387.693 184.899 1.005-1.626c.217-.354.758-.182.743.232-.021.46-.101.944.05 1.364.197.555.717.853 1.303 1.025.303.091.369.485.126.687a4.004 4.004 0 0 0-1.399 2.894.399.399 0 0 1-.651.293c-.44-.354-.859-.733-1.207-1.177a.403.403 0 0 0-.465-.116c-.545.222-1.076.474-1.601.742-.323.167-.692-.141-.566-.48.197-.54.324-1.096.324-1.666 0-.657-.192-1.334-.571-1.864-.202-.273.02-.667.359-.631.434.045.863.161 1.257.348m-88.581-38.076 1.005-1.626c.217-.353.758-.182.743.233-.021.459-.101.944.05 1.363.197.556.717.854 1.303 1.025.303.091.369.485.126.687a4.004 4.004 0 0 0-1.399 2.894.399.399 0 0 1-.651.293c-.44-.353-.859-.732-1.207-1.177a.404.404 0 0 0-.465-.116c-.545.222-1.076.475-1.601.743-.323.166-.692-.142-.566-.48.197-.541.324-1.096.324-1.667 0-.656-.192-1.333-.571-1.863-.202-.273.02-.667.359-.632.434.046.863.162 1.257.349m62.975 59.303c.227-.869.672-1.202 1.106-1.793.187-.253.581-.222.712.06.187.384.324.793.404 1.218a.413.413 0 0 0 .435.333l1.626-.106c.364-.025.581.399.353.687a5.25 5.25 0 0 1-.757.778c-.162.131-.338.267-.404.464-.056.167-.02.354.02.525.086.349.192.697.318 1.031.121.318-.182.651-.51.55a2.678 2.678 0 0 1-.783-.379c-.222-.161-.459-.368-.732-.333-.177.02-.323.136-.46.248l-1.252 1.03c-.243.202-.626.071-.677-.243a3.851 3.851 0 0 0-.217-.752 4.438 4.438 0 0 0-1.596-1.98.416.416 0 0 1 .116-.742c.793-.243 1.636-.591 2.298-.596Zm-149.414-83.818 1.005-1.627c.217-.353.757-.182.742.233-.02.459-.101.944.051 1.363.197.556.717.854 1.303 1.026.303.09.368.484.126.686a4 4 0 0 0-1.399 2.894.4.4 0 0 1-.652.293c-.439-.353-.858-.732-1.207-1.177a.403.403 0 0 0-.464-.116 20.92 20.92 0 0 0-1.601.743c-.324.166-.692-.142-.566-.48.197-.54.323-1.096.323-1.667 0-.656-.192-1.333-.57-1.863-.202-.273.02-.667.358-.632.434.046.864.162 1.258.349m126.555-68.611 1.005-1.627c.218-.353.758-.181.743.233-.02.46-.101.944.05 1.363.197.556.717.854 1.303 1.026.303.09.369.484.127.687a3.996 3.996 0 0 0-1.399 2.893.4.4 0 0 1-.652.293c-.439-.353-.858-.732-1.207-1.176a.403.403 0 0 0-.465-.117 21.28 21.28 0 0 0-1.601.743c-.323.166-.692-.142-.565-.48.197-.54.323-1.096.323-1.667 0-.656-.192-1.333-.571-1.863a.4.4 0 0 1 .359-.632c.434.046.863.162 1.257.349m-19.565 248.798 1.005-1.626c.217-.354.758-.182.742.232-.02.46-.101.944.051 1.364.197.555.717.853 1.303 1.025.303.091.369.485.126.687a4.004 4.004 0 0 0-1.399 2.894.399.399 0 0 1-.651.293c-.44-.354-.859-.733-1.207-1.177a.401.401 0 0 0-.465-.116c-.545.222-1.076.474-1.601.742-.323.167-.692-.141-.566-.48.197-.54.324-1.096.324-1.666 0-.657-.192-1.334-.571-1.864-.202-.273.02-.667.358-.631a3.87 3.87 0 0 1 1.258.348"
  })), _path17 || (_path17 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#68CBE3",
    d: "M435.647 278.394c-7.01-11.394-17.151-20.839-29.01-27.03-1.596-.834-3.288-1.627-5.086-1.642-2.883-.025-5.5 2.051-6.757 4.647-1.258 2.596-1.349 5.616-.975 8.474.995 7.551 5.076 14.445 10.343 19.945 5.268 5.5 11.697 9.742 18.218 13.672 2.823 1.702 5.767 3.383 9.025 3.868 3.263.48 6.944-.505 8.803-3.227 2.217-3.242 1.187-7.672-.404-11.263a44.034 44.034 0 0 0-11.652-15.611"
  })), _path18 || (_path18 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004D76",
    d: "M426.4 303.864c4.49-1.637 8.156-4.915 11.702-8.122 5.414-4.899 10.833-9.798 16.247-14.697.566-.51 1.293-1.055 2.01-.808.576.202.859.829 1.126 1.374a10.95 10.95 0 0 0 5.632 5.222 168.595 168.595 0 0 1-29.066 27.111l-8.187-8.717"
  })), _path19 || (_path19 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#68CBE3",
    d: "M207.102 295.939c4.56-13.025 13.394-24.515 24.813-32.262 5.035-3.42 10.863-6.192 16.944-5.904 1.945.09 4.015.58 5.298 2.04 1.647 1.869 1.5 4.732.727 7.101-1.656 5.071-5.565 9.045-9.52 12.621a163.632 163.632 0 0 1-20.636 15.879c-3.374 2.192-6.945 4.308-10.924 4.924-1.44.222-2.99.227-4.258-.48-2.268-1.262-2.848-4.429-1.99-6.873.859-2.45 2.793-4.339 4.662-6.137"
  })), _path20 || (_path20 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004D76",
    d: "M190.672 273.833a133.9 133.9 0 0 0 26.47 22.596c.965.626 1.99 1.303 2.429 2.369.667 1.626-.288 3.424-1.212 4.914a5471.958 5471.958 0 0 1-4.399 7.101 113.299 113.299 0 0 1-30.732-26.177c-.339-.414-.687-.853-.778-1.379-.126-.702.227-1.388.576-2.01a55.321 55.321 0 0 1 6.692-9.399"
  }))), _defs || (_defs = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "NoFavorites_svg__b",
    x1: 300.559,
    x2: 459.472,
    y1: 339.315,
    y2: 118.583,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#fff",
    stopOpacity: 0
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#51C7EA"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "NoFavorites_svg__c",
    x1: 178.105,
    x2: 203.718,
    y1: 349.662,
    y2: 279.719,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#fff",
    stopOpacity: 0
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#004C75"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "NoFavorites_svg__d",
    x1: 337.013,
    x2: 172.12,
    y1: 234.209,
    y2: 171.571,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#fff",
    stopOpacity: 0
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#51C7EA"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "NoFavorites_svg__e",
    x1: 470.141,
    x2: 445.887,
    y1: 353.812,
    y2: 287.582,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#fff",
    stopOpacity: 0
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#004C75"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "NoFavorites_svg__f",
    x1: 221.444,
    x2: 410.215,
    y1: 218.865,
    y2: 298.479,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#fff",
    stopOpacity: 0
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#51C7EA"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "NoFavorites_svg__g",
    x1: 440.928,
    x2: 265.432,
    y1: 164.962,
    y2: 59.267,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#fff",
    stopOpacity: 0
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#51C7EA"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "NoFavorites_svg__j",
    x1: 179.331,
    x2: 360.451,
    y1: 116.272,
    y2: 184.192,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#fff"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#51C7EA"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "NoFavorites_svg__k",
    x1: 155.047,
    x2: 376.217,
    y1: 20.364,
    y2: 103.303,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#fff"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#51C7EA"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("clipPath", {
    id: "NoFavorites_svg__a"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M.91 0h618.18v400H.91z"
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MjAgNDAwIiBmaWxsPSJub25lIj48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxwYXRoIGZpbGw9InVybCgjYikiIGQ9Ik0zMzUuNTg2IDM2Mi40NmMtMTAuMDk2LTIuMDg2LTE3LjAwNS0xMi4xMjEtMTguNjgyLTIyLjI5My0xLjY3Ny0xMC4xNzIuNzg4LTIwLjUyNSAzLjI5OC0zMC41MjVzNS4xMDEtMjAuMjk4IDMuNjc3LTMwLjUxMWMtMS40MTktMTAuMTUxLTYuNjg3LTE5LjMxMy05LjYzNi0yOS4xMjZhNjUuMzcgNjUuMzcgMCAwIDEtMS42OTctMzAuMzQ4Yy45NjktNS4zMjkgMi44NDgtMTAuODk5IDcuMTgxLTE0LjE0MiA0Ljc0My0zLjU1IDExLjE0Ny0zLjQ2NCAxNy4wMjYtNC4xNzEgMTMuNjcxLTEuNjM3IDI2LjQwNC04LjMyOSAzNi44MjgtMTcuMzE5IDEwLjQyOS04Ljk4OSAxOC43MTctMjAuMjAyIDI1Ljk4LTMxLjg5OSA3LjA1LTExLjM1MyAxMy41MzUtMjMuNjA2IDI0LjIyNy0zMS42MjEgMTAuNjk3LTguMDE1IDI3LjI2My0xMC4yMTcgMzYuNzU4LS44MDggMi44NzMgMi44NDkgNC44NjMgNi41MTUgNi4wNyAxMC4zODQgMi4zODkgNy42NDEgMS43NDggMTYuMTkyLTEuNzYyIDIzLjM4OS01Ljc2OCAxMS44MjgtMTguMDIgMTguNzczLTI3LjgxMyAyNy41NjYtMTEuNDA5IDEwLjI0Mi0yMC4yNDggMjYuMTUxLTE1LjEyNyA0MC42MDEgMS41MzEgNC4zMjMgNC4xOTcgOC4xMzYgNi4yMTMgMTIuMjUyIDQuMjM3IDguNjU3IDUuNTIgMTguODIzIDMuMDU1IDI4LjE0MS0yLjQ2NSA5LjMxOS04Ljc2OCAxNy42NTctMTcuMzAzIDIyLjEzMi0xMC4wOTEgNS4yODgtMjIuMjUzIDQuOTktMzIuNzQyIDkuNDI5LTguMzQ5IDMuNTM1LTE1LjM3NCAxMC4xMDYtMTkuNDUgMTguMjAyLTcuNTU1IDE1LjAwNS01LjA2NiAzNC4yMDctMTUuMDUgNDcuNzE3LTMuMDM2IDQuMTA2LTkuNTY2IDcuMzIzLTEyLjc4OCAzLjM2NCIgb3BhY2l0eT0iLjMyIi8+PHBhdGggZmlsbD0idXJsKCNjKSIgZD0iTTE1OS4yOTMgMzM2LjA4NmEyMDMuOTc1IDIwMy45NzUgMCAwIDEgNDEuMTUxLTU0LjIxMmw5LjUyMSA2LjQwOWMuNjIxLjQxOSAxLjI2Ny44NjkgMS41NzUgMS41NS4zNjQuODA4LjE2NyAxLjc0My0uMDMgMi42MDZhMzY3LjA4IDM2Ny4wOCAwIDAgMC04LjI5MyA1My41ODEiIG9wYWNpdHk9Ii4zMiIvPjxwYXRoIGZpbGw9InVybCgjZCkiIGQ9Ik0yOTcuNzc4IDI0My44ODRjLTYuNDctMi41MjEtMTMuOTY0LS4yMDMtMTkuNTc2IDMuODgzLTUuNjExIDQuMDg2LTkuODMzIDkuNzQ4LTE0LjQ2NCAxNC45MTQtOS43MDcgMTAuODM0LTIyLjk1NSAyMC4yMjgtMzcuNDcgMTkuMjUzLTEuNzk4LS4xMjEtMy42NzctLjQzOS01LjA5MS0xLjU2MS0xLjI0Mi0uOTg0LTEuOTc1LTIuNDc5LTIuNDctMy45ODQtMy4xMjYtOS40NjUgMS42NjItMTkuOTItLjI0Ny0yOS43MDItMS44NDMtOS40NDUtOS41OTEtMTYuNjEyLTE3LjczMi0yMS43NDgtOC4xNDItNS4xMzEtMTcuMTc3LTkuMDItMjQuMjkzLTE1LjQ5NXMtMTIuMDgxLTE2LjY1MS04LjkyNC0yNS43NDJjMy4wNy04Ljg0OSAxMi40NTktMTMuNjI3IDIxLjE1MS0xNy4xMTEgOC42OTctMy40ODUgMTguMjU4LTcuMTM3IDIyLjkxOS0xNS4yNTggNC45MTktOC41ODEgMi45NC0xOS45MTkgOC4xNDctMjguMzIzIDMuNzM3LTYuMDMxIDEwLjU5Ni05LjQ3NSAxNy40ODUtMTEuMTg3IDkuMzc4LTIuMzI4IDIxLjI5Mi0uODQ5IDI1LjY3MSA3Ljc2OCAzLjczOCA3LjM0OC4yNTMgMTYuMjQ3IDEuMjYzIDI0LjQyOSAxLjQ1OSAxMS44MTMgMTIuMDQgMjAuNDE0IDIyLjg0OCAyNS4zOTkgMTAuODE0IDQuOTggMjIuNzU4IDcuNzY4IDMyLjQ4NSAxNC42MzYgMTQuMzk5IDEwLjE2NyAyMS45MjQgMjkuMjAyIDE4LjM3OSA0Ni40NjUtMS40NSA3LjA1LTQuNzYzIDEzLjk1NC0xMC40MDkgMTguNDE5LTUuNjQ3IDQuNDY1LTEzLjg2NCA2LjAyNS0yMC4yNDMgMi42OTItNS4wMTUtMi42MjEtOS41LTguMTI2LTE1LjAwNS02Ljc5OCIgb3BhY2l0eT0iLjMyIi8+PHBhdGggZmlsbD0iIzY4Q0JFMyIgZD0iTTE5MC4yODMgMjg1Ljc2MmM3LjEyNi0yMC41OSAxOS41LTM5LjMzOCAzNS42MjYtNTMuOTg0IDUuMzc5LTQuODg0IDEyLjI4My05LjU5NiAxOS4zNTktNy45MzUgNy4zNzQgMS43MzMgMTEuNjIxIDEwLjE0NyAxMS4wMyAxNy42OTctLjU5MSA3LjU1MS00Ljg0OCAxNC4yODMtOS4zOTkgMjAuMzM5LTkuNDkgMTIuNjI2LTIxLjAyNSAyMy45OS0zNC45NzQgMzEuMzk0LTMuNjQyIDEuOTM0LTcuNjExIDMuNjI2LTExLjczMyAzLjQzOS00LjEyMS0uMTg3LTguMzg0LTIuNzU4LTkuMzE4LTYuNzczLS45NDktNC4wODYgMS42MzYtOC4wNzYgNC4wOTYtMTEuNDhNNDAwLjgyOSAyNTguMjQyYy0xLjU2Ni02LjM5NC05Ljc4OC04Ljc5OC0xMi43ODgtMTQuNjYxLTMuMTg3LTYuMjIyLjY1Ny0xMy43ODggNS40Ni0xOC44NjkgMy4wNTUtMy4yMzIgNi43NTctNi4xNjcgMTEuMTUxLTYuODc0IDYuNzQ4LTEuMDg2IDEzLjEyMiAzLjI3OCAxOC4wNjEgOCAxOC40MjkgMTcuNTk2IDI4LjM3NCA0My43MDIgMjYuMzE4IDY5LjA5Ni0uMjg4IDMuNTU2LTIuMjk4IDguMjIzLTUuNzYzIDcuMzc5LTEuMjEyLS4yOTgtMi4xMzYtMS4yNTItMi45NzktMi4xNzItMy4yODMtMy41NzUtNi40OC03LjIyNy05LjY3Ny0xMC44NzgtMTEuNzEyLTEzLjM4NC0yMy40MjQtMjYuNzczLTM1LjE0Mi00MC4xNTciLz48cGF0aCBmaWxsPSJ1cmwoI2UpIiBkPSJNNDg3Ljk1NSAzNDAuOTZhMTkzLjEyMiAxOTMuMTIyIDAgMCAwLTM4Ljk2OS01MS4zMzRjLTMuMDA1IDIuMDItNi4wMTEgNC4wNDYtOS4wMTYgNi4wNjYtLjU4NS4zOTQtMS4yMDIuODIzLTEuNDk1IDEuNDY1LS4zNDguNzYyLS4xNjEgMS42NTEuMDMxIDIuNDY5YTM0Ny43NjQgMzQ3Ljc2NCAwIDAgMSA3Ljg1MyA1MC43MzgiIG9wYWNpdHk9Ii4zMiIvPjxwYXRoIGZpbGw9InVybCgjZikiIGQ9Ik0zOTEuOTMgMjA1LjM5NGMtMy44ODQtOC4xMDEtMTAuNjQyLTEwLjU0NS0xNy43NjMtMTMuMzY0LTExLjg3OS00LjY5Ny0yNC4zOTQtOC4xNTEtMzcuMTYxLTguNTQ1LTEyLjc2OC0uMzg5LTI1Ljg0OSAyLjQzOS0zNi41MTEgOS40OC02Ljc1MiA0LjQ1OS0xMi4zNTggMTAuNDU5LTE4Ljk0NCAxNS4xNjZhNjAuNzY4IDYwLjc2OCAwIDAgMS0yMi41NzEgOS45N2MtNy4yNjcgMS41NjEtMTQuNzYyIDEuNzczLTIyLjA2IDMuMTY3LTcuMjk4IDEuMzk5LTE0LjY4NyA0LjIwMi0xOS41NDYgOS44MjMtNS43MDIgNi42MDEtNi44OTQgMTYuNzQyLTIuODc5IDI0LjQ4NSA0LjIwMiA4LjA5NiAxMi44MDkgMTIuNjg3IDIwLjI2MyAxNy45NDQgNy40NTUgNS4yNTggMTQuNzI3IDEzLjAzNiAxMy44MTMgMjIuMTExLS4yNzggMi43NTMtMS4zMDggNS4zNzQtMS43MjcgOC4xMTItMS4wMiA2LjcwNyAxLjg4OSAxMy42OTEgNi44MzMgMTguMzMzIDQuOTQ1IDQuNjQxIDExLjcxMiA3LjA3MSAxOC40OCA3LjUyNSA3LjA0LjQ3NSAxNC40OTUtMS4yNTIgMTkuNjcyLTYuMDQ1IDYuNDQ5LTUuOTY1IDguMjE3LTE1LjI2MyAxMS4wNzEtMjMuNTcxIDIuMTIxLTYuMTYyIDUuMTE2LTEyLjIxMiA5Ljk0OS0xNi41ODYgNC44MzMtNC4zNzQgMTEuNzY4LTYuODIzIDE4LjAzLTUuMDMgOC44ODkgMi41NCAxMy40NCAxMi4wMDUgMTguOTM1IDE5LjQzOWE1Ny4wMjMgNTcuMDIzIDAgMCAwIDE2LjY5MiAxNS4wOTZjOS44NDggNS44NDkgMjIuOTI5IDguMzg5IDMyLjUxIDIuMTE2IDYuNjgxLTQuMzc4IDEwLjM5OS0xMi4zNDMgMTEuMjM3LTIwLjI5My44MzgtNy45NDktLjg1OS0xNS45NDQtMy4wNzEtMjMuNjIxLTEuNjk3LTUuODk0LTMuNjkyLTEyLjI5My0xLjQxNC0xNy45OSAxLjEwMS0yLjc1MiAzLjEyMS01LjA2IDQuMTk3LTcuODIzIDIuNzU4LTcuMDcxLTEuMjc4LTE0LjkzNC02LjAyLTIwLjg2NC00LjczMi01LjkyNC0xMC41My0xMS41OS0xMi4wMTUtMTkuMDM1WiIgb3BhY2l0eT0iLjMyIi8+PHBhdGggZmlsbD0idXJsKCNnKSIgZD0iTTI3MC4yNjggMTUzLjk5NWMyLjI3MyA4LjUwNSA5LjAzIDExLjk1NCAxNS42NzcgMTUuNzU3IDExLjA5MSA2LjM0NCAyMi45OCAxMS41NDYgMzUuNTY1IDEzLjc1MyAxMi41ODEgMi4yMDcgMjUuOTM1IDEuMjY4IDM3LjQ5LTQuMTgyIDcuMzE4LTMuNDU0IDEzLjcyMi04LjU5MSAyMC45MDktMTIuMzEzYTYwLjg5OCA2MC44OTggMCAwIDEgMjMuNzYzLTYuNjU3YzcuNDE0LS41MDUgMTQuODY0LjM0OSAyMi4yODguMDA1IDcuNDI0LS4zNDMgMTUuMTM2LTIuMDY1IDIwLjc0Mi02LjkzOSA2LjU4Ni01LjcyMiA5LjIwNy0xNS41ODYgNi4zMzQtMjMuODI4LTMuMDA1LTguNjE2LTEwLjg2OS0xNC4zNzktMTcuNS0yMC42NDctNi42MzItNi4yNjctMTIuNzIzLTE1LTEwLjUyMS0yMy44NTMuNjY3LTIuNjg3IDIuMDYxLTUuMTMxIDIuODY0LTcuNzgzIDEuOTY1LTYuNDk1LjA4MS0xMy44MTgtNC4xNTEtMTkuMTIxLTQuMjM4LTUuMjk4LTEwLjU4Ni04LjY2Ny0xNy4yMTgtMTAuMDgxLTYuODk5LTEuNDc1LTE0LjUyNS0uODIzLTIwLjMzMyAzLjE4Mi03LjIzMiA0Ljk4NS0xMC4zMDggMTMuOTM0LTE0LjMxOCAyMS43NTItMi45NzUgNS43OTgtNi44MDggMTEuMzU5LTEyLjIxMiAxNS01LjQwNCAzLjY0Mi0xMi42MTYgNS4wNzYtMTguNTY2IDIuNDE0LTguNDM0LTMuNzc3LTExLjU5MS0xMy43OTgtMTUuOTctMjEuOTM5YTU3LjAyIDU3LjAyIDAgMCAwLTE0LjM3My0xNy4zMjNjLTguOTE0LTcuMTkyLTIxLjUtMTEuNTctMzEuODc0LTYuNzIyLTcuMjQzIDMuMzgzLTEyLjA1MSAxMC43MzctMTQuMDE1IDE4LjQ4NC0xLjk2NSA3Ljc0OC0xLjQxOSAxNS45MDQtLjMyMyAyMy44MTkuODM4IDYuMDc1IDEuOTA0IDEyLjY5Mi0xLjE2MiAxOC4wMS0xLjQ4IDIuNTY1LTMuODA4IDQuNTY1LTUuMjY4IDcuMTQ2LTMuNzM3IDYuNjA2LS44NjMgMTQuOTY1IDIuOTg1IDIxLjUxIDMuODQ0IDYuNTQxIDguNzc4IDEyLjk3NSA5LjE4NyAyMC41NTZaIiBvcGFjaXR5PSIuMzIiLz48cGF0aCBmaWxsPSIjMDA0RDc2IiBkPSJNMjIyLjUzMSAyNTguMjg4Yy40NjUgNi42NzEuNjExIDEzLjM2My40NSAyMC4wNSA0MCAxMS43MjIgODIuNjM2IDkuMDcxIDEyNC4xNzEgNS41OTEgMTAuNjMyLS44ODkgMjEuMjc4LTEuODMzIDMxLjc4OC0zLjY1NmExOTEuNDQyIDE5MS40NDIgMCAwIDAgMzkuNzczLTExLjQ0NWMxLjAyNS0uNDE5IDIuMTA2LS44OTQgMi43NTMtMS43OTMuNjQxLS44OTQuNzQyLTIuMDU1LjgyMy0zLjE1MS4zMjMtNC40NC43NzgtMTEuMzI0IDEuMTAxLTE1Ljc2My0yNy41OTYgNi4zMjMtNTYuMjY4IDkuNDc1LTg0LjU3NiA5LjkwNC0zOC40MzkuNTgxLTc2Ljg4OS42OTctMTE1LjMzMy4zNTQiLz48cGF0aCBmaWxsPSIjNDY4NEM1IiBkPSJNMjM5LjQ2IDI1MC41NjZjMTUuMDItNS44NzkgNDEuNzMyLTYuMjc4IDU5LjExNi03LjQ5NSA0MC43NDctMi44NTQgNTMuNTItMi42ODcgOTMuMTM2LTEuODE4IDEwLjAzNi4yMTcgMjAuMDkxIDEuOTA5IDI5LjU2NiA1LjIyNy44NzkuMzA4IDEuODY0Ljc0NyAyLjExNiAxLjY0Ni4yOTMgMS4wMjYtLjU0NSAyLjAxLTEuMzQzIDIuNzE4LTYuNTE1IDUuNzcyLTE1LjAyIDguNzE3LTIzLjM5NCAxMS4wODUtNTQuNTQ2IDE1LjQzNS0xMTIuNTcxIDkuOTk1LTE2OC44MDggMi45Mi0yLjk1NS0uMzc0LTguMTcyLTMuNzAyLTcuMzEzLTYuNTU2LjI2Mi0uODU5IDYuMTA2LTQuMDIgNi45NjktNC4yNzggNC45NTUtMS41MSA1LjY5Mi0yLjM4NCA5Ljk1NS0zLjQ0OVoiLz48cGF0aCBmaWxsPSIjMDA0Qzc2IiBkPSJNMjMzLjc4MyAyNTguMzU0Yy4yOTgtMjguMDA2LTMuOTY0LTU0LjYzNy0zLjg0OC04Mi42NDIuMTE2LTI4LjAwNSA3LjY4Ny01OC4wNTUgMjkuMzY0LTc1Ljc5MyA1Ljg0OC00Ljc4OCAxMi41Mi04LjQ5NSAxOS40NDktMTEuNTEgMTMuMjA3LTUuNzQyIDI3LjUwNS05LjAyIDQxLjkwNC05LjQwNGExMDguOTQ0IDEwOC45NDQgMCAwIDEgNDIuNDQ1IDcuNDI0YzguMTYxIDMuMTkyIDE1Ljk3NCA3LjQwNCAyMi43MDIgMTMuMDIgMTkuOTk1IDE2LjY5NyAyOC4yMDIgNDMuODg5IDI5Ljc5MyA2OS44ODkgMS41OSAyNi0yLjM5NCA1Mi4wNDEtMS44ODkgNzguMDg2LjAyLjk4LjAzIDIuMDItLjQ3NSAyLjg2NC0uNjA2IDEuMDE1LTEuNzk4IDEuNDktMi45MDkgMS44ODktMzUuNzM4IDEyLjc3OC03NC40NiAxMy45MzktMTEyLjQxNCAxMy45MDktMjEuNjQyLS4wMTUtNDEuNTQ2LTQuMTM3LTY0LjEyMi03LjczMloiIG9wYWNpdHk9Ii4wOCIvPjxtYXNrIGlkPSJoIiB3aWR0aD0iMTg3IiBoZWlnaHQ9IjE4OSIgeD0iMjI5IiB5PSI3OCIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgc3R5bGU9Im1hc2stdHlwZTpsdW1pbmFuY2UiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yMzMuNzgzIDI1OC4zNTRjLjI5OC0yOC4wMDYtMy45NjQtNTQuNjM3LTMuODQ4LTgyLjY0Mi4xMTYtMjguMDA1IDcuNjg3LTU4LjA1NSAyOS4zNjQtNzUuNzkzIDUuODQ4LTQuNzg4IDEyLjUyLTguNDk1IDE5LjQ0OS0xMS41MSAxMy4yMDctNS43NDIgMjcuNTA1LTkuMDIgNDEuOTA0LTkuNDA0YTEwOC45NDQgMTA4Ljk0NCAwIDAgMSA0Mi40NDUgNy40MjRjOC4xNjEgMy4xOTIgMTUuOTc0IDcuNDA0IDIyLjcwMiAxMy4wMiAxOS45OTUgMTYuNjk3IDI4LjIwMiA0My44ODkgMjkuNzkzIDY5Ljg4OSAxLjU5IDI2LTIuMzk0IDUyLjA0MS0xLjg4OSA3OC4wODYuMDIuOTguMDMgMi4wMi0uNDc1IDIuODY0LS42MDYgMS4wMTUtMS43OTggMS40OS0yLjkwOSAxLjg4OS0zNS43MzggMTIuNzc4LTc0LjQ2NSAxNC4zNDgtMTEyLjQxNCAxMy45MDktMjIuMzQ0LS4yNTMtNjUuNDktNy45Ny02NC4xMjItNy43MzJaIi8+PC9tYXNrPjxnIG1hc2s9InVybCgjaCkiPjxwYXRoIGZpbGw9IiM2OUNDRTUiIGQ9Ik0yNzguOTcxIDIzNy4xNTFoLS42NDd2LTgwLjgwM2guNjQ3djgwLjgwM1ptLTMuOTk1IDBoLS42NDd2LTgzLjU2aC42NDd2ODMuNTZabS0zLjk5LS4xNjFoLS42NDd2LTg2LjE5N2guNjQ3djg2LjE5N1ptMTEuOTc5LS4wNDFoLS42NDZ2LTc4LjQ4NGguNjQ2djc4LjQ4NFptLTE1Ljk3NC0uMjc3aC0uNjQ3di04OC41MTZoLjY0N3Y4OC41MTZabTE5Ljk2OS0uMTIyaC0uNjQ2di03Ny4wOWguNjQ2djc3LjA5Wm0tMjMuOTY0LS4zNThoLS42NDd2LTkwLjM4OWguNjQ3djkwLjM4OVptMjcuOTU5LS4yNzhoLS42NDZWMTU5LjVoLjY0NnY3Ni40MTRabS0zMS45NTQtLjM1OWgtLjY0N3YtOTEuODY4aC42NDd2OTEuODY4Wm0zNS45NDktLjQ3OWgtLjY0NnYtNzYuMDFoLjY0NnY3Ni4wMVptLTM5Ljk0NC0uMjgzaC0uNjQ3di05Mi45NDVoLjY0N3Y5Mi45NDVabTQzLjkzOS0uNzk4aC0uNjQ2di03NS42MTFoLjY0NnY3NS42MTFabS00Ny45MzQtLjExNmgtLjY0NnYtOTMuMjY4aC42NDZ2OTMuMjY4Wm0tMy45OTUtMWgtLjY0NnYtOTIuNzA3aC42NDZ2OTIuNzA3Wm01NS45MjQtLjI0M2gtLjY0NnYtNzUuMTMxaC42NDZ2NzUuMTMxWm0tNTkuOTE5LS45NTRoLS42NDZ2LTkxLjU1MWguNjQ2djkxLjU1MVpNMzA2LjkzIDIzMWgtLjY0NnYtNzQuNDU1aC42NDZWMjMxWm0tNjcuODk5LS42MDFoLS42NDZ2LTg5LjgyOGguNjQ2djg5LjgyOFptNzEuODk0LTEuMzE4aC0uNjQ2di03My41MzZoLjY0NnY3My41MzZabS03NS44ODktLjExNmgtLjY0NnYtODcuNTE2aC42NDZ2ODcuNTE2Wm0tMy45OTUtMS42NDJoLS42NDZ2LTg0LjU5NmguNjQ2djg0LjU5NlptODMuODc5LS41MTVoLS42NDZ2LTcyLjE3N2guNjQ2djcyLjE3N1ptLTg3Ljg3NC0xLjI3OGgtLjY0NnYtODEuMTI2aC42NDZ2ODEuMTI2Wm05MS44NjktMS4zMThoLS42NDZ2LTcwLjVoLjY0NnY3MC41Wm0tOTUuODY0LS43MjJoLS42NDZ2LTc3LjAxaC42NDZ2NzcuMDFabS0zLjk5NS0yLjIzOGgtLjY0NnYtNzIuMjU3aC42NDZ2NzIuMjU3Wm0xMDMuODU0LS4xMTZoLS42NDdWMTUyLjk5aC42NDd2NjguMTQ2Wm0tMTA3Ljg0OS0yLjM5OWgtLjY0NlYxNTIuMDNoLjY0NnY2Ni43MDdabTExMS44NDQtMS4xNTZoLS42NDdWMTUyLjUxaC42NDd2NjUuMDcxWm0tMTE1LjgzMy0xLjc1OGgtLjY0N3YtNjAuMTk3aC42NDd2NjAuMTk3Wm0xMTkuODI4LTIuNDM5aC0uNjQ3di02MS4wNzFoLjY0N3Y2MS4wNzFabS0xMjMuODIzLS44NzloLS42NDd2LTUyLjQ0NGguNjQ3djUyLjQ0NFptMTI3LjgxOC00LjE1MmgtLjY1MnYtNTUuNjgxaC42NDd2NTUuNjgxaC4wMDVabS0xMzEuODEzIDBoLS42NDd2LTQyLjgxOGguNjQ3djQyLjgxOFptLTMuOTk1LTUuNDM0aC0uNjQ3di0zMC4wMzVoLjY0N3YzMC4wMzVaTTMzOC44ODUgMjAyaC0uNjQ3di00OC4xNzJoLjY0N1YyMDJabTMuOTk1LTguNTQ2aC0uNjQ3di0zNi43ODdoLjY0N3YzNi43ODdabS0xNDcuNzg4LTEuNzU3aC0uNjQ3di01LjU5MWguNjQ3djUuNTkxWm0xNTEuNzgzLTE2LjIxN2gtLjY0N3YtOC41MWguNjQ3djguNTFaIiBvcGFjaXR5PSIuNiIvPjwvZz48bWFzayBpZD0iaSIgd2lkdGg9IjE4NyIgaGVpZ2h0PSIxODkiIHg9IjIyOSIgeT0iNzgiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHN0eWxlPSJtYXNrLXR5cGU6bHVtaW5hbmNlIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjMzLjc4MyAyNTguMzU0Yy4yOTgtMjguMDA2LTMuOTY0LTU0LjYzNy0zLjg0OC04Mi42NDIuMTE2LTI4LjAwNSA3LjY4Ny01OC4wNTUgMjkuMzY0LTc1Ljc5MyA1Ljg0OC00Ljc4OCAxMi41Mi04LjQ5NSAxOS40NDktMTEuNTEgMTMuMjA3LTUuNzQyIDI3LjUwNS05LjAyIDQxLjkwNC05LjQwNGExMDguOTQ0IDEwOC45NDQgMCAwIDEgNDIuNDQ1IDcuNDI0YzguMTYxIDMuMTkyIDE1Ljk3NCA3LjQwNCAyMi43MDIgMTMuMDIgMTkuOTk1IDE2LjY5NyAyOC4yMDIgNDMuODg5IDI5Ljc5MyA2OS44ODkgMS41OSAyNi0yLjM5NCA1Mi4wNDEtMS44ODkgNzguMDg2LjAyLjk4LjAzIDIuMDItLjQ3NSAyLjg2NC0uNjA2IDEuMDE1LTEuNzk4IDEuNDktMi45MDkgMS44ODktMzUuNzM4IDEyLjc3OC03NC40NjUgMTQuMzQ4LTExMi40MTQgMTMuOTA5LTIyLjM0NC0uMjUzLTY1LjQ5LTcuOTctNjQuMTIyLTcuNzMyWiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2kpIj48ZyBvcGFjaXR5PSIuMzEiPjxwYXRoIGZpbGw9InVybCgjaikiIGQ9Ik00NjIuNjk3IDE4NS4xODJjOC4xODItNi4wMzYgMTcuOTY1LTE2LjAwNSA0LjQ2LTI5LjUxNS0xNC4zMjMtMTQuMzI0LTQ1Ljk2NSAyMS4yNDctNjAuMTI2LTYuNTU2LTguNTk2LTE2Ljg2OSAxOC41NC0zNi4xOTcgOS40ODUtNjUuNTk2LTEyLjM4NC00MC4yMjctODUuMzY0LTUwLjIzMi0xMTQuNzAzLTQ5LjEyMS04My40MzQgMy4xNTctMTI5LjUyNSA3MC4xMzYtMTI4Ljg5OCAxMzAuMDk2Ljc4NyA3NS41MDUgOTYuNzQ3IDE4NS45MzkgMjAxLjg5MyAxMDIuODU4IDMxLjcyOC0yNS4wNyAyNC4yMTgtMzUuOTQ5IDUzLjYwMS01OC42OTYiLz48cGF0aCBzdHJva2U9IiNmZmYiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIuMTY2IiBkPSJNNDYyLjY5NyAxODUuMTgyYzguMTgyLTYuMDM2IDE3Ljk2NS0xNi4wMDUgNC40Ni0yOS41MTUtMTQuMzIzLTE0LjMyNC00NS45NjUgMjEuMjQ3LTYwLjEyNi02LjU1Ni04LjU5Ni0xNi44NjkgMTguNTQtMzYuMTk3IDkuNDg1LTY1LjU5Ni0xMi4zODQtNDAuMjI3LTg1LjM2NC01MC4yMzItMTE0LjcwMy00OS4xMjEtODMuNDM0IDMuMTU3LTEyOS41MjUgNzAuMTM2LTEyOC44OTggMTMwLjA5Ni43ODcgNzUuNTA1IDk2Ljc0NyAxODUuOTM5IDIwMS44OTMgMTAyLjg1OCAzMS43MjgtMjUuMDcgMjQuMjE4LTM1Ljk0OSA1My42MDEtNTguNjk2Ii8+PC9nPjxwYXRoIGZpbGw9InVybCgjaykiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9Ii4xNjYiIGQ9Ik00NDMuMDE1IDEzNC4zNzljLTUuMjI3IDQuNjcxLTE3LjYxMSAxMS44MjMtMjQuMzUzIDMuMzY4LTcuMTAxLTguOTA5IDEuNzcyLTIxLjg0MyA3LjEwMS0yNi4xODYgNS42NDEtNC41OTYgMTQuNTk2LTcuMDg2IDIxLjI4Mi0uNDg1IDcuMzU0IDcuMjcyLjczOCAxOS4wNC00LjAzIDIzLjMwM1oiIG9wYWNpdHk9Ii4zMSIvPjxwYXRoIGZpbGw9IiM2OENCRTMiIGQ9Ik0yMzcuNDM1IDEyMC4yMTJjLS42MzEtNi4yMDIgMy44ODQtMTEuNzQyIDEwLjA4Ni0xMi4zNjkgNi4yMDItLjYzMSAxMS43MzcgMy44ODkgMTIuMzY4IDEwLjA4Ni42MzIgNi4yMDItMy44ODMgMTEuNzM4LTEwLjA4NSAxMi4zNjktNi4yMDIuNjMxLTExLjczOC0zLjg4NC0xMi4zNjktMTAuMDg2WiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yNzIuODQ5IDI0My4yNzhjMC0uODE4LjY2Ni0xLjQ4NSAxLjQ4NC0xLjQ4NWExLjQ4NCAxLjQ4NCAwIDEgMS0xLjQ4NCAxLjQ4NVpNMzQyLjc5OSAyMjkuNDg1YTEuNDg1IDEuNDg1IDAgMSAxIDIuOTcgMCAxLjQ4NSAxLjQ4NSAwIDAgMS0yLjk3IDBaTTQwNC4yNTMgMTgzLjY5N2MwLS44MTguNjY3LTEuNDg1IDEuNDg1LTEuNDg1YTEuNDg1IDEuNDg1IDAgMSAxLTEuNDg1IDEuNDg1Wk0yNDcuMTc3IDIxNy45NTVhMS40ODMgMS40ODMgMCAxIDEgMi45NjkgMGMwIC44MTgtLjY2NiAxLjQ4NC0xLjQ4NCAxLjQ4NGExLjQ4MyAxLjQ4MyAwIDAgMS0xLjQ4NS0xLjQ4NFpNMzI0Ljc4MyAxMzEuNzM3YzAtLjgxOC42NjctMS40ODUgMS40ODUtMS40ODVhMS40ODQgMS40ODQgMCAxIDEtMS40ODUgMS40ODVaTTM3OS4xNDIgMTM3LjEwNmMwLS44MTguNjY2LTEuNDg1IDEuNDg0LTEuNDg1LjgxOSAwIDEuNDg1LjY2NyAxLjQ4NSAxLjQ4NSAwIC44MTgtLjY2NiAxLjQ4NS0xLjQ4NSAxLjQ4NWExLjQ4NyAxLjQ4NyAwIDAgMS0xLjQ4NC0xLjQ4NVpNMzc0LjkwNCAyMjcuNDdhMS4xMjIgMS4xMjIgMCAxIDEgMi4yNDQuMDAyIDEuMTIyIDEuMTIyIDAgMCAxLTIuMjQ0LS4wMDJaTTMxMi40MzkgOTIuNDNhMi4zODIgMi4zODIgMCAwIDEgMi4zODQtMi4zODUgMi4zODIgMi4zODIgMCAwIDEgMi4zODQgMi4zODQgMi4zODIgMi4zODIgMCAwIDEtMi4zODQgMi4zODQgMi4zODIgMi4zODIgMCAwIDEtMi4zODQtMi4zODRaTTIzNS42MzIgMTA4LjkwOWMwLS42MjEuNS0xLjEyMSAxLjEyMS0xLjEyMXMxLjEyMS41IDEuMTIxIDEuMTIxLS41IDEuMTIxLTEuMTIxIDEuMTIxYy0uNjE2IDAtMS4xMjEtLjUtMS4xMjEtMS4xMjFaTTI2Mi41IDEyMy4wNjZjMi43MjItLjM4OSAzLjAzNS0uNzAyIDMuNDE5LTMuNDI1LjM4NCAyLjcyMy43MDIgMy4wMzEgMy40MjQgMy40MjUtMi43MjIuMzg4LTMuMDM1LjY5Ny0zLjQyNCAzLjQxOS0uMzg0LTIuNzIyLS42OTctMy4wMzEtMy40MTktMy40MTlaTTI4NC4zOSAxMTIuMTY3YzIuNzIyLS4zODkgMy4wMzUtLjcwMiAzLjQyNC0zLjQyLjM4NCAyLjcyMy43MDIgMy4wMzEgMy40MTkgMy40Mi0yLjcyMi4zODktMy4wMzUuNzAyLTMuNDE5IDMuNDI0LS4zODktMi43MjItLjcwMi0zLjAzNS0zLjQyNC0zLjQyNFpNMjgwLjk2NSAxMzAuNTM1YzIuNzIyLS4zODQgMy4wMzUtLjY5NyAzLjQyNC0zLjQxOS4zODQgMi43MjIuNjk3IDMuMDM1IDMuNDI0IDMuNDE5LTIuNzIyLjM4OS0zLjAzNS43MDItMy40MjQgMy40MjUtLjM4OS0yLjcyMy0uNzAyLTMuMDM2LTMuNDI0LTMuNDI1Wk00MDguNTIxIDIzNC4wNjZjMS4yODItLjE4MiAxLjQyOS0uMzI5IDEuNjExLTEuNjExLjE4MSAxLjI3Ny4zMjggMS40MjkgMS42MTEgMS42MTEtMS4yODMuMTgyLTEuNDMuMzI4LTEuNjExIDEuNjExLS4xODctMS4yODMtLjMzNC0xLjQyOS0xLjYxMS0xLjYxMVoiLz48cGF0aCBmaWxsPSIjMDA0Qzc2IiBkPSJtMzMzLjUxNSAyNTYuODQ4IDMzLjg0NC0zMC45ODlhLjIzNy4yMzcgMCAwIDEgLjMzMy4wMTUuMjM4LjIzOCAwIDAgMSAwIC4zMThsLTMwLjk5IDMzLjg0M2EyLjI1OSAyLjI1OSAwIDAgMS0zLjE4Ny4xNDIgMi4yNTMgMi4yNTMgMCAwIDEgMC0zLjMyOVpNMjQ0Ljg4NCAxNjkuODc5bDIyLjkyOS0yMWEuMTYuMTYgMCAwIDEgLjIyOC4wMS4xNjMuMTYzIDAgMCAxIDAgLjIxN2wtMjEgMjIuOTI5YTEuNTI2IDEuNTI2IDAgMSAxLTIuMjUzLTIuMDZjLjAzMS0uMDM2LjA2Ni0uMDY2LjA5Ni0uMDk2WiIgb3BhY2l0eT0iLjE1Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI5MS4wNTYgMjYwLjYyMWEuODkuODkgMCAxIDEtLjU4MSAxLjY4Mi44OS44OSAwIDAgMSAuNTgxLTEuNjgyWk0yOTAuNDQgMjUxLjQyOWExLjE5NSAxLjE5NSAwIDEgMS0uNzg0IDIuMjU4IDEuMTk1IDEuMTk1IDAgMCAxIC43ODQtMi4yNThaIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTI5MC42NCAyNjEuMzY5LTUuNjY0IDkuMDk5LjI5NS4xODQgNS42NjQtOS4wOTktLjI5NS0uMTg0WiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im0yODkuODc0IDI1Mi41NzEuMzQ5LS4wMjYuNzE3IDguOTA0LS4zNDkuMDMxLS43MTctOC45MDlaTTIzMi4wNzYgMTYwLjcwMmwtLjI0Ny4xNjctMy44NzQtNS42MjcuMjQ4LS4xNzEgMy44NzMgNS42MzFaIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTIzMi4xMDIgMTYwLjc2OS0uMjk0LjA0NiA1LjY4NyAzNi43MDguMjk0LS4wNDYtNS42ODctMzYuNzA4WiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im0yNDYuMjkzIDE5NC4yMzItOC41OCAzLjM5OS0uMTExLS4yNzcgOC41OC0zLjM5OS4xMTEuMjc3WiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im0yNDYuMzg0IDE5NC4wOTYtLjI5OC0uMDEuMjc4LTcuMzk5LjI5OC4wMS0uMjc4IDcuMzk5WiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im0yNDYuNTg2IDE4Ni44MjMtOS43MjIgNS4yNDgtLjE0MS0uMjYzIDkuNzIyLTUuMjQ3LjE0MS4yNjJaIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI0Ni4xNDcgMTg3LjQyOWEuODIzLjgyMyAwIDEgMSAuNzM3LTEuNDc1LjgyNC44MjQgMCAxIDEtLjczNyAxLjQ3NVpNMjM3LjI4OCAxOTguMjMyYS44MjEuODIxIDAgMCAxLS4zNjQtMS4xMDYuODI3LjgyNyAwIDAgMSAxLjEwNi0uMzY4LjgyMy44MjMgMCAwIDEgLjM2OSAxLjEwNi44My44MyAwIDAgMS0xLjExMS4zNjhaTTI0NS45NjUgMTk0LjYyNmEuNTk2LjU5NiAwIDAgMS0uMjY4LS44MDMuNTk4LjU5OCAwIDEgMSAuMjY4LjgwM1pNMjM2LjUyNSAxOTIuNDc1YS41OTguNTk4IDAgMSAxIC41MzctMS4wNzEuNTk4LjU5OCAwIDAgMS0uNTM3IDEuMDcxWk0yMzEuNDg1IDE2MS4yMjJhLjU5OC41OTggMCAxIDEgLjUzNS0xLjA3LjU5OC41OTggMCAwIDEtLjUzNSAxLjA3Wk0zMzMuMjg4IDk5LjE1MWExLjIzMiAxLjIzMiAwIDAgMS0xLjE1MS0xLjMxMyAxLjIzNCAxLjIzNCAwIDEgMSAxLjE1MSAxLjMxM1pNMzMyLjU1NiAxMTAuMjY4YS45MTYuOTE2IDAgMCAxLS44NTQtLjk4LjkyNC45MjQgMCAwIDEgLjk3NS0uODU5Yy41MDUuMDM2Ljg4OS40Ny44NTkuOTc1YS45MjYuOTI2IDAgMCAxLS45OC44NjRaTTM4Mi4zMTMgODcuMTAxYTEuMjMgMS4yMyAwIDAgMS0xLjE0Ni0xLjMxMyAxLjIzMyAxLjIzMyAwIDAgMSAxLjMxMy0xLjE1MiAxLjIzMiAxLjIzMiAwIDAgMSAxLjE1MiAxLjMwOCAxLjI0NiAxLjI0NiAwIDAgMS0xLjMxOSAxLjE1N1pNMzI1Ljc3OCAxMTUuODU5YTEuMjMzIDEuMjMzIDAgMCAxLTEuMTQ2LTEuMzE0IDEuMjMzIDEuMjMzIDAgMCAxIDEuMzEzLTEuMTUxIDEuMjMgMS4yMyAwIDAgMSAxLjE1MSAxLjMwOCAxLjI0MiAxLjI0MiAwIDAgMS0xLjMxOCAxLjE1N1oiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjcxLjk5NSA3MS44MjhjLS4wMy4wNS0uMDgxLjA3Ni0uMTE2LjExNmw1My44NzQgNDIuODI0LjIyMi0uMjgzLTUzLjg4NC00Mi44MzRjLS4wMy4wNjEtLjA2MS4xMjItLjA5Ni4xNzdaIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMzMi40ODYgMTA5LjIxOS02Ljc1NCA1LjI3Ni4yMjEuMjgyIDYuNzU0LTUuMjc2LS4yMjEtLjI4MloiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJtMzMzLjU1MSA5Ny45My0uNzU4IDExLjQzNC0uMzU4LS4wMjEuNzU3LTExLjQzNC4zNTkuMDJaIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMzMy41NDYgOTcuODY5LS4zNDguMS05LjE5Mi0zMS4wMS4zNDMtLjEwNiA5LjE5NyAzMS4wMTZaTTM0OC44OTQgNDUuODEzbC0uMjc0LjIzIDMzLjYyIDM5Ljk0OC4yNzQtLjIzLTMzLjYyLTM5Ljk0OFoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJtMzgwLjM2OSAxMzcuMzI4LS4zNTgtLjAxIDIuMjA3LTUxLjQ1NC4zNTguMDE1LTIuMjA3IDUxLjQ0OVoiLz48cGF0aCBmaWxsPSIjNjhDQkUzIiBkPSJNMjc2LjIzMyAxNzEuNjExYzguNjE2LTQuMTIxIDE4Ljk3NC0uNDY1IDIzLjA5NiA4LjE1MiA0LjEyMSA4LjYxNi40NjQgMTguOTc0LTguMTUyIDIzLjA5NmExNy4yMDggMTcuMjA4IDAgMCAxLTcuNDUgMS42OTdjLTYuNDY0IDAtMTIuNjgxLTMuNjMyLTE1LjY1MS05Ljg0NC00LjExNi04LjYxNi0uNDYtMTguOTggOC4xNTctMjMuMTAxWiIvPjxwYXRoIGZpbGw9IiMwMDRDNzYiIGQ9Ik0yNTIuNTY2IDIwMy4zMThjLjYwMSAxLjI1MyAyLjIzNyAxLjc5OCA0LjYyNiAxLjc5OCAzLjkwNCAwIDkuODAzLTEuNDggMTYuMzY5LTMuODQ4IDQuNTgxLTEuNjMyIDkuNDg1LTMuNzAyIDE0LjI3My01Ljk5IDQuNjA2LTIuMjAyIDkuMTI2LTQuNjE2IDEzLjE2MS03LjA2NiA5LjgzOS01LjkzOSAxNi44MzQtMTIuMDA1IDE1LjIzMy0xNS4zNDMtMS45MDQtMy45NzUtMTMuNDQ1LS42MjctMjAuNTI2IDEuODc5LjQ2NS40MjkuODk5Ljg5OSAxLjMxMyAxLjM5OSAxMS44MjQtNC4wODYgMTcuMDIxLTMuNzc4IDE3LjYyNy0yLjUyMS42OTcgMS40NjUtMy41NDEgNi4zMDgtMTMuNjQ3IDEyLjU0Ni0zLjc5OCAyLjM0My04LjQxOSA0Ljg4OS0xMy45MTkgNy41MjUtNS43MjcgMi43MzItMTAuNzczIDQuNzkzLTE1LjA5MSA2LjI5OC0xMC44ODkgMy43NzMtMTcuMTQxIDQtMTcuODI4IDIuNTY2LS41OTEtMS4yMjMgMi4zMjMtNS4zNzQgMTIuNTk2LTExLjg1OWExMi45NjUgMTIuOTY1IDAgMCAxLS4yNzMtMS45MDljLTYuMjE3IDMuODU5LTE1Ljc4MyAxMC42MjEtMTMuOTE0IDE0LjUyNVpNMjk1LjY4NyAxMjkuNDI5bDMzLjg0NC0zMC45OWEuMjM4LjIzOCAwIDAgMSAuMzMzLjAxNi4yMzkuMjM5IDAgMCAxIDAgLjMxOGwtMzAuOTkgMzMuODQzYTIuMjU5IDIuMjU5IDAgMCAxLTMuMTg3LjE0MiAyLjI1MyAyLjI1MyAwIDAgMS0uMTQxLTMuMTg3Yy4wNDUtLjA1MS4wOTYtLjA5Ni4xNDEtLjE0MloiIG9wYWNpdHk9Ii4xNSIvPjwvZz48bWFzayBpZD0ibCIgd2lkdGg9IjE4NyIgaGVpZ2h0PSIxODkiIHg9IjIyOSIgeT0iNzgiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHN0eWxlPSJtYXNrLXR5cGU6bHVtaW5hbmNlIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjMzLjc4MyAyNTguMzU0Yy4yOTgtMjguMDA2LTMuOTY0LTU0LjYzNy0zLjg0OC04Mi42NDIuMTE2LTI4LjAwNSA3LjY4Ny01OC4wNTUgMjkuMzY0LTc1Ljc5MyA1Ljg0OC00Ljc4OCAxMi41Mi04LjQ5NSAxOS40NDktMTEuNTEgMTMuMjA3LTUuNzQyIDI3LjUwNS05LjAyIDQxLjkwNC05LjQwNGExMDguOTQ0IDEwOC45NDQgMCAwIDEgNDIuNDQ1IDcuNDI0YzguMTYxIDMuMTkyIDE1Ljk3NCA3LjQwNCAyMi43MDIgMTMuMDIgMTkuOTk1IDE2LjY5NyAyOC4yMDIgNDMuODg5IDI5Ljc5MyA2OS44ODkgMS41OSAyNi0yLjM5NCA1Mi4wNDEtMS44ODkgNzguMDg2LjAyLjk4LjAzIDIuMDItLjQ3NSAyLjg2NC0uNjA2IDEuMDE1LTEuNzk4IDEuNDktMi45MDkgMS44ODktMzUuNzM4IDEyLjc3OC03NC40NjUgMTQuMzQ4LTExMi40MTQgMTMuOTA5LTIyLjM0NC0uMjUzLTY1LjQ5LTcuOTctNjQuMTIyLTcuNzMyWiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI2wpIj48cGF0aCBmaWxsPSIjNjhDQkUzIiBkPSJNMzMwLjkwNCAyMjkuNDk1Yy0zLjQ1NC0uMjg4LTcuMDg2IDEuMzU4LTguODU4IDQuMzM4LTEuNzczIDIuOTc1LTEuMzg0IDcuMTc3IDEuMTM2IDkuNTU2IDEuMDUuOTkgMi4zNzkgMS42MzYgMy43NDIgMi4xMTYgMS41NjYuNTUxIDMuMzA4Ljg5NCA0Ljg2NC4zMjggMS4wNTEtLjM3OCAxLjkxOS0xLjE0MSAyLjY0Ni0xLjk5IDEuNTI2LTEuNzg3IDIuNTA2LTQuMDcgMi41NTEtNi40MTkuMDQ1LTIuMzQ4LS44OTQtNC43MzctMi42NTctNi4yODgtLjkyNC0uODEzLTIuMjc3LTEuNDc0LTMuNDI0LTEuNjQxWiIvPjwvZz48bWFzayBpZD0ibSIgd2lkdGg9IjE4NyIgaGVpZ2h0PSIxODkiIHg9IjIyOSIgeT0iNzgiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHN0eWxlPSJtYXNrLXR5cGU6bHVtaW5hbmNlIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjMzLjc4MyAyNTguMzU0Yy4yOTgtMjguMDA2LTMuOTY0LTU0LjYzNy0zLjg0OC04Mi42NDIuMTE2LTI4LjAwNSA3LjY4Ny01OC4wNTUgMjkuMzY0LTc1Ljc5MyA1Ljg0OC00Ljc4OCAxMi41Mi04LjQ5NSAxOS40NDktMTEuNTEgMTMuMjA3LTUuNzQyIDI3LjUwNS05LjAyIDQxLjkwNC05LjQwNGExMDguOTQ0IDEwOC45NDQgMCAwIDEgNDIuNDQ1IDcuNDI0YzguMTYxIDMuMTkyIDE1Ljk3NCA3LjQwNCAyMi43MDIgMTMuMDIgMTkuOTk1IDE2LjY5NyAyOC4yMDIgNDMuODg5IDI5Ljc5MyA2OS44ODkgMS41OSAyNi0yLjM5NCA1Mi4wNDEtMS44ODkgNzguMDg2LjAyLjk4LjAzIDIuMDItLjQ3NSAyLjg2NC0uNjA2IDEuMDE1LTEuNzk4IDEuNDktMi45MDkgMS44ODktMzUuNzM4IDEyLjc3OC03NC40NjUgMTQuMzQ4LTExMi40MTQgMTMuOTA5LTIyLjM0NC0uMjUzLTY1LjQ5LTcuOTctNjQuMTIyLTcuNzMyWiIvPjwvbWFzaz48ZyBtYXNrPSJ1cmwoI20pIj48cGF0aCBmaWxsPSIjNjhDQkUzIiBkPSJNMzY3LjIxNyAxMjAuMjM3Yy0zNi40NDQtLjQ4NS0zMS4yMTcgNTIuMjUzIDQuMTgyIDQ2LjkyIDI1Ljk3NS0zLjkxIDI2LjM2OS00NS4zMDktNC4xODItNDYuOTJaIi8+PHBhdGggZmlsbD0iIzAwNEM3NiIgZD0iTTM0Mi41NTYgMTQxLjkwOWMtMi40MDQtLjY0Ni0zNS40ODUtMTEuNjAxLTIzLjYwMS0xNy4wMSAxNS4xMDEtNi44NzQgNjMuNzgzIDEyLjc5OCA3OC45MTkgMTguNzg4IDMuNjM2IDEuNDM5IDIzLjg2OSA5LjIzMiAyMS44ODQgMTUuMTM2LTIuNDQ1IDcuMjczLTMwLjk2LS42NjYtMzEuMjY4LTIuMzc5LS4wNi0uMzM4LjA1MS0xLjQyOS40Ni0xLjUuNDY0LS4wOCAxLjAyLjE0MiAxLjQ2NC4yNDMgNS42MjIgMS4yMzcgMTMuNDUgMy42NTYgMTkuMTMyIDEuNzg4LjYwNi0uMTk3IDEuMjQyLS41NjEuODc5LTEuMjczLS44OTktMS43NTgtMy41NjYtMi45ODUtNS4xODctMy44NzlhNTcuMjI3IDU3LjIyNyAwIDAgMC00LjkwOS0yLjM5OWMtMTcuMTIyLTcuMzg0LTM1LjA3MS0xNC4zNTMtNTMuMjk4LTE4LjMwOC0yLjI2OC0uNDktMTYuODk5LTMuNDctMTcuNDYuNjExLS43MTcgNS4yMTIgOS44NjQgNC42MjYgMTMuMzM4IDUuNjQ3IiBvcGFjaXR5PSIuMTUiLz48L2c+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTQwNi42NzMgMjAyLjA5NmMyLjc2Ny00LjcwNyAyLjkxOS0xMC40NDUgMy0xNS45MDQuMTE2LTcuOTc1LjIyNy0xNS45NjUtLjQ5LTIzLjkwNGExMTQuNTU0IDExNC41NTQgMCAwIDAtMTAuMjQ4LTM4LjAyYy0yLjc2Mi01LjkyNS02LjA5MS0xMS42OTItMTAuNzgyLTE2LjI0My0zLjg5NC0zLjc3OC04LjU5Ni02LjU5Ni0xMy4yNTMtOS4zODRsLTEwLjM4NC02LjIxMmMtMi45MDQtMS43MzctNS44MjgtMy40ODUtOC45OC00LjcyNy02Ljg3OC0yLjcwNy0xNC40NTQtMi44NzQtMjEuODQ4LTMuMDA1LTcuNjY3LS4xMzYtMTUuMzc0LS4yNjgtMjIuOTYuODQ4LTYuMDUuODktMTEuOTY5IDIuNTcxLTE3LjcyMiA0LjY1Mi03LjI5OCAyLjY0MS0xNC44MzMgNi4zNjQtMTguNTY2IDEzLjE3MmE4MDkuNzAzIDgwOS43MDMgMCAwIDEgMzAuNTgxIDQuNjQxYzUuNDc1LjkzOSAxMC45NzUgMS45NDQgMTYuMTcyIDMuODk0IDguMDY2IDMuMDMgMTUuMTExIDguMjIyIDIxLjk4IDEzLjQyNCAxMy40MjQgMTAuMTY3IDI2LjcwNyAyMC42NzcgMzcuOTk1IDMzLjE3MiAxMS4yODggMTIuNDk1IDIwLjU3NSAyNy4xNDEgMjQuODIzIDQzLjQzOSIgb3BhY2l0eT0iLjcxIi8+PHBhdGggZmlsbD0iI0YwQjExRCIgZD0ibTM4Ny42OTMgMTg0Ljg5OSAxLjAwNS0xLjYyNmMuMjE3LS4zNTQuNzU4LS4xODIuNzQzLjIzMi0uMDIxLjQ2LS4xMDEuOTQ0LjA1IDEuMzY0LjE5Ny41NTUuNzE3Ljg1MyAxLjMwMyAxLjAyNS4zMDMuMDkxLjM2OS40ODUuMTI2LjY4N2E0LjAwNCA0LjAwNCAwIDAgMC0xLjM5OSAyLjg5NC4zOTkuMzk5IDAgMCAxLS42NTEuMjkzYy0uNDQtLjM1NC0uODU5LS43MzMtMS4yMDctMS4xNzdhLjQwMy40MDMgMCAwIDAtLjQ2NS0uMTE2Yy0uNTQ1LjIyMi0xLjA3Ni40NzQtMS42MDEuNzQyLS4zMjMuMTY3LS42OTItLjE0MS0uNTY2LS40OC4xOTctLjU0LjMyNC0xLjA5Ni4zMjQtMS42NjYgMC0uNjU3LS4xOTItMS4zMzQtLjU3MS0xLjg2NC0uMjAyLS4yNzMuMDItLjY2Ny4zNTktLjYzMS40MzQuMDQ1Ljg2My4xNjEgMS4yNTcuMzQ4TTI5Ny44MTkgMTQ2Ljg0OGwxLjAwNS0xLjYyNmMuMjE3LS4zNTMuNzU4LS4xODIuNzQzLjIzMy0uMDIxLjQ1OS0uMTAxLjk0NC4wNSAxLjM2My4xOTcuNTU2LjcxNy44NTQgMS4zMDMgMS4wMjUuMzAzLjA5MS4zNjkuNDg1LjEyNi42ODdhNC4wMDQgNC4wMDQgMCAwIDAtMS4zOTkgMi44OTQuMzk5LjM5OSAwIDAgMS0uNjUxLjI5M2MtLjQ0LS4zNTMtLjg1OS0uNzMyLTEuMjA3LTEuMTc3YS40MDQuNDA0IDAgMCAwLS40NjUtLjExNmMtLjU0NS4yMjItMS4wNzYuNDc1LTEuNjAxLjc0My0uMzIzLjE2Ni0uNjkyLS4xNDItLjU2Ni0uNDguMTk3LS41NDEuMzI0LTEuMDk2LjMyNC0xLjY2NyAwLS42NTYtLjE5Mi0xLjMzMy0uNTcxLTEuODYzLS4yMDItLjI3My4wMi0uNjY3LjM1OS0uNjMyLjQzNC4wNDYuODYzLjE2MiAxLjI1Ny4zNDlNMzU5LjUwMSAyMDYuMTc3Yy4yMjctLjg2OS42NzItMS4yMDIgMS4xMDYtMS43OTMuMTg3LS4yNTMuNTgxLS4yMjIuNzEyLjA2LjE4Ny4zODQuMzI0Ljc5My40MDQgMS4yMThhLjQxMy40MTMgMCAwIDAgLjQzNS4zMzNsMS42MjYtLjEwNmMuMzY0LS4wMjUuNTgxLjM5OS4zNTMuNjg3YTUuMjUgNS4yNSAwIDAgMS0uNzU3Ljc3OGMtLjE2Mi4xMzEtLjMzOC4yNjctLjQwNC40NjQtLjA1Ni4xNjctLjAyLjM1NC4wMi41MjUuMDg2LjM0OS4xOTIuNjk3LjMxOCAxLjAzMS4xMjEuMzE4LS4xODIuNjUxLS41MS41NWEyLjY3OCAyLjY3OCAwIDAgMS0uNzgzLS4zNzljLS4yMjItLjE2MS0uNDU5LS4zNjgtLjczMi0uMzMzLS4xNzcuMDItLjMyMy4xMzYtLjQ2LjI0OGwtMS4yNTIgMS4wM2MtLjI0My4yMDItLjYyNi4wNzEtLjY3Ny0uMjQzYTMuODUxIDMuODUxIDAgMCAwLS4yMTctLjc1MiA0LjQzOCA0LjQzOCAwIDAgMC0xLjU5Ni0xLjk4LjQxNi40MTYgMCAwIDEgLjExNi0uNzQyYy43OTMtLjI0MyAxLjYzNi0uNTkxIDIuMjk4LS41OTZaTTIxMC4wODcgMTIyLjM1OWwxLjAwNS0xLjYyN2MuMjE3LS4zNTMuNzU3LS4xODIuNzQyLjIzMy0uMDIuNDU5LS4xMDEuOTQ0LjA1MSAxLjM2My4xOTcuNTU2LjcxNy44NTQgMS4zMDMgMS4wMjYuMzAzLjA5LjM2OC40ODQuMTI2LjY4NmE0IDQgMCAwIDAtMS4zOTkgMi44OTQuNC40IDAgMCAxLS42NTIuMjkzYy0uNDM5LS4zNTMtLjg1OC0uNzMyLTEuMjA3LTEuMTc3YS40MDMuNDAzIDAgMCAwLS40NjQtLjExNiAyMC45MiAyMC45MiAwIDAgMC0xLjYwMS43NDNjLS4zMjQuMTY2LS42OTItLjE0Mi0uNTY2LS40OC4xOTctLjU0LjMyMy0xLjA5Ni4zMjMtMS42NjcgMC0uNjU2LS4xOTItMS4zMzMtLjU3LTEuODYzLS4yMDItLjI3My4wMi0uNjY3LjM1OC0uNjMyLjQzNC4wNDYuODY0LjE2MiAxLjI1OC4zNDlNMzM1LjM0OSA1My43NzNsMS4wMDUtMS42MjdjLjIxOC0uMzUzLjc1OC0uMTgxLjc0My4yMzMtLjAyLjQ2LS4xMDEuOTQ0LjA1IDEuMzYzLjE5Ny41NTYuNzE3Ljg1NCAxLjMwMyAxLjAyNi4zMDMuMDkuMzY5LjQ4NC4xMjcuNjg3YTMuOTk2IDMuOTk2IDAgMCAwLTEuMzk5IDIuODkzLjQuNCAwIDAgMS0uNjUyLjI5M2MtLjQzOS0uMzUzLS44NTgtLjczMi0xLjIwNy0xLjE3NmEuNDAzLjQwMyAwIDAgMC0uNDY1LS4xMTdjLS41NDUuMjIzLTEuMDc1LjQ3NS0xLjYwMS43NDMtLjMyMy4xNjYtLjY5Mi0uMTQyLS41NjUtLjQ4LjE5Ny0uNTQuMzIzLTEuMDk2LjMyMy0xLjY2NyAwLS42NTYtLjE5Mi0xLjMzMy0uNTcxLTEuODYzYS40LjQgMCAwIDEgLjM1OS0uNjMyYy40MzQuMDQ2Ljg2My4xNjIgMS4yNTcuMzQ5TTMxNC40OTEgMzAyLjU5NmwxLjAwNS0xLjYyNmMuMjE3LS4zNTQuNzU4LS4xODIuNzQyLjIzMi0uMDIuNDYtLjEwMS45NDQuMDUxIDEuMzY0LjE5Ny41NTUuNzE3Ljg1MyAxLjMwMyAxLjAyNS4zMDMuMDkxLjM2OS40ODUuMTI2LjY4N2E0LjAwNCA0LjAwNCAwIDAgMC0xLjM5OSAyLjg5NC4zOTkuMzk5IDAgMCAxLS42NTEuMjkzYy0uNDQtLjM1NC0uODU5LS43MzMtMS4yMDctMS4xNzdhLjQwMS40MDEgMCAwIDAtLjQ2NS0uMTE2Yy0uNTQ1LjIyMi0xLjA3Ni40NzQtMS42MDEuNzQyLS4zMjMuMTY3LS42OTItLjE0MS0uNTY2LS40OC4xOTctLjU0LjMyNC0xLjA5Ni4zMjQtMS42NjYgMC0uNjU3LS4xOTItMS4zMzQtLjU3MS0xLjg2NC0uMjAyLS4yNzMuMDItLjY2Ny4zNTgtLjYzMWEzLjg3IDMuODcgMCAwIDEgMS4yNTguMzQ4Ii8+PHBhdGggZmlsbD0iIzY4Q0JFMyIgZD0iTTQzNS42NDcgMjc4LjM5NGMtNy4wMS0xMS4zOTQtMTcuMTUxLTIwLjgzOS0yOS4wMS0yNy4wMy0xLjU5Ni0uODM0LTMuMjg4LTEuNjI3LTUuMDg2LTEuNjQyLTIuODgzLS4wMjUtNS41IDIuMDUxLTYuNzU3IDQuNjQ3LTEuMjU4IDIuNTk2LTEuMzQ5IDUuNjE2LS45NzUgOC40NzQuOTk1IDcuNTUxIDUuMDc2IDE0LjQ0NSAxMC4zNDMgMTkuOTQ1IDUuMjY4IDUuNSAxMS42OTcgOS43NDIgMTguMjE4IDEzLjY3MiAyLjgyMyAxLjcwMiA1Ljc2NyAzLjM4MyA5LjAyNSAzLjg2OCAzLjI2My40OCA2Ljk0NC0uNTA1IDguODAzLTMuMjI3IDIuMjE3LTMuMjQyIDEuMTg3LTcuNjcyLS40MDQtMTEuMjYzYTQ0LjAzNCA0NC4wMzQgMCAwIDAtMTEuNjUyLTE1LjYxMSIvPjxwYXRoIGZpbGw9IiMwMDRENzYiIGQ9Ik00MjYuNCAzMDMuODY0YzQuNDktMS42MzcgOC4xNTYtNC45MTUgMTEuNzAyLTguMTIyIDUuNDE0LTQuODk5IDEwLjgzMy05Ljc5OCAxNi4yNDctMTQuNjk3LjU2Ni0uNTEgMS4yOTMtMS4wNTUgMi4wMS0uODA4LjU3Ni4yMDIuODU5LjgyOSAxLjEyNiAxLjM3NGExMC45NSAxMC45NSAwIDAgMCA1LjYzMiA1LjIyMiAxNjguNTk1IDE2OC41OTUgMCAwIDEtMjkuMDY2IDI3LjExMWwtOC4xODctOC43MTciLz48cGF0aCBmaWxsPSIjNjhDQkUzIiBkPSJNMjA3LjEwMiAyOTUuOTM5YzQuNTYtMTMuMDI1IDEzLjM5NC0yNC41MTUgMjQuODEzLTMyLjI2MiA1LjAzNS0zLjQyIDEwLjg2My02LjE5MiAxNi45NDQtNS45MDQgMS45NDUuMDkgNC4wMTUuNTggNS4yOTggMi4wNCAxLjY0NyAxLjg2OSAxLjUgNC43MzIuNzI3IDcuMTAxLTEuNjU2IDUuMDcxLTUuNTY1IDkuMDQ1LTkuNTIgMTIuNjIxYTE2My42MzIgMTYzLjYzMiAwIDAgMS0yMC42MzYgMTUuODc5Yy0zLjM3NCAyLjE5Mi02Ljk0NSA0LjMwOC0xMC45MjQgNC45MjQtMS40NC4yMjItMi45OS4yMjctNC4yNTgtLjQ4LTIuMjY4LTEuMjYyLTIuODQ4LTQuNDI5LTEuOTktNi44NzMuODU5LTIuNDUgMi43OTMtNC4zMzkgNC42NjItNi4xMzciLz48cGF0aCBmaWxsPSIjMDA0RDc2IiBkPSJNMTkwLjY3MiAyNzMuODMzYTEzMy45IDEzMy45IDAgMCAwIDI2LjQ3IDIyLjU5NmMuOTY1LjYyNiAxLjk5IDEuMzAzIDIuNDI5IDIuMzY5LjY2NyAxLjYyNi0uMjg4IDMuNDI0LTEuMjEyIDQuOTE0YTU0NzEuOTU4IDU0NzEuOTU4IDAgMCAxLTQuMzk5IDcuMTAxIDExMy4yOTkgMTEzLjI5OSAwIDAgMS0zMC43MzItMjYuMTc3Yy0uMzM5LS40MTQtLjY4Ny0uODUzLS43NzgtMS4zNzktLjEyNi0uNzAyLjIyNy0xLjM4OC41NzYtMi4wMWE1NS4zMjEgNTUuMzIxIDAgMCAxIDYuNjkyLTkuMzk5Ii8+PC9nPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDE9IjMwMC41NTkiIHgyPSI0NTkuNDcyIiB5MT0iMzM5LjMxNSIgeTI9IjExOC41ODMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9IjAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1MUM3RUEiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYyIgeDE9IjE3OC4xMDUiIHgyPSIyMDMuNzE4IiB5MT0iMzQ5LjY2MiIgeTI9IjI3OS43MTkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9IjAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDRDNzUiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZCIgeDE9IjMzNy4wMTMiIHgyPSIxNzIuMTIiIHkxPSIyMzQuMjA5IiB5Mj0iMTcxLjU3MSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iMCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzUxQzdFQSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJlIiB4MT0iNDcwLjE0MSIgeDI9IjQ0NS44ODciIHkxPSIzNTMuODEyIiB5Mj0iMjg3LjU4MiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iMCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwNEM3NSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJmIiB4MT0iMjIxLjQ0NCIgeDI9IjQxMC4yMTUiIHkxPSIyMTguODY1IiB5Mj0iMjk4LjQ3OSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNmZmYiIHN0b3Atb3BhY2l0eT0iMCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzUxQzdFQSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iNDQwLjkyOCIgeDI9IjI2NS40MzIiIHkxPSIxNjQuOTYyIiB5Mj0iNTkuMjY3IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIgc3RvcC1vcGFjaXR5PSIwIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNTFDN0VBIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImoiIHgxPSIxNzkuMzMxIiB4Mj0iMzYwLjQ1MSIgeTE9IjExNi4yNzIiIHkyPSIxODQuMTkyIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzUxQzdFQSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJrIiB4MT0iMTU1LjA0NyIgeDI9IjM3Ni4yMTciIHkxPSIyMC4zNjQiIHkyPSIxMDMuMzAzIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzUxQzdFQSIvPjwvbGluZWFyR3JhZGllbnQ+PGNsaXBQYXRoIGlkPSJhIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNLjkxIDBINjE5LjA5djQwMEguOTF6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+");

/***/ }),

/***/ "./src/svg/NoResults.svg":
/*!*******************************!*\
  !*** ./src/svg/NoResults.svg ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: function() { return /* binding */ SvgNoResults; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _g, _defs;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SvgNoResults = function SvgNoResults(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 640 415"
  }, props), _g || (_g = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("g", {
    clipPath: "url(#NoResults_svg__a)"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#NoResults_svg__b)",
    stroke: "#fff",
    strokeMiterlimit: 10,
    strokeWidth: 0.166,
    d: "M454.42 139.195c-5.412 4.836-18.233 12.24-25.213 3.487-7.352-9.223 1.835-22.614 7.352-27.111 5.84-4.758 15.111-7.336 22.034-.502 7.613 7.53.763 19.713-4.173 24.126z",
    opacity: 0.31
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#F7C132",
    d: "M451.199 126.395c0-.643.518-1.161 1.161-1.161s1.161.518 1.161 1.161-.518 1.16-1.161 1.16a1.158 1.158 0 0 1-1.161-1.16z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M438.823 123.242c3.028-.633 3.378-1.14 3.807-5.574.429 4.434.779 4.941 3.806 5.574-3.027.633-3.377 1.14-3.806 5.574-.429-4.434-.779-4.941-3.807-5.574zm6.635 11.728c1.328-.189 1.48-.34 1.668-1.668.188 1.323.34 1.479 1.663 1.668-1.328.188-1.48.34-1.663 1.668-.188-1.323-.345-1.475-1.668-1.668z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#NoResults_svg__c)",
    stroke: "#fff",
    strokeMiterlimit: 10,
    strokeWidth: 0.166,
    d: "M383.806 276.858c32.847-25.956 25.072-37.219 55.493-60.769 8.382-6.494 25.386-.272 21.381 9.678-3.174 7.891-4.685 8.785-18.264 12.769l3.257 38.039c38.285 7.89 56.617-11.461 56.617-35.9 0-37.898-25.056-35.096-27.493-48.884-1.835-10.369 18.599-16.57 4.617-30.557-14.829-14.829-47.587 21.997-62.248-6.787-8.899-17.464 19.195-37.474 9.819-67.911-12.82-41.647-88.376-52.005-118.75-50.855-86.379 3.268-134.097 72.612-133.448 134.688.815 78.164 100.162 192.496 209.019 106.489z",
    opacity: 0.31
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#68CBE3",
    d: "M196.794 154.16c-.653-6.421 4.021-12.157 10.442-12.806 6.421-.653 12.152 4.027 12.805 10.442.654 6.421-4.02 12.152-10.441 12.805-6.421.649-12.157-4.026-12.806-10.441zm24.848 107.383c.983-1.438-1.574-4.356-2.62-2.714-.397.627-.078 2.227.413 2.735.46.475 1.773.617 2.207-.021z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M278.248 251.937c0-.847.69-1.537 1.537-1.537s1.538.69 1.538 1.537c0 .852-.691 1.537-1.538 1.537a1.532 1.532 0 0 1-1.537-1.537zm72.418-14.274a1.537 1.537 0 1 1 3.076-.002 1.537 1.537 0 0 1-3.076.002zm63.624-47.409c0-.848.69-1.538 1.537-1.538s1.538.69 1.538 1.538a1.537 1.537 0 0 1-3.075 0zm-10.489 87.309a1.536 1.536 0 1 1 3.076-.002 1.536 1.536 0 0 1-3.076.002zM251.67 225.72a1.536 1.536 0 1 1 3.074 0 1.536 1.536 0 1 1-3.074 0zm80.346-89.26c0-.847.69-1.537 1.537-1.537s1.537.69 1.537 1.537a1.536 1.536 0 1 1-3.074 0zm-6.39-52.7c0-.848.69-1.538 1.537-1.538s1.537.69 1.537 1.537a1.54 1.54 0 0 1-1.537 1.538 1.54 1.54 0 0 1-1.537-1.538zm62.666 58.258c0-.847.69-1.537 1.537-1.537s1.538.69 1.538 1.537a1.54 1.54 0 0 1-1.538 1.537 1.54 1.54 0 0 1-1.537-1.537z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#F7C132",
    d: "M311.236 272.381a1.162 1.162 0 1 1 2.323.003 1.162 1.162 0 0 1-2.323-.003zm118.259-54.682a1.161 1.161 0 1 1 2.322.002 1.161 1.161 0 0 1-2.322-.002zm-39.665 81.124a1.161 1.161 0 1 1 2.322.002 1.161 1.161 0 0 1-2.322-.002z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M383.911 235.571a1.161 1.161 0 1 1 2.322.002 1.161 1.161 0 0 1-2.322-.002zM263.539 68.837c0-.643.518-1.161 1.161-1.161s1.161.518 1.161 1.16c0 .644-.518 1.162-1.161 1.162a1.158 1.158 0 0 1-1.161-1.161zM227.55 103.08c0-.643.523-1.161 1.161-1.161.643 0 1.16.518 1.16 1.161s-.517 1.161-1.16 1.161a1.162 1.162 0 0 1-1.161-1.161zm12.167 9.746c0-.643.517-1.161 1.161-1.161.643 0 1.16.518 1.16 1.161s-.517 1.161-1.16 1.161a1.162 1.162 0 0 1-1.161-1.161zm36.361-38.269c0-.643.518-1.16 1.161-1.16s1.161.517 1.161 1.16a1.162 1.162 0 0 1-2.322 0zm-79.049 118.311c3.028-.632 3.378-1.14 3.807-5.574.429 4.434.779 4.947 3.806 5.574-3.027.628-3.377 1.14-3.806 5.574-.429-4.429-.779-4.941-3.807-5.574zm-7.612 9.799c3.027-.633 3.378-1.14 3.807-5.574.428 4.434.779 4.941 3.806 5.574-3.027.632-3.378 1.14-3.806 5.573-.429-4.433-.78-4.941-3.807-5.573zm249.558-20.989c3.027-.627 3.377-1.14 3.806-5.574.429 4.434.779 4.947 3.807 5.574-3.028.633-3.378 1.14-3.807 5.574-.429-4.434-.779-4.941-3.806-5.574zm-61.517 113.993c3.027-.633 3.378-1.14 3.807-5.574.428 4.434.779 4.941 3.806 5.574-3.027.627-3.378 1.139-3.806 5.579-.434-4.44-.78-4.952-3.807-5.579zm-165.4-68.283c1.328-.188 1.479-.34 1.668-1.668.188 1.323.339 1.475 1.668 1.668-1.329.188-1.48.34-1.668 1.668-.189-1.328-.34-1.48-1.668-1.668zM239.215 83.76c1.328-.189 1.48-.34 1.668-1.668.188 1.328.34 1.474 1.668 1.668-1.323.188-1.48.34-1.668 1.667-.194-1.328-.345-1.48-1.668-1.668zm10.662-5.308c1.328-.188 1.48-.34 1.668-1.668.188 1.323.34 1.475 1.668 1.668-1.323.189-1.48.34-1.668 1.668-.188-1.328-.345-1.48-1.668-1.668zm-1.668 8.947c1.328-.189 1.48-.34 1.668-1.668.188 1.328.34 1.48 1.668 1.668-1.328.188-1.48.34-1.668 1.668-.188-1.328-.345-1.48-1.668-1.668zm55.524 176.69c1.329-.188 1.48-.34 1.668-1.668.189 1.328.34 1.48 1.668 1.668-1.328.188-1.479.34-1.668 1.668-.193-1.328-.345-1.48-1.668-1.668zm-36.387 17.61c1.323-.188 1.479-.34 1.668-1.668.188 1.328.34 1.48 1.668 1.668-1.323.188-1.48.34-1.668 1.668-.194-1.328-.345-1.48-1.668-1.668zm-25.491 13.971c1.329-.188 1.48-.339 1.668-1.668.189 1.329.34 1.48 1.668 1.668-1.328.189-1.479.34-1.668 1.668-.188-1.328-.339-1.479-1.668-1.668zm176.853-53.27c1.328-.188 1.48-.34 1.668-1.668.188 1.323.34 1.48 1.668 1.668-1.328.188-1.48.34-1.668 1.668-.188-1.328-.34-1.48-1.668-1.668zm-6.996-142.541c1.328-.188 1.48-.34 1.668-1.668.188 1.323.34 1.48 1.663 1.668-1.328.188-1.48.34-1.663 1.668-.188-1.328-.34-1.48-1.668-1.668zm-27.623 207.539c1.328-.188 1.48-.339 1.668-1.668.188 1.329.34 1.48 1.668 1.668-1.328.189-1.48.34-1.668 1.663-.188-1.323-.34-1.474-1.668-1.663zm-6.16-120.71c1.328-.189 1.479-.34 1.668-1.668.188 1.328.34 1.479 1.668 1.668-1.328.188-1.48.339-1.668 1.667-.189-1.328-.34-1.479-1.668-1.667z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#NoResults_svg__d)",
    stroke: "#fff",
    strokeMiterlimit: 10,
    strokeWidth: 0.166,
    d: "M472.669 151.812c5.349-7.357-9.045-14.991-13.364-7.352-4.199 7.425 8.721 13.741 13.364 7.352z",
    opacity: 0.31
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#NoResults_svg__e)",
    stroke: "#fff",
    strokeMiterlimit: 10,
    strokeWidth: 0.166,
    d: "M488.575 149.736c2.379-4.089-6.871-6.782-8.612-2.63-1.694 4.037 6.552 6.18 8.612 2.63z",
    opacity: 0.31
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004C76",
    d: "m349.673 267.524 35.038-32.084a.247.247 0 0 1 .345.016.248.248 0 0 1 0 .33l-32.084 35.037a2.337 2.337 0 0 1-3.299.147 2.332 2.332 0 0 1 0-3.446zm-12.215-123.336 35.038-32.083a.246.246 0 0 1 .345.015.248.248 0 0 1 0 .33l-32.084 35.038a2.338 2.338 0 0 1-3.299.146 2.332 2.332 0 0 1-.146-3.299.967.967 0 0 1 .146-.147zm-96.779 16.152 23.739-21.741a.165.165 0 0 1 .235.01.17.17 0 0 1 0 .225l-21.741 23.739a1.58 1.58 0 1 1-2.332-2.134l.099-.099z",
    opacity: 0.15
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M291.335 279.017c.643.225.988.925.764 1.574a1.234 1.234 0 1 1-2.332-.811 1.234 1.234 0 0 1 1.568-.763zm5.762-9.119c.482.167.738.69.57 1.171a.92.92 0 1 1-.57-1.171zm-13.218 5.976a1.237 1.237 0 1 1-.81 2.34 1.237 1.237 0 0 1 .81-2.34zm29.036 10.944a.906.906 0 0 1 .56 1.145.902.902 0 1 1-.56-1.145zm-16.455-26.442a1.237 1.237 0 1 1-1.574.764 1.242 1.242 0 0 1 1.574-.764zm-9.987 28.952a1.237 1.237 0 0 1-.811 2.337 1.24 1.24 0 0 1-.768-1.574c.23-.643.931-.983 1.579-.763zm-9.208 7.681a.707.707 0 1 1-.46 1.342.707.707 0 0 1 .46-1.342z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m290.975 280.019-.118.341 21.691 7.475.118-.341-21.691-7.475z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m290.774 280.104-4.866 10.314.326.154 4.867-10.314-.327-.154z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m276.92 297.543 9.035-7.185.225.283-9.035 7.179-.225-.277zm6.483-20.335.142-.335 7.461 3.148-.141.334-7.462-3.147z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m296.667 270.668-5.864 9.42.306.191 5.864-9.42-.306-.191z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m295.874 261.558.361-.026.742 9.219-.355.031-.748-9.224zm-86.841-92.179-21.32.748.011.309 21.32-.749-.011-.308z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m216.23 174.353-.178.251-7.106-4.946.183-.257 7.101 4.952z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m231.81 160.584-15.761 13.774.203.233 15.761-13.775-.203-.232z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m236.036 166.447-.251.178-4.015-5.83.256-.178 4.01 5.83z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m236.063 166.517-.305.047 5.888 38.004.305-.048-5.888-38.003z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m250.755 201.161-8.878 3.524-.115-.288 8.878-3.524.115.288z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m250.855 201.025-.314-.016.288-7.66.313.011-.287 7.665z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m251.058 193.49-10.06 5.433-.146-.272 10.06-5.433.146.272z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M250.603 194.118a.853.853 0 1 1 .764-1.527.853.853 0 1 1-.764 1.527zm-9.17 11.184a.85.85 0 0 1-.377-1.145.856.856 0 0 1 1.145-.382.852.852 0 0 1 .382 1.145.86.86 0 0 1-1.15.382zm-9.915-43.833a.852.852 0 0 1-.381-1.145.851.851 0 1 1 1.521.764.852.852 0 0 1-1.14.381zm-15.764 13.773a.857.857 0 0 1-.382-1.145.852.852 0 0 1 1.145-.382.856.856 0 0 1 .382 1.145.852.852 0 0 1-1.145.382zm34.667 26.326a.62.62 0 1 1 .553-1.107.62.62 0 0 1-.553 1.107zm-9.779-2.227a.62.62 0 1 1 .832-.277.618.618 0 0 1-.832.277zm-5.217-32.356a.62.62 0 1 1 .831-.277.617.617 0 0 1-.831.277zm-26.667 3.096a.62.62 0 1 1 .831-.277.613.613 0 0 1-.831.277zm132.068-67.357a1.279 1.279 0 1 1 1.359-1.197 1.28 1.28 0 0 1-1.359 1.197zm-9.522-32.11a1.277 1.277 0 0 1-1.192-1.36 1.277 1.277 0 0 1 1.36-1.191 1.275 1.275 0 0 1 1.192 1.354 1.275 1.275 0 0 1-1.36 1.197zm8.759 43.619a.948.948 0 0 1-.884-1.015.956.956 0 0 1 1.009-.889.954.954 0 0 1-.125 1.904zm51.514-23.985a1.273 1.273 0 0 1-1.187-1.36 1.276 1.276 0 0 1 1.359-1.191 1.275 1.275 0 0 1 1.192 1.354 1.282 1.282 0 0 1-1.364 1.197zm-58.532 29.773a1.277 1.277 0 0 1-1.187-1.36 1.277 1.277 0 0 1 1.36-1.192 1.275 1.275 0 0 1 1.192 1.354 1.285 1.285 0 0 1-1.365 1.198z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M277.364 74.436c-.031.053-.083.079-.12.12l55.775 44.335.23-.292-55.785-44.346c-.032.063-.058.126-.1.183z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m339.998 113.148-6.992 5.463.228.292 6.992-5.462-.228-.293z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m341.092 101.459-.784 11.838-.371-.021.784-11.838.371.021z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m341.087 101.396-.355.105-9.522-32.105.361-.11 9.516 32.11zm15.89-53.892-.284.24L391.499 89.1l.284-.24-34.806-41.357z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "m389.563 142.254-.372-.016 2.285-53.27.372.015-2.285 53.271z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#68CBE3",
    d: "M299.037 172.701c13.49-6.453 29.71-.727 36.162 12.758 6.452 13.49.727 29.71-12.758 36.162a26.902 26.902 0 0 1-11.66 2.651c-10.123 0-19.854-5.689-24.502-15.414-6.453-13.48-.727-29.705 12.758-36.157z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004C76",
    d: "M261.986 222.343c.936 1.96 3.503 2.813 7.242 2.813 6.107 0 15.352-2.317 25.626-6.029 7.174-2.552 14.855-5.794 22.343-9.381 7.21-3.445 14.29-7.226 20.606-11.058 15.404-9.297 26.358-18.798 23.848-24.027-2.98-6.222-21.045-.977-32.135 2.939a22.159 22.159 0 0 1 2.054 2.191c18.51-6.4 26.646-5.919 27.598-3.943 1.087 2.291-5.543 9.878-21.365 19.64-5.945 3.67-13.187 7.655-21.793 11.78-8.962 4.277-16.868 7.503-23.624 9.861-17.046 5.904-26.839 6.265-27.916 4.016-.926-1.919 3.639-8.413 19.723-18.562a20.048 20.048 0 0 1-.429-2.991c-9.726 6.05-24.706 16.638-21.778 22.751z",
    opacity: 0.15
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#NoResults_svg__f)",
    d: "M300.052 344.355c93.191 0 168.737-2.127 168.737-4.752s-75.546-4.753-168.737-4.753c-93.191 0-168.738 2.128-168.738 4.753s75.547 4.752 168.738 4.752z",
    opacity: 0.31
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "url(#NoResults_svg__g)",
    d: "M311.241 343.085c28.719 0 52-1.559 52-3.483 0-1.923-23.281-3.482-52-3.482s-52 1.559-52 3.482c0 1.924 23.281 3.483 52 3.483z",
    opacity: 0.31
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#67CBE4",
    d: "m189.074 279.956-.566-8.158-35.439 2.459.566 8.158 35.439-2.459z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#4585C5",
    d: "m303.759 258.735-2.468 81.202h26.28l-2.442-80.193-21.37-1.009z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#4585C5",
    d: "m326.902 317.757-1.773-58.013-21.369-1.009-1.768 59.843c8.377 1.197 16.497 1.25 24.91-.821z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#67CBE4",
    d: "m262.393 280.222-1.353-19.509-84.753 5.879 1.353 19.509 84.753-5.879z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#67CBE4",
    d: "m384.651 282.438-2.793-40.259-174.899 12.132 2.793 40.259 174.899-12.132z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004C76",
    d: "m381.856 242.144-.455.031 2.405 34.683-50.374 3.513c-8.465 9.051-22.243 11.708-33.72 5.627a28.44 28.44 0 0 1-4.502-2.965l-85.846 5.987.387 5.579 86.301-6.018a28.365 28.365 0 0 0 4.502 2.964c11.477 6.081 25.255 3.42 33.72-5.626l50.374-3.514-2.792-40.261z",
    opacity: 0.15
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#67CBE4",
    d: "m422.94 284.369-3.356-48.177-41.777 2.911 3.357 48.177 41.776-2.911z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004C76",
    d: "m207.671 264.423-5.768.403 1.323 19.514 5.799-.408-1.354-19.509zm170.577-22.264-5.768.403 2.526 40.528 5.84-.408-2.598-40.523zM176.72 272.617l-3.077.215.569 8.158 3.077-.215-.569-8.158z",
    opacity: 0.15
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#67CBE4",
    d: "m448.623 286.016-3.842-55.141-26.863 1.872 3.841 55.141 26.864-1.872z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004C76",
    d: "m418.175 236.183-7.561.622 2.536 48.23 8.387-.58-3.362-48.272z",
    opacity: 0.15
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#FBC3A5",
    d: "M158.713 279.074c-.062.094-.324.659-.476.983-.015-.005-.026-.01-.041-.01.094-.246.245-.659.261-.722.026-.089-.073-.151-.125-.089a48.43 48.43 0 0 0-.597 1.046c-.193.309-.386.722-.407.764-.037.068-.178-.225-.178-.225s.183-.178.099-.534c-.083-.355-.225-.266-.225-.266s-.026.052-.057.261c-.032.209-.429.947-.429.947.277.434.042 1.589.042 1.589s.711.434.878.089c.168-.345.502-.758.748-.999.141-.141.34-.575.486-.915.006-.01.016-.015.016-.021a25.17 25.17 0 0 0 .434-1.113c.026-.089-.073-.152-.125-.089-.037.057-.163.329-.299.627a.632.632 0 0 1-.062-.057c.12-.309.324-.837.345-.9.026-.089-.073-.151-.126-.089-.052.079-.24.502-.392.848-.016-.011-.036-.027-.052-.037.057-.115.382-.91.408-.994.021-.094-.073-.156-.126-.094z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004C76",
    d: "M136.549 293.924s5.302 13.286 11.498 11.273 9.851-22.703 9.851-22.703l-1.417-.068s-8.063 13.176-9.407 14.63c-1.343 1.454-4.256-9.297-4.256-9.297l-6.269 6.165z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#67CBE4",
    d: "M145.495 319.43s10.353-1.135 14.682-3.77l-5.301 21.506h3.048s11.268-19.686 13.213-26.337c1.945-6.651-25.642-2.777-25.642-2.777v11.378z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#67CBE4",
    d: "M149.428 307.383s12.674-4.539 15.937-5.668c3.263-1.129 17.004 26.039 17.004 26.039l-2.949 1.882-17.945-14.243-15.31 1.987 3.263-9.997z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#4585C5",
    d: "M142.735 283.456s-8.45 3.765-10.876 15.059c-2.426 11.294 7.697 21.584 13.636 20.915l3.932-12.047-6.692-23.927z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#4585C5",
    d: "m142.734 283.456 6.066.377 5.521 21.803-11.587 6.557v-28.737z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#E9F5F6",
    d: "M145.024 286.954s4.351 17.062 4.11 21.616l1.286-.727s-.554-12.91-2.609-21.276l-2.787.387z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    stroke: "#35444C",
    strokeMiterlimit: 10,
    strokeWidth: 0.516,
    d: "M150.17 277.019c-.413-1.338-5.819.628-6.912 2.165 0 0 .512 1.679.648 1.971.053.11-1.166 2.845-1.166 2.845 1.375.732 3.462 5.229 5.072 2.567.23-.382.335-1.203.387-1.856.005-.052.413-.136.591-.173.758-.141 1.276-.815 1.454-2.583.172-1.757.554-2.891-.074-4.936z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#FAB01D",
    d: "M152.131 272.622c-.795-.664-3.42.758-7.441 1.511-5.019.941-1.255 8.256-1.255 8.256l.325-.115c.198-.465.658-1.464.658-1.464a1.124 1.124 0 0 1-.219-.35l.162-.695s.01-.382.591-.492c.402.131.664.622.821 1.072.24-.241.376-.502.46-.737-.11-.675-.215-1.26-.241-1.391a.376.376 0 0 0 .016-.042s4.287.852 5.396-.408c1.103-1.265 1.171-4.591.727-5.145z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#67CBE4",
    d: "M148.444 320.716h-9.16a.63.63 0 0 1-.628-.627.63.63 0 0 1 .628-.628h9.16a.63.63 0 0 1 .628.628.629.629 0 0 1-.628.627z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#67CBE4",
    d: "M141.228 320.308h-1.443v18.071h1.443v-18.071zm6.934 0h-1.443v18.071h1.443v-18.071z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004C76",
    d: "M154.949 337.474s-.194 1.245.115 1.804c0 0 .873-.036 1.071-.031l.22-.528s.345-.052.664.01c.319.068 3.09.779 4.1.126 0 0 .141-.141-.027-.236-.308-.177-6.143-1.145-6.143-1.145zm24.81-7.503s-.193 1.245.115 1.804c0 0 .873-.037 1.072-.031l.22-.528s.345-.053.664.01c.319.068 3.09.779 4.099.125 0 0 .141-.141-.026-.235-.314-.183-6.144-1.145-6.144-1.145z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#FBC3A5",
    d: "M157.626 278.118c-.079.12-.408.82-.591 1.223a.868.868 0 0 1-.047-.016c.12-.308.303-.826.329-.904.032-.11-.089-.194-.157-.11-.109.167-.747 1.307-.747 1.307-.241.382-.481.9-.513.952-.047.083-.219-.283-.219-.283s.225-.219.12-.664c-.105-.444-.282-.334-.282-.334s-.037.063-.074.324c-.036.261-.533 1.182-.533 1.182.345.543.052 1.987.052 1.987s.884.543 1.093.115c.209-.429.633-.947.936-1.25.178-.173.429-.716.607-1.145.01-.011.015-.021.021-.032.052-.094.507-1.281.538-1.39.032-.11-.089-.194-.157-.11-.047.068-.204.413-.371.784-.026-.021-.052-.047-.078-.073.151-.382.402-1.046.428-1.124.032-.11-.088-.194-.156-.11-.063.099-.304.627-.492 1.061-.021-.015-.047-.031-.068-.047.068-.141.481-1.14.512-1.244.037-.099-.088-.183-.151-.099z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#4585C5",
    d: "M134.709 293.589s5.302 13.287 11.498 11.274c6.196-2.014 10.416-22.563 10.416-22.563l-1.569-.141s-8.476 13.109-9.82 14.568c-1.343 1.453-4.256-9.297-4.256-9.297l-6.269 6.159z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#004C76",
    d: "M331.393 279.859c6.097-11.509 3.41-25.323-5.699-33.783l-41.025 2.86a28.561 28.561 0 0 0-3.027 4.575c-6.536 12.345-2.97 27.352 7.791 35.545l37.113-2.588a27.913 27.913 0 0 0 4.847-6.609z",
    opacity: 0.15
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#67CBE4",
    d: "M340.566 275.267c4.735-14.806-3.429-30.648-18.236-35.383-14.806-4.735-30.648 3.43-35.383 18.236-4.735 14.807 3.43 30.648 18.236 35.383 14.807 4.735 30.648-3.43 35.383-18.236z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#0C5479",
    d: "M322.24 271.478c2.653-4.7.994-10.661-3.706-13.314-4.7-2.653-10.661-.994-13.314 3.706-2.653 4.7-.994 10.661 3.706 13.314 4.7 2.653 10.661.994 13.314-3.706z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    stroke: "#fff",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeMiterlimit: 10,
    strokeWidth: 1.002,
    d: "m250.834 255.169 8.162-.67m3.723-.12 3.754-.308m77.417-6.897 8.162-.669m3.722-.126 3.755-.303m28.183-4.225 15.085-1.177m-101.506 4.518s9.077-6.144 21.203-1.772"
  }))), _defs || (_defs = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "NoResults_svg__b",
    x1: 156.289,
    x2: 385.265,
    y1: 21.157,
    y2: 107.023,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#fff"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#51C7EA"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "NoResults_svg__c",
    x1: 181.087,
    x2: 393.394,
    y1: 120.321,
    y2: 199.936,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#fff"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#51C7EA"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "NoResults_svg__d",
    x1: 243.539,
    x2: 472.515,
    y1: 64.426,
    y2: 150.292,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#fff"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#51C7EA"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "NoResults_svg__e",
    x1: 245.65,
    x2: 474.627,
    y1: 58.794,
    y2: 144.66,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#fff"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#51C7EA"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "NoResults_svg__f",
    x1: 131.317,
    x2: 468.787,
    y1: 339.6,
    y2: 339.6,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#fff"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#51C7EA"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("linearGradient", {
    id: "NoResults_svg__g",
    x1: 259.24,
    x2: 363.243,
    y1: 339.6,
    y2: 339.6,
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    stopColor: "#fff"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("stop", {
    offset: 1,
    stopColor: "#51C7EA"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("clipPath", {
    id: "NoResults_svg__a"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#fff",
    d: "M0 0h640v414.118H0z"
  })))));
};

/* harmony default export */ __webpack_exports__["default"] = ("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNDE1IiBmaWxsPSJub25lIj48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxwYXRoIGZpbGw9InVybCgjYikiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9Ii4xNjYiIGQ9Ik00NTQuNDIgMTM5LjE5NWMtNS40MTIgNC44MzYtMTguMjMzIDEyLjI0LTI1LjIxMyAzLjQ4Ny03LjM1Mi05LjIyMyAxLjgzNS0yMi42MTQgNy4zNTItMjcuMTExIDUuODQtNC43NTggMTUuMTExLTcuMzM2IDIyLjAzNC0uNTAyIDcuNjEzIDcuNTMuNzYzIDE5LjcxMy00LjE3MyAyNC4xMjZ6IiBvcGFjaXR5PSIuMzEiLz48cGF0aCBmaWxsPSIjRjdDMTMyIiBkPSJNNDUxLjE5OSAxMjYuMzk1YzAtLjY0My41MTgtMS4xNjEgMS4xNjEtMS4xNjFzMS4xNjEuNTE4IDEuMTYxIDEuMTYxLS41MTggMS4xNi0xLjE2MSAxLjE2YTEuMTU4IDEuMTU4IDAgMCAxLTEuMTYxLTEuMTZ6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTQzOC44MjMgMTIzLjI0MmMzLjAyOC0uNjMzIDMuMzc4LTEuMTQgMy44MDctNS41NzQuNDI5IDQuNDM0Ljc3OSA0Ljk0MSAzLjgwNiA1LjU3NC0zLjAyNy42MzMtMy4zNzcgMS4xNC0zLjgwNiA1LjU3NC0uNDI5LTQuNDM0LS43NzktNC45NDEtMy44MDctNS41NzR6bTYuNjM1IDExLjcyOGMxLjMyOC0uMTg5IDEuNDgtLjM0IDEuNjY4LTEuNjY4LjE4OCAxLjMyMy4zNCAxLjQ3OSAxLjY2MyAxLjY2OC0xLjMyOC4xODgtMS40OC4zNC0xLjY2MyAxLjY2OC0uMTg4LTEuMzIzLS4zNDUtMS40NzUtMS42NjgtMS42Njh6Ii8+PHBhdGggZmlsbD0idXJsKCNjKSIgc3Ryb2tlPSIjZmZmIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iLjE2NiIgZD0iTTM4My44MDYgMjc2Ljg1OGMzMi44NDctMjUuOTU2IDI1LjA3Mi0zNy4yMTkgNTUuNDkzLTYwLjc2OSA4LjM4Mi02LjQ5NCAyNS4zODYtLjI3MiAyMS4zODEgOS42NzgtMy4xNzQgNy44OTEtNC42ODUgOC43ODUtMTguMjY0IDEyLjc2OWwzLjI1NyAzOC4wMzljMzguMjg1IDcuODkgNTYuNjE3LTExLjQ2MSA1Ni42MTctMzUuOSAwLTM3Ljg5OC0yNS4wNTYtMzUuMDk2LTI3LjQ5My00OC44ODQtMS44MzUtMTAuMzY5IDE4LjU5OS0xNi41NyA0LjYxNy0zMC41NTctMTQuODI5LTE0LjgyOS00Ny41ODcgMjEuOTk3LTYyLjI0OC02Ljc4Ny04Ljg5OS0xNy40NjQgMTkuMTk1LTM3LjQ3NCA5LjgxOS02Ny45MTEtMTIuODItNDEuNjQ3LTg4LjM3Ni01Mi4wMDUtMTE4Ljc1LTUwLjg1NS04Ni4zNzkgMy4yNjgtMTM0LjA5NyA3Mi42MTItMTMzLjQ0OCAxMzQuNjg4LjgxNSA3OC4xNjQgMTAwLjE2MiAxOTIuNDk2IDIwOS4wMTkgMTA2LjQ4OXoiIG9wYWNpdHk9Ii4zMSIvPjxwYXRoIGZpbGw9IiM2OENCRTMiIGQ9Ik0xOTYuNzk0IDE1NC4xNmMtLjY1My02LjQyMSA0LjAyMS0xMi4xNTcgMTAuNDQyLTEyLjgwNiA2LjQyMS0uNjUzIDEyLjE1MiA0LjAyNyAxMi44MDUgMTAuNDQyLjY1NCA2LjQyMS00LjAyIDEyLjE1Mi0xMC40NDEgMTIuODA1LTYuNDIxLjY0OS0xMi4xNTctNC4wMjYtMTIuODA2LTEwLjQ0MXptMjQuODQ4IDEwNy4zODNjLjk4My0xLjQzOC0xLjU3NC00LjM1Ni0yLjYyLTIuNzE0LS4zOTcuNjI3LS4wNzggMi4yMjcuNDEzIDIuNzM1LjQ2LjQ3NSAxLjc3My42MTcgMi4yMDctLjAyMXoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjc4LjI0OCAyNTEuOTM3YzAtLjg0Ny42OS0xLjUzNyAxLjUzNy0xLjUzN3MxLjUzOC42OSAxLjUzOCAxLjUzN2MwIC44NTItLjY5MSAxLjUzNy0xLjUzOCAxLjUzN2ExLjUzMiAxLjUzMiAwIDAgMS0xLjUzNy0xLjUzN3ptNzIuNDE4LTE0LjI3NGExLjUzNyAxLjUzNyAwIDEgMSAzLjA3Ni0uMDAyIDEuNTM3IDEuNTM3IDAgMCAxLTMuMDc2LjAwMnptNjMuNjI0LTQ3LjQwOWMwLS44NDguNjktMS41MzggMS41MzctMS41MzhzMS41MzguNjkgMS41MzggMS41MzhhMS41MzcgMS41MzcgMCAwIDEtMy4wNzUgMHptLTEwLjQ4OSA4Ny4zMDlhMS41MzYgMS41MzYgMCAxIDEgMy4wNzYtLjAwMiAxLjUzNiAxLjUzNiAwIDAgMS0zLjA3Ni4wMDJ6TTI1MS42NyAyMjUuNzJhMS41MzYgMS41MzYgMCAxIDEgMy4wNzQgMCAxLjUzNiAxLjUzNiAwIDEgMS0zLjA3NCAwem04MC4zNDYtODkuMjZjMC0uODQ3LjY5LTEuNTM3IDEuNTM3LTEuNTM3czEuNTM3LjY5IDEuNTM3IDEuNTM3YTEuNTM2IDEuNTM2IDAgMSAxLTMuMDc0IDB6bS02LjM5LTUyLjdjMC0uODQ4LjY5LTEuNTM4IDEuNTM3LTEuNTM4czEuNTM3LjY5IDEuNTM3IDEuNTM3YTEuNTQgMS41NCAwIDAgMS0xLjUzNyAxLjUzOCAxLjU0IDEuNTQgMCAwIDEtMS41MzctMS41Mzh6bTYyLjY2NiA1OC4yNThjMC0uODQ3LjY5LTEuNTM3IDEuNTM3LTEuNTM3czEuNTM4LjY5IDEuNTM4IDEuNTM3YTEuNTQgMS41NCAwIDAgMS0xLjUzOCAxLjUzNyAxLjU0IDEuNTQgMCAwIDEtMS41MzctMS41Mzd6Ii8+PHBhdGggZmlsbD0iI0Y3QzEzMiIgZD0iTTMxMS4yMzYgMjcyLjM4MWExLjE2MiAxLjE2MiAwIDEgMSAyLjMyMy4wMDMgMS4xNjIgMS4xNjIgMCAwIDEtMi4zMjMtLjAwM3ptMTE4LjI1OS01NC42ODJhMS4xNjEgMS4xNjEgMCAxIDEgMi4zMjIuMDAyIDEuMTYxIDEuMTYxIDAgMCAxLTIuMzIyLS4wMDJ6bS0zOS42NjUgODEuMTI0YTEuMTYxIDEuMTYxIDAgMSAxIDIuMzIyLjAwMiAxLjE2MSAxLjE2MSAwIDAgMS0yLjMyMi0uMDAyeiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0zODMuOTExIDIzNS41NzFhMS4xNjEgMS4xNjEgMCAxIDEgMi4zMjIuMDAyIDEuMTYxIDEuMTYxIDAgMCAxLTIuMzIyLS4wMDJ6TTI2My41MzkgNjguODM3YzAtLjY0My41MTgtMS4xNjEgMS4xNjEtMS4xNjFzMS4xNjEuNTE4IDEuMTYxIDEuMTZjMCAuNjQ0LS41MTggMS4xNjItMS4xNjEgMS4xNjJhMS4xNTggMS4xNTggMCAwIDEtMS4xNjEtMS4xNjF6TTIyNy41NSAxMDMuMDhjMC0uNjQzLjUyMy0xLjE2MSAxLjE2MS0xLjE2MS42NDMgMCAxLjE2LjUxOCAxLjE2IDEuMTYxcy0uNTE3IDEuMTYxLTEuMTYgMS4xNjFhMS4xNjIgMS4xNjIgMCAwIDEtMS4xNjEtMS4xNjF6bTEyLjE2NyA5Ljc0NmMwLS42NDMuNTE3LTEuMTYxIDEuMTYxLTEuMTYxLjY0MyAwIDEuMTYuNTE4IDEuMTYgMS4xNjFzLS41MTcgMS4xNjEtMS4xNiAxLjE2MWExLjE2MiAxLjE2MiAwIDAgMS0xLjE2MS0xLjE2MXptMzYuMzYxLTM4LjI2OWMwLS42NDMuNTE4LTEuMTYgMS4xNjEtMS4xNnMxLjE2MS41MTcgMS4xNjEgMS4xNmExLjE2MiAxLjE2MiAwIDAgMS0yLjMyMiAwem0tNzkuMDQ5IDExOC4zMTFjMy4wMjgtLjYzMiAzLjM3OC0xLjE0IDMuODA3LTUuNTc0LjQyOSA0LjQzNC43NzkgNC45NDcgMy44MDYgNS41NzQtMy4wMjcuNjI4LTMuMzc3IDEuMTQtMy44MDYgNS41NzQtLjQyOS00LjQyOS0uNzc5LTQuOTQxLTMuODA3LTUuNTc0em0tNy42MTIgOS43OTljMy4wMjctLjYzMyAzLjM3OC0xLjE0IDMuODA3LTUuNTc0LjQyOCA0LjQzNC43NzkgNC45NDEgMy44MDYgNS41NzQtMy4wMjcuNjMyLTMuMzc4IDEuMTQtMy44MDYgNS41NzMtLjQyOS00LjQzMy0uNzgtNC45NDEtMy44MDctNS41NzN6bTI0OS41NTgtMjAuOTg5YzMuMDI3LS42MjcgMy4zNzctMS4xNCAzLjgwNi01LjU3NC40MjkgNC40MzQuNzc5IDQuOTQ3IDMuODA3IDUuNTc0LTMuMDI4LjYzMy0zLjM3OCAxLjE0LTMuODA3IDUuNTc0LS40MjktNC40MzQtLjc3OS00Ljk0MS0zLjgwNi01LjU3NHptLTYxLjUxNyAxMTMuOTkzYzMuMDI3LS42MzMgMy4zNzgtMS4xNCAzLjgwNy01LjU3NC40MjggNC40MzQuNzc5IDQuOTQxIDMuODA2IDUuNTc0LTMuMDI3LjYyNy0zLjM3OCAxLjEzOS0zLjgwNiA1LjU3OS0uNDM0LTQuNDQtLjc4LTQuOTUyLTMuODA3LTUuNTc5em0tMTY1LjQtNjguMjgzYzEuMzI4LS4xODggMS40NzktLjM0IDEuNjY4LTEuNjY4LjE4OCAxLjMyMy4zMzkgMS40NzUgMS42NjggMS42NjgtMS4zMjkuMTg4LTEuNDguMzQtMS42NjggMS42NjgtLjE4OS0xLjMyOC0uMzQtMS40OC0xLjY2OC0xLjY2OHpNMjM5LjIxNSA4My43NmMxLjMyOC0uMTg5IDEuNDgtLjM0IDEuNjY4LTEuNjY4LjE4OCAxLjMyOC4zNCAxLjQ3NCAxLjY2OCAxLjY2OC0xLjMyMy4xODgtMS40OC4zNC0xLjY2OCAxLjY2Ny0uMTk0LTEuMzI4LS4zNDUtMS40OC0xLjY2OC0xLjY2OHptMTAuNjYyLTUuMzA4YzEuMzI4LS4xODggMS40OC0uMzQgMS42NjgtMS42NjguMTg4IDEuMzIzLjM0IDEuNDc1IDEuNjY4IDEuNjY4LTEuMzIzLjE4OS0xLjQ4LjM0LTEuNjY4IDEuNjY4LS4xODgtMS4zMjgtLjM0NS0xLjQ4LTEuNjY4LTEuNjY4em0tMS42NjggOC45NDdjMS4zMjgtLjE4OSAxLjQ4LS4zNCAxLjY2OC0xLjY2OC4xODggMS4zMjguMzQgMS40OCAxLjY2OCAxLjY2OC0xLjMyOC4xODgtMS40OC4zNC0xLjY2OCAxLjY2OC0uMTg4LTEuMzI4LS4zNDUtMS40OC0xLjY2OC0xLjY2OHptNTUuNTI0IDE3Ni42OWMxLjMyOS0uMTg4IDEuNDgtLjM0IDEuNjY4LTEuNjY4LjE4OSAxLjMyOC4zNCAxLjQ4IDEuNjY4IDEuNjY4LTEuMzI4LjE4OC0xLjQ3OS4zNC0xLjY2OCAxLjY2OC0uMTkzLTEuMzI4LS4zNDUtMS40OC0xLjY2OC0xLjY2OHptLTM2LjM4NyAxNy42MWMxLjMyMy0uMTg4IDEuNDc5LS4zNCAxLjY2OC0xLjY2OC4xODggMS4zMjguMzQgMS40OCAxLjY2OCAxLjY2OC0xLjMyMy4xODgtMS40OC4zNC0xLjY2OCAxLjY2OC0uMTk0LTEuMzI4LS4zNDUtMS40OC0xLjY2OC0xLjY2OHptLTI1LjQ5MSAxMy45NzFjMS4zMjktLjE4OCAxLjQ4LS4zMzkgMS42NjgtMS42NjguMTg5IDEuMzI5LjM0IDEuNDggMS42NjggMS42NjgtMS4zMjguMTg5LTEuNDc5LjM0LTEuNjY4IDEuNjY4LS4xODgtMS4zMjgtLjMzOS0xLjQ3OS0xLjY2OC0xLjY2OHptMTc2Ljg1My01My4yN2MxLjMyOC0uMTg4IDEuNDgtLjM0IDEuNjY4LTEuNjY4LjE4OCAxLjMyMy4zNCAxLjQ4IDEuNjY4IDEuNjY4LTEuMzI4LjE4OC0xLjQ4LjM0LTEuNjY4IDEuNjY4LS4xODgtMS4zMjgtLjM0LTEuNDgtMS42NjgtMS42Njh6bS02Ljk5Ni0xNDIuNTQxYzEuMzI4LS4xODggMS40OC0uMzQgMS42NjgtMS42NjguMTg4IDEuMzIzLjM0IDEuNDggMS42NjMgMS42NjgtMS4zMjguMTg4LTEuNDguMzQtMS42NjMgMS42NjgtLjE4OC0xLjMyOC0uMzQtMS40OC0xLjY2OC0xLjY2OHptLTI3LjYyMyAyMDcuNTM5YzEuMzI4LS4xODggMS40OC0uMzM5IDEuNjY4LTEuNjY4LjE4OCAxLjMyOS4zNCAxLjQ4IDEuNjY4IDEuNjY4LTEuMzI4LjE4OS0xLjQ4LjM0LTEuNjY4IDEuNjYzLS4xODgtMS4zMjMtLjM0LTEuNDc0LTEuNjY4LTEuNjYzem0tNi4xNi0xMjAuNzFjMS4zMjgtLjE4OSAxLjQ3OS0uMzQgMS42NjgtMS42NjguMTg4IDEuMzI4LjM0IDEuNDc5IDEuNjY4IDEuNjY4LTEuMzI4LjE4OC0xLjQ4LjMzOS0xLjY2OCAxLjY2Ny0uMTg5LTEuMzI4LS4zNC0xLjQ3OS0xLjY2OC0xLjY2N3oiLz48cGF0aCBmaWxsPSJ1cmwoI2QpIiBzdHJva2U9IiNmZmYiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIuMTY2IiBkPSJNNDcyLjY2OSAxNTEuODEyYzUuMzQ5LTcuMzU3LTkuMDQ1LTE0Ljk5MS0xMy4zNjQtNy4zNTItNC4xOTkgNy40MjUgOC43MjEgMTMuNzQxIDEzLjM2NCA3LjM1MnoiIG9wYWNpdHk9Ii4zMSIvPjxwYXRoIGZpbGw9InVybCgjZSkiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9Ii4xNjYiIGQ9Ik00ODguNTc1IDE0OS43MzZjMi4zNzktNC4wODktNi44NzEtNi43ODItOC42MTItMi42My0xLjY5NCA0LjAzNyA2LjU1MiA2LjE4IDguNjEyIDIuNjN6IiBvcGFjaXR5PSIuMzEiLz48cGF0aCBmaWxsPSIjMDA0Qzc2IiBkPSJtMzQ5LjY3MyAyNjcuNTI0IDM1LjAzOC0zMi4wODRhLjI0Ny4yNDcgMCAwIDEgLjM0NS4wMTYuMjQ4LjI0OCAwIDAgMSAwIC4zM2wtMzIuMDg0IDM1LjAzN2EyLjMzNyAyLjMzNyAwIDAgMS0zLjI5OS4xNDcgMi4zMzIgMi4zMzIgMCAwIDEgMC0zLjQ0NnptLTEyLjIxNS0xMjMuMzM2IDM1LjAzOC0zMi4wODNhLjI0Ni4yNDYgMCAwIDEgLjM0NS4wMTUuMjQ4LjI0OCAwIDAgMSAwIC4zM2wtMzIuMDg0IDM1LjAzOGEyLjMzOCAyLjMzOCAwIDAgMS0zLjI5OS4xNDYgMi4zMzIgMi4zMzIgMCAwIDEtLjE0Ni0zLjI5OS45NjcuOTY3IDAgMCAxIC4xNDYtLjE0N3ptLTk2Ljc3OSAxNi4xNTIgMjMuNzM5LTIxLjc0MWEuMTY1LjE2NSAwIDAgMSAuMjM1LjAxLjE3LjE3IDAgMCAxIDAgLjIyNWwtMjEuNzQxIDIzLjczOWExLjU4IDEuNTggMCAxIDEtMi4zMzItMi4xMzRsLjA5OS0uMDk5eiIgb3BhY2l0eT0iLjE1Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI5MS4zMzUgMjc5LjAxN2MuNjQzLjIyNS45ODguOTI1Ljc2NCAxLjU3NGExLjIzNCAxLjIzNCAwIDEgMS0yLjMzMi0uODExIDEuMjM0IDEuMjM0IDAgMCAxIDEuNTY4LS43NjN6bTUuNzYyLTkuMTE5Yy40ODIuMTY3LjczOC42OS41NyAxLjE3MWEuOTIuOTIgMCAxIDEtLjU3LTEuMTcxem0tMTMuMjE4IDUuOTc2YTEuMjM3IDEuMjM3IDAgMSAxLS44MSAyLjM0IDEuMjM3IDEuMjM3IDAgMCAxIC44MS0yLjM0em0yOS4wMzYgMTAuOTQ0YS45MDYuOTA2IDAgMCAxIC41NiAxLjE0NS45MDIuOTAyIDAgMSAxLS41Ni0xLjE0NXptLTE2LjQ1NS0yNi40NDJhMS4yMzcgMS4yMzcgMCAxIDEtMS41NzQuNzY0IDEuMjQyIDEuMjQyIDAgMCAxIDEuNTc0LS43NjR6bS05Ljk4NyAyOC45NTJhMS4yMzcgMS4yMzcgMCAwIDEtLjgxMSAyLjMzNyAxLjI0IDEuMjQgMCAwIDEtLjc2OC0xLjU3NGMuMjMtLjY0My45MzEtLjk4MyAxLjU3OS0uNzYzem0tOS4yMDggNy42ODFhLjcwNy43MDcgMCAxIDEtLjQ2IDEuMzQyLjcwNy43MDcgMCAwIDEgLjQ2LTEuMzQyeiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im0yOTAuOTc1IDI4MC4wMTktLjExOC4zNDEgMjEuNjkxIDcuNDc1LjExOC0uMzQxLTIxLjY5MS03LjQ3NXoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJtMjkwLjc3NCAyODAuMTA0LTQuODY2IDEwLjMxNC4zMjYuMTU0IDQuODY3LTEwLjMxNC0uMzI3LS4xNTR6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTI3Ni45MiAyOTcuNTQzIDkuMDM1LTcuMTg1LjIyNS4yODMtOS4wMzUgNy4xNzktLjIyNS0uMjc3em02LjQ4My0yMC4zMzUuMTQyLS4zMzUgNy40NjEgMy4xNDgtLjE0MS4zMzQtNy40NjItMy4xNDd6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTI5Ni42NjcgMjcwLjY2OC01Ljg2NCA5LjQyLjMwNi4xOTEgNS44NjQtOS40Mi0uMzA2LS4xOTF6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTI5NS44NzQgMjYxLjU1OC4zNjEtLjAyNi43NDIgOS4yMTktLjM1NS4wMzEtLjc0OC05LjIyNHptLTg2Ljg0MS05Mi4xNzktMjEuMzIuNzQ4LjAxMS4zMDkgMjEuMzItLjc0OS0uMDExLS4zMDh6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTIxNi4yMyAxNzQuMzUzLS4xNzguMjUxLTcuMTA2LTQuOTQ2LjE4My0uMjU3IDcuMTAxIDQuOTUyeiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Im0yMzEuODEgMTYwLjU4NC0xNS43NjEgMTMuNzc0LjIwMy4yMzMgMTUuNzYxLTEzLjc3NS0uMjAzLS4yMzJ6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTIzNi4wMzYgMTY2LjQ0Ny0uMjUxLjE3OC00LjAxNS01LjgzLjI1Ni0uMTc4IDQuMDEgNS44M3oiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJtMjM2LjA2MyAxNjYuNTE3LS4zMDUuMDQ3IDUuODg4IDM4LjAwNC4zMDUtLjA0OC01Ljg4OC0zOC4wMDN6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTI1MC43NTUgMjAxLjE2MS04Ljg3OCAzLjUyNC0uMTE1LS4yODggOC44NzgtMy41MjQuMTE1LjI4OHoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJtMjUwLjg1NSAyMDEuMDI1LS4zMTQtLjAxNi4yODgtNy42Ni4zMTMuMDExLS4yODcgNy42NjV6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTI1MS4wNTggMTkzLjQ5LTEwLjA2IDUuNDMzLS4xNDYtLjI3MiAxMC4wNi01LjQzMy4xNDYuMjcyeiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yNTAuNjAzIDE5NC4xMThhLjg1My44NTMgMCAxIDEgLjc2NC0xLjUyNy44NTMuODUzIDAgMSAxLS43NjQgMS41Mjd6bS05LjE3IDExLjE4NGEuODUuODUgMCAwIDEtLjM3Ny0xLjE0NS44NTYuODU2IDAgMCAxIDEuMTQ1LS4zODIuODUyLjg1MiAwIDAgMSAuMzgyIDEuMTQ1Ljg2Ljg2IDAgMCAxLTEuMTUuMzgyem0tOS45MTUtNDMuODMzYS44NTIuODUyIDAgMCAxLS4zODEtMS4xNDUuODUxLjg1MSAwIDEgMSAxLjUyMS43NjQuODUyLjg1MiAwIDAgMS0xLjE0LjM4MXptLTE1Ljc2NCAxMy43NzNhLjg1Ny44NTcgMCAwIDEtLjM4Mi0xLjE0NS44NTIuODUyIDAgMCAxIDEuMTQ1LS4zODIuODU2Ljg1NiAwIDAgMSAuMzgyIDEuMTQ1Ljg1Mi44NTIgMCAwIDEtMS4xNDUuMzgyem0zNC42NjcgMjYuMzI2YS42Mi42MiAwIDEgMSAuNTUzLTEuMTA3LjYyLjYyIDAgMCAxLS41NTMgMS4xMDd6bS05Ljc3OS0yLjIyN2EuNjIuNjIgMCAxIDEgLjgzMi0uMjc3LjYxOC42MTggMCAwIDEtLjgzMi4yNzd6bS01LjIxNy0zMi4zNTZhLjYyLjYyIDAgMSAxIC44MzEtLjI3Ny42MTcuNjE3IDAgMCAxLS44MzEuMjc3em0tMjYuNjY3IDMuMDk2YS42Mi42MiAwIDEgMSAuODMxLS4yNzcuNjEzLjYxMyAwIDAgMS0uODMxLjI3N3ptMTMyLjA2OC02Ny4zNTdhMS4yNzkgMS4yNzkgMCAxIDEgMS4zNTktMS4xOTcgMS4yOCAxLjI4IDAgMCAxLTEuMzU5IDEuMTk3em0tOS41MjItMzIuMTFhMS4yNzcgMS4yNzcgMCAwIDEtMS4xOTItMS4zNiAxLjI3NyAxLjI3NyAwIDAgMSAxLjM2LTEuMTkxIDEuMjc1IDEuMjc1IDAgMCAxIDEuMTkyIDEuMzU0IDEuMjc1IDEuMjc1IDAgMCAxLTEuMzYgMS4xOTd6bTguNzU5IDQzLjYxOWEuOTQ4Ljk0OCAwIDAgMS0uODg0LTEuMDE1Ljk1Ni45NTYgMCAwIDEgMS4wMDktLjg4OS45NTQuOTU0IDAgMCAxLS4xMjUgMS45MDR6bTUxLjUxNC0yMy45ODVhMS4yNzMgMS4yNzMgMCAwIDEtMS4xODctMS4zNiAxLjI3NiAxLjI3NiAwIDAgMSAxLjM1OS0xLjE5MSAxLjI3NSAxLjI3NSAwIDAgMSAxLjE5MiAxLjM1NCAxLjI4MiAxLjI4MiAwIDAgMS0xLjM2NCAxLjE5N3ptLTU4LjUzMiAyOS43NzNhMS4yNzcgMS4yNzcgMCAwIDEtMS4xODctMS4zNiAxLjI3NyAxLjI3NyAwIDAgMSAxLjM2LTEuMTkyIDEuMjc1IDEuMjc1IDAgMCAxIDEuMTkyIDEuMzU0IDEuMjg1IDEuMjg1IDAgMCAxLTEuMzY1IDEuMTk4eiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0yNzcuMzY0IDc0LjQzNmMtLjAzMS4wNTMtLjA4My4wNzktLjEyLjEybDU1Ljc3NSA0NC4zMzUuMjMtLjI5Mi01NS43ODUtNDQuMzQ2Yy0uMDMyLjA2My0uMDU4LjEyNi0uMS4xODN6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTMzOS45OTggMTEzLjE0OC02Ljk5MiA1LjQ2My4yMjguMjkyIDYuOTkyLTUuNDYyLS4yMjgtLjI5M3oiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJtMzQxLjA5MiAxMDEuNDU5LS43ODQgMTEuODM4LS4zNzEtLjAyMS43ODQtMTEuODM4LjM3MS4wMjF6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTM0MS4wODcgMTAxLjM5Ni0uMzU1LjEwNS05LjUyMi0zMi4xMDUuMzYxLS4xMSA5LjUxNiAzMi4xMXptMTUuODktNTMuODkyLS4yODQuMjRMMzkxLjQ5OSA4OS4xbC4yODQtLjI0LTM0LjgwNi00MS4zNTd6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0ibTM4OS41NjMgMTQyLjI1NC0uMzcyLS4wMTYgMi4yODUtNTMuMjcuMzcyLjAxNS0yLjI4NSA1My4yNzF6Ii8+PHBhdGggZmlsbD0iIzY4Q0JFMyIgZD0iTTI5OS4wMzcgMTcyLjcwMWMxMy40OS02LjQ1MyAyOS43MS0uNzI3IDM2LjE2MiAxMi43NTggNi40NTIgMTMuNDkuNzI3IDI5LjcxLTEyLjc1OCAzNi4xNjJhMjYuOTAyIDI2LjkwMiAwIDAgMS0xMS42NiAyLjY1MWMtMTAuMTIzIDAtMTkuODU0LTUuNjg5LTI0LjUwMi0xNS40MTQtNi40NTMtMTMuNDgtLjcyNy0yOS43MDUgMTIuNzU4LTM2LjE1N3oiLz48cGF0aCBmaWxsPSIjMDA0Qzc2IiBkPSJNMjYxLjk4NiAyMjIuMzQzYy45MzYgMS45NiAzLjUwMyAyLjgxMyA3LjI0MiAyLjgxMyA2LjEwNyAwIDE1LjM1Mi0yLjMxNyAyNS42MjYtNi4wMjkgNy4xNzQtMi41NTIgMTQuODU1LTUuNzk0IDIyLjM0My05LjM4MSA3LjIxLTMuNDQ1IDE0LjI5LTcuMjI2IDIwLjYwNi0xMS4wNTggMTUuNDA0LTkuMjk3IDI2LjM1OC0xOC43OTggMjMuODQ4LTI0LjAyNy0yLjk4LTYuMjIyLTIxLjA0NS0uOTc3LTMyLjEzNSAyLjkzOWEyMi4xNTkgMjIuMTU5IDAgMCAxIDIuMDU0IDIuMTkxYzE4LjUxLTYuNCAyNi42NDYtNS45MTkgMjcuNTk4LTMuOTQzIDEuMDg3IDIuMjkxLTUuNTQzIDkuODc4LTIxLjM2NSAxOS42NC01Ljk0NSAzLjY3LTEzLjE4NyA3LjY1NS0yMS43OTMgMTEuNzgtOC45NjIgNC4yNzctMTYuODY4IDcuNTAzLTIzLjYyNCA5Ljg2MS0xNy4wNDYgNS45MDQtMjYuODM5IDYuMjY1LTI3LjkxNiA0LjAxNi0uOTI2LTEuOTE5IDMuNjM5LTguNDEzIDE5LjcyMy0xOC41NjJhMjAuMDQ4IDIwLjA0OCAwIDAgMS0uNDI5LTIuOTkxYy05LjcyNiA2LjA1LTI0LjcwNiAxNi42MzgtMjEuNzc4IDIyLjc1MXoiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGw9InVybCgjZikiIGQ9Ik0zMDAuMDUyIDM0NC4zNTVjOTMuMTkxIDAgMTY4LjczNy0yLjEyNyAxNjguNzM3LTQuNzUycy03NS41NDYtNC43NTMtMTY4LjczNy00Ljc1M2MtOTMuMTkxIDAtMTY4LjczOCAyLjEyOC0xNjguNzM4IDQuNzUzczc1LjU0NyA0Ljc1MiAxNjguNzM4IDQuNzUyeiIgb3BhY2l0eT0iLjMxIi8+PHBhdGggZmlsbD0idXJsKCNnKSIgZD0iTTMxMS4yNDEgMzQzLjA4NWMyOC43MTkgMCA1Mi0xLjU1OSA1Mi0zLjQ4MyAwLTEuOTIzLTIzLjI4MS0zLjQ4Mi01Mi0zLjQ4MnMtNTIgMS41NTktNTIgMy40ODJjMCAxLjkyNCAyMy4yODEgMy40ODMgNTIgMy40ODN6IiBvcGFjaXR5PSIuMzEiLz48cGF0aCBmaWxsPSIjNjdDQkU0IiBkPSJtMTg5LjA3NCAyNzkuOTU2LS41NjYtOC4xNTgtMzUuNDM5IDIuNDU5LjU2NiA4LjE1OCAzNS40MzktMi40NTl6Ii8+PHBhdGggZmlsbD0iIzQ1ODVDNSIgZD0ibTMwMy43NTkgMjU4LjczNS0yLjQ2OCA4MS4yMDJoMjYuMjhsLTIuNDQyLTgwLjE5My0yMS4zNy0xLjAwOXoiLz48cGF0aCBmaWxsPSIjNDU4NUM1IiBkPSJtMzI2LjkwMiAzMTcuNzU3LTEuNzczLTU4LjAxMy0yMS4zNjktMS4wMDktMS43NjggNTkuODQzYzguMzc3IDEuMTk3IDE2LjQ5NyAxLjI1IDI0LjkxLS44MjF6Ii8+PHBhdGggZmlsbD0iIzY3Q0JFNCIgZD0ibTI2Mi4zOTMgMjgwLjIyMi0xLjM1My0xOS41MDktODQuNzUzIDUuODc5IDEuMzUzIDE5LjUwOSA4NC43NTMtNS44Nzl6Ii8+PHBhdGggZmlsbD0iIzY3Q0JFNCIgZD0ibTM4NC42NTEgMjgyLjQzOC0yLjc5My00MC4yNTktMTc0Ljg5OSAxMi4xMzIgMi43OTMgNDAuMjU5IDE3NC44OTktMTIuMTMyeiIvPjxwYXRoIGZpbGw9IiMwMDRDNzYiIGQ9Im0zODEuODU2IDI0Mi4xNDQtLjQ1NS4wMzEgMi40MDUgMzQuNjgzLTUwLjM3NCAzLjUxM2MtOC40NjUgOS4wNTEtMjIuMjQzIDExLjcwOC0zMy43MiA1LjYyN2EyOC40NCAyOC40NCAwIDAgMS00LjUwMi0yLjk2NWwtODUuODQ2IDUuOTg3LjM4NyA1LjU3OSA4Ni4zMDEtNi4wMThhMjguMzY1IDI4LjM2NSAwIDAgMCA0LjUwMiAyLjk2NGMxMS40NzcgNi4wODEgMjUuMjU1IDMuNDIgMzMuNzItNS42MjZsNTAuMzc0LTMuNTE0LTIuNzkyLTQwLjI2MXoiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGw9IiM2N0NCRTQiIGQ9Im00MjIuOTQgMjg0LjM2OS0zLjM1Ni00OC4xNzctNDEuNzc3IDIuOTExIDMuMzU3IDQ4LjE3NyA0MS43NzYtMi45MTF6Ii8+PHBhdGggZmlsbD0iIzAwNEM3NiIgZD0ibTIwNy42NzEgMjY0LjQyMy01Ljc2OC40MDMgMS4zMjMgMTkuNTE0IDUuNzk5LS40MDgtMS4zNTQtMTkuNTA5em0xNzAuNTc3LTIyLjI2NC01Ljc2OC40MDMgMi41MjYgNDAuNTI4IDUuODQtLjQwOC0yLjU5OC00MC41MjN6TTE3Ni43MiAyNzIuNjE3bC0zLjA3Ny4yMTUuNTY5IDguMTU4IDMuMDc3LS4yMTUtLjU2OS04LjE1OHoiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGw9IiM2N0NCRTQiIGQ9Im00NDguNjIzIDI4Ni4wMTYtMy44NDItNTUuMTQxLTI2Ljg2MyAxLjg3MiAzLjg0MSA1NS4xNDEgMjYuODY0LTEuODcyeiIvPjxwYXRoIGZpbGw9IiMwMDRDNzYiIGQ9Im00MTguMTc1IDIzNi4xODMtNy41NjEuNjIyIDIuNTM2IDQ4LjIzIDguMzg3LS41OC0zLjM2Mi00OC4yNzJ6IiBvcGFjaXR5PSIuMTUiLz48cGF0aCBmaWxsPSIjRkJDM0E1IiBkPSJNMTU4LjcxMyAyNzkuMDc0Yy0uMDYyLjA5NC0uMzI0LjY1OS0uNDc2Ljk4My0uMDE1LS4wMDUtLjAyNi0uMDEtLjA0MS0uMDEuMDk0LS4yNDYuMjQ1LS42NTkuMjYxLS43MjIuMDI2LS4wODktLjA3My0uMTUxLS4xMjUtLjA4OWE0OC40MyA0OC40MyAwIDAgMC0uNTk3IDEuMDQ2Yy0uMTkzLjMwOS0uMzg2LjcyMi0uNDA3Ljc2NC0uMDM3LjA2OC0uMTc4LS4yMjUtLjE3OC0uMjI1cy4xODMtLjE3OC4wOTktLjUzNGMtLjA4My0uMzU1LS4yMjUtLjI2Ni0uMjI1LS4yNjZzLS4wMjYuMDUyLS4wNTcuMjYxYy0uMDMyLjIwOS0uNDI5Ljk0Ny0uNDI5Ljk0Ny4yNzcuNDM0LjA0MiAxLjU4OS4wNDIgMS41ODlzLjcxMS40MzQuODc4LjA4OWMuMTY4LS4zNDUuNTAyLS43NTguNzQ4LS45OTkuMTQxLS4xNDEuMzQtLjU3NS40ODYtLjkxNS4wMDYtLjAxLjAxNi0uMDE1LjAxNi0uMDIxYTI1LjE3IDI1LjE3IDAgMCAwIC40MzQtMS4xMTNjLjAyNi0uMDg5LS4wNzMtLjE1Mi0uMTI1LS4wODktLjAzNy4wNTctLjE2My4zMjktLjI5OS42MjdhLjYzMi42MzIgMCAwIDEtLjA2Mi0uMDU3Yy4xMi0uMzA5LjMyNC0uODM3LjM0NS0uOS4wMjYtLjA4OS0uMDczLS4xNTEtLjEyNi0uMDg5LS4wNTIuMDc5LS4yNC41MDItLjM5Mi44NDgtLjAxNi0uMDExLS4wMzYtLjAyNy0uMDUyLS4wMzcuMDU3LS4xMTUuMzgyLS45MS40MDgtLjk5NC4wMjEtLjA5NC0uMDczLS4xNTYtLjEyNi0uMDk0eiIvPjxwYXRoIGZpbGw9IiMwMDRDNzYiIGQ9Ik0xMzYuNTQ5IDI5My45MjRzNS4zMDIgMTMuMjg2IDExLjQ5OCAxMS4yNzMgOS44NTEtMjIuNzAzIDkuODUxLTIyLjcwM2wtMS40MTctLjA2OHMtOC4wNjMgMTMuMTc2LTkuNDA3IDE0LjYzYy0xLjM0MyAxLjQ1NC00LjI1Ni05LjI5Ny00LjI1Ni05LjI5N2wtNi4yNjkgNi4xNjV6Ii8+PHBhdGggZmlsbD0iIzY3Q0JFNCIgZD0iTTE0NS40OTUgMzE5LjQzczEwLjM1My0xLjEzNSAxNC42ODItMy43N2wtNS4zMDEgMjEuNTA2aDMuMDQ4czExLjI2OC0xOS42ODYgMTMuMjEzLTI2LjMzN2MxLjk0NS02LjY1MS0yNS42NDItMi43NzctMjUuNjQyLTIuNzc3djExLjM3OHoiLz48cGF0aCBmaWxsPSIjNjdDQkU0IiBkPSJNMTQ5LjQyOCAzMDcuMzgzczEyLjY3NC00LjUzOSAxNS45MzctNS42NjhjMy4yNjMtMS4xMjkgMTcuMDA0IDI2LjAzOSAxNy4wMDQgMjYuMDM5bC0yLjk0OSAxLjg4Mi0xNy45NDUtMTQuMjQzLTE1LjMxIDEuOTg3IDMuMjYzLTkuOTk3eiIvPjxwYXRoIGZpbGw9IiM0NTg1QzUiIGQ9Ik0xNDIuNzM1IDI4My40NTZzLTguNDUgMy43NjUtMTAuODc2IDE1LjA1OWMtMi40MjYgMTEuMjk0IDcuNjk3IDIxLjU4NCAxMy42MzYgMjAuOTE1bDMuOTMyLTEyLjA0Ny02LjY5Mi0yMy45Mjd6Ii8+PHBhdGggZmlsbD0iIzQ1ODVDNSIgZD0ibTE0Mi43MzQgMjgzLjQ1NiA2LjA2Ni4zNzcgNS41MjEgMjEuODAzLTExLjU4NyA2LjU1N3YtMjguNzM3eiIvPjxwYXRoIGZpbGw9IiNFOUY1RjYiIGQ9Ik0xNDUuMDI0IDI4Ni45NTRzNC4zNTEgMTcuMDYyIDQuMTEgMjEuNjE2bDEuMjg2LS43MjdzLS41NTQtMTIuOTEtMi42MDktMjEuMjc2bC0yLjc4Ny4zODd6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjMzU0NDRDIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS13aWR0aD0iLjUxNiIgZD0iTTE1MC4xNyAyNzcuMDE5Yy0uNDEzLTEuMzM4LTUuODE5LjYyOC02LjkxMiAyLjE2NSAwIDAgLjUxMiAxLjY3OS42NDggMS45NzEuMDUzLjExLTEuMTY2IDIuODQ1LTEuMTY2IDIuODQ1IDEuMzc1LjczMiAzLjQ2MiA1LjIyOSA1LjA3MiAyLjU2Ny4yMy0uMzgyLjMzNS0xLjIwMy4zODctMS44NTYuMDA1LS4wNTIuNDEzLS4xMzYuNTkxLS4xNzMuNzU4LS4xNDEgMS4yNzYtLjgxNSAxLjQ1NC0yLjU4My4xNzItMS43NTcuNTU0LTIuODkxLS4wNzQtNC45MzZ6Ii8+PHBhdGggZmlsbD0iI0ZBQjAxRCIgZD0iTTE1Mi4xMzEgMjcyLjYyMmMtLjc5NS0uNjY0LTMuNDIuNzU4LTcuNDQxIDEuNTExLTUuMDE5Ljk0MS0xLjI1NSA4LjI1Ni0xLjI1NSA4LjI1NmwuMzI1LS4xMTVjLjE5OC0uNDY1LjY1OC0xLjQ2NC42NTgtMS40NjRhMS4xMjQgMS4xMjQgMCAwIDEtLjIxOS0uMzVsLjE2Mi0uNjk1cy4wMS0uMzgyLjU5MS0uNDkyYy40MDIuMTMxLjY2NC42MjIuODIxIDEuMDcyLjI0LS4yNDEuMzc2LS41MDIuNDYtLjczNy0uMTEtLjY3NS0uMjE1LTEuMjYtLjI0MS0xLjM5MWEuMzc2LjM3NiAwIDAgMCAuMDE2LS4wNDJzNC4yODcuODUyIDUuMzk2LS40MDhjMS4xMDMtMS4yNjUgMS4xNzEtNC41OTEuNzI3LTUuMTQ1eiIvPjxwYXRoIGZpbGw9IiM2N0NCRTQiIGQ9Ik0xNDguNDQ0IDMyMC43MTZoLTkuMTZhLjYzLjYzIDAgMCAxLS42MjgtLjYyNy42My42MyAwIDAgMSAuNjI4LS42MjhoOS4xNmEuNjMuNjMgMCAwIDEgLjYyOC42MjguNjI5LjYyOSAwIDAgMS0uNjI4LjYyN3oiLz48cGF0aCBmaWxsPSIjNjdDQkU0IiBkPSJNMTQxLjIyOCAzMjAuMzA4aC0xLjQ0M3YxOC4wNzFoMS40NDN2LTE4LjA3MXptNi45MzQgMGgtMS40NDN2MTguMDcxaDEuNDQzdi0xOC4wNzF6Ii8+PHBhdGggZmlsbD0iIzAwNEM3NiIgZD0iTTE1NC45NDkgMzM3LjQ3NHMtLjE5NCAxLjI0NS4xMTUgMS44MDRjMCAwIC44NzMtLjAzNiAxLjA3MS0uMDMxbC4yMi0uNTI4cy4zNDUtLjA1Mi42NjQuMDFjLjMxOS4wNjggMy4wOS43NzkgNC4xLjEyNiAwIDAgLjE0MS0uMTQxLS4wMjctLjIzNi0uMzA4LS4xNzctNi4xNDMtMS4xNDUtNi4xNDMtMS4xNDV6bTI0LjgxLTcuNTAzcy0uMTkzIDEuMjQ1LjExNSAxLjgwNGMwIDAgLjg3My0uMDM3IDEuMDcyLS4wMzFsLjIyLS41MjhzLjM0NS0uMDUzLjY2NC4wMWMuMzE5LjA2OCAzLjA5Ljc3OSA0LjA5OS4xMjUgMCAwIC4xNDEtLjE0MS0uMDI2LS4yMzUtLjMxNC0uMTgzLTYuMTQ0LTEuMTQ1LTYuMTQ0LTEuMTQ1eiIvPjxwYXRoIGZpbGw9IiNGQkMzQTUiIGQ9Ik0xNTcuNjI2IDI3OC4xMThjLS4wNzkuMTItLjQwOC44Mi0uNTkxIDEuMjIzYS44NjguODY4IDAgMCAxLS4wNDctLjAxNmMuMTItLjMwOC4zMDMtLjgyNi4zMjktLjkwNC4wMzItLjExLS4wODktLjE5NC0uMTU3LS4xMS0uMTA5LjE2Ny0uNzQ3IDEuMzA3LS43NDcgMS4zMDctLjI0MS4zODItLjQ4MS45LS41MTMuOTUyLS4wNDcuMDgzLS4yMTktLjI4My0uMjE5LS4yODNzLjIyNS0uMjE5LjEyLS42NjRjLS4xMDUtLjQ0NC0uMjgyLS4zMzQtLjI4Mi0uMzM0cy0uMDM3LjA2My0uMDc0LjMyNGMtLjAzNi4yNjEtLjUzMyAxLjE4Mi0uNTMzIDEuMTgyLjM0NS41NDMuMDUyIDEuOTg3LjA1MiAxLjk4N3MuODg0LjU0MyAxLjA5My4xMTVjLjIwOS0uNDI5LjYzMy0uOTQ3LjkzNi0xLjI1LjE3OC0uMTczLjQyOS0uNzE2LjYwNy0xLjE0NS4wMS0uMDExLjAxNS0uMDIxLjAyMS0uMDMyLjA1Mi0uMDk0LjUwNy0xLjI4MS41MzgtMS4zOS4wMzItLjExLS4wODktLjE5NC0uMTU3LS4xMS0uMDQ3LjA2OC0uMjA0LjQxMy0uMzcxLjc4NC0uMDI2LS4wMjEtLjA1Mi0uMDQ3LS4wNzgtLjA3My4xNTEtLjM4Mi40MDItMS4wNDYuNDI4LTEuMTI0LjAzMi0uMTEtLjA4OC0uMTk0LS4xNTYtLjExLS4wNjMuMDk5LS4zMDQuNjI3LS40OTIgMS4wNjEtLjAyMS0uMDE1LS4wNDctLjAzMS0uMDY4LS4wNDcuMDY4LS4xNDEuNDgxLTEuMTQuNTEyLTEuMjQ0LjAzNy0uMDk5LS4wODgtLjE4My0uMTUxLS4wOTl6Ii8+PHBhdGggZmlsbD0iIzQ1ODVDNSIgZD0iTTEzNC43MDkgMjkzLjU4OXM1LjMwMiAxMy4yODcgMTEuNDk4IDExLjI3NGM2LjE5Ni0yLjAxNCAxMC40MTYtMjIuNTYzIDEwLjQxNi0yMi41NjNsLTEuNTY5LS4xNDFzLTguNDc2IDEzLjEwOS05LjgyIDE0LjU2OGMtMS4zNDMgMS40NTMtNC4yNTYtOS4yOTctNC4yNTYtOS4yOTdsLTYuMjY5IDYuMTU5eiIvPjxwYXRoIGZpbGw9IiMwMDRDNzYiIGQ9Ik0zMzEuMzkzIDI3OS44NTljNi4wOTctMTEuNTA5IDMuNDEtMjUuMzIzLTUuNjk5LTMzLjc4M2wtNDEuMDI1IDIuODZhMjguNTYxIDI4LjU2MSAwIDAgMC0zLjAyNyA0LjU3NWMtNi41MzYgMTIuMzQ1LTIuOTcgMjcuMzUyIDcuNzkxIDM1LjU0NWwzNy4xMTMtMi41ODhhMjcuOTEzIDI3LjkxMyAwIDAgMCA0Ljg0Ny02LjYwOXoiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGw9IiM2N0NCRTQiIGQ9Ik0zNDAuNTY2IDI3NS4yNjdjNC43MzUtMTQuODA2LTMuNDI5LTMwLjY0OC0xOC4yMzYtMzUuMzgzLTE0LjgwNi00LjczNS0zMC42NDggMy40My0zNS4zODMgMTguMjM2LTQuNzM1IDE0LjgwNyAzLjQzIDMwLjY0OCAxOC4yMzYgMzUuMzgzIDE0LjgwNyA0LjczNSAzMC42NDgtMy40MyAzNS4zODMtMTguMjM2eiIvPjxwYXRoIGZpbGw9IiMwQzU0NzkiIGQ9Ik0zMjIuMjQgMjcxLjQ3OGMyLjY1My00LjcuOTk0LTEwLjY2MS0zLjcwNi0xMy4zMTQtNC43LTIuNjUzLTEwLjY2MS0uOTk0LTEzLjMxNCAzLjcwNi0yLjY1MyA0LjctLjk5NCAxMC42NjEgMy43MDYgMTMuMzE0IDQuNyAyLjY1MyAxMC42NjEuOTk0IDEzLjMxNC0zLjcwNnoiLz48cGF0aCBzdHJva2U9IiNmZmYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2Utd2lkdGg9IjEuMDAyIiBkPSJtMjUwLjgzNCAyNTUuMTY5IDguMTYyLS42N20zLjcyMy0uMTIgMy43NTQtLjMwOG03Ny40MTctNi44OTcgOC4xNjItLjY2OW0zLjcyMi0uMTI2IDMuNzU1LS4zMDNtMjguMTgzLTQuMjI1IDE1LjA4NS0xLjE3N20tMTAxLjUwNiA0LjUxOHM5LjA3Ny02LjE0NCAyMS4yMDMtMS43NzIiLz48L2c+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJiIiB4MT0iMTU2LjI4OSIgeDI9IjM4NS4yNjUiIHkxPSIyMS4xNTciIHkyPSIxMDcuMDIzIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agc3RvcC1jb2xvcj0iI2ZmZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzUxQzdFQSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJjIiB4MT0iMTgxLjA4NyIgeDI9IjM5My4zOTQiIHkxPSIxMjAuMzIxIiB5Mj0iMTk5LjkzNiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNmZmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1MUM3RUEiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZCIgeDE9IjI0My41MzkiIHgyPSI0NzIuNTE1IiB5MT0iNjQuNDI2IiB5Mj0iMTUwLjI5MiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNmZmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1MUM3RUEiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZSIgeDE9IjI0NS42NSIgeDI9IjQ3NC42MjciIHkxPSI1OC43OTQiIHkyPSIxNDQuNjYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNTFDN0VBIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImYiIHgxPSIxMzEuMzE3IiB4Mj0iNDY4Ljc4NyIgeTE9IjMzOS42IiB5Mj0iMzM5LjYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNTFDN0VBIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIyNTkuMjQiIHgyPSIzNjMuMjQzIiB5MT0iMzM5LjYiIHkyPSIzMzkuNiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIHN0b3AtY29sb3I9IiNmZmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1MUM3RUEiLz48L2xpbmVhckdyYWRpZW50PjxjbGlwUGF0aCBpZD0iYSI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTAgMGg2NDB2NDE0LjExOEgweiIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg==");

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/icon/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/icon/index.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/** @typedef {{icon: JSX.Element, size?: number} & import('@wordpress/primitives').SVGProps} IconProps */

/**
 * Return an SVG icon.
 *
 * @param {IconProps}                                 props icon is the SVG component to render
 *                                                          size is a number specifiying the icon size in pixels
 *                                                          Other props will be passed to wrapped SVG component
 * @param {import('react').ForwardedRef<HTMLElement>} ref   The forwarded ref to the SVG element.
 *
 * @return {JSX.Element}  Icon component
 */
function Icon({
  icon,
  size = 24,
  ...props
}, ref) {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(icon, {
    width: size,
    height: size,
    ...props,
    ref
  });
}
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(Icon));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/button.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/button.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const button = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M8 12.5h8V11H8v1.5Z M19 6.5H5a2 2 0 0 0-2 2V15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a2 2 0 0 0-2-2ZM5 8h14a.5.5 0 0 1 .5.5V15a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V8.5A.5.5 0 0 1 5 8Z"
}));
/* harmony default export */ __webpack_exports__["default"] = (button);
//# sourceMappingURL=button.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/buttons.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/buttons.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const buttons = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M14.5 17.5H9.5V16H14.5V17.5Z M14.5 8H9.5V6.5H14.5V8Z M7 3.5H17C18.1046 3.5 19 4.39543 19 5.5V9C19 10.1046 18.1046 11 17 11H7C5.89543 11 5 10.1046 5 9V5.5C5 4.39543 5.89543 3.5 7 3.5ZM17 5H7C6.72386 5 6.5 5.22386 6.5 5.5V9C6.5 9.27614 6.72386 9.5 7 9.5H17C17.2761 9.5 17.5 9.27614 17.5 9V5.5C17.5 5.22386 17.2761 5 17 5Z M7 13H17C18.1046 13 19 13.8954 19 15V18.5C19 19.6046 18.1046 20.5 17 20.5H7C5.89543 20.5 5 19.6046 5 18.5V15C5 13.8954 5.89543 13 7 13ZM17 14.5H7C6.72386 14.5 6.5 14.7239 6.5 15V18.5C6.5 18.7761 6.72386 19 7 19H17C17.2761 19 17.5 18.7761 17.5 18.5V15C17.5 14.7239 17.2761 14.5 17 14.5Z"
}));
/* harmony default export */ __webpack_exports__["default"] = (buttons);
//# sourceMappingURL=buttons.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/category.js":
/*!************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/category.js ***!
  \************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const category = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M6 5.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5zM4 6a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm11-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5V6a.5.5 0 01.5-.5zM13 6a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2h-3a2 2 0 01-2-2V6zm5 8.5h-3a.5.5 0 00-.5.5v3a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-3a.5.5 0 00-.5-.5zM15 13a2 2 0 00-2 2v3a2 2 0 002 2h3a2 2 0 002-2v-3a2 2 0 00-2-2h-3zm-9 1.5h3a.5.5 0 01.5.5v3a.5.5 0 01-.5.5H6a.5.5 0 01-.5-.5v-3a.5.5 0 01.5-.5zM4 15a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H6a2 2 0 01-2-2v-3z",
  fillRule: "evenodd",
  clipRule: "evenodd"
}));
/* harmony default export */ __webpack_exports__["default"] = (category);
//# sourceMappingURL=category.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/close.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/close.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const close = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M13 11.8l6.1-6.3-1-1-6.1 6.2-6.1-6.2-1 1 6.1 6.3-6.5 6.7 1 1 6.5-6.6 6.5 6.6 1-1z"
}));
/* harmony default export */ __webpack_exports__["default"] = (close);
//# sourceMappingURL=close.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/columns.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/columns.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const columns = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4.1 1.5v10H10v-10h4.9zM5.5 17V8c0-.3.2-.5.5-.5h2.5v10H6c-.3 0-.5-.2-.5-.5zm14 0c0 .3-.2.5-.5.5h-2.6v-10H19c.3 0 .5.2.5.5v9z"
}));
/* harmony default export */ __webpack_exports__["default"] = (columns);
//# sourceMappingURL=columns.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/footer.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/footer.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const footer = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  fillRule: "evenodd",
  d: "M18 5.5h-8v8h8.5V6a.5.5 0 00-.5-.5zm-9.5 8h-3V6a.5.5 0 01.5-.5h2.5v8zM6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"
}));
/* harmony default export */ __webpack_exports__["default"] = (footer);
//# sourceMappingURL=footer.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/gallery.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/gallery.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   gallery: function() { return /* binding */ gallery; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const gallery = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M16.375 4.5H4.625a.125.125 0 0 0-.125.125v8.254l2.859-1.54a.75.75 0 0 1 .68-.016l2.384 1.142 2.89-2.074a.75.75 0 0 1 .874 0l2.313 1.66V4.625a.125.125 0 0 0-.125-.125Zm.125 9.398-2.75-1.975-2.813 2.02a.75.75 0 0 1-.76.067l-2.444-1.17L4.5 14.583v1.792c0 .069.056.125.125.125h11.75a.125.125 0 0 0 .125-.125v-2.477ZM4.625 3C3.728 3 3 3.728 3 4.625v11.75C3 17.273 3.728 18 4.625 18h11.75c.898 0 1.625-.727 1.625-1.625V4.625C18 3.728 17.273 3 16.375 3H4.625ZM20 8v11c0 .69-.31 1-.999 1H6v1.5h13.001c1.52 0 2.499-.982 2.499-2.5V8H20Z",
  fillRule: "evenodd",
  clipRule: "evenodd"
}));
/* harmony default export */ __webpack_exports__["default"] = (gallery);
//# sourceMappingURL=gallery.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/header.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/header.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const header = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M18.5 10.5H10v8h8a.5.5 0 00.5-.5v-7.5zm-10 0h-3V18a.5.5 0 00.5.5h2.5v-8zM6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2z"
}));
/* harmony default export */ __webpack_exports__["default"] = (header);
//# sourceMappingURL=header.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/heading.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/heading.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const heading = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M6 5V18.5911L12 13.8473L18 18.5911V5H6Z"
}));
/* harmony default export */ __webpack_exports__["default"] = (heading);
//# sourceMappingURL=heading.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/help.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/help.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const help = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M12 4.75a7.25 7.25 0 100 14.5 7.25 7.25 0 000-14.5zM3.25 12a8.75 8.75 0 1117.5 0 8.75 8.75 0 01-17.5 0zM12 8.75a1.5 1.5 0 01.167 2.99c-.465.052-.917.44-.917 1.01V14h1.5v-.845A3 3 0 109 10.25h1.5a1.5 1.5 0 011.5-1.5zM11.25 15v1.5h1.5V15h-1.5z"
}));
/* harmony default export */ __webpack_exports__["default"] = (help);
//# sourceMappingURL=help.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/people.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/people.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const people = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M15.5 9.5a1 1 0 100-2 1 1 0 000 2zm0 1.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm-2.25 6v-2a2.75 2.75 0 00-2.75-2.75h-4A2.75 2.75 0 003.75 15v2h1.5v-2c0-.69.56-1.25 1.25-1.25h4c.69 0 1.25.56 1.25 1.25v2h1.5zm7-2v2h-1.5v-2c0-.69-.56-1.25-1.25-1.25H15v-1.5h2.5A2.75 2.75 0 0120.25 15zM9.5 8.5a1 1 0 11-2 0 1 1 0 012 0zm1.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
  fillRule: "evenodd"
}));
/* harmony default export */ __webpack_exports__["default"] = (people);
//# sourceMappingURL=people.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/post-featured-image.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/post-featured-image.js ***!
  \***********************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const postFeaturedImage = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M19 3H5c-.6 0-1 .4-1 1v7c0 .5.4 1 1 1h14c.5 0 1-.4 1-1V4c0-.6-.4-1-1-1zM5.5 10.5v-.4l1.8-1.3 1.3.8c.3.2.7.2.9-.1L11 8.1l2.4 2.4H5.5zm13 0h-2.9l-4-4c-.3-.3-.8-.3-1.1 0L8.9 8l-1.2-.8c-.3-.2-.6-.2-.9 0l-1.3 1V4.5h13v6zM4 20h9v-1.5H4V20zm0-4h16v-1.5H4V16z"
}));
/* harmony default export */ __webpack_exports__["default"] = (postFeaturedImage);
//# sourceMappingURL=post-featured-image.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/post-list.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/post-list.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const postList = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M18 4H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm.5 14c0 .3-.2.5-.5.5H6c-.3 0-.5-.2-.5-.5V6c0-.3.2-.5.5-.5h12c.3 0 .5.2.5.5v12zM7 11h2V9H7v2zm0 4h2v-2H7v2zm3-4h7V9h-7v2zm0 4h7v-2h-7v2z"
}));
/* harmony default export */ __webpack_exports__["default"] = (postList);
//# sourceMappingURL=post-list.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/quote.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/quote.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const quote = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M13 6v6h5.2v4c0 .8-.2 1.4-.5 1.7-.6.6-1.6.6-2.5.5h-.3v1.5h.5c1 0 2.3-.1 3.3-1 .6-.6 1-1.6 1-2.8V6H13zm-9 6h5.2v4c0 .8-.2 1.4-.5 1.7-.6.6-1.6.6-2.5.5h-.3v1.5h.5c1 0 2.3-.1 3.3-1 .6-.6 1-1.6 1-2.8V6H4v6z"
}));
/* harmony default export */ __webpack_exports__["default"] = (quote);
//# sourceMappingURL=quote.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/search.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/search.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const search = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M13 5c-3.3 0-6 2.7-6 6 0 1.4.5 2.7 1.3 3.7l-3.8 3.8 1.1 1.1 3.8-3.8c1 .8 2.3 1.3 3.7 1.3 3.3 0 6-2.7 6-6S16.3 5 13 5zm0 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"
}));
/* harmony default export */ __webpack_exports__["default"] = (search);
//# sourceMappingURL=search.js.map

/***/ }),

/***/ "./src/blocks/block.js":
/*!*****************************!*\
  !*** ./src/blocks/block.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/buttons.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
/* harmony import */ var _helpers_analytics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers/analytics */ "./src/helpers/analytics.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../store */ "./src/store/index.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./block.json */ "./src/blocks/block.json");
/* harmony import */ var _variations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./variations */ "./src/blocks/variations.js");

/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */





(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_7__, {
  icon: {
    foreground: 'var(--nfd-wba-color-brand)',
    src: _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"]
  },
  category: 'nfd-wonder-blocks',
  example: {
    attributes: {
      preview: window.nfdWonderBlocks?.assets + '/images/preview.png'
    }
  },
  variations: [..._variations__WEBPACK_IMPORTED_MODULE_8__.variations],
  edit: function Edit({
    clientId,
    attributes
  }) {
    const {
      removeBlock
    } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)('core/block-editor');
    const {
      setIsModalOpen,
      setActivePatternsCategory,
      setActiveTab
    } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_6__.store);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
      if (attributes.preview) {
        return;
      }
      removeBlock(clientId);
      setActiveTab('patterns');
      setActivePatternsCategory(attributes.category ? attributes.category : _constants__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_PATTERNS_CATEGORY);
      (0,_helpers_analytics__WEBPACK_IMPORTED_MODULE_5__.trackHiiveEvent)('modal_open', {
        label_key: 'trigger',
        trigger: 'block'
      });
      setIsModalOpen(true);
    }, [attributes.category, attributes.preview, clientId, removeBlock, setActivePatternsCategory, setActiveTab, setIsModalOpen]);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      style: {
        display: 'block',
        maxWidth: '100%'
      },
      src: attributes.preview,
      alt: "Wonder Blocks"
    });
  }
});

/***/ }),

/***/ "./src/blocks/inspector-control.js":
/*!*****************************************!*\
  !*** ./src/blocks/inspector-control.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_8__);










// These block types do not support custom attributes.
const skipBlockTypes = ['core/archives', 'core/calendar', 'core/latest-comments', 'core/rss', 'core/tag-cloud'];
function addAttributes(settings, name) {
  if (skipBlockTypes.includes(name)) {
    return settings;
  }
  if (name === 'core/group') {
    settings.attributes = {
      ...settings.attributes,
      nfdGroupDivider: {
        type: 'string'
      },
      nfdGroupTheme: {
        type: 'string'
      },
      nfdGroupEffect: {
        type: 'string'
      }
    };
  }
  return {
    ...settings,
    attributes: {
      ...settings.attributes,
      nfdAnimation: {
        type: 'string'
      },
      nfdAnimationDelay: {
        type: 'string'
      }
    }
  };
}
function addEditProps(settings) {
  const existingGetEditWrapperProps = settings.getEditWrapperProps;
  settings.getEditWrapperProps = attributes => {
    let props = {};
    if (existingGetEditWrapperProps) {
      props = existingGetEditWrapperProps(attributes);
    }
    return addSaveProps(props, settings, attributes);
  };
  return settings;
}
const withInspectorControls = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    var _props$attributes$nfd, _props$attributes$nfd2, _props$attributes$nfd3, _props$attributes$nfd4, _props$attributes$nfd5;
    const {
      name,
      clientId
    } = props;
    const selectedGroupDivider = (_props$attributes$nfd = props?.attributes?.nfdGroupDivider) !== null && _props$attributes$nfd !== void 0 ? _props$attributes$nfd : 'default';
    const selectedGroupTheme = (_props$attributes$nfd2 = props?.attributes?.nfdGroupTheme) !== null && _props$attributes$nfd2 !== void 0 ? _props$attributes$nfd2 : '';
    const selectedGroupEffect = (_props$attributes$nfd3 = props?.attributes?.nfdGroupEffect) !== null && _props$attributes$nfd3 !== void 0 ? _props$attributes$nfd3 : '';
    const selectedAnimation = (_props$attributes$nfd4 = props?.attributes?.nfdAnimation) !== null && _props$attributes$nfd4 !== void 0 ? _props$attributes$nfd4 : '';
    const selectedAnimationDelay = (_props$attributes$nfd5 = props?.attributes?.nfdAnimationDelay) !== null && _props$attributes$nfd5 !== void 0 ? _props$attributes$nfd5 : '';
    const isTopLevel = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
      const {
        getBlockRootClientId
      } = select('core/block-editor');
      return !getBlockRootClientId(clientId);
    }, [clientId]);
    const customDividerStyles = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useMemo)(() => [{
      name: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Default', 'nfd-wonder-blocks'),
      isDefault: true
    }, {
      name: 'nfd-divider-arrow',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Arrow', 'nfd-wonder-blocks')
    }, {
      name: 'nfd-divider-ellipse',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Ellipse', 'nfd-wonder-blocks')
    }, {
      name: 'nfd-divider-rounded',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Rounded', 'nfd-wonder-blocks')
    }, {
      name: 'nfd-divider-slant',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Slant', 'nfd-wonder-blocks')
    }, {
      name: 'nfd-divider-slant-invert',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Slant Invert', 'nfd-wonder-blocks')
    }, {
      name: 'nfd-divider-triangle',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Triangle', 'nfd-wonder-blocks')
    }, {
      name: 'nfd-divider-zigzag',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Zigzag', 'nfd-wonder-blocks')
    }], []);
    const customAnimationStyles = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useMemo)(() => [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('None', 'nfd-wonder-blocks')
    }, {
      value: 'nfd-wb-fade-in-bottom',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Fade In Bottom', 'nfd-wonder-blocks')
    }, {
      value: 'nfd-wb-fade-in-top-short',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Fade In Top Short', 'nfd-wonder-blocks')
    }, {
      value: 'nfd-wb-fade-in-right-short',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Fade In Right Short', 'nfd-wonder-blocks')
    }, {
      value: 'nfd-wb-fade-in-bottom-short',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Fade In Bottom Short', 'nfd-wonder-blocks')
    }, {
      value: 'nfd-wb-fade-in-left-short',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Fade In Left Short', 'nfd-wonder-blocks')
    }, {
      value: 'nfd-wb-twist-in',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Twist In', 'nfd-wonder-blocks')
    }, {
      value: 'nfd-wb-zoom-in',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Zoom In', 'nfd-wonder-blocks')
    }, {
      value: 'nfd-wb-zoom-in-short',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Zoom In Short', 'nfd-wonder-blocks')
    }, {
      value: 'nfd-wb-reveal-right',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Reveal Right', 'nfd-wonder-blocks')
    }], []);
    const customAnimationDelay = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useMemo)(() => [{
      value: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('None', 'nfd-wonder-blocks')
    }, {
      value: 'nfd-delay-50',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('50ms', 'nfd-wonder-blocks')
    }, {
      value: 'nfd-delay-150',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('150ms', 'nfd-wonder-blocks')
    }, {
      value: 'nfd-delay-300',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('300ms', 'nfd-wonder-blocks')
    }, {
      value: 'nfd-delay-450',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('450ms', 'nfd-wonder-blocks')
    }, {
      value: 'nfd-delay-600',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('600ms', 'nfd-wonder-blocks')
    }, {
      value: 'nfd-delay-750',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('750ms', 'nfd-wonder-blocks')
    }, {
      value: 'nfd-delay-900',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('900ms', 'nfd-wonder-blocks')
    }, {
      value: 'nfd-delay-1050',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('1050ms', 'nfd-wonder-blocks')
    }, {
      value: 'nfd-delay-1200',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('1200ms', 'nfd-wonder-blocks')
    }, {
      value: 'nfd-delay-1350',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('1350ms', 'nfd-wonder-blocks')
    }, {
      value: 'nfd-delay-1500',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('1500ms', 'nfd-wonder-blocks')
    }], []);
    const customThemeStyles = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useMemo)(() => [{
      name: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Default', 'nfd-wonder-blocks'),
      isDefault: true
    }, {
      name: 'white',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('White', 'nfd-wonder-blocks')
    }, {
      name: 'light',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Light', 'nfd-wonder-blocks')
    }, {
      name: 'dark',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Dark', 'nfd-wonder-blocks')
    }, {
      name: 'darker',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Darker', 'nfd-wonder-blocks')
    }, {
      name: 'primary',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Primary', 'nfd-wonder-blocks')
    }], []);
    const groupEffectStyles = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useMemo)(() => [{
      name: '',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('None', 'nfd-wonder-blocks'),
      isDefault: true
    }, {
      name: 'dots',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Dots', 'nfd-wonder-blocks')
    }, {
      name: 'grid',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Grid', 'nfd-wonder-blocks')
    }, {
      name: 'grid-2',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Grid 2', 'nfd-wonder-blocks')
    }, {
      name: 'grid-3',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Grid 3', 'nfd-wonder-blocks')
    }, {
      name: 'lines',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Lines', 'nfd-wonder-blocks')
    }, {
      name: 'lines-2',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Lines 2', 'nfd-wonder-blocks')
    }], []);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
      ...props
    }), name === 'core/group' && isTopLevel && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Section Divider', 'nfd-wonder-blocks'),
      initialOpen: false
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-editor-block-styles"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-editor-block-styles__variants"
    }, customDividerStyles.map(style => {
      const buttonText = style.isDefault ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Default', 'nfd-wonder-blocks') : style.label || style.name;
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        className: classnames__WEBPACK_IMPORTED_MODULE_8___default()('block-editor-block-styles__item', {
          'is-active': selectedGroupDivider === style.name
        }),
        key: style.name,
        variant: "secondary",
        label: buttonText,
        onClick: () => props.setAttributes({
          nfdGroupDivider: style.name
        }),
        "aria-current": selectedGroupDivider === style.name
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalTruncate, {
        numberOfLines: 1,
        className: "block-editor-block-styles__item-text"
      }, buttonText));
    }))))), name === 'core/group' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Section Theme Color', 'nfd-wonder-blocks'),
      initialOpen: false
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-editor-block-styles"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-editor-block-styles__variants"
    }, customThemeStyles.map(style => {
      const buttonText = style.isDefault ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Default', 'nfd-wonder-blocks') : style.label || style.name;
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        className: classnames__WEBPACK_IMPORTED_MODULE_8___default()('block-editor-block-styles__item', {
          'is-active': selectedGroupTheme === style.name
        }),
        key: style.name,
        variant: "secondary",
        label: buttonText,
        onClick: () => {
          props.setAttributes({
            nfdGroupTheme: style.name
          });
        },
        "aria-current": selectedGroupTheme === style.name
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalTruncate, {
        numberOfLines: 1,
        className: "block-editor-block-styles__item-text"
      }, buttonText));
    }))))), name === 'core/group' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Section Background Effect', 'nfd-wonder-blocks'),
      initialOpen: false
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-editor-block-styles"
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
      className: "block-editor-block-styles__variants"
    }, groupEffectStyles.map(style => {
      const buttonText = style.label || style.name;
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        className: classnames__WEBPACK_IMPORTED_MODULE_8___default()('block-editor-block-styles__item', {
          'is-active': selectedGroupEffect === style.name
        }),
        key: style.name,
        variant: "secondary",
        label: buttonText,
        onClick: () => {
          props.setAttributes({
            nfdGroupEffect: style.name
          });
        },
        "aria-current": selectedGroupEffect === style.name
      }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.__experimentalTruncate, {
        numberOfLines: 1,
        className: "block-editor-block-styles__item-text"
      }, buttonText));
    }))))), !skipBlockTypes.includes(name) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Entrance Animations', 'nfd-wonder-blocks'),
      initialOpen: false
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Animation', 'nfd-wonder-blocks'),
      options: customAnimationStyles,
      value: selectedAnimation,
      onChange: selectedItem => {
        props.setAttributes({
          nfdAnimation: selectedItem
        });
        document.dispatchEvent(new CustomEvent('wonder-blocks/animation-changed', {
          detail: {
            clientId: props?.clientId
          }
        }));
      }
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Delay', 'nfd-wonder-blocks'),
      options: customAnimationDelay,
      value: selectedAnimationDelay,
      onChange: selectedItem => {
        props.setAttributes({
          nfdAnimationDelay: selectedItem
        });
      }
    }))));
  };
}, 'withInspectorControl');
function addSaveProps(saveElementProps, blockType, attributes) {
  var _saveElementProps$cla, _attributes$className;
  const generatedClasses = (_saveElementProps$cla = saveElementProps?.className) !== null && _saveElementProps$cla !== void 0 ? _saveElementProps$cla : [];
  const classes = [...(attributes?.nfdGroupDivider ? [attributes.nfdGroupDivider] : []), ...(attributes?.nfdAnimation ? ['nfd-wb-animate', attributes.nfdAnimation] : []), ...(attributes?.nfdAnimationDelay && attributes?.nfdAnimation ? [attributes.nfdAnimationDelay] : []), ...(attributes?.nfdGroupTheme ? ['nfd-bg-surface', `nfd-theme-${attributes.nfdGroupTheme}`] : []), ...(attributes?.nfdGroupEffect ? [`nfd-bg-effect-${attributes.nfdGroupEffect}`] : [])];
  const additionalClasses = (_attributes$className = attributes?.className) !== null && _attributes$className !== void 0 ? _attributes$className : [];
  if (!classes) {
    return saveElementProps;
  }
  const normalizeAsArray = item => {
    switch (Object.prototype.toString.call(item)) {
      case '[object String]':
        return item.split(' ');
      case '[object Array]':
        return item;
      default:
        return [];
    }
  };
  const classesCombined = new Set([...normalizeAsArray(additionalClasses), ...normalizeAsArray(generatedClasses), ...normalizeAsArray(classes)]);
  return Object.assign({}, saveElementProps, {
    className: [...classesCombined].join(' ')
  });
}
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__.addFilter)('blocks.registerBlockType', 'nfd-wonder-blocks/utilities/attributes', addAttributes);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__.addFilter)('blocks.registerBlockType', 'nfd-wonder-blocks/utilities/addEditProps', addEditProps);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__.addFilter)('editor.BlockEdit', 'nfd-wonder-blocks/utilities/inspectorControl', withInspectorControls);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_6__.addFilter)('blocks.getSaveContent.extraProps', 'nfd-wonder-blocks/utilities/extraProps', addSaveProps);

/***/ }),

/***/ "./src/blocks/register-category.js":
/*!*****************************************!*\
  !*** ./src/blocks/register-category.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/buttons.js");

/**
 * WordPress dependencies
 */



const currentCategories = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)('core/blocks').getCategories();

/**
 * Register the 'Wonder Blocks' block category.
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.setCategories)([{
  slug: 'nfd-wonder-blocks',
  title: 'Wonder Blocks',
  icon: null
}, ...currentCategories]);

/**
 * Function to register a block collection for our blocks.
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockCollection)('nfd-wonder-blocks', {
  title: 'Wonder Blocks',
  icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"], {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"]
  })
});

/***/ }),

/***/ "./src/blocks/variations.js":
/*!**********************************!*\
  !*** ./src/blocks/variations.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   variations: function() { return /* binding */ variations; }
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/gallery.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/post-list.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/button.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/help.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/category.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/heading.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/post-featured-image.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/columns.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/people.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/quote.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/header.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/footer.js");
/* harmony import */ var _components_Icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Icons */ "./src/components/Icons/index.js");
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */

const variations = [{
  name: 'gallery',
  icon: {
    foreground: 'var(--nfd-wba-color-brand)',
    src: _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  category: 'nfd-wonder-blocks',
  attributes: {
    category: 'gallery'
  },
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Gallery Patterns', 'nfd-wonder-blocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add Gallery patterns.', 'nfd-wonder-blocks'),
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('images', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('photos', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('photography', 'nfd-wonder-blocks')]
}, {
  name: 'blog',
  icon: {
    foreground: 'var(--nfd-wba-color-brand)',
    src: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"]
  },
  category: 'nfd-wonder-blocks',
  attributes: {
    category: 'blog'
  },
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Blog Patterns', 'nfd-wonder-blocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add Blog patterns.', 'nfd-wonder-blocks'),
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('articles', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('posts', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('news', 'nfd-wonder-blocks')]
}, {
  name: 'call-to-action',
  icon: {
    foreground: 'var(--nfd-wba-color-brand)',
    src: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"]
  },
  category: 'nfd-wonder-blocks',
  attributes: {
    category: 'call-to-action'
  },
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Call to Action Patterns', 'nfd-wonder-blocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add Call to Action patterns.', 'nfd-wonder-blocks'),
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('cta', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('conversion', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('button', 'nfd-wonder-blocks')]
}, {
  name: 'faq',
  icon: {
    foreground: 'var(--nfd-wba-color-brand)',
    src: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"]
  },
  category: 'nfd-wonder-blocks',
  attributes: {
    category: 'faq'
  },
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('FAQ Patterns', 'nfd-wonder-blocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add FAQ patterns.', 'nfd-wonder-blocks'),
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('frequently asked questions', 'nfd-wonder-blocks')]
}, {
  name: 'features',
  icon: {
    foreground: 'var(--nfd-wba-color-brand)',
    src: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"]
  },
  category: 'nfd-wonder-blocks',
  attributes: {
    category: 'features'
  },
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Features Patterns', 'nfd-wonder-blocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add Features patterns.', 'nfd-wonder-blocks'),
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('columns', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('about', 'nfd-wonder-blocks')]
}, {
  name: 'headings',
  icon: {
    foreground: 'var(--nfd-wba-color-brand)',
    src: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"]
  },
  category: 'nfd-wonder-blocks',
  attributes: {
    category: 'headings'
  },
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Heading Patterns', 'nfd-wonder-blocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add Heading patterns.', 'nfd-wonder-blocks'),
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('title', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('headline', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('tagline', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('text', 'nfd-wonder-blocks')]
}, {
  name: 'hero',
  icon: {
    foreground: 'var(--nfd-wba-color-brand)',
    src: _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__["default"]
  },
  category: 'nfd-wonder-blocks',
  attributes: {
    category: 'hero'
  },
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Hero Patterns', 'nfd-wonder-blocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add Hero patterns.', 'nfd-wonder-blocks'),
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('banner', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('image slider', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('homepage', 'nfd-wonder-blocks')]
}, {
  name: 'pricing',
  icon: {
    foreground: 'var(--nfd-wba-color-brand)',
    src: _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"]
  },
  category: 'nfd-wonder-blocks',
  attributes: {
    category: 'pricing-table'
  },
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Pricing Table Patterns', 'nfd-wonder-blocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add Pricing Table patterns.', 'nfd-wonder-blocks'),
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('plans', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('comparison', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('packages', 'nfd-wonder-blocks')]
}, {
  name: 'team',
  icon: {
    foreground: 'var(--nfd-wba-color-brand)',
    src: _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__["default"]
  },
  category: 'nfd-wonder-blocks',
  attributes: {
    category: 'team'
  },
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Team Patterns', 'nfd-wonder-blocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add Team patterns.', 'nfd-wonder-blocks'),
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('employees', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('members', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('profiles', 'nfd-wonder-blocks')]
}, {
  name: 'testimonials',
  icon: {
    foreground: 'var(--nfd-wba-color-brand)',
    src: _wordpress_icons__WEBPACK_IMPORTED_MODULE_11__["default"]
  },
  category: 'nfd-wonder-blocks',
  attributes: {
    category: 'testimonials'
  },
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Testimonial Patterns', 'nfd-wonder-blocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add Testimonial patterns.', 'nfd-wonder-blocks'),
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('reviews', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('feedback', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('ratings', 'nfd-wonder-blocks')]
}, {
  name: 'header',
  icon: {
    foreground: 'var(--nfd-wba-color-brand)',
    src: _wordpress_icons__WEBPACK_IMPORTED_MODULE_12__["default"]
  },
  category: 'nfd-wonder-blocks',
  attributes: {
    category: 'header'
  },
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Header Patterns', 'nfd-wonder-blocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add Header patterns.', 'nfd-wonder-blocks')
}, {
  name: 'footer',
  icon: {
    foreground: 'var(--nfd-wba-color-brand)',
    src: _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__["default"]
  },
  category: 'nfd-wonder-blocks',
  attributes: {
    category: 'footer'
  },
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Footer Patterns', 'nfd-wonder-blocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Add Footer patterns.', 'nfd-wonder-blocks')
}, {
  name: 'favorites',
  icon: {
    foreground: 'var(--nfd-wba-color-brand)',
    src: _components_Icons__WEBPACK_IMPORTED_MODULE_1__.heartSmall
  },
  category: 'nfd-wonder-blocks',
  attributes: {
    category: 'favorites'
  },
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('My Favorite Patterns', 'nfd-wonder-blocks'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("A collection of patterns you've selected.", 'nfd-wonder-blocks'),
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('liked', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('saved', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('bookmarked', 'nfd-wonder-blocks'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('starred', 'nfd-wonder-blocks')]
}];

/***/ }),

/***/ "./src/components/Icons/heart.jsx":
/*!****************************************!*\
  !*** ./src/components/Icons/heart.jsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   heartSmall: function() { return /* binding */ heartSmall; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const heart = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 22"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M12 21.99L10.77 20.88C8.65 18.94 6.9 17.265 5.52 15.855C4.14 14.445 3.04 13.185 2.22 12.075C1.4 10.965 0.825 9.96 0.495 9.06C0.165 8.16 0 7.25 0 6.33C0 4.53 0.605 3.025 1.815 1.815C3.025 0.605 4.52 0 6.3 0C7.44 0 8.495 0.27 9.465 0.81C10.435 1.35 11.28 2.13 12 3.15C12.84 2.07 13.73 1.275 14.67 0.765C15.61 0.255 16.62 0 17.7 0C19.48 0 20.975 0.605 22.185 1.815C23.395 3.025 24 4.53 24 6.33C24 7.25 23.835 8.16 23.505 9.06C23.175 9.96 22.6 10.965 21.78 12.075C20.96 13.185 19.86 14.445 18.48 15.855C17.1 17.265 15.35 18.94 13.23 20.88L12 21.99Z"
}));
const heartSmall = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  height: "20",
  className: "nfd-wba-h-5 nfd-wba-w-auto",
  viewBox: "0 0 24 22"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M12 21.99L10.77 20.88C8.65 18.94 6.9 17.265 5.52 15.855C4.14 14.445 3.04 13.185 2.22 12.075C1.4 10.965 0.825 9.96 0.495 9.06C0.165 8.16 0 7.25 0 6.33C0 4.53 0.605 3.025 1.815 1.815C3.025 0.605 4.52 0 6.3 0C7.44 0 8.495 0.27 9.465 0.81C10.435 1.35 11.28 2.13 12 3.15C12.84 2.07 13.73 1.275 14.67 0.765C15.61 0.255 16.62 0 17.7 0C19.48 0 20.975 0.605 22.185 1.815C23.395 3.025 24 4.53 24 6.33C24 7.25 23.835 8.16 23.505 9.06C23.175 9.96 22.6 10.965 21.78 12.075C20.96 13.185 19.86 14.445 18.48 15.855C17.1 17.265 15.35 18.94 13.23 20.88L12 21.99Z"
}));
/* harmony default export */ __webpack_exports__["default"] = (heart);

/***/ }),

/***/ "./src/components/Icons/heartEmpty.jsx":
/*!*********************************************!*\
  !*** ./src/components/Icons/heartEmpty.jsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const heartEmpty = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 22"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M12 21.99L10.77 20.88C8.65 18.94 6.9 17.265 5.52 15.855C4.14 14.445 3.04 13.185 2.22 12.075C1.4 10.965 0.825 9.96 0.495 9.06C0.165 8.16 0 7.25 0 6.33C0 4.53 0.605 3.025 1.815 1.815C3.025 0.605 4.52 0 6.3 0C7.44 0 8.495 0.27 9.465 0.81C10.435 1.35 11.28 2.13 12 3.15C12.84 2.07 13.73 1.275 14.67 0.765C15.61 0.255 16.62 0 17.7 0C19.48 0 20.975 0.605 22.185 1.815C23.395 3.025 24 4.53 24 6.33C24 7.25 23.835 8.16 23.505 9.06C23.175 9.96 22.6 10.965 21.78 12.075C20.96 13.185 19.86 14.445 18.48 15.855C17.1 17.265 15.35 18.94 13.23 20.88L12 21.99ZM12 19.62C14.02 17.76 15.685 16.165 16.995 14.835C18.305 13.505 19.345 12.34 20.115 11.34C20.885 10.34 21.425 9.45 21.735 8.67C22.045 7.89 22.2 7.11 22.2 6.33C22.2 5.01 21.78 3.925 20.94 3.075C20.1 2.225 19.02 1.8 17.7 1.8C16.68 1.8 15.73 2.115 14.85 2.745C13.97 3.375 13.26 4.26 12.72 5.4H11.25C10.73 4.28 10.03 3.4 9.15 2.76C8.27 2.12 7.32 1.8 6.3 1.8C4.98 1.8 3.9 2.225 3.06 3.075C2.22 3.925 1.8 5.01 1.8 6.33C1.8 7.11 1.955 7.895 2.265 8.685C2.575 9.475 3.115 10.375 3.885 11.385C4.655 12.395 5.7 13.56 7.02 14.88C8.34 16.2 10 17.78 12 19.62Z"
}));
/* harmony default export */ __webpack_exports__["default"] = (heartEmpty);

/***/ }),

/***/ "./src/components/Icons/index.js":
/*!***************************************!*\
  !*** ./src/components/Icons/index.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   heart: function() { return /* reexport safe */ _heart__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   heartEmpty: function() { return /* reexport safe */ _heartEmpty__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   heartSmall: function() { return /* reexport safe */ _heart__WEBPACK_IMPORTED_MODULE_0__.heartSmall; },
/* harmony export */   plus: function() { return /* reexport safe */ _plus__WEBPACK_IMPORTED_MODULE_2__["default"]; },
/* harmony export */   trash: function() { return /* reexport safe */ _trash__WEBPACK_IMPORTED_MODULE_3__["default"]; }
/* harmony export */ });
/* harmony import */ var _heart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./heart */ "./src/components/Icons/heart.jsx");
/* harmony import */ var _heartEmpty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./heartEmpty */ "./src/components/Icons/heartEmpty.jsx");
/* harmony import */ var _plus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./plus */ "./src/components/Icons/plus.jsx");
/* harmony import */ var _trash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./trash */ "./src/components/Icons/trash.jsx");





/***/ }),

/***/ "./src/components/Icons/plus.jsx":
/*!***************************************!*\
  !*** ./src/components/Icons/plus.jsx ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const plus = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M10.7143 24V13.2857H0V10.7143H10.7143V0H13.2857V10.7143H24V13.2857H13.2857V24H10.7143Z"
}));
/* harmony default export */ __webpack_exports__["default"] = (plus);

/***/ }),

/***/ "./src/components/Icons/trash.jsx":
/*!****************************************!*\
  !*** ./src/components/Icons/trash.jsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const trash = (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 32 32"
}, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M26.6666 6.66664H19.0666C19.0666 4.93331 17.7332 3.59998 15.9999 3.59998C14.2666 3.59998 12.9332 4.93331 12.9332 6.66664H5.33325V9.33331H7.33325V9.73331L9.59992 24.5333C9.73325 25.8666 10.9333 26.8 12.2666 26.8H19.8666C21.1999 26.8 22.2666 25.8666 22.5332 24.5333L24.7999 9.73331V9.33331H26.6666V6.66664ZM22.3999 9.33331L20.1332 24.1333C20.1332 24.2666 19.9999 24.4 19.7332 24.4H12.1333C11.9999 24.4 11.7333 24.2666 11.7333 24.1333L9.59992 9.33331H22.3999Z"
}));
/* harmony default export */ __webpack_exports__["default"] = (trash);

/***/ }),

/***/ "./src/components/Logo.jsx":
/*!*********************************!*\
  !*** ./src/components/Logo.jsx ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/buttons.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./src/constants.js");

/**
 * WordPress dependencies
 */


/**
 * External dependencies
 */


const Logo = ({
  size = 'regular',
  color = 'dark'
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-m-0 -nfd-wba-ml-1 nfd-wba-flex nfd-wba-items-center nfd-wba-gap-2 nfd-wba-text-lg nfd-wba-font-normal nfd-wba-text-dark"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(color === 'brand' && 'nfd-wba-fill-brand'),
    size: size === 'large' ? 40 : 24,
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"]
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('nfd-wba-select-none', size === 'large' && 'nfd-wba-text-3xl', color === 'brand' && 'nfd-wba-text-brand')
  }, _constants__WEBPACK_IMPORTED_MODULE_2__.BRAND_NAME));
};
/* harmony default export */ __webpack_exports__["default"] = (Logo);

/***/ }),

/***/ "./src/components/Modal/Content/Content.jsx":
/*!**************************************************!*\
  !*** ./src/components/Modal/Content/Content.jsx ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_intersection_observer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-intersection-observer */ "./node_modules/react-intersection-observer/index.mjs");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../helpers */ "./src/helpers/index.js");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../hooks */ "./src/hooks/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../store */ "./src/store/index.js");
/* harmony import */ var _ContentTitle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ContentTitle */ "./src/components/Modal/Content/ContentTitle.jsx");
/* harmony import */ var _DesignList_DesignList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DesignList/DesignList */ "./src/components/Modal/Content/DesignList/DesignList.jsx");
/* harmony import */ var _DesignList_Error__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DesignList/Error */ "./src/components/Modal/Content/DesignList/Error.jsx");
/* harmony import */ var _DesignList_NoResults__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DesignList/NoResults */ "./src/components/Modal/Content/DesignList/NoResults.jsx");
/* harmony import */ var _LoadingSpinner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./LoadingSpinner */ "./src/components/Modal/Content/LoadingSpinner.jsx");
/* harmony import */ var _Skeleton__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Skeleton */ "./src/components/Modal/Content/Skeleton.jsx");
/* harmony import */ var _Spinner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Spinner */ "./src/components/Modal/Content/Spinner.jsx");
/* harmony import */ var _UpdateNotice__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./UpdateNotice */ "./src/components/Modal/Content/UpdateNotice.jsx");

/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */











const Content = () => {
  const [ready, setReady] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [loadMoreRef, inView] = (0,react_intersection_observer__WEBPACK_IMPORTED_MODULE_14__.useInView)({
    threshold: 0
  });
  const {
    activePatternsCategory,
    activeTab,
    activeTemplatesCategory,
    isContentLoading,
    isSidebarLoading,
    keywordsFilter
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => ({
    activePatternsCategory: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getActivePatternsCategory(),
    activeTab: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getActiveTab(),
    activeTemplatesCategory: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getActiveTemplatesCategory(),
    isSidebarLoading: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).isSidebarLoading(),
    isContentLoading: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).isContentLoading(),
    keywordsFilter: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getKeywordsFilter()
  }));

  // Fetch data.
  const {
    data,
    isValidating,
    isFavorites,
    isError,
    size,
    setSize,
    hasMore
  } = (0,_hooks__WEBPACK_IMPORTED_MODULE_4__.usePatterns)();
  const {
    setIsContentLoading
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);

  // Set the global content loading state when the data is loading.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    setIsContentLoading((!data || data.length === 0) && isValidating);
  }, [data, isValidating, setIsContentLoading]);

  // Fetches when the load more is in view
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (hasMore && inView) {
      setSize(size + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasMore]);

  // Delay showing the content to avoid flickering
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    const t = setTimeout(() => {
      setReady(true);
    }, 300);
    return () => {
      clearTimeout(t);
    };
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (!keywordsFilter) {
      return;
    }
    if (hasMore === undefined) {
      return;
    }
    if (hasMore && data?.length === 0) {
      return;
    }
    const eventData = {
      label_key: 'search_term',
      search_term: keywordsFilter,
      count: data?.length
    };
    if (activeTab === 'patterns') {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.trackHiiveEvent)('pattern_searched', eventData);
    } else if (activeTab === 'templates') {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.trackHiiveEvent)('template_searched', eventData);
    }
  }, [activeTab, data?.length, hasMore, keywordsFilter]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-flex nfd-wba-grow nfd-wba-flex-col sm:nfd-wba-overflow-y-auto md:nfd-wba-min-w-[400px]"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-relative nfd-wba-flex nfd-wba-min-h-[50vh] nfd-wba-grow nfd-wba-flex-col nfd-wba-gap-y-10"
  }, isSidebarLoading && !isError && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_LoadingSpinner__WEBPACK_IMPORTED_MODULE_10__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-inset-0 nfd-wba-flex nfd-wba-grow nfd-wba-flex-col nfd-wba-px-4 nfd-wba-py-8 sm:nfd-wba-px-6"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_UpdateNotice__WEBPACK_IMPORTED_MODULE_13__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ContentTitle__WEBPACK_IMPORTED_MODULE_6__["default"], {
    activeTab: activeTab,
    title: keywordsFilter,
    currentCategory: activeTab === 'patterns' ? activePatternsCategory : activeTemplatesCategory
  }), !isSidebarLoading && isContentLoading && !isError || !ready && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Skeleton__WEBPACK_IMPORTED_MODULE_11__["default"], null), isError && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DesignList_Error__WEBPACK_IMPORTED_MODULE_8__["default"], null), data?.length === 0 && !isError && !isValidating && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DesignList_NoResults__WEBPACK_IMPORTED_MODULE_9__["default"], {
    isFavorites: isFavorites
  }), ready && data && data?.length > 0 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DesignList_DesignList__WEBPACK_IMPORTED_MODULE_7__["default"], {
    data: data
  }), hasMore && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-z-[2] nfd-wba-flex nfd-wba-flex-col nfd-wba-items-center nfd-wba-justify-center nfd-wba-gap-y-6 nfd-wba-bg-white nfd-wba-px-6 nfd-wba-pt-6",
    ref: loadMoreRef
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Spinner__WEBPACK_IMPORTED_MODULE_12__["default"], {
    size: 40
  }))))));
};
/* harmony default export */ __webpack_exports__["default"] = (Content);

/***/ }),

/***/ "./src/components/Modal/Content/ContentTitle.jsx":
/*!*******************************************************!*\
  !*** ./src/components/Modal/Content/ContentTitle.jsx ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../hooks */ "./src/hooks/index.js");

/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */

const ContentTitle = ({
  activeTab,
  currentCategory,
  title
}) => {
  // Fetch data.
  const {
    data,
    error
  } = (0,_hooks__WEBPACK_IMPORTED_MODULE_3__.useCategories)(activeTab);
  const activeCategory = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => data?.find(cat => cat.title === currentCategory), [data, currentCategory]);
  if (error || !data) {
    return null;
  }
  if (!activeCategory?.label && !title && currentCategory !== 'favorites') {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "nfd-wba-my-0 nfd-wba-mb-8 nfd-wba-text-[26px] nfd-wba-font-light nfd-wba-text-dark"
  }, !title && currentCategory === 'favorites' && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Favorites', 'nfd-wonder-blocks'), title && (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(
  // translators: %s: search keywords.
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Results for %s', 'nfd-wonder-blocks'), title), !title && activeCategory?.label);
};
/* harmony default export */ __webpack_exports__["default"] = (ContentTitle);

/***/ }),

/***/ "./src/components/Modal/Content/DesignList/DesignItem.jsx":
/*!****************************************************************!*\
  !*** ./src/components/Modal/Content/DesignList/DesignItem.jsx ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/notices */ "@wordpress/notices");
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_wordpress_notices__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../helpers */ "./src/helpers/index.js");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../hooks */ "./src/hooks/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../store */ "./src/store/index.js");
/* harmony import */ var _Icons__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../Icons */ "./src/components/Icons/index.js");

/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */











/**
 * Internal dependencies
 */





const DesignItem = ({
  item
}) => {
  var _item$content;
  const [isFavorite, setIsFavorite] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.useState)(false);
  const [insertingDesign, setInsertingDesign] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.useState)(false);
  const {
    data,
    mutate
  } = (0,_hooks__WEBPACK_IMPORTED_MODULE_13__.usePatterns)({
    onlyFavorites: true
  });
  const blockRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.useRef)();
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.useState)(false);
  const {
    adminEmail
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect)(select => ({
    adminEmail: select('core').getEntityRecord('root', 'site')?.email
  }));
  const replace = (0,_hooks__WEBPACK_IMPORTED_MODULE_13__.useReplacePlaceholders)();
  const replacePlaceholders = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.useMemo)(() => {
    return {
      'email@example.com': adminEmail
    };
  }, [adminEmail]);
  const {
    data: allFavs,
    mutate: mutateAllFavs
  } = (0,_hooks__WEBPACK_IMPORTED_MODULE_13__.usePatterns)({
    onlyFavorites: true,
    perPage: -1
  });
  const rawContent = (_item$content = item?.content) !== null && _item$content !== void 0 ? _item$content : '';
  const content = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.useMemo)(() => {
    return replace(rawContent, replacePlaceholders);
  }, [replace, rawContent, replacePlaceholders]);
  const blocks = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.useMemo)(() => (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__.rawHandler)({
    HTML: content
  }), [content]);
  const previewBlocks = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.useMemo)(() => (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__.rawHandler)({
    HTML: (0,_helpers__WEBPACK_IMPORTED_MODULE_12__.optimizePreview)(rawContent)
  }), [rawContent]);
  const {
    createErrorNotice,
    createSuccessNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useDispatch)(_wordpress_notices__WEBPACK_IMPORTED_MODULE_10__.store);
  const {
    editPost
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useDispatch)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_7__.store);
  const {
    setIsModalOpen
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_14__.store);
  const {
    activeTab,
    activeTemplatesCategory,
    activePatternsCategory,
    selectedTemplateSlug,
    keywords,
    currentTheme
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect)(select => ({
    activeTab: select(_store__WEBPACK_IMPORTED_MODULE_14__.store).getActiveTab(),
    activeTemplatesCategory: select(_store__WEBPACK_IMPORTED_MODULE_14__.store).getActiveTemplatesCategory(),
    activePatternsCategory: select(_store__WEBPACK_IMPORTED_MODULE_14__.store).getActivePatternsCategory(),
    selectedTemplateSlug: select(_wordpress_editor__WEBPACK_IMPORTED_MODULE_7__.store).getEditedPostAttribute('template'),
    keywords: select(_store__WEBPACK_IMPORTED_MODULE_14__.store).getKeywordsFilter(),
    currentTheme: select('core').getCurrentTheme()
  }));

  /**
   * Check if the trash icon should be shown.
   *
   * @return {boolean}
   */
  const shouldShowTrash = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.useCallback)(() => {
    return activeTab === 'patterns' && activePatternsCategory === 'favorites' && isFavorite && !keywords || activeTab === 'templates' && activeTemplatesCategory === 'favorites' && isFavorite && !keywords;
  }, [activePatternsCategory, activeTab, activeTemplatesCategory, isFavorite, keywords]);

  /**
   * Check if a template should be set
   *
   * @return {boolean}
   */
  const resolveTemplateUpdate = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.useCallback)(() => {
    if (item?.type === 'templates' && currentTheme?.template === 'yith-wonder') {
      if (item?.slug.includes('coming-soon') || item?.slug.includes('link-in-bio')) {
        if (selectedTemplateSlug !== 'no-header-footer') {
          return 'no-header-footer';
        }
      } else if (selectedTemplateSlug !== 'no-title') {
        return 'no-title';
      }
    }
    return false;
  }, [item?.type, item?.slug, currentTheme?.template, selectedTemplateSlug]);

  /**
   * Update the template if needed.
   *
   * @return {void}
   */
  const updateTemplate = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.useCallback)(() => {
    const template = resolveTemplateUpdate();
    if (template) {
      editPost({
        template
      });
    }
  }, [resolveTemplateUpdate, editPost]);

  /**
   * Track insert events.
   *
   * @return {void}
   */
  const trackInsertEvents = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.useCallback)(() => {
    if (activeTab === 'patterns') {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_12__.trackHiiveEvent)('pattern_inserted', {
        label_key: 'pattern_slug',
        pattern_id: item.id,
        pattern_slug: item.slug
      });
    } else if (activeTab === 'templates') {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_12__.trackHiiveEvent)('template_inserted', {
        label_key: 'template_slug',
        template_id: item.id,
        template_slug: item.slug
      });
    }
  }, [activeTab, item.id, item.slug]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.useEffect)(() => {
    let isFav = false;
    if (!Array.isArray(allFavs)) {
      return;
    }
    isFav = allFavs.find(fav => fav.id === item.id);
    setIsFavorite(!!isFav);
  }, [allFavs, item.id]);

  /**
   * Insert the pattern or a collection of patterns (template) into the editor.
   *
   * @return {void}
   * @throws {Error} If the pattern cannot be inserted.
   */
  const insertDesignHandler = async () => {
    setInsertingDesign(true);
    try {
      // Update the template if needed.
      updateTemplate();

      // Insert the pattern.
      await (0,_helpers__WEBPACK_IMPORTED_MODULE_12__.blockInserter)(blocks);
      trackInsertEvents();

      // Show a success notice.
      createSuccessNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_9__.sprintf)(
      // translators: %s is the pattern title
      (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_9__.__)('Block pattern "%s" inserted.', 'nfd-wonder-blocks'), item.title), {
        type: 'snackbar'
      });
    } catch (error) {
      createErrorNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_9__.__)('Failed to insert block pattern. Please try again.', 'nfd-wonder-blocks'), {
        type: 'snackbar'
      });

      // eslint-disable-next-line no-console
      console.warn(error);
    } finally {
      setInsertingDesign(false);
      setIsModalOpen(false);
    }
  };

  /**
   * Add or remove the pattern from the favorites list.
   *
   * @param {Object} toggleState The toggle state.
   *
   * @return {void}
   * @throws {Error} If the pattern cannot be added or removed.
   */
  const favoritesClickHandler = async (toggleState = true) => {
    // Do nothing if the pattern is already in the favorites list and toggleState is false.
    if (isFavorite && !toggleState) {
      return;
    }

    // Track favorite events.
    if (!isFavorite) {
      if (activeTab === 'patterns') {
        (0,_helpers__WEBPACK_IMPORTED_MODULE_12__.trackHiiveEvent)('pattern_favorited', {
          label_key: 'pattern_slug',
          pattern_id: item.id,
          pattern_slug: item.slug
        });
      } else if (activeTab === 'templates') {
        (0,_helpers__WEBPACK_IMPORTED_MODULE_12__.trackHiiveEvent)('template_favorited', {
          label_key: 'template_slug',
          template_id: item.id,
          template_slug: item.slug
        });
      }
    }
    setIsFavorite(prev => !prev);
    const method = isFavorite ? 'DELETE' : 'POST';
    const updater = async () => await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      url: `${_constants__WEBPACK_IMPORTED_MODULE_11__.NFD_REST_URL}/favorites`,
      method,
      data: {
        ...item,
        type: activeTab
      },
      headers: {
        'x-nfd-wonder-blocks': 'nfd_wonder_blocks'
      }
    });
    const newData = method === 'DELETE' ? data.filter(fav => fav.id !== item.id) : [...data, {
      ...item,
      type: activeTab
    }];
    const updatedFavs = method === 'DELETE' ? allFavs.filter(fav => fav.id !== item.id) : [...allFavs, {
      ...item,
      type: activeTab
    }];
    mutate(updater, {
      optimisticData: [...newData],
      rollbackOnError: false,
      populateCache: true,
      revalidate: false
    });
    mutateAllFavs(() => [...updatedFavs], {
      optimisticData: [...updatedFavs],
      rollbackOnError: false,
      populateCache: true,
      revalidate: false
    });
  };
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.useEffect)(() => {
    setLoading(true);
    const timerId = setTimeout(() => {
      setLoading(false);
    }, 600);
    const timerId2 = setTimeout(() => {
      setLoading(prev => !prev);
    }, 1000);
    return () => {
      clearTimeout(timerId);
      clearTimeout(timerId2);
    };
  }, [activeTab, activeTemplatesCategory, activePatternsCategory]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.useEffect)(() => {
    let timerId;
    const adjustIframeHeight = () => {
      const container = blockRef.current;
      const frame = container?.querySelector('iframe[title]');
      const contentDocument = frame?.contentDocument;
      if (contentDocument) {
        const rootContainer = contentDocument.querySelector('.is-root-container');
        const height = rootContainer?.scrollHeight || 0;
        let scale = container.querySelector('[style*="scale"]')?.style?.transform?.match(/scale\((.*?)\)/)?.[1];
        scale = scale ? parseFloat(scale) : 1;

        // Reset offset if height is less than 500px
        const scollerHeight = window.innerWidth * 0.3; // 30vw
        const scaledOffset = scollerHeight / scale;
        if (height < scaledOffset) {
          frame.style.setProperty('--offset', `100%`);
        } else {
          frame.style.setProperty('--offset', `${scaledOffset}px`);
        }
        frame.style.maxHeight = `${height}px`;
        frame.style.setProperty('--nfd-wba-design-item--scale', scale);

        // constant scroll speed
        const speedConstant = 200 / (scale * 2) + 300; // pixels per second

        frame?.style.setProperty('--nfd-wba-design-item--scroll-duration', `${height / speedConstant}s`);
      } else {
        clearTimeout(timerId);
        timerId = setTimeout(adjustIframeHeight, 300); // Retry after 300ms
      }
    };

    // Set up the resize event listener
    const onResize = () => {
      clearTimeout(timerId); // Clear any existing timers
      timerId = setTimeout(adjustIframeHeight, 500); // Throttle resize calls
    };

    // Add resize listener
    window.addEventListener('resize', onResize);

    // Initial call
    adjustIframeHeight();
    timerId = setTimeout(adjustIframeHeight, 1000); // give browser time to render

    return () => {
      clearTimeout(timerId); // Clear the timer
      window.removeEventListener('resize', onResize); // Remove resize listener
    };
  }, [item?.type, loading]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-relative nfd-wba-mb-[var(--nfd-wba-masonry-gap)] nfd-wba-flex nfd-wba-flex-col nfd-wba-gap-6 nfd-wba-overflow-hidden nfd-wba-rounded-2xl nfd-wba-bg-grey nfd-wba-p-6"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-rounded-lg nfd-wba-border-2 nfd-wba-border-dashed nfd-wba-border-grey-darker nfd-wba-p-4"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('nfd-wba-design-item nfd-wba-flex nfd-wba-min-h-[116px] nfd-wba-cursor-pointer nfd-wba-flex-col nfd-wba-justify-center nfd-wba-overflow-hidden nfd-wba-rounded-sm nfd-wba-border-[16px] nfd-wba-border-solid nfd-wba-border-white nfd-wba-bg-white nfd-wba-shadow-design-item nfd-wba-transition-opacity focus-visible:nfd-wba-outline-2 focus-visible:nfd-wba-outline-brand', item?.type === 'templates' && 'nfd-wba-design-item--template', insertingDesign && 'nfd-wba-inserting-design'),
    ref: blockRef,
    role: "button",
    tabIndex: "0",
    onClick: () => insertDesignHandler(),
    onKeyUp: e => {
      if (e.key === 'Enter') {
        insertDesignHandler();
      }
    }
  }, previewBlocks && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.BlockPreview, {
    blocks: previewBlocks,
    viewportWidth: 1200,
    live: false
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-flex nfd-wba-items-center nfd-wba-justify-between nfd-wba-gap-3 nfd-wba-bg-grey"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-flex nfd-wba-shrink-0 nfd-wba-items-center nfd-wba-gap-3"
  }, item?.isPremium && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "nfd-wba-rounded nfd-wba-bg-dark nfd-wba-px-[10px] nfd-wba-py-[5px] nfd-wba-text-white"
  }, "Premium"), !shouldShowTrash() && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('nfd-wba-h-12 nfd-wba-w-12 !nfd-wba-min-w-0 nfd-wba-rounded-lg nfd-wba-bg-white nfd-wba-transition-all nfd-wba-duration-100', isFavorite ? 'nfd-wba-cursor-default !nfd-wba-text-red-600' : 'nfd-wba-cursor-not-pointer nfd-wba-text-zinc-500 hover:nfd-wba-bg-white/50 hover:nfd-wba-text-red-600'),
    showTooltip: true,
    label: isFavorite ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_9__.__)('In Favorites', 'nfd-wonder-blocks') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_9__.__)('Add to Favorites', 'nfd-wonder-blocks'),
    onClick: () => favoritesClickHandler(false),
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_16__["default"], {
      className: "nfd-wba-shrink-0",
      fill: "currentColor",
      size: 24,
      icon: isFavorite ? _Icons__WEBPACK_IMPORTED_MODULE_15__.heart : _Icons__WEBPACK_IMPORTED_MODULE_15__.heartEmpty
    })
  }), shouldShowTrash() && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('nfd-wba-h-12 nfd-wba-w-12 !nfd-wba-min-w-0 nfd-wba-rounded-lg nfd-wba-bg-white nfd-wba-text-zinc-500 nfd-wba-transition-all nfd-wba-duration-100 hover:nfd-wba-bg-white/50 hover:nfd-wba-text-red-600'),
    showTooltip: true,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_9__.__)('Remove from Favorites', 'nfd-wonder-blocks'),
    onClick: () => favoritesClickHandler(),
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_16__["default"], {
      className: "nfd-wba-shrink-0",
      fill: "currentColor",
      width: 32,
      height: 32,
      icon: _Icons__WEBPACK_IMPORTED_MODULE_15__.trash
    })
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    className: "nfd-wba-h-12 nfd-wba-w-12 !nfd-wba-min-w-0 nfd-wba-rounded-lg nfd-wba-bg-white nfd-wba-text-zinc-500 nfd-wba-transition-all nfd-wba-duration-100 hover:nfd-wba-bg-white/50",
    isBusy: insertingDesign,
    isPressed: insertingDesign,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_9__.__)('Add pattern to page', 'nfd-wonder-blocks'),
    showTooltip: true,
    onClick: () => insertDesignHandler(),
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_16__["default"], {
      fill: "currentColor",
      className: "nfd-wba-shrink-0",
      size: 24,
      icon: _Icons__WEBPACK_IMPORTED_MODULE_15__.plus
    })
  })))));
};
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.memo)(DesignItem));

/***/ }),

/***/ "./src/components/Modal/Content/DesignList/DesignList.jsx":
/*!****************************************************************!*\
  !*** ./src/components/Modal/Content/DesignList/DesignList.jsx ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_masonry_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-masonry-css */ "./node_modules/react-masonry-css/dist/react-masonry-css.module.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DesignItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DesignItem */ "./src/components/Modal/Content/DesignList/DesignItem.jsx");

/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */

const DesignList = ({
  data
}) => {
  if (!data || !Array.isArray(data)) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_masonry_css__WEBPACK_IMPORTED_MODULE_1__["default"], {
    breakpointCols: {
      default: 2,
      1600: 2,
      1100: 1
    },
    className: "nfd-wba-design-list nfd-wba-flex nfd-wba-w-auto sm:-nfd-wba-ml-[var(--nfd-wba-masonry-gap)]",
    columnClassName: "nfd-wba-design-list__column sm:nfd-wba-pl-[var(--nfd-wba-masonry-gap)]"
  }, data?.map((pattern, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DesignItem__WEBPACK_IMPORTED_MODULE_3__["default"], {
    key: `${pattern.key}-${index}`,
    item: pattern
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.memo)(DesignList));

/***/ }),

/***/ "./src/components/Modal/Content/DesignList/Error.jsx":
/*!***********************************************************!*\
  !*** ./src/components/Modal/Content/DesignList/Error.jsx ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _svg_Error_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../svg/Error.svg */ "./src/svg/Error.svg");

/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */


const Error = () => {
  const message = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sorry! There was an error loading this page. If this issue persists, contact our <a>support team</a>.'), {
    a: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: _constants__WEBPACK_IMPORTED_MODULE_3__.SUPPORT_URL,
      target: "_blank",
      rel: "noreferrer"
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('support team', 'nfd-wonder-blocks'))
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-flex nfd-wba-grow nfd-wba-items-center nfd-wba-justify-center"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-state-message nfd-wba-flex nfd-wba-w-full nfd-wba-max-w-[640px] nfd-wba-flex-col nfd-wba-items-center nfd-wba-justify-center nfd-wba-gap-8 nfd-wba-pb-[10%]"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_svg_Error_svg__WEBPACK_IMPORTED_MODULE_4__.ReactComponent, null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-wba-m-0 nfd-wba-text-center nfd-wba-text-2xl nfd-wba-font-light nfd-wba-text-dark"
  }, message)));
};
/* harmony default export */ __webpack_exports__["default"] = (Error);

/***/ }),

/***/ "./src/components/Modal/Content/DesignList/NoResults.jsx":
/*!***************************************************************!*\
  !*** ./src/components/Modal/Content/DesignList/NoResults.jsx ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _svg_NoResults_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../svg/NoResults.svg */ "./src/svg/NoResults.svg");
/* harmony import */ var _svg_NoFavorites_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../svg/NoFavorites.svg */ "./src/svg/NoFavorites.svg");

/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */


const NoResults = ({
  isFavorites
}) => {
  const title = isFavorites ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("You haven't added any patterns or page templates to your favorites yet.", 'nfd-wonder-blocks') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Sorry, we couldn't find any results for that. Please try a different search term.", 'nfd-wonder-blocks');
  const svg = isFavorites ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_svg_NoFavorites_svg__WEBPACK_IMPORTED_MODULE_3__.ReactComponent, null) : (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_svg_NoResults_svg__WEBPACK_IMPORTED_MODULE_2__.ReactComponent, null);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-flex nfd-wba-grow nfd-wba-items-center nfd-wba-justify-center"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-state-message nfd-wba-flex nfd-wba-w-full nfd-wba-max-w-[640px] nfd-wba-flex-col nfd-wba-items-center nfd-wba-justify-center nfd-wba-gap-8 nfd-wba-pb-[10%]"
  }, svg, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-wba-m-0 nfd-wba-max-w-[420px] nfd-wba-text-center nfd-wba-text-2xl nfd-wba-font-light nfd-wba-text-dark"
  }, title)));
};
/* harmony default export */ __webpack_exports__["default"] = (NoResults);

/***/ }),

/***/ "./src/components/Modal/Content/Header/Header.jsx":
/*!********************************************************!*\
  !*** ./src/components/Modal/Content/Header/Header.jsx ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/close.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../store */ "./src/store/index.js");
/* harmony import */ var _KeywordFilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./KeywordFilter */ "./src/components/Modal/Content/Header/KeywordFilter.jsx");
/* harmony import */ var _TrialNotice__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TrialNotice */ "./src/components/Modal/Content/Header/TrialNotice.jsx");

/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */



const Header = () => {
  const showTrial = true;
  const {
    setIsModalOpen
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.store);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "nfd-wba-modal__header"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_KeywordFilter__WEBPACK_IMPORTED_MODULE_5__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-items-center nfd-wba-ml-auto nfd-wba-flex nfd-wba-gap-x-4"
  }, showTrial && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_TrialNotice__WEBPACK_IMPORTED_MODULE_6__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: "nfd-wba-ml-auto nfd-wba-text-current hover:nfd-wba-text-dark",
    showTooltip: true,
    onClick: () => {
      setIsModalOpen(false);
    },
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"],
    iconSize: 24,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Close dialog', 'nfd-wonder-blocks')
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ }),

/***/ "./src/components/Modal/Content/Header/KeywordFilter.jsx":
/*!***************************************************************!*\
  !*** ./src/components/Modal/Content/Header/KeywordFilter.jsx ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/search.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../store */ "./src/store/index.js");

/**
 * WordPress dependencies
 */






/**
 * External dependencies
 */



/**
 * Internal dependencies
 */


const KeywordFilter = () => {
  const [searchValue, setSearchValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)('');
  const [hasFocus, setHasFocus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const [isPending, startTransition] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useTransition)();
  const searchRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
  const {
    setKeywordsFilter,
    setShouldResetKeywords
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_8__.store);
  const {
    isSidebarLoading,
    shouldResetKeywords
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => ({
    isSidebarLoading: select(_store__WEBPACK_IMPORTED_MODULE_8__.store).isSidebarLoading(),
    shouldResetKeywords: select(_store__WEBPACK_IMPORTED_MODULE_8__.store).shouldResetKeywords()
  }));

  // Debounce search value changes in store.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    const delayedSearch = lodash_debounce__WEBPACK_IMPORTED_MODULE_6___default()(() => {
      startTransition(() => {
        setKeywordsFilter(searchValue.trim());
      });
    }, searchValue.trim() === '' ? 0 : _constants__WEBPACK_IMPORTED_MODULE_7__.INPUT_DEBOUNCE_TIME // Don't debounce empty searches.
    );

    if (typeof searchValue === 'string' && searchValue.trim().length >= 2) {
      delayedSearch();
    } else {
      startTransition(() => {
        setKeywordsFilter(''); // Clear the filter if the searchValue has less than 3 chars
      });
    }

    return delayedSearch.cancel;
  }, [searchValue, setKeywordsFilter]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    if (shouldResetKeywords) {
      setSearchValue('');
      setShouldResetKeywords(false);
    }
  }, [setShouldResetKeywords, shouldResetKeywords]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-flex nfd-wba-items-center nfd-wba-gap-x-3"
  }, !hasFocus && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Search', 'nfd-wonder-blocks'),
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Search', 'nfd-wonder-blocks'),
    "aria-haspopup": "true",
    "aria-expanded": hasFocus,
    "aria-controls": "nfd-wba-filter-patterns",
    "aria-busy": isPending,
    className: "nfd-wba-search-toggle sm:nfd-wba-hidden",
    type: "button",
    showTooltip: true,
    onClick: () => {
      setHasFocus(true);
      setTimeout(() => {
        searchRef.current?.focus();
      }, 50);
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_9__["default"], {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__["default"],
    iconSize: 24
  })), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SearchControl, {
    id: "nfd-wba-filter-patterns",
    ref: searchRef,
    className: classnames__WEBPACK_IMPORTED_MODULE_5___default()('nfd-wba-keyword-filter nfd-wba-m-0', !hasFocus && 'nfd-wba-invisible sm:nfd-wba-visible'),
    disabled: isSidebarLoading,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Search', 'nfd-wonder-blocks'),
    hideLabelFromVision: false,
    placeholder: "",
    value: searchValue,
    onFocus: () => {
      setHasFocus(true);
    },
    onBlur: () => {
      setHasFocus(false);
    },
    onChange: value => {
      setSearchValue(value);
    }
  }));
};
/* harmony default export */ __webpack_exports__["default"] = (KeywordFilter);

/***/ }),

/***/ "./src/components/Modal/Content/Header/TrialNotice.jsx":
/*!*************************************************************!*\
  !*** ./src/components/Modal/Content/Header/TrialNotice.jsx ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const TrialNotice = () => {
  return null;
};
/* harmony default export */ __webpack_exports__["default"] = (TrialNotice);

/***/ }),

/***/ "./src/components/Modal/Content/LoadingSpinner.jsx":
/*!*********************************************************!*\
  !*** ./src/components/Modal/Content/LoadingSpinner.jsx ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Logo */ "./src/components/Logo.jsx");
/* harmony import */ var _Spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Spinner */ "./src/components/Modal/Content/Spinner.jsx");

/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */


function LoadingSpinner({
  isComplete
}) {
  if (isComplete) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-absolute nfd-wba-inset-0 nfd-wba-z-[2] nfd-wba-flex nfd-wba-flex-col nfd-wba-items-center nfd-wba-justify-start nfd-wba-gap-y-6 nfd-wba-bg-white nfd-wba-px-6 nfd-wba-pt-10 sm:nfd-wba-justify-center sm:nfd-wba-pb-40 sm:nfd-wba-pt-0"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Logo__WEBPACK_IMPORTED_MODULE_2__["default"], {
    size: "large",
    color: "brand"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "nfd-wba-m-0 nfd-wba-max-w-[300px] nfd-wba-text-center nfd-wba-text-xl nfd-wba-font-light nfd-wba-text-dark-lighter sm:nfd-wba-max-w-full"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('One moment while we load content tailored for your site.', 'nfd-wonder-blocks')), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Spinner__WEBPACK_IMPORTED_MODULE_3__["default"], null));
}
/* harmony default export */ __webpack_exports__["default"] = (LoadingSpinner);

/***/ }),

/***/ "./src/components/Modal/Content/Skeleton.jsx":
/*!***************************************************!*\
  !*** ./src/components/Modal/Content/Skeleton.jsx ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SkeletonItem: function() { return /* binding */ SkeletonItem; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_masonry_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-masonry-css */ "./node_modules/react-masonry-css/dist/react-masonry-css.module.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);

/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */

const Skeleton = ({
  count = 6,
  minHeight = 120,
  maxHeight = 320
}) => {
  const items = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    const result = [];
    for (let i = 0; i < count; i++) {
      const height = Math.floor(Math.random() * (minHeight - maxHeight + 1) + maxHeight);
      result.push((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SkeletonItem, {
        key: i,
        height: height
      }));
    }
    return result;
  }, [count, minHeight, maxHeight]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_masonry_css__WEBPACK_IMPORTED_MODULE_1__["default"], {
    breakpointCols: {
      default: 2,
      1600: 2,
      1024: 1
    },
    className: "nfd-wba-design-list -nfd-wba-ml-[var(--nfd-wba-masonry-gap)] nfd-wba-flex",
    columnClassName: "nfd-wba-design-list__column nfd-wba-pl-[var(--nfd-wba-masonry-gap)]"
  }, items);
};
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.memo)(Skeleton));
const SkeletonItem = ({
  height
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-skeleton--item nfd-wba-mb-[var(--nfd-wba-masonry-gap)] nfd-wba-flex nfd-wba-w-full nfd-wba-flex-col nfd-wba-gap-6 nfd-wba-rounded-2xl nfd-wba-bg-grey nfd-wba-p-6"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-rounded-[9px] nfd-wba-border-2 nfd-wba-border-solid nfd-wba-border-grey-darker/20",
    style: {
      height: `${height}px`
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-flex nfd-wba-items-center nfd-wba-justify-between nfd-wba-gap-14"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-h-12 nfd-wba-max-w-[270px] nfd-wba-grow nfd-wba-rounded-lg nfd-wba-bg-grey-darker/20"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "items-center nfd-wba-flex nfd-wba-gap-3"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-h-12 nfd-wba-w-12 nfd-wba-rounded-lg nfd-wba-bg-grey-darker/20"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-h-12 nfd-wba-w-12 nfd-wba-rounded-lg nfd-wba-bg-grey-darker/20"
  }))));
};

/***/ }),

/***/ "./src/components/Modal/Content/Spinner.jsx":
/*!**************************************************!*\
  !*** ./src/components/Modal/Content/Spinner.jsx ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const Spinner = ({
  size = 60
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-flex nfd-wba-shrink-0 nfd-wba-grow-0 nfd-wba-animate-spin nfd-wba-rounded-full nfd-wba-border-2 nfd-wba-border-solid nfd-wba-border-brand nfd-wba-border-r-brand/10 nfd-wba-align-[-0.125em]",
    style: {
      width: `${size}px`,
      height: `${size}px`
    },
    role: "status"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "nfd-wba-sr-only"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loading…', 'nfd-wonder-blocks')));
};
/* harmony default export */ __webpack_exports__["default"] = (Spinner);

/***/ }),

/***/ "./src/components/Modal/Content/UpdateNotice.jsx":
/*!*******************************************************!*\
  !*** ./src/components/Modal/Content/UpdateNotice.jsx ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var compare_versions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! compare-versions */ "./node_modules/compare-versions/lib/esm/compare.js");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");

/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */

const UpdateNotice = () => {
  if ((0,compare_versions__WEBPACK_IMPORTED_MODULE_6__.compare)(_constants__WEBPACK_IMPORTED_MODULE_5__.WP_VERSION, _constants__WEBPACK_IMPORTED_MODULE_5__.MIN_REQUIRED_WP_VERSION, '>=')) {
    return null;
  }
  const updateURL = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_2__.addQueryArgs)('update-core.php');
  const message = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.sprintf)(
  // translators: %s: brand name - 'Wonder Blocks'.
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('%s needs the latest version of WordPress, please <a>update your site</a>.', 'nfd-wonder-blocks'), _constants__WEBPACK_IMPORTED_MODULE_5__.BRAND_NAME), {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    a: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: updateURL
    })
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
    className: "nfd-wba-m-0 nfd-wba-mb-8",
    isDismissible: false,
    status: "warning"
  }, message);
};
/* harmony default export */ __webpack_exports__["default"] = (UpdateNotice);

/***/ }),

/***/ "./src/components/Modal/Modal.jsx":
/*!****************************************!*\
  !*** ./src/components/Modal/Modal.jsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../helpers */ "./src/helpers/index.js");
/* harmony import */ var _hooks_useMonitorBlockOrder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../hooks/useMonitorBlockOrder */ "./src/hooks/useMonitorBlockOrder.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../store */ "./src/store/index.js");
/* harmony import */ var _Content_Content__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Content/Content */ "./src/components/Modal/Content/Content.jsx");
/* harmony import */ var _Content_Header_Header__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Content/Header/Header */ "./src/components/Modal/Content/Header/Header.jsx");
/* harmony import */ var _Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Sidebar/Sidebar */ "./src/components/Modal/Sidebar/Sidebar.jsx");

/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */






const Modal = () => {
  const {
    setIsModalOpen,
    setActiveTab
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_6__.store);
  const {
    isModalOpen,
    isEditingTemplate,
    editedPostType
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => ({
    isModalOpen: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).isModalOpen(),
    isEditingTemplate: select('core/edit-post').isEditingTemplate(),
    editedPostType: select('core/edit-site')?.getEditedPostType()
  }));

  // Check if we are editing a template, via site editor or page.
  const isSiteEditor = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    return isEditingTemplate || !!editedPostType;
  }, [isEditingTemplate, editedPostType]);

  // Monitor block order.
  (0,_hooks_useMonitorBlockOrder__WEBPACK_IMPORTED_MODULE_5__["default"])();

  // Check if we should automatically open the modal and pre-select.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    const searchParams = new URLSearchParams(window?.location?.search);
    let timer;
    if (searchParams.has('wonder-blocks-library')) {
      timer = setTimeout(() => {
        if (searchParams.get('wonder-blocks-library') === 'templates') {
          setActiveTab('templates');
        }
        (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.trackHiiveEvent)('modal_open', {
          label_key: 'trigger',
          trigger: 'url'
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
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    className: "nfd-wba-modal nfd-wba-shadow-none sm:nfd-wba-max-h-[90%] md:nfd-wba-max-w-[90%]",
    __experimentalHideHeader: true,
    "aria-expanded": true,
    isFullScreen: true,
    onRequestClose: () => setIsModalOpen(false)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-library-modal-grid nfd-wba-grow nfd-wba-bg-white nfd-wba-text-dark-lighter"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_9__["default"], {
    isSiteEditor: isSiteEditor
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Content_Header_Header__WEBPACK_IMPORTED_MODULE_8__["default"], null), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Content_Content__WEBPACK_IMPORTED_MODULE_7__["default"], null)));
};
/* harmony default export */ __webpack_exports__["default"] = (Modal);

/***/ }),

/***/ "./src/components/Modal/Sidebar/Categories.jsx":
/*!*****************************************************!*\
  !*** ./src/components/Modal/Sidebar/Categories.jsx ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");
/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../hooks */ "./src/hooks/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../store */ "./src/store/index.js");
/* harmony import */ var _Icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Icons */ "./src/components/Icons/index.js");
/* harmony import */ var _ErrorLoading__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ErrorLoading */ "./src/components/Modal/Sidebar/ErrorLoading.jsx");
/* harmony import */ var _ListElement__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./ListElement */ "./src/components/Modal/Sidebar/ListElement.jsx");
/* harmony import */ var _Skeleton__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Skeleton */ "./src/components/Modal/Sidebar/Skeleton.jsx");

/**
 * WordPress dependencies
 */






/**
 * Internal dependencies
 */







const Categories = ({
  type = 'patterns',
  isSiteEditor = false
}) => {
  // Fetch data
  const {
    data,
    error,
    isValidating
  } = (0,_hooks__WEBPACK_IMPORTED_MODULE_6__.useCategories)(type);
  const {
    data: allFavs
  } = (0,_hooks__WEBPACK_IMPORTED_MODULE_6__.usePatterns)({
    onlyFavorites: true,
    perPage: -1
  });

  // Remove SITE_EDITOR_CATEGORIES if we are not in the Site Editor
  const filteredCategories = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    if (!isSiteEditor) {
      return data?.filter(category => !_constants__WEBPACK_IMPORTED_MODULE_5__.SITE_EDITOR_CATEGORIES.includes(category.title));
    }
    return data;
  }, [isSiteEditor, data]);

  // Format categories for mobile dropdown
  // prettier-ignore
  const formattedCategoriesForMobile = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
    var _allFavs$length;
    return filteredCategories?.reduce((result, category) => {
      var _category$count;
      // Handle undefined values
      const label = category.label || '';
      const count = (_category$count = category.count) !== null && _category$count !== void 0 ? _category$count : '';
      const title = category.title || '';
      let formattedLabel = label;
      if (count) {
        formattedLabel += ` (${count})`; // Include parentheses only when count is defined
      }

      return [...result, {
        label: formattedLabel,
        value: title
      }];
    }, [{
      value: 'favorites',
      label: `${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Favorites', 'nfd-wonder-blocks')} (${(_allFavs$length = allFavs?.length) !== null && _allFavs$length !== void 0 ? _allFavs$length : 0})`
    }]).sort((a, b) => {
      if (a.value === 'favorites') {
        return 1; // Move 'favorites' to the end
      } else if (b.value === 'favorites') {
        return -1; // Keep 'favorites' at the end
      }

      return 0; // Maintain the original order
    });
  }, [filteredCategories, allFavs?.length]);

  // Store actions and states.
  const {
    setIsSidebarLoading,
    setActivePatternsCategory,
    setActiveTemplatesCategory,
    setShouldResetKeywords
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_7__.store);
  const {
    activePatternsCategory,
    activeTemplatesCategory,
    keywordsFilter
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => ({
    activePatternsCategory: select(_store__WEBPACK_IMPORTED_MODULE_7__.store).getActivePatternsCategory(),
    activeTemplatesCategory: select(_store__WEBPACK_IMPORTED_MODULE_7__.store).getActiveTemplatesCategory(),
    keywordsFilter: select(_store__WEBPACK_IMPORTED_MODULE_7__.store).getKeywordsFilter()
  }));

  // Set sidebar loading state.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    setIsSidebarLoading(!data && isValidating);
  }, [data, isValidating, setIsSidebarLoading]);

  /**
   * Set active category depending if Pattern or Category.
   *
   * @param {string} category Category title.
   * @return {void}
   */
  const setActiveCategory = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)(category => {
    if (type === 'patterns') {
      setActivePatternsCategory(category);
    } else {
      setActiveTemplatesCategory(category);
    }
  }, [setActivePatternsCategory, setActiveTemplatesCategory, type]);

  /**
   * Handle category change.
   *
   * @param {string} categoryTitle Category title.
   * @return {void}
   */
  const handleCategoryChange = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)(categoryTitle => {
    const categoryExists = 'favorites' === categoryTitle || data.some(function (item) {
      return item.title === categoryTitle;
    });
    if (categoryExists) {
      setActiveCategory(categoryTitle);
    } else if (data.length > 0 && data[0].title) {
      setActiveCategory(data[0].title);
    }
    setShouldResetKeywords(true);
  }, [setActiveCategory, setShouldResetKeywords, data]);

  /**
   * Get active category.
   *
   * @return {string} Active category.
   */
  const getActiveCategory = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)(() => {
    let activeCategory = '';
    if (type === 'patterns') {
      activeCategory = activePatternsCategory;
    } else {
      activeCategory = activeTemplatesCategory;
    }
    const categoryExists = 'favorites' === activeCategory || data.some(function (item) {
      return item.title === activeCategory;
    });
    if (!categoryExists && data.length > 0 && data[0].title) {
      activeCategory = data[0].title;
      setActiveCategory(activeCategory);
    }
    return activeCategory;
  }, [type, data, activePatternsCategory, activeTemplatesCategory, setActiveCategory]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, !data && isValidating && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Skeleton__WEBPACK_IMPORTED_MODULE_11__["default"], {
    count: 12
  }), !data && error && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ErrorLoading__WEBPACK_IMPORTED_MODULE_9__["default"], null), data && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    className: "nfd-wba-modal__categories-select nfd-wba-mt-8 nfd-wba-h-12 nfd-wba-font-medium sm:!nfd-wba-hidden",
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Select a category', 'nfd-wonder-blocks'),
    value: getActiveCategory(),
    options: formattedCategoriesForMobile,
    onChange: categoryTitle => handleCategoryChange(categoryTitle),
    __nextHasNoMarginBottom: true
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "nfd-wba-list-elements nfd-wba-m-0 nfd-wba-list-none nfd-wba-flex-col nfd-wba-px-0 nfd-wba-py-4 nfd-wba-text-md nfd-wba-leading-5 sm:nfd-wba-flex"
  }, filteredCategories?.map(category => {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ListElement__WEBPACK_IMPORTED_MODULE_10__["default"], {
      key: category.id,
      category: category,
      isActive: !keywordsFilter && category?.title === getActiveCategory(),
      onClick: () => {
        handleCategoryChange(category?.title);
      }
    });
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ListElement__WEBPACK_IMPORTED_MODULE_10__["default"], {
    className: "nfd-wba-list-element--favorites nfd-wba-mt-2 nfd-wba-border-0",
    category: {
      id: 'favorites',
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Favorites', 'nfd-wonder-blocks'),
      title: 'favorites',
      count: allFavs?.length
    },
    isActive: !keywordsFilter && getActiveCategory() === 'favorites',
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_12__["default"], {
      fill: "currentColor",
      className: "-nfd-wba-ml-1 nfd-wba-fill-red-600",
      icon: _Icons__WEBPACK_IMPORTED_MODULE_8__.heart,
      size: 16
    }),
    onClick: () => {
      handleCategoryChange('favorites');
    }
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.memo)(Categories));

/***/ }),

/***/ "./src/components/Modal/Sidebar/ErrorLoading.jsx":
/*!*******************************************************!*\
  !*** ./src/components/Modal/Sidebar/ErrorLoading.jsx ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const ErrorLoading = () => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "nfd-wba-m-0 nfd-wba-px-6 nfd-wba-pt-[5vh] nfd-wba-text-center"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Failed to load data.', 'nfd-wonder-blocks'));
};
/* harmony default export */ __webpack_exports__["default"] = (ErrorLoading);

/***/ }),

/***/ "./src/components/Modal/Sidebar/ListElement.jsx":
/*!******************************************************!*\
  !*** ./src/components/Modal/Sidebar/ListElement.jsx ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);

/**
 * WordPress dependencies
 */



/**
 * External dependencies
 */

const ListElement = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({
  category,
  className,
  icon,
  isActive,
  ...otherProps
}, ref) => {
  var _category$count;
  const categoryCount = (_category$count = category?.count) !== null && _category$count !== void 0 ? _category$count : null; // 0 is a valid count.

  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "nfd-wba-m-0 nfd-wba-p-0"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('nfd-wba-list-element nfd-wba-relative nfd-wba-flex nfd-wba-min-h-[48px] nfd-wba-w-full nfd-wba-select-none nfd-wba-items-center nfd-wba-justify-between nfd-wba-gap-x-2 nfd-wba-rounded-none nfd-wba-border-0 nfd-wba-bg-transparent nfd-wba-py-2 nfd-wba-pl-6 nfd-wba-text-base nfd-wba-transition-all nfd-wba-duration-100 focus-visible:nfd-wba-outline-brand', categoryCount !== null && 'nfd-wba-pr-4', categoryCount === null && 'nfd-wba-pr-6', !isActive && 'nfd-wba-cursor-pointer nfd-wba-text-current hover:nfd-wba-text-brand',
    // inactive
    isActive && 'nfd-wba--is-active nfd-wba-pointer-events-none nfd-wba-font-medium nfd-wba-text-brand',
    // active
    className),
    type: "button",
    ref: ref,
    ...otherProps
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "nfd-wba-flex nfd-wba-items-center nfd-wba-gap-3 nfd-wba-text-left"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, category?.label), icon && icon), categoryCount !== null && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('nfd-wba-px-[14px] nfd-wba-py-1 nfd-wba-text-sm nfd-wba-text-dark-lighter', category?.title !== 'favorites' && 'nfd-wba-rounded-full nfd-wba-bg-grey')
  }, categoryCount)));
});
/* harmony default export */ __webpack_exports__["default"] = (ListElement);
ListElement.displayName = 'ListElement';

/***/ }),

/***/ "./src/components/Modal/Sidebar/Sidebar.jsx":
/*!**************************************************!*\
  !*** ./src/components/Modal/Sidebar/Sidebar.jsx ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../store */ "./src/store/index.js");
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Logo */ "./src/components/Logo.jsx");
/* harmony import */ var _Categories__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Categories */ "./src/components/Modal/Sidebar/Categories.jsx");

/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */



const Sidebar = ({
  isSiteEditor = false
}) => {
  const {
    setActiveTab,
    setShouldResetKeywords
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);
  const {
    activeTab
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      activeTab: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getActiveTab()
    };
  });
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-mx-4 nfd-wba-mt-1 nfd-wba-flex nfd-wba-shrink-0 nfd-wba-flex-col nfd-wba-border-0 sm:nfd-wba-row-span-2 sm:nfd-wba-mx-0 sm:nfd-wba-mt-0 sm:nfd-wba-w-full sm:nfd-wba-overflow-y-auto sm:nfd-wba-border-r sm:nfd-wba-border-solid sm:nfd-wba-border-grey-b"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-modal__header nfd-wba-modal__sidebar-header nfd-wba-justify-center nfd-wba-rounded-t nfd-wba-border !nfd-wba-border-b-0 nfd-wba-border-solid nfd-wba-border-grey-b sm:nfd-wba-justify-start sm:nfd-wba-rounded-none sm:nfd-wba-border-none"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Logo__WEBPACK_IMPORTED_MODULE_6__["default"], null)), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TabPanel, {
    className: "nfd-wba-tab-panel nfd-wba-z-10 nfd-wba-flex nfd-wba-grow nfd-wba-flex-col",
    activeClass: "nfd-wba--is-active",
    initialTabName: activeTab,
    onSelect: tab => {
      setActiveTab(tab);
      setShouldResetKeywords(true);
    },
    tabs: [{
      name: 'patterns',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Patterns', 'nfd-wonder-blocks')
    }, {
      name: 'templates',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Templates', 'nfd-wonder-blocks')
    }]
  }, tab => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Categories__WEBPACK_IMPORTED_MODULE_7__["default"], {
    isSiteEditor: isSiteEditor,
    type: tab.name
  })));
};
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.memo)(Sidebar));

/***/ }),

/***/ "./src/components/Modal/Sidebar/Skeleton.jsx":
/*!***************************************************!*\
  !*** ./src/components/Modal/Sidebar/Skeleton.jsx ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SkeletonItem: function() { return /* binding */ SkeletonItem; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const Skeleton = ({
  count,
  minWidth = 40,
  maxWidth = 110
}) => {
  const items = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const result = [];
    for (let i = 0; i < count; i++) {
      const width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
      result.push((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SkeletonItem, {
        key: i,
        width: width
      }));
    }
    return result;
  }, [count, minWidth, maxWidth]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "nfd-wba-m-0 nfd-wba-hidden nfd-wba-list-none nfd-wba-flex-col nfd-wba-py-4 nfd-wba-pl-6 nfd-wba-pr-4 sm:nfd-wba-flex"
  }, items);
};
/* harmony default export */ __webpack_exports__["default"] = (Skeleton);
const SkeletonItem = ({
  width
}) => {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "nfd-wba-my-0 nfd-wba-flex nfd-wba-min-h-[43px] nfd-wba-items-center nfd-wba-justify-between"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "nfd-wba-skeleton--item nfd-wba-h-4 nfd-wba-rounded nfd-wba-bg-grey",
    style: {
      width: `${width}px`
    }
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "nfd-wba-skeleton--item nfd-wba-h-6 nfd-wba-w-8 nfd-wba-rounded-full nfd-wba-bg-grey"
  }));
};

/***/ }),

/***/ "./src/components/ToolbarButton.jsx":
/*!******************************************!*\
  !*** ./src/components/ToolbarButton.jsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/buttons.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers */ "./src/helpers/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../store */ "./src/store/index.js");

/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */



const ToolbarButton = () => {
  const {
    isModalOpen
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => ({
    isModalOpen: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).isModalOpen()
  }));
  const {
    setIsModalOpen
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_6__.store);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarButton, {
    icon: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"], {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_8__["default"]
    }),
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('nfd-wba-mr-2 nfd-wba-flex !nfd-wba-h-9 !nfd-wba-min-w-[36px] nfd-wba-shrink-0 nfd-wba-bg-brand !nfd-wba-p-0 nfd-wba-text-white hover:nfd-wba-bg-brand-darker hover:nfd-wba-text-white focus-visible:nfd-wba-text-white active:nfd-wba-bg-brand-darker-10 active:!nfd-wba-text-white lg:!nfd-wba-pl-3 lg:!nfd-wba-pr-[15px]', isModalOpen && '!nfd-wba-bg-dark nfd-wba-text-white'),
    isPressed: isModalOpen,
    onClick: () => {
      (0,_helpers__WEBPACK_IMPORTED_MODULE_5__.trackHiiveEvent)('modal_open', {
        label_key: 'trigger',
        trigger: 'toolbarButton'
      });
      setIsModalOpen(true);
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "nfd-wba-ml-0.5 nfd-wba-hidden lg:nfd-wba-inline"
  }, _constants__WEBPACK_IMPORTED_MODULE_4__.BRAND_NAME));
};
/* harmony default export */ __webpack_exports__["default"] = (ToolbarButton);

/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BRAND_NAME: function() { return /* binding */ BRAND_NAME; },
/* harmony export */   DEFAULT_ACTIVE_TAB: function() { return /* binding */ DEFAULT_ACTIVE_TAB; },
/* harmony export */   DEFAULT_PATTERNS_CATEGORY: function() { return /* binding */ DEFAULT_PATTERNS_CATEGORY; },
/* harmony export */   DEFAULT_TEMPLATES_CATEGORY: function() { return /* binding */ DEFAULT_TEMPLATES_CATEGORY; },
/* harmony export */   HIIVE_ANALYTICS_CATEGORY: function() { return /* binding */ HIIVE_ANALYTICS_CATEGORY; },
/* harmony export */   INPUT_DEBOUNCE_TIME: function() { return /* binding */ INPUT_DEBOUNCE_TIME; },
/* harmony export */   MIN_REQUIRED_WP_VERSION: function() { return /* binding */ MIN_REQUIRED_WP_VERSION; },
/* harmony export */   NFD_REST_URL: function() { return /* binding */ NFD_REST_URL; },
/* harmony export */   NFD_WONDER_BLOCKS_MODAL_ID: function() { return /* binding */ NFD_WONDER_BLOCKS_MODAL_ID; },
/* harmony export */   NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID: function() { return /* binding */ NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID; },
/* harmony export */   SITE_EDITOR_CATEGORIES: function() { return /* binding */ SITE_EDITOR_CATEGORIES; },
/* harmony export */   SUPPORT_URL: function() { return /* binding */ SUPPORT_URL; },
/* harmony export */   WONDER_BLOCKS_BLANK_TEMPLATE_SLUG: function() { return /* binding */ WONDER_BLOCKS_BLANK_TEMPLATE_SLUG; },
/* harmony export */   WP_REST_NAMESPACE: function() { return /* binding */ WP_REST_NAMESPACE; },
/* harmony export */   WP_VERSION: function() { return /* binding */ WP_VERSION; }
/* harmony export */ });
const BRAND_NAME = 'Wonder Blocks';
const WP_VERSION = window.nfdWonderBlocks?.wpVer || '';
const MIN_REQUIRED_WP_VERSION = '6.3.1';
const NFD_WONDER_BLOCKS_MODAL_ID = 'nfd-wba-modal';
const NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID = 'nfd-wba-toolbar-button';
const NFD_REST_URL = window.nfdWonderBlocks?.nfdRestURL || '';
const WP_REST_NAMESPACE = '/wp/v2';
const SUPPORT_URL = window.nfdWonderBlocks?.supportURL || '#';
const INPUT_DEBOUNCE_TIME = 800;
const SITE_EDITOR_CATEGORIES = ['header', 'footer'];
const DEFAULT_ACTIVE_TAB = 'patterns';
const DEFAULT_PATTERNS_CATEGORY = 'featured';
const DEFAULT_TEMPLATES_CATEGORY = 'featured';
const WONDER_BLOCKS_BLANK_TEMPLATE_SLUG = 'wonder-blocks-blank-template';
const HIIVE_ANALYTICS_CATEGORY = 'wonder_blocks';

/***/ }),

/***/ "./src/helpers/analytics.js":
/*!**********************************!*\
  !*** ./src/helpers/analytics.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   trackHiiveEvent: function() { return /* binding */ trackHiiveEvent; }
/* harmony export */ });
/* harmony import */ var _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @newfold-labs/js-utility-ui-analytics */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/index.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./src/constants.js");


const trackHiiveEvent = (action, data) => {
  data = {
    ...data,
    page: window.location.href // todo: check if this is what we want.
  };

  const hiiveEvent = new _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_0__.HiiveEvent(_constants__WEBPACK_IMPORTED_MODULE_1__.HIIVE_ANALYTICS_CATEGORY, action, data, _constants__WEBPACK_IMPORTED_MODULE_1__.HIIVE_ANALYTICS_CATEGORY);
  _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_0__.HiiveAnalytics.track(hiiveEvent);
};

/***/ }),

/***/ "./src/helpers/blockInserter.js":
/*!**************************************!*\
  !*** ./src/helpers/blockInserter.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockInserter: function() { return /* binding */ blockInserter; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/**
 * Insert blocks into the editor.
 *
 * @param {string} blocks Blocks to insert.
 * @return {Promise} Promise resolving the insertion.
 */
const blockInserter = blocks => {
  const {
    insertBlocks,
    replaceBlock
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('core/block-editor');
  const {
    getSelectedBlock,
    getBlockHierarchyRootClientId,
    getBlockIndex,
    getGlobalBlockCount
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/block-editor');
  const {
    clientId,
    name,
    attributes
  } = getSelectedBlock() || {};
  const rootClientId = clientId ? getBlockHierarchyRootClientId(clientId) : '';
  const insertionIndex = (rootClientId ? getBlockIndex(rootClientId) : getGlobalBlockCount()) + 1;

  // If currently selected block is an empty paragraph, replace it with the new blocks.
  if (name === 'core/paragraph' && attributes?.content === '') {
    return replaceBlock(clientId, blocks);
  }

  // Insert blocks below currently selected block.
  return insertBlocks(blocks, insertionIndex);
};

/***/ }),

/***/ "./src/helpers/fetcher.js":
/*!********************************!*\
  !*** ./src/helpers/fetcher.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetcher: function() { return /* binding */ fetcher; }
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Fetcher function for SWR.
 *
 * @param {...any} args
 * @return {Promise} Returns the response of the apiFetch function.
 */

const fetcher = ({
  ...args
}) => {
  const defaultOptions = {
    method: 'GET',
    headers: {
      'x-nfd-wonder-blocks': 'nfd_wonder_blocks'
    }
  };
  const mergedOptions = {
    ...defaultOptions,
    ...args
  };
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()(mergedOptions);
};

/***/ }),

/***/ "./src/helpers/index.js":
/*!******************************!*\
  !*** ./src/helpers/index.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   blockInserter: function() { return /* reexport safe */ _blockInserter__WEBPACK_IMPORTED_MODULE_1__.blockInserter; },
/* harmony export */   fetcher: function() { return /* reexport safe */ _fetcher__WEBPACK_IMPORTED_MODULE_2__.fetcher; },
/* harmony export */   optimizePreview: function() { return /* reexport safe */ _optimizePreview__WEBPACK_IMPORTED_MODULE_3__.optimizePreview; },
/* harmony export */   trackHiiveEvent: function() { return /* reexport safe */ _analytics__WEBPACK_IMPORTED_MODULE_0__.trackHiiveEvent; }
/* harmony export */ });
/* harmony import */ var _analytics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./analytics */ "./src/helpers/analytics.js");
/* harmony import */ var _blockInserter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./blockInserter */ "./src/helpers/blockInserter.js");
/* harmony import */ var _fetcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fetcher */ "./src/helpers/fetcher.js");
/* harmony import */ var _optimizePreview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./optimizePreview */ "./src/helpers/optimizePreview.js");





/***/ }),

/***/ "./src/helpers/optimizePreview.js":
/*!****************************************!*\
  !*** ./src/helpers/optimizePreview.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   optimizePreview: function() { return /* binding */ optimizePreview; }
/* harmony export */ });
/**
 * Optimize block pattern preview image size.
 *
 * @param {string} html Block HTML.
 * @return {string} Optimized block HTML.
 */
const optimizePreview = html => {
  return html.replace(/https?:\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-;]*)?/g, url => {
    const width = url.match(/w=(\d+)/);
    const height = url.match(/h=(\d+)/);
    const quality = url.match(/q=(\d+)/);
    let reducedUrl = url;

    // Reduce width by half.
    if (width) {
      const reducedWidth = Math.floor(Number(width[1]) / 2);
      reducedUrl = url.replace(`w=${width[1]}`, `w=${reducedWidth}`);
    }

    // Reduce height by half.
    if (height) {
      const reducedHeight = Math.floor(Number(height[1]) / 2);
      reducedUrl = reducedUrl.replace(`h=${height[1]}`, `h=${reducedHeight}`);
    }

    // Set quality to 50.
    if (quality) {
      reducedUrl = reducedUrl.replace(`${quality[0]}`, 'q=50');
    }
    return reducedUrl;
  });
};

/***/ }),

/***/ "./src/hooks/index.js":
/*!****************************!*\
  !*** ./src/hooks/index.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useCategories: function() { return /* reexport safe */ _useCategories__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   usePatterns: function() { return /* reexport safe */ _usePatterns__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   useReplacePlaceholders: function() { return /* reexport safe */ _useReplacePlaceholders__WEBPACK_IMPORTED_MODULE_2__["default"]; }
/* harmony export */ });
/* harmony import */ var _usePatterns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./usePatterns */ "./src/hooks/usePatterns.js");
/* harmony import */ var _useCategories__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useCategories */ "./src/hooks/useCategories.js");
/* harmony import */ var _useReplacePlaceholders__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./useReplacePlaceholders */ "./src/hooks/useReplacePlaceholders.js");




/***/ }),

/***/ "./src/hooks/useCategories.js":
/*!************************************!*\
  !*** ./src/hooks/useCategories.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swr */ "./node_modules/swr/core/dist/index.mjs");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
/* harmony import */ var _helpers_fetcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/fetcher */ "./src/helpers/fetcher.js");
/**
 * External dependencies
 */


/**
 * Internal dependencies
 */


const useCategories = (type = 'patterns') => {
  const endpoint = type === 'patterns' ? 'categories' : 'templateCategories';
  const {
    data,
    error,
    isValidating
  } = (0,swr__WEBPACK_IMPORTED_MODULE_0__["default"])({
    url: `${_constants__WEBPACK_IMPORTED_MODULE_1__.NFD_REST_URL}/${endpoint}`
  }, _helpers_fetcher__WEBPACK_IMPORTED_MODULE_2__.fetcher);
  if (!Array.isArray(data)) {
    return {
      data: null,
      isError: error,
      isValidating
    };
  }
  return {
    data,
    isError: error,
    isValidating
  };
};
/* harmony default export */ __webpack_exports__["default"] = (useCategories);

/***/ }),

/***/ "./src/hooks/useMonitorBlockOrder.js":
/*!*******************************************!*\
  !*** ./src/hooks/useMonitorBlockOrder.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);



// Custom Hook for monitoring block order in a WordPress Gutenberg block editor.
const useMonitorBlockOrder = () => {
  // Fetch all blocks from Gutenberg's block editor.
  const allBlocks = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => select('core/block-editor').getBlocks(), []);

  // Use an effect to monitor changes to the block order.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    document.dispatchEvent(new CustomEvent('wonder-blocks/block-order-changed'));
  }, [allBlocks]); // Re-run if `allBlocks` changes.
};

/* harmony default export */ __webpack_exports__["default"] = (useMonitorBlockOrder);

/***/ }),

/***/ "./src/hooks/usePatterns.js":
/*!**********************************!*\
  !*** ./src/hooks/usePatterns.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var swr_infinite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! swr/infinite */ "./node_modules/swr/infinite/dist/index.mjs");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
/* harmony import */ var _helpers_fetcher__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/fetcher */ "./src/helpers/fetcher.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../store */ "./src/store/index.js");
/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */




/**
 * Custom hook to fetch patterns.
 *
 * @param {Object}  params               - Object containing the parameters.
 * @param {boolean} params.onlyFavorites - Whether to fetch only favorites.
 * @param {number}  params.perPage       - Number of items per page.
 * @return {Object} Object containing the patterns, error and loading state.
 */
const usePatterns = ({
  onlyFavorites = false,
  perPage = 4
} = {}) => {
  const {
    activePatternsCategory,
    activeTemplatesCategory,
    activeTab,
    keywords
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => ({
    activePatternsCategory: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getActivePatternsCategory(),
    activeTemplatesCategory: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getActiveTemplatesCategory(),
    activeTab: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getActiveTab(),
    keywords: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getKeywordsFilter()
  }));

  // Active category.
  let activeCategory = null;
  if (activeTab === 'patterns') {
    activeCategory = activePatternsCategory || _constants__WEBPACK_IMPORTED_MODULE_3__.DEFAULT_PATTERNS_CATEGORY;
  } else {
    activeCategory = activeTemplatesCategory || _constants__WEBPACK_IMPORTED_MODULE_3__.DEFAULT_TEMPLATES_CATEGORY;
  }

  // Can be either "patterns" or "templates".
  const endpoint = activeTab === 'patterns' ? 'patterns' : 'templates';
  let url = null;
  let restUrl = '';

  // Check if NFD_REST_URL starts with http or https.
  if (typeof _constants__WEBPACK_IMPORTED_MODULE_3__.NFD_REST_URL === 'string' && _constants__WEBPACK_IMPORTED_MODULE_3__.NFD_REST_URL.startsWith('http')) {
    restUrl = _constants__WEBPACK_IMPORTED_MODULE_3__.NFD_REST_URL;
  } else {
    // if not, assume it's a relative path.
    restUrl = window.location.origin + _constants__WEBPACK_IMPORTED_MODULE_3__.NFD_REST_URL;
  }
  if (onlyFavorites || activeCategory === 'favorites' && !keywords) {
    url = new URL(`${restUrl}/favorites`);
  } else {
    url = new URL(`${restUrl}/${endpoint}`);
    if (keywords) {
      url.searchParams.append('keywords', keywords);
    } else {
      url.searchParams.append('category', activeCategory);
    }
  }
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) {
      return null;
    }
    if (perPage > 0) {
      url.searchParams.set('page', pageIndex + 1);
      url.searchParams.set('per_page', perPage);
    }
    return {
      url: url.href
    };
  };
  const {
    data,
    error,
    isValidating,
    mutate,
    size,
    setSize
  } = (0,swr_infinite__WEBPACK_IMPORTED_MODULE_0__["default"])(getKey, _helpers_fetcher__WEBPACK_IMPORTED_MODULE_4__.fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    errorRetryCount: 3,
    dedupingInterval: 5000
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    let dataWithType = null;
    const items = data ? [].concat(...data) : [];
    if (items && Array.isArray(items)) {
      dataWithType = items?.map(pattern => {
        return {
          ...pattern,
          type: endpoint
        };
      });
    }
    return {
      data: activeCategory !== 'favorites' ? dataWithType : items,
      hasMore: data && data[data.length - 1]?.length === perPage,
      isError: error,
      isValidating,
      isFavorites: activeCategory !== 'favorites' || keywords ? false : true,
      mutate,
      size,
      setSize
    };
  }, [data, activeCategory, perPage, error, isValidating, keywords, mutate, size, setSize, endpoint]);
};
/* harmony default export */ __webpack_exports__["default"] = (usePatterns);

/***/ }),

/***/ "./src/hooks/useReplacePlaceholders.js":
/*!*********************************************!*\
  !*** ./src/hooks/useReplacePlaceholders.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies
 */


/**
 * `useReplacePlaceholders` is a custom hook that returns a memoized function
 * to replace placeholders within a given string.
 *
 * The placeholders are specified like Record<string, string>.
 *
 * @example
 * const replace = useReplacePlaceholders();
 * replace('Hello name!', { name: 'World' }); // Returns "Hello World!"
 *
 * @return {Function} - The memoized replace function.
 */
const useReplacePlaceholders = () => {
  const replace = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((str = '', placeholders = {}) => {
    let result = str;
    Object.keys(placeholders).forEach(key => {
      if (typeof placeholders[key] === 'string') {
        result = result.replaceAll(key, placeholders[key]);
      }
    });
    return result;
  }, []);
  return replace;
};
/* harmony default export */ __webpack_exports__["default"] = (useReplacePlaceholders);

/***/ }),

/***/ "./src/store/actions.js":
/*!******************************!*\
  !*** ./src/store/actions.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setActivePatternsCategory: function() { return /* binding */ setActivePatternsCategory; },
/* harmony export */   setActiveTab: function() { return /* binding */ setActiveTab; },
/* harmony export */   setActiveTemplatesCategory: function() { return /* binding */ setActiveTemplatesCategory; },
/* harmony export */   setIsContentLoading: function() { return /* binding */ setIsContentLoading; },
/* harmony export */   setIsModalOpen: function() { return /* binding */ setIsModalOpen; },
/* harmony export */   setIsSidebarLoading: function() { return /* binding */ setIsSidebarLoading; },
/* harmony export */   setKeywordsFilter: function() { return /* binding */ setKeywordsFilter; },
/* harmony export */   setShouldResetKeywords: function() { return /* binding */ setShouldResetKeywords; }
/* harmony export */ });
/**
 * Toggles the patterns modal.
 *
 * @param {boolean} isOpen Modal open state.
 * @return {Object} Action object.
 */
function setIsModalOpen(isOpen) {
  return {
    type: 'SET_MODAL_OPEN',
    isOpen
  };
}

/**
 * Sets content loading state.
 *
 * @param {boolean} isContentLoading Loading state.
 * @return {Object} Action object.
 */
function setIsContentLoading(isContentLoading) {
  return {
    type: 'SET_CONTENT_LOADING',
    isContentLoading
  };
}

/**
 * Sets sidebar loading state.
 *
 * @param {boolean} isSidebarLoading Loading state.
 * @return {Object} Action object.
 */
function setIsSidebarLoading(isSidebarLoading) {
  return {
    type: 'SET_SIDEBAR_LOADING',
    isSidebarLoading
  };
}

/**
 * Sets the active patterns category.
 *
 * @param {string} activeCategory Active category.
 * @return {Object} Action object.
 */
function setActivePatternsCategory(activeCategory) {
  return {
    type: 'SET_ACTIVE_PATTERNS_CATEGORY',
    activeCategory
  };
}

/**
 * Sets the active templates category.
 *
 * @param {string} activeCategory Active category.
 * @return {Object} Action object.
 */
function setActiveTemplatesCategory(activeCategory) {
  return {
    type: 'SET_ACTIVE_TEMPLATES_CATEGORY',
    activeCategory
  };
}

/**
 * Sets keywords filter value.
 *
 * @param {string} keywordsFilter Keywords to filter by.
 * @return {Object} Action object.
 */
function setKeywordsFilter(keywordsFilter) {
  return {
    type: 'SET_KEYWORDS_FILTER',
    keywordsFilter
  };
}

/**
 * Sets if keywords filter should be reset.
 *
 * @param {boolean} shouldResetKeywords Should reset keywords filter.
 * @return {Object} Action object.
 */
function setShouldResetKeywords(shouldResetKeywords) {
  return {
    type: 'SET_SHOULD_RESET_KEYWORDS',
    shouldResetKeywords
  };
}

/**
 * Set active tab in sidebar modal.
 *
 * @param {string} activeTab Active tab.
 * @return {Object} Action object.
 */
function setActiveTab(activeTab) {
  return {
    type: 'SET_ACTIVE_TAB',
    activeTab
  };
}

/***/ }),

/***/ "./src/store/constants.js":
/*!********************************!*\
  !*** ./src/store/constants.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STORE_NAME: function() { return /* binding */ STORE_NAME; }
/* harmony export */ });
/**
 * Identifier for Newfold Wonder Blocks data store.
 *
 * @type {string}
 */
const STORE_NAME = 'newfold/wonder-blocks';

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   nfdWonderBlocksStoreOptions: function() { return /* binding */ nfdWonderBlocksStoreOptions; },
/* harmony export */   store: function() { return /* binding */ store; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/store/constants.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions */ "./src/store/actions.js");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./selectors */ "./src/store/selectors.js");
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reducer */ "./src/store/reducer.js");





const nfdWonderBlocksStoreOptions = {
  reducer: _reducer__WEBPACK_IMPORTED_MODULE_4__["default"],
  actions: _actions__WEBPACK_IMPORTED_MODULE_2__,
  selectors: _selectors__WEBPACK_IMPORTED_MODULE_3__
};
const store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)(_constants__WEBPACK_IMPORTED_MODULE_1__.STORE_NAME, nfdWonderBlocksStoreOptions);
(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(store);

/***/ }),

/***/ "./src/store/reducer.js":
/*!******************************!*\
  !*** ./src/store/reducer.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   modal: function() { return /* binding */ modal; },
/* harmony export */   patterns: function() { return /* binding */ patterns; },
/* harmony export */   templates: function() { return /* binding */ templates; }
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */

function modal(state = {
  isOpen: false,
  isContentLoading: false,
  keywordsFilter: '',
  activeTab: _constants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_ACTIVE_TAB
}, action) {
  switch (action.type) {
    case 'SET_MODAL_OPEN':
      return {
        ...state,
        isOpen: action.isOpen
      };
    case 'SET_SIDEBAR_LOADING':
      return {
        ...state,
        isSidebarLoading: action.isSidebarLoading
      };
    case 'SET_CONTENT_LOADING':
      return {
        ...state,
        isContentLoading: action.isContentLoading
      };
    case 'SET_KEYWORDS_FILTER':
      return {
        ...state,
        keywordsFilter: action.keywordsFilter
      };
    case 'SET_SHOULD_RESET_KEYWORDS':
      return {
        ...state,
        shouldResetKeywords: !!action.shouldResetKeywords
      };
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.activeTab
      };
  }
  return state;
}
function patterns(state = {
  activeCategory: _constants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_PATTERNS_CATEGORY
}, action) {
  switch (action.type) {
    case 'SET_ACTIVE_PATTERNS_CATEGORY':
      return {
        ...state,
        activeCategory: action.activeCategory
      };
  }
  return state;
}
function templates(state = {
  activeCategory: _constants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_TEMPLATES_CATEGORY
}, action) {
  switch (action.type) {
    case 'SET_ACTIVE_TEMPLATES_CATEGORY':
      return {
        ...state,
        activeCategory: action.activeCategory
      };
  }
  return state;
}
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.combineReducers)({
  modal,
  patterns,
  templates
}));

/***/ }),

/***/ "./src/store/selectors.js":
/*!********************************!*\
  !*** ./src/store/selectors.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getActivePatternsCategory: function() { return /* binding */ getActivePatternsCategory; },
/* harmony export */   getActiveTab: function() { return /* binding */ getActiveTab; },
/* harmony export */   getActiveTemplatesCategory: function() { return /* binding */ getActiveTemplatesCategory; },
/* harmony export */   getKeywordsFilter: function() { return /* binding */ getKeywordsFilter; },
/* harmony export */   isContentLoading: function() { return /* binding */ isContentLoading; },
/* harmony export */   isModalOpen: function() { return /* binding */ isModalOpen; },
/* harmony export */   isSidebarLoading: function() { return /* binding */ isSidebarLoading; },
/* harmony export */   shouldResetKeywords: function() { return /* binding */ shouldResetKeywords; }
/* harmony export */ });
/**
 * Checks if the patterns modal is open.
 *
 * @param {*} state
 * @return {boolean} True if the modal is open, false otherwise.
 */
function isModalOpen(state) {
  return state.modal.isOpen;
}

/**
 * Checks if sidebar is loading.
 *
 * @param {*} state
 * @return {boolean} True if the sidebar/categories is loading, false otherwise.
 */
function isSidebarLoading(state) {
  return state.modal.isSidebarLoading;
}

/**
 * Checks if content is loading.
 *
 * @param {*} state
 * @return {boolean} True if the content is loading, false otherwise.
 */
function isContentLoading(state) {
  return state.modal.isContentLoading;
}

/**
 * Gets keywords filter value.
 *
 * @param {*} state
 * @return {string} The keywords filter value.
 */
function getKeywordsFilter(state) {
  return state.modal.keywordsFilter;
}

/**
 * Gets if keywords should be reset.
 *
 * @param {*} state
 * @return {boolean} Should reset keywords.
 */
function shouldResetKeywords(state) {
  return state.modal.shouldResetKeywords;
}

/**
 * Get active tab in sidebar.
 *
 * @param {*} state
 * @return {string} The active tab.
 */
function getActiveTab(state) {
  return state.modal.activeTab;
}

/**
 * Gets the active patterns category.
 *
 * @param {*} state
 * @return {string} The active pattern category.
 */
function getActivePatternsCategory(state) {
  return state.patterns.activeCategory;
}

/**
 * Gets the active templates category.
 *
 * @param {*} state
 * @return {string} The active templates category.
 */
function getActiveTemplatesCategory(state) {
  return state.templates.activeCategory;
}

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;
	var nativeCodeString = '[native code]';

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					classes.push(arg.toString());
					continue;
				}

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/client-only/index.js":
/*!*******************************************!*\
  !*** ./node_modules/client-only/index.js ***!
  \*******************************************/
/***/ (function() {



/***/ }),

/***/ "./node_modules/compare-versions/lib/esm/compare.js":
/*!**********************************************************!*\
  !*** ./node_modules/compare-versions/lib/esm/compare.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compare: function() { return /* binding */ compare; }
/* harmony export */ });
/* harmony import */ var _compareVersions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./compareVersions */ "./node_modules/compare-versions/lib/esm/compareVersions.js");

/**
 * Compare [semver](https://semver.org/) version strings using the specified operator.
 *
 * @param v1 First version to compare
 * @param v2 Second version to compare
 * @param operator Allowed arithmetic operator to use
 * @returns `true` if the comparison between the firstVersion and the secondVersion satisfies the operator, `false` otherwise.
 *
 * @example
 * ```
 * compare('10.1.8', '10.0.4', '>'); // return true
 * compare('10.0.1', '10.0.1', '='); // return true
 * compare('10.1.1', '10.2.2', '<'); // return true
 * compare('10.1.1', '10.2.2', '<='); // return true
 * compare('10.1.1', '10.2.2', '>='); // return false
 * ```
 */
const compare = (v1, v2, operator) => {
    // validate input operator
    assertValidOperator(operator);
    // since result of compareVersions can only be -1 or 0 or 1
    // a simple map can be used to replace switch
    const res = (0,_compareVersions__WEBPACK_IMPORTED_MODULE_0__.compareVersions)(v1, v2);
    return operatorResMap[operator].includes(res);
};
const operatorResMap = {
    '>': [1],
    '>=': [0, 1],
    '=': [0],
    '<=': [-1, 0],
    '<': [-1],
    '!=': [-1, 1],
};
const allowedOperators = Object.keys(operatorResMap);
const assertValidOperator = (op) => {
    if (typeof op !== 'string') {
        throw new TypeError(`Invalid operator type, expected string but got ${typeof op}`);
    }
    if (allowedOperators.indexOf(op) === -1) {
        throw new Error(`Invalid operator, expected one of ${allowedOperators.join('|')}`);
    }
};
//# sourceMappingURL=compare.js.map

/***/ }),

/***/ "./node_modules/compare-versions/lib/esm/compareVersions.js":
/*!******************************************************************!*\
  !*** ./node_modules/compare-versions/lib/esm/compareVersions.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compareVersions: function() { return /* binding */ compareVersions; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./node_modules/compare-versions/lib/esm/utils.js");

/**
 * Compare [semver](https://semver.org/) version strings to find greater, equal or lesser.
 * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
 * @param v1 - First version to compare
 * @param v2 - Second version to compare
 * @returns Numeric value compatible with the [Array.sort(fn) interface](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters).
 */
const compareVersions = (v1, v2) => {
    // validate input and split into segments
    const n1 = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.validateAndParse)(v1);
    const n2 = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.validateAndParse)(v2);
    // pop off the patch
    const p1 = n1.pop();
    const p2 = n2.pop();
    // validate numbers
    const r = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.compareSegments)(n1, n2);
    if (r !== 0)
        return r;
    // validate pre-release
    if (p1 && p2) {
        return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.compareSegments)(p1.split('.'), p2.split('.'));
    }
    else if (p1 || p2) {
        return p1 ? -1 : 1;
    }
    return 0;
};
//# sourceMappingURL=compareVersions.js.map

/***/ }),

/***/ "./node_modules/compare-versions/lib/esm/utils.js":
/*!********************************************************!*\
  !*** ./node_modules/compare-versions/lib/esm/utils.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compareSegments: function() { return /* binding */ compareSegments; },
/* harmony export */   semver: function() { return /* binding */ semver; },
/* harmony export */   validateAndParse: function() { return /* binding */ validateAndParse; }
/* harmony export */ });
const semver = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
const validateAndParse = (version) => {
    if (typeof version !== 'string') {
        throw new TypeError('Invalid argument expected string');
    }
    const match = version.match(semver);
    if (!match) {
        throw new Error(`Invalid argument not valid semver ('${version}' received)`);
    }
    match.shift();
    return match;
};
const isWildcard = (s) => s === '*' || s === 'x' || s === 'X';
const tryParse = (v) => {
    const n = parseInt(v, 10);
    return isNaN(n) ? v : n;
};
const forceType = (a, b) => typeof a !== typeof b ? [String(a), String(b)] : [a, b];
const compareStrings = (a, b) => {
    if (isWildcard(a) || isWildcard(b))
        return 0;
    const [ap, bp] = forceType(tryParse(a), tryParse(b));
    if (ap > bp)
        return 1;
    if (ap < bp)
        return -1;
    return 0;
};
const compareSegments = (a, b) => {
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
        const r = compareStrings(a[i] || '0', b[i] || '0');
        if (r !== 0)
            return r;
    }
    return 0;
};
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/lodash/_Symbol.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_Symbol.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "./node_modules/lodash/_baseGetTag.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseGetTag.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "./node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "./node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "./node_modules/lodash/_baseTrim.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_baseTrim.js ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var trimmedEndIndex = __webpack_require__(/*! ./_trimmedEndIndex */ "./node_modules/lodash/_trimmedEndIndex.js");

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

module.exports = baseTrim;


/***/ }),

/***/ "./node_modules/lodash/_freeGlobal.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_freeGlobal.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ }),

/***/ "./node_modules/lodash/_getRawTag.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_getRawTag.js ***!
  \*******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "./node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "./node_modules/lodash/_objectToString.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_objectToString.js ***!
  \************************************************/
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "./node_modules/lodash/_root.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/_root.js ***!
  \**************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "./node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "./node_modules/lodash/_trimmedEndIndex.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_trimmedEndIndex.js ***!
  \*************************************************/
/***/ (function(module) {

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

module.exports = trimmedEndIndex;


/***/ }),

/***/ "./node_modules/lodash/debounce.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/debounce.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    now = __webpack_require__(/*! ./now */ "./node_modules/lodash/now.js"),
    toNumber = __webpack_require__(/*! ./toNumber */ "./node_modules/lodash/toNumber.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ "./node_modules/lodash/isObject.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isObject.js ***!
  \*****************************************/
/***/ (function(module) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "./node_modules/lodash/isObjectLike.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/isObjectLike.js ***!
  \*********************************************/
/***/ (function(module) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "./node_modules/lodash/isSymbol.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/isSymbol.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "./node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "./node_modules/lodash/now.js":
/*!************************************!*\
  !*** ./node_modules/lodash/now.js ***!
  \************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "./node_modules/lodash/_root.js");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "./node_modules/lodash/toNumber.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/toNumber.js ***!
  \*****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseTrim = __webpack_require__(/*! ./_baseTrim */ "./node_modules/lodash/_baseTrim.js"),
    isObject = __webpack_require__(/*! ./isObject */ "./node_modules/lodash/isObject.js"),
    isSymbol = __webpack_require__(/*! ./isSymbol */ "./node_modules/lodash/isSymbol.js");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ "./src/styles/app.scss":
/*!*****************************!*\
  !*** ./src/styles/app.scss ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/react-masonry-css/dist/react-masonry-css.module.js":
/*!*************************************************************************!*\
  !*** ./node_modules/react-masonry-css/dist/react-masonry-css.module.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const defaultProps = {
  breakpointCols: undefined,
  // optional, number or object { default: number, [key: number]: number }
  className: undefined,
  // required, string
  columnClassName: undefined,
  // optional, string
  // Any React children. Typically an array of JSX items
  children: undefined,
  // Custom attributes, however it is advised against
  // using these to prevent unintended issues and future conflicts
  // ...any other attribute, will be added to the container
  columnAttrs: undefined,
  // object, added to the columns
  // Deprecated props
  // The column property is deprecated.
  // It is an alias of the `columnAttrs` property
  column: undefined
};
const DEFAULT_COLUMNS = 2;

class Masonry extends (react__WEBPACK_IMPORTED_MODULE_0___default().Component) {
  constructor(props) {
    super(props); // Correct scope for when methods are accessed externally

    this.reCalculateColumnCount = this.reCalculateColumnCount.bind(this);
    this.reCalculateColumnCountDebounce = this.reCalculateColumnCountDebounce.bind(this); // default state

    let columnCount;

    if (this.props.breakpointCols && this.props.breakpointCols.default) {
      columnCount = this.props.breakpointCols.default;
    } else {
      columnCount = parseInt(this.props.breakpointCols) || DEFAULT_COLUMNS;
    }

    this.state = {
      columnCount
    };
  }

  componentDidMount() {
    this.reCalculateColumnCount(); // window may not be available in some environments

    if (window) {
      window.addEventListener('resize', this.reCalculateColumnCountDebounce);
    }
  }

  componentDidUpdate() {
    this.reCalculateColumnCount();
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('resize', this.reCalculateColumnCountDebounce);
    }
  }

  reCalculateColumnCountDebounce() {
    if (!window || !window.requestAnimationFrame) {
      // IE10+
      this.reCalculateColumnCount();
      return;
    }

    if (window.cancelAnimationFrame) {
      // IE10+
      window.cancelAnimationFrame(this._lastRecalculateAnimationFrame);
    }

    this._lastRecalculateAnimationFrame = window.requestAnimationFrame(() => {
      this.reCalculateColumnCount();
    });
  }

  reCalculateColumnCount() {
    const windowWidth = window && window.innerWidth || Infinity;
    let breakpointColsObject = this.props.breakpointCols; // Allow passing a single number to `breakpointCols` instead of an object

    if (typeof breakpointColsObject !== 'object') {
      breakpointColsObject = {
        default: parseInt(breakpointColsObject) || DEFAULT_COLUMNS
      };
    }

    let matchedBreakpoint = Infinity;
    let columns = breakpointColsObject.default || DEFAULT_COLUMNS;

    for (let breakpoint in breakpointColsObject) {
      const optBreakpoint = parseInt(breakpoint);
      const isCurrentBreakpoint = optBreakpoint > 0 && windowWidth <= optBreakpoint;

      if (isCurrentBreakpoint && optBreakpoint < matchedBreakpoint) {
        matchedBreakpoint = optBreakpoint;
        columns = breakpointColsObject[breakpoint];
      }
    }

    columns = Math.max(1, parseInt(columns) || 1);

    if (this.state.columnCount !== columns) {
      this.setState({
        columnCount: columns
      });
    }
  }

  itemsInColumns() {
    const currentColumnCount = this.state.columnCount;
    const itemsInColumns = new Array(currentColumnCount); // Force children to be handled as an array

    const items = react__WEBPACK_IMPORTED_MODULE_0___default().Children.toArray(this.props.children);

    for (let i = 0; i < items.length; i++) {
      const columnIndex = i % currentColumnCount;

      if (!itemsInColumns[columnIndex]) {
        itemsInColumns[columnIndex] = [];
      }

      itemsInColumns[columnIndex].push(items[i]);
    }

    return itemsInColumns;
  }

  renderColumns() {
    const {
      column,
      columnAttrs = {},
      columnClassName
    } = this.props;
    const childrenInColumns = this.itemsInColumns();
    const columnWidth = `${100 / childrenInColumns.length}%`;
    let className = columnClassName;

    if (className && typeof className !== 'string') {
      this.logDeprecated('The property "columnClassName" requires a string'); // This is a deprecated default and will be removed soon.

      if (typeof className === 'undefined') {
        className = 'my-masonry-grid_column';
      }
    }

    const columnAttributes = _objectSpread(_objectSpread(_objectSpread({}, column), columnAttrs), {}, {
      style: _objectSpread(_objectSpread({}, columnAttrs.style), {}, {
        width: columnWidth
      }),
      className
    });

    return childrenInColumns.map((items, i) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", _extends({}, columnAttributes, {
        key: i
      }), items);
    });
  }

  logDeprecated(message) {
    console.error('[Masonry]', message);
  }

  render() {
    const _this$props = this.props,
          {
      // ignored
      children,
      breakpointCols,
      columnClassName,
      columnAttrs,
      column,
      // used
      className
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, ["children", "breakpointCols", "columnClassName", "columnAttrs", "column", "className"]);

    let classNameOutput = className;

    if (typeof className !== 'string') {
      this.logDeprecated('The property "className" requires a string'); // This is a deprecated default and will be removed soon.

      if (typeof className === 'undefined') {
        classNameOutput = 'my-masonry-grid';
      }
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", _extends({}, rest, {
      className: classNameOutput
    }), this.renderColumns());
  }

}

Masonry.defaultProps = defaultProps;

/* harmony default export */ __webpack_exports__["default"] = (Masonry);


/***/ }),

/***/ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js ***!
  \**********************************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {

          'use strict';

/* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
}
          var React = __webpack_require__(/*! react */ "react");

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    } // eslint-disable-next-line react-internal/safe-string-coercion


    var argsWithFormat = args.map(function (item) {
      return String(item);
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y // eslint-disable-line no-self-compare
  ;
}

var objectIs = typeof Object.is === 'function' ? Object.is : is;

// dispatch for CommonJS interop named imports.

var useState = React.useState,
    useEffect = React.useEffect,
    useLayoutEffect = React.useLayoutEffect,
    useDebugValue = React.useDebugValue;
var didWarnOld18Alpha = false;
var didWarnUncachedGetSnapshot = false; // Disclaimer: This shim breaks many of the rules of React, and only works
// because of a very particular set of implementation details and assumptions
// -- change any one of them and it will break. The most important assumption
// is that updates are always synchronous, because concurrent rendering is
// only available in versions of React that also have a built-in
// useSyncExternalStore API. And we only use this shim when the built-in API
// does not exist.
//
// Do not assume that the clever hacks used by this hook also work in general.
// The point of this shim is to replace the need for hacks by other libraries.

function useSyncExternalStore(subscribe, getSnapshot, // Note: The shim does not use getServerSnapshot, because pre-18 versions of
// React do not expose a way to check if we're hydrating. So users of the shim
// will need to track that themselves and return the correct value
// from `getSnapshot`.
getServerSnapshot) {
  {
    if (!didWarnOld18Alpha) {
      if (React.startTransition !== undefined) {
        didWarnOld18Alpha = true;

        error('You are using an outdated, pre-release alpha of React 18 that ' + 'does not support useSyncExternalStore. The ' + 'use-sync-external-store shim will not work correctly. Upgrade ' + 'to a newer pre-release.');
      }
    }
  } // Read the current snapshot from the store on every render. Again, this
  // breaks the rules of React, and only works here because of specific
  // implementation details, most importantly that updates are
  // always synchronous.


  var value = getSnapshot();

  {
    if (!didWarnUncachedGetSnapshot) {
      var cachedValue = getSnapshot();

      if (!objectIs(value, cachedValue)) {
        error('The result of getSnapshot should be cached to avoid an infinite loop');

        didWarnUncachedGetSnapshot = true;
      }
    }
  } // Because updates are synchronous, we don't queue them. Instead we force a
  // re-render whenever the subscribed state changes by updating an some
  // arbitrary useState hook. Then, during render, we call getSnapshot to read
  // the current value.
  //
  // Because we don't actually use the state returned by the useState hook, we
  // can save a bit of memory by storing other stuff in that slot.
  //
  // To implement the early bailout, we need to track some things on a mutable
  // object. Usually, we would put that in a useRef hook, but we can stash it in
  // our useState hook instead.
  //
  // To force a re-render, we call forceUpdate({inst}). That works because the
  // new object always fails an equality check.


  var _useState = useState({
    inst: {
      value: value,
      getSnapshot: getSnapshot
    }
  }),
      inst = _useState[0].inst,
      forceUpdate = _useState[1]; // Track the latest getSnapshot function with a ref. This needs to be updated
  // in the layout phase so we can access it during the tearing check that
  // happens on subscribe.


  useLayoutEffect(function () {
    inst.value = value;
    inst.getSnapshot = getSnapshot; // Whenever getSnapshot or subscribe changes, we need to check in the
    // commit phase if there was an interleaved mutation. In concurrent mode
    // this can happen all the time, but even in synchronous mode, an earlier
    // effect may have mutated the store.

    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst: inst
      });
    }
  }, [subscribe, value, getSnapshot]);
  useEffect(function () {
    // Check for changes right before subscribing. Subsequent changes will be
    // detected in the subscription handler.
    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceUpdate({
        inst: inst
      });
    }

    var handleStoreChange = function () {
      // TODO: Because there is no cross-renderer API for batching updates, it's
      // up to the consumer of this library to wrap their subscription event
      // with unstable_batchedUpdates. Should we try to detect when this isn't
      // the case and print a warning in development?
      // The store changed. Check if the snapshot changed since the last time we
      // read from the store.
      if (checkIfSnapshotChanged(inst)) {
        // Force a re-render.
        forceUpdate({
          inst: inst
        });
      }
    }; // Subscribe to the store and return a clean-up function.


    return subscribe(handleStoreChange);
  }, [subscribe]);
  useDebugValue(value);
  return value;
}

function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  var prevValue = inst.value;

  try {
    var nextValue = latestGetSnapshot();
    return !objectIs(prevValue, nextValue);
  } catch (error) {
    return true;
  }
}

function useSyncExternalStore$1(subscribe, getSnapshot, getServerSnapshot) {
  // Note: The shim does not use getServerSnapshot, because pre-18 versions of
  // React do not expose a way to check if we're hydrating. So users of the shim
  // will need to track that themselves and return the correct value
  // from `getSnapshot`.
  return getSnapshot();
}

var canUseDOM = !!(typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined');

var isServerEnvironment = !canUseDOM;

var shim = isServerEnvironment ? useSyncExternalStore$1 : useSyncExternalStore;
var useSyncExternalStore$2 = React.useSyncExternalStore !== undefined ? React.useSyncExternalStore : shim;

exports.useSyncExternalStore = useSyncExternalStore$2;
          /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
if (
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' &&
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop ===
    'function'
) {
  __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
}
        
  })();
}


/***/ }),

/***/ "./node_modules/use-sync-external-store/shim/index.js":
/*!************************************************************!*\
  !*** ./node_modules/use-sync-external-store/shim/index.js ***!
  \************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ../cjs/use-sync-external-store-shim.development.js */ "./node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js");
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/editor":
/*!********************************!*\
  !*** external ["wp","editor"] ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["editor"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/notices":
/*!*********************************!*\
  !*** external ["wp","notices"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["notices"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["url"];

/***/ }),

/***/ "./node_modules/react-intersection-observer/index.mjs":
/*!************************************************************!*\
  !*** ./node_modules/react-intersection-observer/index.mjs ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InView: function() { return /* binding */ InView; },
/* harmony export */   defaultFallbackInView: function() { return /* binding */ defaultFallbackInView; },
/* harmony export */   observe: function() { return /* binding */ observe; },
/* harmony export */   useInView: function() { return /* binding */ useInView; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/InView.tsx


// src/observe.ts
var observerMap = /* @__PURE__ */ new Map();
var RootIds = /* @__PURE__ */ new WeakMap();
var rootId = 0;
var unsupportedValue = void 0;
function defaultFallbackInView(inView) {
  unsupportedValue = inView;
}
function getRootId(root) {
  if (!root)
    return "0";
  if (RootIds.has(root))
    return RootIds.get(root);
  rootId += 1;
  RootIds.set(root, rootId.toString());
  return RootIds.get(root);
}
function optionsToId(options) {
  return Object.keys(options).sort().filter(
    (key) => options[key] !== void 0
  ).map((key) => {
    return `${key}_${key === "root" ? getRootId(options.root) : options[key]}`;
  }).toString();
}
function createObserver(options) {
  let id = optionsToId(options);
  let instance = observerMap.get(id);
  if (!instance) {
    const elements = /* @__PURE__ */ new Map();
    let thresholds;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        var _a;
        const inView = entry.isIntersecting && thresholds.some((threshold) => entry.intersectionRatio >= threshold);
        if (options.trackVisibility && typeof entry.isVisible === "undefined") {
          entry.isVisible = inView;
        }
        (_a = elements.get(entry.target)) == null ? void 0 : _a.forEach((callback) => {
          callback(inView, entry);
        });
      });
    }, options);
    thresholds = observer.thresholds || (Array.isArray(options.threshold) ? options.threshold : [options.threshold || 0]);
    instance = {
      id,
      observer,
      elements
    };
    observerMap.set(id, instance);
  }
  return instance;
}
function observe(element, callback, options = {}, fallbackInView = unsupportedValue) {
  if (typeof window.IntersectionObserver === "undefined" && fallbackInView !== void 0) {
    const bounds = element.getBoundingClientRect();
    callback(fallbackInView, {
      isIntersecting: fallbackInView,
      target: element,
      intersectionRatio: typeof options.threshold === "number" ? options.threshold : 0,
      time: 0,
      boundingClientRect: bounds,
      intersectionRect: bounds,
      rootBounds: bounds
    });
    return () => {
    };
  }
  const { id, observer, elements } = createObserver(options);
  let callbacks = elements.get(element) || [];
  if (!elements.has(element)) {
    elements.set(element, callbacks);
  }
  callbacks.push(callback);
  observer.observe(element);
  return function unobserve() {
    callbacks.splice(callbacks.indexOf(callback), 1);
    if (callbacks.length === 0) {
      elements.delete(element);
      observer.unobserve(element);
    }
    if (elements.size === 0) {
      observer.disconnect();
      observerMap.delete(id);
    }
  };
}

// src/InView.tsx
function isPlainChildren(props) {
  return typeof props.children !== "function";
}
var InView = class extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    __publicField(this, "node", null);
    __publicField(this, "_unobserveCb", null);
    __publicField(this, "handleNode", (node) => {
      if (this.node) {
        this.unobserve();
        if (!node && !this.props.triggerOnce && !this.props.skip) {
          this.setState({ inView: !!this.props.initialInView, entry: void 0 });
        }
      }
      this.node = node ? node : null;
      this.observeNode();
    });
    __publicField(this, "handleChange", (inView, entry) => {
      if (inView && this.props.triggerOnce) {
        this.unobserve();
      }
      if (!isPlainChildren(this.props)) {
        this.setState({ inView, entry });
      }
      if (this.props.onChange) {
        this.props.onChange(inView, entry);
      }
    });
    this.state = {
      inView: !!props.initialInView,
      entry: void 0
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.rootMargin !== this.props.rootMargin || prevProps.root !== this.props.root || prevProps.threshold !== this.props.threshold || prevProps.skip !== this.props.skip || prevProps.trackVisibility !== this.props.trackVisibility || prevProps.delay !== this.props.delay) {
      this.unobserve();
      this.observeNode();
    }
  }
  componentWillUnmount() {
    this.unobserve();
    this.node = null;
  }
  observeNode() {
    if (!this.node || this.props.skip)
      return;
    const {
      threshold,
      root,
      rootMargin,
      trackVisibility,
      delay,
      fallbackInView
    } = this.props;
    this._unobserveCb = observe(
      this.node,
      this.handleChange,
      {
        threshold,
        root,
        rootMargin,
        // @ts-ignore
        trackVisibility,
        // @ts-ignore
        delay
      },
      fallbackInView
    );
  }
  unobserve() {
    if (this._unobserveCb) {
      this._unobserveCb();
      this._unobserveCb = null;
    }
  }
  render() {
    const { children } = this.props;
    if (typeof children === "function") {
      const { inView, entry } = this.state;
      return children({ inView, entry, ref: this.handleNode });
    }
    const {
      as,
      triggerOnce,
      threshold,
      root,
      rootMargin,
      onChange,
      skip,
      trackVisibility,
      delay,
      initialInView,
      fallbackInView,
      ...props
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0__.createElement(
      as || "div",
      { ref: this.handleNode, ...props },
      children
    );
  }
};

// src/useInView.tsx

function useInView({
  threshold,
  delay,
  trackVisibility,
  rootMargin,
  root,
  triggerOnce,
  skip,
  initialInView,
  fallbackInView,
  onChange
} = {}) {
  var _a;
  const [ref, setRef] = react__WEBPACK_IMPORTED_MODULE_0__.useState(null);
  const callback = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  const [state, setState] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    inView: !!initialInView,
    entry: void 0
  });
  callback.current = onChange;
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(
    () => {
      if (skip || !ref)
        return;
      let unobserve;
      unobserve = observe(
        ref,
        (inView, entry) => {
          setState({
            inView,
            entry
          });
          if (callback.current)
            callback.current(inView, entry);
          if (entry.isIntersecting && triggerOnce && unobserve) {
            unobserve();
            unobserve = void 0;
          }
        },
        {
          root,
          rootMargin,
          threshold,
          // @ts-ignore
          trackVisibility,
          // @ts-ignore
          delay
        },
        fallbackInView
      );
      return () => {
        if (unobserve) {
          unobserve();
        }
      };
    },
    // We break the rule here, because we aren't including the actual `threshold` variable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // If the threshold is an array, convert it to a string, so it won't change between renders.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Array.isArray(threshold) ? threshold.toString() : threshold,
      ref,
      root,
      rootMargin,
      triggerOnce,
      skip,
      trackVisibility,
      fallbackInView,
      delay
    ]
  );
  const entryTarget = (_a = state.entry) == null ? void 0 : _a.target;
  const previousEntryTarget = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  if (!ref && entryTarget && !triggerOnce && !skip && previousEntryTarget.current !== entryTarget) {
    previousEntryTarget.current = entryTarget;
    setState({
      inView: !!initialInView,
      entry: void 0
    });
  }
  const result = [setRef, state.inView, state.entry];
  result.ref = result[0];
  result.inView = result[1];
  result.entry = result[2];
  return result;
}

//# sourceMappingURL=index.mjs.map

/***/ }),

/***/ "./node_modules/swr/_internal/dist/index.mjs":
/*!***************************************************!*\
  !*** ./node_modules/swr/_internal/dist/index.mjs ***!
  \***************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   INFINITE_PREFIX: function() { return /* binding */ INFINITE_PREFIX; },
/* harmony export */   IS_REACT_LEGACY: function() { return /* binding */ IS_REACT_LEGACY; },
/* harmony export */   IS_SERVER: function() { return /* binding */ IS_SERVER; },
/* harmony export */   OBJECT: function() { return /* binding */ OBJECT; },
/* harmony export */   SWRConfig: function() { return /* binding */ SWRConfig; },
/* harmony export */   SWRGlobalState: function() { return /* binding */ SWRGlobalState; },
/* harmony export */   UNDEFINED: function() { return /* binding */ UNDEFINED; },
/* harmony export */   cache: function() { return /* binding */ cache; },
/* harmony export */   compare: function() { return /* binding */ compare; },
/* harmony export */   createCacheHelper: function() { return /* binding */ createCacheHelper; },
/* harmony export */   defaultConfig: function() { return /* binding */ defaultConfig; },
/* harmony export */   defaultConfigOptions: function() { return /* binding */ defaultConfigOptions; },
/* harmony export */   getTimestamp: function() { return /* binding */ getTimestamp; },
/* harmony export */   hasRequestAnimationFrame: function() { return /* binding */ hasRequestAnimationFrame; },
/* harmony export */   initCache: function() { return /* binding */ initCache; },
/* harmony export */   internalMutate: function() { return /* binding */ internalMutate; },
/* harmony export */   isDocumentDefined: function() { return /* binding */ isDocumentDefined; },
/* harmony export */   isFunction: function() { return /* binding */ isFunction; },
/* harmony export */   isPromiseLike: function() { return /* binding */ isPromiseLike; },
/* harmony export */   isUndefined: function() { return /* binding */ isUndefined; },
/* harmony export */   isWindowDefined: function() { return /* binding */ isWindowDefined; },
/* harmony export */   mergeConfigs: function() { return /* binding */ mergeConfigs; },
/* harmony export */   mergeObjects: function() { return /* binding */ mergeObjects; },
/* harmony export */   mutate: function() { return /* binding */ mutate; },
/* harmony export */   noop: function() { return /* binding */ noop; },
/* harmony export */   normalize: function() { return /* binding */ normalize; },
/* harmony export */   preload: function() { return /* binding */ preload; },
/* harmony export */   preset: function() { return /* binding */ preset; },
/* harmony export */   rAF: function() { return /* binding */ rAF; },
/* harmony export */   revalidateEvents: function() { return /* binding */ events; },
/* harmony export */   serialize: function() { return /* binding */ serialize; },
/* harmony export */   slowConnection: function() { return /* binding */ slowConnection; },
/* harmony export */   stableHash: function() { return /* binding */ stableHash; },
/* harmony export */   subscribeCallback: function() { return /* binding */ subscribeCallback; },
/* harmony export */   useIsomorphicLayoutEffect: function() { return /* binding */ useIsomorphicLayoutEffect; },
/* harmony export */   useSWRConfig: function() { return /* binding */ useSWRConfig; },
/* harmony export */   withArgs: function() { return /* binding */ withArgs; },
/* harmony export */   withMiddleware: function() { return /* binding */ withMiddleware; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");


// Shared state between server components and client components
const noop = ()=>{};
// Using noop() as the undefined value as undefined can be replaced
// by something else. Prettier ignore and extra parentheses are necessary here
// to ensure that tsc doesn't remove the __NOINLINE__ comment.
// prettier-ignore
const UNDEFINED = /*#__NOINLINE__*/ noop();
const OBJECT = Object;
const isUndefined = (v)=>v === UNDEFINED;
const isFunction = (v)=>typeof v == 'function';
const mergeObjects = (a, b)=>({
        ...a,
        ...b
    });
const isPromiseLike = (x)=>isFunction(x.then);

// use WeakMap to store the object->key mapping
// so the objects can be garbage collected.
// WeakMap uses a hashtable under the hood, so the lookup
// complexity is almost O(1).
const table = new WeakMap();
// counter of the key
let counter = 0;
// A stable hash implementation that supports:
// - Fast and ensures unique hash properties
// - Handles unserializable values
// - Handles object key ordering
// - Generates short results
//
// This is not a serialization function, and the result is not guaranteed to be
// parsable.
const stableHash = (arg)=>{
    const type = typeof arg;
    const constructor = arg && arg.constructor;
    const isDate = constructor == Date;
    let result;
    let index;
    if (OBJECT(arg) === arg && !isDate && constructor != RegExp) {
        // Object/function, not null/date/regexp. Use WeakMap to store the id first.
        // If it's already hashed, directly return the result.
        result = table.get(arg);
        if (result) return result;
        // Store the hash first for circular reference detection before entering the
        // recursive `stableHash` calls.
        // For other objects like set and map, we use this id directly as the hash.
        result = ++counter + '~';
        table.set(arg, result);
        if (constructor == Array) {
            // Array.
            result = '@';
            for(index = 0; index < arg.length; index++){
                result += stableHash(arg[index]) + ',';
            }
            table.set(arg, result);
        }
        if (constructor == OBJECT) {
            // Object, sort keys.
            result = '#';
            const keys = OBJECT.keys(arg).sort();
            while(!isUndefined(index = keys.pop())){
                if (!isUndefined(arg[index])) {
                    result += index + ':' + stableHash(arg[index]) + ',';
                }
            }
            table.set(arg, result);
        }
    } else {
        result = isDate ? arg.toJSON() : type == 'symbol' ? arg.toString() : type == 'string' ? JSON.stringify(arg) : '' + arg;
    }
    return result;
};

// Global state used to deduplicate requests and store listeners
const SWRGlobalState = new WeakMap();

const EMPTY_CACHE = {};
const INITIAL_CACHE = {};
const STR_UNDEFINED = 'undefined';
// NOTE: Use the function to guarantee it's re-evaluated between jsdom and node runtime for tests.
const isWindowDefined = typeof window != STR_UNDEFINED;
const isDocumentDefined = typeof document != STR_UNDEFINED;
const hasRequestAnimationFrame = ()=>isWindowDefined && typeof window['requestAnimationFrame'] != STR_UNDEFINED;
const createCacheHelper = (cache, key)=>{
    const state = SWRGlobalState.get(cache);
    return [
        // Getter
        ()=>!isUndefined(key) && cache.get(key) || EMPTY_CACHE,
        // Setter
        (info)=>{
            if (!isUndefined(key)) {
                const prev = cache.get(key);
                // Before writing to the store, we keep the value in the initial cache
                // if it's not there yet.
                if (!(key in INITIAL_CACHE)) {
                    INITIAL_CACHE[key] = prev;
                }
                state[5](key, mergeObjects(prev, info), prev || EMPTY_CACHE);
            }
        },
        // Subscriber
        state[6],
        // Get server cache snapshot
        ()=>{
            if (!isUndefined(key)) {
                // If the cache was updated on the client, we return the stored initial value.
                if (key in INITIAL_CACHE) return INITIAL_CACHE[key];
            }
            // If we haven't done any client-side updates, we return the current value.
            return !isUndefined(key) && cache.get(key) || EMPTY_CACHE;
        }
    ];
} // export { UNDEFINED, OBJECT, isUndefined, isFunction, mergeObjects, isPromiseLike }
;

/**
 * Due to the bug https://bugs.chromium.org/p/chromium/issues/detail?id=678075,
 * it's not reliable to detect if the browser is currently online or offline
 * based on `navigator.onLine`.
 * As a workaround, we always assume it's online on the first load, and change
 * the status upon `online` or `offline` events.
 */ let online = true;
const isOnline = ()=>online;
// For node and React Native, `add/removeEventListener` doesn't exist on window.
const [onWindowEvent, offWindowEvent] = isWindowDefined && window.addEventListener ? [
    window.addEventListener.bind(window),
    window.removeEventListener.bind(window)
] : [
    noop,
    noop
];
const isVisible = ()=>{
    const visibilityState = isDocumentDefined && document.visibilityState;
    return isUndefined(visibilityState) || visibilityState !== 'hidden';
};
const initFocus = (callback)=>{
    // focus revalidate
    if (isDocumentDefined) {
        document.addEventListener('visibilitychange', callback);
    }
    onWindowEvent('focus', callback);
    return ()=>{
        if (isDocumentDefined) {
            document.removeEventListener('visibilitychange', callback);
        }
        offWindowEvent('focus', callback);
    };
};
const initReconnect = (callback)=>{
    // revalidate on reconnected
    const onOnline = ()=>{
        online = true;
        callback();
    };
    // nothing to revalidate, just update the status
    const onOffline = ()=>{
        online = false;
    };
    onWindowEvent('online', onOnline);
    onWindowEvent('offline', onOffline);
    return ()=>{
        offWindowEvent('online', onOnline);
        offWindowEvent('offline', onOffline);
    };
};
const preset = {
    isOnline,
    isVisible
};
const defaultConfigOptions = {
    initFocus,
    initReconnect
};

const IS_REACT_LEGACY = !react__WEBPACK_IMPORTED_MODULE_0__.useId;
const IS_SERVER = !isWindowDefined || 'Deno' in window;
// Polyfill requestAnimationFrame
const rAF = (f)=>hasRequestAnimationFrame() ? window['requestAnimationFrame'](f) : setTimeout(f, 1);
// React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser.
const useIsomorphicLayoutEffect = IS_SERVER ? react__WEBPACK_IMPORTED_MODULE_0__.useEffect : react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect;
// This assignment is to extend the Navigator type to use effectiveType.
const navigatorConnection = typeof navigator !== 'undefined' && navigator.connection;
// Adjust the config based on slow connection status (<= 70Kbps).
const slowConnection = !IS_SERVER && navigatorConnection && ([
    'slow-2g',
    '2g'
].includes(navigatorConnection.effectiveType) || navigatorConnection.saveData);

const serialize = (key)=>{
    if (isFunction(key)) {
        try {
            key = key();
        } catch (err) {
            // dependencies not ready
            key = '';
        }
    }
    // Use the original key as the argument of fetcher. This can be a string or an
    // array of values.
    const args = key;
    // If key is not falsy, or not an empty array, hash it.
    key = typeof key == 'string' ? key : (Array.isArray(key) ? key.length : key) ? stableHash(key) : '';
    return [
        key,
        args
    ];
};

// Global timestamp.
let __timestamp = 0;
const getTimestamp = ()=>++__timestamp;

const FOCUS_EVENT = 0;
const RECONNECT_EVENT = 1;
const MUTATE_EVENT = 2;
const ERROR_REVALIDATE_EVENT = 3;

var events = {
  __proto__: null,
  ERROR_REVALIDATE_EVENT: ERROR_REVALIDATE_EVENT,
  FOCUS_EVENT: FOCUS_EVENT,
  MUTATE_EVENT: MUTATE_EVENT,
  RECONNECT_EVENT: RECONNECT_EVENT
};

async function internalMutate(...args) {
    const [cache, _key, _data, _opts] = args;
    // When passing as a boolean, it's explicitly used to disable/enable
    // revalidation.
    const options = mergeObjects({
        populateCache: true,
        throwOnError: true
    }, typeof _opts === 'boolean' ? {
        revalidate: _opts
    } : _opts || {});
    let populateCache = options.populateCache;
    const rollbackOnErrorOption = options.rollbackOnError;
    let optimisticData = options.optimisticData;
    const revalidate = options.revalidate !== false;
    const rollbackOnError = (error)=>{
        return typeof rollbackOnErrorOption === 'function' ? rollbackOnErrorOption(error) : rollbackOnErrorOption !== false;
    };
    const throwOnError = options.throwOnError;
    // If the second argument is a key filter, return the mutation results for all
    // filtered keys.
    if (isFunction(_key)) {
        const keyFilter = _key;
        const matchedKeys = [];
        const it = cache.keys();
        for (const key of it){
            if (// Skip the special useSWRInfinite and useSWRSubscription keys.
            !/^\$(inf|sub)\$/.test(key) && keyFilter(cache.get(key)._k)) {
                matchedKeys.push(key);
            }
        }
        return Promise.all(matchedKeys.map(mutateByKey));
    }
    return mutateByKey(_key);
    async function mutateByKey(_k) {
        // Serialize key
        const [key] = serialize(_k);
        if (!key) return;
        const [get, set] = createCacheHelper(cache, key);
        const [EVENT_REVALIDATORS, MUTATION, FETCH, PRELOAD] = SWRGlobalState.get(cache);
        const startRevalidate = ()=>{
            const revalidators = EVENT_REVALIDATORS[key];
            if (revalidate) {
                // Invalidate the key by deleting the concurrent request markers so new
                // requests will not be deduped.
                delete FETCH[key];
                delete PRELOAD[key];
                if (revalidators && revalidators[0]) {
                    return revalidators[0](MUTATE_EVENT).then(()=>get().data);
                }
            }
            return get().data;
        };
        // If there is no new data provided, revalidate the key with current state.
        if (args.length < 3) {
            // Revalidate and broadcast state.
            return startRevalidate();
        }
        let data = _data;
        let error;
        // Update global timestamps.
        const beforeMutationTs = getTimestamp();
        MUTATION[key] = [
            beforeMutationTs,
            0
        ];
        const hasOptimisticData = !isUndefined(optimisticData);
        const state = get();
        // `displayedData` is the current value on screen. It could be the optimistic value
        // that is going to be overridden by a `committedData`, or get reverted back.
        // `committedData` is the validated value that comes from a fetch or mutation.
        const displayedData = state.data;
        const currentData = state._c;
        const committedData = isUndefined(currentData) ? displayedData : currentData;
        // Do optimistic data update.
        if (hasOptimisticData) {
            optimisticData = isFunction(optimisticData) ? optimisticData(committedData, displayedData) : optimisticData;
            // When we set optimistic data, backup the current committedData data in `_c`.
            set({
                data: optimisticData,
                _c: committedData
            });
        }
        if (isFunction(data)) {
            // `data` is a function, call it passing current cache value.
            try {
                data = data(committedData);
            } catch (err) {
                // If it throws an error synchronously, we shouldn't update the cache.
                error = err;
            }
        }
        // `data` is a promise/thenable, resolve the final data first.
        if (data && isPromiseLike(data)) {
            // This means that the mutation is async, we need to check timestamps to
            // avoid race conditions.
            data = await data.catch((err)=>{
                error = err;
            });
            // Check if other mutations have occurred since we've started this mutation.
            // If there's a race we don't update cache or broadcast the change,
            // just return the data.
            if (beforeMutationTs !== MUTATION[key][0]) {
                if (error) throw error;
                return data;
            } else if (error && hasOptimisticData && rollbackOnError(error)) {
                // Rollback. Always populate the cache in this case but without
                // transforming the data.
                populateCache = true;
                // Reset data to be the latest committed data, and clear the `_c` value.
                set({
                    data: committedData,
                    _c: UNDEFINED
                });
            }
        }
        // If we should write back the cache after request.
        if (populateCache) {
            if (!error) {
                // Transform the result into data.
                if (isFunction(populateCache)) {
                    const populateCachedData = populateCache(data, committedData);
                    set({
                        data: populateCachedData,
                        error: UNDEFINED,
                        _c: UNDEFINED
                    });
                } else {
                    // Only update cached data and reset the error if there's no error. Data can be `undefined` here.
                    set({
                        data,
                        error: UNDEFINED,
                        _c: UNDEFINED
                    });
                }
            }
        }
        // Reset the timestamp to mark the mutation has ended.
        MUTATION[key][1] = getTimestamp();
        // Update existing SWR Hooks' internal states:
        Promise.resolve(startRevalidate()).then(()=>{
            // The mutation and revalidation are ended, we can clear it since the data is
            // not an optimistic value anymore.
            set({
                _c: UNDEFINED
            });
        });
        // Throw error or return data
        if (error) {
            if (throwOnError) throw error;
            return;
        }
        return data;
    }
}

const revalidateAllKeys = (revalidators, type)=>{
    for(const key in revalidators){
        if (revalidators[key][0]) revalidators[key][0](type);
    }
};
const initCache = (provider, options)=>{
    // The global state for a specific provider will be used to deduplicate
    // requests and store listeners. As well as a mutate function that is bound to
    // the cache.
    // The provider's global state might be already initialized. Let's try to get the
    // global state associated with the provider first.
    if (!SWRGlobalState.has(provider)) {
        const opts = mergeObjects(defaultConfigOptions, options);
        // If there's no global state bound to the provider, create a new one with the
        // new mutate function.
        const EVENT_REVALIDATORS = {};
        const mutate = internalMutate.bind(UNDEFINED, provider);
        let unmount = noop;
        const subscriptions = {};
        const subscribe = (key, callback)=>{
            const subs = subscriptions[key] || [];
            subscriptions[key] = subs;
            subs.push(callback);
            return ()=>subs.splice(subs.indexOf(callback), 1);
        };
        const setter = (key, value, prev)=>{
            provider.set(key, value);
            const subs = subscriptions[key];
            if (subs) {
                for (const fn of subs){
                    fn(value, prev);
                }
            }
        };
        const initProvider = ()=>{
            if (!SWRGlobalState.has(provider)) {
                // Update the state if it's new, or if the provider has been extended.
                SWRGlobalState.set(provider, [
                    EVENT_REVALIDATORS,
                    {},
                    {},
                    {},
                    mutate,
                    setter,
                    subscribe
                ]);
                if (!IS_SERVER) {
                    // When listening to the native events for auto revalidations,
                    // we intentionally put a delay (setTimeout) here to make sure they are
                    // fired after immediate JavaScript executions, which can be
                    // React's state updates.
                    // This avoids some unnecessary revalidations such as
                    // https://github.com/vercel/swr/issues/1680.
                    const releaseFocus = opts.initFocus(setTimeout.bind(UNDEFINED, revalidateAllKeys.bind(UNDEFINED, EVENT_REVALIDATORS, FOCUS_EVENT)));
                    const releaseReconnect = opts.initReconnect(setTimeout.bind(UNDEFINED, revalidateAllKeys.bind(UNDEFINED, EVENT_REVALIDATORS, RECONNECT_EVENT)));
                    unmount = ()=>{
                        releaseFocus && releaseFocus();
                        releaseReconnect && releaseReconnect();
                        // When un-mounting, we need to remove the cache provider from the state
                        // storage too because it's a side-effect. Otherwise, when re-mounting we
                        // will not re-register those event listeners.
                        SWRGlobalState.delete(provider);
                    };
                }
            }
        };
        initProvider();
        // This is a new provider, we need to initialize it and setup DOM events
        // listeners for `focus` and `reconnect` actions.
        // We might want to inject an extra layer on top of `provider` in the future,
        // such as key serialization, auto GC, etc.
        // For now, it's just a `Map` interface without any modifications.
        return [
            provider,
            mutate,
            initProvider,
            unmount
        ];
    }
    return [
        provider,
        SWRGlobalState.get(provider)[4]
    ];
};

// error retry
const onErrorRetry = (_, __, config, revalidate, opts)=>{
    const maxRetryCount = config.errorRetryCount;
    const currentRetryCount = opts.retryCount;
    // Exponential backoff
    const timeout = ~~((Math.random() + 0.5) * (1 << (currentRetryCount < 8 ? currentRetryCount : 8))) * config.errorRetryInterval;
    if (!isUndefined(maxRetryCount) && currentRetryCount > maxRetryCount) {
        return;
    }
    setTimeout(revalidate, timeout, opts);
};
const compare = (currentData, newData)=>stableHash(currentData) == stableHash(newData);
// Default cache provider
const [cache, mutate] = initCache(new Map());
// Default config
const defaultConfig = mergeObjects({
    // events
    onLoadingSlow: noop,
    onSuccess: noop,
    onError: noop,
    onErrorRetry,
    onDiscarded: noop,
    // switches
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
    shouldRetryOnError: true,
    // timeouts
    errorRetryInterval: slowConnection ? 10000 : 5000,
    focusThrottleInterval: 5 * 1000,
    dedupingInterval: 2 * 1000,
    loadingTimeout: slowConnection ? 5000 : 3000,
    // providers
    compare,
    isPaused: ()=>false,
    cache,
    mutate,
    fallback: {}
}, // use web preset by default
preset);

const mergeConfigs = (a, b)=>{
    // Need to create a new object to avoid mutating the original here.
    const v = mergeObjects(a, b);
    // If two configs are provided, merge their `use` and `fallback` options.
    if (b) {
        const { use: u1, fallback: f1 } = a;
        const { use: u2, fallback: f2 } = b;
        if (u1 && u2) {
            v.use = u1.concat(u2);
        }
        if (f1 && f2) {
            v.fallback = mergeObjects(f1, f2);
        }
    }
    return v;
};

const SWRConfigContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({});
const SWRConfig = (props)=>{
    const { value } = props;
    const parentConfig = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SWRConfigContext);
    const isFunctionalConfig = isFunction(value);
    const config = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>isFunctionalConfig ? value(parentConfig) : value, [
        isFunctionalConfig,
        parentConfig,
        value
    ]);
    // Extend parent context values and middleware.
    const extendedConfig = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>isFunctionalConfig ? config : mergeConfigs(parentConfig, config), [
        isFunctionalConfig,
        parentConfig,
        config
    ]);
    // Should not use the inherited provider.
    const provider = config && config.provider;
    // initialize the cache only on first access.
    const cacheContextRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(UNDEFINED);
    if (provider && !cacheContextRef.current) {
        cacheContextRef.current = initCache(provider(extendedConfig.cache || cache), config);
    }
    const cacheContext = cacheContextRef.current;
    // Override the cache if a new provider is given.
    if (cacheContext) {
        extendedConfig.cache = cacheContext[0];
        extendedConfig.mutate = cacheContext[1];
    }
    // Unsubscribe events.
    useIsomorphicLayoutEffect(()=>{
        if (cacheContext) {
            cacheContext[2] && cacheContext[2]();
            return cacheContext[3];
        }
    }, []);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(SWRConfigContext.Provider, mergeObjects(props, {
        value: extendedConfig
    }));
};

const INFINITE_PREFIX = '$inf$';

// @ts-expect-error
const enableDevtools = isWindowDefined && window.__SWR_DEVTOOLS_USE__;
const use = enableDevtools ? window.__SWR_DEVTOOLS_USE__ : [];
const setupDevTools = ()=>{
    if (enableDevtools) {
        // @ts-expect-error
        window.__SWR_DEVTOOLS_REACT__ = react__WEBPACK_IMPORTED_MODULE_0__;
    }
};

const normalize = (args)=>{
    return isFunction(args[1]) ? [
        args[0],
        args[1],
        args[2] || {}
    ] : [
        args[0],
        null,
        (args[1] === null ? args[2] : args[1]) || {}
    ];
};

const useSWRConfig = ()=>{
    return mergeObjects(defaultConfig, (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SWRConfigContext));
};

const preload = (key_, fetcher)=>{
    const [key, fnArg] = serialize(key_);
    const [, , , PRELOAD] = SWRGlobalState.get(cache);
    // Prevent preload to be called multiple times before used.
    if (PRELOAD[key]) return PRELOAD[key];
    const req = fetcher(fnArg);
    PRELOAD[key] = req;
    return req;
};
const middleware = (useSWRNext)=>(key_, fetcher_, config)=>{
        // fetcher might be a sync function, so this should not be an async function
        const fetcher = fetcher_ && ((...args)=>{
            const [key] = serialize(key_);
            const [, , , PRELOAD] = SWRGlobalState.get(cache);
            if (key.startsWith(INFINITE_PREFIX)) {
                // we want the infinite fetcher to be called.
                // handling of the PRELOAD cache happens there.
                return fetcher_(...args);
            }
            const req = PRELOAD[key];
            if (isUndefined(req)) return fetcher_(...args);
            delete PRELOAD[key];
            return req;
        });
        return useSWRNext(key_, fetcher, config);
    };

const BUILT_IN_MIDDLEWARE = use.concat(middleware);

// It's tricky to pass generic types as parameters, so we just directly override
// the types here.
const withArgs = (hook)=>{
    return function useSWRArgs(...args) {
        // Get the default and inherited configuration.
        const fallbackConfig = useSWRConfig();
        // Normalize arguments.
        const [key, fn, _config] = normalize(args);
        // Merge configurations.
        const config = mergeConfigs(fallbackConfig, _config);
        // Apply middleware
        let next = hook;
        const { use } = config;
        const middleware = (use || []).concat(BUILT_IN_MIDDLEWARE);
        for(let i = middleware.length; i--;){
            next = middleware[i](next);
        }
        return next(key, fn || config.fetcher || null, config);
    };
};

// Add a callback function to a list of keyed callback functions and return
// the unsubscribe function.
const subscribeCallback = (key, callbacks, callback)=>{
    const keyedRevalidators = callbacks[key] || (callbacks[key] = []);
    keyedRevalidators.push(callback);
    return ()=>{
        const index = keyedRevalidators.indexOf(callback);
        if (index >= 0) {
            // O(1): faster than splice
            keyedRevalidators[index] = keyedRevalidators[keyedRevalidators.length - 1];
            keyedRevalidators.pop();
        }
    };
};

// Create a custom hook with a middleware
const withMiddleware = (useSWR, middleware)=>{
    return (...args)=>{
        const [key, fn, config] = normalize(args);
        const uses = (config.use || []).concat(middleware);
        return useSWR(key, fn, {
            ...config,
            use: uses
        });
    };
};

setupDevTools();




/***/ }),

/***/ "./node_modules/swr/core/dist/index.mjs":
/*!**********************************************!*\
  !*** ./node_modules/swr/core/dist/index.mjs ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SWRConfig: function() { return /* binding */ SWRConfig; },
/* harmony export */   "default": function() { return /* binding */ useSWR; },
/* harmony export */   mutate: function() { return /* reexport safe */ swr_internal__WEBPACK_IMPORTED_MODULE_3__.mutate; },
/* harmony export */   preload: function() { return /* reexport safe */ swr_internal__WEBPACK_IMPORTED_MODULE_3__.preload; },
/* harmony export */   unstable_serialize: function() { return /* binding */ unstable_serialize; },
/* harmony export */   useSWRConfig: function() { return /* reexport safe */ swr_internal__WEBPACK_IMPORTED_MODULE_3__.useSWRConfig; }
/* harmony export */ });
/* harmony import */ var client_only__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! client-only */ "./node_modules/client-only/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var use_sync_external_store_shim_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! use-sync-external-store/shim/index.js */ "./node_modules/use-sync-external-store/shim/index.js");
/* harmony import */ var swr_internal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! swr/_internal */ "./node_modules/swr/_internal/dist/index.mjs");






const unstable_serialize = (key)=>(0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.serialize)(key)[0];

/// <reference types="react/experimental" />
const use = react__WEBPACK_IMPORTED_MODULE_1__.use || ((promise)=>{
    if (promise.status === 'pending') {
        throw promise;
    } else if (promise.status === 'fulfilled') {
        return promise.value;
    } else if (promise.status === 'rejected') {
        throw promise.reason;
    } else {
        promise.status = 'pending';
        promise.then((v)=>{
            promise.status = 'fulfilled';
            promise.value = v;
        }, (e)=>{
            promise.status = 'rejected';
            promise.reason = e;
        });
        throw promise;
    }
});
const WITH_DEDUPE = {
    dedupe: true
};
const useSWRHandler = (_key, fetcher, config)=>{
    const { cache, compare, suspense, fallbackData, revalidateOnMount, revalidateIfStale, refreshInterval, refreshWhenHidden, refreshWhenOffline, keepPreviousData } = config;
    const [EVENT_REVALIDATORS, MUTATION, FETCH, PRELOAD] = swr_internal__WEBPACK_IMPORTED_MODULE_3__.SWRGlobalState.get(cache);
    // `key` is the identifier of the SWR internal state,
    // `fnArg` is the argument/arguments parsed from the key, which will be passed
    // to the fetcher.
    // All of them are derived from `_key`.
    const [key, fnArg] = (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.serialize)(_key);
    // If it's the initial render of this hook.
    const initialMountedRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    // If the hook is unmounted already. This will be used to prevent some effects
    // to be called after unmounting.
    const unmountedRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(false);
    // Refs to keep the key and config.
    const keyRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(key);
    const fetcherRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(fetcher);
    const configRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(config);
    const getConfig = ()=>configRef.current;
    const isActive = ()=>getConfig().isVisible() && getConfig().isOnline();
    const [getCache, setCache, subscribeCache, getInitialCache] = (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.createCacheHelper)(cache, key);
    const stateDependencies = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({}).current;
    const fallback = (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(fallbackData) ? config.fallback[key] : fallbackData;
    const isEqual = (prev, current)=>{
        for(const _ in stateDependencies){
            const t = _;
            if (t === 'data') {
                if (!compare(prev[t], current[t])) {
                    if (!(0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(prev[t])) {
                        return false;
                    }
                    if (!compare(returnedData, current[t])) {
                        return false;
                    }
                }
            } else {
                if (current[t] !== prev[t]) {
                    return false;
                }
            }
        }
        return true;
    };
    const getSnapshot = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const shouldStartRequest = (()=>{
            if (!key) return false;
            if (!fetcher) return false;
            // If `revalidateOnMount` is set, we take the value directly.
            if (!(0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(revalidateOnMount)) return revalidateOnMount;
            // If it's paused, we skip revalidation.
            if (getConfig().isPaused()) return false;
            if (suspense) return false;
            if (!(0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(revalidateIfStale)) return revalidateIfStale;
            return true;
        })();
        // Get the cache and merge it with expected states.
        const getSelectedCache = (state)=>{
            // We only select the needed fields from the state.
            const snapshot = (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.mergeObjects)(state);
            delete snapshot._k;
            if (!shouldStartRequest) {
                return snapshot;
            }
            return {
                isValidating: true,
                isLoading: true,
                ...snapshot
            };
        };
        const cachedData = getCache();
        const initialData = getInitialCache();
        const clientSnapshot = getSelectedCache(cachedData);
        const serverSnapshot = cachedData === initialData ? clientSnapshot : getSelectedCache(initialData);
        // To make sure that we are returning the same object reference to avoid
        // unnecessary re-renders, we keep the previous snapshot and use deep
        // comparison to check if we need to return a new one.
        let memorizedSnapshot = clientSnapshot;
        return [
            ()=>{
                const newSnapshot = getSelectedCache(getCache());
                const compareResult = isEqual(newSnapshot, memorizedSnapshot);
                if (compareResult) {
                    // Mentally, we should always return the `memorizedSnapshot` here
                    // as there's no change between the new and old snapshots.
                    // However, since the `isEqual` function only compares selected fields,
                    // the values of the unselected fields might be changed. That's
                    // simply because we didn't track them.
                    // To support the case in https://github.com/vercel/swr/pull/2576,
                    // we need to update these fields in the `memorizedSnapshot` too
                    // with direct mutations to ensure the snapshot is always up-to-date
                    // even for the unselected fields, but only trigger re-renders when
                    // the selected fields are changed.
                    memorizedSnapshot.data = newSnapshot.data;
                    memorizedSnapshot.isLoading = newSnapshot.isLoading;
                    memorizedSnapshot.isValidating = newSnapshot.isValidating;
                    memorizedSnapshot.error = newSnapshot.error;
                    return memorizedSnapshot;
                } else {
                    memorizedSnapshot = newSnapshot;
                    return newSnapshot;
                }
            },
            ()=>serverSnapshot
        ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        cache,
        key
    ]);
    // Get the current state that SWR should return.
    const cached = (0,use_sync_external_store_shim_index_js__WEBPACK_IMPORTED_MODULE_2__.useSyncExternalStore)((0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)((callback)=>subscribeCache(key, (current, prev)=>{
            if (!isEqual(prev, current)) callback();
        }), // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        cache,
        key
    ]), getSnapshot[0], getSnapshot[1]);
    const isInitialMount = !initialMountedRef.current;
    const hasRevalidator = EVENT_REVALIDATORS[key] && EVENT_REVALIDATORS[key].length > 0;
    const cachedData = cached.data;
    const data = (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(cachedData) ? fallback : cachedData;
    const error = cached.error;
    // Use a ref to store previously returned data. Use the initial data as its initial value.
    const laggyDataRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(data);
    const returnedData = keepPreviousData ? (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(cachedData) ? laggyDataRef.current : cachedData : data;
    // - Suspense mode and there's stale data for the initial render.
    // - Not suspense mode and there is no fallback data and `revalidateIfStale` is enabled.
    // - `revalidateIfStale` is enabled but `data` is not defined.
    const shouldDoInitialRevalidation = (()=>{
        // if a key already has revalidators and also has error, we should not trigger revalidation
        if (hasRevalidator && !(0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(error)) return false;
        // If `revalidateOnMount` is set, we take the value directly.
        if (isInitialMount && !(0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(revalidateOnMount)) return revalidateOnMount;
        // If it's paused, we skip revalidation.
        if (getConfig().isPaused()) return false;
        // Under suspense mode, it will always fetch on render if there is no
        // stale data so no need to revalidate immediately mount it again.
        // If data exists, only revalidate if `revalidateIfStale` is true.
        if (suspense) return (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(data) ? false : revalidateIfStale;
        // If there is no stale data, we need to revalidate when mount;
        // If `revalidateIfStale` is set to true, we will always revalidate.
        return (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(data) || revalidateIfStale;
    })();
    // Resolve the default validating state:
    // If it's able to validate, and it should revalidate when mount, this will be true.
    const defaultValidatingState = !!(key && fetcher && isInitialMount && shouldDoInitialRevalidation);
    const isValidating = (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(cached.isValidating) ? defaultValidatingState : cached.isValidating;
    const isLoading = (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(cached.isLoading) ? defaultValidatingState : cached.isLoading;
    // The revalidation function is a carefully crafted wrapper of the original
    // `fetcher`, to correctly handle the many edge cases.
    const revalidate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (revalidateOpts)=>{
        const currentFetcher = fetcherRef.current;
        if (!key || !currentFetcher || unmountedRef.current || getConfig().isPaused()) {
            return false;
        }
        let newData;
        let startAt;
        let loading = true;
        const opts = revalidateOpts || {};
        // If there is no ongoing concurrent request, or `dedupe` is not set, a
        // new request should be initiated.
        const shouldStartNewRequest = !FETCH[key] || !opts.dedupe;
        /*
         For React 17
         Do unmount check for calls:
         If key has changed during the revalidation, or the component has been
         unmounted, old dispatch and old event callbacks should not take any
         effect

        For React 18
        only check if key has changed
        https://github.com/reactwg/react-18/discussions/82
      */ const callbackSafeguard = ()=>{
            if (swr_internal__WEBPACK_IMPORTED_MODULE_3__.IS_REACT_LEGACY) {
                return !unmountedRef.current && key === keyRef.current && initialMountedRef.current;
            }
            return key === keyRef.current;
        };
        // The final state object when the request finishes.
        const finalState = {
            isValidating: false,
            isLoading: false
        };
        const finishRequestAndUpdateState = ()=>{
            setCache(finalState);
        };
        const cleanupState = ()=>{
            // Check if it's still the same request before deleting it.
            const requestInfo = FETCH[key];
            if (requestInfo && requestInfo[1] === startAt) {
                delete FETCH[key];
            }
        };
        // Start fetching. Change the `isValidating` state, update the cache.
        const initialState = {
            isValidating: true
        };
        // It is in the `isLoading` state, if and only if there is no cached data.
        // This bypasses fallback data and laggy data.
        if ((0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(getCache().data)) {
            initialState.isLoading = true;
        }
        try {
            if (shouldStartNewRequest) {
                setCache(initialState);
                // If no cache is being rendered currently (it shows a blank page),
                // we trigger the loading slow event.
                if (config.loadingTimeout && (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(getCache().data)) {
                    setTimeout(()=>{
                        if (loading && callbackSafeguard()) {
                            getConfig().onLoadingSlow(key, config);
                        }
                    }, config.loadingTimeout);
                }
                // Start the request and save the timestamp.
                // Key must be truthy if entering here.
                FETCH[key] = [
                    currentFetcher(fnArg),
                    (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.getTimestamp)()
                ];
            }
            [newData, startAt] = FETCH[key];
            newData = await newData;
            if (shouldStartNewRequest) {
                // If the request isn't interrupted, clean it up after the
                // deduplication interval.
                setTimeout(cleanupState, config.dedupingInterval);
            }
            // If there're other ongoing request(s), started after the current one,
            // we need to ignore the current one to avoid possible race conditions:
            //   req1------------------>res1        (current one)
            //        req2---------------->res2
            // the request that fired later will always be kept.
            // The timestamp maybe be `undefined` or a number
            if (!FETCH[key] || FETCH[key][1] !== startAt) {
                if (shouldStartNewRequest) {
                    if (callbackSafeguard()) {
                        getConfig().onDiscarded(key);
                    }
                }
                return false;
            }
            // Clear error.
            finalState.error = swr_internal__WEBPACK_IMPORTED_MODULE_3__.UNDEFINED;
            // If there're other mutations(s), that overlapped with the current revalidation:
            // case 1:
            //   req------------------>res
            //       mutate------>end
            // case 2:
            //         req------------>res
            //   mutate------>end
            // case 3:
            //   req------------------>res
            //       mutate-------...---------->
            // we have to ignore the revalidation result (res) because it's no longer fresh.
            // meanwhile, a new revalidation should be triggered when the mutation ends.
            const mutationInfo = MUTATION[key];
            if (!(0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(mutationInfo) && // case 1
            (startAt <= mutationInfo[0] || // case 2
            startAt <= mutationInfo[1] || // case 3
            mutationInfo[1] === 0)) {
                finishRequestAndUpdateState();
                if (shouldStartNewRequest) {
                    if (callbackSafeguard()) {
                        getConfig().onDiscarded(key);
                    }
                }
                return false;
            }
            // Deep compare with the latest state to avoid extra re-renders.
            // For local state, compare and assign.
            const cacheData = getCache().data;
            // Since the compare fn could be custom fn
            // cacheData might be different from newData even when compare fn returns True
            finalState.data = compare(cacheData, newData) ? cacheData : newData;
            // Trigger the successful callback if it's the original request.
            if (shouldStartNewRequest) {
                if (callbackSafeguard()) {
                    getConfig().onSuccess(newData, key, config);
                }
            }
        } catch (err) {
            cleanupState();
            const currentConfig = getConfig();
            const { shouldRetryOnError } = currentConfig;
            // Not paused, we continue handling the error. Otherwise, discard it.
            if (!currentConfig.isPaused()) {
                // Get a new error, don't use deep comparison for errors.
                finalState.error = err;
                // Error event and retry logic. Only for the actual request, not
                // deduped ones.
                if (shouldStartNewRequest && callbackSafeguard()) {
                    currentConfig.onError(err, key, currentConfig);
                    if (shouldRetryOnError === true || (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isFunction)(shouldRetryOnError) && shouldRetryOnError(err)) {
                        if (isActive()) {
                            // If it's inactive, stop. It will auto-revalidate when
                            // refocusing or reconnecting.
                            // When retrying, deduplication is always enabled.
                            currentConfig.onErrorRetry(err, key, currentConfig, (_opts)=>{
                                const revalidators = EVENT_REVALIDATORS[key];
                                if (revalidators && revalidators[0]) {
                                    revalidators[0](swr_internal__WEBPACK_IMPORTED_MODULE_3__.revalidateEvents.ERROR_REVALIDATE_EVENT, _opts);
                                }
                            }, {
                                retryCount: (opts.retryCount || 0) + 1,
                                dedupe: true
                            });
                        }
                    }
                }
            }
        }
        // Mark loading as stopped.
        loading = false;
        // Update the current hook's state.
        finishRequestAndUpdateState();
        return true;
    }, // `setState` is immutable, and `eventsCallback`, `fnArg`, and
    // `keyValidating` are depending on `key`, so we can exclude them from
    // the deps array.
    //
    // FIXME:
    // `fn` and `config` might be changed during the lifecycle,
    // but they might be changed every render like this.
    // `useSWR('key', () => fetch('/api/'), { suspense: true })`
    // So we omit the values from the deps array
    // even though it might cause unexpected behaviors.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        key,
        cache
    ]);
    // Similar to the global mutate but bound to the current cache and key.
    // `cache` isn't allowed to change during the lifecycle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const boundMutate = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(// Use callback to make sure `keyRef.current` returns latest result every time
    (...args)=>{
        return (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.internalMutate)(cache, keyRef.current, ...args);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    // The logic for updating refs.
    (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.useIsomorphicLayoutEffect)(()=>{
        fetcherRef.current = fetcher;
        configRef.current = config;
        // Handle laggy data updates. If there's cached data of the current key,
        // it'll be the correct reference.
        if (!(0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(cachedData)) {
            laggyDataRef.current = cachedData;
        }
    });
    // After mounted or key changed.
    (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.useIsomorphicLayoutEffect)(()=>{
        if (!key) return;
        const softRevalidate = revalidate.bind(swr_internal__WEBPACK_IMPORTED_MODULE_3__.UNDEFINED, WITH_DEDUPE);
        // Expose revalidators to global event listeners. So we can trigger
        // revalidation from the outside.
        let nextFocusRevalidatedAt = 0;
        const onRevalidate = (type, opts = {})=>{
            if (type == swr_internal__WEBPACK_IMPORTED_MODULE_3__.revalidateEvents.FOCUS_EVENT) {
                const now = Date.now();
                if (getConfig().revalidateOnFocus && now > nextFocusRevalidatedAt && isActive()) {
                    nextFocusRevalidatedAt = now + getConfig().focusThrottleInterval;
                    softRevalidate();
                }
            } else if (type == swr_internal__WEBPACK_IMPORTED_MODULE_3__.revalidateEvents.RECONNECT_EVENT) {
                if (getConfig().revalidateOnReconnect && isActive()) {
                    softRevalidate();
                }
            } else if (type == swr_internal__WEBPACK_IMPORTED_MODULE_3__.revalidateEvents.MUTATE_EVENT) {
                return revalidate();
            } else if (type == swr_internal__WEBPACK_IMPORTED_MODULE_3__.revalidateEvents.ERROR_REVALIDATE_EVENT) {
                return revalidate(opts);
            }
            return;
        };
        const unsubEvents = (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.subscribeCallback)(key, EVENT_REVALIDATORS, onRevalidate);
        // Mark the component as mounted and update corresponding refs.
        unmountedRef.current = false;
        keyRef.current = key;
        initialMountedRef.current = true;
        // Keep the original key in the cache.
        setCache({
            _k: fnArg
        });
        // Trigger a revalidation
        if (shouldDoInitialRevalidation) {
            if ((0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(data) || swr_internal__WEBPACK_IMPORTED_MODULE_3__.IS_SERVER) {
                // Revalidate immediately.
                softRevalidate();
            } else {
                // Delay the revalidate if we have data to return so we won't block
                // rendering.
                (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.rAF)(softRevalidate);
            }
        }
        return ()=>{
            // Mark it as unmounted.
            unmountedRef.current = true;
            unsubEvents();
        };
    }, [
        key
    ]);
    // Polling
    (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.useIsomorphicLayoutEffect)(()=>{
        let timer;
        function next() {
            // Use the passed interval
            // ...or invoke the function with the updated data to get the interval
            const interval = (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isFunction)(refreshInterval) ? refreshInterval(getCache().data) : refreshInterval;
            // We only start the next interval if `refreshInterval` is not 0, and:
            // - `force` is true, which is the start of polling
            // - or `timer` is not 0, which means the effect wasn't canceled
            if (interval && timer !== -1) {
                timer = setTimeout(execute, interval);
            }
        }
        function execute() {
            // Check if it's OK to execute:
            // Only revalidate when the page is visible, online, and not errored.
            if (!getCache().error && (refreshWhenHidden || getConfig().isVisible()) && (refreshWhenOffline || getConfig().isOnline())) {
                revalidate(WITH_DEDUPE).then(next);
            } else {
                // Schedule the next interval to check again.
                next();
            }
        }
        next();
        return ()=>{
            if (timer) {
                clearTimeout(timer);
                timer = -1;
            }
        };
    }, [
        refreshInterval,
        refreshWhenHidden,
        refreshWhenOffline,
        key
    ]);
    // Display debug info in React DevTools.
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useDebugValue)(returnedData);
    // In Suspense mode, we can't return the empty `data` state.
    // If there is an `error`, the `error` needs to be thrown to the error boundary.
    // If there is no `error`, the `revalidation` promise needs to be thrown to
    // the suspense boundary.
    if (suspense && (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(data) && key) {
        // SWR should throw when trying to use Suspense on the server with React 18,
        // without providing any initial data. See:
        // https://github.com/vercel/swr/issues/1832
        if (!swr_internal__WEBPACK_IMPORTED_MODULE_3__.IS_REACT_LEGACY && swr_internal__WEBPACK_IMPORTED_MODULE_3__.IS_SERVER) {
            throw new Error('Fallback data is required when using suspense in SSR.');
        }
        // Always update fetcher and config refs even with the Suspense mode.
        fetcherRef.current = fetcher;
        configRef.current = config;
        unmountedRef.current = false;
        const req = PRELOAD[key];
        if (!(0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(req)) {
            const promise = boundMutate(req);
            use(promise);
        }
        if ((0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(error)) {
            const promise = revalidate(WITH_DEDUPE);
            if (!(0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.isUndefined)(returnedData)) {
                promise.status = 'fulfilled';
                promise.value = true;
            }
            use(promise);
        } else {
            throw error;
        }
    }
    return {
        mutate: boundMutate,
        get data () {
            stateDependencies.data = true;
            return returnedData;
        },
        get error () {
            stateDependencies.error = true;
            return error;
        },
        get isValidating () {
            stateDependencies.isValidating = true;
            return isValidating;
        },
        get isLoading () {
            stateDependencies.isLoading = true;
            return isLoading;
        }
    };
};
const SWRConfig = swr_internal__WEBPACK_IMPORTED_MODULE_3__.OBJECT.defineProperty(swr_internal__WEBPACK_IMPORTED_MODULE_3__.SWRConfig, 'defaultValue', {
    value: swr_internal__WEBPACK_IMPORTED_MODULE_3__.defaultConfig
});
/**
 * A hook to fetch data.
 *
 * @link https://swr.vercel.app
 * @example
 * ```jsx
 * import useSWR from 'swr'
 * function Profile() {
 *   const { data, error, isLoading } = useSWR('/api/user', fetcher)
 *   if (error) return <div>failed to load</div>
 *   if (isLoading) return <div>loading...</div>
 *   return <div>hello {data.name}!</div>
 * }
 * ```
 */ const useSWR = (0,swr_internal__WEBPACK_IMPORTED_MODULE_3__.withArgs)(useSWRHandler);




/***/ }),

/***/ "./node_modules/swr/infinite/dist/index.mjs":
/*!**************************************************!*\
  !*** ./node_modules/swr/infinite/dist/index.mjs ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ useSWRInfinite; },
/* harmony export */   infinite: function() { return /* binding */ infinite; },
/* harmony export */   unstable_serialize: function() { return /* binding */ unstable_serialize; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swr */ "./node_modules/swr/core/dist/index.mjs");
/* harmony import */ var swr_internal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swr/_internal */ "./node_modules/swr/_internal/dist/index.mjs");
/* harmony import */ var use_sync_external_store_shim_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! use-sync-external-store/shim/index.js */ "./node_modules/use-sync-external-store/shim/index.js");





const getFirstPageKey = (getKey)=>{
    return (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.serialize)(getKey ? getKey(0, null) : null)[0];
};
const unstable_serialize = (getKey)=>{
    return swr_internal__WEBPACK_IMPORTED_MODULE_2__.INFINITE_PREFIX + getFirstPageKey(getKey);
};

// We have to several type castings here because `useSWRInfinite` is a special
// const INFINITE_PREFIX = '$inf$'
const EMPTY_PROMISE = Promise.resolve();
// export const unstable_serialize = (getKey: SWRInfiniteKeyLoader) => {
//   return INFINITE_PREFIX + getFirstPageKey(getKey)
// }
const infinite = (useSWRNext)=>(getKey, fn, config)=>{
        const didMountRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
        const { cache: cache$1, initialSize = 1, revalidateAll = false, persistSize = false, revalidateFirstPage = true, revalidateOnMount = false, parallel = false } = config;
        const [, , , PRELOAD] = swr_internal__WEBPACK_IMPORTED_MODULE_2__.SWRGlobalState.get(swr_internal__WEBPACK_IMPORTED_MODULE_2__.cache);
        // The serialized key of the first page. This key will be used to store
        // metadata of this SWR infinite hook.
        let infiniteKey;
        try {
            infiniteKey = getFirstPageKey(getKey);
            if (infiniteKey) infiniteKey = swr_internal__WEBPACK_IMPORTED_MODULE_2__.INFINITE_PREFIX + infiniteKey;
        } catch (err) {
        // Not ready yet.
        }
        const [get, set, subscribeCache] = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.createCacheHelper)(cache$1, infiniteKey);
        const getSnapshot = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
            const size = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(get()._l) ? initialSize : get()._l;
            return size;
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [
            cache$1,
            infiniteKey,
            initialSize
        ]);
        (0,use_sync_external_store_shim_index_js__WEBPACK_IMPORTED_MODULE_3__.useSyncExternalStore)((0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((callback)=>{
            if (infiniteKey) return subscribeCache(infiniteKey, ()=>{
                callback();
            });
            return ()=>{};
        }, // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            cache$1,
            infiniteKey
        ]), getSnapshot, getSnapshot);
        const resolvePageSize = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
            const cachedPageSize = get()._l;
            return (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(cachedPageSize) ? initialSize : cachedPageSize;
        // `cache` isn't allowed to change during the lifecycle
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [
            infiniteKey,
            initialSize
        ]);
        // keep the last page size to restore it with the persistSize option
        const lastPageSizeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(resolvePageSize());
        // When the page key changes, we reset the page size if it's not persisted
        (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(()=>{
            if (!didMountRef.current) {
                didMountRef.current = true;
                return;
            }
            if (infiniteKey) {
                // If the key has been changed, we keep the current page size if persistSize is enabled
                // Otherwise, we reset the page size to cached pageSize
                set({
                    _l: persistSize ? lastPageSizeRef.current : resolvePageSize()
                });
            }
        // `initialSize` isn't allowed to change during the lifecycle
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [
            infiniteKey,
            cache$1
        ]);
        // Needs to check didMountRef during mounting, not in the fetcher
        const shouldRevalidateOnMount = revalidateOnMount && !didMountRef.current;
        // Actual SWR hook to load all pages in one fetcher.
        const swr = useSWRNext(infiniteKey, async (key)=>{
            // get the revalidate context
            const forceRevalidateAll = get()._i;
            // return an array of page data
            const data = [];
            const pageSize = resolvePageSize();
            const [getCache] = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.createCacheHelper)(cache$1, key);
            const cacheData = getCache().data;
            const revalidators = [];
            let previousPageData = null;
            for(let i = 0; i < pageSize; ++i){
                const [pageKey, pageArg] = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.serialize)(getKey(i, parallel ? null : previousPageData));
                if (!pageKey) {
                    break;
                }
                const [getSWRCache, setSWRCache] = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.createCacheHelper)(cache$1, pageKey);
                // Get the cached page data.
                let pageData = getSWRCache().data;
                // should fetch (or revalidate) if:
                // - `revalidateAll` is enabled
                // - `mutate()` called
                // - the cache is missing
                // - it's the first page and it's not the initial render
                // - `revalidateOnMount` is enabled and it's on mount
                // - cache for that page has changed
                const shouldFetchPage = revalidateAll || forceRevalidateAll || (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(pageData) || revalidateFirstPage && !i && !(0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(cacheData) || shouldRevalidateOnMount || cacheData && !(0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(cacheData[i]) && !config.compare(cacheData[i], pageData);
                if (fn && shouldFetchPage) {
                    const revalidate = async ()=>{
                        const hasPreloadedRequest = pageKey in PRELOAD;
                        if (!hasPreloadedRequest) {
                            pageData = await fn(pageArg);
                        } else {
                            const req = PRELOAD[pageKey];
                            // delete the preload cache key before resolving it
                            // in case there's an error
                            delete PRELOAD[pageKey];
                            // get the page data from the preload cache
                            pageData = await req;
                        }
                        setSWRCache({
                            data: pageData,
                            _k: pageArg
                        });
                        data[i] = pageData;
                    };
                    if (parallel) {
                        revalidators.push(revalidate);
                    } else {
                        await revalidate();
                    }
                } else {
                    data[i] = pageData;
                }
                if (!parallel) {
                    previousPageData = pageData;
                }
            }
            // flush all revalidateions in parallel
            if (parallel) {
                await Promise.all(revalidators.map((r)=>r()));
            }
            // once we executed the data fetching based on the context, clear the context
            set({
                _i: swr_internal__WEBPACK_IMPORTED_MODULE_2__.UNDEFINED
            });
            // return the data
            return data;
        }, config);
        const mutate = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(// eslint-disable-next-line func-names
        function(data, opts) {
            // When passing as a boolean, it's explicitly used to disable/enable
            // revalidation.
            const options = typeof opts === 'boolean' ? {
                revalidate: opts
            } : opts || {};
            // Default to true.
            const shouldRevalidate = options.revalidate !== false;
            // It is possible that the key is still falsy.
            if (!infiniteKey) return EMPTY_PROMISE;
            if (shouldRevalidate) {
                if (!(0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(data)) {
                    // We only revalidate the pages that are changed
                    set({
                        _i: false
                    });
                } else {
                    // Calling `mutate()`, we revalidate all pages
                    set({
                        _i: true
                    });
                }
            }
            return arguments.length ? swr.mutate(data, {
                ...options,
                revalidate: shouldRevalidate
            }) : swr.mutate();
        }, // swr.mutate is always the same reference
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            infiniteKey,
            cache$1
        ]);
        // Extend the SWR API
        const setSize = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((arg)=>{
            // It is possible that the key is still falsy.
            if (!infiniteKey) return EMPTY_PROMISE;
            const [, changeSize] = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.createCacheHelper)(cache$1, infiniteKey);
            let size;
            if ((0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isFunction)(arg)) {
                size = arg(resolvePageSize());
            } else if (typeof arg == 'number') {
                size = arg;
            }
            if (typeof size != 'number') return EMPTY_PROMISE;
            changeSize({
                _l: size
            });
            lastPageSizeRef.current = size;
            // Calculate the page data after the size change.
            const data = [];
            const [getInfiniteCache] = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.createCacheHelper)(cache$1, infiniteKey);
            let previousPageData = null;
            for(let i = 0; i < size; ++i){
                const [pageKey] = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.serialize)(getKey(i, previousPageData));
                const [getCache] = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.createCacheHelper)(cache$1, pageKey);
                // Get the cached page data.
                const pageData = pageKey ? getCache().data : swr_internal__WEBPACK_IMPORTED_MODULE_2__.UNDEFINED;
                // Call `mutate` with infinte cache data if we can't get it from the page cache.
                if ((0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(pageData)) {
                    return mutate(getInfiniteCache().data);
                }
                data.push(pageData);
                previousPageData = pageData;
            }
            return mutate(data);
        }, // exclude getKey from the dependencies, which isn't allowed to change during the lifecycle
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            infiniteKey,
            cache$1,
            mutate,
            resolvePageSize
        ]);
        // Use getter functions to avoid unnecessary re-renders caused by triggering
        // all the getters of the returned swr object.
        return {
            size: resolvePageSize(),
            setSize,
            mutate,
            get data () {
                return swr.data;
            },
            get error () {
                return swr.error;
            },
            get isValidating () {
                return swr.isValidating;
            },
            get isLoading () {
                return swr.isLoading;
            }
        };
    };
const useSWRInfinite = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.withMiddleware)(swr__WEBPACK_IMPORTED_MODULE_1__["default"], infinite);




/***/ }),

/***/ "./src/blocks/block.json":
/*!*******************************!*\
  !*** ./src/blocks/block.json ***!
  \*******************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"wonder-blocks/library","title":"Wonder Blocks","description":"Add patterns and page templates tailored for your site.","keywords":["template","patterns","blocks"],"textdomain":"nfd-wonder-blocks","attributes":{"preview":{"type":"string"},"category":{"type":"string"}}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!******************************!*\
  !*** ./src/wonder-blocks.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/app.scss */ "./src/styles/app.scss");
/* harmony import */ var _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @newfold-labs/js-utility-ui-analytics */ "./node_modules/@newfold-labs/js-utility-ui-analytics/src/index.js");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _blocks_inspector_control__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./blocks/inspector-control */ "./src/blocks/inspector-control.js");
/* harmony import */ var _blocks_register_category__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./blocks/register-category */ "./src/blocks/register-category.js");
/* harmony import */ var _blocks_block__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./blocks/block */ "./src/blocks/block.js");
/* harmony import */ var _components_Modal_Modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/Modal/Modal */ "./src/components/Modal/Modal.jsx");
/* harmony import */ var _components_ToolbarButton__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/ToolbarButton */ "./src/components/ToolbarButton.jsx");

/**
 * Styles.
 */


/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */






_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_3___default()(() => {
  initializeHiiveAnalytics();
  renderModal(_constants__WEBPACK_IMPORTED_MODULE_6__.NFD_WONDER_BLOCKS_MODAL_ID);
});

/**
 * This function creates a modal that is rendered on the page.
 *
 * @param {string} elementId It takes an elementId as an argument and creates a div with the given elementId.
 */
const renderModal = elementId => {
  const modalRoot = document.createElement('div');
  modalRoot.id = elementId;

  // Append the modal container to the body if it hasn't been added already.
  if (!document.getElementById(elementId)) {
    document.body.append(modalRoot);
  }
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.render)((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Modal_Modal__WEBPACK_IMPORTED_MODULE_10__["default"], null), modalRoot);
};

/**
 * Initialize Hiive Analytics.
 */
const initializeHiiveAnalytics = () => {
  _newfold_labs_js_utility_ui_analytics__WEBPACK_IMPORTED_MODULE_2__.HiiveAnalytics.initialize({
    namespace: _constants__WEBPACK_IMPORTED_MODULE_6__.HIIVE_ANALYTICS_CATEGORY,
    urls: {
      single: `${_constants__WEBPACK_IMPORTED_MODULE_6__.NFD_REST_URL}/events`,
      batch: `${_constants__WEBPACK_IMPORTED_MODULE_6__.NFD_REST_URL}/events/batch`
    },
    settings: {
      debounce: {
        time: 3000
      }
    }
  });
};

/**
 * Add the Wonder Blocks trigger button.
 * A hacky solution until proper FillSlot is implemented for adding header toolbar buttons in Gutenberg.
 */
const registerCallback = () => {
  window.requestAnimationFrame(() => {
    // Do not add the button again if it has been already added.
    if (document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_6__.NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID)) {
      unsubscribe();
      return;
    }

    // Exit early if the toolbar doesn't exist.
    if (!document.querySelector('.edit-post-header-toolbar') && !document.querySelector('.edit-site-header_start')) {
      return;
    }

    // Create the button container.
    const buttonContainer = document.createElement('div');
    buttonContainer.id = _constants__WEBPACK_IMPORTED_MODULE_6__.NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID;
    buttonContainer.classList.add('nfd-wba-shrink-0');

    // Append the button container to the block editor.
    document.querySelector('.edit-post-header-toolbar')?.append(buttonContainer);

    // Append the button container to the FSE.
    document.querySelector('.edit-site-header_start')?.append(buttonContainer);

    // Render the button.
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.render)((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ToolbarButton__WEBPACK_IMPORTED_MODULE_11__["default"], null), buttonContainer);

    // Dispatch 'wonder-blocks/toolbar-button-added' event.
    document.dispatchEvent(new Event('wonder-blocks/toolbar-button-added'));
    unsubscribe();
  });
};
const unsubscribe = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_5__.subscribe)(registerCallback);
}();
((window.newfold = window.newfold || {}).WonderBlocks = window.newfold.WonderBlocks || {})["wonder-blocks"] = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=wonder-blocks.js.map