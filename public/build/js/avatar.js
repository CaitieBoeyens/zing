/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/avatar.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/avatar.js":
/*!*****************************!*\
  !*** ./assets/js/avatar.js ***!
  \*****************************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_croppie__ = __webpack_require__(/*! croppie */ "./node_modules/croppie/croppie.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_croppie___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_croppie__);



var avatarCropper = new __WEBPACK_IMPORTED_MODULE_1_croppie__["Croppie"](document.getElementById('avatar_preview'), {
    viewport: { width: 200, height: 200, type: 'circle' },
    boundary: { width: 300, height: 300 }
});

function readFile(_ref) {
    var input = _ref.target;

    document.getElementById('avatar_preview').classList.add('is-visible');
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            /* display ready */

            avatarCropper.bind({ url: e.target.result });
        };

        reader.readAsDataURL(input.files[0]);
    }
}

document.getElementById('avatar_file').onchange = readFile;
document.getElementById('avatar_submit').onclick = function () {
    var avatar = void 0;
    avatarCropper.result({ type: 'blob' }).then(function (blob) {
        avatar = blob;
        avatarUpload(avatar);
    });
};

document.getElementById('avatar_form').onsubmit = function (event) {
    event.preventDefault();
};

function avatarUpload(blob) {
    var url = '/image';
    var data = new FormData();
    data.append('avatar', blob);

    __WEBPACK_IMPORTED_MODULE_0_axios___default()({
        method: 'post',
        url: url,
        data: data,
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
    }).then(function (response) {
        window.location.assign('/success');
    }).catch(function (error) {
        console.error(error);
    });
}

/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "./node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ("development" !== 'test' &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/croppie/croppie.js":
/*!*****************************************!*\
  !*** ./node_modules/croppie/croppie.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! exports used: Croppie */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*************************
 * Croppie
 * Copyright 2018
 * Foliotek
 * Version: 2.6.2
 *************************/
