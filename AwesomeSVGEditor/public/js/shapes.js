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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 44);
/******/ })
/************************************************************************/
/******/ ({

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(45);


/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rectangle", function() { return Rectangle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Circle", function() { return Circle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Line", function() { return Line; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pen", function() { return Pen; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import Line from './shapes/line';
// import Pen from './shapes/pen';
// import Rectangle from './shapes/rectangle';
// import Circle from './shapes/circle';

var Rectangle = function () {
  function Rectangle(canvas, posX, posY, width, height) {
    _classCallCheck(this, Rectangle);

    this.canvas = canvas;
    this.shape = this.canvas.draw.rect(width, height).stroke({ width: this.canvas.strokeWidth });
    this.shape.move(posX, posY);
    this.shape.fill(this.canvas.fillColor);
    this.shape.stroke(this.canvas.strokeColor);
    this.shape.mousedown(this.canvas.elementClick.bind(this.canvas));

    this.initialX = posX;
    this.initialY = posY;
  }

  _createClass(Rectangle, [{
    key: 'mouseMove',
    value: function mouseMove(e) {
      var relativePosX = e.pageX - $('#svgEditor').children().first().offset().left;
      var relativePosY = e.pageY - $('#svgEditor').children().first().offset().top;
      if (this.canvas.shiftKey) {
        if (Math.min(this.initialX, relativePosX) == this.initialX && Math.min(this.initialY, relativePosY) == this.initialY) // cadran bas droite
          {
            this.shape.move(this.initialX, this.initialY);
            this.shape.width(Math.min(relativePosX - this.initialX, relativePosY - this.initialY));
            this.shape.height(Math.min(relativePosX - this.initialX, relativePosY - this.initialY));
          } else if (Math.min(this.initialX, relativePosX) == this.initialX && Math.min(this.initialY, relativePosY) == relativePosY) // cadran haut droite
          {
            this.shape.move(this.initialX, relativePosY);
            this.shape.width(Math.min(relativePosX - this.initialX, this.initialY - relativePosY));
            this.shape.height(Math.min(relativePosX - this.initialX, this.initialY - relativePosY));
          } else if (Math.min(this.initialX, relativePosX) == relativePosX && Math.min(this.initialY, relativePosY) == this.initialY) // cadran bas gauche
          {
            this.shape.move(relativePosX, this.initialY);
            this.shape.width(Math.min(this.initialX - relativePosX, relativePosY - this.initialY));
            this.shape.height(Math.min(this.initialX - relativePosX, relativePosY - this.initialY));
          } else // cadran haut gauche
          {
            this.shape.move(relativePosX, relativePosY);
            this.shape.width(Math.min(this.initialX - relativePosX, this.initialY - relativePosY));
            this.shape.height(Math.min(this.initialX - relativePosX, this.initialY - relativePosY));
          }
      } else {
        if (Math.min(this.initialX, relativePosX) == this.initialX) {
          this.shape.move(this.initialX, this.shape.y());
          this.shape.width(relativePosX - this.initialX);
        } else {
          this.shape.move(relativePosX, this.shape.y());
          this.shape.width(this.initialX - relativePosX);
        }

        if (Math.min(this.initialY, relativePosY) == this.initialY) {
          this.shape.move(this.shape.x(), this.initialY);
          this.shape.height(relativePosY - this.initialY);
        } else {
          this.shape.move(this.shape.x(), relativePosY);
          this.shape.height(this.initialY - relativePosY);
        }
      }
    }
  }]);

  return Rectangle;
}();

var Circle = function () {
  function Circle(canvas, posX, posY, rx, ry) {
    _classCallCheck(this, Circle);

    this.canvas = canvas;
    this.shape = this.canvas.draw.ellipse(rx, ry).stroke({ width: this.canvas.strokeWidth });
    this.shape.move(posX, posY);
    this.shape.stroke(this.canvas.strokeColor);
    this.shape.fill(this.canvas.fillColor);
    this.shape.mousedown(this.canvas.elementClick.bind(this.canvas));
    this.initialX = posX;
    this.initialY = posY;
  }

  _createClass(Circle, [{
    key: 'mouseMove',
    value: function mouseMove(e) {
      var relativePosX = e.pageX - $('#svgEditor').children().first().offset().left;
      var relativePosY = e.pageY - $('#svgEditor').children().first().offset().top;

      if (this.canvas.shiftKey) {
        var r = Math.sqrt(Math.pow(Math.abs(relativePosX - this.initialX), 2) + Math.pow(Math.abs(relativePosY - this.initialY), 2));
        this.shape.radius(r);
      } else {
        var rX = Math.abs(relativePosX - this.initialX);
        var rY = Math.abs(relativePosY - this.initialY);
        this.shape.radius(rX, rY);
      }
    }
  }]);

  return Circle;
}();

var Line = function () {
  function Line(canvas, posX, posY, posX2, posY2) {
    _classCallCheck(this, Line);

    this.canvas = canvas;
    this.shape = this.canvas.draw.line(posX, posY, posX2, posY2).stroke({ width: this.canvas.strokeWidth });
    this.shape.stroke(this.canvas.strokeColor);
    this.shape.mousedown(this.canvas.elementClick.bind(this.canvas));
  }

  _createClass(Line, [{
    key: 'mouseMove',
    value: function mouseMove(e) {
      var x2 = this.shape.node.x2.baseVal.value;
      var y2 = this.shape.node.y2.baseVal.value;
      this.shape.plot(this.canvas.mouseX, this.canvas.mouseY, x2 + e.movementX, y2 + e.movementY);
    }
  }]);

  return Line;
}();

var Pen = function () {
  function Pen(canvas, posX, posY, posX2, posY2) {
    _classCallCheck(this, Pen);

    this.canvas = canvas;
    this.data = [[posX, posY], [posX2, posY2]];
    this.shape = this.canvas.draw.polyline(this.data).fill('none').stroke({ width: this.canvas.strokeWidth });
    this.shape.stroke(this.canvas.strokeColor);
    this.shape.mousedown(this.canvas.elementClick.bind(this.canvas));
  }

  _createClass(Pen, [{
    key: 'mouseMove',
    value: function mouseMove(e) {
      var relativePosX = e.pageX - $('#svgEditor').children().first().offset().left;
      var relativePosY = e.pageY - $('#svgEditor').children().first().offset().top;
      this.data.push([relativePosX, relativePosY]);
      this.shape.plot(this.data);
    }
  }]);

  return Pen;
}();

/***/ })

/******/ });