import {Rectangle, Line, Pen, Circle} from './shapes';


let options = ['x','y','width','height','x1','y1','x2','y2','color'];
let optionsType ={
  'canvas':['width','height'],
  'rect':['x','y','width','height'],
  'ellipse':['x','y'],
  'polyline':[],
  'line':['x1','y1','x2','y2']
}

export default class Canvas
{

  constructor(divId,width,height)
  {
    this.type="canvas";
    //this.draw = SVG(divId).size(width,height);
    this.draw = SVG(divId).viewbox(0,0,width,height).attr({width:width/2,height:height/2});

    this.actions=[];
    this.actionIndex=0;

    this.modesEnum=Object.freeze({
      "pointer":0,
      "erase":1,
      "pen":2,
      "line":3,
      "rectangle":4,
      "circle":5
    });

    this.isMoving=false;
    this.mode = this.modesEnum.pointer;
    this.shape = null;

    this.fillColor='#000';
    this.strokeColor='#000';
    this.strokeWidth=1;

    this.mouseX=0;
    this.mouseY=0;

    this.draw.mouseup(this.mouseUp.bind(this)); //bind(this) -> necessary to access this
    this.draw.mousemove(this.mouseMove.bind(this));
    this.draw.mousedown(this.mouseDown.bind(this));

    let selfCanvas = this;
    let importFunction=function(){ //à revoir pour les groupes svg
      if(this.type!="defs")
      {
        if(this.type=="svg")
        {
          this.each(importFunction);
        }
        else
        {
          this.mousedown(selfCanvas.elementClick.bind(selfCanvas));
        }
      }
    };

    this.draw.each(importFunction);
    this.shiftKey=false;

    $(document).keydown(function(e) {
      if(e.which == 16) {
        selfCanvas.shiftKey=true;
      }
      if(e.keyCode == 90 && e.ctrlKey && e.shiftKey || e.keyCode == 89 && e.ctrlKey )selfCanvas.redo();
      else if(e.keyCode == 90 && e.ctrlKey)selfCanvas.undo();

    });

    $(document).keyup(function(e) {
      if(e.which == 16) {
        selfCanvas.shiftKey=false;
      }
    });

    //Init des connections
    for(let option in options){
      //$('#'+options[option]).on('change');
      // TODO Init connect to be able to recover events
    }
    this.manageOption(this);
  }

  manageOption(object)
  {
    for(let option in options){
      $('#'+options[option]).hide();
    }
    for(let option in optionsType[object.type]){
      $('#'+optionsType[object.type][option]).show();
    }
  }

