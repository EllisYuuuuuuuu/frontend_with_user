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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/apigClient.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/apigClient.js":
/*!********************************************!*\
  !*** ./app/javascript/packs/apigClient.js ***!
  \********************************************/
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
var apigClientFactory = {};

apigClientFactory.newClient = function (config) {
  var apigClient = {};

  if (config === undefined) {
    config = {
      accessKey: '',
      secretKey: '',
      sessionToken: '',
      region: '',
      apiKey: undefined,
      defaultContentType: 'application/json',
      defaultAcceptType: 'application/json'
    };
  }

  if (config.accessKey === undefined) {
    config.accessKey = '';
  }

  if (config.secretKey === undefined) {
    config.secretKey = '';
  }

  if (config.apiKey === undefined) {
    config.apiKey = '';
  }

  if (config.sessionToken === undefined) {
    config.sessionToken = '';
  }

  if (config.region === undefined) {
    config.region = 'us-east-1';
  } //If defaultContentType is not defined then default to application/json


  if (config.defaultContentType === undefined) {
    config.defaultContentType = 'application/json';
  } //If defaultAcceptType is not defined then default to application/json


  if (config.defaultAcceptType === undefined) {
    config.defaultAcceptType = 'application/json';
  } // extract endpoint and path from url


  var invokeUrl = 'https://i9umv18cjj.execute-api.us-east-1.amazonaws.com/v2';
  var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
  var pathComponent = invokeUrl.substring(endpoint.length);
  var sigV4ClientConfig = {
    accessKey: config.accessKey,
    secretKey: config.secretKey,
    sessionToken: config.sessionToken,
    serviceName: 'execute-api',
    region: config.region,
    endpoint: endpoint,
    defaultContentType: config.defaultContentType,
    defaultAcceptType: config.defaultAcceptType
  };
  var authType = 'NONE';

  if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
    authType = 'AWS_IAM';
  }

  var simpleHttpClientConfig = {
    endpoint: endpoint,
    defaultContentType: config.defaultContentType,
    defaultAcceptType: config.defaultAcceptType
  };
  var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);

  apigClient.configsGet = function (params, body, additionalParams) {
    if (additionalParams === undefined) {
      additionalParams = {};
    }

    apiGateway.core.utils.assertParametersDefined(params, ['x-pcbuilder-token'], ['body']);
    var configsGetRequest = {
      verb: 'get'.toUpperCase(),
      path: pathComponent + uritemplate('/configs').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['x-pcbuilder-token']),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };
    return apiGatewayClient.makeRequest(configsGetRequest, authType, additionalParams, config.apiKey);
  };

  apigClient.configsOptions = function (params, body, additionalParams) {
    if (additionalParams === undefined) {
      additionalParams = {};
    }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
    var configsOptionsRequest = {
      verb: 'options'.toUpperCase(),
      path: pathComponent + uritemplate('/configs').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };
    return apiGatewayClient.makeRequest(configsOptionsRequest, authType, additionalParams, config.apiKey);
  };

  apigClient.configsConfigIdGet = function (params, body, additionalParams) {
    if (additionalParams === undefined) {
      additionalParams = {};
    }

    apiGateway.core.utils.assertParametersDefined(params, ['config_id', 'x-pcbuilder-token'], ['body']);
    var configsConfigIdGetRequest = {
      verb: 'get'.toUpperCase(),
      path: pathComponent + uritemplate('/configs/{config_id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['config_id'])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['x-pcbuilder-token']),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };
    return apiGatewayClient.makeRequest(configsConfigIdGetRequest, authType, additionalParams, config.apiKey);
  };

  apigClient.configsConfigIdPut = function (params, body, additionalParams) {
    if (additionalParams === undefined) {
      additionalParams = {};
    }

    apiGateway.core.utils.assertParametersDefined(params, ['config_id', 'x-pcbuilder-token', 'body'], ['body']);
    var configsConfigIdPutRequest = {
      verb: 'put'.toUpperCase(),
      path: pathComponent + uritemplate('/configs/{config_id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['config_id'])),
      headers: apiGateway.core.utils.parseParametersToObject(params, ['x-pcbuilder-token']),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };
    return apiGatewayClient.makeRequest(configsConfigIdPutRequest, authType, additionalParams, config.apiKey);
  };

  apigClient.configsConfigIdOptions = function (params, body, additionalParams) {
    if (additionalParams === undefined) {
      additionalParams = {};
    }

    apiGateway.core.utils.assertParametersDefined(params, ['config_id'], ['body']);
    var configsConfigIdOptionsRequest = {
      verb: 'options'.toUpperCase(),
      path: pathComponent + uritemplate('/configs/{config_id}').expand(apiGateway.core.utils.parseParametersToObject(params, ['config_id'])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };
    return apiGatewayClient.makeRequest(configsConfigIdOptionsRequest, authType, additionalParams, config.apiKey);
  };

  apigClient.hotConfigGet = function (params, body, additionalParams) {
    if (additionalParams === undefined) {
      additionalParams = {};
    }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
    var hotConfigGetRequest = {
      verb: 'get'.toUpperCase(),
      path: pathComponent + uritemplate('/hot-config').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };
    return apiGatewayClient.makeRequest(hotConfigGetRequest, authType, additionalParams, config.apiKey);
  };

  apigClient.hotConfigOptions = function (params, body, additionalParams) {
    if (additionalParams === undefined) {
      additionalParams = {};
    }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
    var hotConfigOptionsRequest = {
      verb: 'options'.toUpperCase(),
      path: pathComponent + uritemplate('/hot-config').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };
    return apiGatewayClient.makeRequest(hotConfigOptionsRequest, authType, additionalParams, config.apiKey);
  };

  apigClient.recommendGet = function (params, body, additionalParams) {
    if (additionalParams === undefined) {
      additionalParams = {};
    }

    apiGateway.core.utils.assertParametersDefined(params, ['budget', 'level', 'email'], ['body']);
    var recommendGetRequest = {
      verb: 'get'.toUpperCase(),
      path: pathComponent + uritemplate('/recommend').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, ['budget', 'level', 'email']),
      body: body
    };
    return apiGatewayClient.makeRequest(recommendGetRequest, authType, additionalParams, config.apiKey);
  };

  apigClient.recommendPost = function (params, body, additionalParams) {
    if (additionalParams === undefined) {
      additionalParams = {};
    }

    apiGateway.core.utils.assertParametersDefined(params, ['body'], ['body']);
    var recommendPostRequest = {
      verb: 'post'.toUpperCase(),
      path: pathComponent + uritemplate('/recommend').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };
    return apiGatewayClient.makeRequest(recommendPostRequest, authType, additionalParams, config.apiKey);
  };

  apigClient.recommendOptions = function (params, body, additionalParams) {
    if (additionalParams === undefined) {
      additionalParams = {};
    }

    apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
    var recommendOptionsRequest = {
      verb: 'options'.toUpperCase(),
      path: pathComponent + uritemplate('/recommend').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
      headers: apiGateway.core.utils.parseParametersToObject(params, []),
      queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
      body: body
    };
    return apiGatewayClient.makeRequest(recommendOptionsRequest, authType, additionalParams, config.apiKey);
  };

  return apigClient;
};

/***/ })

/******/ });
//# sourceMappingURL=apigClient-08a810973621eabb11a2.js.map