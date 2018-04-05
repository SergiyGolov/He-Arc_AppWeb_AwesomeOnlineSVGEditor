class Canvas
{
  constructor(divId,width,height)
  {
    this.draw = SVG(divId).size(width,height);
    this.shapes=[];

    //Available modes:
    // 0: pointer
    // 1: erase
    // 2: pen
    // 3: line
    // 4: rectangle
    // 5: circle
    this.mode = 0;

    this.shape = undefined;

    this.fillColor='#000';
    this.strokeColor='#000'
    this.strokeWidth=1;;

    /* TODO Remove those lines */
    this.isMoving=false;
    this.movingShape=null;
    this.isDynAdding=false;
    this.dynAddingShape="";
    this.erase=false;

    this.mouseX=0;
    this.mouseY=0;

    this.draw.mouseup(this.mouseUp.bind(this)); //bind(this) -> necessary to access this
    this.draw.mousemove(this.mouseMove.bind(this));
    this.draw.mousedown(this.mouseDown.bind(this));
  }

  elementClick(e)
  {
    if(this.mode == 1)
    { // Erase
      this.shapes.splice(this.shapes.indexOf(e.srcElement.instance),1);
      e.srcElement.instance.remove();
      this.erase=false;
    }
    else if(!this.isDynAdding) //TODO update this second part
    {
      this.isMoving=true;
      this.movingShape=e.srcElement.instance;
      this.shape=e.srcElement.instance;
    }
  }

  mouseUp(e)
  {
    if(this.isMoving && !this.isDynAdding)
    {
      this.isMoving=false;
      this.movingShape=null;
    }else if(this.isDynAdding){
      this.isDynAdding=false;
      this.movingShape=null;
    }
  }

  mouseMove(e)
  {
    if(this.isMoving && !this.isDynAdding)
    {
      this.movingShape.move(e.offsetX-this.movingShape.width()/2,e.offsetY-this.movingShape.height()/2);
      this.movingShape.front();
    }else if(this.isDynAdding){
      if(this.movingShape!=null)
      {
        switch(this.dynAddingShape)
        {
          case "rectangle":
            this.movingShape.width(this.movingShape.width()+e.movementX);
            this.movingShape.height(this.movingShape.height()+e.movementY);
          break;
          case "line":
            let x2=this.movingShape.node.x2.baseVal.value;
            let y2=this.movingShape.node.y2.baseVal.value;
            this.movingShape.plot(this.mouseX,  this.mouseY,x2+e.movementX,y2+e.movementY);
          break;
          case "circle":
            let r=this.movingShape.node.r.baseVal.value;
            this.movingShape.radius(r+Math.max(e.movementX,e.movementY));
          break;
        }

      }else {
        this.mouseX=e.offsetX;
        this.mouseY=e.offsetY;
      }

    }
  }

  mouseDown()
  {
    if(this.isDynAdding)
    {
      switch(this.dynAddingShape)
      {
        case "rectangle":
          this.movingShape=this.addRectangle(this.mouseX, this.mouseY, 1, 1);
        break;
        case "line":
          this.movingShape=this.addLine(this.mouseX, this.mouseY, this.mouseX+1, this.mouseY+1);
        break;
        case "circle":
          this.movingShape=this.addCircle(this.mouseX, this.mouseY, 1);
        break;
      }

    }
  }



  addRectangle(posX,posY,width,height)
  {
    let rect=this.draw.rect(width, height).stroke({ width: this.strokeWidth });

    rect.move(posX,posY);
    rect.fill(this.fillColor);
    rect.stroke(this.strokeColor);
    rect.mousedown(this.elementClick);

    this.shapes.push(rect);

    return rect;
  }

  addLine(posX,posY,posX2,posY2)
  {
    let line=this.draw.line(posX, posY,posX2,posY2).stroke({ width: this.strokeWidth });
    line.stroke(this.strokeColor);
    line.mousedown(this.elementClick);
    this.shapes.push(line);

    return line;
  }

  addCircle(posX,posY,d)
  {
    let circle=this.draw.circle(d).stroke({ width: this.strokeWidth });
    circle.move(posX,posY);
    circle.stroke(this.strokeColor);
    circle.fill(this.fillColor);
    circle.mousedown(this.elementClick);
    this.shapes.push(circle);

    return circle;
  }

  dynAddRectangle()
  {
    this.mode = 4;
  }

  dynAddLine()
  {
    this.mode = 3;
  }

  dynAddCircle()
  {
    this.mode = 5;
  }

  startErase()
  {
    this.mode = 1;
  }

  setFillColor(color) //color format: string: '#RGB' R,G and B from '0' to 'F'
  {
    this.fillColor=color;
  }

  setstrokeColor(color) //color format: string: '#RGB' R,G and B from '0' to 'F'
  {
    this.strokeColor=color;
  }

  setStrokeWidth(width)
  {
    this.strokeWidth=width;
  }
}

class EventManager
{
  constructor(canvas)
  {
    this.canvas = canvas;
    this._connect();
  }

  _connect(){
    let canvas = this.canvas;
    $('#line').on('click',function(){
      canvas.dynAddLine();
    })
    $('#rectangle').on('click',function(){
      canvas.dynAddRectangle();
    })
    $('#ellipse').on('click',function(){
      canvas.dynAddCircle();
    })
    $('#erase').on('click',function(){
      canvas.startErase();
    })
  }

}

//TODO add html button, add connections in Eventmanager and finally remove those lines
function updateFillColor()
{
  canvas.setFillColor($('#fillColor')["0"].value);
}
function updatestrokeColor()
{
  canvas.setstrokeColor($('#strokeColor')["0"].value);
}
function updateStrokeWidth()
{
  canvas.setStrokeWidth($('#strokeWidth')["0"].value);
}

$(document).ready(function(){
  let canvas = new Canvas('svgEditor',$('#svgEditor').width(),$('#svgEditor').height());
  let eventmanager = new EventManager(canvas);

  // for(let i=0;i<5;i++)
  // {
  //   canvas.setFillColor('#F'+i+i*2);
  //   canvas.setstrokeColor('#'+i+i*2+i);
  //   canvas.addRectangle(50*i,50*i,25,25);
  // }
});
