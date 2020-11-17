(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ 227:
/***/ (function(module, exports) {

//

module.exports = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

  if (ret !== void 0) {
    return !!ret;
  }

  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    var valueA = objA[key];
    var valueB = objB[key];

    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;

    if (ret === false || (ret === void 0 && valueA !== valueB)) {
      return false;
    }
  }

  return true;
};


/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

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
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
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
  return !!value && (type == 'object' || type == 'function');
}

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
  return !!value && typeof value == 'object';
}

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
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

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
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(229)))

/***/ }),

/***/ 229:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "AddressSuggestions", function() { return /* reexport */ AddressSuggestions_AddressSuggestions; });
__webpack_require__.d(__webpack_exports__, "PartySuggestions", function() { return /* reexport */ PartySuggestions_PartySuggestions; });
__webpack_require__.d(__webpack_exports__, "BankSuggestions", function() { return /* reexport */ BankSuggestions_BankSuggestions; });

// EXTERNAL MODULE: ../node_modules/react/react.js
var react = __webpack_require__(79);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ../node_modules/shallowequal/index.js
var shallowequal = __webpack_require__(227);
var shallowequal_default = /*#__PURE__*/__webpack_require__.n(shallowequal);

// EXTERNAL MODULE: ../node_modules/lodash.debounce/index.js
var lodash_debounce = __webpack_require__(228);
var lodash_debounce_default = /*#__PURE__*/__webpack_require__.n(lodash_debounce);

// CONCATENATED MODULE: ../node_modules/react-dadata/dist/esm/request.js
var xhr;
var makeRequest = function (method, endpoint, data, onReceiveData) {
    if (xhr) {
        xhr.abort();
    }
    xhr = new XMLHttpRequest();
    xhr.open(method, endpoint);
    if (data.headers) {
        for (var header in data.headers) {
            if (data.headers[header]) {
                xhr.setRequestHeader(header, data.headers[header]);
            }
        }
    }
    xhr.send(JSON.stringify(data.json));
    xhr.onreadystatechange = function () {
        if (!xhr || xhr.readyState !== 4) {
            return;
        }
        if (xhr.status === 200) {
            var responseJson = JSON.parse(xhr.response);
            if (responseJson && responseJson.suggestions) {
                onReceiveData(responseJson.suggestions);
            }
        }
    };
};

// CONCATENATED MODULE: ../node_modules/react-dadata/dist/esm/BaseSuggestions.js
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};




