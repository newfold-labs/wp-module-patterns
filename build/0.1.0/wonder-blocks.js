/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@tanem/react-nprogress/dist/react-nprogress.esm.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanem/react-nprogress/dist/react-nprogress.esm.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NProgress": function() { return /* binding */ NProgress; },
/* harmony export */   "useNProgress": function() { return /* binding */ useNProgress; },
/* harmony export */   "withNProgress": function() { return /* binding */ withNProgress; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutPropertiesLoose */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! hoist-non-react-statics */ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_3__);






var clamp = function clamp(num, lower, upper) {
  num = num <= upper ? num : upper;
  num = num >= lower ? num : lower;
  return num;
};

var createQueue = function createQueue() {
  var isRunning = false;
  var pending = [];
  var next = function next() {
    isRunning = true;
    var cb = pending.shift();
    if (cb) {
      return cb(next);
    }
    isRunning = false;
  };
  var clear = function clear() {
    isRunning = false;
    pending = [];
  };
  var enqueue = function enqueue(cb) {
    pending.push(cb);
    if (!isRunning && pending.length === 1) {
      next();
    }
  };
  return {
    clear: clear,
    enqueue: enqueue
  };
};

var createTimeout = function createTimeout() {
  var handle;
  var cancel = function cancel() {
    if (handle) {
      window.cancelAnimationFrame(handle);
    }
  };
  var schedule = function schedule(callback, delay) {
    var deltaTime;
    var start;
    var frame = function frame(time) {
      start = start || time;
      deltaTime = time - start;
      if (deltaTime > delay) {
        callback();
        return;
      }
      handle = window.requestAnimationFrame(frame);
    };
    handle = window.requestAnimationFrame(frame);
  };
  return {
    cancel: cancel,
    schedule: schedule
  };
};

var increment = function increment(progress) {
  var amount = 0;
  if (progress >= 0 && progress < 0.2) {
    amount = 0.1;
  } else if (progress >= 0.2 && progress < 0.5) {
    amount = 0.04;
  } else if (progress >= 0.5 && progress < 0.8) {
    amount = 0.02;
  } else if (progress >= 0.8 && progress < 0.99) {
    amount = 0.005;
  }
  return clamp(progress + amount, 0, 0.994);
};

// Hat-tip:
var useEffectOnce = function useEffectOnce(effect) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(effect, []);
};

var incrementParameter = function incrementParameter(num) {
  return ++num % 1000000;
};
var useUpdate = function useUpdate() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(0),
    setState = _useState[1];
  return (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function () {
    return setState(incrementParameter);
  }, []);
};
var useGetSetState = function useGetSetState( /* istanbul ignore next */
initialState) {
  if (initialState === void 0) {
    initialState = {};
  }
  var update = useUpdate();
  var state = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)((0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, initialState));
  var get = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function () {
    return state.current;
  }, []);
  var set = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function (patch) {
    if (!patch) {
      return;
    }
    Object.assign(state.current, patch);
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [get, set];
};

// Hat-tip:
var useFirstMountState = function useFirstMountState() {
  var isFirst = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(true);
  if (isFirst.current) {
    isFirst.current = false;
    return true;
  }
  return isFirst.current;
};
var useUpdateEffect = function useUpdateEffect(effect, deps) {
  var isFirstMount = useFirstMountState();
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    if (!isFirstMount) {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

/* istanbul ignore next */
var noop = function noop() {
  return undefined;
};
var initialState = {
  isFinished: true,
  progress: 0,
  sideEffect: noop
};
var useNProgress = function useNProgress(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    _ref$animationDuratio = _ref.animationDuration,
    animationDuration = _ref$animationDuratio === void 0 ? 200 : _ref$animationDuratio,
    _ref$incrementDuratio = _ref.incrementDuration,
    incrementDuration = _ref$incrementDuratio === void 0 ? 800 : _ref$incrementDuratio,
    _ref$isAnimating = _ref.isAnimating,
    isAnimating = _ref$isAnimating === void 0 ? false : _ref$isAnimating,
    _ref$minimum = _ref.minimum,
    minimum = _ref$minimum === void 0 ? 0.08 : _ref$minimum;
  var _useGetSetState = useGetSetState(initialState),
    get = _useGetSetState[0],
    setState = _useGetSetState[1];
  var queue = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  var timeout = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
  useEffectOnce(function () {
    queue.current = createQueue();
    timeout.current = createTimeout();
  });
  var cleanup = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function () {
    var _timeout$current, _queue$current;
    (_timeout$current = timeout.current) == null ? void 0 : _timeout$current.cancel();
    (_queue$current = queue.current) == null ? void 0 : _queue$current.clear();
  }, []);
  var set = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function (n) {
    var _queue$current4;
    n = clamp(n, minimum, 1);
    if (n === 1) {
      var _queue$current2, _queue$current3;
      cleanup();
      (_queue$current2 = queue.current) == null ? void 0 : _queue$current2.enqueue(function (next) {
        setState({
          progress: n,
          sideEffect: function sideEffect() {
            var _timeout$current2;
            return (_timeout$current2 = timeout.current) == null ? void 0 : _timeout$current2.schedule(next, animationDuration);
          }
        });
      });
      (_queue$current3 = queue.current) == null ? void 0 : _queue$current3.enqueue(function () {
        setState({
          isFinished: true,
          sideEffect: cleanup
        });
      });
      return;
    }
    (_queue$current4 = queue.current) == null ? void 0 : _queue$current4.enqueue(function (next) {
      setState({
        isFinished: false,
        progress: n,
        sideEffect: function sideEffect() {
          var _timeout$current3;
          return (_timeout$current3 = timeout.current) == null ? void 0 : _timeout$current3.schedule(next, animationDuration);
        }
      });
    });
  }, [animationDuration, cleanup, minimum, queue, setState, timeout]);
  var trickle = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function () {
    set(increment(get().progress));
  }, [get, set]);
  var start = (0,react__WEBPACK_IMPORTED_MODULE_2__.useCallback)(function () {
    var work = function work() {
      var _queue$current5;
      trickle();
      (_queue$current5 = queue.current) == null ? void 0 : _queue$current5.enqueue(function (next) {
        var _timeout$current4;
        (_timeout$current4 = timeout.current) == null ? void 0 : _timeout$current4.schedule(function () {
          work();
          next();
        }, incrementDuration);
      });
    };
    work();
  }, [incrementDuration, queue, timeout, trickle]);
  var savedTrickle = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(noop);
  var sideEffect = get().sideEffect;
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    savedTrickle.current = trickle;
  });
  useEffectOnce(function () {
    if (isAnimating) {
      start();
    }
    return cleanup;
  });
  useUpdateEffect(function () {
    get().sideEffect();
  }, [get, sideEffect]);
  useUpdateEffect(function () {
    if (!isAnimating) {
      set(1);
    } else {
      setState((0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, initialState, {
        sideEffect: start
      }));
    }
  }, [isAnimating, set, setState, start]);
  return {
    animationDuration: animationDuration,
    isFinished: get().isFinished,
    progress: get().progress
  };
};

var _excluded = ["children"];
var NProgress = function NProgress(_ref) {
  var children = _ref.children,
    restProps = (0,_babel_runtime_helpers_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _excluded);
  var renderProps = useNProgress(restProps);
  return children(renderProps);
};

function withNProgress(BaseComponent) {
  var WithNProgress = function WithNProgress(props) {
    var hookProps = useNProgress(props);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(BaseComponent, (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_1__["default"])({}, props, hookProps));
  };
  hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_3___default()(WithNProgress, BaseComponent);
  return WithNProgress;
}


//# sourceMappingURL=react-nprogress.esm.js.map


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
 * @param {IconProps} props icon is the SVG component to render
 *                          size is a number specifiying the icon size in pixels
 *                          Other props will be passed to wrapped SVG component
 *
 * @return {JSX.Element}  Icon component
 */

function Icon(_ref) {
  let {
    icon,
    size = 24,
    ...props
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(icon, {
    width: size,
    height: size,
    ...props
  });
}

/* harmony default export */ __webpack_exports__["default"] = (Icon);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/buttons.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/buttons.js ***!
  \***********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const buttons = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M17 3H7c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm.5 6c0 .3-.2.5-.5.5H7c-.3 0-.5-.2-.5-.5V5c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v4zm-8-1.2h5V6.2h-5v1.6zM17 13H7c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm.5 6c0 .3-.2.5-.5.5H7c-.3 0-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5h10c.3 0 .5.2.5.5v4zm-8-1.2h5v-1.5h-5v1.5z"
}));
/* harmony default export */ __webpack_exports__["default"] = (buttons);
//# sourceMappingURL=buttons.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/close-small.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/close-small.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const closeSmall = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z"
}));
/* harmony default export */ __webpack_exports__["default"] = (closeSmall);
//# sourceMappingURL=close-small.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/plus.js":
/*!********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/plus.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const plus = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M18 11.2h-5.2V6h-1.6v5.2H6v1.6h5.2V18h1.6v-5.2H18z"
}));
/* harmony default export */ __webpack_exports__["default"] = (plus);
//# sourceMappingURL=plus.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/star-empty.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/star-empty.js ***!
  \**************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const starEmpty = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  fillRule: "evenodd",
  d: "M9.706 8.646a.25.25 0 01-.188.137l-4.626.672a.25.25 0 00-.139.427l3.348 3.262a.25.25 0 01.072.222l-.79 4.607a.25.25 0 00.362.264l4.138-2.176a.25.25 0 01.233 0l4.137 2.175a.25.25 0 00.363-.263l-.79-4.607a.25.25 0 01.072-.222l3.347-3.262a.25.25 0 00-.139-.427l-4.626-.672a.25.25 0 01-.188-.137l-2.069-4.192a.25.25 0 00-.448 0L9.706 8.646zM12 7.39l-.948 1.921a1.75 1.75 0 01-1.317.957l-2.12.308 1.534 1.495c.412.402.6.982.503 1.55l-.362 2.11 1.896-.997a1.75 1.75 0 011.629 0l1.895.997-.362-2.11a1.75 1.75 0 01.504-1.55l1.533-1.495-2.12-.308a1.75 1.75 0 01-1.317-.957L12 7.39z",
  clipRule: "evenodd"
}));
/* harmony default export */ __webpack_exports__["default"] = (starEmpty);
//# sourceMappingURL=star-empty.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/star-filled.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/star-filled.js ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);


