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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas__ = __webpack_require__(46);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



//Class to connect the interface with our canvas object

var EventManager = function () {
  function EventManager(canvas) {
    _classCallCheck(this, EventManager);

    this.canvas = canvas;
    this._connect();
  }

  _createClass(EventManager, [{
    key: 'showHelp',
    value: function showHelp() {
      $('#strokeWidth').popover('show');
      $('#pointer').popover('show');
      $('#pen').popover('show');
      $('#line').popover('show');
      $('#rectangle').popover('show');
      $('#ellipse').popover('show');
      $('#erase').popover('show');
      $('#fill-color, #color-mode').popover('show');
    }
  }, {
    key: 'hideHelp',
    value: function hideHelp() {
      $('#strokeWidth').popover('hide');
      $('#pointer').popover('hide');
      $('#pen').popover('hide');
      $('#line').popover('hide');
      $('#rectangle').popover('hide');
      $('#ellipse').popover('hide');
      $('#erase').popover('hide');
      $('#fill-color, #color-mode').popover('hide');
    }
  }, {
    key: '_connect',
    value: function _connect() {
      var canvas = this.canvas;

      $(document).keydown(function (e) {
        if (e.keyCode == 83 && e.ctrlKey) {
          e.preventDefault();
          $('#save').click();
        } else if (e.keyCode == 49) {
          $('#pointer').click();
        } else if (e.keyCode == 50) {
          $('#pen').click();
        } else if (e.keyCode == 51) {
          $('#line').click();
        } else if (e.keyCode == 52) {
          $('#rectangle').click();
        } else if (e.keyCode == 53) {
          $('#ellipse').click();
        } else if (e.keyCode == 54 || e.keyCode == 46) {
          $('#erase').click();
        } else if (e.keyCode == 112 && e.ctrlKey) {
          window.eventmanager.showHelp();
        } else if (e.keyCode == 112) {
          e.preventDefault();
          $('#helpModal').modal('toggle');
        }
      });

      $(document).keyup(function (e) {
        if (e.keyCode == 112 && e.ctrlKey) {
          window.eventmanager.hideHelp();
        }
      });

      //Paint mode
      $('#pointer').on('click', function () {
        $('#tools a').removeClass("active");
        $(this).addClass("active");
        canvas.startMoving();
      });

      $('#line').on('click', function () {
        $('#tools a').removeClass("active");
        $(this).addClass("active");
        canvas.dynAddLine();
      });

      $('#pen').on('click', function () {
        $('#tools a').removeClass("active");
        $(this).addClass("active");
        canvas.dynAddPolyLine();
      });

      $('#rectangle').on('click', function () {
        $('#tools a').removeClass("active");
        $(this).addClass("active");
        canvas.dynAddRectangle();
      });

      $('#ellipse').on('click', function () {
        $('#tools a').removeClass("active");
        $(this).addClass("active");
        canvas.dynAddCircle();
      });

      //Color picker
      $('#fill-color, #color-mode').on('click', function () {
        $('#color-mode').attr("xlink:href", "#fill-color");
      });
      $('#stroke-color').on('click', function () {
        $('#color-mode').attr("xlink:href", "#");
      });
      $('#fill-color, #color-mode').on("dblclick", function () {
        $('#fillColor').trigger("click");
      });
      $('#stroke-color').on("dblclick", function () {
        $('#strokeColor').trigger("click");
      });

      $('#fillColor').on('change', function () {
        var color = $('#fillColor')[0].value;
        $('.fill-color').attr("fill", color);
        canvas.setFillColor(color);
      });

      $('#strokeColor').on('change', function () {
        var color = $('#strokeColor')[0].value;
        $('.stroke-color').attr("fill", color);
        canvas.setStrokeColor(color);
      });

      //Eraser
      $('#erase').on('click', function () {
        $('#tools a').removeClass("active");
        $(this).addClass("active");
        canvas.startErase();
      });

      //Left side
      $('#strokeWidth').on('change', function () {
        var width = $('#strokeWidth')[0].value;
        if (width < 0) {
          width = 0;
          $('#strokeWidth')[0].value(0);
        }
        canvas.setStrokeWidth(width);
      });

      //Modals link
      $("#import").click(function (e) {
        e.preventDefault();
        $('#modal-import').modal('toggle');
      });

      $("#export").click(function (e) {
        e.preventDefault();
        var url = $('#png-link').attr('href');
        $('#svgEditor svg').removeAttr('xmlns:svgjs');
        $('#png-link').attr('href', url.slice(0, url.lastIndexOf("/") + 1) + btoa($('#svgEditor').html()));
        $('#svg-link').attr('href', url.slice(0, url.lastIndexOf("/") + 1) + btoa($('#svgEditor').html()));
        $('#modal-export').modal('toggle');
      });

      // Sends to the server.. The server can respond with binary data to download
      $.download = function (url, key, data) {
        // Build a form
        var form = $('<form></form>').attr('action', url).attr('method', 'post');
        // Add the one key/value
        form.append($("<input></input>").attr('type', 'hidden').attr('name', key).attr('value', data));
        //send request
        form.appendTo('body').submit().remove();
      };

      $('#png-link').on('click', function (e) {
        e.preventDefault();
        // Takes a URL, param name, and data string
        $.download("/png", 'code', $('#svgEditor').html());
      });

      $('#svg-link').on('click', function (e) {
        e.preventDefault();
        // Takes a URL, param name, and data string
        $.download("/svgd", 'code', $('#svgEditor').html());
      });

      //Modal events
      $("#import-new").click(function (e) {
        $('#modal-import').modal('toggle');
        if ($('#login').length) {
          toastr.error('You need to be logged in to use this function');
          $('#login').click();
        } else {
          window.eventmanager.import = "new";
          $("#fileinput").trigger('click');
          window.newTab = window.open('/canvas/create', '_blank');
        }
      });

      $("#import-saveopen").click(function (e) {
        $('#modal-import').modal('toggle');
        if ($('#login').length) {
          toastr.error('You need to be logged in to use this function');
          $('#login').click();
        } else {
          window.eventmanager.import = "saveopen";
          $("#fileinput").trigger('click');
        }
      });

      $("#import-discardopen").click(function (e) {
        $('#modal-import').modal('toggle');
        window.eventmanager.import = "discardopen";
        $("#fileinput").trigger('click');
      });

      $('#shareLink').click(function (e) {
        e.preventDefault();
        $('#modal-share').modal('toggle');
      });

      $('#share-btn').click(function (e) {
        var id = $('#id').val();
        var _token = $('input[name=_token]').val();
        $.ajax({
          type: 'post',
          url: '/canvas/' + id + '/share',
          responseType: 'json',
          data: {
            _token: _token
          },
          success: function success(msg) {
            if (msg.status == 'OK') {
              $('#div-unshare').removeClass('d-none');
              $('#div-share').addClass('d-none');
              $('#link-copy').attr('data-copy', msg.link);
              $('#input-copy').val(msg.link);
            } else {
              toastr.error('Error while getting share link');
            }
          },
          error: function error(msg) {
            toastr.error('Error while getting share link');
          }
        });
      });

      $('#unshare-btn').click(function (e) {
        var id = $('#id').val();
        var _token = $('input[name=_token]').val();
        $.ajax({
          type: 'post',
          url: '/canvas/' + id + '/unshare',
          responseType: 'json',
          data: {
            _token: _token
          },
          success: function success(msg) {
            if (msg.status == 'OK') {
              $('#div-share').removeClass('d-none');
              $('#div-unshare').addClass('d-none');
            } else {
              toastr.error('Error unsharing');
            }
          },
          error: function error(msg) {
            toastr.error('Error while unsharing');
          }
        });
      });

      $("#fileinput").change(function (e) {
        //source: https://stackoverflow.com/questions/32490959/filereader-on-input-change-jquery
        var f = e.target.files[0];
        if (f) {
          var r = new FileReader();
          r.readAsText(f);
          r.onload = function (e) {

            var importedSvg = e.target.result;
            var _token = $('input[name=_token]').val();

            $.ajax({
              type: "post",
              url: '/canvas/sanitise',
              data: {
                code: importedSvg,
                _token: _token
              },
              success: function success(msg) {
                if (msg.status == 'success') {
                  var existingSVG = $('#svgEditor svg');
                  var id = existingSVG.attr('id') || 'svgEditor';

                  switch (window.eventmanager.import) {
                    case "discardopen":
                      $('#svgEditor').html(importedSvg);

                      $('#app').find("*").addBack().off();

                      window.canvas = new __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */](id, $('#svgEditor svg').attr('width'), $('#svgEditor svg').attr('height'));

                      window.eventmanager = new EventManager(window.canvas);
                      $("#fileinput").val("");
                      break;

                    case "saveopen":
                      window.eventmanager.save();
                      $('#name-canvas').val($('#name-canvas').val() + "v2");
                      $('#navbar-title').text($('#name-canvas').val());
                      $('#id').val(-1);

                      $('#svgEditor').html(importedSvg);
                      var _existingSVG = $('#svgEditor svg');
                      $('#app').find("*").addBack().off();

                      window.canvas = new __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */](id, $('#svgEditor svg').attr('width'), $('#svgEditor svg').attr('height'));

                      window.eventmanager = new EventManager(window.canvas);
                      $("#fileinput").val("");
                      break;

                    case "new":
                      window.eventmanager.saveNewTab(importedSvg);
                      break;
                  }
                } else {
                  toastr.error('Your imported .svg file is not valid');
                }
              },
              error: function error(msg) {
                toastr.error('Your imported .svg file is not valid');
              }
            });
          };
        } else {
          console.log("failed");
        }
      });

      $('#save-modal').on('click', function () {
        var title = $('#name-modal').val();
        $('#name-canvas').val(title);
        $('#navbar-title').text(title);
        $('#modal-title').modal('toggle');
      });

      $('#title-edit').click(function (e) {
        e.preventDefault();
        $('#modal-title').modal('toggle');
      });

      $('#menuRedo').click(function (e) {
        e.preventDefault();
        window.canvas.redo();
      });

      $('#menuUndo').click(function (e) {
        e.preventDefault();
        window.canvas.undo();
      });

      $("label[for='visibility']").on('click', function (e) {
        $('#visibility').click();
        return false;
      });

      //Load preconfigure colors and width
      $('#fillColor').trigger('change');
      $('#strokeColor').trigger('change');
      $('#strokeWidth').trigger('change');

      //Open login and register modal
      $('#register').on('click', function (e) {
        $('#authTab a[href="#tab-register"]').tab('show');
        $('#modal-auth').modal('toggle');
      });
      $('#login').on('click', function () {
        $('#authTab a[href="#tab-login"]').tab('show');
        $('#modal-auth').modal('toggle');
      });

      //Save button
      $('#save').on('click', function () {
        if ($('#login').length) {
          toastr.error('You need to be logged in to save your canvas');
          $('#login').click();
        } else {
          window.eventmanager.save();
        }
      });

      //Loggin button
      var authReload = function authReload() {
        console.log("reload !!!");
        $('#svgEditor svg').removeAttr('xmlns:svgjs'); //Delete duplicated attribute
        var detached = $('#svgEditor').find(':hidden').detach();
        $('#code').val($('#svgEditor').html());

        $('#svgEditor svg').append(detached);
        $('#form-update').submit();
      };

      $('#btn-login').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var email = $('#login-form #email-login').val();
        var password = $('#login-form #password-login').val();
        var _token = $('#login-form input[name=_token]').val();

        $.ajax({
          type: "post",
          url: '/login',
          responseType: 'json',
          data: {
            email: email,
            password: password,
            _token: _token
          },
          success: function success(msg) {
            console.log("connected");
            console.log(msg);
            authReload();
          },
          error: function error(msg) {
            toastr.error('Error while login');
          }
        });
      });
      $('#btn-register').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var email = $('#register-form #email').val();
        var name = $('#register-form #name').val();
        var password = $('#register-form #password').val();
        var password_confirmation = $('#register-form #password-confirm').val();
        var _token = $('#register-form input[name=_token]').val();
        $.ajax({
          type: "post",
          url: '/register',
          responseType: 'json',
          data: {
            email: email,
            name: name,
            password: password,
            password_confirmation: password_confirmation,
            _token: _token
          },
          success: function success(msg) {
            authReload();
          },
          error: function error(msg) {
            toastr.error('Error while register');
          }
        });
      });

      //source: https://www.htmlgoodies.com/html5/javascript/drag-files-into-the-browser-from-the-desktop-using-jquery-event-binding.html
      $('#svgEditor').on({
        'dragover dragenter': function dragoverDragenter(e) {
          e.preventDefault();
          e.stopPropagation();
        },
        'drop': function drop(e) {
          var dataTransfer = e.originalEvent.dataTransfer;
          if (dataTransfer && dataTransfer.files.length) {
            e.preventDefault();
            e.stopPropagation();

            if (dataTransfer.files.length == 1) {
              if ($('#login').length) {
                toastr.error('You need to be logged in to save your canvas');
                $('#login').click();
              } else {
                window.newTab = window.open('/canvas/create', '_blank');
                var reader = new FileReader();
                reader.readAsText(dataTransfer.files[0]);
                reader.onload = function (e) {
                  var importedSvg = e.target.result;
                  var _token = $('input[name=_token]').val();

                  $.ajax({
                    type: "post",
                    url: '/canvas/sanitise',
                    data: {
                      code: importedSvg,
                      _token: _token
                    },
                    success: function success(msg) {
                      if (msg.status == 'success') {
                        window.eventmanager.saveNewTab(importedSvg);
                      } else {
                        toastr.error('Your imported .svg file is not valid');
                      }
                    },
                    error: function error(msg) {
                      toastr.error('Your imported .svg file is not valid');
                    }
                  });
                };
              }
            }
          }
        }
      });
    }
  }, {
    key: 'saveNewTab',
    value: function saveNewTab(code) {
      var name = "locally imported Canvas";
      var id = 0;
      var visibility = $('#visibility').prop('checked') ? 1 : 0; // Convert true/false in integer
      var _token = $('input[name=_token]').val();

      //new Canvas:
      $.ajax({
        type: "post",
        url: '/canvas',
        responseType: 'json',
        xhrFields: {
          withCredentials: true
        },
        data: {
          name: name,
          code: code,
          id: id,
          _token: _token,
          visibility: visibility
        },
        success: function success(msg) {
          if (msg.status == 'success') {
            toastr.success('Canvas imported successfully!');
            window.newTab.location.href = "/canvas/" + msg.id + "/edit";
          } else {
            toastr.error('Canvas error while importing');
          }
        },
        error: function error(msg) {
          toastr.error('Canvas error while importing');
        }
      });
    }
  }, {
    key: 'save',
    value: function save() {
      canvas.unselect();
      canvas.draw.defs().remove();
      $('#svgEditor svg').removeAttr('xmlns:svgjs'); //Delete an duplicated attribute
      var detached = $('#svgEditor').find(':hidden').detach();
      $('#code').val($('#svgEditor').html());
      $('#svgEditor svg').append(detached);

      var name = $('#name-canvas').val();
      var code = $('#code').val();
      var id = $('#id').val();
      var visibility = $('#visibility').prop('checked') ? 1 : 0; // Convert true/false in integer

      var _token = $('input[name=_token]').val();

      if (!name) {
        $('#modal-title').modal('toggle');
        name = $('#name-canvas').val();
        if (!name) {
          return;
        }
      }
      //new Canvas:
      if (!id || id <= 0) {
        $('#id').val(0);
        $.ajax({
          type: "post",
          url: '/canvas',
          responseType: 'json',
          xhrFields: {
            withCredentials: true
          },
          data: {
            name: name,
            code: code,
            id: id,
            _token: _token,
            visibility: visibility
          },
          success: function success(msg) {
            if (msg.status == 'success') {
              toastr.success('Canvas saved successfully!');
              if ($('#id').val() == 0) {
                $('#id').val(msg.id);
                $('#svg-link').attr('href', '/canvas/' + msg.id + '/svg');
                $('#png-link').attr('href', '/canvas/' + msg.id + '/png');
                $('#div-notshare').addClass('d-none');
                $('#div-share').removeClass('d-none');
              }
            } else {
              toastr.error('Canvas error while saving');
            }
          },
          error: function error(msg) {
            toastr.error('Canvas error while saving, are you logged in?');
          }
        });
      } else {
        $.ajax({
          type: "put",
          url: '/canvas/' + id,
          responseType: 'json',
          xhrFields: {
            withCredentials: true
          },
          data: {
            name: name,
            code: code,
            id: id,
            _token: _token,
            visibility: visibility
          },
          success: function success(msg) {
            if (msg.status == 'success') {
              toastr.success('Canvas updated successfully!');
            } else {
              toastr.error('Canvas error while updating');
            }
          },
          error: function error(msg) {
            toastr.error('Canvas error while updating');
          }
        });
      }
    }
  }]);

  return EventManager;
}();