var BaseSuggestions_BaseSuggestions = /** @class */ (function (_super) {
    __extends(BaseSuggestions, _super);
    function BaseSuggestions(props) {
        var _this = _super.call(this, props) || this;
        /**
         * URL для загрузки подсказок, переопределяется в конкретном компоненте
         */
        _this.loadSuggestionsUrl = '';
        _this.setupDebounce = function (delay) {
            if (typeof delay === 'number' && delay > 0) {
                _this.fetchSuggestions = lodash_debounce_default()(_this.performFetchSuggestions, delay);
            }
            else {
                _this.fetchSuggestions = _this.performFetchSuggestions;
            }
        };
        _this.fetchSuggestions = function () {
            //
        };
        _this.handleInputFocus = function (event) {
            _this.setState({ isFocused: true });
            var suggestions = _this.state.suggestions;
            if (suggestions.length === 0) {
                _this.fetchSuggestions();
            }
            var inputProps = _this.props.inputProps;
            if (inputProps && inputProps.onFocus) {
                inputProps.onFocus(event);
            }
        };
        _this.handleInputBlur = function (event) {
            var suggestions = _this.state.suggestions;
            _this.setState({ isFocused: false });
            if (suggestions.length === 0) {
                _this.fetchSuggestions();
            }
            var inputProps = _this.props.inputProps;
            if (inputProps && inputProps.onBlur) {
                inputProps.onBlur(event);
            }
        };
        _this.handleInputChange = function (event) {
            var value = event.target.value;
            var inputProps = _this.props.inputProps;
            _this.setState({ query: value, inputQuery: value, displaySuggestions: true }, function () {
                _this.fetchSuggestions();
            });
            if (inputProps && inputProps.onChange) {
                inputProps.onChange(event);
            }
        };
        _this.handleInputKeyDown = function (event) {
            _this.handleKeyboard(event);
            var inputProps = _this.props.inputProps;
            if (inputProps && inputProps.onKeyDown) {
                inputProps.onKeyDown(event);
            }
        };
        _this.handleInputKeyPress = function (event) {
            _this.handleKeyboard(event);
            var inputProps = _this.props.inputProps;
            if (inputProps && inputProps.onKeyPress) {
                inputProps.onKeyPress(event);
            }
        };
        _this.handleKeyboard = function (event) {
            var _a = _this.state, suggestions = _a.suggestions, suggestionIndex = _a.suggestionIndex, inputQuery = _a.inputQuery;
            if (event.which === 40) {
                // Arrow down
                event.preventDefault();
                if (suggestionIndex < suggestions.length - 1) {
                    var newSuggestionIndex = suggestionIndex + 1;
                    var newInputQuery = suggestions[newSuggestionIndex].value;
                    _this.setState({ suggestionIndex: newSuggestionIndex, query: newInputQuery });
                }
            }
            else if (event.which === 38) {
                // Arrow up
                event.preventDefault();
                if (suggestionIndex >= 0) {
                    var newSuggestionIndex = suggestionIndex - 1;
                    var newInputQuery = newSuggestionIndex === -1 ? inputQuery : suggestions[newSuggestionIndex].value;
                    _this.setState({ suggestionIndex: newSuggestionIndex, query: newInputQuery });
                }
            }
            else if (event.which === 13) {
                // Enter
                event.preventDefault();
                if (suggestionIndex >= 0) {
                    _this.selectSuggestion(suggestionIndex);
                }
            }
        };
        _this.performFetchSuggestions = function () {
            var _a = _this.props, minChars = _a.minChars, token = _a.token;
            var query = _this.state.query;
            // Проверяем на минимальное количество символов для отправки
            if (typeof minChars === 'number' && minChars > 0 && query.length < minChars) {
                _this.setState({ suggestions: [], suggestionIndex: -1 });
                return;
            }
            makeRequest('POST', _this.loadSuggestionsUrl, {
                headers: {
                    Accept: 'application/json',
                    Authorization: "Token " + token,
                    'Content-Type': 'application/json',
                },
                json: _this.getLoadSuggestionsData() || {},
            }, function (suggestions) {
                _this.setState({ suggestions: suggestions, suggestionIndex: -1 });
            });
        };
        _this.onSuggestionClick = function (index, event) {
            event.stopPropagation();
            _this.selectSuggestion(index);
        };
        _this.selectSuggestion = function (index) {
            var suggestions = _this.state.suggestions;
            var onChange = _this.props.onChange;
            if (suggestions.length >= index - 1) {
                var suggestion = suggestions[index];
                _this.setState({ query: suggestion.value, inputQuery: suggestion.value, displaySuggestions: false }, function () {
                    _this.fetchSuggestions();
                    setTimeout(function () { return _this.setCursorToEnd(_this.textInput); });
                });
                if (onChange) {
                    onChange(suggestion);
                }
            }
        };
        _this.setCursorToEnd = function (element) {
            if (element) {
                var valueLength = element.value.length;
                if (element.selectionStart || element.selectionStart === 0) {
                    // eslint-disable-next-line no-param-reassign
                    element.selectionStart = valueLength;
                    // eslint-disable-next-line no-param-reassign
                    element.selectionEnd = valueLength;
                    element.focus();
                }
            }
        };
        _this.getHighlightWords = function () {
            var inputQuery = _this.state.inputQuery;
            var wordsToPass = ['г', 'респ', 'ул', 'р-н', 'село', 'деревня', 'поселок', 'пр-д', 'пл', 'к', 'кв', 'обл', 'д'];
            var words = inputQuery.replace(',', '').split(' ');
            words = words.filter(function (word) {
                return wordsToPass.indexOf(word) < 0;
            });
            return words;
        };
        /**
         * Функция, которая вернет уникальный key для списка React
         * @param suggestion
         */
        _this.getSuggestionKey = function (suggestion) { return suggestion.value; };
        _this.focus = function () {
            if (_this.textInput) {
                _this.textInput.focus();
            }
        };
        _this.setInputValue = function (value) {
            _this.setState({ query: value || '', inputQuery: value || '' });
        };
        var _a = _this.props, defaultQuery = _a.defaultQuery, value = _a.value, delay = _a.delay;
        var valueQuery = value ? value.value : undefined;
        _this.setupDebounce(delay);
        _this.state = {
            query: defaultQuery || valueQuery || '',
            inputQuery: defaultQuery || valueQuery || '',
            isFocused: false,
            displaySuggestions: true,
            suggestions: [],
            suggestionIndex: -1,
        };
        return _this;
    }
    BaseSuggestions.prototype.componentDidUpdate = function (prevProps) {
        var _a = this.props, value = _a.value, delay = _a.delay;
        var _b = this.state, query = _b.query, inputQuery = _b.inputQuery;
        if (!shallowequal_default()(prevProps.value, value)) {
            var newQuery = value ? value.value : '';
            if (query !== newQuery || inputQuery !== newQuery) {
                this.setState({ query: newQuery, inputQuery: newQuery });
            }
        }
        if (delay !== prevProps.delay) {
            this.setupDebounce(delay);
        }
    };
    BaseSuggestions.prototype.render = function () {
        var _this = this;
        var _a = this.props, inputProps = _a.inputProps, hintText = _a.hintText, containerClassName = _a.containerClassName, hintClassName = _a.hintClassName, suggestionsClassName = _a.suggestionsClassName, suggestionClassName = _a.suggestionClassName, currentSuggestionClassName = _a.currentSuggestionClassName, children = _a.children;
        var _b = this.state, query = _b.query, isFocused = _b.isFocused, suggestions = _b.suggestions, suggestionIndex = _b.suggestionIndex, displaySuggestions = _b.displaySuggestions;
        return (react_default.a.createElement("div", { className: containerClassName || 'react-dadata react-dadata__container' },
            react_default.a.createElement("div", null,
                react_default.a.createElement("input", __assign({ autoComplete: "off", className: "react-dadata__input" }, inputProps, { value: query, ref: function (input) {
                        _this.textInput = input;
                    }, onChange: this.handleInputChange, onKeyPress: this.handleInputKeyPress, onKeyDown: this.handleInputKeyDown, onFocus: this.handleInputFocus, onBlur: this.handleInputBlur }))),
            isFocused && suggestions && displaySuggestions && suggestions.length > 0 && (react_default.a.createElement("div", { className: suggestionsClassName || 'react-dadata__suggestions' },
                typeof hintText !== 'undefined' && (react_default.a.createElement("div", { className: hintClassName || 'react-dadata__suggestion-note' }, hintText)),
                suggestions.map(function (suggestion, index) {
                    var suggestionClass = suggestionClassName || 'react-dadata__suggestion';
                    if (index === suggestionIndex) {
                        suggestionClass += " " + (currentSuggestionClassName || 'react-dadata__suggestion--current');
                    }
                    return (react_default.a.createElement("button", { key: _this.getSuggestionKey(suggestion), onMouseDown: _this.onSuggestionClick.bind(_this, index), className: suggestionClass }, _this.renderOption(suggestion)));
                }))),
            children));
    };
    return BaseSuggestions;
}(react_default.a.PureComponent));