/**
 * WordPress dependencies
 */

const starFilled = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M11.776 4.454a.25.25 0 01.448 0l2.069 4.192a.25.25 0 00.188.137l4.626.672a.25.25 0 01.139.426l-3.348 3.263a.25.25 0 00-.072.222l.79 4.607a.25.25 0 01-.362.263l-4.138-2.175a.25.25 0 00-.232 0l-4.138 2.175a.25.25 0 01-.363-.263l.79-4.607a.25.25 0 00-.071-.222L4.754 9.881a.25.25 0 01.139-.426l4.626-.672a.25.25 0 00.188-.137l2.069-4.192z"
}));
/* harmony default export */ __webpack_exports__["default"] = (starFilled);
//# sourceMappingURL=star-filled.js.map

/***/ }),

/***/ "./src/blocks/block.js":
/*!*****************************!*\
  !*** ./src/blocks/block.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/buttons.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/blocks/block.json");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store */ "./src/store/index.js");
var _window$nfdWonderBloc;

/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */


(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__, {
  icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
  category: 'nfd-wonder-blocks',
  example: {
    attributes: {
      preview: ((_window$nfdWonderBloc = window.nfdWonderBlocks) === null || _window$nfdWonderBloc === void 0 ? void 0 : _window$nfdWonderBloc.assets) + '/images/preview.png'
    }
  },
  edit: function Edit(_ref) {
    let {
      clientId,
      attributes
    } = _ref;
    const {
      removeBlock
    } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)('core/block-editor');
    const {
      setIsModalOpen
    } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.store);
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
      if (attributes.preview) {
        return;
      }
      if (attributes.search) {
        addTermToSearchParams(attributes.search);
      }

      // Open modal
      setIsModalOpen(true);

      // Remove empty block
      removeBlock(clientId);
    }, [clientId, attributes, removeBlock, setIsModalOpen]);
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      style: {
        display: 'block',
        maxWidth: '100%'
      },
      src: attributes.preview,
      alt: "Wonder Blocks"
    });
  }
});
const addTermToSearchParams = term => {
  const params = new URLSearchParams(window.location.search);
  params.append('nfd-patternType', term);
  window.history.replaceState(null, null, window.location.pathname + '?' + params.toString());
};

/***/ }),

/***/ "./src/blocks/register-category.js":
/*!*****************************************!*\
  !*** ./src/blocks/register-category.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
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
 * Function to register a block collection for our block(s).
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockCollection)('nfd-wonder-blocks', {
  title: 'Wonder Blocks',
  icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"], {
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"]
  })
});

/***/ }),

/***/ "./src/components/Logo.jsx":
/*!*********************************!*\
  !*** ./src/components/Logo.jsx ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/buttons.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */


/**
 * External dependencies
 */

const Logo = _ref => {
  let {
    size = 'regular',
    color = 'dark'
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-m-0 -nfd-wba-ml-1 nfd-wba-flex nfd-wba-items-center nfd-wba-gap-2 nfd-wba-text-xl nfd-wba-font-normal nfd-wba-text-dark"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"], {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()(color === 'brand' && 'nfd-wba-fill-brand'),
    size: size === 'large' ? 40 : 24,
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"]
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('nfd-wba-select-none', size === 'large' && 'nfd-wba-text-3xl', color === 'brand' && 'nfd-wba-text-brand')
  }, "Wonder Blocks"));
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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _hooks_useFavorites__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../hooks/useFavorites */ "./src/hooks/useFavorites.js");
/* harmony import */ var _hooks_usePatterns__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../hooks/usePatterns */ "./src/hooks/usePatterns.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../store */ "./src/store/index.js");
/* harmony import */ var _DesignList_DesignList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DesignList/DesignList */ "./src/components/Modal/Content/DesignList/DesignList.jsx");
/* harmony import */ var _Header_Header__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Header/Header */ "./src/components/Modal/Content/Header/Header.jsx");
/* harmony import */ var _LoadingBar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./LoadingBar */ "./src/components/Modal/Content/LoadingBar.jsx");

/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */






const Content = () => {
  const {
    activePatternsCategory,
    activeTemplatesCategory,
    isContentLoading,
    isSidebarLoading,
    keywordsFilter,
    activeTab
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => ({
    activeTab: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getActiveTab(),
    activePatternsCategory: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getActivePatternsCategory(),
    activeTemplatesCategory: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getActiveTemplatesCategory(),
    isContentLoading: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).isContentLoading(),
    isSidebarLoading: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).isSidebarLoading(),
    keywordsFilter: select(_store__WEBPACK_IMPORTED_MODULE_5__.store).getKeywordsFilter()
  }));

  // Fetch data.
  const {
    data,
    isValidating,
    isFavorites
  } = (0,_hooks_usePatterns__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const {
    data: favData
  } = (0,_hooks_useFavorites__WEBPACK_IMPORTED_MODULE_3__["default"])();
  const {
    setIsContentLoading
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_5__.store);

  // Set the global content loading state when the data is loading.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setIsContentLoading(!data && isValidating);
  }, [data, isValidating, setIsContentLoading]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-flex nfd-wba-min-w-[400px] nfd-wba-grow nfd-wba-flex-col nfd-wba-overflow-y-auto"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Header_Header__WEBPACK_IMPORTED_MODULE_7__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-relative nfd-wba-flex nfd-wba-grow nfd-wba-flex-col nfd-wba-gap-y-10"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-absolute nfd-wba-inset-0 nfd-wba-overflow-auto nfd-wba-py-8 nfd-wba-px-6"
  }, keywordsFilter && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", {
    className: "nfd-wba-my-0 nfd-wba-text-2xl nfd-wba-font-normal nfd-wba-text-dark"
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.sprintf)(
  // translators: %s is the keywords filter value
  (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Results for %s', 'nfd-wonder-blocks'), keywordsFilter)), data && !isFavorites && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DesignList_DesignList__WEBPACK_IMPORTED_MODULE_6__["default"], {
    data: data
  }), favData && isFavorites && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DesignList_DesignList__WEBPACK_IMPORTED_MODULE_6__["default"], {
    data: favData
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("pre", {
    className: "nfd-wba-m-0 nfd-wba-whitespace-pre-wrap nfd-wba-rounded-md nfd-wba-bg-grey nfd-wba-p-6"
  }, JSON.stringify({
    activeTab,
    activePatternsCategory,
    activeTemplatesCategory,
    isContentLoading,
    isSidebarLoading,
    keywordsFilter,
    isFavorites,
    favData
  }, null, 2)))));
};
/* harmony default export */ __webpack_exports__["default"] = (Content);

/***/ }),

/***/ "./src/components/Modal/Content/DesignList/DesignItem.jsx":
/*!****************************************************************!*\
  !*** ./src/components/Modal/Content/DesignList/DesignItem.jsx ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
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
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/plus.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/star-filled.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/star-empty.js");
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/notices */ "@wordpress/notices");
/* harmony import */ var _wordpress_notices__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_notices__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _helpers_blockInserter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../helpers/blockInserter */ "./src/helpers/blockInserter.js");
/* harmony import */ var _hooks_useFavorites__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../hooks/useFavorites */ "./src/hooks/useFavorites.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../store */ "./src/store/index.js");

/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */










/**
 * Internal dependencies
 */