  undo()
  {
    if(this.actionIndex>0)
    {
      this.actionIndex--;
      switch(this.actions[this.actionIndex][0])
      {
        case this.modesEnum.pointer:
        this.actions[this.actionIndex][1].move(this.actions[this.actionIndex][2],this.actions[this.actionIndex][3]);
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

  redo()
  {
    if(this.actionIndex<this.actions.length)
    {
      switch(this.actions[this.actionIndex][0])
      {
        case this.modesEnum.pointer:
        this.actions[this.actionIndex][1].move(this.actions[this.actionIndex][2],this.actions[this.actionIndex][3]);
        break;
        case this.modesEnum.pen:
        case this.modesEnum.line:
        case this.modesEnum.rectangle:
        case this.modesEnum.circle:
        this.actions[this.actionIndex][1].shape.show()
        break;
        case this.modesEnum.erase:
        this.actions[this.actionIndex][1].hide();
        break;
      }
      this.actionIndex++;
    }
  }


  elementClick(e)
  {
    e.preventDefault();
    let event = e.target || e.srcElement;
    if(this.mode == this.modesEnum.erase)
    {
      this.actions[this.actionIndex]=[this.modesEnum.erase,event.instance];
      event.instance.hide();
      this.erase=false;
      this.actionIndex++;
      this.actions.splice(this.actionIndex,this.actions.length-this.actionIndex+1);
    }
    else if(this.mode == this.modesEnum.pointer)
    {
      this.isMoving=true;
      this.shape=event.instance;
      console.log(this.shape);
      {
        this.manageOption(this.shape);
      }

      this.actions[this.actionIndex]=[this.modesEnum.pointer,this.shape,this.shape.x(),this.shape.y()];
      this.actionIndex++;
      this.actions.splice(this.actionIndex,this.actions.length-this.actionIndex+1);
    }
  }

  mouseUp(e)
  {
    e.preventDefault();
    if(this.mode == this.modesEnum.pointer)
    {
      this.isMoving=false;
      if(this.shape!=null)this.actions[this.actionIndex]=[this.modesEnum.pointer,this.shape,this.shape.x(),this.shape.y()];
      this.shape=null;
    }
    else if(this.mode > this.modesEnum.erase)
    {
      switch(this.mode)
      {
        case this.modesEnum.pen:
        this.actions[this.actionIndex]=[this.modesEnum.pen,this.shape];
        break;
        case this.modesEnum.line:
        this.actions[this.actionIndex]=[this.modesEnum.line,this.shape];
        break;
        case this.modesEnum.rectangle:
        this.actions[this.actionIndex]=[this.modesEnum.rectangle,this.shape];
        break;
        case this.modesEnum.circle:
        this.actions[this.actionIndex]=[this.modesEnum.circle,this.shape];
        break;
      }
      this.actionIndex++;
      this.actions.splice(this.actionIndex,this.actions.length-this.actionIndex+1);
      this.isDynAdding=false;
      this.shape=null;
    }
  }

  mouseMove(e)
  {
    e.preventDefault();
    let relativePosX=e.pageX-$('#svgEditor').children().first().offset().left;
    let relativePosY=e.pageY-$('#svgEditor').children().first().offset().top;
    let box = this.draw.viewbox();
    let zoom = box.zoom;
    relativePosX /= zoom;
    relativePosY /= zoom;
    if(this.isMoving) //if clicked on element (move mode)
    {
      this.shape.move(relativePosX-this.shape.width()/2*zoom,relativePosY-this.shape.height()/2*zoom);
    }
    else if(this.shape!=null) //dyn Adding
    {
      this.shape.mouseMove(e);
    }
    else
    {
      this.mouseX=relativePosX;
      this.mouseY=relativePosY;
    }
  }

  mouseDown()
  {
    switch(this.mode)
    {
      case this.modesEnum.rectangle:
      this.shape=new Rectangle(this,this.mouseX, this.mouseY, 1, 1);
      break;
      case this.modesEnum.pen:
      this.shape=new Pen(this,this.mouseX, this.mouseY, this.mouseX+1, this.mouseY+1);
      break;
      case this.modesEnum.line:
      this.shape=new Line(this,this.mouseX, this.mouseY, this.mouseX+1, this.mouseY+1);
      break;
      case this.modesEnum.circle:
      this.shape=new Circle(this,this.mouseX, this.mouseY, 1,1);
      break;
    }
  }

  startMoving()
  {
    this.mode = this.modesEnum.pointer;
  }

  dynAddRectangle()
  {
    this.mode = this.modesEnum.rectangle;
  }

  dynAddLine()
  {
    this.mode = this.modesEnum.line;
  }

  dynAddPolyLine()
  {
    this.mode = this.modesEnum.pen;
  }

  dynAddCircle()
  {
    this.mode = this.modesEnum.circle;
  }

  startErase()
  {
    this.mode = this.modesEnum.erase;
  }

  setFillColor(color) //color format: string: '#RGB' R,G and B from '0' to 'F'
  {
    this.fillColor=color;
  }

  setStrokeColor(color) //color format: string: '#RGB' R,G and B from '0' to 'F'
  {
    this.strokeColor=color;
  }

  setStrokeWidth(width)
  {
    this.strokeWidth=width;
  }
}