// CONCATENATED MODULE: ../node_modules/highlight-words/dist/lib-esm/index.js
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var lib_esm_assign = function() {
    lib_esm_assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return lib_esm_assign.apply(this, arguments);
};

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

// https://github.com/lukeed/uid/blob/master/src/index.js
/* eslint no-bitwise: 'off' */
/* eslint no-plusplus: 'off' */
/* eslint @typescript-eslint/strict-boolean-expressions: 'off' */
var IDX = 36;
var HEX = '';
while (IDX--) {
    HEX += IDX.toString(36);
}
function uid(len) {
    if (len === void 0) { len = 11; }
    var str = '';
    var num = len;
    while (num--) {
        str += HEX[(Math.random() * 36) | 0];
    }
    return str;
}

// We need escape certain characters before creating the RegExp
// https://github.com/sindresorhus/escape-string-regexp
var escapeRegexp = function (term) {
    return term.replace(/[|\\{}()[\]^$+*?.-]/g, function (char) { return "\\" + char; });
};
var regexpQuery = function (_a) {
    var terms = _a.terms, _b = _a.matchExactly, matchExactly = _b === void 0 ? false : _b;
    if (typeof terms !== 'string') {
        throw new TypeError('Expected a string');
    }
    var escapedTerms = escapeRegexp(terms.trim());
    return "(" + (matchExactly ? escapedTerms : escapedTerms.split(' ').join('|')) + ")";
};