const DesignItem = _ref => {
  let {
    item
  } = _ref;
  const [isFavorite, setIsFavorite] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [insertingDesign, setInsertingDesign] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    data: favData,
    mutate
  } = (0,_hooks_useFavorites__WEBPACK_IMPORTED_MODULE_11__["default"])();
  const blocks = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__.rawHandler)({
    HTML: item.source
  }), [item.source]);
  const {
    createErrorNotice,
    createSuccessNotice
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useDispatch)(_wordpress_notices__WEBPACK_IMPORTED_MODULE_8__.store);
  const {
    setIsModalOpen
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_12__.store);
  const {
    activeTab
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect)(select => ({
    activeTab: select(_store__WEBPACK_IMPORTED_MODULE_12__.store).getActiveTab()
  }));
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // console.log(favData);
    // Check if the item.title is in the favorites list.
    const isFav = favData.find(fav => fav.title === item.title);
    setIsFavorite(!!isFav);
  }, [favData, item.title]);

  /**
   * Insert the pattern or a collection of patterns (template) into the editor.
   *
   * @return {void}
   * @throws {Error} If the pattern cannot be inserted.
   */
  const insertDesignHandler = async () => {
    setInsertingDesign(true);
    setTimeout(async () => {
      try {
        await (0,_helpers_blockInserter__WEBPACK_IMPORTED_MODULE_10__.blockInserter)(blocks);
        createSuccessNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.sprintf)(
        // translators: %s is the pattern title
        (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('"%s" pattern successfully inserted.', 'nfd-wonder-blocks'), item.title), {
          type: 'snackbar'
        });
      } catch (error) {
        createErrorNotice((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Failed to insert the pattern. Please try again.', 'nfd-wonder-blocks'), {
          type: 'snackbar',
          explicitDismiss: true
        });
      } finally {
        setInsertingDesign(false);
        setIsModalOpen(false);
      }
    }, 30);
  };

  /**
   * Add or remove the pattern from the favorites list.
   *
   * @return {void}
   * @throws {Error} If the pattern cannot be added or removed.
   */
  const addToFavoritesHandler = async () => {
    setIsFavorite(prev => !prev);

    // Add helper functions to add/remove favorites!

    const method = isFavorite ? 'DELETE' : 'POST';
    const d = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      url: `${_constants__WEBPACK_IMPORTED_MODULE_9__.REST_URL}/favorites`,
      method,
      data: {
        ...item,
        type: activeTab
      },
      headers: {
        'x-nfd-wonder-blocks': 'nfd_wonder_blocks'
      }
    });
    mutate();
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-relative nfd-wba-mb-[var(--nfd-wba-masonry-gap)] nfd-wba-flex nfd-wba-flex-col nfd-wba-overflow-hidden nfd-wba-rounded-b-md"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('nfd-wba-design-item nfd-wba-cursor-pointer nfd-wba-overflow-hidden nfd-wba-rounded-t-md nfd-wba-border nfd-wba-border-solid nfd-wba-border-grey nfd-wba-transition-opacity', activeTab === 'templates' && 'nfd-wba-design-item--template', insertingDesign && 'nfd-wba-inserting-design'),
    role: "button",
    tabIndex: "0",
    onClick: () => insertDesignHandler(),
    onKeyUp: e => {
      if (e.key === 'Enter') {
        insertDesignHandler();
      }
    }
  }, blocks && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.BlockPreview, {
    blocks: blocks,
    viewportWidth: 1140
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-flex nfd-wba-items-center nfd-wba-justify-between nfd-wba-gap-3 nfd-wba-bg-grey nfd-wba-px-6 nfd-wba-py-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "nfd-wba-m-0 nfd-wba-text-md nfd-wba-font-normal"
  }, item.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-flex nfd-wba-shrink-0 nfd-wba-items-center nfd-wba-gap-1"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    className: "nfd-wba-h-8 nfd-wba-w-8 !nfd-wba-min-w-0 nfd-wba-bg-white",
    isBusy: insertingDesign,
    isPressed: insertingDesign,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Insert', 'nfd-wonder-blocks'),
    onClick: () => insertDesignHandler(),
    icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_13__["default"], {
      fill: "currentColor",
      className: "nfd-wba-shrink-0",
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_14__["default"]
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('nfd-wba-h-8 nfd-wba-w-8 !nfd-wba-min-w-0 nfd-wba-bg-white', isFavorite && 'nfd-wba-text-dark'),
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_7__.__)('Add to Favorites', 'nfd-wonder-blocks'),
    onClick: () => addToFavoritesHandler(),
    icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_13__["default"], {
      className: "nfd-wba-shrink-0",
      fill: "currentColor",
      icon: isFavorite ? _wordpress_icons__WEBPACK_IMPORTED_MODULE_15__["default"] : _wordpress_icons__WEBPACK_IMPORTED_MODULE_16__["default"]
    })
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(DesignItem));

/***/ }),

/***/ "./src/components/Modal/Content/DesignList/DesignList.jsx":
/*!****************************************************************!*\
  !*** ./src/components/Modal/Content/DesignList/DesignList.jsx ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_masonry_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-masonry-css */ "./node_modules/react-masonry-css/dist/react-masonry-css.module.js");
/* harmony import */ var _DesignItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DesignItem */ "./src/components/Modal/Content/DesignList/DesignItem.jsx");
/* harmony import */ var _NoResults__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./NoResults */ "./src/components/Modal/Content/DesignList/NoResults.jsx");

/**
 * External dependencies
 */


/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */


const DesignList = _ref => {
  let {
    data
  } = _ref;
  if (!data) {
    return null;
  }
  if (!Array.isArray(data)) {
    return null;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (data === null || data === void 0 ? void 0 : data.length) === 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_NoResults__WEBPACK_IMPORTED_MODULE_3__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_masonry_css__WEBPACK_IMPORTED_MODULE_1__["default"], {
    breakpointCols: {
      default: 3,
      1600: 2,
      1024: 1
    },
    className: "nfd-wba-design-list -nfd-wba-ml-[var(--nfd-wba-masonry-gap)] nfd-wba-flex nfd-wba-w-auto",
    columnClassName: "nfd-wba-design-list__column nfd-wba-pl-[var(--nfd-wba-masonry-gap)]"
  }, data === null || data === void 0 ? void 0 : data.map(item => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DesignItem__WEBPACK_IMPORTED_MODULE_2__["default"], {
    key: item.key,
    item: item
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = ((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.memo)(DesignList));

/***/ }),

/***/ "./src/components/Modal/Content/DesignList/NoResults.jsx":
/*!***************************************************************!*\
  !*** ./src/components/Modal/Content/DesignList/NoResults.jsx ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const NoResults = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No results found', 'nfd-wonder-blocks'));
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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/close-small.js");
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
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("header", {
    className: "nfd-wba-modal__header"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_KeywordFilter__WEBPACK_IMPORTED_MODULE_5__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-items-center nfd-wba-ml-auto nfd-wba-flex nfd-wba-gap-x-4"
  }, showTrial && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_TrialNotice__WEBPACK_IMPORTED_MODULE_6__["default"], null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    className: "nfd-wba-ml-auto nfd-wba-text-current hover:nfd-wba-text-dark",
    showTooltip: false,
    onClick: () => {
      setIsModalOpen(false);
    },
    icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_7__["default"],
    iconSize: 24,
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Close', 'nfd-wonder-blocks')
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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../constants */ "./src/constants.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../store */ "./src/store/index.js");

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
  const searchRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [searchValue, setSearchValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const {
    setKeywordsFilter
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_6__.store);
  const {
    isSidebarLoading,
    isContentLoading
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => ({
    isSidebarLoading: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).isSidebarLoading(),
    isContentLoading: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).isContentLoading()
  }));

  // Debounce search value changes in store.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const delayedSearch = lodash_debounce__WEBPACK_IMPORTED_MODULE_4___default()(() => {
      setKeywordsFilter(searchValue);
    }, searchValue === '' ? 0 : _constants__WEBPACK_IMPORTED_MODULE_5__.INPUT_DEBOUNCE_TIME // Don't debounce empty searches.
    );

    delayedSearch();
    return delayedSearch.cancel;
  }, [searchValue, setKeywordsFilter]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-flex nfd-wba-items-center nfd-wba-gap-x-3"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SearchControl, {
    className: "nfd-wba-keyword-filter nfd-wba-m-0",
    disabled: isSidebarLoading || isContentLoading,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Keywords', 'nfd-wonder-blocks'),
    ref: searchRef,
    value: searchValue,
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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const TrialNotice = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Trial Notice / CTB");
};
/* harmony default export */ __webpack_exports__["default"] = (TrialNotice);

/***/ }),

/***/ "./src/components/Modal/Content/LoadingBar.jsx":
/*!*****************************************************!*\
  !*** ./src/components/Modal/Content/LoadingBar.jsx ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _tanem_react_nprogress__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanem/react-nprogress */ "./node_modules/@tanem/react-nprogress/dist/react-nprogress.esm.js");
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Logo */ "./src/components/Logo.jsx");

/**
 * WordPress dependencies
 */



/**
 * External dependencies
 */


function LoadingBar(_ref) {
  let {
    isComplete
  } = _ref;
  const {
    isFinished,
    progress
  } = (0,_tanem_react_nprogress__WEBPACK_IMPORTED_MODULE_2__.useNProgress)({
    isAnimating: !isComplete,
    incrementDuration: 300
  });
  const barRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (barRef.current) {
      barRef.current.style.setProperty('--nfd-wba-loading-progress', progress);
    }
  }, [progress]);
  if (isFinished) {
    return null;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-absolute nfd-wba-inset-0 nfd-wba-z-[2] nfd-wba-flex nfd-wba-flex-col nfd-wba-items-center nfd-wba-justify-center nfd-wba-gap-y-6 nfd-wba-bg-white nfd-wba-px-6 nfd-wba-pb-40"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Logo__WEBPACK_IMPORTED_MODULE_1__["default"], {
    size: "large",
    color: "brand"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ref: barRef,
    className: "nfd-wba-loading-bar nfd-wba-relative nfd-wba-h-2 nfd-wba-w-full nfd-wba-max-w-[360px] nfd-wba-overflow-hidden nfd-wba-rounded-full"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "nfd-wba-m-0 nfd-wba-mt-2 nfd-wba-text-center nfd-wba-text-xl nfd-wba-font-light nfd-wba-text-dark-lighter"
  }, "One moment while we load content tailored for your site."));
}
/* harmony default export */ __webpack_exports__["default"] = (LoadingBar);

/***/ }),

/***/ "./src/components/Modal/Modal.jsx":
/*!****************************************!*\
  !*** ./src/components/Modal/Modal.jsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../store */ "./src/store/index.js");
