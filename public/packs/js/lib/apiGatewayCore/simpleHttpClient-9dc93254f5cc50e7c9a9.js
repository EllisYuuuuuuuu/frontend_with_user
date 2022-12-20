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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/lib/apiGatewayCore/simpleHttpClient.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/lib/apiGatewayCore/simpleHttpClient.js":
/*!*********************************************************************!*\
  !*** ./app/javascript/packs/lib/apiGatewayCore/simpleHttpClient.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
var apiGateway = apiGateway || {};
apiGateway.core = apiGateway.core || {};
apiGateway.core.simpleHttpClientFactory = {};

apiGateway.core.simpleHttpClientFactory.newClient = function (config) {
  function buildCanonicalQueryString(queryParams) {
    //Build a properly encoded query string from a QueryParam object
    if (Object.keys(queryParams).length < 1) {
      return '';
    }

    var canonicalQueryString = '';

    for (var property in queryParams) {
      if (queryParams.hasOwnProperty(property)) {
        canonicalQueryString += encodeURIComponent(property) + '=' + encodeURIComponent(queryParams[property]) + '&';
      }
    }

    return canonicalQueryString.substr(0, canonicalQueryString.length - 1);
  }

  var simpleHttpClient = {};
  simpleHttpClient.endpoint = apiGateway.core.utils.assertDefined(config.endpoint, 'endpoint');

  simpleHttpClient.makeRequest = function (request) {
    var verb = apiGateway.core.utils.assertDefined(request.verb, 'verb');
    var path = apiGateway.core.utils.assertDefined(request.path, 'path');
    var queryParams = apiGateway.core.utils.copy(request.queryParams);

    if (queryParams === undefined) {
      queryParams = {};
    }

    var headers = apiGateway.core.utils.copy(request.headers);

    if (headers === undefined) {
      headers = {};
    } //If the user has not specified an override for Content type the use default


    if (headers['Content-Type'] === undefined) {
      headers['Content-Type'] = config.defaultContentType;
    } //If the user has not specified an override for Accept type the use default


    if (headers['Accept'] === undefined) {
      headers['Accept'] = config.defaultAcceptType;
    }

    var body = apiGateway.core.utils.copy(request.body);

    if (body === undefined) {
      body = '';
    }

    var url = config.endpoint + path;
    var queryString = buildCanonicalQueryString(queryParams);

    if (queryString != '') {
      url += '?' + queryString;
    }

    var simpleHttpRequest = {
      method: verb,
      url: url,
      headers: headers,
      data: body
    };
    return axios(simpleHttpRequest);
  };

  return simpleHttpClient;
};

/***/ })

/******/ });
//# sourceMappingURL=simpleHttpClient-9dc93254f5cc50e7c9a9.js.map