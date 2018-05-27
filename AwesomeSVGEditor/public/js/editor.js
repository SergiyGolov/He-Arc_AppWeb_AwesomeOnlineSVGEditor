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
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
/******/ })
/************************************************************************/
/******/ ({

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(49);


/***/ }),

/***/ 49:
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//Class to connect the interface with our canvas object
var EventManager = function () {
  function EventManager(canvas) {
    _classCallCheck(this, EventManager);

    this.canvas = canvas;
    this.save = function () {
      canvas.draw.defs().remove();
      $('#svgEditor svg').removeAttr('xmlns:svgjs'); //Suppression d'un attribut qui est dupliqué

      var detached = $('#svgEditor').find(':hidden').detach();

      $('#code').val($('#svgEditor').html()); // TODO ne pas passer par l'élément DOM

      $('#svgEditor svg').append(detached);

      var name = $('#name').val();
      var code = $('#code').val();
      var id = $('#id').val();
      var visibility = $('#visibility').prop('checked') ? 1 : 0; // Convert true/false in integer

      var _token = $('input[name=_token]').val();

      if (!name) {
        $('#modal-title').modal('toggle');
        name = $('#name').val();
        if (!name) {
          return;
        }
      }
      //new Canvas:
      if (!id || id <= 0) {
        $('#id').val(0);
        $.ajax({
          type: "POST",
          url: '/canvas',
          data: { name: name, code: code, id: id, _token: _token, visibility: visibility },
          success: function success(msg) {
            if (msg.status == 'success') {
              toastr.success('Canvas saved successfully!');
              console.log(msg);
              if ($('#id').val() == 0) {
                $('#id').val(msg.id);
                $('#svg-link').attr('href', '/canvas/' + msg.id + '/svg');
                $('#png-link').attr('href', '/canvas/' + msg.id + '/png');
                $('#share').val(msg.share);
                $('#share').val(window.location.origin + "/shared/" + $('#share').val());
              }
            } else {
              toastr.error('Canvas error while saving');
            }
          },
          error: function error(msg) {
            console.log(msg);
            toastr.error('Canvas error while saving');
          }
        });
      } else {
        $.ajax({
          type: "PUT",
          url: '/canvas/' + id,
          data: { name: name, code: code, id: id, _token: _token, visibility: visibility },
          success: function success(msg) {
            if (msg.status == 'success') {
              toastr.success('Canvas updated successfully!');
              console.log(msg);
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
        type: "POST",
        url: '/canvas',
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
          console.log(msg);
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

      $("#shareLink").click(function (e) {
        e.preventDefault();
        $('#modal-share').modal('toggle');
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
              type: "POST",
              url: '/sanitiseAjax',
              data: { code: importedSvg, _token: _token },
              success: function success(msg) {
                if (msg.status == 'success') {
                  var existingSVG = $('#svgEditor svg');
                  var id = existingSVG.attr('id') || 'svgEditor';

                  switch (window.eventmanager.import) {
                    case "discardopen":
                      $('#svgEditor').html(importedSvg);

                      $('#app').find("*").addBack().off(); //magouille pour deconnecter tous les événements

                      window.canvas = new Canvas(id, 1000, 600);

                      window.eventmanager = new EventManager(window.canvas);
                      $("#fileinput").val("");
                      break;

                    case "saveopen":
                      window.eventmanager.save();
                      $('#name').val($('#name').val() + "v2");
                      $('#navbar-title').text($('#name').val());
                      $('#id').val(-1);

                      $('#svgEditor').html(importedSvg);

                      $('#app').find("*").addBack().off(); //magouille pour deconnecter tous les événements

                      window.canvas = new Canvas(id, 1000, 600);

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
                console.log(msg);
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
        $('#name').val(title);
        $('#navbar-title').text(title);
        $('#modal-title').modal('toggle');
      });

      $('#title-edit').on('click', function () {
        $('#modal-title').modal('toggle');
      });

      //Load preconfigure colors and width
      $('#fillColor').trigger('change');
      $('#strokeColor').trigger('change');
      $('#strokeWidth').trigger('change');

      $('#save').on('click', this.save);

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
                  type: "POST",
                  url: '/sanitiseAjax',
                  data: { code: importedSvg, _token: _token },
                  success: function success(msg) {
                    if (msg.status == 'success') {
                      window.eventmanager.saveNewTab(importedSvg);
                    } else {
                      toastr.error('Your imported .svg file is not valid');
                    }
                  },
                  error: function error(msg) {
                    console.log(msg);
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
  window.canvas = new Canvas(id, 1000, 600);
  window.eventmanager = new EventManager(window.canvas);

  var name = $('#name').val();
  if (!name) {
    $('#modal-title').modal('toggle');
  }

  if ($('#share').val() != "") $('#share').val(window.location.origin + "/shared/" + $('#share').val());
  $('#strokeWidth').popover({ trigger: 'hover', content: "Stroke width in pixels" });
});

/***/ })

/******/ });