/* harmony import */ var _Content_Content__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Content/Content */ "./src/components/Modal/Content/Content.jsx");
/* harmony import */ var _Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Sidebar/Sidebar */ "./src/components/Modal/Sidebar/Sidebar.jsx");

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
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_3__.store);

  // Check if we are editing a template, via site editor or page.
  const {
    editedPostType,
    isModalOpen,
    getEditedPostId,
    isEditingTemplate
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    var _select, _select2, _select3;
    return {
      editedPostType: (_select = select('core/edit-site')) === null || _select === void 0 ? void 0 : _select.getEditedPostType(),
      getEditedPostId: (_select2 = select('core/edit-site')) === null || _select2 === void 0 ? void 0 : _select2.getEditedPostId(),
      isEditingTemplate: (_select3 = select('core/edit-post')) === null || _select3 === void 0 ? void 0 : _select3.isEditingTemplate(),
      isModalOpen: select(_store__WEBPACK_IMPORTED_MODULE_3__.store).isModalOpen()
    };
  });

  // Check if we are editing a template, via page or site editor.
  const isSiteEditor = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return isEditingTemplate || !!editedPostType;
  }, [isEditingTemplate, editedPostType]);

  // Check if we should automatically open the modal and pre-select.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const search = new URLSearchParams(window.location.search);
    if (search.has('nfd-wb-modal')) {
      setIsModalOpen(true);
    }
  }, [setIsModalOpen]);
  if (!isModalOpen) {
    return null;
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    className: "nfd-wba-modal nfd-wba-shadow-none sm:nfd-wba-max-h-[90%] md:nfd-wba-max-w-[90%]",
    __experimentalHideHeader: true,
    "aria-expanded": true,
    isFullScreen: true,
    onRequestClose: () => setIsModalOpen(false)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-grid nfd-wba-grow nfd-wba-grid-cols-library-modal nfd-wba-bg-white nfd-wba-text-dark-lighter"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Sidebar_Sidebar__WEBPACK_IMPORTED_MODULE_5__["default"], {
    isSiteEditor: isSiteEditor
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Content_Content__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/star-empty.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants */ "./src/constants.js");
/* harmony import */ var _hooks_useCategories__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../hooks/useCategories */ "./src/hooks/useCategories.js");
/* harmony import */ var _hooks_useFavorites__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../hooks/useFavorites */ "./src/hooks/useFavorites.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../store */ "./src/store/index.js");
/* harmony import */ var _ErrorLoading__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ErrorLoading */ "./src/components/Modal/Sidebar/ErrorLoading.jsx");
/* harmony import */ var _ListElement__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ListElement */ "./src/components/Modal/Sidebar/ListElement.jsx");
/* harmony import */ var _Skeleton__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Skeleton */ "./src/components/Modal/Sidebar/Skeleton.jsx");

/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */







const Categories = _ref => {
  let {
    isSiteEditor,
    type = 'patterns'
  } = _ref;
  const {
    data,
    error,
    isValidating
  } = (0,_hooks_useCategories__WEBPACK_IMPORTED_MODULE_4__["default"])(type);
  const {
    data: favoritesData
  } = (0,_hooks_useFavorites__WEBPACK_IMPORTED_MODULE_5__["default"])();
  const {
    setActivePatternsCategory,
    setActiveTemplatesCategory,
    setIsSidebarLoading
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_6__.store);
  const {
    activePatternsCategory
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    return {
      activePatternsCategory: select(_store__WEBPACK_IMPORTED_MODULE_6__.store).getActivePatternsCategory()
    };
  }, []);

  // Set global state when the categories are loading.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setIsSidebarLoading(!data && isValidating);
  }, [data, isValidating, setIsSidebarLoading]);

  /**
   * Set the active category.
   *
   * @param {string} category
   */
  const setActiveCategory = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(category => {
    if (category === 'favorites') {
      setActivePatternsCategory(category);
      setActiveTemplatesCategory(category);
    } else if (type === 'patterns') {
      setActivePatternsCategory(category);
    } else {
      setActiveTemplatesCategory(category);
    }
  }, [setActivePatternsCategory, setActiveTemplatesCategory, type]);

  // Filter the categories if we are not in the site editor.
  const filteredCategories = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!data || !Array.isArray(data)) {
      return null;
    }
    if (!isSiteEditor) {
      return data === null || data === void 0 ? void 0 : data.filter(category => !_constants__WEBPACK_IMPORTED_MODULE_3__.SITE_EDITOR_CATEGORIES.includes(category.title));
    }
    return data;
  }, [isSiteEditor, data]);

  // Set the active category to the first when the categories are loaded.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (data && !activePatternsCategory) {
      var _data$;
      setActiveCategory((_data$ = data[0]) === null || _data$ === void 0 ? void 0 : _data$.title);
    }
  }, [activePatternsCategory, data, setActiveCategory]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, !data && isValidating && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Skeleton__WEBPACK_IMPORTED_MODULE_9__["default"], {
    count: 7
  }), !data && error && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ErrorLoading__WEBPACK_IMPORTED_MODULE_7__["default"], null), data && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "nfd-wba-m-0 nfd-wba-flex nfd-wba-list-none nfd-wba-flex-col nfd-wba-py-4 nfd-wba-px-0 nfd-wba-text-md nfd-wba-leading-5"
  }, filteredCategories === null || filteredCategories === void 0 ? void 0 : filteredCategories.map(category => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ListElement__WEBPACK_IMPORTED_MODULE_8__["default"], {
      key: category.id,
      category: category,
      categoryType: type,
      onClick: () => {
        setActiveCategory(category === null || category === void 0 ? void 0 : category.title);
      }
    });
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_ListElement__WEBPACK_IMPORTED_MODULE_8__["default"], {
    className: "nfd-wba-mt-4",
    category: {
      id: `favorite-${type}`,
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Favorites', 'nfd-wonder-blocks'),
      title: 'favorites',
      count: favoritesData && Array.isArray(favoritesData) ? favoritesData.length : 0
    },
    categoryType: type,
    icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_10__["default"], {
      fill: "currentColor",
      className: "-nfd-wba-ml-1",
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_11__["default"]
    }),
    onClick: () => {
      setActiveCategory('favorites');
    }
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (Categories);

/***/ }),

/***/ "./src/components/Modal/Sidebar/ErrorLoading.jsx":
/*!*******************************************************!*\
  !*** ./src/components/Modal/Sidebar/ErrorLoading.jsx ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const ErrorLoading = () => {
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
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
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../store */ "./src/store/index.js");


/**
 * WordPress dependencies
 */



/**
 * External dependencies
 */


/**
 * Internal dependencies
 */

const ListElement = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.forwardRef)((_ref, ref) => {
  let {
    category,
    categoryType,
    className,
    icon,
    ...otherProps
  } = _ref;
  const {
    activePatternsCategory,
    activeTemplatesCategory
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => ({
    activePatternsCategory: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getActivePatternsCategory(),
    activeTemplatesCategory: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getActiveTemplatesCategory()
  }));

  /**
   * Check if the category is active.
   *
   * @return {boolean} True if the category is active within the categoryType prop.
   */
  const isActiveCategory = () => {
    if (categoryType === 'patterns') {
      return activePatternsCategory === (category === null || category === void 0 ? void 0 : category.title);
    }
    return activeTemplatesCategory === (category === null || category === void 0 ? void 0 : category.title);
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("li", {
    className: "nfd-wba-m-0 nfd-wba-p-0"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('nfd-wba-list-element nfd-wba-relative nfd-wba-flex nfd-wba-min-h-[43px] nfd-wba-w-full nfd-wba-select-none nfd-wba-items-center nfd-wba-justify-between nfd-wba-gap-x-2 nfd-wba-rounded-none nfd-wba-border-0 nfd-wba-bg-transparent nfd-wba-py-2 nfd-wba-pl-6 nfd-wba-transition-all nfd-wba-duration-100', (category === null || category === void 0 ? void 0 : category.count) && 'nfd-wba-pr-4', !(category !== null && category !== void 0 && category.count) && 'nfd-wba-pr-6', !isActiveCategory() && 'nfd-wba-cursor-pointer nfd-wba-text-current hover:nfd-wba-bg-grey/50 hover:nfd-wba-text-dark',
    // inactive
    isActiveCategory() && 'nfd-wba--is-active nfd-wba-pointer-events-none nfd-wba-text-brand',
    // active
    className),
    type: "button",
    ref: ref
  }, otherProps), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "nfd-wba-flex nfd-wba-items-center nfd-wba-gap-2 nfd-wba-text-left"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", null, category === null || category === void 0 ? void 0 : category.label), icon && icon), (category === null || category === void 0 ? void 0 : category.count) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "nfd-wba-rounded-full nfd-wba-bg-grey nfd-wba-py-1 nfd-wba-px-3 nfd-wba-text-sm nfd-wba-text-dark-lighter"
  }, category.count)));
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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../store */ "./src/store/index.js");
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Logo */ "./src/components/Logo.jsx");
/* harmony import */ var _Categories__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Categories */ "./src/components/Modal/Sidebar/Categories.jsx");

/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */



