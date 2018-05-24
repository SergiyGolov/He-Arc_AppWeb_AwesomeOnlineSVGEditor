class Canvas
{

  constructor(divId,width,height)
  {
    this.draw = SVG(divId).size(width,height);
    this.shapes=[];

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

    let selfCanvas = this; //désolé de nouveau, mais fallait que j'y accéde depuis un callback du eventManager
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
          selfCanvas.shapes.push(this);
        }
      }
    };

    this.draw.each(importFunction);

    this.shiftKey=false;

    $(document).keydown(function(e) {
      if(e.which == 16) {
        selfCanvas.shiftKey=true;
      }
    });
    $(document).keyup(function(e) {
      if(e.which == 16) {
        selfCanvas.shiftKey=false;
      }
    });
  }

  elementClick(e)
  {
    e.preventDefault();
    let event = e.target || e.srcElement;
    if(this.mode == this.modesEnum.erase)
    {
      this.shapes.splice(this.shapes.indexOf(event.instance),1);
      event.instance.remove();
      this.erase=false;
    }
    else if(this.mode == this.modesEnum.pointer)
    {
      this.isMoving=true;
      this.shape=event.instance;
    }
  }

  mouseUp(e)
  {
    e.preventDefault();
    if(this.mode == this.modesEnum.pointer)
    {
      this.isMoving=false;
      this.shape=null;
    }else if(this.mode > this.modesEnum.erase){
      this.isDynAdding=false;
      this.shape=null;
    }
  }

  mouseMove(e)
  {
    e.preventDefault();
    let relativePosX=e.pageX-$('#svgEditor').children().first().offset().left;
    let relativePosY=e.pageY-$('#svgEditor').children().first().offset().top;
    if(this.isMoving) //if clicked on element (move mode)
    {
      this.shape.move(relativePosX-this.shape.width()/2,relativePosY-this.shape.height()/2);
    }
    else if(this.shape!=null) //dyn Adding
    {
      this.shape.mouseMove(e);
    }else {
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
      this.shape=new Circle(this,this.mouseX, this.mouseY, 1);
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