(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports);
    } else {
        // Browser globals
        factory((root.commonJsStrict = {}));
    }
}(this, function (exports) {

    /* Polyfills */
    if (typeof Promise !== 'function') {
        /*! promise-polyfill 3.1.0 */
        !function(a){function b(a,b){return function(){a.apply(b,arguments)}}function c(a){if("object"!==typeof this)throw new TypeError("Promises must be constructed via new");if("function"!==typeof a)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],i(a,b(e,this),b(f,this))}function d(a){var b=this;return null===this._state?void this._deferreds.push(a):void k(function(){var c=b._state?a.onFulfilled:a.onRejected;if(null===c)return void(b._state?a.resolve:a.reject)(b._value);var d;try{d=c(b._value)}catch(e){return void a.reject(e)}a.resolve(d)})}function e(a){try{if(a===this)throw new TypeError("A promise cannot be resolved with itself.");if(a&&("object"===typeof a||"function"===typeof a)){var c=a.then;if("function"===typeof c)return void i(b(c,a),b(e,this),b(f,this))}this._state=!0,this._value=a,g.call(this)}catch(d){f.call(this,d)}}function f(a){this._state=!1,this._value=a,g.call(this)}function g(){for(var a=0,b=this._deferreds.length;b>a;a++)d.call(this,this._deferreds[a]);this._deferreds=null}function h(a,b,c,d){this.onFulfilled="function"===typeof a?a:null,this.onRejected="function"===typeof b?b:null,this.resolve=c,this.reject=d}function i(a,b,c){var d=!1;try{a(function(a){d||(d=!0,b(a))},function(a){d||(d=!0,c(a))})}catch(e){if(d)return;d=!0,c(e)}}var j=setTimeout,k="function"===typeof setImmediate&&setImmediate||function(a){j(a,1)},l=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)};c.prototype["catch"]=function(a){return this.then(null,a)},c.prototype.then=function(a,b){var e=this;return new c(function(c,f){d.call(e,new h(a,b,c,f))})},c.all=function(){var a=Array.prototype.slice.call(1===arguments.length&&l(arguments[0])?arguments[0]:arguments);return new c(function(b,c){function d(f,g){try{if(g&&("object"===typeof g||"function"===typeof g)){var h=g.then;if("function"===typeof h)return void h.call(g,function(a){d(f,a)},c)}a[f]=g,0===--e&&b(a)}catch(i){c(i)}}if(0===a.length)return b([]);for(var e=a.length,f=0;f<a.length;f++)d(f,a[f])})},c.resolve=function(a){return a&&"object"===typeof a&&a.constructor===c?a:new c(function(b){b(a)})},c.reject=function(a){return new c(function(b,c){c(a)})},c.race=function(a){return new c(function(b,c){for(var d=0,e=a.length;e>d;d++)a[d].then(b,c)})},c._setImmediateFn=function(a){k=a},"undefined"!==typeof module&&module.exports?module.exports=c:a.Promise||(a.Promise=c)}(this);
    }

    if ( typeof window.CustomEvent !== "function" ) {
        (function(){
            function CustomEvent ( event, params ) {
                params = params || { bubbles: false, cancelable: false, detail: undefined };
                var evt = document.createEvent( 'CustomEvent' );
                evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
                return evt;
            }
            CustomEvent.prototype = window.Event.prototype;
            window.CustomEvent = CustomEvent;
        }());
    }

    if (!HTMLCanvasElement.prototype.toBlob) {
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
            value: function (callback, type, quality) {
                var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
                len = binStr.length,
                arr = new Uint8Array(len);

                for (var i=0; i<len; i++ ) {
                    arr[i] = binStr.charCodeAt(i);
                }

                callback( new Blob( [arr], {type: type || 'image/png'} ) );
            }
        });
    }
    /* End Polyfills */

    var cssPrefixes = ['Webkit', 'Moz', 'ms'],
        emptyStyles = document.createElement('div').style,
        EXIF_NORM = [1,8,3,6],
        EXIF_FLIP = [2,7,4,5],
        CSS_TRANS_ORG,
        CSS_TRANSFORM,
        CSS_USERSELECT;

    function vendorPrefix(prop) {
        if (prop in emptyStyles) {
            return prop;
        }

        var capProp = prop[0].toUpperCase() + prop.slice(1),
            i = cssPrefixes.length;

        while (i--) {
            prop = cssPrefixes[i] + capProp;
            if (prop in emptyStyles) {
                return prop;
            }
        }
    }

    CSS_TRANSFORM = vendorPrefix('transform');
    CSS_TRANS_ORG = vendorPrefix('transformOrigin');
    CSS_USERSELECT = vendorPrefix('userSelect');

    function getExifOffset(ornt, rotate) {
        var arr = EXIF_NORM.indexOf(ornt) > -1 ? EXIF_NORM : EXIF_FLIP,
            index = arr.indexOf(ornt),
            offset = (rotate / 90) % arr.length;// 180 = 2%4 = 2 shift exif by 2 indexes

        return arr[(arr.length + index + (offset % arr.length)) % arr.length];
    }

    // Credits to : Andrew Dupont - http://andrewdupont.net/2009/08/28/deep-extending-objects-in-javascript/
    function deepExtend(destination, source) {
        destination = destination || {};
        for (var property in source) {
            if (source[property] && source[property].constructor && source[property].constructor === Object) {
                destination[property] = destination[property] || {};
                deepExtend(destination[property], source[property]);
            } else {
                destination[property] = source[property];
            }
        }
        return destination;
    }

    function clone(object) {
        return deepExtend({}, object);
    }

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    function dispatchChange(element) {
        if ("createEvent" in document) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            element.dispatchEvent(evt);
        }
        else {
            element.fireEvent("onchange");
        }
    }

    //http://jsperf.com/vanilla-css
    function css(el, styles, val) {
        if (typeof (styles) === 'string') {
            var tmp = styles;
            styles = {};
            styles[tmp] = val;
        }

        for (var prop in styles) {
            el.style[prop] = styles[prop];
        }
    }

    function addClass(el, c) {
        if (el.classList) {
            el.classList.add(c);
        }
        else {
            el.className += ' ' + c;
        }
    }

    function removeClass(el, c) {
        if (el.classList) {
            el.classList.remove(c);
        }
        else {
            el.className = el.className.replace(c, '');
        }
    }

    function setAttributes(el, attrs) {
        for (var key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }

    function num(v) {
        return parseInt(v, 10);
    }

    /* Utilities */
    function loadImage(src, doExif) {
        var img = new Image();
        img.style.opacity = 0;
        return new Promise(function (resolve) {
            function _resolve() {
                img.style.opacity = 1;
                setTimeout(function () {
                    resolve(img);
                }, 1);
            }

            img.removeAttribute('crossOrigin');
            if (src.match(/^https?:\/\/|^\/\//)) {
                img.setAttribute('crossOrigin', 'anonymous');
            }

            img.onload = function () {
                if (doExif) {
                    EXIF.getData(img, function () {
                        _resolve();
                    });
                }
                else {
                    _resolve();
                }
            };
            img.src = src;
        });
    }

    function naturalImageDimensions(img, ornt) {
        var w = img.naturalWidth;
        var h = img.naturalHeight;
        var orient = ornt || getExifOrientation(img);
        if (orient && orient >= 5) {
            var x= w;
            w = h;
            h = x;
        }
        return { width: w, height: h };
    }

    /* CSS Transform Prototype */
    var TRANSLATE_OPTS = {
        'translate3d': {
            suffix: ', 0px'
        },
        'translate': {
            suffix: ''
        }
    };
    var Transform = function (x, y, scale) {
        this.x = parseFloat(x);
        this.y = parseFloat(y);
        this.scale = parseFloat(scale);
    };

    Transform.parse = function (v) {
        if (v.style) {
            return Transform.parse(v.style[CSS_TRANSFORM]);
        }
        else if (v.indexOf('matrix') > -1 || v.indexOf('none') > -1) {
            return Transform.fromMatrix(v);
        }
        else {
            return Transform.fromString(v);
        }
    };

    Transform.fromMatrix = function (v) {
        var vals = v.substring(7).split(',');
        if (!vals.length || v === 'none') {
            vals = [1, 0, 0, 1, 0, 0];
        }

        return new Transform(num(vals[4]), num(vals[5]), parseFloat(vals[0]));
    };

    Transform.fromString = function (v) {
        var values = v.split(') '),
            translate = values[0].substring(Croppie.globals.translate.length + 1).split(','),
            scale = values.length > 1 ? values[1].substring(6) : 1,
            x = translate.length > 1 ? translate[0] : 0,
            y = translate.length > 1 ? translate[1] : 0;

        return new Transform(x, y, scale);
    };

    Transform.prototype.toString = function () {
        var suffix = TRANSLATE_OPTS[Croppie.globals.translate].suffix || '';
        return Croppie.globals.translate + '(' + this.x + 'px, ' + this.y + 'px' + suffix + ') scale(' + this.scale + ')';
    };

    var TransformOrigin = function (el) {
        if (!el || !el.style[CSS_TRANS_ORG]) {
            this.x = 0;
            this.y = 0;
            return;
        }
        var css = el.style[CSS_TRANS_ORG].split(' ');
        this.x = parseFloat(css[0]);
        this.y = parseFloat(css[1]);
    };

    TransformOrigin.prototype.toString = function () {
        return this.x + 'px ' + this.y + 'px';
    };

    function getExifOrientation (img) {
        return img.exifdata ? img.exifdata.Orientation : 1;
    }

    function drawCanvas(canvas, img, orientation) {
        var width = img.width,
            height = img.height,
            ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.save();
        switch (orientation) {
          case 2:
             ctx.translate(width, 0);
             ctx.scale(-1, 1);
             break;

          case 3:
              ctx.translate(width, height);
              ctx.rotate(180*Math.PI/180);
              break;

          case 4:
              ctx.translate(0, height);
              ctx.scale(1, -1);
              break;

          case 5:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(90*Math.PI/180);
              ctx.scale(1, -1);
              break;

          case 6:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(90*Math.PI/180);
              ctx.translate(0, -height);
              break;

          case 7:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(-90*Math.PI/180);
              ctx.translate(-width, height);
              ctx.scale(1, -1);
              break;

          case 8:
              canvas.width = height;
              canvas.height = width;
              ctx.translate(0, width);
              ctx.rotate(-90*Math.PI/180);
              break;
        }
        ctx.drawImage(img, 0,0, width, height);
        ctx.restore();
    }

    /* Private Methods */
    function _create() {
        var self = this,
            contClass = 'croppie-container',
            customViewportClass = self.options.viewport.type ? 'cr-vp-' + self.options.viewport.type : null,
            boundary, img, viewport, overlay, bw, bh;

        self.options.useCanvas = self.options.enableOrientation || _hasExif.call(self);
        // Properties on class
        self.data = {};
        self.elements = {};

        boundary = self.elements.boundary = document.createElement('div');
        viewport = self.elements.viewport = document.createElement('div');
        img = self.elements.img = document.createElement('img');
        overlay = self.elements.overlay = document.createElement('div');

        if (self.options.useCanvas) {
            self.elements.canvas = document.createElement('canvas');
            self.elements.preview = self.elements.canvas;
        }
        else {
            self.elements.preview = self.elements.img;
        }

        addClass(boundary, 'cr-boundary');
        boundary.setAttribute('aria-dropeffect', 'none');
        bw = self.options.boundary.width;
        bh = self.options.boundary.height;
        css(boundary, {
            width: (bw + (isNaN(bw) ? '' : 'px')),
            height: (bh + (isNaN(bh) ? '' : 'px'))
        });

        addClass(viewport, 'cr-viewport');
        if (customViewportClass) {
            addClass(viewport, customViewportClass);
        }
        css(viewport, {
            width: self.options.viewport.width + 'px',
            height: self.options.viewport.height + 'px'
        });
        viewport.setAttribute('tabindex', 0);

        addClass(self.elements.preview, 'cr-image');
        setAttributes(self.elements.preview, { 'alt': 'preview', 'aria-grabbed': 'false' });
        addClass(overlay, 'cr-overlay');

        self.element.appendChild(boundary);
        boundary.appendChild(self.elements.preview);
        boundary.appendChild(viewport);
        boundary.appendChild(overlay);

        addClass(self.element, contClass);
        if (self.options.customClass) {
            addClass(self.element, self.options.customClass);
        }

        _initDraggable.call(this);

        if (self.options.enableZoom) {
            _initializeZoom.call(self);
        }

        // if (self.options.enableOrientation) {
        //     _initRotationControls.call(self);
        // }

        if (self.options.enableResize) {
            _initializeResize.call(self);
        }
    }

    // function _initRotationControls () {
    //     var self = this,
    //         wrap, btnLeft, btnRight, iLeft, iRight;

    //     wrap = document.createElement('div');
    //     self.elements.orientationBtnLeft = btnLeft = document.createElement('button');
    //     self.elements.orientationBtnRight = btnRight = document.createElement('button');

    //     wrap.appendChild(btnLeft);
    //     wrap.appendChild(btnRight);

    //     iLeft = document.createElement('i');
    //     iRight = document.createElement('i');
    //     btnLeft.appendChild(iLeft);
    //     btnRight.appendChild(iRight);

    //     addClass(wrap, 'cr-rotate-controls');
    //     addClass(btnLeft, 'cr-rotate-l');
    //     addClass(btnRight, 'cr-rotate-r');

    //     self.elements.boundary.appendChild(wrap);

    //     btnLeft.addEventListener('click', function () {
    //         self.rotate(-90);
    //     });
    //     btnRight.addEventListener('click', function () {
    //         self.rotate(90);
    //     });
    // }

    function _hasExif() {
        return this.options.enableExif && window.EXIF;
    }

    function _initializeResize () {
        var self = this;
        var wrap = document.createElement('div');
        var isDragging = false;
        var direction;
        var originalX;
        var originalY;
        var minSize = 50;
        var maxWidth;
        var maxHeight;
        var vr;
        var hr;

        addClass(wrap, 'cr-resizer');
        css(wrap, {
            width: this.options.viewport.width + 'px',
            height: this.options.viewport.height + 'px'
        });

        if (this.options.resizeControls.height) {
            vr = document.createElement('div');
            addClass(vr, 'cr-resizer-vertical');
            wrap.appendChild(vr);
        }

        if (this.options.resizeControls.width) {
            hr = document.createElement('div');
            addClass(hr, 'cr-resizer-horisontal');
            wrap.appendChild(hr);
        }

        function mouseDown(ev) {
            if (ev.button !== undefined && ev.button !== 0) return;

            ev.preventDefault();
            if (isDragging) {
                return;
            }

            var overlayRect = self.elements.overlay.getBoundingClientRect();

            isDragging = true;
            originalX = ev.pageX;
            originalY = ev.pageY;
            direction = ev.currentTarget.className.indexOf('vertical') !== -1 ? 'v' : 'h';
            maxWidth = overlayRect.width;
            maxHeight = overlayRect.height;

            if (ev.touches) {
                var touches = ev.touches[0];
                originalX = touches.pageX;
                originalY = touches.pageY;
            }

            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('touchmove', mouseMove);
            window.addEventListener('mouseup', mouseUp);
            window.addEventListener('touchend', mouseUp);
            document.body.style[CSS_USERSELECT] = 'none';
        }

        function mouseMove(ev) {
            var pageX = ev.pageX;
            var pageY = ev.pageY;

            ev.preventDefault();

            if (ev.touches) {
                var touches = ev.touches[0];
                pageX = touches.pageX;
                pageY = touches.pageY;
            }

            var deltaX = pageX - originalX;
            var deltaY = pageY - originalY;
            var newHeight = self.options.viewport.height + deltaY;
            var newWidth = self.options.viewport.width + deltaX;

            if (direction === 'v' && newHeight >= minSize && newHeight <= maxHeight) {
                css(wrap, {
                    height: newHeight + 'px'
                });

                self.options.boundary.height += deltaY;
                css(self.elements.boundary, {
                    height: self.options.boundary.height + 'px'
                });

                self.options.viewport.height += deltaY;
                css(self.elements.viewport, {
                    height: self.options.viewport.height + 'px'
                });
            }
            else if (direction === 'h' && newWidth >= minSize && newWidth <= maxWidth) {
                css(wrap, {
                    width: newWidth + 'px'
                });

                self.options.boundary.width += deltaX;
                css(self.elements.boundary, {
                    width: self.options.boundary.width + 'px'
                });

                self.options.viewport.width += deltaX;
                css(self.elements.viewport, {
                    width: self.options.viewport.width + 'px'
                });
            }

            _updateOverlay.call(self);
            _updateZoomLimits.call(self);
            _updateCenterPoint.call(self);
            _triggerUpdate.call(self);
            originalY = pageY;
            originalX = pageX;
        }

        function mouseUp() {
            isDragging = false;
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('touchmove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
            window.removeEventListener('touchend', mouseUp);
            document.body.style[CSS_USERSELECT] = '';
        }

        if (vr) {
            vr.addEventListener('mousedown', mouseDown);
            vr.addEventListener('touchstart', mouseDown);
        }

        if (hr) {
            hr.addEventListener('mousedown', mouseDown);
            hr.addEventListener('touchstart', mouseDown);
        }

        this.elements.boundary.appendChild(wrap);
    }

    function _setZoomerVal(v) {
        if (this.options.enableZoom) {
            var z = this.elements.zoomer,
                val = fix(v, 4);

            z.value = Math.max(z.min, Math.min(z.max, val));
        }
    }

    function _initializeZoom() {
        var self = this,
            wrap = self.elements.zoomerWrap = document.createElement('div'),
            zoomer = self.elements.zoomer = document.createElement('input');

        addClass(wrap, 'cr-slider-wrap');
        addClass(zoomer, 'cr-slider');
        zoomer.type = 'range';
        zoomer.step = '0.0001';
        zoomer.value = 1;
        zoomer.style.display = self.options.showZoomer ? '' : 'none';
        zoomer.setAttribute('aria-label', 'zoom');

        self.element.appendChild(wrap);
        wrap.appendChild(zoomer);

        self._currentZoom = 1;

        function change() {
            _onZoom.call(self, {
                value: parseFloat(zoomer.value),
                origin: new TransformOrigin(self.elements.preview),
                viewportRect: self.elements.viewport.getBoundingClientRect(),
                transform: Transform.parse(self.elements.preview)
            });
        }

        function scroll(ev) {
            var delta, targetZoom;

            if(self.options.mouseWheelZoom === 'ctrl' && ev.ctrlKey !== true){
              return 0; 
            } else if (ev.wheelDelta) {
                delta = ev.wheelDelta / 1200; //wheelDelta min: -120 max: 120 // max x 10 x 2
            } else if (ev.deltaY) {
                delta = ev.deltaY / 1060; //deltaY min: -53 max: 53 // max x 10 x 2
            } else if (ev.detail) {
                delta = ev.detail / -60; //delta min: -3 max: 3 // max x 10 x 2
            } else {
                delta = 0;
            }

            targetZoom = self._currentZoom + (delta * self._currentZoom);

            ev.preventDefault();
            _setZoomerVal.call(self, targetZoom);
            change.call(self);
        }

        self.elements.zoomer.addEventListener('input', change);// this is being fired twice on keypress
        self.elements.zoomer.addEventListener('change', change);

        if (self.options.mouseWheelZoom) {
            self.elements.boundary.addEventListener('mousewheel', scroll);
            self.elements.boundary.addEventListener('DOMMouseScroll', scroll);
        }
    }

    function _onZoom(ui) {
        var self = this,
            transform = ui ? ui.transform : Transform.parse(self.elements.preview),
            vpRect = ui ? ui.viewportRect : self.elements.viewport.getBoundingClientRect(),
            origin = ui ? ui.origin : new TransformOrigin(self.elements.preview);

        function applyCss() {
            var transCss = {};
            transCss[CSS_TRANSFORM] = transform.toString();
            transCss[CSS_TRANS_ORG] = origin.toString();
            css(self.elements.preview, transCss);
        }

        self._currentZoom = ui ? ui.value : self._currentZoom;
        transform.scale = self._currentZoom;
        self.elements.zoomer.setAttribute('aria-valuenow', self._currentZoom);
        applyCss();

        if (self.options.enforceBoundary) {
            var boundaries = _getVirtualBoundaries.call(self, vpRect),
                transBoundaries = boundaries.translate,
                oBoundaries = boundaries.origin;

            if (transform.x >= transBoundaries.maxX) {
                origin.x = oBoundaries.minX;
                transform.x = transBoundaries.maxX;
            }

            if (transform.x <= transBoundaries.minX) {
                origin.x = oBoundaries.maxX;
                transform.x = transBoundaries.minX;
            }

            if (transform.y >= transBoundaries.maxY) {
                origin.y = oBoundaries.minY;
                transform.y = transBoundaries.maxY;
            }

            if (transform.y <= transBoundaries.minY) {
                origin.y = oBoundaries.maxY;
                transform.y = transBoundaries.minY;
            }
        }
        applyCss();
        _debouncedOverlay.call(self);
        _triggerUpdate.call(self);
    }

    function _getVirtualBoundaries(viewport) {
        var self = this,
            scale = self._currentZoom,
            vpWidth = viewport.width,
            vpHeight = viewport.height,
            centerFromBoundaryX = self.elements.boundary.clientWidth / 2,
            centerFromBoundaryY = self.elements.boundary.clientHeight / 2,
            imgRect = self.elements.preview.getBoundingClientRect(),
            curImgWidth = imgRect.width,
            curImgHeight = imgRect.height,
            halfWidth = vpWidth / 2,
            halfHeight = vpHeight / 2;

        var maxX = ((halfWidth / scale) - centerFromBoundaryX) * -1;
        var minX = maxX - ((curImgWidth * (1 / scale)) - (vpWidth * (1 / scale)));

        var maxY = ((halfHeight / scale) - centerFromBoundaryY) * -1;
        var minY = maxY - ((curImgHeight * (1 / scale)) - (vpHeight * (1 / scale)));

        var originMinX = (1 / scale) * halfWidth;
        var originMaxX = (curImgWidth * (1 / scale)) - originMinX;

        var originMinY = (1 / scale) * halfHeight;
        var originMaxY = (curImgHeight * (1 / scale)) - originMinY;

        return {
            translate: {
                maxX: maxX,
                minX: minX,
                maxY: maxY,
                minY: minY
            },
            origin: {
                maxX: originMaxX,
                minX: originMinX,
                maxY: originMaxY,
                minY: originMinY
            }
        };
    }

    function _updateCenterPoint() {
        var self = this,
            scale = self._currentZoom,
            data = self.elements.preview.getBoundingClientRect(),
            vpData = self.elements.viewport.getBoundingClientRect(),
            transform = Transform.parse(self.elements.preview.style[CSS_TRANSFORM]),
            pc = new TransformOrigin(self.elements.preview),
            top = (vpData.top - data.top) + (vpData.height / 2),
            left = (vpData.left - data.left) + (vpData.width / 2),
            center = {},
            adj = {};

        center.y = top / scale;
        center.x = left / scale;

        adj.y = (center.y - pc.y) * (1 - scale);
        adj.x = (center.x - pc.x) * (1 - scale);

        transform.x -= adj.x;
        transform.y -= adj.y;

        var newCss = {};
        newCss[CSS_TRANS_ORG] = center.x + 'px ' + center.y + 'px';
        newCss[CSS_TRANSFORM] = transform.toString();
        css(self.elements.preview, newCss);
    }

    function _initDraggable() {
        var self = this,
            isDragging = false,
            originalX,
            originalY,
            originalDistance,
            vpRect,
            transform;

        function assignTransformCoordinates(deltaX, deltaY) {
            var imgRect = self.elements.preview.getBoundingClientRect(),
                top = transform.y + deltaY,
                left = transform.x + deltaX;

            if (self.options.enforceBoundary) {
                if (vpRect.top > imgRect.top + deltaY && vpRect.bottom < imgRect.bottom + deltaY) {
                    transform.y = top;
                }

                if (vpRect.left > imgRect.left + deltaX && vpRect.right < imgRect.right + deltaX) {
                    transform.x = left;
                }
            }
            else {
                transform.y = top;
                transform.x = left;
            }
        }

        function toggleGrabState(isDragging) {
          self.elements.preview.setAttribute('aria-grabbed', isDragging);
          self.elements.boundary.setAttribute('aria-dropeffect', isDragging? 'move': 'none');
        }

        function keyDown(ev) {
            var LEFT_ARROW  = 37,
                UP_ARROW    = 38,
                RIGHT_ARROW = 39,
                DOWN_ARROW  = 40;

            if (ev.shiftKey && (ev.keyCode === UP_ARROW || ev.keyCode === DOWN_ARROW)) {
                var zoom = 0.0;
                if (ev.keyCode === UP_ARROW) {
                    zoom = parseFloat(self.elements.zoomer.value, 10) + parseFloat(self.elements.zoomer.step, 10)
                }
                else {
                    zoom = parseFloat(self.elements.zoomer.value, 10) - parseFloat(self.elements.zoomer.step, 10)
                }
                self.setZoom(zoom);
            }
            else if (self.options.enableKeyMovement && (ev.keyCode >= 37 && ev.keyCode <= 40)) {
                ev.preventDefault();
                var movement = parseKeyDown(ev.keyCode);

                transform = Transform.parse(self.elements.preview);
                document.body.style[CSS_USERSELECT] = 'none';
                vpRect = self.elements.viewport.getBoundingClientRect();
                keyMove(movement);
            }

            function parseKeyDown(key) {
                switch (key) {
                    case LEFT_ARROW:
                        return [1, 0];
                    case UP_ARROW:
                        return [0, 1];
                    case RIGHT_ARROW:
                        return [-1, 0];
                    case DOWN_ARROW:
                        return [0, -1];
                }
            }
        }

        function keyMove(movement) {
            var deltaX = movement[0],
                deltaY = movement[1],
                newCss = {};

            assignTransformCoordinates(deltaX, deltaY);

            newCss[CSS_TRANSFORM] = transform.toString();
            css(self.elements.preview, newCss);
            _updateOverlay.call(self);
            document.body.style[CSS_USERSELECT] = '';
            _updateCenterPoint.call(self);
            _triggerUpdate.call(self);
            originalDistance = 0;
        }

        function mouseDown(ev) {
            if (ev.button !== undefined && ev.button !== 0) return;

            ev.preventDefault();
            if (isDragging) return;
            isDragging = true;
            originalX = ev.pageX;
            originalY = ev.pageY;

            if (ev.touches) {
                var touches = ev.touches[0];
                originalX = touches.pageX;
                originalY = touches.pageY;
            }
            toggleGrabState(isDragging);
            transform = Transform.parse(self.elements.preview);
            window.addEventListener('mousemove', mouseMove);
            window.addEventListener('touchmove', mouseMove);
            window.addEventListener('mouseup', mouseUp);
            window.addEventListener('touchend', mouseUp);
            document.body.style[CSS_USERSELECT] = 'none';
            vpRect = self.elements.viewport.getBoundingClientRect();
        }

        function mouseMove(ev) {
            ev.preventDefault();
            var pageX = ev.pageX,
                pageY = ev.pageY;

            if (ev.touches) {
                var touches = ev.touches[0];
                pageX = touches.pageX;
                pageY = touches.pageY;
            }

            var deltaX = pageX - originalX,
                deltaY = pageY - originalY,
                newCss = {};

            if (ev.type === 'touchmove') {
                if (ev.touches.length > 1) {
                    var touch1 = ev.touches[0];
                    var touch2 = ev.touches[1];
                    var dist = Math.sqrt((touch1.pageX - touch2.pageX) * (touch1.pageX - touch2.pageX) + (touch1.pageY - touch2.pageY) * (touch1.pageY - touch2.pageY));

                    if (!originalDistance) {
                        originalDistance = dist / self._currentZoom;
                    }

                    var scale = dist / originalDistance;

                    _setZoomerVal.call(self, scale);
                    dispatchChange(self.elements.zoomer);
                    return;
                }
            }

            assignTransformCoordinates(deltaX, deltaY);

            newCss[CSS_TRANSFORM] = transform.toString();
            css(self.elements.preview, newCss);
            _updateOverlay.call(self);
            originalY = pageY;
            originalX = pageX;
        }

        function mouseUp() {
            isDragging = false;
            toggleGrabState(isDragging);
            window.removeEventListener('mousemove', mouseMove);
            window.removeEventListener('touchmove', mouseMove);
            window.removeEventListener('mouseup', mouseUp);
            window.removeEventListener('touchend', mouseUp);
            document.body.style[CSS_USERSELECT] = '';
            _updateCenterPoint.call(self);
            _triggerUpdate.call(self);
            originalDistance = 0;
        }

        self.elements.overlay.addEventListener('mousedown', mouseDown);
        self.elements.viewport.addEventListener('keydown', keyDown);
        self.elements.overlay.addEventListener('touchstart', mouseDown);
    }

    function _updateOverlay() {
        if (!this.elements) return; // since this is debounced, it can be fired after destroy
        var self = this,
            boundRect = self.elements.boundary.getBoundingClientRect(),
            imgData = self.elements.preview.getBoundingClientRect();

        css(self.elements.overlay, {
            width: imgData.width + 'px',
            height: imgData.height + 'px',
            top: (imgData.top - boundRect.top) + 'px',
            left: (imgData.left - boundRect.left) + 'px'
        });
    }
    var _debouncedOverlay = debounce(_updateOverlay, 500);

    function _triggerUpdate() {
        var self = this,
            data = self.get(),
            ev;

        if (!_isVisible.call(self)) {
            return;
        }

        self.options.update.call(self, data);
        if (self.$ && typeof Prototype === 'undefined') {
            self.$(self.element).trigger('update.croppie', data);
        }
        else {
            var ev;
            if (window.CustomEvent) {
                ev = new CustomEvent('update', { detail: data });
            } else {
                ev = document.createEvent('CustomEvent');
                ev.initCustomEvent('update', true, true, data);
            }

            self.element.dispatchEvent(ev);
        }
    }

    function _isVisible() {
        return this.elements.preview.offsetHeight > 0 && this.elements.preview.offsetWidth > 0;
    }

    function _updatePropertiesFromImage() {
        var self = this,
            initialZoom = 1,
            cssReset = {},
            img = self.elements.preview,
            imgData = null,
            transformReset = new Transform(0, 0, initialZoom),
            originReset = new TransformOrigin(),
            isVisible = _isVisible.call(self);

        if (!isVisible || self.data.bound) {// if the croppie isn't visible or it doesn't need binding
            return;
        }

        self.data.bound = true;
        cssReset[CSS_TRANSFORM] = transformReset.toString();
        cssReset[CSS_TRANS_ORG] = originReset.toString();
        cssReset['opacity'] = 1;
        css(img, cssReset);

        imgData = self.elements.preview.getBoundingClientRect();

        self._originalImageWidth = imgData.width;
        self._originalImageHeight = imgData.height;
        self.data.orientation = getExifOrientation(self.elements.img);

        if (self.options.enableZoom) {
            _updateZoomLimits.call(self, true);
        }
        else {
            self._currentZoom = initialZoom;
        }

        transformReset.scale = self._currentZoom;
        cssReset[CSS_TRANSFORM] = transformReset.toString();
        css(img, cssReset);

        if (self.data.points.length) {
            _bindPoints.call(self, self.data.points);
        }
        else {
            _centerImage.call(self);
        }

        _updateCenterPoint.call(self);
        _updateOverlay.call(self);
    }

    function _updateZoomLimits (initial) {
        var self = this,
            minZoom = 0,
            maxZoom = self.options.maxZoom || 1.5,
            initialZoom,
            defaultInitialZoom,
            zoomer = self.elements.zoomer,
            scale = parseFloat(zoomer.value),
            boundaryData = self.elements.boundary.getBoundingClientRect(),
            imgData = naturalImageDimensions(self.elements.img, self.data.orientation),
            vpData = self.elements.viewport.getBoundingClientRect(),
            minW,
            minH;
        if (self.options.enforceBoundary) {
            minW = vpData.width / imgData.width;
            minH = vpData.height / imgData.height;
            minZoom = Math.max(minW, minH);
        }

        if (minZoom >= maxZoom) {
            maxZoom = minZoom + 1;
        }

        zoomer.min = fix(minZoom, 4);
        zoomer.max = fix(maxZoom, 4);
        
        if (!initial && (scale < zoomer.min || scale > zoomer.max)) {
            _setZoomerVal.call(self, scale < zoomer.min ? zoomer.min : zoomer.max);
        }
        else if (initial) {
            defaultInitialZoom = Math.max((boundaryData.width / imgData.width), (boundaryData.height / imgData.height));
            initialZoom = self.data.boundZoom !== null ? self.data.boundZoom : defaultInitialZoom;
            _setZoomerVal.call(self, initialZoom);
        }

        dispatchChange(zoomer);
    }

    function _bindPoints(points) {
        if (points.length !== 4) {
            throw "Croppie - Invalid number of points supplied: " + points;
        }
        var self = this,
            pointsWidth = points[2] - points[0],
            // pointsHeight = points[3] - points[1],
            vpData = self.elements.viewport.getBoundingClientRect(),
            boundRect = self.elements.boundary.getBoundingClientRect(),
            vpOffset = {
                left: vpData.left - boundRect.left,
                top: vpData.top - boundRect.top
            },
            scale = vpData.width / pointsWidth,
            originTop = points[1],
            originLeft = points[0],
            transformTop = (-1 * points[1]) + vpOffset.top,
            transformLeft = (-1 * points[0]) + vpOffset.left,
            newCss = {};

        newCss[CSS_TRANS_ORG] = originLeft + 'px ' + originTop + 'px';
        newCss[CSS_TRANSFORM] = new Transform(transformLeft, transformTop, scale).toString();
        css(self.elements.preview, newCss);

        _setZoomerVal.call(self, scale);
        self._currentZoom = scale;
    }

    function _centerImage() {
        var self = this,
            imgDim = self.elements.preview.getBoundingClientRect(),
            vpDim = self.elements.viewport.getBoundingClientRect(),
            boundDim = self.elements.boundary.getBoundingClientRect(),
            vpLeft = vpDim.left - boundDim.left,
            vpTop = vpDim.top - boundDim.top,
            w = vpLeft - ((imgDim.width - vpDim.width) / 2),
            h = vpTop - ((imgDim.height - vpDim.height) / 2),
            transform = new Transform(w, h, self._currentZoom);

        css(self.elements.preview, CSS_TRANSFORM, transform.toString());
    }

    function _transferImageToCanvas(customOrientation) {
        var self = this,
            canvas = self.elements.canvas,
            img = self.elements.img,
            ctx = canvas.getContext('2d'),
            exif = _hasExif.call(self),
            customOrientation = self.options.enableOrientation && customOrientation;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = img.width;
        canvas.height = img.height;

        if (exif && !customOrientation) {
            var orientation = getExifOrientation(img);
            drawCanvas(canvas, img, num(orientation || 0, 10));
        }
        else if (customOrientation) {
            drawCanvas(canvas, img, customOrientation);
        }
    }

    function _getCanvas(data) {
        var self = this,
            points = data.points,
            left = num(points[0]),
            top = num(points[1]),
            right = num(points[2]),
            bottom = num(points[3]),
            width = right-left,
            height = bottom-top,
            circle = data.circle,
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            startX = 0,
            startY = 0,
            canvasWidth = data.outputWidth || width,
            canvasHeight = data.outputHeight || height,
            customDimensions = (data.outputWidth && data.outputHeight),
            outputWidthRatio = 1,
            outputHeightRatio = 1;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        if (data.backgroundColor) {
            ctx.fillStyle = data.backgroundColor;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        }

        if (self.options.enforceBoundary !== false) {
            width = Math.min(width, self._originalImageWidth);
            height = Math.min(height, self._originalImageHeight);
        }
    
        // console.table({ left, right, top, bottom, canvasWidth, canvasHeight });
        ctx.drawImage(this.elements.preview, left, top, width, height, startX, startY, canvasWidth, canvasHeight);
        if (circle) {
            ctx.fillStyle = '#fff';
            ctx.globalCompositeOperation = 'destination-in';
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
        return canvas;
    }

    function _getHtmlResult(data) {
        var points = data.points,
            div = document.createElement('div'),
            img = document.createElement('img'),
            width = points[2] - points[0],
            height = points[3] - points[1];

        addClass(div, 'croppie-result');
        div.appendChild(img);
        css(img, {
            left: (-1 * points[0]) + 'px',
            top: (-1 * points[1]) + 'px'
        });
        img.src = data.url;
        css(div, {
            width: width + 'px',
            height: height + 'px'
        });

        return div;
    }

    function _getBase64Result(data) {
        return _getCanvas.call(this, data).toDataURL(data.format, data.quality);
    }

    function _getBlobResult(data) {
        var self = this;
        return new Promise(function (resolve, reject) {
            _getCanvas.call(self, data).toBlob(function (blob) {
                resolve(blob);
            }, data.format, data.quality);
        });
    }

    function _replaceImage(img) {
        if (this.elements.img.parentNode) {
            Array.prototype.forEach.call(this.elements.img.classList, function(c) { img.classList.add(c); });
            this.elements.img.parentNode.replaceChild(img, this.elements.img);
            this.elements.preview = img; // if the img is attached to the DOM, they're not using the canvas
        }
        this.elements.img = img;
    }

    function _bind(options, cb) {
        var self = this,
            url,
            points = [],
            zoom = null,
            hasExif = _hasExif.call(self);

        if (typeof (options) === 'string') {
            url = options;
            options = {};
        }
        else if (Array.isArray(options)) {
            points = options.slice();
        }
        else if (typeof (options) === 'undefined' && self.data.url) { //refreshing
            _updatePropertiesFromImage.call(self);
            _triggerUpdate.call(self);
            return null;
        }
        else {
            url = options.url;
            points = options.points || [];
            zoom = typeof(options.zoom) === 'undefined' ? null : options.zoom;
        }

        self.data.bound = false;
        self.data.url = url || self.data.url;
        self.data.boundZoom = zoom;

        return loadImage(url, hasExif).then(function (img) {
            _replaceImage.call(self, img);
            if (!points.length) {
                var natDim = naturalImageDimensions(img);
                var rect = self.elements.viewport.getBoundingClientRect();
                var aspectRatio = rect.width / rect.height;
                var imgAspectRatio = natDim.width / natDim.height;
                var width, height;

                if (imgAspectRatio > aspectRatio) {
                    height = natDim.height;
                    width = height * aspectRatio;
                }
                else {
                    width = natDim.width;
                    height = natDim.height / aspectRatio;
                }

                var x0 = (natDim.width - width) / 2;
                var y0 = (natDim.height - height) / 2;
                var x1 = x0 + width;
                var y1 = y0 + height;
                self.data.points = [x0, y0, x1, y1];
            }
            else if (self.options.relative) {
                points = [
                    points[0] * img.naturalWidth / 100,
                    points[1] * img.naturalHeight / 100,
                    points[2] * img.naturalWidth / 100,
                    points[3] * img.naturalHeight / 100
                ];
            }

            self.data.points = points.map(function (p) {
                return parseFloat(p);
            });
            if (self.options.useCanvas) {
                _transferImageToCanvas.call(self, options.orientation || 1);
            }
            _updatePropertiesFromImage.call(self);
            _triggerUpdate.call(self);
            cb && cb();
        }).catch(function (err) {
            console.error("Croppie:" + err);
        });
    }

    function fix(v, decimalPoints) {
        return parseFloat(v).toFixed(decimalPoints || 0);
    }

    function _get() {
        var self = this,
            imgData = self.elements.preview.getBoundingClientRect(),
            vpData = self.elements.viewport.getBoundingClientRect(),
            x1 = vpData.left - imgData.left,
            y1 = vpData.top - imgData.top,
            widthDiff = (vpData.width - self.elements.viewport.offsetWidth) / 2, //border
            heightDiff = (vpData.height - self.elements.viewport.offsetHeight) / 2,
            x2 = x1 + self.elements.viewport.offsetWidth + widthDiff,
            y2 = y1 + self.elements.viewport.offsetHeight + heightDiff,
            scale = self._currentZoom;

        if (scale === Infinity || isNaN(scale)) {
            scale = 1;
        }

        var max = self.options.enforceBoundary ? 0 : Number.NEGATIVE_INFINITY;
        x1 = Math.max(max, x1 / scale);
        y1 = Math.max(max, y1 / scale);
        x2 = Math.max(max, x2 / scale);
        y2 = Math.max(max, y2 / scale);

        return {
            points: [fix(x1), fix(y1), fix(x2), fix(y2)],
            zoom: scale,
            orientation: self.data.orientation
        };
    }

    var RESULT_DEFAULTS = {
            type: 'canvas',
            format: 'png',
            quality: 1
        },
        RESULT_FORMATS = ['jpeg', 'webp', 'png'];

    function _result(options) {
        var self = this,
            data = _get.call(self),
            opts = deepExtend(clone(RESULT_DEFAULTS), clone(options)),
            resultType = (typeof (options) === 'string' ? options : (opts.type || 'base64')),
            size = opts.size || 'viewport',
            format = opts.format,
            quality = opts.quality,
            backgroundColor = opts.backgroundColor,
            circle = typeof opts.circle === 'boolean' ? opts.circle : (self.options.viewport.type === 'circle'),
            vpRect = self.elements.viewport.getBoundingClientRect(),
            ratio = vpRect.width / vpRect.height,
            prom;

        if (size === 'viewport') {
            data.outputWidth = vpRect.width;
            data.outputHeight = vpRect.height;
        } else if (typeof size === 'object') {
            if (size.width && size.height) {
                data.outputWidth = size.width;
                data.outputHeight = size.height;
            } else if (size.width) {
                data.outputWidth = size.width;
                data.outputHeight = size.width / ratio;
            } else if (size.height) {
                data.outputWidth = size.height * ratio;
                data.outputHeight = size.height;
            }
        }

        if (RESULT_FORMATS.indexOf(format) > -1) {
            data.format = 'image/' + format;
            data.quality = quality;
        }

        data.circle = circle;
        data.url = self.data.url;
        data.backgroundColor = backgroundColor;

        prom = new Promise(function (resolve, reject) {
            switch(resultType.toLowerCase())
            {
                case 'rawcanvas':
                    resolve(_getCanvas.call(self, data));
                    break;
                case 'canvas':
                case 'base64':
                    resolve(_getBase64Result.call(self, data));
                    break;
                case 'blob':
                    _getBlobResult.call(self, data).then(resolve);
                    break;
                default:
                    resolve(_getHtmlResult.call(self, data));
                    break;
            }
        });
        return prom;
    }

    function _refresh() {
        _updatePropertiesFromImage.call(this);
    }

    function _rotate(deg) {
        if (!this.options.useCanvas || !this.options.enableOrientation) {
            throw 'Croppie: Cannot rotate without enableOrientation && EXIF.js included';
        }

        var self = this,
            canvas = self.elements.canvas,
            ornt;

        self.data.orientation = getExifOffset(self.data.orientation, deg);
        drawCanvas(canvas, self.elements.img, self.data.orientation);
        _updateZoomLimits.call(self);
        _onZoom.call(self);
        copy = null;
    }

    function _destroy() {
        var self = this;
        self.element.removeChild(self.elements.boundary);
        removeClass(self.element, 'croppie-container');
        if (self.options.enableZoom) {
            self.element.removeChild(self.elements.zoomerWrap);
        }
        delete self.elements;
    }

    if (window.jQuery) {
        var $ = window.jQuery;
        $.fn.croppie = function (opts) {
            var ot = typeof opts;

            if (ot === 'string') {
                var args = Array.prototype.slice.call(arguments, 1);
                var singleInst = $(this).data('croppie');

                if (opts === 'get') {
                    return singleInst.get();
                }
                else if (opts === 'result') {
                    return singleInst.result.apply(singleInst, args);
                }
                else if (opts === 'bind') {
                    return singleInst.bind.apply(singleInst, args);
                }

                return this.each(function () {
                    var i = $(this).data('croppie');
                    if (!i) return;

                    var method = i[opts];
                    if ($.isFunction(method)) {
                        method.apply(i, args);
                        if (opts === 'destroy') {
                            $(this).removeData('croppie');
                        }
                    }
                    else {
                        throw 'Croppie ' + opts + ' method not found';
                    }
                });
            }
            else {
                return this.each(function () {
                    var i = new Croppie(this, opts);
                    i.$ = $;
                    $(this).data('croppie', i);
                });
            }
        };
    }

    function Croppie(element, opts) {
        if (element.className.indexOf('croppie-container') > -1) {
            throw new Error("Croppie: Can't initialize croppie more than once");
        }
        this.element = element;
        this.options = deepExtend(clone(Croppie.defaults), opts);

        if (this.element.tagName.toLowerCase() === 'img') {
            var origImage = this.element;
            addClass(origImage, 'cr-original-image');
            setAttributes(origImage, {'aria-hidden' : 'true', 'alt' : '' });
            var replacementDiv = document.createElement('div');
            this.element.parentNode.appendChild(replacementDiv);
            replacementDiv.appendChild(origImage);
            this.element = replacementDiv;
            this.options.url = this.options.url || origImage.src;
        }

        _create.call(this);
        if (this.options.url) {
            var bindOpts = {
                url: this.options.url,
                points: this.options.points
            };
            delete this.options['url'];
            delete this.options['points'];
            _bind.call(this, bindOpts);
        }
    }

    Croppie.defaults = {
        viewport: {
            width: 100,
            height: 100,
            type: 'square'
        },
        boundary: { },
        orientationControls: {
            enabled: true,
            leftClass: '',
            rightClass: ''
        },
        resizeControls: {
            width: true,
            height: true
        },
        customClass: '',
        showZoomer: true,
        enableZoom: true,
        enableResize: false,
        mouseWheelZoom: true,
        enableExif: false,
        enforceBoundary: true,
        enableOrientation: false,
        enableKeyMovement: true,
        update: function () { }
    };

    Croppie.globals = {
        translate: 'translate3d'
    };

    deepExtend(Croppie.prototype, {
        bind: function (options, cb) {
            return _bind.call(this, options, cb);
        },
        get: function () {
            var data = _get.call(this);
            var points = data.points;
            if (this.options.relative) {
                points[0] /= this.elements.img.naturalWidth / 100;
                points[1] /= this.elements.img.naturalHeight / 100;
                points[2] /= this.elements.img.naturalWidth / 100;
                points[3] /= this.elements.img.naturalHeight / 100;
            }
            return data;
        },
        result: function (type) {
            return _result.call(this, type);
        },
        refresh: function () {
            return _refresh.call(this);
        },
        setZoom: function (v) {
            _setZoomerVal.call(this, v);
            dispatchChange(this.elements.zoomer);
        },
        rotate: function (deg) {
            _rotate.call(this, deg);
        },
        destroy: function () {
            return _destroy.call(this);
        }
    });

    exports.Croppie = window.Croppie = Croppie;
}));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTNlMDkzZjAxMDczODUwODFhZTUiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2F2YXRhci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jcm9wcGllL2Nyb3BwaWUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zZXRpbW1lZGlhdGUvc2V0SW1tZWRpYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiXSwibmFtZXMiOlsiYXZhdGFyQ3JvcHBlciIsIkNyb3BwaWUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwidmlld3BvcnQiLCJ3aWR0aCIsImhlaWdodCIsInR5cGUiLCJib3VuZGFyeSIsInJlYWRGaWxlIiwiaW5wdXQiLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJmaWxlcyIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJlIiwiYmluZCIsInVybCIsInJlc3VsdCIsInJlYWRBc0RhdGFVUkwiLCJvbmNoYW5nZSIsIm9uY2xpY2siLCJhdmF0YXIiLCJ0aGVuIiwiYmxvYiIsImF2YXRhclVwbG9hZCIsIm9uc3VibWl0IiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImRhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsImF4aW9zIiwibWV0aG9kIiwiaGVhZGVycyIsIndpbmRvdyIsImxvY2F0aW9uIiwiYXNzaWduIiwiY2F0Y2giLCJjb25zb2xlIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM3REE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7O0FBRUEsSUFBTUEsZ0JBQWdCLElBQUlDLGdEQUFKLENBQVlDLFNBQVNDLGNBQVQsQ0FBd0IsZ0JBQXhC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Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0EsOENBQThDLDRDQUE0QztBQUMxRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1QjtBQUNBLGFBQWE7QUFDYiw2Q0FBNkM7QUFDN0MsYUFBYTtBQUNiLHlDQUF5QztBQUN6QyxhQUFhO0FBQ2Isd0NBQXdDO0FBQ3hDLGFBQWE7QUFDYjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtEQUErRDtBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsZUFBZTtBQUMvRCxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNENBQTRDO0FBQzVDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEIsc0RBQXNEO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxtRkFBbUYsc0JBQXNCLEVBQUU7QUFDM0c7QUFDQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLG9DQUFvQztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULG1CQUFtQixFQUFFO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDN2lERDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNwQkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7OztBQ3ZMdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlCQUFpQjtBQUN0QztBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLHNCQUFzQixFQUFFO0FBQ2xFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ3pMRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsbUJBQU8sQ0FBQyxpRUFBYztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDOURBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDIiwiZmlsZSI6ImpzL2F2YXRhci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vYXNzZXRzL2pzL2F2YXRhci5qc1wiKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlM2UwOTNmMDEwNzM4NTA4MWFlNSIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgeyBDcm9wcGllIH0gZnJvbSAnY3JvcHBpZSc7XG5cbmNvbnN0IGF2YXRhckNyb3BwZXIgPSBuZXcgQ3JvcHBpZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXZhdGFyX3ByZXZpZXcnKSwge1xuICAgIHZpZXdwb3J0OiB7IHdpZHRoOiAyMDAsIGhlaWdodDogMjAwLCB0eXBlOiAnY2lyY2xlJyB9LFxuICAgIGJvdW5kYXJ5OiB7IHdpZHRoOiAzMDAsIGhlaWdodDogMzAwIH1cbn0pO1xuXG5mdW5jdGlvbiByZWFkRmlsZSh7IHRhcmdldDogaW5wdXQgfSkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdmF0YXJfcHJldmlldycpLmNsYXNzTGlzdC5hZGQoJ2lzLXZpc2libGUnKTtcbiAgICBpZiAoaW5wdXQuZmlsZXMgJiYgaW5wdXQuZmlsZXNbMF0pIHtcbiAgICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgLyogZGlzcGxheSByZWFkeSAqL1xuXG4gICAgICAgICAgICBhdmF0YXJDcm9wcGVyLmJpbmQoeyB1cmw6IGUudGFyZ2V0LnJlc3VsdCB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChpbnB1dC5maWxlc1swXSk7XG4gICAgfVxufVxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXZhdGFyX2ZpbGUnKS5vbmNoYW5nZSA9IHJlYWRGaWxlO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F2YXRhcl9zdWJtaXQnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IGF2YXRhcjtcbiAgICBhdmF0YXJDcm9wcGVyLnJlc3VsdCh7IHR5cGU6ICdibG9iJyB9KS50aGVuKGJsb2IgPT4ge1xuICAgICAgICBhdmF0YXIgPSBibG9iO1xuICAgICAgICBhdmF0YXJVcGxvYWQoYXZhdGFyKTtcbiAgICB9KTtcbn07XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdmF0YXJfZm9ybScpLm9uc3VibWl0ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuZnVuY3Rpb24gYXZhdGFyVXBsb2FkKGJsb2IpIHtcbiAgICBjb25zdCB1cmwgPSAnL2ltYWdlJztcbiAgICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgZGF0YS5hcHBlbmQoJ2F2YXRhcicsIGJsb2IpO1xuXG4gICAgYXhpb3Moe1xuICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cbiAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uYXNzaWduKCcvc3VjY2VzcycpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIH0pO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2pzL2F2YXRhci5qcyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xudmFyIGJ0b2EgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmJ0b2EgJiYgd2luZG93LmJ0b2EuYmluZCh3aW5kb3cpKSB8fCByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnRvYScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHZhciBsb2FkRXZlbnQgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbiAgICB2YXIgeERvbWFpbiA9IGZhbHNlO1xuXG4gICAgLy8gRm9yIElFIDgvOSBDT1JTIHN1cHBvcnRcbiAgICAvLyBPbmx5IHN1cHBvcnRzIFBPU1QgYW5kIEdFVCBjYWxscyBhbmQgZG9lc24ndCByZXR1cm5zIHRoZSByZXNwb25zZSBoZWFkZXJzLlxuICAgIC8vIERPTidUIGRvIHRoaXMgZm9yIHRlc3RpbmcgYi9jIFhNTEh0dHBSZXF1ZXN0IGlzIG1vY2tlZCwgbm90IFhEb21haW5SZXF1ZXN0LlxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Rlc3QnICYmXG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHdpbmRvdy5YRG9tYWluUmVxdWVzdCAmJiAhKCd3aXRoQ3JlZGVudGlhbHMnIGluIHJlcXVlc3QpICYmXG4gICAgICAgICFpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpIHtcbiAgICAgIHJlcXVlc3QgPSBuZXcgd2luZG93LlhEb21haW5SZXF1ZXN0KCk7XG4gICAgICBsb2FkRXZlbnQgPSAnb25sb2FkJztcbiAgICAgIHhEb21haW4gPSB0cnVlO1xuICAgICAgcmVxdWVzdC5vbnByb2dyZXNzID0gZnVuY3Rpb24gaGFuZGxlUHJvZ3Jlc3MoKSB7fTtcbiAgICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHt9O1xuICAgIH1cblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgfHwgJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3RbbG9hZEV2ZW50XSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCAmJiAheERvbWFpbikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgLy8gSUUgc2VuZHMgMTIyMyBpbnN0ZWFkIG9mIDIwNCAoaHR0cHM6Ly9naXRodWIuY29tL2F4aW9zL2F4aW9zL2lzc3Vlcy8yMDEpXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAnTm8gQ29udGVudCcgOiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDpcbiAgICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZSh1dGlscy5tZXJnZShkZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2F4aW9zLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLy4uL2RlZmF1bHRzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gdXRpbHMubWVyZ2Uoe1xuICAgICAgdXJsOiBhcmd1bWVudHNbMF1cbiAgICB9LCBhcmd1bWVudHNbMV0pO1xuICB9XG5cbiAgY29uZmlnID0gdXRpbHMubWVyZ2UoZGVmYXVsdHMsIHttZXRob2Q6ICdnZXQnfSwgdGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvY3JlYXRlRXJyb3IuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBTdXBwb3J0IGJhc2VVUkwgY29uZmlnXG4gIGlmIChjb25maWcuYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChjb25maWcudXJsKSkge1xuICAgIGNvbmZpZy51cmwgPSBjb21iaW5lVVJMcyhjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIH1cblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzIHx8IHt9XG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgcmV0dXJuIGVycm9yO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZW5oYW5jZUVycm9yLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICAvLyBOb3RlOiBzdGF0dXMgaXMgbm90IGV4cG9zZWQgYnkgWERvbWFpblJlcXVlc3RcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9zZXR0bGUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9kZWZhdWx0cy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQiLCIndXNlIHN0cmljdCc7XG5cbi8vIGJ0b2EgcG9seWZpbGwgZm9yIElFPDEwIGNvdXJ0ZXN5IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXZpZGNoYW1iZXJzL0Jhc2U2NC5qc1xuXG52YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xuXG5mdW5jdGlvbiBFKCkge1xuICB0aGlzLm1lc3NhZ2UgPSAnU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyJztcbn1cbkUucHJvdG90eXBlID0gbmV3IEVycm9yO1xuRS5wcm90b3R5cGUuY29kZSA9IDU7XG5FLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cbmZ1bmN0aW9uIGJ0b2EoaW5wdXQpIHtcbiAgdmFyIHN0ciA9IFN0cmluZyhpbnB1dCk7XG4gIHZhciBvdXRwdXQgPSAnJztcbiAgZm9yIChcbiAgICAvLyBpbml0aWFsaXplIHJlc3VsdCBhbmQgY291bnRlclxuICAgIHZhciBibG9jaywgY2hhckNvZGUsIGlkeCA9IDAsIG1hcCA9IGNoYXJzO1xuICAgIC8vIGlmIHRoZSBuZXh0IHN0ciBpbmRleCBkb2VzIG5vdCBleGlzdDpcbiAgICAvLyAgIGNoYW5nZSB0aGUgbWFwcGluZyB0YWJsZSB0byBcIj1cIlxuICAgIC8vICAgY2hlY2sgaWYgZCBoYXMgbm8gZnJhY3Rpb25hbCBkaWdpdHNcbiAgICBzdHIuY2hhckF0KGlkeCB8IDApIHx8IChtYXAgPSAnPScsIGlkeCAlIDEpO1xuICAgIC8vIFwiOCAtIGlkeCAlIDEgKiA4XCIgZ2VuZXJhdGVzIHRoZSBzZXF1ZW5jZSAyLCA0LCA2LCA4XG4gICAgb3V0cHV0ICs9IG1hcC5jaGFyQXQoNjMgJiBibG9jayA+PiA4IC0gaWR4ICUgMSAqIDgpXG4gICkge1xuICAgIGNoYXJDb2RlID0gc3RyLmNoYXJDb2RlQXQoaWR4ICs9IDMgLyA0KTtcbiAgICBpZiAoY2hhckNvZGUgPiAweEZGKSB7XG4gICAgICB0aHJvdyBuZXcgRSgpO1xuICAgIH1cbiAgICBibG9jayA9IGJsb2NrIDw8IDggfCBjaGFyQ29kZTtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ0b2E7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idG9hLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idG9hLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyU0MC9naSwgJ0AnKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2NvbWJpbmVVUkxzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgfSxcblxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH0pKClcbik7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgIH1cblxuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKVxuKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3BhcnNlSGVhZGVycy5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvc3ByZWFkLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiLyoqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogQ3JvcHBpZVxyXG4gKiBDb3B5cmlnaHQgMjAxOFxyXG4gKiBGb2xpb3Rla1xyXG4gKiBWZXJzaW9uOiAyLjYuMlxyXG4gKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XHJcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XHJcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxyXG4gICAgICAgIGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgZXhwb3J0cy5ub2RlTmFtZSAhPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAvLyBDb21tb25KU1xyXG4gICAgICAgIGZhY3RvcnkoZXhwb3J0cyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xyXG4gICAgICAgIGZhY3RvcnkoKHJvb3QuY29tbW9uSnNTdHJpY3QgPSB7fSkpO1xyXG4gICAgfVxyXG59KHRoaXMsIGZ1bmN0aW9uIChleHBvcnRzKSB7XHJcblxyXG4gICAgLyogUG9seWZpbGxzICovXHJcbiAgICBpZiAodHlwZW9mIFByb21pc2UgIT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAvKiEgcHJvbWlzZS1wb2x5ZmlsbCAzLjEuMCAqL1xyXG4gICAgICAgICFmdW5jdGlvbihhKXtmdW5jdGlvbiBiKGEsYil7cmV0dXJuIGZ1bmN0aW9uKCl7YS5hcHBseShiLGFyZ3VtZW50cyl9fWZ1bmN0aW9uIGMoYSl7aWYoXCJvYmplY3RcIiE9PXR5cGVvZiB0aGlzKXRocm93IG5ldyBUeXBlRXJyb3IoXCJQcm9taXNlcyBtdXN0IGJlIGNvbnN0cnVjdGVkIHZpYSBuZXdcIik7aWYoXCJmdW5jdGlvblwiIT09dHlwZW9mIGEpdGhyb3cgbmV3IFR5cGVFcnJvcihcIm5vdCBhIGZ1bmN0aW9uXCIpO3RoaXMuX3N0YXRlPW51bGwsdGhpcy5fdmFsdWU9bnVsbCx0aGlzLl9kZWZlcnJlZHM9W10saShhLGIoZSx0aGlzKSxiKGYsdGhpcykpfWZ1bmN0aW9uIGQoYSl7dmFyIGI9dGhpcztyZXR1cm4gbnVsbD09PXRoaXMuX3N0YXRlP3ZvaWQgdGhpcy5fZGVmZXJyZWRzLnB1c2goYSk6dm9pZCBrKGZ1bmN0aW9uKCl7dmFyIGM9Yi5fc3RhdGU/YS5vbkZ1bGZpbGxlZDphLm9uUmVqZWN0ZWQ7aWYobnVsbD09PWMpcmV0dXJuIHZvaWQoYi5fc3RhdGU/YS5yZXNvbHZlOmEucmVqZWN0KShiLl92YWx1ZSk7dmFyIGQ7dHJ5e2Q9YyhiLl92YWx1ZSl9Y2F0Y2goZSl7cmV0dXJuIHZvaWQgYS5yZWplY3QoZSl9YS5yZXNvbHZlKGQpfSl9ZnVuY3Rpb24gZShhKXt0cnl7aWYoYT09PXRoaXMpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkEgcHJvbWlzZSBjYW5ub3QgYmUgcmVzb2x2ZWQgd2l0aCBpdHNlbGYuXCIpO2lmKGEmJihcIm9iamVjdFwiPT09dHlwZW9mIGF8fFwiZnVuY3Rpb25cIj09PXR5cGVvZiBhKSl7dmFyIGM9YS50aGVuO2lmKFwiZnVuY3Rpb25cIj09PXR5cGVvZiBjKXJldHVybiB2b2lkIGkoYihjLGEpLGIoZSx0aGlzKSxiKGYsdGhpcykpfXRoaXMuX3N0YXRlPSEwLHRoaXMuX3ZhbHVlPWEsZy5jYWxsKHRoaXMpfWNhdGNoKGQpe2YuY2FsbCh0aGlzLGQpfX1mdW5jdGlvbiBmKGEpe3RoaXMuX3N0YXRlPSExLHRoaXMuX3ZhbHVlPWEsZy5jYWxsKHRoaXMpfWZ1bmN0aW9uIGcoKXtmb3IodmFyIGE9MCxiPXRoaXMuX2RlZmVycmVkcy5sZW5ndGg7Yj5hO2ErKylkLmNhbGwodGhpcyx0aGlzLl9kZWZlcnJlZHNbYV0pO3RoaXMuX2RlZmVycmVkcz1udWxsfWZ1bmN0aW9uIGgoYSxiLGMsZCl7dGhpcy5vbkZ1bGZpbGxlZD1cImZ1bmN0aW9uXCI9PT10eXBlb2YgYT9hOm51bGwsdGhpcy5vblJlamVjdGVkPVwiZnVuY3Rpb25cIj09PXR5cGVvZiBiP2I6bnVsbCx0aGlzLnJlc29sdmU9Yyx0aGlzLnJlamVjdD1kfWZ1bmN0aW9uIGkoYSxiLGMpe3ZhciBkPSExO3RyeXthKGZ1bmN0aW9uKGEpe2R8fChkPSEwLGIoYSkpfSxmdW5jdGlvbihhKXtkfHwoZD0hMCxjKGEpKX0pfWNhdGNoKGUpe2lmKGQpcmV0dXJuO2Q9ITAsYyhlKX19dmFyIGo9c2V0VGltZW91dCxrPVwiZnVuY3Rpb25cIj09PXR5cGVvZiBzZXRJbW1lZGlhdGUmJnNldEltbWVkaWF0ZXx8ZnVuY3Rpb24oYSl7aihhLDEpfSxsPUFycmF5LmlzQXJyYXl8fGZ1bmN0aW9uKGEpe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhKX07Yy5wcm90b3R5cGVbXCJjYXRjaFwiXT1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy50aGVuKG51bGwsYSl9LGMucHJvdG90eXBlLnRoZW49ZnVuY3Rpb24oYSxiKXt2YXIgZT10aGlzO3JldHVybiBuZXcgYyhmdW5jdGlvbihjLGYpe2QuY2FsbChlLG5ldyBoKGEsYixjLGYpKX0pfSxjLmFsbD1mdW5jdGlvbigpe3ZhciBhPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKDE9PT1hcmd1bWVudHMubGVuZ3RoJiZsKGFyZ3VtZW50c1swXSk/YXJndW1lbnRzWzBdOmFyZ3VtZW50cyk7cmV0dXJuIG5ldyBjKGZ1bmN0aW9uKGIsYyl7ZnVuY3Rpb24gZChmLGcpe3RyeXtpZihnJiYoXCJvYmplY3RcIj09PXR5cGVvZiBnfHxcImZ1bmN0aW9uXCI9PT10eXBlb2YgZykpe3ZhciBoPWcudGhlbjtpZihcImZ1bmN0aW9uXCI9PT10eXBlb2YgaClyZXR1cm4gdm9pZCBoLmNhbGwoZyxmdW5jdGlvbihhKXtkKGYsYSl9LGMpfWFbZl09ZywwPT09LS1lJiZiKGEpfWNhdGNoKGkpe2MoaSl9fWlmKDA9PT1hLmxlbmd0aClyZXR1cm4gYihbXSk7Zm9yKHZhciBlPWEubGVuZ3RoLGY9MDtmPGEubGVuZ3RoO2YrKylkKGYsYVtmXSl9KX0sYy5yZXNvbHZlPWZ1bmN0aW9uKGEpe3JldHVybiBhJiZcIm9iamVjdFwiPT09dHlwZW9mIGEmJmEuY29uc3RydWN0b3I9PT1jP2E6bmV3IGMoZnVuY3Rpb24oYil7YihhKX0pfSxjLnJlamVjdD1mdW5jdGlvbihhKXtyZXR1cm4gbmV3IGMoZnVuY3Rpb24oYixjKXtjKGEpfSl9LGMucmFjZT1mdW5jdGlvbihhKXtyZXR1cm4gbmV3IGMoZnVuY3Rpb24oYixjKXtmb3IodmFyIGQ9MCxlPWEubGVuZ3RoO2U+ZDtkKyspYVtkXS50aGVuKGIsYyl9KX0sYy5fc2V0SW1tZWRpYXRlRm49ZnVuY3Rpb24oYSl7az1hfSxcInVuZGVmaW5lZFwiIT09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9YzphLlByb21pc2V8fChhLlByb21pc2U9Yyl9KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICggdHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudCAhPT0gXCJmdW5jdGlvblwiICkge1xyXG4gICAgICAgIChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBDdXN0b21FdmVudCAoIGV2ZW50LCBwYXJhbXMgKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBwYXJhbXMgfHwgeyBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIGRldGFpbDogdW5kZWZpbmVkIH07XHJcbiAgICAgICAgICAgICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoICdDdXN0b21FdmVudCcgKTtcclxuICAgICAgICAgICAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoIGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwgKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBldnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gd2luZG93LkV2ZW50LnByb3RvdHlwZTtcclxuICAgICAgICAgICAgd2luZG93LkN1c3RvbUV2ZW50ID0gQ3VzdG9tRXZlbnQ7XHJcbiAgICAgICAgfSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIUhUTUxDYW52YXNFbGVtZW50LnByb3RvdHlwZS50b0Jsb2IpIHtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoSFRNTENhbnZhc0VsZW1lbnQucHJvdG90eXBlLCAndG9CbG9iJywge1xyXG4gICAgICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKGNhbGxiYWNrLCB0eXBlLCBxdWFsaXR5KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYmluU3RyID0gYXRvYiggdGhpcy50b0RhdGFVUkwodHlwZSwgcXVhbGl0eSkuc3BsaXQoJywnKVsxXSApLFxyXG4gICAgICAgICAgICAgICAgbGVuID0gYmluU3RyLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIGFyciA9IG5ldyBVaW50OEFycmF5KGxlbik7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpPGxlbjsgaSsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycltpXSA9IGJpblN0ci5jaGFyQ29kZUF0KGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCBuZXcgQmxvYiggW2Fycl0sIHt0eXBlOiB0eXBlIHx8ICdpbWFnZS9wbmcnfSApICk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qIEVuZCBQb2x5ZmlsbHMgKi9cclxuXHJcbiAgICB2YXIgY3NzUHJlZml4ZXMgPSBbJ1dlYmtpdCcsICdNb3onLCAnbXMnXSxcclxuICAgICAgICBlbXB0eVN0eWxlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLnN0eWxlLFxyXG4gICAgICAgIEVYSUZfTk9STSA9IFsxLDgsMyw2XSxcclxuICAgICAgICBFWElGX0ZMSVAgPSBbMiw3LDQsNV0sXHJcbiAgICAgICAgQ1NTX1RSQU5TX09SRyxcclxuICAgICAgICBDU1NfVFJBTlNGT1JNLFxyXG4gICAgICAgIENTU19VU0VSU0VMRUNUO1xyXG5cclxuICAgIGZ1bmN0aW9uIHZlbmRvclByZWZpeChwcm9wKSB7XHJcbiAgICAgICAgaWYgKHByb3AgaW4gZW1wdHlTdHlsZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHByb3A7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgY2FwUHJvcCA9IHByb3BbMF0udG9VcHBlckNhc2UoKSArIHByb3Auc2xpY2UoMSksXHJcbiAgICAgICAgICAgIGkgPSBjc3NQcmVmaXhlcy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICAgICAgcHJvcCA9IGNzc1ByZWZpeGVzW2ldICsgY2FwUHJvcDtcclxuICAgICAgICAgICAgaWYgKHByb3AgaW4gZW1wdHlTdHlsZXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9wO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIENTU19UUkFOU0ZPUk0gPSB2ZW5kb3JQcmVmaXgoJ3RyYW5zZm9ybScpO1xyXG4gICAgQ1NTX1RSQU5TX09SRyA9IHZlbmRvclByZWZpeCgndHJhbnNmb3JtT3JpZ2luJyk7XHJcbiAgICBDU1NfVVNFUlNFTEVDVCA9IHZlbmRvclByZWZpeCgndXNlclNlbGVjdCcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldEV4aWZPZmZzZXQob3JudCwgcm90YXRlKSB7XHJcbiAgICAgICAgdmFyIGFyciA9IEVYSUZfTk9STS5pbmRleE9mKG9ybnQpID4gLTEgPyBFWElGX05PUk0gOiBFWElGX0ZMSVAsXHJcbiAgICAgICAgICAgIGluZGV4ID0gYXJyLmluZGV4T2Yob3JudCksXHJcbiAgICAgICAgICAgIG9mZnNldCA9IChyb3RhdGUgLyA5MCkgJSBhcnIubGVuZ3RoOy8vIDE4MCA9IDIlNCA9IDIgc2hpZnQgZXhpZiBieSAyIGluZGV4ZXNcclxuXHJcbiAgICAgICAgcmV0dXJuIGFyclsoYXJyLmxlbmd0aCArIGluZGV4ICsgKG9mZnNldCAlIGFyci5sZW5ndGgpKSAlIGFyci5sZW5ndGhdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENyZWRpdHMgdG8gOiBBbmRyZXcgRHVwb250IC0gaHR0cDovL2FuZHJld2R1cG9udC5uZXQvMjAwOS8wOC8yOC9kZWVwLWV4dGVuZGluZy1vYmplY3RzLWluLWphdmFzY3JpcHQvXHJcbiAgICBmdW5jdGlvbiBkZWVwRXh0ZW5kKGRlc3RpbmF0aW9uLCBzb3VyY2UpIHtcclxuICAgICAgICBkZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uIHx8IHt9O1xyXG4gICAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIHNvdXJjZSkge1xyXG4gICAgICAgICAgICBpZiAoc291cmNlW3Byb3BlcnR5XSAmJiBzb3VyY2VbcHJvcGVydHldLmNvbnN0cnVjdG9yICYmIHNvdXJjZVtwcm9wZXJ0eV0uY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xyXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25bcHJvcGVydHldID0gZGVzdGluYXRpb25bcHJvcGVydHldIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgZGVlcEV4dGVuZChkZXN0aW5hdGlvbltwcm9wZXJ0eV0sIHNvdXJjZVtwcm9wZXJ0eV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25bcHJvcGVydHldID0gc291cmNlW3Byb3BlcnR5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGVzdGluYXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvbmUob2JqZWN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGRlZXBFeHRlbmQoe30sIG9iamVjdCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XHJcbiAgICAgICAgdmFyIHRpbWVvdXQ7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xyXG4gICAgICAgICAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aW1lb3V0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xyXG4gICAgICAgICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XHJcbiAgICAgICAgICAgIGlmIChjYWxsTm93KSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZGlzcGF0Y2hDaGFuZ2UoZWxlbWVudCkge1xyXG4gICAgICAgIGlmIChcImNyZWF0ZUV2ZW50XCIgaW4gZG9jdW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiSFRNTEV2ZW50c1wiKTtcclxuICAgICAgICAgICAgZXZ0LmluaXRFdmVudChcImNoYW5nZVwiLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChldnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZWxlbWVudC5maXJlRXZlbnQoXCJvbmNoYW5nZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9odHRwOi8vanNwZXJmLmNvbS92YW5pbGxhLWNzc1xyXG4gICAgZnVuY3Rpb24gY3NzKGVsLCBzdHlsZXMsIHZhbCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHN0eWxlcykgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHZhciB0bXAgPSBzdHlsZXM7XHJcbiAgICAgICAgICAgIHN0eWxlcyA9IHt9O1xyXG4gICAgICAgICAgICBzdHlsZXNbdG1wXSA9IHZhbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gc3R5bGVzKSB7XHJcbiAgICAgICAgICAgIGVsLnN0eWxlW3Byb3BdID0gc3R5bGVzW3Byb3BdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhZGRDbGFzcyhlbCwgYykge1xyXG4gICAgICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChjKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSArPSAnICcgKyBjO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVDbGFzcyhlbCwgYykge1xyXG4gICAgICAgIGlmIChlbC5jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKGMsICcnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0QXR0cmlidXRlcyhlbCwgYXR0cnMpIHtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gYXR0cnMpIHtcclxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG51bSh2KSB7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHYsIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiBVdGlsaXRpZXMgKi9cclxuICAgIGZ1bmN0aW9uIGxvYWRJbWFnZShzcmMsIGRvRXhpZikge1xyXG4gICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWcuc3R5bGUub3BhY2l0eSA9IDA7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIF9yZXNvbHZlKCkge1xyXG4gICAgICAgICAgICAgICAgaW1nLnN0eWxlLm9wYWNpdHkgPSAxO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShpbWcpO1xyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGltZy5yZW1vdmVBdHRyaWJ1dGUoJ2Nyb3NzT3JpZ2luJyk7XHJcbiAgICAgICAgICAgIGlmIChzcmMubWF0Y2goL15odHRwcz86XFwvXFwvfF5cXC9cXC8vKSkge1xyXG4gICAgICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnY3Jvc3NPcmlnaW4nLCAnYW5vbnltb3VzJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9FeGlmKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRVhJRi5nZXREYXRhKGltZywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgX3Jlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaW1nLnNyYyA9IHNyYztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBuYXR1cmFsSW1hZ2VEaW1lbnNpb25zKGltZywgb3JudCkge1xyXG4gICAgICAgIHZhciB3ID0gaW1nLm5hdHVyYWxXaWR0aDtcclxuICAgICAgICB2YXIgaCA9IGltZy5uYXR1cmFsSGVpZ2h0O1xyXG4gICAgICAgIHZhciBvcmllbnQgPSBvcm50IHx8IGdldEV4aWZPcmllbnRhdGlvbihpbWcpO1xyXG4gICAgICAgIGlmIChvcmllbnQgJiYgb3JpZW50ID49IDUpIHtcclxuICAgICAgICAgICAgdmFyIHg9IHc7XHJcbiAgICAgICAgICAgIHcgPSBoO1xyXG4gICAgICAgICAgICBoID0geDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHsgd2lkdGg6IHcsIGhlaWdodDogaCB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qIENTUyBUcmFuc2Zvcm0gUHJvdG90eXBlICovXHJcbiAgICB2YXIgVFJBTlNMQVRFX09QVFMgPSB7XHJcbiAgICAgICAgJ3RyYW5zbGF0ZTNkJzoge1xyXG4gICAgICAgICAgICBzdWZmaXg6ICcsIDBweCdcclxuICAgICAgICB9LFxyXG4gICAgICAgICd0cmFuc2xhdGUnOiB7XHJcbiAgICAgICAgICAgIHN1ZmZpeDogJydcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdmFyIFRyYW5zZm9ybSA9IGZ1bmN0aW9uICh4LCB5LCBzY2FsZSkge1xyXG4gICAgICAgIHRoaXMueCA9IHBhcnNlRmxvYXQoeCk7XHJcbiAgICAgICAgdGhpcy55ID0gcGFyc2VGbG9hdCh5KTtcclxuICAgICAgICB0aGlzLnNjYWxlID0gcGFyc2VGbG9hdChzY2FsZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIFRyYW5zZm9ybS5wYXJzZSA9IGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgaWYgKHYuc3R5bGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRyYW5zZm9ybS5wYXJzZSh2LnN0eWxlW0NTU19UUkFOU0ZPUk1dKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodi5pbmRleE9mKCdtYXRyaXgnKSA+IC0xIHx8IHYuaW5kZXhPZignbm9uZScpID4gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRyYW5zZm9ybS5mcm9tTWF0cml4KHYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFRyYW5zZm9ybS5mcm9tU3RyaW5nKHYpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgVHJhbnNmb3JtLmZyb21NYXRyaXggPSBmdW5jdGlvbiAodikge1xyXG4gICAgICAgIHZhciB2YWxzID0gdi5zdWJzdHJpbmcoNykuc3BsaXQoJywnKTtcclxuICAgICAgICBpZiAoIXZhbHMubGVuZ3RoIHx8IHYgPT09ICdub25lJykge1xyXG4gICAgICAgICAgICB2YWxzID0gWzEsIDAsIDAsIDEsIDAsIDBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBUcmFuc2Zvcm0obnVtKHZhbHNbNF0pLCBudW0odmFsc1s1XSksIHBhcnNlRmxvYXQodmFsc1swXSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBUcmFuc2Zvcm0uZnJvbVN0cmluZyA9IGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgdmFyIHZhbHVlcyA9IHYuc3BsaXQoJykgJyksXHJcbiAgICAgICAgICAgIHRyYW5zbGF0ZSA9IHZhbHVlc1swXS5zdWJzdHJpbmcoQ3JvcHBpZS5nbG9iYWxzLnRyYW5zbGF0ZS5sZW5ndGggKyAxKS5zcGxpdCgnLCcpLFxyXG4gICAgICAgICAgICBzY2FsZSA9IHZhbHVlcy5sZW5ndGggPiAxID8gdmFsdWVzWzFdLnN1YnN0cmluZyg2KSA6IDEsXHJcbiAgICAgICAgICAgIHggPSB0cmFuc2xhdGUubGVuZ3RoID4gMSA/IHRyYW5zbGF0ZVswXSA6IDAsXHJcbiAgICAgICAgICAgIHkgPSB0cmFuc2xhdGUubGVuZ3RoID4gMSA/IHRyYW5zbGF0ZVsxXSA6IDA7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgVHJhbnNmb3JtKHgsIHksIHNjYWxlKTtcclxuICAgIH07XHJcblxyXG4gICAgVHJhbnNmb3JtLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc3VmZml4ID0gVFJBTlNMQVRFX09QVFNbQ3JvcHBpZS5nbG9iYWxzLnRyYW5zbGF0ZV0uc3VmZml4IHx8ICcnO1xyXG4gICAgICAgIHJldHVybiBDcm9wcGllLmdsb2JhbHMudHJhbnNsYXRlICsgJygnICsgdGhpcy54ICsgJ3B4LCAnICsgdGhpcy55ICsgJ3B4JyArIHN1ZmZpeCArICcpIHNjYWxlKCcgKyB0aGlzLnNjYWxlICsgJyknO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgVHJhbnNmb3JtT3JpZ2luID0gZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgaWYgKCFlbCB8fCAhZWwuc3R5bGVbQ1NTX1RSQU5TX09SR10pIHtcclxuICAgICAgICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgICAgICAgdGhpcy55ID0gMDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY3NzID0gZWwuc3R5bGVbQ1NTX1RSQU5TX09SR10uc3BsaXQoJyAnKTtcclxuICAgICAgICB0aGlzLnggPSBwYXJzZUZsb2F0KGNzc1swXSk7XHJcbiAgICAgICAgdGhpcy55ID0gcGFyc2VGbG9hdChjc3NbMV0pO1xyXG4gICAgfTtcclxuXHJcbiAgICBUcmFuc2Zvcm1PcmlnaW4ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnggKyAncHggJyArIHRoaXMueSArICdweCc7XHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldEV4aWZPcmllbnRhdGlvbiAoaW1nKSB7XHJcbiAgICAgICAgcmV0dXJuIGltZy5leGlmZGF0YSA/IGltZy5leGlmZGF0YS5PcmllbnRhdGlvbiA6IDE7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZHJhd0NhbnZhcyhjYW52YXMsIGltZywgb3JpZW50YXRpb24pIHtcclxuICAgICAgICB2YXIgd2lkdGggPSBpbWcud2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodCA9IGltZy5oZWlnaHQsXHJcbiAgICAgICAgICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuICAgICAgICBjYW52YXMud2lkdGggPSBpbWcud2lkdGg7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGltZy5oZWlnaHQ7XHJcblxyXG4gICAgICAgIGN0eC5zYXZlKCk7XHJcbiAgICAgICAgc3dpdGNoIChvcmllbnRhdGlvbikge1xyXG4gICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSh3aWR0aCwgMCk7XHJcbiAgICAgICAgICAgICBjdHguc2NhbGUoLTEsIDEpO1xyXG4gICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUod2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgY3R4LnJvdGF0ZSgxODAqTWF0aC5QSS8xODApO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICBjdHgudHJhbnNsYXRlKDAsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgY3R4LnNjYWxlKDEsIC0xKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSB3aWR0aDtcclxuICAgICAgICAgICAgICBjdHgucm90YXRlKDkwKk1hdGguUEkvMTgwKTtcclxuICAgICAgICAgICAgICBjdHguc2NhbGUoMSwgLTEpO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICBjYW52YXMud2lkdGggPSBoZWlnaHQ7XHJcbiAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IHdpZHRoO1xyXG4gICAgICAgICAgICAgIGN0eC5yb3RhdGUoOTAqTWF0aC5QSS8xODApO1xyXG4gICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoMCwgLWhlaWdodCk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IGhlaWdodDtcclxuICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gd2lkdGg7XHJcbiAgICAgICAgICAgICAgY3R4LnJvdGF0ZSgtOTAqTWF0aC5QSS8xODApO1xyXG4gICAgICAgICAgICAgIGN0eC50cmFuc2xhdGUoLXdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgIGN0eC5zY2FsZSgxLCAtMSk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IGhlaWdodDtcclxuICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gd2lkdGg7XHJcbiAgICAgICAgICAgICAgY3R4LnRyYW5zbGF0ZSgwLCB3aWR0aCk7XHJcbiAgICAgICAgICAgICAgY3R4LnJvdGF0ZSgtOTAqTWF0aC5QSS8xODApO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICBjdHgucmVzdG9yZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qIFByaXZhdGUgTWV0aG9kcyAqL1xyXG4gICAgZnVuY3Rpb24gX2NyZWF0ZSgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgIGNvbnRDbGFzcyA9ICdjcm9wcGllLWNvbnRhaW5lcicsXHJcbiAgICAgICAgICAgIGN1c3RvbVZpZXdwb3J0Q2xhc3MgPSBzZWxmLm9wdGlvbnMudmlld3BvcnQudHlwZSA/ICdjci12cC0nICsgc2VsZi5vcHRpb25zLnZpZXdwb3J0LnR5cGUgOiBudWxsLFxyXG4gICAgICAgICAgICBib3VuZGFyeSwgaW1nLCB2aWV3cG9ydCwgb3ZlcmxheSwgYncsIGJoO1xyXG5cclxuICAgICAgICBzZWxmLm9wdGlvbnMudXNlQ2FudmFzID0gc2VsZi5vcHRpb25zLmVuYWJsZU9yaWVudGF0aW9uIHx8IF9oYXNFeGlmLmNhbGwoc2VsZik7XHJcbiAgICAgICAgLy8gUHJvcGVydGllcyBvbiBjbGFzc1xyXG4gICAgICAgIHNlbGYuZGF0YSA9IHt9O1xyXG4gICAgICAgIHNlbGYuZWxlbWVudHMgPSB7fTtcclxuXHJcbiAgICAgICAgYm91bmRhcnkgPSBzZWxmLmVsZW1lbnRzLmJvdW5kYXJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdmlld3BvcnQgPSBzZWxmLmVsZW1lbnRzLnZpZXdwb3J0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgaW1nID0gc2VsZi5lbGVtZW50cy5pbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICBvdmVybGF5ID0gc2VsZi5lbGVtZW50cy5vdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgICAgIGlmIChzZWxmLm9wdGlvbnMudXNlQ2FudmFzKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZWxlbWVudHMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgICAgIHNlbGYuZWxlbWVudHMucHJldmlldyA9IHNlbGYuZWxlbWVudHMuY2FudmFzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZi5lbGVtZW50cy5wcmV2aWV3ID0gc2VsZi5lbGVtZW50cy5pbWc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhZGRDbGFzcyhib3VuZGFyeSwgJ2NyLWJvdW5kYXJ5Jyk7XHJcbiAgICAgICAgYm91bmRhcnkuc2V0QXR0cmlidXRlKCdhcmlhLWRyb3BlZmZlY3QnLCAnbm9uZScpO1xyXG4gICAgICAgIGJ3ID0gc2VsZi5vcHRpb25zLmJvdW5kYXJ5LndpZHRoO1xyXG4gICAgICAgIGJoID0gc2VsZi5vcHRpb25zLmJvdW5kYXJ5LmhlaWdodDtcclxuICAgICAgICBjc3MoYm91bmRhcnksIHtcclxuICAgICAgICAgICAgd2lkdGg6IChidyArIChpc05hTihidykgPyAnJyA6ICdweCcpKSxcclxuICAgICAgICAgICAgaGVpZ2h0OiAoYmggKyAoaXNOYU4oYmgpID8gJycgOiAncHgnKSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgYWRkQ2xhc3Modmlld3BvcnQsICdjci12aWV3cG9ydCcpO1xyXG4gICAgICAgIGlmIChjdXN0b21WaWV3cG9ydENsYXNzKSB7XHJcbiAgICAgICAgICAgIGFkZENsYXNzKHZpZXdwb3J0LCBjdXN0b21WaWV3cG9ydENsYXNzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3NzKHZpZXdwb3J0LCB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBzZWxmLm9wdGlvbnMudmlld3BvcnQud2lkdGggKyAncHgnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHNlbGYub3B0aW9ucy52aWV3cG9ydC5oZWlnaHQgKyAncHgnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmlld3BvcnQuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIDApO1xyXG5cclxuICAgICAgICBhZGRDbGFzcyhzZWxmLmVsZW1lbnRzLnByZXZpZXcsICdjci1pbWFnZScpO1xyXG4gICAgICAgIHNldEF0dHJpYnV0ZXMoc2VsZi5lbGVtZW50cy5wcmV2aWV3LCB7ICdhbHQnOiAncHJldmlldycsICdhcmlhLWdyYWJiZWQnOiAnZmFsc2UnIH0pO1xyXG4gICAgICAgIGFkZENsYXNzKG92ZXJsYXksICdjci1vdmVybGF5Jyk7XHJcblxyXG4gICAgICAgIHNlbGYuZWxlbWVudC5hcHBlbmRDaGlsZChib3VuZGFyeSk7XHJcbiAgICAgICAgYm91bmRhcnkuYXBwZW5kQ2hpbGQoc2VsZi5lbGVtZW50cy5wcmV2aWV3KTtcclxuICAgICAgICBib3VuZGFyeS5hcHBlbmRDaGlsZCh2aWV3cG9ydCk7XHJcbiAgICAgICAgYm91bmRhcnkuYXBwZW5kQ2hpbGQob3ZlcmxheSk7XHJcblxyXG4gICAgICAgIGFkZENsYXNzKHNlbGYuZWxlbWVudCwgY29udENsYXNzKTtcclxuICAgICAgICBpZiAoc2VsZi5vcHRpb25zLmN1c3RvbUNsYXNzKSB7XHJcbiAgICAgICAgICAgIGFkZENsYXNzKHNlbGYuZWxlbWVudCwgc2VsZi5vcHRpb25zLmN1c3RvbUNsYXNzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9pbml0RHJhZ2dhYmxlLmNhbGwodGhpcyk7XHJcblxyXG4gICAgICAgIGlmIChzZWxmLm9wdGlvbnMuZW5hYmxlWm9vbSkge1xyXG4gICAgICAgICAgICBfaW5pdGlhbGl6ZVpvb20uY2FsbChzZWxmKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGlmIChzZWxmLm9wdGlvbnMuZW5hYmxlT3JpZW50YXRpb24pIHtcclxuICAgICAgICAvLyAgICAgX2luaXRSb3RhdGlvbkNvbnRyb2xzLmNhbGwoc2VsZik7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBpZiAoc2VsZi5vcHRpb25zLmVuYWJsZVJlc2l6ZSkge1xyXG4gICAgICAgICAgICBfaW5pdGlhbGl6ZVJlc2l6ZS5jYWxsKHNlbGYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBmdW5jdGlvbiBfaW5pdFJvdGF0aW9uQ29udHJvbHMgKCkge1xyXG4gICAgLy8gICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgIC8vICAgICAgICAgd3JhcCwgYnRuTGVmdCwgYnRuUmlnaHQsIGlMZWZ0LCBpUmlnaHQ7XHJcblxyXG4gICAgLy8gICAgIHdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIC8vICAgICBzZWxmLmVsZW1lbnRzLm9yaWVudGF0aW9uQnRuTGVmdCA9IGJ0bkxlZnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIC8vICAgICBzZWxmLmVsZW1lbnRzLm9yaWVudGF0aW9uQnRuUmlnaHQgPSBidG5SaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cclxuICAgIC8vICAgICB3cmFwLmFwcGVuZENoaWxkKGJ0bkxlZnQpO1xyXG4gICAgLy8gICAgIHdyYXAuYXBwZW5kQ2hpbGQoYnRuUmlnaHQpO1xyXG5cclxuICAgIC8vICAgICBpTGVmdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2knKTtcclxuICAgIC8vICAgICBpUmlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpJyk7XHJcbiAgICAvLyAgICAgYnRuTGVmdC5hcHBlbmRDaGlsZChpTGVmdCk7XHJcbiAgICAvLyAgICAgYnRuUmlnaHQuYXBwZW5kQ2hpbGQoaVJpZ2h0KTtcclxuXHJcbiAgICAvLyAgICAgYWRkQ2xhc3Mod3JhcCwgJ2NyLXJvdGF0ZS1jb250cm9scycpO1xyXG4gICAgLy8gICAgIGFkZENsYXNzKGJ0bkxlZnQsICdjci1yb3RhdGUtbCcpO1xyXG4gICAgLy8gICAgIGFkZENsYXNzKGJ0blJpZ2h0LCAnY3Itcm90YXRlLXInKTtcclxuXHJcbiAgICAvLyAgICAgc2VsZi5lbGVtZW50cy5ib3VuZGFyeS5hcHBlbmRDaGlsZCh3cmFwKTtcclxuXHJcbiAgICAvLyAgICAgYnRuTGVmdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICAgICAgc2VsZi5yb3RhdGUoLTkwKTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vICAgICBidG5SaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICAgICAgc2VsZi5yb3RhdGUoOTApO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIGZ1bmN0aW9uIF9oYXNFeGlmKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMuZW5hYmxlRXhpZiAmJiB3aW5kb3cuRVhJRjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfaW5pdGlhbGl6ZVJlc2l6ZSAoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciB3cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgdmFyIGlzRHJhZ2dpbmcgPSBmYWxzZTtcclxuICAgICAgICB2YXIgZGlyZWN0aW9uO1xyXG4gICAgICAgIHZhciBvcmlnaW5hbFg7XHJcbiAgICAgICAgdmFyIG9yaWdpbmFsWTtcclxuICAgICAgICB2YXIgbWluU2l6ZSA9IDUwO1xyXG4gICAgICAgIHZhciBtYXhXaWR0aDtcclxuICAgICAgICB2YXIgbWF4SGVpZ2h0O1xyXG4gICAgICAgIHZhciB2cjtcclxuICAgICAgICB2YXIgaHI7XHJcblxyXG4gICAgICAgIGFkZENsYXNzKHdyYXAsICdjci1yZXNpemVyJyk7XHJcbiAgICAgICAgY3NzKHdyYXAsIHtcclxuICAgICAgICAgICAgd2lkdGg6IHRoaXMub3B0aW9ucy52aWV3cG9ydC53aWR0aCArICdweCcsXHJcbiAgICAgICAgICAgIGhlaWdodDogdGhpcy5vcHRpb25zLnZpZXdwb3J0LmhlaWdodCArICdweCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yZXNpemVDb250cm9scy5oZWlnaHQpIHtcclxuICAgICAgICAgICAgdnIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgYWRkQ2xhc3ModnIsICdjci1yZXNpemVyLXZlcnRpY2FsJyk7XHJcbiAgICAgICAgICAgIHdyYXAuYXBwZW5kQ2hpbGQodnIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5yZXNpemVDb250cm9scy53aWR0aCkge1xyXG4gICAgICAgICAgICBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBhZGRDbGFzcyhociwgJ2NyLXJlc2l6ZXItaG9yaXNvbnRhbCcpO1xyXG4gICAgICAgICAgICB3cmFwLmFwcGVuZENoaWxkKGhyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlRG93bihldikge1xyXG4gICAgICAgICAgICBpZiAoZXYuYnV0dG9uICE9PSB1bmRlZmluZWQgJiYgZXYuYnV0dG9uICE9PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBpZiAoaXNEcmFnZ2luZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgb3ZlcmxheVJlY3QgPSBzZWxmLmVsZW1lbnRzLm92ZXJsYXkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgICAgICBpc0RyYWdnaW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgb3JpZ2luYWxYID0gZXYucGFnZVg7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsWSA9IGV2LnBhZ2VZO1xyXG4gICAgICAgICAgICBkaXJlY3Rpb24gPSBldi5jdXJyZW50VGFyZ2V0LmNsYXNzTmFtZS5pbmRleE9mKCd2ZXJ0aWNhbCcpICE9PSAtMSA/ICd2JyA6ICdoJztcclxuICAgICAgICAgICAgbWF4V2lkdGggPSBvdmVybGF5UmVjdC53aWR0aDtcclxuICAgICAgICAgICAgbWF4SGVpZ2h0ID0gb3ZlcmxheVJlY3QuaGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgaWYgKGV2LnRvdWNoZXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0b3VjaGVzID0gZXYudG91Y2hlc1swXTtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsWCA9IHRvdWNoZXMucGFnZVg7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFkgPSB0b3VjaGVzLnBhZ2VZO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlKTtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG1vdXNlTW92ZSk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG1vdXNlVXApO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlW0NTU19VU0VSU0VMRUNUXSA9ICdub25lJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlTW92ZShldikge1xyXG4gICAgICAgICAgICB2YXIgcGFnZVggPSBldi5wYWdlWDtcclxuICAgICAgICAgICAgdmFyIHBhZ2VZID0gZXYucGFnZVk7XHJcblxyXG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGV2LnRvdWNoZXMpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0b3VjaGVzID0gZXYudG91Y2hlc1swXTtcclxuICAgICAgICAgICAgICAgIHBhZ2VYID0gdG91Y2hlcy5wYWdlWDtcclxuICAgICAgICAgICAgICAgIHBhZ2VZID0gdG91Y2hlcy5wYWdlWTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGRlbHRhWCA9IHBhZ2VYIC0gb3JpZ2luYWxYO1xyXG4gICAgICAgICAgICB2YXIgZGVsdGFZID0gcGFnZVkgLSBvcmlnaW5hbFk7XHJcbiAgICAgICAgICAgIHZhciBuZXdIZWlnaHQgPSBzZWxmLm9wdGlvbnMudmlld3BvcnQuaGVpZ2h0ICsgZGVsdGFZO1xyXG4gICAgICAgICAgICB2YXIgbmV3V2lkdGggPSBzZWxmLm9wdGlvbnMudmlld3BvcnQud2lkdGggKyBkZWx0YVg7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAndicgJiYgbmV3SGVpZ2h0ID49IG1pblNpemUgJiYgbmV3SGVpZ2h0IDw9IG1heEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgY3NzKHdyYXAsIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IG5ld0hlaWdodCArICdweCdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHNlbGYub3B0aW9ucy5ib3VuZGFyeS5oZWlnaHQgKz0gZGVsdGFZO1xyXG4gICAgICAgICAgICAgICAgY3NzKHNlbGYuZWxlbWVudHMuYm91bmRhcnksIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHNlbGYub3B0aW9ucy5ib3VuZGFyeS5oZWlnaHQgKyAncHgnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMudmlld3BvcnQuaGVpZ2h0ICs9IGRlbHRhWTtcclxuICAgICAgICAgICAgICAgIGNzcyhzZWxmLmVsZW1lbnRzLnZpZXdwb3J0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBzZWxmLm9wdGlvbnMudmlld3BvcnQuaGVpZ2h0ICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnaCcgJiYgbmV3V2lkdGggPj0gbWluU2l6ZSAmJiBuZXdXaWR0aCA8PSBtYXhXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgY3NzKHdyYXAsIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogbmV3V2lkdGggKyAncHgnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLm9wdGlvbnMuYm91bmRhcnkud2lkdGggKz0gZGVsdGFYO1xyXG4gICAgICAgICAgICAgICAgY3NzKHNlbGYuZWxlbWVudHMuYm91bmRhcnksIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogc2VsZi5vcHRpb25zLmJvdW5kYXJ5LndpZHRoICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2VsZi5vcHRpb25zLnZpZXdwb3J0LndpZHRoICs9IGRlbHRhWDtcclxuICAgICAgICAgICAgICAgIGNzcyhzZWxmLmVsZW1lbnRzLnZpZXdwb3J0LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHNlbGYub3B0aW9ucy52aWV3cG9ydC53aWR0aCArICdweCdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfdXBkYXRlT3ZlcmxheS5jYWxsKHNlbGYpO1xyXG4gICAgICAgICAgICBfdXBkYXRlWm9vbUxpbWl0cy5jYWxsKHNlbGYpO1xyXG4gICAgICAgICAgICBfdXBkYXRlQ2VudGVyUG9pbnQuY2FsbChzZWxmKTtcclxuICAgICAgICAgICAgX3RyaWdnZXJVcGRhdGUuY2FsbChzZWxmKTtcclxuICAgICAgICAgICAgb3JpZ2luYWxZID0gcGFnZVk7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsWCA9IHBhZ2VYO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbW91c2VVcCgpIHtcclxuICAgICAgICAgICAgaXNEcmFnZ2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlKTtcclxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG1vdXNlTW92ZSk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG1vdXNlVXApO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlW0NTU19VU0VSU0VMRUNUXSA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHZyKSB7XHJcbiAgICAgICAgICAgIHZyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG1vdXNlRG93bik7XHJcbiAgICAgICAgICAgIHZyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBtb3VzZURvd24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhyKSB7XHJcbiAgICAgICAgICAgIGhyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG1vdXNlRG93bik7XHJcbiAgICAgICAgICAgIGhyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBtb3VzZURvd24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy5ib3VuZGFyeS5hcHBlbmRDaGlsZCh3cmFwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfc2V0Wm9vbWVyVmFsKHYpIHtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmVuYWJsZVpvb20pIHtcclxuICAgICAgICAgICAgdmFyIHogPSB0aGlzLmVsZW1lbnRzLnpvb21lcixcclxuICAgICAgICAgICAgICAgIHZhbCA9IGZpeCh2LCA0KTtcclxuXHJcbiAgICAgICAgICAgIHoudmFsdWUgPSBNYXRoLm1heCh6Lm1pbiwgTWF0aC5taW4oei5tYXgsIHZhbCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfaW5pdGlhbGl6ZVpvb20oKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICB3cmFwID0gc2VsZi5lbGVtZW50cy56b29tZXJXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcbiAgICAgICAgICAgIHpvb21lciA9IHNlbGYuZWxlbWVudHMuem9vbWVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuXHJcbiAgICAgICAgYWRkQ2xhc3Mod3JhcCwgJ2NyLXNsaWRlci13cmFwJyk7XHJcbiAgICAgICAgYWRkQ2xhc3Moem9vbWVyLCAnY3Itc2xpZGVyJyk7XHJcbiAgICAgICAgem9vbWVyLnR5cGUgPSAncmFuZ2UnO1xyXG4gICAgICAgIHpvb21lci5zdGVwID0gJzAuMDAwMSc7XHJcbiAgICAgICAgem9vbWVyLnZhbHVlID0gMTtcclxuICAgICAgICB6b29tZXIuc3R5bGUuZGlzcGxheSA9IHNlbGYub3B0aW9ucy5zaG93Wm9vbWVyID8gJycgOiAnbm9uZSc7XHJcbiAgICAgICAgem9vbWVyLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsICd6b29tJyk7XHJcblxyXG4gICAgICAgIHNlbGYuZWxlbWVudC5hcHBlbmRDaGlsZCh3cmFwKTtcclxuICAgICAgICB3cmFwLmFwcGVuZENoaWxkKHpvb21lcik7XHJcblxyXG4gICAgICAgIHNlbGYuX2N1cnJlbnRab29tID0gMTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlKCkge1xyXG4gICAgICAgICAgICBfb25ab29tLmNhbGwoc2VsZiwge1xyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHBhcnNlRmxvYXQoem9vbWVyLnZhbHVlKSxcclxuICAgICAgICAgICAgICAgIG9yaWdpbjogbmV3IFRyYW5zZm9ybU9yaWdpbihzZWxmLmVsZW1lbnRzLnByZXZpZXcpLFxyXG4gICAgICAgICAgICAgICAgdmlld3BvcnRSZWN0OiBzZWxmLmVsZW1lbnRzLnZpZXdwb3J0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBUcmFuc2Zvcm0ucGFyc2Uoc2VsZi5lbGVtZW50cy5wcmV2aWV3KVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNjcm9sbChldikge1xyXG4gICAgICAgICAgICB2YXIgZGVsdGEsIHRhcmdldFpvb207XHJcblxyXG4gICAgICAgICAgICBpZihzZWxmLm9wdGlvbnMubW91c2VXaGVlbFpvb20gPT09ICdjdHJsJyAmJiBldi5jdHJsS2V5ICE9PSB0cnVlKXtcclxuICAgICAgICAgICAgICByZXR1cm4gMDsgXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXYud2hlZWxEZWx0YSkge1xyXG4gICAgICAgICAgICAgICAgZGVsdGEgPSBldi53aGVlbERlbHRhIC8gMTIwMDsgLy93aGVlbERlbHRhIG1pbjogLTEyMCBtYXg6IDEyMCAvLyBtYXggeCAxMCB4IDJcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChldi5kZWx0YVkpIHtcclxuICAgICAgICAgICAgICAgIGRlbHRhID0gZXYuZGVsdGFZIC8gMTA2MDsgLy9kZWx0YVkgbWluOiAtNTMgbWF4OiA1MyAvLyBtYXggeCAxMCB4IDJcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChldi5kZXRhaWwpIHtcclxuICAgICAgICAgICAgICAgIGRlbHRhID0gZXYuZGV0YWlsIC8gLTYwOyAvL2RlbHRhIG1pbjogLTMgbWF4OiAzIC8vIG1heCB4IDEwIHggMlxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGVsdGEgPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0YXJnZXRab29tID0gc2VsZi5fY3VycmVudFpvb20gKyAoZGVsdGEgKiBzZWxmLl9jdXJyZW50Wm9vbSk7XHJcblxyXG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBfc2V0Wm9vbWVyVmFsLmNhbGwoc2VsZiwgdGFyZ2V0Wm9vbSk7XHJcbiAgICAgICAgICAgIGNoYW5nZS5jYWxsKHNlbGYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5lbGVtZW50cy56b29tZXIuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjaGFuZ2UpOy8vIHRoaXMgaXMgYmVpbmcgZmlyZWQgdHdpY2Ugb24ga2V5cHJlc3NcclxuICAgICAgICBzZWxmLmVsZW1lbnRzLnpvb21lci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBjaGFuZ2UpO1xyXG5cclxuICAgICAgICBpZiAoc2VsZi5vcHRpb25zLm1vdXNlV2hlZWxab29tKSB7XHJcbiAgICAgICAgICAgIHNlbGYuZWxlbWVudHMuYm91bmRhcnkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIHNjcm9sbCk7XHJcbiAgICAgICAgICAgIHNlbGYuZWxlbWVudHMuYm91bmRhcnkuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBzY3JvbGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfb25ab29tKHVpKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSB1aSA/IHVpLnRyYW5zZm9ybSA6IFRyYW5zZm9ybS5wYXJzZShzZWxmLmVsZW1lbnRzLnByZXZpZXcpLFxyXG4gICAgICAgICAgICB2cFJlY3QgPSB1aSA/IHVpLnZpZXdwb3J0UmVjdCA6IHNlbGYuZWxlbWVudHMudmlld3BvcnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgICAgIG9yaWdpbiA9IHVpID8gdWkub3JpZ2luIDogbmV3IFRyYW5zZm9ybU9yaWdpbihzZWxmLmVsZW1lbnRzLnByZXZpZXcpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhcHBseUNzcygpIHtcclxuICAgICAgICAgICAgdmFyIHRyYW5zQ3NzID0ge307XHJcbiAgICAgICAgICAgIHRyYW5zQ3NzW0NTU19UUkFOU0ZPUk1dID0gdHJhbnNmb3JtLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHRyYW5zQ3NzW0NTU19UUkFOU19PUkddID0gb3JpZ2luLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGNzcyhzZWxmLmVsZW1lbnRzLnByZXZpZXcsIHRyYW5zQ3NzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYuX2N1cnJlbnRab29tID0gdWkgPyB1aS52YWx1ZSA6IHNlbGYuX2N1cnJlbnRab29tO1xyXG4gICAgICAgIHRyYW5zZm9ybS5zY2FsZSA9IHNlbGYuX2N1cnJlbnRab29tO1xyXG4gICAgICAgIHNlbGYuZWxlbWVudHMuem9vbWVyLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW5vdycsIHNlbGYuX2N1cnJlbnRab29tKTtcclxuICAgICAgICBhcHBseUNzcygpO1xyXG5cclxuICAgICAgICBpZiAoc2VsZi5vcHRpb25zLmVuZm9yY2VCb3VuZGFyeSkge1xyXG4gICAgICAgICAgICB2YXIgYm91bmRhcmllcyA9IF9nZXRWaXJ0dWFsQm91bmRhcmllcy5jYWxsKHNlbGYsIHZwUmVjdCksXHJcbiAgICAgICAgICAgICAgICB0cmFuc0JvdW5kYXJpZXMgPSBib3VuZGFyaWVzLnRyYW5zbGF0ZSxcclxuICAgICAgICAgICAgICAgIG9Cb3VuZGFyaWVzID0gYm91bmRhcmllcy5vcmlnaW47XHJcblxyXG4gICAgICAgICAgICBpZiAodHJhbnNmb3JtLnggPj0gdHJhbnNCb3VuZGFyaWVzLm1heFgpIHtcclxuICAgICAgICAgICAgICAgIG9yaWdpbi54ID0gb0JvdW5kYXJpZXMubWluWDtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybS54ID0gdHJhbnNCb3VuZGFyaWVzLm1heFg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICh0cmFuc2Zvcm0ueCA8PSB0cmFuc0JvdW5kYXJpZXMubWluWCkge1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luLnggPSBvQm91bmRhcmllcy5tYXhYO1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtLnggPSB0cmFuc0JvdW5kYXJpZXMubWluWDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHRyYW5zZm9ybS55ID49IHRyYW5zQm91bmRhcmllcy5tYXhZKSB7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW4ueSA9IG9Cb3VuZGFyaWVzLm1pblk7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm0ueSA9IHRyYW5zQm91bmRhcmllcy5tYXhZO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodHJhbnNmb3JtLnkgPD0gdHJhbnNCb3VuZGFyaWVzLm1pblkpIHtcclxuICAgICAgICAgICAgICAgIG9yaWdpbi55ID0gb0JvdW5kYXJpZXMubWF4WTtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybS55ID0gdHJhbnNCb3VuZGFyaWVzLm1pblk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgYXBwbHlDc3MoKTtcclxuICAgICAgICBfZGVib3VuY2VkT3ZlcmxheS5jYWxsKHNlbGYpO1xyXG4gICAgICAgIF90cmlnZ2VyVXBkYXRlLmNhbGwoc2VsZik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gX2dldFZpcnR1YWxCb3VuZGFyaWVzKHZpZXdwb3J0KSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICBzY2FsZSA9IHNlbGYuX2N1cnJlbnRab29tLFxyXG4gICAgICAgICAgICB2cFdpZHRoID0gdmlld3BvcnQud2lkdGgsXHJcbiAgICAgICAgICAgIHZwSGVpZ2h0ID0gdmlld3BvcnQuaGVpZ2h0LFxyXG4gICAgICAgICAgICBjZW50ZXJGcm9tQm91bmRhcnlYID0gc2VsZi5lbGVtZW50cy5ib3VuZGFyeS5jbGllbnRXaWR0aCAvIDIsXHJcbiAgICAgICAgICAgIGNlbnRlckZyb21Cb3VuZGFyeVkgPSBzZWxmLmVsZW1lbnRzLmJvdW5kYXJ5LmNsaWVudEhlaWdodCAvIDIsXHJcbiAgICAgICAgICAgIGltZ1JlY3QgPSBzZWxmLmVsZW1lbnRzLnByZXZpZXcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgICAgIGN1ckltZ1dpZHRoID0gaW1nUmVjdC53aWR0aCxcclxuICAgICAgICAgICAgY3VySW1nSGVpZ2h0ID0gaW1nUmVjdC5oZWlnaHQsXHJcbiAgICAgICAgICAgIGhhbGZXaWR0aCA9IHZwV2lkdGggLyAyLFxyXG4gICAgICAgICAgICBoYWxmSGVpZ2h0ID0gdnBIZWlnaHQgLyAyO1xyXG5cclxuICAgICAgICB2YXIgbWF4WCA9ICgoaGFsZldpZHRoIC8gc2NhbGUpIC0gY2VudGVyRnJvbUJvdW5kYXJ5WCkgKiAtMTtcclxuICAgICAgICB2YXIgbWluWCA9IG1heFggLSAoKGN1ckltZ1dpZHRoICogKDEgLyBzY2FsZSkpIC0gKHZwV2lkdGggKiAoMSAvIHNjYWxlKSkpO1xyXG5cclxuICAgICAgICB2YXIgbWF4WSA9ICgoaGFsZkhlaWdodCAvIHNjYWxlKSAtIGNlbnRlckZyb21Cb3VuZGFyeVkpICogLTE7XHJcbiAgICAgICAgdmFyIG1pblkgPSBtYXhZIC0gKChjdXJJbWdIZWlnaHQgKiAoMSAvIHNjYWxlKSkgLSAodnBIZWlnaHQgKiAoMSAvIHNjYWxlKSkpO1xyXG5cclxuICAgICAgICB2YXIgb3JpZ2luTWluWCA9ICgxIC8gc2NhbGUpICogaGFsZldpZHRoO1xyXG4gICAgICAgIHZhciBvcmlnaW5NYXhYID0gKGN1ckltZ1dpZHRoICogKDEgLyBzY2FsZSkpIC0gb3JpZ2luTWluWDtcclxuXHJcbiAgICAgICAgdmFyIG9yaWdpbk1pblkgPSAoMSAvIHNjYWxlKSAqIGhhbGZIZWlnaHQ7XHJcbiAgICAgICAgdmFyIG9yaWdpbk1heFkgPSAoY3VySW1nSGVpZ2h0ICogKDEgLyBzY2FsZSkpIC0gb3JpZ2luTWluWTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdHJhbnNsYXRlOiB7XHJcbiAgICAgICAgICAgICAgICBtYXhYOiBtYXhYLFxyXG4gICAgICAgICAgICAgICAgbWluWDogbWluWCxcclxuICAgICAgICAgICAgICAgIG1heFk6IG1heFksXHJcbiAgICAgICAgICAgICAgICBtaW5ZOiBtaW5ZXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9yaWdpbjoge1xyXG4gICAgICAgICAgICAgICAgbWF4WDogb3JpZ2luTWF4WCxcclxuICAgICAgICAgICAgICAgIG1pblg6IG9yaWdpbk1pblgsXHJcbiAgICAgICAgICAgICAgICBtYXhZOiBvcmlnaW5NYXhZLFxyXG4gICAgICAgICAgICAgICAgbWluWTogb3JpZ2luTWluWVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfdXBkYXRlQ2VudGVyUG9pbnQoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICBzY2FsZSA9IHNlbGYuX2N1cnJlbnRab29tLFxyXG4gICAgICAgICAgICBkYXRhID0gc2VsZi5lbGVtZW50cy5wcmV2aWV3LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgICAgICB2cERhdGEgPSBzZWxmLmVsZW1lbnRzLnZpZXdwb3J0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSBUcmFuc2Zvcm0ucGFyc2Uoc2VsZi5lbGVtZW50cy5wcmV2aWV3LnN0eWxlW0NTU19UUkFOU0ZPUk1dKSxcclxuICAgICAgICAgICAgcGMgPSBuZXcgVHJhbnNmb3JtT3JpZ2luKHNlbGYuZWxlbWVudHMucHJldmlldyksXHJcbiAgICAgICAgICAgIHRvcCA9ICh2cERhdGEudG9wIC0gZGF0YS50b3ApICsgKHZwRGF0YS5oZWlnaHQgLyAyKSxcclxuICAgICAgICAgICAgbGVmdCA9ICh2cERhdGEubGVmdCAtIGRhdGEubGVmdCkgKyAodnBEYXRhLndpZHRoIC8gMiksXHJcbiAgICAgICAgICAgIGNlbnRlciA9IHt9LFxyXG4gICAgICAgICAgICBhZGogPSB7fTtcclxuXHJcbiAgICAgICAgY2VudGVyLnkgPSB0b3AgLyBzY2FsZTtcclxuICAgICAgICBjZW50ZXIueCA9IGxlZnQgLyBzY2FsZTtcclxuXHJcbiAgICAgICAgYWRqLnkgPSAoY2VudGVyLnkgLSBwYy55KSAqICgxIC0gc2NhbGUpO1xyXG4gICAgICAgIGFkai54ID0gKGNlbnRlci54IC0gcGMueCkgKiAoMSAtIHNjYWxlKTtcclxuXHJcbiAgICAgICAgdHJhbnNmb3JtLnggLT0gYWRqLng7XHJcbiAgICAgICAgdHJhbnNmb3JtLnkgLT0gYWRqLnk7XHJcblxyXG4gICAgICAgIHZhciBuZXdDc3MgPSB7fTtcclxuICAgICAgICBuZXdDc3NbQ1NTX1RSQU5TX09SR10gPSBjZW50ZXIueCArICdweCAnICsgY2VudGVyLnkgKyAncHgnO1xyXG4gICAgICAgIG5ld0Nzc1tDU1NfVFJBTlNGT1JNXSA9IHRyYW5zZm9ybS50b1N0cmluZygpO1xyXG4gICAgICAgIGNzcyhzZWxmLmVsZW1lbnRzLnByZXZpZXcsIG5ld0Nzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gX2luaXREcmFnZ2FibGUoKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICBpc0RyYWdnaW5nID0gZmFsc2UsXHJcbiAgICAgICAgICAgIG9yaWdpbmFsWCxcclxuICAgICAgICAgICAgb3JpZ2luYWxZLFxyXG4gICAgICAgICAgICBvcmlnaW5hbERpc3RhbmNlLFxyXG4gICAgICAgICAgICB2cFJlY3QsXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYXNzaWduVHJhbnNmb3JtQ29vcmRpbmF0ZXMoZGVsdGFYLCBkZWx0YVkpIHtcclxuICAgICAgICAgICAgdmFyIGltZ1JlY3QgPSBzZWxmLmVsZW1lbnRzLnByZXZpZXcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgICAgICAgICB0b3AgPSB0cmFuc2Zvcm0ueSArIGRlbHRhWSxcclxuICAgICAgICAgICAgICAgIGxlZnQgPSB0cmFuc2Zvcm0ueCArIGRlbHRhWDtcclxuXHJcbiAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnMuZW5mb3JjZUJvdW5kYXJ5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodnBSZWN0LnRvcCA+IGltZ1JlY3QudG9wICsgZGVsdGFZICYmIHZwUmVjdC5ib3R0b20gPCBpbWdSZWN0LmJvdHRvbSArIGRlbHRhWSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS55ID0gdG9wO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh2cFJlY3QubGVmdCA+IGltZ1JlY3QubGVmdCArIGRlbHRhWCAmJiB2cFJlY3QucmlnaHQgPCBpbWdSZWN0LnJpZ2h0ICsgZGVsdGFYKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnggPSBsZWZ0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtLnkgPSB0b3A7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm0ueCA9IGxlZnQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZUdyYWJTdGF0ZShpc0RyYWdnaW5nKSB7XHJcbiAgICAgICAgICBzZWxmLmVsZW1lbnRzLnByZXZpZXcuc2V0QXR0cmlidXRlKCdhcmlhLWdyYWJiZWQnLCBpc0RyYWdnaW5nKTtcclxuICAgICAgICAgIHNlbGYuZWxlbWVudHMuYm91bmRhcnkuc2V0QXR0cmlidXRlKCdhcmlhLWRyb3BlZmZlY3QnLCBpc0RyYWdnaW5nPyAnbW92ZSc6ICdub25lJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBrZXlEb3duKGV2KSB7XHJcbiAgICAgICAgICAgIHZhciBMRUZUX0FSUk9XICA9IDM3LFxyXG4gICAgICAgICAgICAgICAgVVBfQVJST1cgICAgPSAzOCxcclxuICAgICAgICAgICAgICAgIFJJR0hUX0FSUk9XID0gMzksXHJcbiAgICAgICAgICAgICAgICBET1dOX0FSUk9XICA9IDQwO1xyXG5cclxuICAgICAgICAgICAgaWYgKGV2LnNoaWZ0S2V5ICYmIChldi5rZXlDb2RlID09PSBVUF9BUlJPVyB8fCBldi5rZXlDb2RlID09PSBET1dOX0FSUk9XKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHpvb20gPSAwLjA7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXYua2V5Q29kZSA9PT0gVVBfQVJST1cpIHtcclxuICAgICAgICAgICAgICAgICAgICB6b29tID0gcGFyc2VGbG9hdChzZWxmLmVsZW1lbnRzLnpvb21lci52YWx1ZSwgMTApICsgcGFyc2VGbG9hdChzZWxmLmVsZW1lbnRzLnpvb21lci5zdGVwLCAxMClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHpvb20gPSBwYXJzZUZsb2F0KHNlbGYuZWxlbWVudHMuem9vbWVyLnZhbHVlLCAxMCkgLSBwYXJzZUZsb2F0KHNlbGYuZWxlbWVudHMuem9vbWVyLnN0ZXAsIDEwKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRab29tKHpvb20pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHNlbGYub3B0aW9ucy5lbmFibGVLZXlNb3ZlbWVudCAmJiAoZXYua2V5Q29kZSA+PSAzNyAmJiBldi5rZXlDb2RlIDw9IDQwKSkge1xyXG4gICAgICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHZhciBtb3ZlbWVudCA9IHBhcnNlS2V5RG93bihldi5rZXlDb2RlKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm0gPSBUcmFuc2Zvcm0ucGFyc2Uoc2VsZi5lbGVtZW50cy5wcmV2aWV3KTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGVbQ1NTX1VTRVJTRUxFQ1RdID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgdnBSZWN0ID0gc2VsZi5lbGVtZW50cy52aWV3cG9ydC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgIGtleU1vdmUobW92ZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBwYXJzZUtleURvd24oa2V5KSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgTEVGVF9BUlJPVzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsxLCAwXTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFVQX0FSUk9XOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzAsIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgUklHSFRfQVJST1c6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbLTEsIDBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRE9XTl9BUlJPVzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFswLCAtMV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGtleU1vdmUobW92ZW1lbnQpIHtcclxuICAgICAgICAgICAgdmFyIGRlbHRhWCA9IG1vdmVtZW50WzBdLFxyXG4gICAgICAgICAgICAgICAgZGVsdGFZID0gbW92ZW1lbnRbMV0sXHJcbiAgICAgICAgICAgICAgICBuZXdDc3MgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIGFzc2lnblRyYW5zZm9ybUNvb3JkaW5hdGVzKGRlbHRhWCwgZGVsdGFZKTtcclxuXHJcbiAgICAgICAgICAgIG5ld0Nzc1tDU1NfVFJBTlNGT1JNXSA9IHRyYW5zZm9ybS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBjc3Moc2VsZi5lbGVtZW50cy5wcmV2aWV3LCBuZXdDc3MpO1xyXG4gICAgICAgICAgICBfdXBkYXRlT3ZlcmxheS5jYWxsKHNlbGYpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlW0NTU19VU0VSU0VMRUNUXSA9ICcnO1xyXG4gICAgICAgICAgICBfdXBkYXRlQ2VudGVyUG9pbnQuY2FsbChzZWxmKTtcclxuICAgICAgICAgICAgX3RyaWdnZXJVcGRhdGUuY2FsbChzZWxmKTtcclxuICAgICAgICAgICAgb3JpZ2luYWxEaXN0YW5jZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBtb3VzZURvd24oZXYpIHtcclxuICAgICAgICAgICAgaWYgKGV2LmJ1dHRvbiAhPT0gdW5kZWZpbmVkICYmIGV2LmJ1dHRvbiAhPT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgaWYgKGlzRHJhZ2dpbmcpIHJldHVybjtcclxuICAgICAgICAgICAgaXNEcmFnZ2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsWCA9IGV2LnBhZ2VYO1xyXG4gICAgICAgICAgICBvcmlnaW5hbFkgPSBldi5wYWdlWTtcclxuXHJcbiAgICAgICAgICAgIGlmIChldi50b3VjaGVzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdG91Y2hlcyA9IGV2LnRvdWNoZXNbMF07XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFggPSB0b3VjaGVzLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxZID0gdG91Y2hlcy5wYWdlWTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0b2dnbGVHcmFiU3RhdGUoaXNEcmFnZ2luZyk7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybSA9IFRyYW5zZm9ybS5wYXJzZShzZWxmLmVsZW1lbnRzLnByZXZpZXcpO1xyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW91c2VNb3ZlKTtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG1vdXNlTW92ZSk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgbW91c2VVcCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIG1vdXNlVXApO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlW0NTU19VU0VSU0VMRUNUXSA9ICdub25lJztcclxuICAgICAgICAgICAgdnBSZWN0ID0gc2VsZi5lbGVtZW50cy52aWV3cG9ydC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG1vdXNlTW92ZShldikge1xyXG4gICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB2YXIgcGFnZVggPSBldi5wYWdlWCxcclxuICAgICAgICAgICAgICAgIHBhZ2VZID0gZXYucGFnZVk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZXYudG91Y2hlcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHRvdWNoZXMgPSBldi50b3VjaGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgcGFnZVggPSB0b3VjaGVzLnBhZ2VYO1xyXG4gICAgICAgICAgICAgICAgcGFnZVkgPSB0b3VjaGVzLnBhZ2VZO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgZGVsdGFYID0gcGFnZVggLSBvcmlnaW5hbFgsXHJcbiAgICAgICAgICAgICAgICBkZWx0YVkgPSBwYWdlWSAtIG9yaWdpbmFsWSxcclxuICAgICAgICAgICAgICAgIG5ld0NzcyA9IHt9O1xyXG5cclxuICAgICAgICAgICAgaWYgKGV2LnR5cGUgPT09ICd0b3VjaG1vdmUnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXYudG91Y2hlcy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoMSA9IGV2LnRvdWNoZXNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvdWNoMiA9IGV2LnRvdWNoZXNbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3QgPSBNYXRoLnNxcnQoKHRvdWNoMS5wYWdlWCAtIHRvdWNoMi5wYWdlWCkgKiAodG91Y2gxLnBhZ2VYIC0gdG91Y2gyLnBhZ2VYKSArICh0b3VjaDEucGFnZVkgLSB0b3VjaDIucGFnZVkpICogKHRvdWNoMS5wYWdlWSAtIHRvdWNoMi5wYWdlWSkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9yaWdpbmFsRGlzdGFuY2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxEaXN0YW5jZSA9IGRpc3QgLyBzZWxmLl9jdXJyZW50Wm9vbTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzY2FsZSA9IGRpc3QgLyBvcmlnaW5hbERpc3RhbmNlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBfc2V0Wm9vbWVyVmFsLmNhbGwoc2VsZiwgc2NhbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoQ2hhbmdlKHNlbGYuZWxlbWVudHMuem9vbWVyKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFzc2lnblRyYW5zZm9ybUNvb3JkaW5hdGVzKGRlbHRhWCwgZGVsdGFZKTtcclxuXHJcbiAgICAgICAgICAgIG5ld0Nzc1tDU1NfVFJBTlNGT1JNXSA9IHRyYW5zZm9ybS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICBjc3Moc2VsZi5lbGVtZW50cy5wcmV2aWV3LCBuZXdDc3MpO1xyXG4gICAgICAgICAgICBfdXBkYXRlT3ZlcmxheS5jYWxsKHNlbGYpO1xyXG4gICAgICAgICAgICBvcmlnaW5hbFkgPSBwYWdlWTtcclxuICAgICAgICAgICAgb3JpZ2luYWxYID0gcGFnZVg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBtb3VzZVVwKCkge1xyXG4gICAgICAgICAgICBpc0RyYWdnaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRvZ2dsZUdyYWJTdGF0ZShpc0RyYWdnaW5nKTtcclxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdXNlTW92ZSk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBtb3VzZU1vdmUpO1xyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIG1vdXNlVXApO1xyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBtb3VzZVVwKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZVtDU1NfVVNFUlNFTEVDVF0gPSAnJztcclxuICAgICAgICAgICAgX3VwZGF0ZUNlbnRlclBvaW50LmNhbGwoc2VsZik7XHJcbiAgICAgICAgICAgIF90cmlnZ2VyVXBkYXRlLmNhbGwoc2VsZik7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsRGlzdGFuY2UgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5lbGVtZW50cy5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIG1vdXNlRG93bik7XHJcbiAgICAgICAgc2VsZi5lbGVtZW50cy52aWV3cG9ydC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5RG93bik7XHJcbiAgICAgICAgc2VsZi5lbGVtZW50cy5vdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBtb3VzZURvd24pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIF91cGRhdGVPdmVybGF5KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5lbGVtZW50cykgcmV0dXJuOyAvLyBzaW5jZSB0aGlzIGlzIGRlYm91bmNlZCwgaXQgY2FuIGJlIGZpcmVkIGFmdGVyIGRlc3Ryb3lcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgIGJvdW5kUmVjdCA9IHNlbGYuZWxlbWVudHMuYm91bmRhcnkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgICAgIGltZ0RhdGEgPSBzZWxmLmVsZW1lbnRzLnByZXZpZXcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIGNzcyhzZWxmLmVsZW1lbnRzLm92ZXJsYXksIHtcclxuICAgICAgICAgICAgd2lkdGg6IGltZ0RhdGEud2lkdGggKyAncHgnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IGltZ0RhdGEuaGVpZ2h0ICsgJ3B4JyxcclxuICAgICAgICAgICAgdG9wOiAoaW1nRGF0YS50b3AgLSBib3VuZFJlY3QudG9wKSArICdweCcsXHJcbiAgICAgICAgICAgIGxlZnQ6IChpbWdEYXRhLmxlZnQgLSBib3VuZFJlY3QubGVmdCkgKyAncHgnXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB2YXIgX2RlYm91bmNlZE92ZXJsYXkgPSBkZWJvdW5jZShfdXBkYXRlT3ZlcmxheSwgNTAwKTtcclxuXHJcbiAgICBmdW5jdGlvbiBfdHJpZ2dlclVwZGF0ZSgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgIGRhdGEgPSBzZWxmLmdldCgpLFxyXG4gICAgICAgICAgICBldjtcclxuXHJcbiAgICAgICAgaWYgKCFfaXNWaXNpYmxlLmNhbGwoc2VsZikpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5vcHRpb25zLnVwZGF0ZS5jYWxsKHNlbGYsIGRhdGEpO1xyXG4gICAgICAgIGlmIChzZWxmLiQgJiYgdHlwZW9mIFByb3RvdHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgc2VsZi4kKHNlbGYuZWxlbWVudCkudHJpZ2dlcigndXBkYXRlLmNyb3BwaWUnLCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBldjtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5DdXN0b21FdmVudCkge1xyXG4gICAgICAgICAgICAgICAgZXYgPSBuZXcgQ3VzdG9tRXZlbnQoJ3VwZGF0ZScsIHsgZGV0YWlsOiBkYXRhIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcclxuICAgICAgICAgICAgICAgIGV2LmluaXRDdXN0b21FdmVudCgndXBkYXRlJywgdHJ1ZSwgdHJ1ZSwgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbGYuZWxlbWVudC5kaXNwYXRjaEV2ZW50KGV2KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gX2lzVmlzaWJsZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50cy5wcmV2aWV3Lm9mZnNldEhlaWdodCA+IDAgJiYgdGhpcy5lbGVtZW50cy5wcmV2aWV3Lm9mZnNldFdpZHRoID4gMDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfdXBkYXRlUHJvcGVydGllc0Zyb21JbWFnZSgpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgIGluaXRpYWxab29tID0gMSxcclxuICAgICAgICAgICAgY3NzUmVzZXQgPSB7fSxcclxuICAgICAgICAgICAgaW1nID0gc2VsZi5lbGVtZW50cy5wcmV2aWV3LFxyXG4gICAgICAgICAgICBpbWdEYXRhID0gbnVsbCxcclxuICAgICAgICAgICAgdHJhbnNmb3JtUmVzZXQgPSBuZXcgVHJhbnNmb3JtKDAsIDAsIGluaXRpYWxab29tKSxcclxuICAgICAgICAgICAgb3JpZ2luUmVzZXQgPSBuZXcgVHJhbnNmb3JtT3JpZ2luKCksXHJcbiAgICAgICAgICAgIGlzVmlzaWJsZSA9IF9pc1Zpc2libGUuY2FsbChzZWxmKTtcclxuXHJcbiAgICAgICAgaWYgKCFpc1Zpc2libGUgfHwgc2VsZi5kYXRhLmJvdW5kKSB7Ly8gaWYgdGhlIGNyb3BwaWUgaXNuJ3QgdmlzaWJsZSBvciBpdCBkb2Vzbid0IG5lZWQgYmluZGluZ1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZWxmLmRhdGEuYm91bmQgPSB0cnVlO1xyXG4gICAgICAgIGNzc1Jlc2V0W0NTU19UUkFOU0ZPUk1dID0gdHJhbnNmb3JtUmVzZXQudG9TdHJpbmcoKTtcclxuICAgICAgICBjc3NSZXNldFtDU1NfVFJBTlNfT1JHXSA9IG9yaWdpblJlc2V0LnRvU3RyaW5nKCk7XHJcbiAgICAgICAgY3NzUmVzZXRbJ29wYWNpdHknXSA9IDE7XHJcbiAgICAgICAgY3NzKGltZywgY3NzUmVzZXQpO1xyXG5cclxuICAgICAgICBpbWdEYXRhID0gc2VsZi5lbGVtZW50cy5wcmV2aWV3LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICBzZWxmLl9vcmlnaW5hbEltYWdlV2lkdGggPSBpbWdEYXRhLndpZHRoO1xyXG4gICAgICAgIHNlbGYuX29yaWdpbmFsSW1hZ2VIZWlnaHQgPSBpbWdEYXRhLmhlaWdodDtcclxuICAgICAgICBzZWxmLmRhdGEub3JpZW50YXRpb24gPSBnZXRFeGlmT3JpZW50YXRpb24oc2VsZi5lbGVtZW50cy5pbWcpO1xyXG5cclxuICAgICAgICBpZiAoc2VsZi5vcHRpb25zLmVuYWJsZVpvb20pIHtcclxuICAgICAgICAgICAgX3VwZGF0ZVpvb21MaW1pdHMuY2FsbChzZWxmLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGYuX2N1cnJlbnRab29tID0gaW5pdGlhbFpvb207XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cmFuc2Zvcm1SZXNldC5zY2FsZSA9IHNlbGYuX2N1cnJlbnRab29tO1xyXG4gICAgICAgIGNzc1Jlc2V0W0NTU19UUkFOU0ZPUk1dID0gdHJhbnNmb3JtUmVzZXQudG9TdHJpbmcoKTtcclxuICAgICAgICBjc3MoaW1nLCBjc3NSZXNldCk7XHJcblxyXG4gICAgICAgIGlmIChzZWxmLmRhdGEucG9pbnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBfYmluZFBvaW50cy5jYWxsKHNlbGYsIHNlbGYuZGF0YS5wb2ludHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgX2NlbnRlckltYWdlLmNhbGwoc2VsZik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfdXBkYXRlQ2VudGVyUG9pbnQuY2FsbChzZWxmKTtcclxuICAgICAgICBfdXBkYXRlT3ZlcmxheS5jYWxsKHNlbGYpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIF91cGRhdGVab29tTGltaXRzIChpbml0aWFsKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICBtaW5ab29tID0gMCxcclxuICAgICAgICAgICAgbWF4Wm9vbSA9IHNlbGYub3B0aW9ucy5tYXhab29tIHx8IDEuNSxcclxuICAgICAgICAgICAgaW5pdGlhbFpvb20sXHJcbiAgICAgICAgICAgIGRlZmF1bHRJbml0aWFsWm9vbSxcclxuICAgICAgICAgICAgem9vbWVyID0gc2VsZi5lbGVtZW50cy56b29tZXIsXHJcbiAgICAgICAgICAgIHNjYWxlID0gcGFyc2VGbG9hdCh6b29tZXIudmFsdWUpLFxyXG4gICAgICAgICAgICBib3VuZGFyeURhdGEgPSBzZWxmLmVsZW1lbnRzLmJvdW5kYXJ5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgICAgICBpbWdEYXRhID0gbmF0dXJhbEltYWdlRGltZW5zaW9ucyhzZWxmLmVsZW1lbnRzLmltZywgc2VsZi5kYXRhLm9yaWVudGF0aW9uKSxcclxuICAgICAgICAgICAgdnBEYXRhID0gc2VsZi5lbGVtZW50cy52aWV3cG9ydC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICAgICAgbWluVyxcclxuICAgICAgICAgICAgbWluSDtcclxuICAgICAgICBpZiAoc2VsZi5vcHRpb25zLmVuZm9yY2VCb3VuZGFyeSkge1xyXG4gICAgICAgICAgICBtaW5XID0gdnBEYXRhLndpZHRoIC8gaW1nRGF0YS53aWR0aDtcclxuICAgICAgICAgICAgbWluSCA9IHZwRGF0YS5oZWlnaHQgLyBpbWdEYXRhLmhlaWdodDtcclxuICAgICAgICAgICAgbWluWm9vbSA9IE1hdGgubWF4KG1pblcsIG1pbkgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKG1pblpvb20gPj0gbWF4Wm9vbSkge1xyXG4gICAgICAgICAgICBtYXhab29tID0gbWluWm9vbSArIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB6b29tZXIubWluID0gZml4KG1pblpvb20sIDQpO1xyXG4gICAgICAgIHpvb21lci5tYXggPSBmaXgobWF4Wm9vbSwgNCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKCFpbml0aWFsICYmIChzY2FsZSA8IHpvb21lci5taW4gfHwgc2NhbGUgPiB6b29tZXIubWF4KSkge1xyXG4gICAgICAgICAgICBfc2V0Wm9vbWVyVmFsLmNhbGwoc2VsZiwgc2NhbGUgPCB6b29tZXIubWluID8gem9vbWVyLm1pbiA6IHpvb21lci5tYXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChpbml0aWFsKSB7XHJcbiAgICAgICAgICAgIGRlZmF1bHRJbml0aWFsWm9vbSA9IE1hdGgubWF4KChib3VuZGFyeURhdGEud2lkdGggLyBpbWdEYXRhLndpZHRoKSwgKGJvdW5kYXJ5RGF0YS5oZWlnaHQgLyBpbWdEYXRhLmhlaWdodCkpO1xyXG4gICAgICAgICAgICBpbml0aWFsWm9vbSA9IHNlbGYuZGF0YS5ib3VuZFpvb20gIT09IG51bGwgPyBzZWxmLmRhdGEuYm91bmRab29tIDogZGVmYXVsdEluaXRpYWxab29tO1xyXG4gICAgICAgICAgICBfc2V0Wm9vbWVyVmFsLmNhbGwoc2VsZiwgaW5pdGlhbFpvb20pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGlzcGF0Y2hDaGFuZ2Uoem9vbWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfYmluZFBvaW50cyhwb2ludHMpIHtcclxuICAgICAgICBpZiAocG9pbnRzLmxlbmd0aCAhPT0gNCkge1xyXG4gICAgICAgICAgICB0aHJvdyBcIkNyb3BwaWUgLSBJbnZhbGlkIG51bWJlciBvZiBwb2ludHMgc3VwcGxpZWQ6IFwiICsgcG9pbnRzO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgIHBvaW50c1dpZHRoID0gcG9pbnRzWzJdIC0gcG9pbnRzWzBdLFxyXG4gICAgICAgICAgICAvLyBwb2ludHNIZWlnaHQgPSBwb2ludHNbM10gLSBwb2ludHNbMV0sXHJcbiAgICAgICAgICAgIHZwRGF0YSA9IHNlbGYuZWxlbWVudHMudmlld3BvcnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgICAgIGJvdW5kUmVjdCA9IHNlbGYuZWxlbWVudHMuYm91bmRhcnkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgICAgIHZwT2Zmc2V0ID0ge1xyXG4gICAgICAgICAgICAgICAgbGVmdDogdnBEYXRhLmxlZnQgLSBib3VuZFJlY3QubGVmdCxcclxuICAgICAgICAgICAgICAgIHRvcDogdnBEYXRhLnRvcCAtIGJvdW5kUmVjdC50b3BcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2NhbGUgPSB2cERhdGEud2lkdGggLyBwb2ludHNXaWR0aCxcclxuICAgICAgICAgICAgb3JpZ2luVG9wID0gcG9pbnRzWzFdLFxyXG4gICAgICAgICAgICBvcmlnaW5MZWZ0ID0gcG9pbnRzWzBdLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm1Ub3AgPSAoLTEgKiBwb2ludHNbMV0pICsgdnBPZmZzZXQudG9wLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm1MZWZ0ID0gKC0xICogcG9pbnRzWzBdKSArIHZwT2Zmc2V0LmxlZnQsXHJcbiAgICAgICAgICAgIG5ld0NzcyA9IHt9O1xyXG5cclxuICAgICAgICBuZXdDc3NbQ1NTX1RSQU5TX09SR10gPSBvcmlnaW5MZWZ0ICsgJ3B4ICcgKyBvcmlnaW5Ub3AgKyAncHgnO1xyXG4gICAgICAgIG5ld0Nzc1tDU1NfVFJBTlNGT1JNXSA9IG5ldyBUcmFuc2Zvcm0odHJhbnNmb3JtTGVmdCwgdHJhbnNmb3JtVG9wLCBzY2FsZSkudG9TdHJpbmcoKTtcclxuICAgICAgICBjc3Moc2VsZi5lbGVtZW50cy5wcmV2aWV3LCBuZXdDc3MpO1xyXG5cclxuICAgICAgICBfc2V0Wm9vbWVyVmFsLmNhbGwoc2VsZiwgc2NhbGUpO1xyXG4gICAgICAgIHNlbGYuX2N1cnJlbnRab29tID0gc2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gX2NlbnRlckltYWdlKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgaW1nRGltID0gc2VsZi5lbGVtZW50cy5wcmV2aWV3LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG4gICAgICAgICAgICB2cERpbSA9IHNlbGYuZWxlbWVudHMudmlld3BvcnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXHJcbiAgICAgICAgICAgIGJvdW5kRGltID0gc2VsZi5lbGVtZW50cy5ib3VuZGFyeS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICAgICAgdnBMZWZ0ID0gdnBEaW0ubGVmdCAtIGJvdW5kRGltLmxlZnQsXHJcbiAgICAgICAgICAgIHZwVG9wID0gdnBEaW0udG9wIC0gYm91bmREaW0udG9wLFxyXG4gICAgICAgICAgICB3ID0gdnBMZWZ0IC0gKChpbWdEaW0ud2lkdGggLSB2cERpbS53aWR0aCkgLyAyKSxcclxuICAgICAgICAgICAgaCA9IHZwVG9wIC0gKChpbWdEaW0uaGVpZ2h0IC0gdnBEaW0uaGVpZ2h0KSAvIDIpLFxyXG4gICAgICAgICAgICB0cmFuc2Zvcm0gPSBuZXcgVHJhbnNmb3JtKHcsIGgsIHNlbGYuX2N1cnJlbnRab29tKTtcclxuXHJcbiAgICAgICAgY3NzKHNlbGYuZWxlbWVudHMucHJldmlldywgQ1NTX1RSQU5TRk9STSwgdHJhbnNmb3JtLnRvU3RyaW5nKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIF90cmFuc2ZlckltYWdlVG9DYW52YXMoY3VzdG9tT3JpZW50YXRpb24pIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgIGNhbnZhcyA9IHNlbGYuZWxlbWVudHMuY2FudmFzLFxyXG4gICAgICAgICAgICBpbWcgPSBzZWxmLmVsZW1lbnRzLmltZyxcclxuICAgICAgICAgICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyksXHJcbiAgICAgICAgICAgIGV4aWYgPSBfaGFzRXhpZi5jYWxsKHNlbGYpLFxyXG4gICAgICAgICAgICBjdXN0b21PcmllbnRhdGlvbiA9IHNlbGYub3B0aW9ucy5lbmFibGVPcmllbnRhdGlvbiAmJiBjdXN0b21PcmllbnRhdGlvbjtcclxuXHJcbiAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IGltZy53aWR0aDtcclxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaW1nLmhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKGV4aWYgJiYgIWN1c3RvbU9yaWVudGF0aW9uKSB7XHJcbiAgICAgICAgICAgIHZhciBvcmllbnRhdGlvbiA9IGdldEV4aWZPcmllbnRhdGlvbihpbWcpO1xyXG4gICAgICAgICAgICBkcmF3Q2FudmFzKGNhbnZhcywgaW1nLCBudW0ob3JpZW50YXRpb24gfHwgMCwgMTApKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoY3VzdG9tT3JpZW50YXRpb24pIHtcclxuICAgICAgICAgICAgZHJhd0NhbnZhcyhjYW52YXMsIGltZywgY3VzdG9tT3JpZW50YXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfZ2V0Q2FudmFzKGRhdGEpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXHJcbiAgICAgICAgICAgIHBvaW50cyA9IGRhdGEucG9pbnRzLFxyXG4gICAgICAgICAgICBsZWZ0ID0gbnVtKHBvaW50c1swXSksXHJcbiAgICAgICAgICAgIHRvcCA9IG51bShwb2ludHNbMV0pLFxyXG4gICAgICAgICAgICByaWdodCA9IG51bShwb2ludHNbMl0pLFxyXG4gICAgICAgICAgICBib3R0b20gPSBudW0ocG9pbnRzWzNdKSxcclxuICAgICAgICAgICAgd2lkdGggPSByaWdodC1sZWZ0LFxyXG4gICAgICAgICAgICBoZWlnaHQgPSBib3R0b20tdG9wLFxyXG4gICAgICAgICAgICBjaXJjbGUgPSBkYXRhLmNpcmNsZSxcclxuICAgICAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyksXHJcbiAgICAgICAgICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLFxyXG4gICAgICAgICAgICBzdGFydFggPSAwLFxyXG4gICAgICAgICAgICBzdGFydFkgPSAwLFxyXG4gICAgICAgICAgICBjYW52YXNXaWR0aCA9IGRhdGEub3V0cHV0V2lkdGggfHwgd2lkdGgsXHJcbiAgICAgICAgICAgIGNhbnZhc0hlaWdodCA9IGRhdGEub3V0cHV0SGVpZ2h0IHx8IGhlaWdodCxcclxuICAgICAgICAgICAgY3VzdG9tRGltZW5zaW9ucyA9IChkYXRhLm91dHB1dFdpZHRoICYmIGRhdGEub3V0cHV0SGVpZ2h0KSxcclxuICAgICAgICAgICAgb3V0cHV0V2lkdGhSYXRpbyA9IDEsXHJcbiAgICAgICAgICAgIG91dHB1dEhlaWdodFJhdGlvID0gMTtcclxuXHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gY2FudmFzV2lkdGg7XHJcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGNhbnZhc0hlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuYmFja2dyb3VuZENvbG9yKSB7XHJcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBkYXRhLmJhY2tncm91bmRDb2xvcjtcclxuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNlbGYub3B0aW9ucy5lbmZvcmNlQm91bmRhcnkgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHdpZHRoID0gTWF0aC5taW4od2lkdGgsIHNlbGYuX29yaWdpbmFsSW1hZ2VXaWR0aCk7XHJcbiAgICAgICAgICAgIGhlaWdodCA9IE1hdGgubWluKGhlaWdodCwgc2VsZi5fb3JpZ2luYWxJbWFnZUhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgLy8gY29uc29sZS50YWJsZSh7IGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbSwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCB9KTtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuZWxlbWVudHMucHJldmlldywgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0LCBzdGFydFgsIHN0YXJ0WSwgY2FudmFzV2lkdGgsIGNhbnZhc0hlaWdodCk7XHJcbiAgICAgICAgaWYgKGNpcmNsZSkge1xyXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJyNmZmYnO1xyXG4gICAgICAgICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLWluJztcclxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjdHguYXJjKGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyLCBjYW52YXMud2lkdGggLyAyLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgICAgICAgICAgY3R4LmZpbGwoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNhbnZhcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfZ2V0SHRtbFJlc3VsdChkYXRhKSB7XHJcbiAgICAgICAgdmFyIHBvaW50cyA9IGRhdGEucG9pbnRzLFxyXG4gICAgICAgICAgICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcclxuICAgICAgICAgICAgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyksXHJcbiAgICAgICAgICAgIHdpZHRoID0gcG9pbnRzWzJdIC0gcG9pbnRzWzBdLFxyXG4gICAgICAgICAgICBoZWlnaHQgPSBwb2ludHNbM10gLSBwb2ludHNbMV07XHJcblxyXG4gICAgICAgIGFkZENsYXNzKGRpdiwgJ2Nyb3BwaWUtcmVzdWx0Jyk7XHJcbiAgICAgICAgZGl2LmFwcGVuZENoaWxkKGltZyk7XHJcbiAgICAgICAgY3NzKGltZywge1xyXG4gICAgICAgICAgICBsZWZ0OiAoLTEgKiBwb2ludHNbMF0pICsgJ3B4JyxcclxuICAgICAgICAgICAgdG9wOiAoLTEgKiBwb2ludHNbMV0pICsgJ3B4J1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGltZy5zcmMgPSBkYXRhLnVybDtcclxuICAgICAgICBjc3MoZGl2LCB7XHJcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCArICdweCcsXHJcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0ICsgJ3B4J1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gZGl2O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIF9nZXRCYXNlNjRSZXN1bHQoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiBfZ2V0Q2FudmFzLmNhbGwodGhpcywgZGF0YSkudG9EYXRhVVJMKGRhdGEuZm9ybWF0LCBkYXRhLnF1YWxpdHkpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIF9nZXRCbG9iUmVzdWx0KGRhdGEpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICAgICAgX2dldENhbnZhcy5jYWxsKHNlbGYsIGRhdGEpLnRvQmxvYihmdW5jdGlvbiAoYmxvYikge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShibG9iKTtcclxuICAgICAgICAgICAgfSwgZGF0YS5mb3JtYXQsIGRhdGEucXVhbGl0eSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gX3JlcGxhY2VJbWFnZShpbWcpIHtcclxuICAgICAgICBpZiAodGhpcy5lbGVtZW50cy5pbWcucGFyZW50Tm9kZSkge1xyXG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHRoaXMuZWxlbWVudHMuaW1nLmNsYXNzTGlzdCwgZnVuY3Rpb24oYykgeyBpbWcuY2xhc3NMaXN0LmFkZChjKTsgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuaW1nLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGltZywgdGhpcy5lbGVtZW50cy5pbWcpO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLnByZXZpZXcgPSBpbWc7IC8vIGlmIHRoZSBpbWcgaXMgYXR0YWNoZWQgdG8gdGhlIERPTSwgdGhleSdyZSBub3QgdXNpbmcgdGhlIGNhbnZhc1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVsZW1lbnRzLmltZyA9IGltZztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfYmluZChvcHRpb25zLCBjYikge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgdXJsLFxyXG4gICAgICAgICAgICBwb2ludHMgPSBbXSxcclxuICAgICAgICAgICAgem9vbSA9IG51bGwsXHJcbiAgICAgICAgICAgIGhhc0V4aWYgPSBfaGFzRXhpZi5jYWxsKHNlbGYpO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIChvcHRpb25zKSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdXJsID0gb3B0aW9ucztcclxuICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbnMpKSB7XHJcbiAgICAgICAgICAgIHBvaW50cyA9IG9wdGlvbnMuc2xpY2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIChvcHRpb25zKSA9PT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5kYXRhLnVybCkgeyAvL3JlZnJlc2hpbmdcclxuICAgICAgICAgICAgX3VwZGF0ZVByb3BlcnRpZXNGcm9tSW1hZ2UuY2FsbChzZWxmKTtcclxuICAgICAgICAgICAgX3RyaWdnZXJVcGRhdGUuY2FsbChzZWxmKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB1cmwgPSBvcHRpb25zLnVybDtcclxuICAgICAgICAgICAgcG9pbnRzID0gb3B0aW9ucy5wb2ludHMgfHwgW107XHJcbiAgICAgICAgICAgIHpvb20gPSB0eXBlb2Yob3B0aW9ucy56b29tKSA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogb3B0aW9ucy56b29tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2VsZi5kYXRhLmJvdW5kID0gZmFsc2U7XHJcbiAgICAgICAgc2VsZi5kYXRhLnVybCA9IHVybCB8fCBzZWxmLmRhdGEudXJsO1xyXG4gICAgICAgIHNlbGYuZGF0YS5ib3VuZFpvb20gPSB6b29tO1xyXG5cclxuICAgICAgICByZXR1cm4gbG9hZEltYWdlKHVybCwgaGFzRXhpZikudGhlbihmdW5jdGlvbiAoaW1nKSB7XHJcbiAgICAgICAgICAgIF9yZXBsYWNlSW1hZ2UuY2FsbChzZWxmLCBpbWcpO1xyXG4gICAgICAgICAgICBpZiAoIXBvaW50cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuYXREaW0gPSBuYXR1cmFsSW1hZ2VEaW1lbnNpb25zKGltZyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVjdCA9IHNlbGYuZWxlbWVudHMudmlld3BvcnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXNwZWN0UmF0aW8gPSByZWN0LndpZHRoIC8gcmVjdC5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW1nQXNwZWN0UmF0aW8gPSBuYXREaW0ud2lkdGggLyBuYXREaW0uaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgdmFyIHdpZHRoLCBoZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGltZ0FzcGVjdFJhdGlvID4gYXNwZWN0UmF0aW8pIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSBuYXREaW0uaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoID0gaGVpZ2h0ICogYXNwZWN0UmF0aW87XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IG5hdERpbS53aWR0aDtcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQgPSBuYXREaW0uaGVpZ2h0IC8gYXNwZWN0UmF0aW87XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHgwID0gKG5hdERpbS53aWR0aCAtIHdpZHRoKSAvIDI7XHJcbiAgICAgICAgICAgICAgICB2YXIgeTAgPSAobmF0RGltLmhlaWdodCAtIGhlaWdodCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgdmFyIHgxID0geDAgKyB3aWR0aDtcclxuICAgICAgICAgICAgICAgIHZhciB5MSA9IHkwICsgaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhLnBvaW50cyA9IFt4MCwgeTAsIHgxLCB5MV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoc2VsZi5vcHRpb25zLnJlbGF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBwb2ludHMgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzWzBdICogaW1nLm5hdHVyYWxXaWR0aCAvIDEwMCxcclxuICAgICAgICAgICAgICAgICAgICBwb2ludHNbMV0gKiBpbWcubmF0dXJhbEhlaWdodCAvIDEwMCxcclxuICAgICAgICAgICAgICAgICAgICBwb2ludHNbMl0gKiBpbWcubmF0dXJhbFdpZHRoIC8gMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50c1szXSAqIGltZy5uYXR1cmFsSGVpZ2h0IC8gMTAwXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxmLmRhdGEucG9pbnRzID0gcG9pbnRzLm1hcChmdW5jdGlvbiAocCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQocCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zLnVzZUNhbnZhcykge1xyXG4gICAgICAgICAgICAgICAgX3RyYW5zZmVySW1hZ2VUb0NhbnZhcy5jYWxsKHNlbGYsIG9wdGlvbnMub3JpZW50YXRpb24gfHwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX3VwZGF0ZVByb3BlcnRpZXNGcm9tSW1hZ2UuY2FsbChzZWxmKTtcclxuICAgICAgICAgICAgX3RyaWdnZXJVcGRhdGUuY2FsbChzZWxmKTtcclxuICAgICAgICAgICAgY2IgJiYgY2IoKTtcclxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJDcm9wcGllOlwiICsgZXJyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmaXgodiwgZGVjaW1hbFBvaW50cykge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHYpLnRvRml4ZWQoZGVjaW1hbFBvaW50cyB8fCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBfZ2V0KCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgaW1nRGF0YSA9IHNlbGYuZWxlbWVudHMucHJldmlldy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICAgICAgdnBEYXRhID0gc2VsZi5lbGVtZW50cy52aWV3cG9ydC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICAgICAgeDEgPSB2cERhdGEubGVmdCAtIGltZ0RhdGEubGVmdCxcclxuICAgICAgICAgICAgeTEgPSB2cERhdGEudG9wIC0gaW1nRGF0YS50b3AsXHJcbiAgICAgICAgICAgIHdpZHRoRGlmZiA9ICh2cERhdGEud2lkdGggLSBzZWxmLmVsZW1lbnRzLnZpZXdwb3J0Lm9mZnNldFdpZHRoKSAvIDIsIC8vYm9yZGVyXHJcbiAgICAgICAgICAgIGhlaWdodERpZmYgPSAodnBEYXRhLmhlaWdodCAtIHNlbGYuZWxlbWVudHMudmlld3BvcnQub2Zmc2V0SGVpZ2h0KSAvIDIsXHJcbiAgICAgICAgICAgIHgyID0geDEgKyBzZWxmLmVsZW1lbnRzLnZpZXdwb3J0Lm9mZnNldFdpZHRoICsgd2lkdGhEaWZmLFxyXG4gICAgICAgICAgICB5MiA9IHkxICsgc2VsZi5lbGVtZW50cy52aWV3cG9ydC5vZmZzZXRIZWlnaHQgKyBoZWlnaHREaWZmLFxyXG4gICAgICAgICAgICBzY2FsZSA9IHNlbGYuX2N1cnJlbnRab29tO1xyXG5cclxuICAgICAgICBpZiAoc2NhbGUgPT09IEluZmluaXR5IHx8IGlzTmFOKHNjYWxlKSkge1xyXG4gICAgICAgICAgICBzY2FsZSA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgbWF4ID0gc2VsZi5vcHRpb25zLmVuZm9yY2VCb3VuZGFyeSA/IDAgOiBOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFk7XHJcbiAgICAgICAgeDEgPSBNYXRoLm1heChtYXgsIHgxIC8gc2NhbGUpO1xyXG4gICAgICAgIHkxID0gTWF0aC5tYXgobWF4LCB5MSAvIHNjYWxlKTtcclxuICAgICAgICB4MiA9IE1hdGgubWF4KG1heCwgeDIgLyBzY2FsZSk7XHJcbiAgICAgICAgeTIgPSBNYXRoLm1heChtYXgsIHkyIC8gc2NhbGUpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwb2ludHM6IFtmaXgoeDEpLCBmaXgoeTEpLCBmaXgoeDIpLCBmaXgoeTIpXSxcclxuICAgICAgICAgICAgem9vbTogc2NhbGUsXHJcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiBzZWxmLmRhdGEub3JpZW50YXRpb25cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBSRVNVTFRfREVGQVVMVFMgPSB7XHJcbiAgICAgICAgICAgIHR5cGU6ICdjYW52YXMnLFxyXG4gICAgICAgICAgICBmb3JtYXQ6ICdwbmcnLFxyXG4gICAgICAgICAgICBxdWFsaXR5OiAxXHJcbiAgICAgICAgfSxcclxuICAgICAgICBSRVNVTFRfRk9STUFUUyA9IFsnanBlZycsICd3ZWJwJywgJ3BuZyddO1xyXG5cclxuICAgIGZ1bmN0aW9uIF9yZXN1bHQob3B0aW9ucykge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcyxcclxuICAgICAgICAgICAgZGF0YSA9IF9nZXQuY2FsbChzZWxmKSxcclxuICAgICAgICAgICAgb3B0cyA9IGRlZXBFeHRlbmQoY2xvbmUoUkVTVUxUX0RFRkFVTFRTKSwgY2xvbmUob3B0aW9ucykpLFxyXG4gICAgICAgICAgICByZXN1bHRUeXBlID0gKHR5cGVvZiAob3B0aW9ucykgPT09ICdzdHJpbmcnID8gb3B0aW9ucyA6IChvcHRzLnR5cGUgfHwgJ2Jhc2U2NCcpKSxcclxuICAgICAgICAgICAgc2l6ZSA9IG9wdHMuc2l6ZSB8fCAndmlld3BvcnQnLFxyXG4gICAgICAgICAgICBmb3JtYXQgPSBvcHRzLmZvcm1hdCxcclxuICAgICAgICAgICAgcXVhbGl0eSA9IG9wdHMucXVhbGl0eSxcclxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yID0gb3B0cy5iYWNrZ3JvdW5kQ29sb3IsXHJcbiAgICAgICAgICAgIGNpcmNsZSA9IHR5cGVvZiBvcHRzLmNpcmNsZSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jaXJjbGUgOiAoc2VsZi5vcHRpb25zLnZpZXdwb3J0LnR5cGUgPT09ICdjaXJjbGUnKSxcclxuICAgICAgICAgICAgdnBSZWN0ID0gc2VsZi5lbGVtZW50cy52aWV3cG9ydC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcclxuICAgICAgICAgICAgcmF0aW8gPSB2cFJlY3Qud2lkdGggLyB2cFJlY3QuaGVpZ2h0LFxyXG4gICAgICAgICAgICBwcm9tO1xyXG5cclxuICAgICAgICBpZiAoc2l6ZSA9PT0gJ3ZpZXdwb3J0Jykge1xyXG4gICAgICAgICAgICBkYXRhLm91dHB1dFdpZHRoID0gdnBSZWN0LndpZHRoO1xyXG4gICAgICAgICAgICBkYXRhLm91dHB1dEhlaWdodCA9IHZwUmVjdC5oZWlnaHQ7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2l6ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgaWYgKHNpemUud2lkdGggJiYgc2l6ZS5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGRhdGEub3V0cHV0V2lkdGggPSBzaXplLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5vdXRwdXRIZWlnaHQgPSBzaXplLmhlaWdodDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChzaXplLndpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLm91dHB1dFdpZHRoID0gc2l6ZS53aWR0aDtcclxuICAgICAgICAgICAgICAgIGRhdGEub3V0cHV0SGVpZ2h0ID0gc2l6ZS53aWR0aCAvIHJhdGlvO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHNpemUuaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLm91dHB1dFdpZHRoID0gc2l6ZS5oZWlnaHQgKiByYXRpbztcclxuICAgICAgICAgICAgICAgIGRhdGEub3V0cHV0SGVpZ2h0ID0gc2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChSRVNVTFRfRk9STUFUUy5pbmRleE9mKGZvcm1hdCkgPiAtMSkge1xyXG4gICAgICAgICAgICBkYXRhLmZvcm1hdCA9ICdpbWFnZS8nICsgZm9ybWF0O1xyXG4gICAgICAgICAgICBkYXRhLnF1YWxpdHkgPSBxdWFsaXR5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGF0YS5jaXJjbGUgPSBjaXJjbGU7XHJcbiAgICAgICAgZGF0YS51cmwgPSBzZWxmLmRhdGEudXJsO1xyXG4gICAgICAgIGRhdGEuYmFja2dyb3VuZENvbG9yID0gYmFja2dyb3VuZENvbG9yO1xyXG5cclxuICAgICAgICBwcm9tID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgICAgICBzd2l0Y2gocmVzdWx0VHlwZS50b0xvd2VyQ2FzZSgpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICdyYXdjYW52YXMnOlxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoX2dldENhbnZhcy5jYWxsKHNlbGYsIGRhdGEpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2NhbnZhcyc6XHJcbiAgICAgICAgICAgICAgICBjYXNlICdiYXNlNjQnOlxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoX2dldEJhc2U2NFJlc3VsdC5jYWxsKHNlbGYsIGRhdGEpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJ2Jsb2InOlxyXG4gICAgICAgICAgICAgICAgICAgIF9nZXRCbG9iUmVzdWx0LmNhbGwoc2VsZiwgZGF0YSkudGhlbihyZXNvbHZlKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShfZ2V0SHRtbFJlc3VsdC5jYWxsKHNlbGYsIGRhdGEpKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBwcm9tO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIF9yZWZyZXNoKCkge1xyXG4gICAgICAgIF91cGRhdGVQcm9wZXJ0aWVzRnJvbUltYWdlLmNhbGwodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gX3JvdGF0ZShkZWcpIHtcclxuICAgICAgICBpZiAoIXRoaXMub3B0aW9ucy51c2VDYW52YXMgfHwgIXRoaXMub3B0aW9ucy5lbmFibGVPcmllbnRhdGlvbikge1xyXG4gICAgICAgICAgICB0aHJvdyAnQ3JvcHBpZTogQ2Fubm90IHJvdGF0ZSB3aXRob3V0IGVuYWJsZU9yaWVudGF0aW9uICYmIEVYSUYuanMgaW5jbHVkZWQnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxyXG4gICAgICAgICAgICBjYW52YXMgPSBzZWxmLmVsZW1lbnRzLmNhbnZhcyxcclxuICAgICAgICAgICAgb3JudDtcclxuXHJcbiAgICAgICAgc2VsZi5kYXRhLm9yaWVudGF0aW9uID0gZ2V0RXhpZk9mZnNldChzZWxmLmRhdGEub3JpZW50YXRpb24sIGRlZyk7XHJcbiAgICAgICAgZHJhd0NhbnZhcyhjYW52YXMsIHNlbGYuZWxlbWVudHMuaW1nLCBzZWxmLmRhdGEub3JpZW50YXRpb24pO1xyXG4gICAgICAgIF91cGRhdGVab29tTGltaXRzLmNhbGwoc2VsZik7XHJcbiAgICAgICAgX29uWm9vbS5jYWxsKHNlbGYpO1xyXG4gICAgICAgIGNvcHkgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIF9kZXN0cm95KCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBzZWxmLmVsZW1lbnQucmVtb3ZlQ2hpbGQoc2VsZi5lbGVtZW50cy5ib3VuZGFyeSk7XHJcbiAgICAgICAgcmVtb3ZlQ2xhc3Moc2VsZi5lbGVtZW50LCAnY3JvcHBpZS1jb250YWluZXInKTtcclxuICAgICAgICBpZiAoc2VsZi5vcHRpb25zLmVuYWJsZVpvb20pIHtcclxuICAgICAgICAgICAgc2VsZi5lbGVtZW50LnJlbW92ZUNoaWxkKHNlbGYuZWxlbWVudHMuem9vbWVyV3JhcCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbGV0ZSBzZWxmLmVsZW1lbnRzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh3aW5kb3cualF1ZXJ5KSB7XHJcbiAgICAgICAgdmFyICQgPSB3aW5kb3cualF1ZXJ5O1xyXG4gICAgICAgICQuZm4uY3JvcHBpZSA9IGZ1bmN0aW9uIChvcHRzKSB7XHJcbiAgICAgICAgICAgIHZhciBvdCA9IHR5cGVvZiBvcHRzO1xyXG5cclxuICAgICAgICAgICAgaWYgKG90ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHNpbmdsZUluc3QgPSAkKHRoaXMpLmRhdGEoJ2Nyb3BwaWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAob3B0cyA9PT0gJ2dldCcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2luZ2xlSW5zdC5nZXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9wdHMgPT09ICdyZXN1bHQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNpbmdsZUluc3QucmVzdWx0LmFwcGx5KHNpbmdsZUluc3QsIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob3B0cyA9PT0gJ2JpbmQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNpbmdsZUluc3QuYmluZC5hcHBseShzaW5nbGVJbnN0LCBhcmdzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9ICQodGhpcykuZGF0YSgnY3JvcHBpZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbWV0aG9kID0gaVtvcHRzXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoJC5pc0Z1bmN0aW9uKG1ldGhvZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kLmFwcGx5KGksIGFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0cyA9PT0gJ2Rlc3Ryb3knKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZURhdGEoJ2Nyb3BwaWUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgJ0Nyb3BwaWUgJyArIG9wdHMgKyAnIG1ldGhvZCBub3QgZm91bmQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSBuZXcgQ3JvcHBpZSh0aGlzLCBvcHRzKTtcclxuICAgICAgICAgICAgICAgICAgICBpLiQgPSAkO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZGF0YSgnY3JvcHBpZScsIGkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIENyb3BwaWUoZWxlbWVudCwgb3B0cykge1xyXG4gICAgICAgIGlmIChlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKCdjcm9wcGllLWNvbnRhaW5lcicpID4gLTEpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ3JvcHBpZTogQ2FuJ3QgaW5pdGlhbGl6ZSBjcm9wcGllIG1vcmUgdGhhbiBvbmNlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IGRlZXBFeHRlbmQoY2xvbmUoQ3JvcHBpZS5kZWZhdWx0cyksIG9wdHMpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5lbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2ltZycpIHtcclxuICAgICAgICAgICAgdmFyIG9yaWdJbWFnZSA9IHRoaXMuZWxlbWVudDtcclxuICAgICAgICAgICAgYWRkQ2xhc3Mob3JpZ0ltYWdlLCAnY3Itb3JpZ2luYWwtaW1hZ2UnKTtcclxuICAgICAgICAgICAgc2V0QXR0cmlidXRlcyhvcmlnSW1hZ2UsIHsnYXJpYS1oaWRkZW4nIDogJ3RydWUnLCAnYWx0JyA6ICcnIH0pO1xyXG4gICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQocmVwbGFjZW1lbnREaXYpO1xyXG4gICAgICAgICAgICByZXBsYWNlbWVudERpdi5hcHBlbmRDaGlsZChvcmlnSW1hZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSByZXBsYWNlbWVudERpdjtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnVybCA9IHRoaXMub3B0aW9ucy51cmwgfHwgb3JpZ0ltYWdlLnNyYztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9jcmVhdGUuY2FsbCh0aGlzKTtcclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnVybCkge1xyXG4gICAgICAgICAgICB2YXIgYmluZE9wdHMgPSB7XHJcbiAgICAgICAgICAgICAgICB1cmw6IHRoaXMub3B0aW9ucy51cmwsXHJcbiAgICAgICAgICAgICAgICBwb2ludHM6IHRoaXMub3B0aW9ucy5wb2ludHNcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMub3B0aW9uc1sndXJsJ107XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLm9wdGlvbnNbJ3BvaW50cyddO1xyXG4gICAgICAgICAgICBfYmluZC5jYWxsKHRoaXMsIGJpbmRPcHRzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQ3JvcHBpZS5kZWZhdWx0cyA9IHtcclxuICAgICAgICB2aWV3cG9ydDoge1xyXG4gICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDEwMCxcclxuICAgICAgICAgICAgdHlwZTogJ3NxdWFyZSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvdW5kYXJ5OiB7IH0sXHJcbiAgICAgICAgb3JpZW50YXRpb25Db250cm9sczoge1xyXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICBsZWZ0Q2xhc3M6ICcnLFxyXG4gICAgICAgICAgICByaWdodENsYXNzOiAnJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVzaXplQ29udHJvbHM6IHtcclxuICAgICAgICAgICAgd2lkdGg6IHRydWUsXHJcbiAgICAgICAgICAgIGhlaWdodDogdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3VzdG9tQ2xhc3M6ICcnLFxyXG4gICAgICAgIHNob3dab29tZXI6IHRydWUsXHJcbiAgICAgICAgZW5hYmxlWm9vbTogdHJ1ZSxcclxuICAgICAgICBlbmFibGVSZXNpemU6IGZhbHNlLFxyXG4gICAgICAgIG1vdXNlV2hlZWxab29tOiB0cnVlLFxyXG4gICAgICAgIGVuYWJsZUV4aWY6IGZhbHNlLFxyXG4gICAgICAgIGVuZm9yY2VCb3VuZGFyeTogdHJ1ZSxcclxuICAgICAgICBlbmFibGVPcmllbnRhdGlvbjogZmFsc2UsXHJcbiAgICAgICAgZW5hYmxlS2V5TW92ZW1lbnQ6IHRydWUsXHJcbiAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoKSB7IH1cclxuICAgIH07XHJcblxyXG4gICAgQ3JvcHBpZS5nbG9iYWxzID0ge1xyXG4gICAgICAgIHRyYW5zbGF0ZTogJ3RyYW5zbGF0ZTNkJ1xyXG4gICAgfTtcclxuXHJcbiAgICBkZWVwRXh0ZW5kKENyb3BwaWUucHJvdG90eXBlLCB7XHJcbiAgICAgICAgYmluZDogZnVuY3Rpb24gKG9wdGlvbnMsIGNiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfYmluZC5jYWxsKHRoaXMsIG9wdGlvbnMsIGNiKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IF9nZXQuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgdmFyIHBvaW50cyA9IGRhdGEucG9pbnRzO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJlbGF0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBwb2ludHNbMF0gLz0gdGhpcy5lbGVtZW50cy5pbWcubmF0dXJhbFdpZHRoIC8gMTAwO1xyXG4gICAgICAgICAgICAgICAgcG9pbnRzWzFdIC89IHRoaXMuZWxlbWVudHMuaW1nLm5hdHVyYWxIZWlnaHQgLyAxMDA7XHJcbiAgICAgICAgICAgICAgICBwb2ludHNbMl0gLz0gdGhpcy5lbGVtZW50cy5pbWcubmF0dXJhbFdpZHRoIC8gMTAwO1xyXG4gICAgICAgICAgICAgICAgcG9pbnRzWzNdIC89IHRoaXMuZWxlbWVudHMuaW1nLm5hdHVyYWxIZWlnaHQgLyAxMDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXN1bHQ6IGZ1bmN0aW9uICh0eXBlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfcmVzdWx0LmNhbGwodGhpcywgdHlwZSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWZyZXNoOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfcmVmcmVzaC5jYWxsKHRoaXMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0Wm9vbTogZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgICAgX3NldFpvb21lclZhbC5jYWxsKHRoaXMsIHYpO1xyXG4gICAgICAgICAgICBkaXNwYXRjaENoYW5nZSh0aGlzLmVsZW1lbnRzLnpvb21lcik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByb3RhdGU6IGZ1bmN0aW9uIChkZWcpIHtcclxuICAgICAgICAgICAgX3JvdGF0ZS5jYWxsKHRoaXMsIGRlZyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfZGVzdHJveS5jYWxsKHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGV4cG9ydHMuQ3JvcHBpZSA9IHdpbmRvdy5Dcm9wcGllID0gQ3JvcHBpZTtcclxufSkpO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jcm9wcGllL2Nyb3BwaWUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL2Nyb3BwaWUvY3JvcHBpZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IiwiKGZ1bmN0aW9uIChnbG9iYWwsIHVuZGVmaW5lZCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBuZXh0SGFuZGxlID0gMTsgLy8gU3BlYyBzYXlzIGdyZWF0ZXIgdGhhbiB6ZXJvXG4gICAgdmFyIHRhc2tzQnlIYW5kbGUgPSB7fTtcbiAgICB2YXIgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgdmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbiAgICB2YXIgcmVnaXN0ZXJJbW1lZGlhdGU7XG5cbiAgICBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoY2FsbGJhY2spIHtcbiAgICAgIC8vIENhbGxiYWNrIGNhbiBlaXRoZXIgYmUgYSBmdW5jdGlvbiBvciBhIHN0cmluZ1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbGxiYWNrID0gbmV3IEZ1bmN0aW9uKFwiXCIgKyBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICAvLyBDb3B5IGZ1bmN0aW9uIGFyZ3VtZW50c1xuICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgICB9XG4gICAgICAvLyBTdG9yZSBhbmQgcmVnaXN0ZXIgdGhlIHRhc2tcbiAgICAgIHZhciB0YXNrID0geyBjYWxsYmFjazogY2FsbGJhY2ssIGFyZ3M6IGFyZ3MgfTtcbiAgICAgIHRhc2tzQnlIYW5kbGVbbmV4dEhhbmRsZV0gPSB0YXNrO1xuICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUobmV4dEhhbmRsZSk7XG4gICAgICByZXR1cm4gbmV4dEhhbmRsZSsrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGhhbmRsZSkge1xuICAgICAgICBkZWxldGUgdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bih0YXNrKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRhc2suY2FsbGJhY2s7XG4gICAgICAgIHZhciBhcmdzID0gdGFzay5hcmdzO1xuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bklmUHJlc2VudChoYW5kbGUpIHtcbiAgICAgICAgLy8gRnJvbSB0aGUgc3BlYzogXCJXYWl0IHVudGlsIGFueSBpbnZvY2F0aW9ucyBvZiB0aGlzIGFsZ29yaXRobSBzdGFydGVkIGJlZm9yZSB0aGlzIG9uZSBoYXZlIGNvbXBsZXRlZC5cIlxuICAgICAgICAvLyBTbyBpZiB3ZSdyZSBjdXJyZW50bHkgcnVubmluZyBhIHRhc2ssIHdlJ2xsIG5lZWQgdG8gZGVsYXkgdGhpcyBpbnZvY2F0aW9uLlxuICAgICAgICBpZiAoY3VycmVudGx5UnVubmluZ0FUYXNrKSB7XG4gICAgICAgICAgICAvLyBEZWxheSBieSBkb2luZyBhIHNldFRpbWVvdXQuIHNldEltbWVkaWF0ZSB3YXMgdHJpZWQgaW5zdGVhZCwgYnV0IGluIEZpcmVmb3ggNyBpdCBnZW5lcmF0ZWQgYVxuICAgICAgICAgICAgLy8gXCJ0b28gbXVjaCByZWN1cnNpb25cIiBlcnJvci5cbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHRhc2sgPSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcnVuKHRhc2spO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW1tZWRpYXRlKGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiAoKSB7IHJ1bklmUHJlc2VudChoYW5kbGUpOyB9KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW5Vc2VQb3N0TWVzc2FnZSgpIHtcbiAgICAgICAgLy8gVGhlIHRlc3QgYWdhaW5zdCBgaW1wb3J0U2NyaXB0c2AgcHJldmVudHMgdGhpcyBpbXBsZW1lbnRhdGlvbiBmcm9tIGJlaW5nIGluc3RhbGxlZCBpbnNpZGUgYSB3ZWIgd29ya2VyLFxuICAgICAgICAvLyB3aGVyZSBgZ2xvYmFsLnBvc3RNZXNzYWdlYCBtZWFucyBzb21ldGhpbmcgY29tcGxldGVseSBkaWZmZXJlbnQgYW5kIGNhbid0IGJlIHVzZWQgZm9yIHRoaXMgcHVycG9zZS5cbiAgICAgICAgaWYgKGdsb2JhbC5wb3N0TWVzc2FnZSAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICAgICAgICAgIHZhciBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBvbGRPbk1lc3NhZ2UgPSBnbG9iYWwub25tZXNzYWdlO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoXCJcIiwgXCIqXCIpO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IG9sZE9uTWVzc2FnZTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIC8vIEluc3RhbGxzIGFuIGV2ZW50IGhhbmRsZXIgb24gYGdsb2JhbGAgZm9yIHRoZSBgbWVzc2FnZWAgZXZlbnQ6IHNlZVxuICAgICAgICAvLyAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0RPTS93aW5kb3cucG9zdE1lc3NhZ2VcbiAgICAgICAgLy8gKiBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS9jb21tcy5odG1sI2Nyb3NzRG9jdW1lbnRNZXNzYWdlc1xuXG4gICAgICAgIHZhciBtZXNzYWdlUHJlZml4ID0gXCJzZXRJbW1lZGlhdGUkXCIgKyBNYXRoLnJhbmRvbSgpICsgXCIkXCI7XG4gICAgICAgIHZhciBvbkdsb2JhbE1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gZ2xvYmFsICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGV2ZW50LmRhdGEgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhLmluZGV4T2YobWVzc2FnZVByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoK2V2ZW50LmRhdGEuc2xpY2UobWVzc2FnZVByZWZpeC5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JhbC5hdHRhY2hFdmVudChcIm9ubWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShtZXNzYWdlUHJlZml4ICsgaGFuZGxlLCBcIipcIik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgaHRtbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAgICAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50LiBEbyBzbywgdGh1cyBxdWV1aW5nIHVwIHRoZSB0YXNrLiBSZW1lbWJlciB0byBjbGVhbiB1cCBvbmNlIGl0J3MgYmVlbiBjYWxsZWQuXG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgICAgICBzY3JpcHQgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSWYgc3VwcG9ydGVkLCB3ZSBzaG91bGQgYXR0YWNoIHRvIHRoZSBwcm90b3R5cGUgb2YgZ2xvYmFsLCBzaW5jZSB0aGF0IGlzIHdoZXJlIHNldFRpbWVvdXQgZXQgYWwuIGxpdmUuXG4gICAgdmFyIGF0dGFjaFRvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWwpO1xuICAgIGF0dGFjaFRvID0gYXR0YWNoVG8gJiYgYXR0YWNoVG8uc2V0VGltZW91dCA/IGF0dGFjaFRvIDogZ2xvYmFsO1xuXG4gICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBlLmcuIGJyb3dzZXJpZnkgZW52aXJvbm1lbnRzLlxuICAgIGlmICh7fS50b1N0cmluZy5jYWxsKGdsb2JhbC5wcm9jZXNzKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCIpIHtcbiAgICAgICAgLy8gRm9yIE5vZGUuanMgYmVmb3JlIDAuOVxuICAgICAgICBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChjYW5Vc2VQb3N0TWVzc2FnZSgpKSB7XG4gICAgICAgIC8vIEZvciBub24tSUUxMCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZ2xvYmFsLk1lc3NhZ2VDaGFubmVsKSB7XG4gICAgICAgIC8vIEZvciB3ZWIgd29ya2Vycywgd2hlcmUgc3VwcG9ydGVkXG4gICAgICAgIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGRvYyAmJiBcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiIGluIGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpKSB7XG4gICAgICAgIC8vIEZvciBJRSA24oCTOFxuICAgICAgICBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3Igb2xkZXIgYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpO1xuICAgIH1cblxuICAgIGF0dGFjaFRvLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZTtcbiAgICBhdHRhY2hUby5jbGVhckltbWVkaWF0ZSA9IGNsZWFySW1tZWRpYXRlO1xufSh0eXBlb2Ygc2VsZiA9PT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBnbG9iYWwgPT09IFwidW5kZWZpbmVkXCIgPyB0aGlzIDogZ2xvYmFsIDogc2VsZikpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gLi9ub2RlX21vZHVsZXMvc2V0aW1tZWRpYXRlL3NldEltbWVkaWF0ZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgc2NvcGUgPSAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwpIHx8XG4gICAgICAgICAgICAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZikgfHxcbiAgICAgICAgICAgIHdpbmRvdztcbnZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcbn07XG5leHBvcnRzLmNsZWFyVGltZW91dCA9XG5leHBvcnRzLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbih0aW1lb3V0KSB7XG4gIGlmICh0aW1lb3V0KSB7XG4gICAgdGltZW91dC5jbG9zZSgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHNjb3BlLCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gc2V0aW1tZWRpYXRlIGF0dGFjaGVzIGl0c2VsZiB0byB0aGUgZ2xvYmFsIG9iamVjdFxucmVxdWlyZShcInNldGltbWVkaWF0ZVwiKTtcbi8vIE9uIHNvbWUgZXhvdGljIGVudmlyb25tZW50cywgaXQncyBub3QgY2xlYXIgd2hpY2ggb2JqZWN0IGBzZXRpbW1lZGlhdGVgIHdhc1xuLy8gYWJsZSB0byBpbnN0YWxsIG9udG8uICBTZWFyY2ggZWFjaCBwb3NzaWJpbGl0eSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGVcbi8vIGBzZXRpbW1lZGlhdGVgIGxpYnJhcnkuXG5leHBvcnRzLnNldEltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5zZXRJbW1lZGlhdGUpO1xuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLmNsZWFySW1tZWRpYXRlKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=