const Sidebar = _ref => {
  let {
    isSiteEditor
  } = _ref;
  const {
    setActiveTab
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.store);
  const {
    activeTab
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {
    return {
      activeTab: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).getActiveTab()
    };
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-flex nfd-wba-w-full nfd-wba-max-w-[var(--nfd-wba-sidebar-width)] nfd-wba-shrink-0 nfd-wba-flex-col nfd-wba-overflow-y-auto nfd-wba-border-0 nfd-wba-border-r nfd-wba-border-solid nfd-wba-border-grey-b"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "nfd-wba-modal__header nfd-wba-justify-start"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Logo__WEBPACK_IMPORTED_MODULE_5__["default"], null)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TabPanel, {
    className: "nfd-wba-tab-panel nfd-wba-flex nfd-wba-grow nfd-wba-flex-col",
    activeClass: "nfd-wba--is-active",
    initialTabName: activeTab,
    onSelect: tab => {
      setActiveTab(tab);
    },
    tabs: [{
      name: 'patterns',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Patterns', 'nfd-wonder-blocks')
    }, {
      name: 'templates',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Templates', 'nfd-wonder-blocks')
    }]
  }, tab => (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Categories__WEBPACK_IMPORTED_MODULE_6__["default"], {
    isSiteEditor: isSiteEditor,
    type: tab.name
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (Sidebar);

/***/ }),

/***/ "./src/components/Modal/Sidebar/Skeleton.jsx":
/*!***************************************************!*\
  !*** ./src/components/Modal/Sidebar/Skeleton.jsx ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SkeletonItem": function() { return /* binding */ SkeletonItem; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

/**
 * WordPress dependencies
 */

const Skeleton = _ref => {
  let {
    count,
    minWidth = 40,
    maxWidth = 110
  } = _ref;
  const items = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const result = [];
    for (let i = 0; i < count; i++) {
      const width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
      result.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SkeletonItem, {
        key: i,
        width: width
      }));
    }
    return result;
  }, [count, minWidth, maxWidth]);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    className: "nfd-wba-m-0 nfd-wba-flex nfd-wba-list-none nfd-wba-flex-col nfd-wba-py-4 nfd-wba-pl-6 nfd-wba-pr-4"
  }, items);
};
/* harmony default export */ __webpack_exports__["default"] = (Skeleton);
const SkeletonItem = _ref2 => {
  let {
    width
  } = _ref2;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: "nfd-wba-my-0 nfd-wba-flex nfd-wba-min-h-[43px] nfd-wba-items-center nfd-wba-justify-between"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "nfd-wba-skeleton--item nfd-wba-h-4 nfd-wba-rounded nfd-wba-bg-grey",
    style: {
      width: `${width}px`
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/icon/index.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/buttons.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store */ "./src/store/index.js");

/**
 * WordPress dependencies
 */





/**
 * Internal dependencies
 */

const ToolbarButton = () => {
  const {
    isModalOpen
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => ({
    isModalOpen: select(_store__WEBPACK_IMPORTED_MODULE_4__.store).isModalOpen()
  }));
  const {
    setIsModalOpen
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useDispatch)(_store__WEBPACK_IMPORTED_MODULE_4__.store);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
    icon: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"], {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_6__["default"]
    }),
    text: "Wonder Blocks",
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()('nfd-wba-ml-2 nfd-wba-flex nfd-wba-h-9 nfd-wba-shrink-0 nfd-wba-gap-1 nfd-wba-bg-brand nfd-wba-text-white hover:nfd-wba-bg-brand-darker hover:nfd-wba-text-white focus-visible:nfd-wba-text-white active:!nfd-wba-text-white'),
    isPressed: isModalOpen,
    onClick: () => setIsModalOpen(true)
  }));
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
/* harmony export */   "DEFAULT_ACTIVE_TAB": function() { return /* binding */ DEFAULT_ACTIVE_TAB; },
/* harmony export */   "DEFAULT_PATTERNS_CATEGORY": function() { return /* binding */ DEFAULT_PATTERNS_CATEGORY; },
/* harmony export */   "DEFAULT_TEMPLATES_CATEGORY": function() { return /* binding */ DEFAULT_TEMPLATES_CATEGORY; },
/* harmony export */   "INPUT_DEBOUNCE_TIME": function() { return /* binding */ INPUT_DEBOUNCE_TIME; },
/* harmony export */   "NFD_WONDER_BLOCKS_MODAL_ID": function() { return /* binding */ NFD_WONDER_BLOCKS_MODAL_ID; },
/* harmony export */   "NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID": function() { return /* binding */ NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID; },
/* harmony export */   "REST_URL": function() { return /* binding */ REST_URL; },
/* harmony export */   "SITE_EDITOR_CATEGORIES": function() { return /* binding */ SITE_EDITOR_CATEGORIES; }
/* harmony export */ });
var _window$nfdWonderBloc;
const NFD_WONDER_BLOCKS_MODAL_ID = 'nfd-wba-modal';
const NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID = 'nfd-wba-toolbar-button';
const REST_URL = ((_window$nfdWonderBloc = window.nfdWonderBlocks) === null || _window$nfdWonderBloc === void 0 ? void 0 : _window$nfdWonderBloc.restURL) || '';
const INPUT_DEBOUNCE_TIME = 800;
const SITE_EDITOR_CATEGORIES = ['headers', 'footers'];
const DEFAULT_ACTIVE_TAB = 'patterns';
const DEFAULT_PATTERNS_CATEGORY = 'featured';
const DEFAULT_TEMPLATES_CATEGORY = 'featured';

/***/ }),

/***/ "./src/helpers/blockInserter.js":
/*!**************************************!*\
  !*** ./src/helpers/blockInserter.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "blockInserter": function() { return /* binding */ blockInserter; }
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
  if (name === 'core/paragraph' && (attributes === null || attributes === void 0 ? void 0 : attributes.content) === '') {
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
/* harmony export */   "fetcher": function() { return /* binding */ fetcher; }
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Fetcher function for SWR.
 *
 * @param {...any} args
 * @return {Promise} Returns the response of the apiFetch function.
 */

const fetcher = _ref => {
  let {
    ...args
  } = _ref;
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
  return _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()(mergedOptions).then(res => res);
};

/***/ }),

/***/ "./src/hooks/useCategories.js":
/*!************************************!*\
  !*** ./src/hooks/useCategories.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_fetcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/fetcher */ "./src/helpers/fetcher.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swr */ "./node_modules/swr/core/dist/index.mjs");
/**
 * Internal dependencies
 */



/**
 * External dependencies
 */

const useCategories = function () {
  let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'patterns';
  const endpoint = type === 'patterns' ? 'categories' : 'templateCategories';
  const {
    data,
    error,
    isValidating
  } = (0,swr__WEBPACK_IMPORTED_MODULE_2__["default"])({
    url: `${_constants__WEBPACK_IMPORTED_MODULE_1__.REST_URL}/${endpoint}`
  }, _helpers_fetcher__WEBPACK_IMPORTED_MODULE_0__.fetcher);
  return {
    data,
    isError: error,
    isValidating
  };
};
/* harmony default export */ __webpack_exports__["default"] = (useCategories);

/***/ }),

/***/ "./src/hooks/useFavorites.js":
/*!***********************************!*\
  !*** ./src/hooks/useFavorites.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
/* harmony import */ var _helpers_fetcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/fetcher */ "./src/helpers/fetcher.js");
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swr */ "./node_modules/swr/core/dist/index.mjs");
/**
 * Internal dependencies
 */



/**
 * External dependencies
 */

const useFavorites = () => {
  const {
    data,
    error,
    isValidating,
    mutate
  } = (0,swr__WEBPACK_IMPORTED_MODULE_2__["default"])({
    url: `${_constants__WEBPACK_IMPORTED_MODULE_0__.REST_URL}/favorites`
  }, _helpers_fetcher__WEBPACK_IMPORTED_MODULE_1__.fetcher);
  return {
    data,
    isError: error,
    isValidating,
    mutate
  };
};
/* harmony default export */ __webpack_exports__["default"] = (useFavorites);

/***/ }),

/***/ "./src/hooks/usePatterns.js":
/*!**********************************!*\
  !*** ./src/hooks/usePatterns.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./src/constants.js");
/* harmony import */ var _helpers_fetcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/fetcher */ "./src/helpers/fetcher.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store */ "./src/store/index.js");
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! swr */ "./node_modules/swr/core/dist/index.mjs");
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */




/**
 * External dependencies
 */

const usePatterns = () => {
  const {
    activePatternsCategory,
    activeTemplatesCategory,
    activeTab
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => ({
    activePatternsCategory: select(_store__WEBPACK_IMPORTED_MODULE_3__.store).getActivePatternsCategory(),
    activeTemplatesCategory: select(_store__WEBPACK_IMPORTED_MODULE_3__.store).getActiveTemplatesCategory(),
    activeTab: select(_store__WEBPACK_IMPORTED_MODULE_3__.store).getActiveTab()
  }));

  // Active category.
  let activeCategory = null;
  if (activeTab === 'patterns') {
    activeCategory = activePatternsCategory || _constants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_PATTERNS_CATEGORY;
  } else {
    activeCategory = activeTemplatesCategory || _constants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_TEMPLATES_CATEGORY;
  }

  // Can be either "patterns" or "templates".
  const endpoint = activeTab === 'patterns' ? 'patterns' : 'templates';

  // Build request URL.
  const url = new URL(`${_constants__WEBPACK_IMPORTED_MODULE_1__.REST_URL}/${endpoint}`);
  url.searchParams.append('category', activeCategory);
  const {
    data,
    error,
    isValidating
  } = (0,swr__WEBPACK_IMPORTED_MODULE_4__["default"])({
    url: url.href
  }, _helpers_fetcher__WEBPACK_IMPORTED_MODULE_2__.fetcher);
  if (activeCategory === 'favorites') {
    return {
      data: null,
      isError: null,
      isValidating: null,
      isFavorites: true
    };
  }
  return {
    data,
    isError: error,
    isValidating,
    isFavorites: false
  };
};
/* harmony default export */ __webpack_exports__["default"] = (usePatterns);

