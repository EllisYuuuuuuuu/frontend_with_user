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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/lib/CryptoJS/components/hmac.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/lib/CryptoJS/components/hmac.js":
/*!**************************************************************!*\
  !*** ./app/javascript/packs/lib/CryptoJS/components/hmac.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function () {
  // Shortcuts
  var C = CryptoJS;
  var C_lib = C.lib;
  var Base = C_lib.Base;
  var C_enc = C.enc;
  var Utf8 = C_enc.Utf8;
  var C_algo = C.algo;
  /**
   * HMAC algorithm.
   */

  var HMAC = C_algo.HMAC = Base.extend({
    /**
     * Initializes a newly created HMAC.
     *
     * @param {Hasher} hasher The hash algorithm to use.
     * @param {WordArray|string} key The secret key.
     *
     * @example
     *
     *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
     */
    init: function init(hasher, key) {
      // Init hasher
      hasher = this._hasher = new hasher.init(); // Convert string to WordArray, else assume WordArray already

      if (typeof key == 'string') {
        key = Utf8.parse(key);
      } // Shortcuts


      var hasherBlockSize = hasher.blockSize;
      var hasherBlockSizeBytes = hasherBlockSize * 4; // Allow arbitrary length keys

      if (key.sigBytes > hasherBlockSizeBytes) {
        key = hasher.finalize(key);
      } // Clamp excess bits


      key.clamp(); // Clone key for inner and outer pads

      var oKey = this._oKey = key.clone();
      var iKey = this._iKey = key.clone(); // Shortcuts

      var oKeyWords = oKey.words;
      var iKeyWords = iKey.words; // XOR keys with pad constants

      for (var i = 0; i < hasherBlockSize; i++) {
        oKeyWords[i] ^= 0x5c5c5c5c;
        iKeyWords[i] ^= 0x36363636;
      }

      oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes; // Set initial values

      this.reset();
    },

    /**
     * Resets this HMAC to its initial state.
     *
     * @example
     *
     *     hmacHasher.reset();
     */
    reset: function reset() {
      // Shortcut
      var hasher = this._hasher; // Reset

      hasher.reset();
      hasher.update(this._iKey);
    },

    /**
     * Updates this HMAC with a message.
     *
     * @param {WordArray|string} messageUpdate The message to append.
     *
     * @return {HMAC} This HMAC instance.
     *
     * @example
     *
     *     hmacHasher.update('message');
     *     hmacHasher.update(wordArray);
     */
    update: function update(messageUpdate) {
      this._hasher.update(messageUpdate); // Chainable


      return this;
    },

    /**
     * Finalizes the HMAC computation.
     * Note that the finalize operation is effectively a destructive, read-once operation.
     *
     * @param {WordArray|string} messageUpdate (Optional) A final message update.
     *
     * @return {WordArray} The HMAC.
     *
     * @example
     *
     *     var hmac = hmacHasher.finalize();
     *     var hmac = hmacHasher.finalize('message');
     *     var hmac = hmacHasher.finalize(wordArray);
     */
    finalize: function finalize(messageUpdate) {
      // Shortcut
      var hasher = this._hasher; // Compute HMAC

      var innerHash = hasher.finalize(messageUpdate);
      hasher.reset();
      var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
      return hmac;
    }
  });
})();

/***/ })

/******/ });
//# sourceMappingURL=hmac-edb2b659a3ed9b4a39d9.js.map