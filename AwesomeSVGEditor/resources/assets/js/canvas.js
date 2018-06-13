import {
  Rectangle,
  Line,
  Pen,
  Circle
}
from './shapes';

let options = ['x', 'y', 'width', 'height', 'x1', 'y1', 'x2', 'y2', 'colorFill', 'colorStroke', 'strokeWidthDiv', 'backward', 'forward'];
let optionsType = {
  'svg': ['width', 'height'],
  'rect': ['x', 'y', 'width', 'height', 'strokeWidthDiv', 'colorFill', 'colorStroke', 'backward', 'forward'],
  'ellipse': ['x', 'y', 'width', 'height', 'colorFill', 'strokeWidthDiv', 'colorStroke', 'backward', 'forward'],
  'polyline': ['colorStroke', 'strokeWidthDiv', 'x', 'y', 'width', 'height', 'backward', 'forward'],
  'line': ['x1', 'y1', 'x2', 'y2', 'strokeWidthDiv', 'colorStroke', 'backward', 'forward']
}

export default class Canvas {
  constructor(divId, width, height) {
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

    let canvas = this;

    this.draw.on('zoom', function(ev) {
      $('#zoom').val(canvas.draw.zoom() * 2);
    });

    $("#" + divId).mousedown(function(e) {
      if (e.target.nodeName == "svg") {
        canvas.manageOption(canvas);
        canvas.unselect();
      }
    });

    $('#zoom').on('change', function() {
      canvas.updateZoom();
    });

    //Ces 3 fonctions doivent rester dans le constructeur car nous devons les binder avec l'élément à modifier en leur passant canvas
    this.stopDraggable = function() {
      this.draggable(false);
    };
    this.unselectAll = function() {
      if (this.type != 'defs' && this.type != 'g' && canvas.shape != this) {
        this.selectize(false);
      }
    }
    this.startDraggable = function() {
      if (this.type != "defs") {
        this.draggable().on('beforedrag', function(e) {
          this.drag_start = [this.x(), this.y()];
        }).on('dragend', function(e) {
          if (this.drag_start[0] != this.x() || this.drag_start[1] != this.y()) {
            canvas.actions[canvas.actionIndex] = [canvas.modesEnum.pointer, this, this.drag_start[0], this.drag_start[1], this.x(), this.y()];
            canvas.actionIndex++;
            canvas.actions.splice(canvas.actionIndex, canvas.actions.length - canvas.actionIndex + 1);
            canvas.manageOption(this);
          }
        }).on('resizedone', function(e) {
          canvas.manageOption(this);
        });
        this.mousedown(canvas.elementClick.bind(canvas));
      }
    };

    this.draw.each(this.startDraggable);
    this.shiftKey = false;

    $(document).keydown(function(e) {
      if (e.which == 16) {
        canvas.shiftKey = true;
      }
      if (e.keyCode == 90 && e.ctrlKey && e.shiftKey || e.keyCode == 89 && e.ctrlKey) {
        canvas.redo();
      } else if (e.keyCode == 90 && e.ctrlKey) {
        canvas.undo();
      }
    });

    $(document).keyup(function(e) {
      if (e.which == 16) {
        canvas.shiftKey = false;
      }
    });

    //Init connections for the right menu
    for (let option in options) {
      $('#' + options[option]).on('change', function() {
        let isCanvas = false;
        let optionCanvas;

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

      $('#' + options[option]).on('click', function() {
        switch (options[option]) {
          case "forward":
          canvas.optionShape.forward();
          break;
          case "backward":
          canvas.optionShape.backward();
          break;
        }
      });
    }
    this.manageOption(this);
  }


  manageOption(object) {
    this.optionShape = object;
    if (this.optionShape.type == "svg") {
      this.optionShape = this.optionShape.draw;

    }
    for (let option in options) {
      $('#' + options[option]).hide();
    }
    $('#option-select').text(object.type);
    for (let option in optionsType[object.type]) {
      $('#' + optionsType[object.type][option]).show();

      switch (optionsType[object.type][option]) {
        case "width":
        $('#' + optionsType[object.type][option] + "Val").val(this.optionShape.width());
        break;
        case "height":
        $('#' + optionsType[object.type][option] + "Val").val(this.optionShape.height());
        break;
        case "x":
        $('#' + optionsType[object.type][option] + "Val").val(this.optionShape.x());
        break;
        case "y":
        $('#' + optionsType[object.type][option] + "Val").val(this.optionShape.y());
        break;
        case "x1":
        $('#' + optionsType[object.type][option] + "Val").val(this.optionShape.attr('x1'));
        break;
        case "y1":
        $('#' + optionsType[object.type][option] + "Val").val(this.optionShape.attr('y1'));
        break;
        case "x2":
        $('#' + optionsType[object.type][option] + "Val").val(this.optionShape.attr('x2'));
        break;
        case "y2":
        $('#' + optionsType[object.type][option] + "Val").val(this.optionShape.attr('y2'));
        break;
        case "colorStroke":
        $('#' + optionsType[object.type][option] + "Val").val(this.optionShape.attr('stroke'));
        break;
        case "colorFill":
        $('#' + optionsType[object.type][option] + "Val").val(this.optionShape.attr('fill'));
        break;
        case "strokeWidthDiv":
        $('#' + optionsType[object.type][option] + "Val").val(this.optionShape.attr('stroke-width'));
        break;
      }
    }
    $('#option-select').html(object.type);
  }

  undo() {
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

  redo() {
    if (this.actionIndex < this.actions.length) {
      switch (this.actions[this.actionIndex][0]) {
        case this.modesEnum.pointer:
        this.actions[this.actionIndex][1].move(this.actions[this.actionIndex][4], this.actions[this.actionIndex][5]);
        break;
        case this.modesEnum.pen:
        case this.modesEnum.line:
        case this.modesEnum.rectangle:
        case this.modesEnum.circle:
        this.actions[this.actionIndex][1].shape.show()
        this.manageOption(this.actions[this.actionIndex][1].shape);
        break;
        case this.modesEnum.erase:
        this.actions[this.actionIndex][1].hide();
        break;
      }
      this.actionIndex++;
    }
  }

  elementClick(e) {
    e.preventDefault();

    let event = e.target || e.srcElement;
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

  unselect() {
    this.draw.each(function() {
      if (this.type != 'defs' && this.type != 'g') {
        this.selectize(false);
      }
    });
  }

  mouseUp(e) {
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

  mouseMove(e) {
    e.preventDefault();

    let relativePosX = e.pageX - $('#svgEditor').children().first().offset().left;
    let relativePosY = e.pageY - $('#svgEditor').children().first().offset().top;
    let box = this.draw.viewbox();
    let zoom = box.zoom;
    relativePosX /= zoom;
    relativePosY /= zoom;
    if (this.shape != null && this.mode > this.modesEnum.erase) {
      this.shape.mouseMove(e);
    } else {
      this.mouseX = relativePosX;
      this.mouseY = relativePosY;
    }
  }

  mouseDown() {
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
    if (this.mode > this.modesEnum.erase) {
      this.shape.shape.mousedown(canvas.elementClick.bind(canvas));
    }
  }

  startMoving() {
    this.mode = this.modesEnum.pointer;
    this.draw.each(this.startDraggable);
  }

  dynAddRectangle() {
    this.shape = null;
    this.unselect();
    this.mode = this.modesEnum.rectangle;
    this.draw.each(this.stopDraggable);
  }

  dynAddLine() {
    this.shape = null;
    this.unselect();
    this.mode = this.modesEnum.line;
    this.draw.each(this.stopDraggable);
  }

  dynAddPolyLine() {
    this.shape = null;
    this.unselect();
    this.mode = this.modesEnum.pen;
    this.draw.each(this.stopDraggable);
  }

  dynAddCircle() {
    this.shape = null;
    this.unselect();
    this.mode = this.modesEnum.circle;
    this.draw.each(this.stopDraggable);
  }

  startErase() {
    this.shape = null;
    this.unselect();
    this.mode = this.modesEnum.erase;
    this.draw.each(this.stopDraggable);
  }

  setFillColor(color) //color format: string: '#RGB' R,G and B from '0' to 'F'
  {
    this.fillColor = color;
  }

  setStrokeColor(color) //color format: string: '#RGB' R,G and B from '0' to 'F'
  {
    this.strokeColor = color;
  }

  setStrokeWidth(width) {
    this.strokeWidth = width;
  }
}
