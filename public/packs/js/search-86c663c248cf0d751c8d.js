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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/search.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/search.js":
/*!****************************************!*\
  !*** ./app/javascript/packs/search.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function submitChat(e) {
  var host = "http://ec2-54-172-72-63.compute-1.amazonaws.com:5011/recommend?";
  var level = document.getElementById('level').value;
  var budget = document.getElementById('budget').value;
  var email = document.getElementById('email').value;

  if (level === "" || budget === "") {
    result_area = document.getElementById('hardware_info');
    result_area.innerText = "Need level and budget";
    return;
  }

  var url = host + "level=" + level + "&budget=" + budget;
  var params = {
    "level": level,
    "budget": budget
  };
  var body = {};

  if (email !== "") {
    url = url + "&email=" + email;
    params['email'] = email;
    console.log(url);
  }

  var apigClient = apigClientFactory.newClient();
  apigClient.recommendGet(params, body).then(function (result) {
    console.log(result['data']);
    var allHardwares = result['data']['body'];
    console.log(allHardwares);
    var hardwareNames = ["CPU", "GPU", "RAM", "SSD", "HDD", "USB"];
    document.getElementById('hardware_info').innerText = "Here is our recommendations: (More results are send to your email) \n";

    for (var j = 0; j < hardwareNames.length; j++) {
      var hardwareName = hardwareNames[j];
      var hardwareList = allHardwares[hardwareName];
      var hardwareArea = document.getElementById(hardwareName);
      hardwareArea.innerText = hardwareName + ":\n ";
      hardwareArea.innerText += hardwareList[0];
    }
  })["catch"](function (result) {
    console.log(JSON.stringify(result));
  }); // const httpRequest = new XMLHttpRequest();
  // httpRequest.open('GET', url, true);
  // httpRequest.send();
  // httpRequest.onreadystatechange = function () {
  //     if (httpRequest.readyState === 4 && httpRequest.status === 200) {
  //         const json = httpRequest.responseText;
  //         const allHardwares = JSON.parse(json)['body']
  //         const hardwareNames = ["CPU", "GPU", "RAM", "SSD", "HDD", "USB"]
  //         document.getElementById('hardware_info').innerText = "Here is our recommendations: (More results are send to your email) \n";
  //         for (let j = 0; j < hardwareNames.length; j++){
  //             var hardwareName = hardwareNames[j]
  //             const hardwareList = allHardwares[hardwareName]
  //             const hardwareArea = document.getElementById(hardwareName)
  //             hardwareArea.innerText = hardwareName + ":\n "
  //             hardwareArea.innerText+=hardwareList[0]
  //         }
  //     }
  // };
}

/***/ })

/******/ });
//# sourceMappingURL=search-86c663c248cf0d751c8d.js.map