var hasProp = function (prop) { return function (obj) {
    return obj !== null && typeof obj !== 'undefined' && prop in obj;
}; };
var hasMatch = hasProp('match');
/**
 * This provides context around a chunk's text, based on the next and previous chunks.
 * e.g. If we have the string "The quick brown fox jumped over the lazy dog",
 * and the search term "fox jumped", with a padding of 2, we want to have the end result be:
 * "... quick brown fox jumped over the ..."
 * The search term, "fox jumped" is left as is, and the left and right chunks, instead of having
 * the text in full, will be clipped.
 */
function clip(_a) {
    var curr = _a.curr, next = _a.next, prev = _a.prev, _b = _a.clipBy, clipBy = _b === void 0 ? 3 : _b;
    var words = curr.text.split(' ');
    var len = words.length;
    // If the current is a match, we leave it alone
    // Or if the clipBy is greater than or equal to the length of the words, there's nothing to clip
    if (curr.match || clipBy >= len) {
        return curr.text;
    }
    // If we have a clipBy greater than the length of the words in the current match,
    // it means we can clip the words in the current chunk
    var ellipsis = '...';
    if (hasMatch(prev) && hasMatch(next)) {
        // Both the previous and the next chunks are a match
        // Let's check if we have enough words to clip by on both sides
        if (len > clipBy * 2) {
            return __spreadArrays(words.slice(0, clipBy), [
                ellipsis
            ], words.slice(-clipBy)).join(' ');
        }
        return curr.text;
    }
    // We start to check the next and previous matches in order to
    // properly position the elipsis
    if (hasMatch(next)) {
        // The chunk right after this one is a match
        // So we need the elipsis at the start of the returned text
        // so that it sticks correctly to the next (match)'s text
        return __spreadArrays([ellipsis], words.slice(-clipBy)).join(' ');
    }
    if (hasMatch(prev)) {
        // The chunk right before this one is a match
        // So we need the elipsis at the end of the                                 returned text
        // so that it sticks correctly to the previous (match)'s text
        return __spreadArrays(words.slice(0, clipBy), [ellipsis]).join(' ');
    }
    // If we made it this far, just return the text
    return curr.text;
}

var hasLength = function (str) { return str.length > 0; };
/**
 * Split a text into chunks denoting which are a match and which are not based on a user search term.
 * @param text          String  The text to split.
 * @param query         String  The query to split by. This can contain multiple words.
 * @param clipBy        Number  Clip the non-matches by a certain number of words to provide context around the matches.
 * @param matchExactly  Boolean If we have multiple words in the query, we will match any of the words if exact is false. For example, searching for "brown fox" in "the brown cute fox" will yield both "brown" and "fox" as matches. While if exact is true, the same search will return no results.
 */
var highlightWords = function (_a) {
    var text = _a.text, query = _a.query, clipBy = _a.clipBy, _b = _a.matchExactly, matchExactly = _b === void 0 ? false : _b;
    // Let's make sure that the user cannot pass in just a bunch of spaces
    var safeQuery = query.trim();
    if (safeQuery === '') {
        return [
            {
                key: uid(),
                text: text,
                match: false
            }
        ];
    }
    var searchRegexp = new RegExp(regexpQuery({ terms: safeQuery, matchExactly: matchExactly }), 'ig');
    return text
        .split(searchRegexp) // Split the entire thing into an array of matches and non-matches
        .filter(hasLength) // Filter any matches that have the text with length of 0
        .map(function (str) { return ({
        // Compose the object for a match
        key: uid(),
        text: str,
        match: matchExactly
            ? str.toLowerCase() === safeQuery.toLowerCase()
            : searchRegexp.test(str)
    }); })
        .map(function (chunk, index, chunks) { return (lib_esm_assign(lib_esm_assign({}, chunk), (typeof clipBy === 'number' && {
        // We only overwrite the text if there is a clip
        text: clip(lib_esm_assign(lib_esm_assign(lib_esm_assign({ curr: chunk }, (index < chunks.length - 1 && { next: chunks[index + 1] })), (index > 0 && { prev: chunks[index - 1] })), { // If this wasn't the first chunk, set the previous chunk
            clipBy: clipBy }))
    }))); });
};

