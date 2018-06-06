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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__canvas__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



//Class to connect the interface with our canvas object

var EventManager = function () {
  function EventManager(canvas) {
    _classCallCheck(this, EventManager);

    this.canvas = canvas;
    this.save = function () {
      canvas.unselect();
      canvas.draw.defs().remove();
      $('#svgEditor svg').removeAttr('xmlns:svgjs'); //Suppression d'un attribut qui est dupliqué
      var detached = $('#svgEditor').find(':hidden').detach();
      $('#code').val($('#svgEditor').html()); // TODO ne pas passer par l'élément DOM
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
          xhrFields: { withCredentials: true },
          data: { name: name, code: code, id: id, _token: _token, visibility: visibility },
          success: function success(msg) {
            if (msg.status == 'success') {
              toastr.success('Canvas saved successfully!');
              if ($('#id').val() == 0) {
                $('#id').val(msg.id);
                $('#svg-link').attr('href', '/canvas/' + msg.id + '/svg');
                $('#png-link').attr('href', '/canvas/' + msg.id + '/png');
                // $('#share').val(msg.share);
                // $('#share').val(window.location.origin+"/shared/"+$('#share').val());
              }
            } else {
              toastr.error('Canvas error while saving');
            }
          },
          error: function error(msg) {
            toastr.error('Canvas error while saving');
          }
        });
      } else {
        $.ajax({
          type: "put",
          url: '/canvas/' + id,
          responseType: 'json',
          xhrFields: { withCredentials: true },
          data: { name: name, code: code, id: id, _token: _token, visibility: visibility },
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
    };
    this.saveNewTab = function (code) {
      var name = "locally imported Canvas";
      var id = 0;
      var visibility = $('#visibility').prop('checked') ? 1 : 0; // Convert true/false in integer
      var _token = $('input[name=_token]').val();

      //new Canvas:
      $.ajax({
        type: "post",
        url: '/canvas',
        responseType: 'json',
        xhrFields: { withCredentials: true },
        data: { name: name, code: code, id: id, _token: _token, visibility: visibility },
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
    };
    this._connect();
  }

  _createClass(EventManager, [{
    key: '_connect',
    value: function _connect() {
      var canvas = this.canvas;
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
        //TODO Show color picker
        $('#fillColor').trigger("click");
      });
      $('#stroke-color').on("dblclick", function () {
        //TODO Show color picker
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
        //TODO Export sans sauvegarde
        window.eventmanager.save();
        $('#modal-export').modal('toggle');
      });

      //Modal events
      $("#import-new").click(function (e) {
        $('#modal-import').modal('toggle');
        window.eventmanager.import = "new";
        $("#fileinput").trigger('click');
        window.newTab = window.open('/canvas/create', '_blank');
      });

      $("#import-saveopen").click(function (e) {
        $('#modal-import').modal('toggle');
        window.eventmanager.import = "saveopen";
        $("#fileinput").trigger('click');
      });

      $("#import-discardopen").click(function (e) {
        $('#modal-import').modal('toggle');
        window.eventmanager.import = "discardopen";
        $("#fileinput").trigger('click');
      });

      $('#shareCopy').click(function () {
        $('#share').select();
        $(this).attr('data-copy', $('#share').val());
        var text = $(this).attr('data-copy');
        var el = $(this);
        copyToClipboard(text, el);
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
          data: { _token: _token },
          success: function success(msg) {
            if (msg.status == 'OK') {
              $('#div-unshare').removeClass('d-none');
              $('#div-share').addClass('d-none');
              $('#link-copy').attr('data-copy', msg.link);
              $('#link-display').val(msg.link);
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
          data: { _token: _token },
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
              data: { code: importedSvg, _token: _token },
              success: function success(msg) {
                if (msg.status == 'success') {
                  var existingSVG = $('#svgEditor svg');
                  var id = existingSVG.attr('id') || 'svgEditor';

                  switch (window.eventmanager.import) {
                    case "discardopen":
                      $('#svgEditor').html(importedSvg);

                      $('#app').find("*").addBack().off(); //magouille pour deconnecter tous les événements

                      window.canvas = new __WEBPACK_IMPORTED_MODULE_0__canvas__["default"](id, 1000, 600);

                      window.eventmanager = new EventManager(window.canvas);
                      $("#fileinput").val("");
                      break;

                    case "saveopen":
                      window.eventmanager.save();
                      $('#name-canvas').val($('#name-canvas').val() + "v2");
                      $('#navbar-title').text($('#name-canvas').val());
                      $('#id').val(-1);

                      $('#svgEditor').html(importedSvg);

                      $('#app').find("*").addBack().off(); //magouille pour deconnecter tous les événements

                      window.canvas = new __WEBPACK_IMPORTED_MODULE_0__canvas__["default"](id, 1000, 600);

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
      $('#save').on('click', this.save);

      //Loggin button
      var authReload = function authReload() {
        $('#svgEditor svg').removeAttr('xmlns:svgjs'); //Suppression d'un attribut qui est dupliqué
        var detached = $('#svgEditor').find(':hidden').detach();
        $('#code').val($('#svgEditor').html()); // TODO ne pas passer par l'élément DOM

        $('#svgEditor svg').append(detached);
        $('#form-update').attr('method', 'put');
        $('#form-update').submit();
      };

      $('#btn-login').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var email = $('#login-form #email').val();
        var password = $('#login-form #password').val();
        var _token = $('#login-form input[name=_token]').val();

        $.ajax({
          type: "post",
          url: '/login',
          data: { email: email, password: password, _token: _token },
          success: function success(msg) {
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
          data: { email: email, name: name, password: password, password_confirmation: password_confirmation, _token: _token },
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
              window.newTab = window.open('/canvas/create', '_blank');
              var reader = new FileReader();
              reader.readAsText(dataTransfer.files[0]);
              reader.onload = function (e) {
                var importedSvg = e.target.result;
                var _token = $('input[name=_token]').val();

                $.ajax({
                  type: "post",
                  url: '/canvas/sanitize',
                  data: { code: importedSvg, _token: _token },
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
      });
    }
  }]);

  return EventManager;
}();

$(document).ready(function () {
  toastr.options.positionClass = "toast-top-center";

  $('#svgEditor').html($('#code').val());
  var existingSVG = $('#svgEditor svg');
  var id = existingSVG.attr('id') || 'svgEditor';

  //Paramètres de taille par défault:
  window.canvas = new __WEBPACK_IMPORTED_MODULE_0__canvas__["default"](id, 1000, 600);
  window.eventmanager = new EventManager(window.canvas);

  var name = $('#name-canvas').val();
  if (!name) {
    $('#modal-title').modal('toggle');
  }

  $('#strokeWidth').popover({ trigger: 'hover', content: "Stroke width in pixels" });

  $('#zoom').popover({ trigger: 'hover', content: "Zoom level" });
});

/***/ }),

/***/ 46:
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: Unexpected token (58:0)\n\n\u001b[0m \u001b[90m 56 | \u001b[39m    })\u001b[33m;\u001b[39m\n \u001b[90m 57 | \u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 58 | \u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<<\u001b[39m\u001b[33m<\u001b[39m \u001b[33mHEAD\u001b[39m\n \u001b[90m    | \u001b[39m\u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 59 | \u001b[39m    $(\u001b[32m'#zoom'\u001b[39m)\u001b[33m.\u001b[39mon(\u001b[32m'change'\u001b[39m\u001b[33m,\u001b[39m\u001b[36mfunction\u001b[39m(){\n \u001b[90m 60 | \u001b[39m      selfCanvas\u001b[33m.\u001b[39mupdateZoom()\u001b[33m;\u001b[39m\n \u001b[90m 61 | \u001b[39m    })\u001b[33m;\u001b[39m\u001b[0m\n");

/***/ })

/******/ });