/***/ }),

/***/ "./src/store/actions.js":
/*!******************************!*\
  !*** ./src/store/actions.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setActivePatternsCategory": function() { return /* binding */ setActivePatternsCategory; },
/* harmony export */   "setActiveTab": function() { return /* binding */ setActiveTab; },
/* harmony export */   "setActiveTemplatesCategory": function() { return /* binding */ setActiveTemplatesCategory; },
/* harmony export */   "setIsContentLoading": function() { return /* binding */ setIsContentLoading; },
/* harmony export */   "setIsModalOpen": function() { return /* binding */ setIsModalOpen; },
/* harmony export */   "setIsSidebarLoading": function() { return /* binding */ setIsSidebarLoading; },
/* harmony export */   "setKeywordsFilter": function() { return /* binding */ setKeywordsFilter; }
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
/* harmony export */   "STORE_NAME": function() { return /* binding */ STORE_NAME; }
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
/* harmony export */   "nfdWonderBlocksStoreOptions": function() { return /* binding */ nfdWonderBlocksStoreOptions; },
/* harmony export */   "store": function() { return /* binding */ store; }
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
/* harmony export */   "modal": function() { return /* binding */ modal; },
/* harmony export */   "patterns": function() { return /* binding */ patterns; },
/* harmony export */   "templates": function() { return /* binding */ templates; }
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

function modal() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isOpen: false,
    isContentLoading: false,
    keywordsFilter: '',
    activeTab: _constants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_ACTIVE_TAB
  };
  let action = arguments.length > 1 ? arguments[1] : undefined;
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
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.activeTab
      };
  }
  return state;
}
function patterns() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    activeCategory: _constants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_PATTERNS_CATEGORY
  };
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case 'SET_ACTIVE_PATTERNS_CATEGORY':
      return {
        ...state,
        activeCategory: action.activeCategory
      };
  }
  return state;
}
function templates() {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    activeCategory: _constants__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_TEMPLATES_CATEGORY
  };
  let action = arguments.length > 1 ? arguments[1] : undefined;
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
/* harmony export */   "getActivePatternsCategory": function() { return /* binding */ getActivePatternsCategory; },
/* harmony export */   "getActiveTab": function() { return /* binding */ getActiveTab; },
/* harmony export */   "getActiveTemplatesCategory": function() { return /* binding */ getActiveTemplatesCategory; },
/* harmony export */   "getKeywordsFilter": function() { return /* binding */ getKeywordsFilter; },
/* harmony export */   "isContentLoading": function() { return /* binding */ isContentLoading; },
/* harmony export */   "isModalOpen": function() { return /* binding */ isModalOpen; },
/* harmony export */   "isSidebarLoading": function() { return /* binding */ isSidebarLoading; }
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

/***/ "./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \**********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var reactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;


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

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-is/cjs/react-is.development.js");
}


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

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

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

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _extends; }
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _objectWithoutPropertiesLoose; }
/* harmony export */ });
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

/***/ }),

/***/ "./node_modules/swr/_internal/dist/index.mjs":
/*!***************************************************!*\
  !*** ./node_modules/swr/_internal/dist/index.mjs ***!
  \***************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IS_REACT_LEGACY": function() { return /* binding */ IS_REACT_LEGACY; },
/* harmony export */   "IS_SERVER": function() { return /* binding */ IS_SERVER; },
/* harmony export */   "OBJECT": function() { return /* binding */ OBJECT; },
/* harmony export */   "SWRConfig": function() { return /* binding */ SWRConfig; },
/* harmony export */   "SWRGlobalState": function() { return /* binding */ SWRGlobalState; },
/* harmony export */   "UNDEFINED": function() { return /* binding */ UNDEFINED; },
/* harmony export */   "cache": function() { return /* binding */ cache; },
/* harmony export */   "compare": function() { return /* binding */ compare; },
/* harmony export */   "createCacheHelper": function() { return /* binding */ createCacheHelper; },
/* harmony export */   "defaultConfig": function() { return /* binding */ defaultConfig; },
/* harmony export */   "defaultConfigOptions": function() { return /* binding */ defaultConfigOptions; },
/* harmony export */   "getTimestamp": function() { return /* binding */ getTimestamp; },
/* harmony export */   "hasRequestAnimationFrame": function() { return /* binding */ hasRequestAnimationFrame; },
/* harmony export */   "initCache": function() { return /* binding */ initCache; },
/* harmony export */   "internalMutate": function() { return /* binding */ internalMutate; },
/* harmony export */   "isDocumentDefined": function() { return /* binding */ isDocumentDefined; },
/* harmony export */   "isFunction": function() { return /* binding */ isFunction; },
/* harmony export */   "isUndefined": function() { return /* binding */ isUndefined; },
/* harmony export */   "isWindowDefined": function() { return /* binding */ isWindowDefined; },
/* harmony export */   "mergeConfigs": function() { return /* binding */ mergeConfigs; },
/* harmony export */   "mergeObjects": function() { return /* binding */ mergeObjects; },
/* harmony export */   "mutate": function() { return /* binding */ mutate; },
/* harmony export */   "noop": function() { return /* binding */ noop; },
/* harmony export */   "normalize": function() { return /* binding */ normalize; },
/* harmony export */   "preload": function() { return /* binding */ preload; },
/* harmony export */   "preset": function() { return /* binding */ preset; },
/* harmony export */   "rAF": function() { return /* binding */ rAF; },
/* harmony export */   "revalidateEvents": function() { return /* binding */ constants; },
/* harmony export */   "serialize": function() { return /* binding */ serialize; },
/* harmony export */   "slowConnection": function() { return /* binding */ slowConnection; },
/* harmony export */   "stableHash": function() { return /* binding */ stableHash; },
/* harmony export */   "subscribeCallback": function() { return /* binding */ subscribeCallback; },
/* harmony export */   "useIsomorphicLayoutEffect": function() { return /* binding */ useIsomorphicLayoutEffect; },
/* harmony export */   "useSWRConfig": function() { return /* binding */ useSWRConfig; },
/* harmony export */   "useStateWithDeps": function() { return /* binding */ useStateWithDeps; },
/* harmony export */   "withArgs": function() { return /* binding */ withArgs; },
/* harmony export */   "withMiddleware": function() { return /* binding */ withMiddleware; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");


// Global state used to deduplicate requests and store listeners
const SWRGlobalState = new WeakMap();

const EMPTY_CACHE = {};
const INITIAL_CACHE = {};
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
const STR_UNDEFINED = 'undefined';
// NOTE: Use the function to guarantee it's re-evaluated between jsdom and node runtime for tests.
const isWindowDefined = typeof window != STR_UNDEFINED;
const isDocumentDefined = typeof document != STR_UNDEFINED;
const hasRequestAnimationFrame = ()=>isWindowDefined && typeof window['requestAnimationFrame'] != STR_UNDEFINED;
const createCacheHelper = (cache, key)=>{
    const state = SWRGlobalState.get(cache);
    return [
        // Getter
        ()=>cache.get(key) || EMPTY_CACHE,
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
            return cache.get(key) || EMPTY_CACHE;
        }
    ];
};

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

