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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/application.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/application.js":
/*!*********************************************!*\
  !*** ./app/javascript/packs/application.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /Users/keyzhang/WebZero/app/javascript/packs/application.js: Invalid left-hand side in assignment expression. (24:0)\n\n  22 | //= require search\n  23 |\n> 24 | window.submitChat(a) =function (e) {\n     | ^\n  25 |         const host = \"http://ec2-54-172-72-63.compute-1.amazonaws.com:5011/recommend?\"\n  26 |         var level = document.getElementById('level').value;\n  27 |         var budget = document.getElementById('budget').value;\n    at Parser._raise (/Users/keyzhang/WebZero/node_modules/@babel/parser/lib/index.js:541:17)\n    at Parser.raiseWithData (/Users/keyzhang/WebZero/node_modules/@babel/parser/lib/index.js:534:17)\n    at Parser.raise (/Users/keyzhang/WebZero/node_modules/@babel/parser/lib/index.js:495:17)\n    at Parser.checkLVal (/Users/keyzhang/WebZero/node_modules/@babel/parser/lib/index.js:11090:16)\n    at Parser.parseMaybeAssign (/Users/keyzhang/WebZero/node_modules/@babel/parser/lib/index.js:11272:12)\n    at Parser.parseExpressionBase (/Users/keyzhang/WebZero/node_modules/@babel/parser/lib/index.js:11186:23)\n    at /Users/keyzhang/WebZero/node_modules/@babel/parser/lib/index.js:11180:39\n    at Parser.allowInAnd (/Users/keyzhang/WebZero/node_modules/@babel/parser/lib/index.js:13068:16)\n    at Parser.parseExpression (/Users/keyzhang/WebZero/node_modules/@babel/parser/lib/index.js:11180:17)\n    at Parser.parseStatementContent (/Users/keyzhang/WebZero/node_modules/@babel/parser/lib/index.js:13418:23)\n    at Parser.parseStatement (/Users/keyzhang/WebZero/node_modules/@babel/parser/lib/index.js:13285:17)\n    at Parser.parseBlockOrModuleBlockBody (/Users/keyzhang/WebZero/node_modules/@babel/parser/lib/index.js:13874:25)\n    at Parser.parseBlockBody (/Users/keyzhang/WebZero/node_modules/@babel/parser/lib/index.js:13865:10)\n    at Parser.parseProgram (/Users/keyzhang/WebZero/node_modules/@babel/parser/lib/index.js:13207:10)\n    at Parser.parseTopLevel (/Users/keyzhang/WebZero/node_modules/@babel/parser/lib/index.js:13198:25)\n    at Parser.parse (/Users/keyzhang/WebZero/node_modules/@babel/parser/lib/index.js:14957:10)\n    at parse (/Users/keyzhang/WebZero/node_modules/@babel/parser/lib/index.js:15009:38)\n    at parser (/Users/keyzhang/WebZero/node_modules/@babel/core/lib/parser/index.js:52:34)\n    at parser.next (<anonymous>)\n    at normalizeFile (/Users/keyzhang/WebZero/node_modules/@babel/core/lib/transformation/normalize-file.js:87:38)\n    at normalizeFile.next (<anonymous>)\n    at run (/Users/keyzhang/WebZero/node_modules/@babel/core/lib/transformation/index.js:29:50)\n    at run.next (<anonymous>)\n    at Function.transform (/Users/keyzhang/WebZero/node_modules/@babel/core/lib/transform.js:25:41)\n    at transform.next (<anonymous>)\n    at step (/Users/keyzhang/WebZero/node_modules/gensync/index.js:261:32)\n    at /Users/keyzhang/WebZero/node_modules/gensync/index.js:273:13\n    at async.call.result.err.err (/Users/keyzhang/WebZero/node_modules/gensync/index.js:223:11)\n    at /Users/keyzhang/WebZero/node_modules/gensync/index.js:189:28\n    at /Users/keyzhang/WebZero/node_modules/@babel/core/lib/gensync-utils/async.js:74:7");

/***/ })

/******/ });
//# sourceMappingURL=application-3782ae092bb975134f3b.js.map