/* harmony default export */ var lib_esm = (highlightWords);

// CONCATENATED MODULE: ../node_modules/react-dadata/dist/esm/HighlightWords.js
var HighlightWords_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var HighlightWords_HighlightWords = /** @class */ (function (_super) {
    HighlightWords_extends(HighlightWords, _super);
    function HighlightWords() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HighlightWords.prototype.render = function () {
        var _a = this.props, text = _a.text, words = _a.words, highlightClassName = _a.highlightClassName, _b = _a.tagName, tagName = _b === void 0 ? 'span' : _b;
        var query = typeof words === 'string' ? words : words.join(' ');
        var chunks = lib_esm({ text: text, query: query });
        return (react_default.a.createElement("span", null, chunks.map(function (chunk) {
            if (!chunk.match) {
                return react_default.a.createElement("span", { key: chunk.key }, chunk.text);
            }
            var Component = tagName;
            return (react_default.a.createElement(Component, { key: chunk.key, className: highlightClassName }, chunk.text));
        })));
    };
    return HighlightWords;
}(react["PureComponent"]));


// CONCATENATED MODULE: ../node_modules/react-dadata/dist/esm/AddressSuggestions.js
var AddressSuggestions_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var AddressSuggestions_AddressSuggestions = /** @class */ (function (_super) {
    AddressSuggestions_extends(AddressSuggestions, _super);
    function AddressSuggestions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadSuggestionsUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
        _this.getLoadSuggestionsData = function () {
            var _a = _this.props, count = _a.count, filterFromBound = _a.filterFromBound, filterToBound = _a.filterToBound, filterLocations = _a.filterLocations, filterLocationsBoost = _a.filterLocationsBoost, filterLanguage = _a.filterLanguage;
            var query = _this.state.query;
            var requestPayload = {
                query: query,
                count: count || 10,
            };
            // Ограничение поиска по типу
            if (filterFromBound && filterToBound) {
                requestPayload.from_bound = { value: filterFromBound };
                requestPayload.to_bound = { value: filterToBound };
            }
            // Язык подсказок
            if (filterLanguage) {
                requestPayload.language = filterLanguage;
            }
            // Сужение области поиска
            if (filterLocations) {
                requestPayload.locations = filterLocations;
            }
            // Приоритет города при ранжировании
            if (filterLocationsBoost) {
                requestPayload.locations_boost = filterLocationsBoost;
            }
            return requestPayload;
        };
        _this.renderOption = function (suggestion) {
            var _a = _this.props, renderOption = _a.renderOption, highlightClassName = _a.highlightClassName;
            return renderOption ? renderOption(suggestion) : (react_default.a.createElement(HighlightWords_HighlightWords, { highlightClassName: highlightClassName || 'react-dadata--highlighted', words: _this.getHighlightWords(), text: suggestion.value }));
        };
        return _this;
    }
    return AddressSuggestions;
}(BaseSuggestions_BaseSuggestions));