var constants = {
  __proto__: null,
  FOCUS_EVENT: FOCUS_EVENT,
  RECONNECT_EVENT: RECONNECT_EVENT,
  MUTATE_EVENT: MUTATE_EVENT
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
        for(let keyIt = it.next(); !keyIt.done; keyIt = it.next()){
            const key = keyIt.value;
            if (// Skip the special useSWRInfinite keys.
            !key.startsWith('$inf$') && keyFilter(cache.get(key)._k)) {
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
        const [EVENT_REVALIDATORS, MUTATION, FETCH] = SWRGlobalState.get(cache);
        const revalidators = EVENT_REVALIDATORS[key];
        const startRevalidate = ()=>{
            if (revalidate) {
                // Invalidate the key by deleting the concurrent request markers so new
                // requests will not be deduped.
                delete FETCH[key];
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
            optimisticData = isFunction(optimisticData) ? optimisticData(committedData) : optimisticData;
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
        if (data && isFunction(data.then)) {
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
                data = committedData;
                // Reset data to be the latest committed data, and clear the `_c` value.
                set({
                    data,
                    _c: UNDEFINED
                });
            }
        }
        // If we should write back the cache after request.
        if (populateCache) {
            if (!error) {
                // Transform the result into data.
                if (isFunction(populateCache)) {
                    data = populateCache(data, committedData);
                }
                // Only update cached data if there's no error. Data can be `undefined` here.
                set({
                    data,
                    _c: UNDEFINED
                });
            }
        }
        // Reset the timestamp to mark the mutation has ended.
        MUTATION[key][1] = getTimestamp();
        // Update existing SWR Hooks' internal states:
        const res = await startRevalidate();
        // The mutation and revalidation are ended, we can clear it since the data is
        // not an optimistic value anymore.
        set({
            _c: UNDEFINED
        });
        // Throw error or return data
        if (error) {
            if (throwOnError) throw error;
            return;
        }
        return populateCache ? res : data;
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
                for(let i = subs.length; i--;){
                    subs[i](value, prev);
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
        const { use: u1 , fallback: f1  } = a;
        const { use: u2 , fallback: f2  } = b;
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
    const { value  } = props;
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
    // Use a lazy initialized state to create the cache on first access.
    const [cacheContext] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(()=>provider ? initCache(provider(extendedConfig.cache || cache), config) : UNDEFINED);
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
    const key = serialize(key_)[0];
    const [, , , PRELOAD] = SWRGlobalState.get(cache);
    // Prevent preload to be called multiple times before used.
    if (PRELOAD[key]) return PRELOAD[key];
    const req = fetcher(key_);
    PRELOAD[key] = req;
    return req;
};
const middleware = (useSWRNext)=>(key_, fetcher_, config)=>{
        // fetcher might be a sync function, so this should not be an async function
        const fetcher = fetcher_ && ((...args)=>{
            const key = serialize(key_)[0];
            const [, , , PRELOAD] = SWRGlobalState.get(cache);
            const req = PRELOAD[key];
            if (req) {
                delete PRELOAD[key];
                return req;
            }
            return fetcher_(...args);
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
        const { use  } = config;
        const middleware = (use || []).concat(BUILT_IN_MIDDLEWARE);
        for(let i = middleware.length; i--;){
            next = middleware[i](next);
        }
        return next(key, fn || config.fetcher || null, config);
    };
};

/**
 * An implementation of state with dependency-tracking.
 */ const useStateWithDeps = (state)=>{
    const rerender = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({})[1];
    const unmountedRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    const stateRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(state);
    // If a state property (data, error, or isValidating) is accessed by the render
    // function, we mark the property as a dependency so if it is updated again
    // in the future, we trigger a rerender.
    // This is also known as dependency-tracking.
    const stateDependenciesRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({
        data: false,
        error: false,
        isValidating: false
    });
    /**
   * @param payload To change stateRef, pass the values explicitly to setState:
   * @example
   * ```js
   * setState({
   *   isValidating: false
   *   data: newData // set data to newData
   *   error: undefined // set error to undefined
   * })
   *
   * setState({
   *   isValidating: false
   *   data: undefined // set data to undefined
   *   error: err // set error to err
   * })
   * ```
   */ const setState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((payload)=>{
        let shouldRerender = false;
        const currentState = stateRef.current;
        for(const _ in payload){
            const k = _;
            // If the property has changed, update the state and mark rerender as
            // needed.
            if (currentState[k] !== payload[k]) {
                currentState[k] = payload[k];
                // If the property is accessed by the component, a rerender should be
                // triggered.
                if (stateDependenciesRef.current[k]) {
                    shouldRerender = true;
                }
            }
        }
        if (shouldRerender && !unmountedRef.current) {
            if (IS_REACT_LEGACY) {
                rerender({});
            } else {
                react__WEBPACK_IMPORTED_MODULE_0__.startTransition(()=>rerender({}));
            }
        }
    }, // config.suspense isn't allowed to change during the lifecycle
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    useIsomorphicLayoutEffect(()=>{
        unmountedRef.current = false;
        return ()=>{
            unmountedRef.current = true;
        };
    });
    return [
        stateRef,
        stateDependenciesRef.current,
        setState
    ];
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
/* harmony export */   "SWRConfig": function() { return /* binding */ SWRConfig; },
/* harmony export */   "default": function() { return /* binding */ useSWR; },
/* harmony export */   "mutate": function() { return /* reexport safe */ swr_internal__WEBPACK_IMPORTED_MODULE_2__.mutate; },
/* harmony export */   "preload": function() { return /* reexport safe */ swr_internal__WEBPACK_IMPORTED_MODULE_2__.preload; },
/* harmony export */   "unstable_serialize": function() { return /* binding */ unstable_serialize; },
/* harmony export */   "useSWRConfig": function() { return /* reexport safe */ swr_internal__WEBPACK_IMPORTED_MODULE_2__.useSWRConfig; }
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var use_sync_external_store_shim_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! use-sync-external-store/shim/index.js */ "./node_modules/use-sync-external-store/shim/index.js");
/* harmony import */ var swr_internal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swr/_internal */ "./node_modules/swr/_internal/dist/index.mjs");





const WITH_DEDUPE = {
    dedupe: true
};
const useSWRHandler = (_key, fetcher, config)=>{
    const { cache , compare , suspense , fallbackData , revalidateOnMount , revalidateIfStale , refreshInterval , refreshWhenHidden , refreshWhenOffline , keepPreviousData  } = config;
    const [EVENT_REVALIDATORS, MUTATION, FETCH] = swr_internal__WEBPACK_IMPORTED_MODULE_2__.SWRGlobalState.get(cache);
    // `key` is the identifier of the SWR `data` state, `keyInfo` holds extra
    // states such as `error` and `isValidating` inside,
    // all of them are derived from `_key`.
    // `fnArg` is the argument/arguments parsed from the key, which will be passed
    // to the fetcher.
    const [key, fnArg] = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.serialize)(_key);
    // If it's the initial render of this hook.
    const initialMountedRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    // If the hook is unmounted already. This will be used to prevent some effects
    // to be called after unmounting.
    const unmountedRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
    // Refs to keep the key and config.
    const keyRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(key);
    const fetcherRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(fetcher);
    const configRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(config);
    const getConfig = ()=>configRef.current;
    const isActive = ()=>getConfig().isVisible() && getConfig().isOnline();
    const [getCache, setCache, subscribeCache, getInitialCache] = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.createCacheHelper)(cache, key);
    const stateDependencies = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({}).current;
    const fallback = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(fallbackData) ? config.fallback[key] : fallbackData;
    const isEqual = (prev, current)=>{
        let equal = true;
        for(const _ in stateDependencies){
            const t = _;
            if (t === 'data') {
                if (!compare(current[t], prev[t])) {
                    if ((0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(prev[t])) {
                        if (!compare(current[t], returnedData)) {
                            equal = false;
                        }
                    } else {
                        equal = false;
                    }
                }
            } else {
                if (current[t] !== prev[t]) {
                    equal = false;
                }
            }
        }
        return equal;
    };
    const getSnapshot = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{
        const shouldStartRequest = (()=>{
            if (!key) return false;
            if (!fetcher) return false;
            // If `revalidateOnMount` is set, we take the value directly.
            if (!(0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(revalidateOnMount)) return revalidateOnMount;
            // If it's paused, we skip revalidation.
            if (getConfig().isPaused()) return false;
            if (suspense) return false;
            if (!(0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(revalidateIfStale)) return revalidateIfStale;
            return true;
        })();
        // Get the cache and merge it with expected states.
        const getSelectedCache = (state)=>{
            // We only select the needed fields from the state.
            const snapshot = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.mergeObjects)(state);
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
        // To make sure that we are returning the same object reference to avoid
        // unnecessary re-renders, we keep the previous snapshot and use deep
        // comparison to check if we need to return a new one.
        let memorizedSnapshot = getSelectedCache(getCache());
        const memorizedInitialSnapshot = getSelectedCache(getInitialCache());
        return [
            ()=>{
                const newSnapshot = getSelectedCache(getCache());
                return isEqual(newSnapshot, memorizedSnapshot) ? memorizedSnapshot : memorizedSnapshot = newSnapshot;
            },
            ()=>memorizedInitialSnapshot
        ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        cache,
        key
    ]);
    // Get the current state that SWR should return.
    const cached = (0,use_sync_external_store_shim_index_js__WEBPACK_IMPORTED_MODULE_1__.useSyncExternalStore)((0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((callback)=>subscribeCache(key, (current, prev)=>{
            if (!isEqual(prev, current)) callback();
        }), // eslint-disable-next-line react-hooks/exhaustive-deps
    [
        cache,
        key
    ]), getSnapshot[0], getSnapshot[1]);
    const isInitialMount = !initialMountedRef.current;
    const hasRevalidator = EVENT_REVALIDATORS[key] && EVENT_REVALIDATORS[key].length > 0;
    const cachedData = cached.data;
    const data = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(cachedData) ? fallback : cachedData;
    const error = cached.error;
    // Use a ref to store previously returned data. Use the initial data as its initial value.
    const laggyDataRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(data);
    const returnedData = keepPreviousData ? (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(cachedData) ? laggyDataRef.current : cachedData : data;
    // - Suspense mode and there's stale data for the initial render.
    // - Not suspense mode and there is no fallback data and `revalidateIfStale` is enabled.
    // - `revalidateIfStale` is enabled but `data` is not defined.
    const shouldDoInitialRevalidation = (()=>{
        // if a key already has revalidators and also has error, we should not trigger revalidation
        if (hasRevalidator && !(0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(error)) return false;
        // If `revalidateOnMount` is set, we take the value directly.
        if (isInitialMount && !(0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(revalidateOnMount)) return revalidateOnMount;
        // If it's paused, we skip revalidation.
        if (getConfig().isPaused()) return false;
        // Under suspense mode, it will always fetch on render if there is no
        // stale data so no need to revalidate immediately mount it again.
        // If data exists, only revalidate if `revalidateIfStale` is true.
        if (suspense) return (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(data) ? false : revalidateIfStale;
        // If there is no stale data, we need to revalidate when mount;
        // If `revalidateIfStale` is set to true, we will always revalidate.
        return (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(data) || revalidateIfStale;
    })();
    // Resolve the default validating state:
    // If it's able to validate, and it should revalidate when mount, this will be true.
    const defaultValidatingState = !!(key && fetcher && isInitialMount && shouldDoInitialRevalidation);
    const isValidating = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(cached.isValidating) ? defaultValidatingState : cached.isValidating;
    const isLoading = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(cached.isLoading) ? defaultValidatingState : cached.isLoading;
    // The revalidation function is a carefully crafted wrapper of the original
    // `fetcher`, to correctly handle the many edge cases.
    const revalidate = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (revalidateOpts)=>{
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
            if (swr_internal__WEBPACK_IMPORTED_MODULE_2__.IS_REACT_LEGACY) {
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
        if ((0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(getCache().data)) {
            initialState.isLoading = true;
        }
        try {
            if (shouldStartNewRequest) {
                setCache(initialState);
                // If no cache is being rendered currently (it shows a blank page),
                // we trigger the loading slow event.
                if (config.loadingTimeout && (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(getCache().data)) {
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
                    (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.getTimestamp)()
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
            finalState.error = swr_internal__WEBPACK_IMPORTED_MODULE_2__.UNDEFINED;
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
            if (!(0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(mutationInfo) && // case 1
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
            const { shouldRetryOnError  } = currentConfig;
            // Not paused, we continue handling the error. Otherwise, discard it.
            if (!currentConfig.isPaused()) {
                // Get a new error, don't use deep comparison for errors.
                finalState.error = err;
                // Error event and retry logic. Only for the actual request, not
                // deduped ones.
                if (shouldStartNewRequest && callbackSafeguard()) {
                    currentConfig.onError(err, key, currentConfig);
                    if (shouldRetryOnError === true || (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isFunction)(shouldRetryOnError) && shouldRetryOnError(err)) {
                        if (isActive()) {
                            // If it's inactive, stop. It will auto-revalidate when
                            // refocusing or reconnecting.
                            // When retrying, deduplication is always enabled.
                            currentConfig.onErrorRetry(err, key, currentConfig, revalidate, {
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
    const boundMutate = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(// Use callback to make sure `keyRef.current` returns latest result every time
    (...args)=>{
        return (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.internalMutate)(cache, keyRef.current, ...args);
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    // The logic for updating refs.
    (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(()=>{
        fetcherRef.current = fetcher;
        configRef.current = config;
        // Handle laggy data updates. If there's cached data of the current key,
        // it'll be the correct reference.
        if (!(0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(cachedData)) {
            laggyDataRef.current = cachedData;
        }
    });
    // After mounted or key changed.
    (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(()=>{
        if (!key) return;
        const softRevalidate = revalidate.bind(swr_internal__WEBPACK_IMPORTED_MODULE_2__.UNDEFINED, WITH_DEDUPE);
        // Expose revalidators to global event listeners. So we can trigger
        // revalidation from the outside.
        let nextFocusRevalidatedAt = 0;
        const onRevalidate = (type)=>{
            if (type == swr_internal__WEBPACK_IMPORTED_MODULE_2__.revalidateEvents.FOCUS_EVENT) {
                const now = Date.now();
                if (getConfig().revalidateOnFocus && now > nextFocusRevalidatedAt && isActive()) {
                    nextFocusRevalidatedAt = now + getConfig().focusThrottleInterval;
                    softRevalidate();
                }
            } else if (type == swr_internal__WEBPACK_IMPORTED_MODULE_2__.revalidateEvents.RECONNECT_EVENT) {
                if (getConfig().revalidateOnReconnect && isActive()) {
                    softRevalidate();
                }
            } else if (type == swr_internal__WEBPACK_IMPORTED_MODULE_2__.revalidateEvents.MUTATE_EVENT) {
                return revalidate();
            }
            return;
        };
        const unsubEvents = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.subscribeCallback)(key, EVENT_REVALIDATORS, onRevalidate);
        // Mark the component as mounted and update corresponding refs.
        unmountedRef.current = false;
        keyRef.current = key;
        initialMountedRef.current = true;
        // Keep the original key in the cache.
        setCache({
            _k: fnArg
        });
        // Trigger a revalidation.
        if (shouldDoInitialRevalidation) {
            if ((0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(data) || swr_internal__WEBPACK_IMPORTED_MODULE_2__.IS_SERVER) {
                // Revalidate immediately.
                softRevalidate();
            } else {
                // Delay the revalidate if we have data to return so we won't block
                // rendering.
                (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.rAF)(softRevalidate);
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
    (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.useIsomorphicLayoutEffect)(()=>{
        let timer;
        function next() {
            // Use the passed interval
            // ...or invoke the function with the updated data to get the interval
            const interval = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isFunction)(refreshInterval) ? refreshInterval(data) : refreshInterval;
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
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useDebugValue)(returnedData);
    // In Suspense mode, we can't return the empty `data` state.
    // If there is an `error`, the `error` needs to be thrown to the error boundary.
    // If there is no `error`, the `revalidation` promise needs to be thrown to
    // the suspense boundary.
    if (suspense && (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(data) && key) {
        // SWR should throw when trying to use Suspense on the server with React 18,
        // without providing any initial data. See:
        // https://github.com/vercel/swr/issues/1832
        if (!swr_internal__WEBPACK_IMPORTED_MODULE_2__.IS_REACT_LEGACY && swr_internal__WEBPACK_IMPORTED_MODULE_2__.IS_SERVER) {
            throw new Error('Fallback data is required when using suspense in SSR.');
        }
        // Always update fetcher and config refs even with the Suspense mode.
        fetcherRef.current = fetcher;
        configRef.current = config;
        unmountedRef.current = false;
        throw (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.isUndefined)(error) ? revalidate(WITH_DEDUPE) : error;
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
const SWRConfig = swr_internal__WEBPACK_IMPORTED_MODULE_2__.OBJECT.defineProperty(swr_internal__WEBPACK_IMPORTED_MODULE_2__.SWRConfig, 'defaultValue', {
    value: swr_internal__WEBPACK_IMPORTED_MODULE_2__.defaultConfig
});
const unstable_serialize = (key)=>(0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.serialize)(key)[0];
/**
 * A hook to fetch data.
 *
 * @link https://swr.vercel.app
 * @example
 * ```jsx
 * import useSWR from 'swr'
 * function Profile() {
 *   const { data, error } = useSWR('/api/user', fetcher)
 *   if (error) return <div>failed to load</div>
 *   if (!data) return <div>loading...</div>
 *   return <div>hello {data.name}!</div>
 * }
 * ```
 */ var useSWR = (0,swr_internal__WEBPACK_IMPORTED_MODULE_2__.withArgs)(useSWRHandler);

// useSWR




/***/ }),

/***/ "./src/blocks/block.json":
/*!*******************************!*\
  !*** ./src/blocks/block.json ***!
  \*******************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"wonder-blocks/library","title":"Wonder Blocks","description":"Add patterns and full page templates tailored for your site.","keywords":["template","patterns","blocks"],"textdomain":"nfd-wonder-blocks","attributes":{"preview":{"type":"string"},"search":{"type":"string"}}}');

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
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/app.scss */ "./src/styles/app.scss");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _components_Modal_Modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Modal/Modal */ "./src/components/Modal/Modal.jsx");
/* harmony import */ var _components_ToolbarButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/ToolbarButton */ "./src/components/ToolbarButton.jsx");
/* harmony import */ var _blocks_register_category__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./blocks/register-category */ "./src/blocks/register-category.js");
/* harmony import */ var _blocks_block__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./blocks/block */ "./src/blocks/block.js");
var _window, _window$wp, _window$wp$data;

/**
 * Styles.
 */


/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */





_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_2___default()(() => {
  renderModal(_constants__WEBPACK_IMPORTED_MODULE_3__.NFD_WONDER_BLOCKS_MODAL_ID);
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
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_Modal_Modal__WEBPACK_IMPORTED_MODULE_4__["default"], null), modalRoot);
};

/**
 * Add the Wonder Blocks trigger button.
 * A hacky solution until proper FillSlot is implemented for adding header toolbar buttons in Gutenberg.
 */
const unsubscribeToolbarButton = (_window = window) === null || _window === void 0 ? void 0 : (_window$wp = _window.wp) === null || _window$wp === void 0 ? void 0 : (_window$wp$data = _window$wp.data) === null || _window$wp$data === void 0 ? void 0 : _window$wp$data.subscribe(() => {
  window.requestAnimationFrame(() => {
    var _document$querySelect, _document$querySelect2;
    // Do not add the button again if it has been already added.
    if (document.getElementById(_constants__WEBPACK_IMPORTED_MODULE_3__.NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID)) {
      return;
    }

    // Exit early if the toolbar doesn't exist.
    if (!document.querySelector('.edit-post-header-toolbar') && !document.querySelector('.edit-site-header_start')) {
      return;
    }

    // Create the button container.
    const buttonContainer = document.createElement('div');
    buttonContainer.id = _constants__WEBPACK_IMPORTED_MODULE_3__.NFD_WONDER_BLOCKS_TOOLBAR_BUTTON_ID;
    buttonContainer.classList.add('nfd-wba-shrink-0');

    // Append the button container to the block editor.
    (_document$querySelect = document.querySelector('.edit-post-header-toolbar')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.append(buttonContainer);

    // Append the button container to the FSE.
    (_document$querySelect2 = document.querySelector('.edit-site-header_start')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.append(buttonContainer);

    // Render the button.
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.render)((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_ToolbarButton__WEBPACK_IMPORTED_MODULE_5__["default"], null), buttonContainer);

    // Unsubscribe the function once the button is added.
    unsubscribeToolbarButton();
  });
});
}();
((window.newfold = window.newfold || {}).WonderBlocks = window.newfold.WonderBlocks || {})["wonder-blocks"] = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=wonder-blocks.js.map