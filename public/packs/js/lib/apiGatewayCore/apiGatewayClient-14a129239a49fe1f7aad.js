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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/lib/apiGatewayCore/apiGatewayClient.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/lib/apiGatewayCore/apiGatewayClient.js":
/*!*********************************************************************!*\
  !*** ./app/javascript/packs/lib/apiGatewayCore/apiGatewayClient.js ***!
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
apiGateway.core.apiGatewayClientFactory = {};

apiGateway.core.apiGatewayClientFactory.newClient = function (simpleHttpClientConfig, sigV4ClientConfig) {
  var apiGatewayClient = {}; //Spin up 2 httpClients, one for simple requests, one for SigV4

  var sigV4Client = apiGateway.core.sigV4ClientFactory.newClient(sigV4ClientConfig);
  var simpleHttpClient = apiGateway.core.simpleHttpClientFactory.newClient(simpleHttpClientConfig);

  apiGatewayClient.makeRequest = function (request, authType, additionalParams, apiKey) {
    //Default the request to use the simple http client
    var clientToUse = simpleHttpClient; //Attach the apiKey to the headers request if one was provided

    if (apiKey !== undefined && apiKey !== '' && apiKey !== null) {
      request.headers['x-api-key'] = apiKey;
    }

    if (request.body === undefined || request.body === '' || request.body === null || Object.keys(request.body).length === 0) {
      request.body = undefined;
    } // If the user specified any additional headers or query params that may not have been modeled
    // merge them into the appropriate request properties


    request.headers = apiGateway.core.utils.mergeInto(request.headers, additionalParams.headers);
    request.queryParams = apiGateway.core.utils.mergeInto(request.queryParams, additionalParams.queryParams); //If an auth type was specified inject the appropriate auth client

    if (authType === 'AWS_IAM') {
      clientToUse = sigV4Client;
    } //Call the selected http client to make the request, returning a promise once the request is sent


    return clientToUse.makeRequest(request);
  };

  return apiGatewayClient;
};

/***/ })

/******/ });
//# sourceMappingURL=apiGatewayClient-14a129239a49fe1f7aad.js.map