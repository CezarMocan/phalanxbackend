(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./db.js":
/*!***************!*\
  !*** ./db.js ***!
  \***************/
/*! exports provided: getVersions, getVersionCount, getVersion, putVersion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVersions", function() { return getVersions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVersionCount", function() { return getVersionCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVersion", function() { return getVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "putVersion", function() { return putVersion; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _queries__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./queries */ "./queries.js");





var AWS = __webpack_require__(/*! aws-sdk */ "aws-sdk"); // Initialize DB


var IS_OFFLINE = process.env.IS_OFFLINE;
var dynamoDb;

if (IS_OFFLINE === 'true') {
  dynamoDb = new AWS.DynamoDB({
    region: 'localhost',
    endpoint: 'http://localhost:8070'
  });
} else {
  dynamoDb = new AWS.DynamoDB();
}

; // Expose operations

var getVersions =
/*#__PURE__*/
function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var params, result, versions;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = Object(_queries__WEBPACK_IMPORTED_MODULE_3__["get_AllVersions"])();
            _context.prev = 1;
            _context.next = 4;
            return dynamoDb.scan(params).promise();

          case 4:
            result = _context.sent;
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](1);
            throw new Error('Could not get versions');

          case 11:
            if (result.Items) {
              _context.next = 14;
              break;
            }

            throw new Error('Could not get versions');

          case 14:
            versions = result.Items.map(function (i) {
              return {
                version: parseInt(i.version.N),
                timestamp: parseInt(i.timestamp.N)
              };
            }).sort(function (x, y) {
              return x.version < y.version ? -1 : 1;
            });
            return _context.abrupt("return", {
              versions: versions
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[1, 7]]);
  }));

  return function getVersions() {
    return _ref.apply(this, arguments);
  };
}();
var getVersionCount =
/*#__PURE__*/
function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
    var params, data;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            params = Object(_queries__WEBPACK_IMPORTED_MODULE_3__["get_VersionCount"])();
            _context2.prev = 1;
            _context2.next = 4;
            return dynamoDb.describeTable(params).promise();

          case 4:
            data = _context2.sent;
            _context2.next = 11;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](1);
            throw new Error('Count not get version count');

          case 11:
            return _context2.abrupt("return", data.Table.ItemCount);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 7]]);
  }));

  return function getVersionCount() {
    return _ref2.apply(this, arguments);
  };
}();
var getVersion =
/*#__PURE__*/
function () {
  var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(versionId) {
    var params, result;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            params = Object(_queries__WEBPACK_IMPORTED_MODULE_3__["get_Version"])(versionId);
            _context3.prev = 1;
            _context3.next = 4;
            return dynamoDb.getItem(params).promise();

          case 4:
            result = _context3.sent;
            _context3.next = 12;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](1);
            console.log('getVersion error: ', _context3.t0);
            throw new Error('Could not get version');

          case 12:
            if (!(!result.Item || !result.Item.data)) {
              _context3.next = 15;
              break;
            }

            throw new Error('Version data is not complete: ', result);

          case 15:
            return _context3.abrupt("return", {
              versionData: result.Item.data.S,
              version: result.Item.version.N,
              creationDate: result.Item.timestamp.N
            });

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[1, 7]]);
  }));

  return function getVersion(_x) {
    return _ref3.apply(this, arguments);
  };
}();
var putVersion =
/*#__PURE__*/
function () {
  var _ref4 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(versionId, versionData, timestamp) {
    var params, result;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            params = Object(_queries__WEBPACK_IMPORTED_MODULE_3__["put_Version"])(versionId, versionData, timestamp);
            _context4.prev = 1;
            _context4.next = 4;
            return dynamoDb.putItem(params).promise();

          case 4:
            result = _context4.sent;
            _context4.next = 12;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](1);
            console.log('Caught error in putVersion: ', _context4.t0);
            throw new Error('Could not put version');

          case 12:
            return _context4.abrupt("return", {
              version: versionId,
              creationDate: timestamp
            });

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[1, 7]]);
  }));

  return function putVersion(_x2, _x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: handler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handler", function() { return handler; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "@babel/runtime/helpers/asyncToGenerator");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! serverless-http */ "serverless-http");
/* harmony import */ var serverless_http__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(serverless_http__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! body-parser */ "body-parser");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var pify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! pify */ "pify");
/* harmony import */ var pify__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(pify__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./db */ "./db.js");








var app = express__WEBPACK_IMPORTED_MODULE_5___default()();
app.use(body_parser__WEBPACK_IMPORTED_MODULE_4___default.a.json({
  strict: false
})); // Get all site versions