$(document).ready(function () {
  toastr.options.positionClass = "toast-top-center";

  $('#svgEditor').html($('#code').val());
  var existingSVG = $('#svgEditor svg');

  //Automatically scale canvas size to window
  var width = $('#svgEditor').width() - 10;
  var height = $('#svgEditor').height() - 10;

  //If it bugged:
  if (width < 0) width = 900;
  if (height < 0) height = 600;

  if ($('#code').val() != "") {
    width = existingSVG.attr('width');
    height = existingSVG.attr('height');
  }

  var id = existingSVG.attr('id') || 'svgEditor';

  window.canvas = new __WEBPACK_IMPORTED_MODULE_0__canvas__["a" /* default */](id, width, height);
  window.eventmanager = new EventManager(window.canvas);

  var name = $('#name-canvas').val();
  if (!name) {
    $('#modal-title').modal('toggle');
  }

  $('#strokeWidth').popover({
    trigger: 'hover',
    content: "Stroke width in pixels"
  });
  $('#pointer').popover({
    trigger: 'hover',
    content: "[1] Pointer tool: select shape to move/resize"
  });
  $('#pen').popover({
    trigger: 'hover',
    content: "[2] Free draw tool"
  });
  $('#line').popover({
    trigger: 'hover',
    content: "[3] Line draw tool"
  });
  $('#rectangle').popover({
    trigger: 'hover',
    content: "[4] Rectangle draw tool, press shift while drawing to draw a square"
  });
  $('#ellipse').popover({
    trigger: 'hover',
    content: "[5] Ellipse draw tool, press shift while drawing to draw a circle"
  });
  $('#erase').popover({
    trigger: 'hover',
    content: "[6]/[Delete] Erase tool: click on a shape to erase it"
  });
  $('#fill-color, #color-mode').popover({
    trigger: 'hover',
    content: "Select shape fill color"
  });
  $('#stroke-color').popover({
    trigger: 'hover',
    content: "Select shape stroke color"
  });
});

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapes__ = __webpack_require__(47);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var options = ['x', 'y', 'width', 'height', 'x1', 'y1', 'x2', 'y2', 'colorFill', 'colorStroke', 'strokeWidthDiv', 'backward', 'forward'];
var optionsType = {
  'svg': ['width', 'height'],
  'rect': ['x', 'y', 'width', 'height', 'strokeWidthDiv', 'colorFill', 'colorStroke', 'backward', 'forward'],
  'ellipse': ['x', 'y', 'width', 'height', 'colorFill', 'strokeWidthDiv', 'colorStroke', 'backward', 'forward'],
  'polyline': ['colorStroke', 'strokeWidthDiv', 'x', 'y', 'width', 'height', 'backward', 'forward'],
  'line': ['x1', 'y1', 'x2', 'y2', 'strokeWidthDiv', 'colorStroke', 'backward', 'forward']
};