// CONCATENATED MODULE: ../node_modules/react-dadata/dist/esm/PartySuggestions.js
var PartySuggestions_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var PartySuggestions_PartySuggestions = /** @class */ (function (_super) {
    PartySuggestions_extends(PartySuggestions, _super);
    function PartySuggestions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadSuggestionsUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party';
        _this.getLoadSuggestionsData = function () {
            var _a = _this.props, count = _a.count, filterStatus = _a.filterStatus, filterType = _a.filterType, filterLocations = _a.filterLocations, filterLocationsBoost = _a.filterLocationsBoost;
            var query = _this.state.query;
            var requestPayload = {
                query: query,
                count: count || 10,
            };
            // Ограничение по статусу организации
            if (filterStatus) {
                requestPayload.status = filterStatus;
            }
            // Ограничение по типу организации
            if (filterType) {
                requestPayload.type = filterType;
            }
            // Сужение области поиска
            if (filterLocations) {
                requestPayload.locations = filterLocations;
            }
            // Приоритет города при ранжировании
            if (filterLocationsBoost) {
                requestPayload.locations_boost = filterLocationsBoost;
            }
            return requestPayload;
        };
        _this.getSuggestionKey = function (suggestion) { return "" + suggestion.data.inn; };
        _this.renderOption = function (suggestion) {
            var _a = _this.props, renderOption = _a.renderOption, highlightClassName = _a.highlightClassName;
            return renderOption ? (renderOption(suggestion)) : (react_default.a.createElement("div", null,
                react_default.a.createElement("div", { className: suggestion.data.state.status === 'LIQUIDATED' ? 'react-dadata__suggestion--line-through' : undefined },
                    react_default.a.createElement(HighlightWords_HighlightWords, { highlightClassName: highlightClassName || 'react-dadata--highlighted', words: _this.getHighlightWords(), text: suggestion.value })),
                react_default.a.createElement("div", { className: "react-dadata__suggestion-subtitle" },
                    suggestion.data.inn && react_default.a.createElement("div", { className: "react-dadata__suggestion-subtitle-item" }, suggestion.data.inn),
                    suggestion.data.address && suggestion.data.address.value && (react_default.a.createElement("div", { className: "react-dadata__suggestion-subtitle-item" },
                        react_default.a.createElement(HighlightWords_HighlightWords, { highlightClassName: highlightClassName || 'react-dadata--highlighted', words: _this.getHighlightWords(), text: suggestion.data.address.value }))))));
        };
        return _this;
    }
    return PartySuggestions;
}(BaseSuggestions_BaseSuggestions));


// CONCATENATED MODULE: ../node_modules/react-dadata/dist/esm/BankSuggestions.js
var BankSuggestions_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var BankSuggestions_BankSuggestions = /** @class */ (function (_super) {
    BankSuggestions_extends(BankSuggestions, _super);
    function BankSuggestions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadSuggestionsUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/bank';
        _this.getLoadSuggestionsData = function () {
            var _a = _this.props, count = _a.count, filterStatus = _a.filterStatus, filterType = _a.filterType, filterLocations = _a.filterLocations, filterLocationsBoost = _a.filterLocationsBoost;
            var query = _this.state.query;
            var requestPayload = {
                query: query,
                count: count || 10,
            };
            // Ограничение по статусу организации
            if (filterStatus) {
                requestPayload.status = filterStatus;
            }
            // Ограничение по типу организации
            if (filterType) {
                requestPayload.type = filterType;
            }
            // Сужение области поиска
            if (filterLocations) {
                requestPayload.locations = filterLocations;
            }
            // Приоритет города при ранжировании
            if (filterLocationsBoost) {
                requestPayload.locations_boost = filterLocationsBoost;
            }
            return requestPayload;
        };
        _this.getSuggestionKey = function (suggestion) { return "" + suggestion.data.bic; };
        _this.renderOption = function (suggestion) {
            var _a = _this.props, renderOption = _a.renderOption, highlightClassName = _a.highlightClassName;
            return renderOption ? (renderOption(suggestion)) : (react_default.a.createElement("div", null,
                react_default.a.createElement("div", { className: suggestion.data.state.status === 'LIQUIDATED' ? 'react-dadata__suggestion--line-through' : undefined },
                    react_default.a.createElement(HighlightWords_HighlightWords, { highlightClassName: highlightClassName || 'react-dadata--highlighted', words: _this.getHighlightWords(), text: suggestion.value })),
                react_default.a.createElement("div", { className: "react-dadata__suggestion-subtitle" },
                    suggestion.data.bic && react_default.a.createElement("div", { className: "react-dadata__suggestion-subtitle-item" }, suggestion.data.bic),
                    suggestion.data.address && suggestion.data.address.value && (react_default.a.createElement("div", { className: "react-dadata__suggestion-subtitle-item" },
                        react_default.a.createElement(HighlightWords_HighlightWords, { highlightClassName: highlightClassName || 'react-dadata--highlighted', words: _this.getHighlightWords(), text: suggestion.data.address.value }))))));
        };
        return _this;
    }
    return BankSuggestions;
}(BaseSuggestions_BaseSuggestions));


// CONCATENATED MODULE: ../node_modules/react-dadata/dist/esm/index.js






/***/ })

}]);