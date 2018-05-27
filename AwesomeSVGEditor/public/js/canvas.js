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
/******/ 	return __webpack_require__(__webpack_require__.s = 46);
/******/ })
/************************************************************************/
/******/ ({

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(47);


/***/ }),

/***/ 47:
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Canvas = function () {
  function Canvas(divId, width, height) {
    _classCallCheck(this, Canvas);

    this.draw = SVG(divId).size(width, height);

    this.actions = [];
    this.actionIndex = 0;

    this.modesEnum = Object.freeze({
      "pointer": 0,
      "erase": 1,
      "pen": 2,
      "line": 3,
      "rectangle": 4,
      "circle": 5
    });

    this.isMoving = false;

    this.mode = this.modesEnum.pointer;

    this.shape = null;

    this.fillColor = '#000';
    this.strokeColor = '#000';
    this.strokeWidth = 1;

    this.mouseX = 0;
    this.mouseY = 0;

    this.draw.mouseup(this.mouseUp.bind(this)); //bind(this) -> necessary to access this
    this.draw.mousemove(this.mouseMove.bind(this));
    this.draw.mousedown(this.mouseDown.bind(this));

    var selfCanvas = this; //désolé de nouveau, mais fallait que j'y accéde depuis un callback du eventManager
    var importFunction = function importFunction() {
      //à revoir pour les groupes svg
      if (this.type != "defs") {
        if (this.type == "svg") {
          this.each(importFunction);
        } else {
          this.mousedown(selfCanvas.elementClick.bind(selfCanvas));
        }
      }
    };

    this.draw.each(importFunction);

    this.shiftKey = false;

    $(document).keydown(function (e) {
      if (e.which == 16) {
        selfCanvas.shiftKey = true;
      }
      if (e.keyCode == 90 && e.ctrlKey && e.shiftKey || e.keyCode == 89 && e.ctrlKey) selfCanvas.redo();else if (e.keyCode == 90 && e.ctrlKey) selfCanvas.undo();
    });

    $(document).keyup(function (e) {
      if (e.which == 16) {
        selfCanvas.shiftKey = false;
      }
    });
  }

  _createClass(Canvas, [{
    key: "undo",
    value: function undo() {
      if (this.actionIndex > 0) {
        this.actionIndex--;
        switch (this.actions[this.actionIndex][0]) {
          case this.modesEnum.pointer:
            this.actions[this.actionIndex][1].move(this.actions[this.actionIndex][2], this.actions[this.actionIndex][3]);
            break;
          case this.modesEnum.pen:
          case this.modesEnum.line:
          case this.modesEnum.rectangle:
          case this.modesEnum.circle:
            this.actions[this.actionIndex][1].shape.hide();
            break;
          case this.modesEnum.erase:
            this.actions[this.actionIndex][1].show();
            break;
        }
      }
    }
  }, {
    key: "redo",
    value: function redo() {
      if (this.actionIndex < this.actions.length) {
        switch (this.actions[this.actionIndex][0]) {
          case this.modesEnum.pointer:
            this.actions[this.actionIndex][1].move(this.actions[this.actionIndex][2], this.actions[this.actionIndex][3]);
            break;
          case this.modesEnum.pen:
          case this.modesEnum.line:
          case this.modesEnum.rectangle:
          case this.modesEnum.circle:
            this.actions[this.actionIndex][1].shape.show();
            break;
          case this.modesEnum.erase:
            this.actions[this.actionIndex][1].hide();
            break;
        }
        this.actionIndex++;
      }
    }
  }, {
    key: "elementClick",
    value: function elementClick(e) {
      e.preventDefault();
      var event = e.target || e.srcElement;
      if (this.mode == this.modesEnum.erase) {
        this.actions[this.actionIndex] = [this.modesEnum.erase, event.instance];
        event.instance.hide();
        this.erase = false;
        this.actionIndex++;
        this.actions.splice(this.actionIndex, this.actions.length - this.actionIndex + 1);
      } else if (this.mode == this.modesEnum.pointer) {
        this.isMoving = true;
        this.shape = event.instance;

        this.actions[this.actionIndex] = [this.modesEnum.pointer, this.shape, this.shape.x(), this.shape.y()];
        this.actionIndex++;
        this.actions.splice(this.actionIndex, this.actions.length - this.actionIndex + 1);
      }
    }
  }, {
    key: "mouseUp",
    value: function mouseUp(e) {
      e.preventDefault();
      if (this.mode == this.modesEnum.pointer) {
        this.isMoving = false;
        if (this.shape != null) this.actions[this.actionIndex] = [this.modesEnum.pointer, this.shape, this.shape.x(), this.shape.y()];
        this.shape = null;
      } else if (this.mode > this.modesEnum.erase) {
        switch (this.mode) {
          case this.modesEnum.pen:
            this.actions[this.actionIndex] = [this.modesEnum.pen, this.shape];
            break;
          case this.modesEnum.line:
            this.actions[this.actionIndex] = [this.modesEnum.line, this.shape];
            break;
          case this.modesEnum.rectangle:
            this.actions[this.actionIndex] = [this.modesEnum.rectangle, this.shape];
            break;
          case this.modesEnum.circle:
            this.actions[this.actionIndex] = [this.modesEnum.circle, this.shape];
            break;
        }
        this.actionIndex++;
        this.actions.splice(this.actionIndex, this.actions.length - this.actionIndex + 1);
        this.isDynAdding = false;
        this.shape = null;
      }
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      e.preventDefault();
      var relativePosX = e.pageX - $('#svgEditor').children().first().offset().left;
      var relativePosY = e.pageY - $('#svgEditor').children().first().offset().top;
      if (this.isMoving) //if clicked on element (move mode)
        {
          this.shape.move(relativePosX - this.shape.width() / 2, relativePosY - this.shape.height() / 2);
        } else if (this.shape != null) //dyn Adding
        {
          this.shape.mouseMove(e);
        } else {
        this.mouseX = relativePosX;
        this.mouseY = relativePosY;
      }
    }
  }, {
    key: "mouseDown",
    value: function mouseDown() {
      switch (this.mode) {
        case this.modesEnum.rectangle:
          this.shape = new Rectangle(this, this.mouseX, this.mouseY, 1, 1);
          break;
        case this.modesEnum.pen:
          this.shape = new Pen(this, this.mouseX, this.mouseY, this.mouseX + 1, this.mouseY + 1);
          break;
        case this.modesEnum.line:
          this.shape = new Line(this, this.mouseX, this.mouseY, this.mouseX + 1, this.mouseY + 1);
          break;
        case this.modesEnum.circle:
          this.shape = new Circle(this, this.mouseX, this.mouseY, 1, 1);
          break;
      }
    }
  }, {
    key: "startMoving",
    value: function startMoving() {
      this.mode = this.modesEnum.pointer;
    }
  }, {
    key: "dynAddRectangle",
    value: function dynAddRectangle() {
      this.mode = this.modesEnum.rectangle;
    }
  }, {
    key: "dynAddLine",
    value: function dynAddLine() {
      this.mode = this.modesEnum.line;
    }
  }, {
    key: "dynAddPolyLine",
    value: function dynAddPolyLine() {
      this.mode = this.modesEnum.pen;
    }
  }, {
    key: "dynAddCircle",
    value: function dynAddCircle() {
      this.mode = this.modesEnum.circle;
    }
  }, {
    key: "startErase",
    value: function startErase() {
      this.mode = this.modesEnum.erase;
    }
  }, {
    key: "setFillColor",
    value: function setFillColor(color) //color format: string: '#RGB' R,G and B from '0' to 'F'
    {
      this.fillColor = color;
    }
  }, {
    key: "setStrokeColor",
    value: function setStrokeColor(color) //color format: string: '#RGB' R,G and B from '0' to 'F'
    {
      this.strokeColor = color;
    }
  }, {
    key: "setStrokeWidth",
    value: function setStrokeWidth(width) {
      this.strokeWidth = width;
    }
  }]);

  return Canvas;
}();

/***/ })

/******/ });