var Canvas = function () {
  function Canvas(divId, width, height) {
    _classCallCheck(this, Canvas);

    this.type = "svg";

    this.draw = SVG(divId).viewbox(0, 0, width, height).attr({
      width: width,
      height: height
    });

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

    this.mode = this.modesEnum.pointer;
    this.shape = null;
    this.optionShape = null;

    this.fillColor = '#f00';
    this.strokeColor = '#0f0';
    this.strokeWidth = 1;

    this.mouseX = 0;
    this.mouseY = 0;

    this.draw.mouseup(this.mouseUp.bind(this)); //bind(this) -> necessary to access this
    this.draw.mousemove(this.mouseMove.bind(this));
    this.draw.mousedown(this.mouseDown.bind(this));

    var canvas = this;

    this.draw.on('zoom', function (ev) {
      $('#zoom').val(canvas.draw.zoom() * 2);
    });

    $("#" + divId).mousedown(function (e) {
      if (e.target.nodeName == "svg") {
        canvas.manageOption(canvas);
        canvas.unselect();
      }
    });

    $('#zoom').on('change', function () {
      canvas.updateZoom();
    });

    //Ces 3 fonctions doivent rester dans le constructeur car nous devons les binder avec l'élément à modifier en leur passant canvas
    this.stopDraggable = function () {
      this.draggable(false);
    };
    this.unselectAll = function () {
      if (this.type != 'defs' && this.type != 'g' && canvas.shape != this) {
        this.selectize(false);
      }
    };
    this.startDraggable = function () {
      if (this.type != "defs") {
        this.draggable().on('beforedrag', function (e) {
          this.drag_start = [this.x(), this.y()];
        }).on('dragend', function (e) {
          if (this.drag_start[0] != this.x() || this.drag_start[1] != this.y()) {
            canvas.actions[canvas.actionIndex] = [canvas.modesEnum.pointer, this, this.drag_start[0], this.drag_start[1], this.x(), this.y()];
            canvas.actionIndex++;
            canvas.actions.splice(canvas.actionIndex, canvas.actions.length - canvas.actionIndex + 1);
            canvas.manageOption(this);
          }
        }).on('resizedone', function (e) {
          canvas.manageOption(this);
        });
        this.mousedown(canvas.elementClick.bind(canvas));
      }
    };

    this.draw.each(this.startDraggable);
    this.shiftKey = false;

    $(document).keydown(function (e) {
      if (e.which == 16) {
        canvas.shiftKey = true;
      }
      if (e.keyCode == 90 && e.ctrlKey && e.shiftKey || e.keyCode == 89 && e.ctrlKey) {
        canvas.redo();
      } else if (e.keyCode == 90 && e.ctrlKey) {
        canvas.undo();
      }
    });

    $(document).keyup(function (e) {
      if (e.which == 16) {
        canvas.shiftKey = false;
      }
    });

    //Init connections for the right menu

    var _loop = function _loop(option) {
      $('#' + options[option]).on('change', function () {
        var isCanvas = false;
        var optionCanvas = void 0;

        if (canvas.optionShape.type == "svg") {
          optionCanvas = canvas.optionShape;
          isCanvas = true;
        }
        switch (options[option]) {
          case "width":
            if (isCanvas) {
              optionCanvas.viewbox(0, 0, $("#widthVal").val(), $("#heightVal").val());
              optionCanvas.width($('#' + options[option] + "Val").val());
            } else {
              canvas.optionShape.width($('#' + options[option] + "Val").val());
            }
            break;
          case "height":
            if (isCanvas) {
              optionCanvas.viewbox(0, 0, $("#widthVal").val(), $("#heightVal").val());
              optionCanvas.height($('#' + options[option] + "Val").val());
            } else {
              canvas.optionShape.height($('#' + options[option] + "Val").val());
            }
            break;
          case "x":
            canvas.optionShape.x($('#' + options[option] + "Val").val());
            break;
          case "y":
            canvas.optionShape.y($('#' + options[option] + "Val").val());
            break;
          case "x1":
            canvas.optionShape.x1($('#' + options[option] + "Val").val());
            break;
          case "y1":
            canvas.optionShape.y1($('#' + options[option] + "Val").val());
            break;
          case "x2":
            canvas.optionShape.x2($('#' + options[option] + "Val").val());
            break;
          case "y2":
            canvas.optionShape.y2($('#' + options[option] + "Val").val());
            break;
          case "colorStroke":
            canvas.optionShape.stroke($('#colorStrokeVal')[0].value);
            break;
          case "colorFill":
            canvas.optionShape.fill($('#colorFillVal')[0].value);
            break;
          case "strokeWidthDiv":
            canvas.optionShape.attr('stroke-width', $('#' + options[option] + "Val").val());
            break;
        }
      });

      $('#' + options[option]).on('click', function () {
        switch (options[option]) {
          case "forward":
            canvas.optionShape.forward();
            break;
          case "backward":
            canvas.optionShape.backward();
            break;
        }
      });
    };

    for (var option in options) {
      _loop(option);
    }
    this.manageOption(this);
  }

  _createClass(Canvas, [{
    key: 'manageOption',
    value: function manageOption(object) {
      this.optionShape = object;
      if (this.optionShape.type == "svg") {
        this.optionShape = this.optionShape.draw;
      }
      for (var option in options) {
        $('#' + options[option]).hide();
      }
      $('#option-select').text(object.type);
      for (var _option in optionsType[object.type]) {
        $('#' + optionsType[object.type][_option]).show();

        switch (optionsType[object.type][_option]) {
          case "width":
            $('#' + optionsType[object.type][_option] + "Val").val(this.optionShape.width());
            break;
          case "height":
            $('#' + optionsType[object.type][_option] + "Val").val(this.optionShape.height());
            break;
          case "x":
            $('#' + optionsType[object.type][_option] + "Val").val(this.optionShape.x());
            break;
          case "y":
            $('#' + optionsType[object.type][_option] + "Val").val(this.optionShape.y());
            break;
          case "x1":
            $('#' + optionsType[object.type][_option] + "Val").val(this.optionShape.attr('x1'));
            break;
          case "y1":
            $('#' + optionsType[object.type][_option] + "Val").val(this.optionShape.attr('y1'));
            break;
          case "x2":
            $('#' + optionsType[object.type][_option] + "Val").val(this.optionShape.attr('x2'));
            break;
          case "y2":
            $('#' + optionsType[object.type][_option] + "Val").val(this.optionShape.attr('y2'));
            break;
          case "colorStroke":
            $('#' + optionsType[object.type][_option] + "Val").val(this.optionShape.attr('stroke'));
            break;
          case "colorFill":
            $('#' + optionsType[object.type][_option] + "Val").val(this.optionShape.attr('fill'));
            break;
          case "strokeWidthDiv":
            $('#' + optionsType[object.type][_option] + "Val").val(this.optionShape.attr('stroke-width'));
            break;
        }
      }
      $('#option-select').html(object.type);
    }
  }, {
    key: 'undo',
    value: function undo() {
      this.unselect();
      this.manageOption(this);
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
    key: 'redo',
    value: function redo() {
      if (this.actionIndex < this.actions.length) {
        switch (this.actions[this.actionIndex][0]) {
          case this.modesEnum.pointer:
            this.actions[this.actionIndex][1].move(this.actions[this.actionIndex][4], this.actions[this.actionIndex][5]);
            break;
          case this.modesEnum.pen:
          case this.modesEnum.line:
          case this.modesEnum.rectangle:
          case this.modesEnum.circle:
            this.actions[this.actionIndex][1].shape.show();
            this.manageOption(this.actions[this.actionIndex][1].shape);
            break;
          case this.modesEnum.erase:
            this.actions[this.actionIndex][1].hide();
            break;
        }
        this.actionIndex++;
      }
    }
  }, {
    key: 'elementClick',
    value: function elementClick(e) {
      e.preventDefault();

      var event = e.target || e.srcElement;
      if (this.mode == this.modesEnum.erase) {
        event.instance.hide();

        this.actions[this.actionIndex] = [this.modesEnum.erase, event.instance];
        this.actionIndex++;
        this.actions.splice(this.actionIndex, this.actions.length - this.actionIndex + 1);
      } else if (this.mode == this.modesEnum.pointer) {

        this.shape = event.instance;
        this.draw.each(this.unselectAll);
        this.manageOption(this.shape);
        this.shape.selectize().resize();
      }
    }
  }, {
    key: 'unselect',
    value: function unselect() {
      this.draw.each(function () {
        if (this.type != 'defs' && this.type != 'g') {
          this.selectize(false);
        }
      });
    }
  }, {
    key: 'mouseUp',
    value: function mouseUp(e) {
      e.preventDefault();
      if (this.mode == this.modesEnum.pointer) {
        this.shape = null;
      } else if (this.mode > this.modesEnum.erase && this.shape != null) {
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
        this.manageOption(this.shape.shape);
        this.shape = null;
      }
    }
  }, {
    key: 'mouseMove',
    value: function mouseMove(e) {
      e.preventDefault();

      var relativePosX = e.pageX - $('#svgEditor').children().first().offset().left;
      var relativePosY = e.pageY - $('#svgEditor').children().first().offset().top;
      var box = this.draw.viewbox();
      var zoom = box.zoom;
      relativePosX /= zoom;
      relativePosY /= zoom;
      if (this.shape != null && this.mode > this.modesEnum.erase) {
        this.shape.mouseMove(e);
      } else {
        this.mouseX = relativePosX;
        this.mouseY = relativePosY;
      }
    }
  }, {
    key: 'mouseDown',
    value: function mouseDown() {
      switch (this.mode) {
        case this.modesEnum.rectangle:
          this.shape = new __WEBPACK_IMPORTED_MODULE_0__shapes__["d" /* Rectangle */](this, this.mouseX, this.mouseY, 1, 1);
          break;
        case this.modesEnum.pen:
          this.shape = new __WEBPACK_IMPORTED_MODULE_0__shapes__["c" /* Pen */](this, this.mouseX, this.mouseY, this.mouseX + 1, this.mouseY + 1);
          break;
        case this.modesEnum.line:
          this.shape = new __WEBPACK_IMPORTED_MODULE_0__shapes__["b" /* Line */](this, this.mouseX, this.mouseY, this.mouseX + 1, this.mouseY + 1);
          break;
        case this.modesEnum.circle:
          this.shape = new __WEBPACK_IMPORTED_MODULE_0__shapes__["a" /* Circle */](this, this.mouseX, this.mouseY, 1, 1);
          break;
      }
      if (this.mode > this.modesEnum.erase) {
        this.shape.shape.mousedown(canvas.elementClick.bind(canvas));
      }
    }
  }, {
    key: 'startMoving',
    value: function startMoving() {
      this.mode = this.modesEnum.pointer;
      this.draw.each(this.startDraggable);
    }
  }, {
    key: 'dynAddRectangle',
    value: function dynAddRectangle() {
      this.shape = null;
      this.unselect();
      this.mode = this.modesEnum.rectangle;
      this.draw.each(this.stopDraggable);
    }
  }, {
    key: 'dynAddLine',
    value: function dynAddLine() {
      this.shape = null;
      this.unselect();
      this.mode = this.modesEnum.line;
      this.draw.each(this.stopDraggable);
    }
  }, {
    key: 'dynAddPolyLine',
    value: function dynAddPolyLine() {
      this.shape = null;
      this.unselect();
      this.mode = this.modesEnum.pen;
      this.draw.each(this.stopDraggable);
    }
  }, {
    key: 'dynAddCircle',
    value: function dynAddCircle() {
      this.shape = null;
      this.unselect();
      this.mode = this.modesEnum.circle;
      this.draw.each(this.stopDraggable);
    }
  }, {
    key: 'startErase',
    value: function startErase() {
      this.shape = null;
      this.unselect();
      this.mode = this.modesEnum.erase;
      this.draw.each(this.stopDraggable);
    }
  }, {
    key: 'setFillColor',
    value: function setFillColor(color) //color format: string: '#RGB' R,G and B from '0' to 'F'
    {
      this.fillColor = color;
    }
  }, {
    key: 'setStrokeColor',
    value: function setStrokeColor(color) //color format: string: '#RGB' R,G and B from '0' to 'F'
    {
      this.strokeColor = color;
    }
  }, {
    key: 'setStrokeWidth',
    value: function setStrokeWidth(width) {
      this.strokeWidth = width;
    }
  }]);

  return Canvas;
}();

/* harmony default export */ __webpack_exports__["a"] = (Canvas);

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Rectangle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Circle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Line; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Pen; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = function () {
  function Rectangle(canvas, posX, posY, width, height) {
    _classCallCheck(this, Rectangle);

    this.type = "rect";
    this.action;
    this.canvas = canvas;
    this.shape = this.canvas.draw.rect(width, height).stroke({
      width: this.canvas.strokeWidth
    });
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
      var box = this.canvas.draw.viewbox();
      var zoom = box.zoom;
      relativePosX /= zoom;
      relativePosY /= zoom;
      if (this.canvas.shiftKey) {
        if (Math.min(this.initialX, relativePosX) == this.initialX && Math.min(this.initialY, relativePosY) == this.initialY) // down-right
          {
            this.shape.move(this.initialX, this.initialY);
            this.shape.width(Math.min(relativePosX - this.initialX, relativePosY - this.initialY));
            this.shape.height(Math.min(relativePosX - this.initialX, relativePosY - this.initialY));
          } else if (Math.min(this.initialX, relativePosX) == this.initialX && Math.min(this.initialY, relativePosY) == relativePosY) // up-right
          {
            this.shape.move(this.initialX, relativePosY);
            this.shape.width(Math.min(relativePosX - this.initialX, this.initialY - relativePosY));
            this.shape.height(Math.min(relativePosX - this.initialX, this.initialY - relativePosY));
          } else if (Math.min(this.initialX, relativePosX) == relativePosX && Math.min(this.initialY, relativePosY) == this.initialY) // down-left
          {
            this.shape.move(relativePosX, this.initialY);
            this.shape.width(Math.min(this.initialX - relativePosX, relativePosY - this.initialY));
            this.shape.height(Math.min(this.initialX - relativePosX, relativePosY - this.initialY));
          } else // up-left
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

    this.type = "ellipse";
    this.canvas = canvas;
    this.shape = this.canvas.draw.ellipse(rx, ry).stroke({
      width: this.canvas.strokeWidth
    });
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
      var box = this.canvas.draw.viewbox();
      var zoom = box.zoom;
      relativePosX /= zoom;
      relativePosY /= zoom;

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

    this.type = "line";
    this.canvas = canvas;
    this.shape = this.canvas.draw.line(posX, posY, posX2, posY2).stroke({
      width: this.canvas.strokeWidth
    });
    this.shape.stroke(this.canvas.strokeColor);
    this.shape.mousedown(this.canvas.elementClick.bind(this.canvas));
  }

  _createClass(Line, [{
    key: 'mouseMove',
    value: function mouseMove(e) {
      var relativePosX = e.pageX - $('#svgEditor').children().first().offset().left;
      var relativePosY = e.pageY - $('#svgEditor').children().first().offset().top;
      var box = this.canvas.draw.viewbox();
      var zoom = box.zoom;
      this.shape.plot(this.canvas.mouseX, this.canvas.mouseY, relativePosX / zoom, relativePosY / zoom);
    }
  }]);

  return Line;
}();

var Pen = function () {
  function Pen(canvas, posX, posY, posX2, posY2) {
    _classCallCheck(this, Pen);

    this.type = "polyline";
    this.canvas = canvas;
    this.data = [[posX, posY], [posX2, posY2]];
    this.shape = this.canvas.draw.polyline(this.data).fill('none').stroke({
      width: this.canvas.strokeWidth
    });
    this.shape.stroke(this.canvas.strokeColor);
    this.shape.mousedown(this.canvas.elementClick.bind(this.canvas));
  }

  _createClass(Pen, [{
    key: 'mouseMove',
    value: function mouseMove(e) {
      var relativePosX = e.pageX - $('#svgEditor').children().first().offset().left;
      var relativePosY = e.pageY - $('#svgEditor').children().first().offset().top;
      var box = this.canvas.draw.viewbox();
      var zoom = box.zoom;
      relativePosX /= zoom;
      relativePosY /= zoom;
      this.data.push([relativePosX, relativePosY]);
      this.shape.plot(this.data);
    }
  }]);

  return Pen;
}();

/***/ })

/******/ });