app.get('/versions',
/*#__PURE__*/
function () {
  var _ref = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(req, res) {
    var versions;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return Object(_db__WEBPACK_IMPORTED_MODULE_7__["getVersions"])();

          case 3:
            versions = _context.sent;
            _context.next = 10;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](0);
            res.status(400).json({
              e: _context.t0
            });
            return _context.abrupt("return");

          case 10:
            res.json(versions);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 6]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.get('/versionCount',
/*#__PURE__*/
function () {
  var _ref2 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(req, res) {
    var versionCount;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return Object(_db__WEBPACK_IMPORTED_MODULE_7__["getVersionCount"])();

          case 3:
            versionCount = _context2.sent;
            _context2.next = 11;
            break;

          case 6:
            _context2.prev = 6;
            _context2.t0 = _context2["catch"](0);
            console.log('Error getting versionId: ', _context2.t0);
            res.status(400).json({});
            return _context2.abrupt("return");

          case 11:
            res.json({
              versionCount: versionCount
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 6]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.get('/version/latest',
/*#__PURE__*/
function () {
  var _ref3 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(req, res) {
    var version, versionId;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return Object(_db__WEBPACK_IMPORTED_MODULE_7__["getVersionCount"])();

          case 3:
            versionId = _context3.sent;
            _context3.next = 11;
            break;

          case 6:
            _context3.prev = 6;
            _context3.t0 = _context3["catch"](0);
            console.log('Error getting versionId: ', _context3.t0);
            res.status(400).json({});
            return _context3.abrupt("return");

          case 11:
            if (!(versionId == 0)) {
              _context3.next = 14;
              break;
            }

            res.json({});
            return _context3.abrupt("return");

          case 14:
            _context3.prev = 14;
            _context3.next = 17;
            return Object(_db__WEBPACK_IMPORTED_MODULE_7__["getVersion"])(versionId - 1);

          case 17:
            version = _context3.sent;
            _context3.next = 25;
            break;

          case 20:
            _context3.prev = 20;
            _context3.t1 = _context3["catch"](14);
            console.log('Failed to get latest version: ', versionId - 1, _context3.t1);
            res.status(400).json({});
            return _context3.abrupt("return");

          case 25:
            res.json(version);

          case 26:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this, [[0, 6], [14, 20]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); // Get a certain site version

app.get('/version/:versionId',
/*#__PURE__*/
function () {
  var _ref4 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(req, res) {
    var version;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return Object(_db__WEBPACK_IMPORTED_MODULE_7__["getVersion"])(req.params.versionId);

          case 3:
            version = _context4.sent;
            _context4.next = 10;
            break;

          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            res.status(400).json({});
            return _context4.abrupt("return");

          case 10:
            res.json(version);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this, [[0, 6]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); // Post new site version

app.post('/new',
/*#__PURE__*/
function () {
  var _ref5 = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(req, res) {
    var versionData, timestamp, versionId, newVersionData;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            versionData = JSON.stringify(req.body.versionData);
            timestamp = new Date().getTime();
            _context5.prev = 2;
            _context5.next = 5;
            return Object(_db__WEBPACK_IMPORTED_MODULE_7__["getVersionCount"])();

          case 5:
            versionId = _context5.sent;
            _context5.next = 13;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](2);
            console.log('Error getting versionId: ', _context5.t0);
            res.status(400).json({});
            return _context5.abrupt("return");

          case 13:
            console.log('Version ID is: ', versionId);
            _context5.prev = 14;
            _context5.next = 17;
            return Object(_db__WEBPACK_IMPORTED_MODULE_7__["putVersion"])(versionId, versionData, timestamp);

          case 17:
            newVersionData = _context5.sent;
            _context5.next = 24;
            break;

          case 20:
            _context5.prev = 20;
            _context5.t1 = _context5["catch"](14);
            res.status(400).json({});
            return _context5.abrupt("return");

          case 24:
            res.json(newVersionData);

          case 25:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this, [[2, 8], [14, 20]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
var handler = serverless_http__WEBPACK_IMPORTED_MODULE_3___default()(app);

/***/ }),

/***/ "./queries.js":
/*!********************!*\
  !*** ./queries.js ***!
  \********************/
/*! exports provided: CANVAS_VERSIONS_TABLE, get_AllVersions, get_Version, get_VersionCount, put_Version */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CANVAS_VERSIONS_TABLE", function() { return CANVAS_VERSIONS_TABLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_AllVersions", function() { return get_AllVersions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_Version", function() { return get_Version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_VersionCount", function() { return get_VersionCount; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "put_Version", function() { return put_Version; });
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ "source-map-support/register");
/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);

var CANVAS_VERSIONS_TABLE = process.env.CANVAS_VERSIONS_TABLE;
var get_AllVersions = function get_AllVersions() {
  return {
    TableName: CANVAS_VERSIONS_TABLE,
    AttributesToGet: ['version', 'timestamp']
  };
};
var get_Version = function get_Version(versionId) {
  return {
    TableName: CANVAS_VERSIONS_TABLE,
    Key: {
      version: {
        N: versionId.toString()
      }
    },
    AttributesToGet: ['version', 'data', 'timestamp']
  };
};
var get_VersionCount = function get_VersionCount() {
  return {
    TableName: CANVAS_VERSIONS_TABLE
  };
};
var put_Version = function put_Version(versionId, versionData, timestamp) {
  return {
    TableName: CANVAS_VERSIONS_TABLE,
    Item: {
      version: {
        N: versionId.toString()
      },
      data: {
        S: versionData
      },
      timestamp: {
        N: timestamp.toString()
      }
    }
  };
};

/***/ }),

/***/ "@babel/runtime/helpers/asyncToGenerator":
/*!**********************************************************!*\
  !*** external "@babel/runtime/helpers/asyncToGenerator" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/asyncToGenerator");

/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "pify":
/*!***********************!*\
  !*** external "pify" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("pify");

/***/ }),

/***/ "serverless-http":
/*!**********************************!*\
  !*** external "serverless-http" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("serverless-http");

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ })

/******/ })));
//# sourceMappingURL=index.js.map