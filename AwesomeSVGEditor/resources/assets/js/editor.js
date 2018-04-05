class Canvas
{

  constructor(divId,width,height)
  {
    this.draw = SVG(divId).size(width,height);
    this.shapes=new Array();
    this.fillColor='#000';
    this.contourColor='#000';
    this.isMoving=false;
    this.movingShape=null;
    this.isDynAdding=false;
    this.dynAddingShape="";

    this.erase=false;

    this.mouseX=0;
    this.mouseY=0;
    this.strokeWidth=1;

    self=this; //magouille pour pouvoir accèder à l'instance de "Canvas" depuis les callback appelés par le div

    this.draw.mouseup(this.mouseUp);
    this.draw.mousemove(this.mouseMove);
    this.draw.mousedown(this.mouseDown);
  }

  elementClick(e)
  {
    if(self.erase)
    {
      self.shapes.splice(self.shapes.indexOf(e.srcElement.instance),1);
      e.srcElement.instance.remove();
      self.erase=false;
    }
    else if(!self.isDynAdding)
    {
      self.isMoving=true;
      self.movingShape=e.srcElement.instance;
    }
  }

  mouseUp(e)
  {
    if(self.isMoving && !self.isDynAdding)
    {
      self.isMoving=false;
      self.movingShape=null;
    }else if(self.isDynAdding){
      self.isDynAdding=false;
      self.movingShape=null;
    }
  }

  mouseMove(e)
  {
    if(self.isMoving && !self.isDynAdding)
    {
      self.movingShape.move(e.offsetX-self.movingShape.width()/2,e.offsetY-self.movingShape.height()/2);
      self.movingShape.front();
    }else if(self.isDynAdding){
      if(self.movingShape!=null)
      {
        switch(self.dynAddingShape)
        {
          case "rectangle":
            self.movingShape.width(self.movingShape.width()+e.movementX);
            self.movingShape.height(self.movingShape.height()+e.movementY);
          break;
          case "line":
            let x2=self.movingShape.node.x2.baseVal.value;
            let y2=self.movingShape.node.y2.baseVal.value;
            self.movingShape.plot(self.mouseX,  self.mouseY,x2+e.movementX,y2+e.movementY);
          break;
          case "circle":
            let r=self.movingShape.node.r.baseVal.value;
            self.movingShape.radius(r+Math.max(e.movementX,e.movementY));
          break;
        }

      }else {
        self.mouseX=e.offsetX;
        self.mouseY=e.offsetY;
      }

    }
  }

  mouseDown()
  {
    if(self.isDynAdding)
    {
      switch(self.dynAddingShape)
      {
        case "rectangle":
          self.movingShape=self.addRectangle(  self.mouseX,  self.mouseY,1,1);
        break;
        case "line":
          self.movingShape=self.addLine(  self.mouseX,  self.mouseY, self.mouseX+1, self.mouseY+1);
        break;
        case "circle":
          self.movingShape=self.addCircle(  self.mouseX,  self.mouseY,1);
        break;
      }

    }
  }



  addRectangle(posX,posY,width,height)
  {
    let rect=this.draw.rect(width, height).stroke({ width: this.strokeWidth });

    rect.move(posX,posY);
    rect.fill(this.fillColor);
    rect.stroke(this.contourColor);

    rect.mousedown(this.elementClick);

    this.shapes.push(rect);

    return rect;
  }

  addLine(posX,posY,posX2,posY2)
  {
    let line=this.draw.line(posX, posY,posX2,posY2).stroke({ width: this.strokeWidth });
    line.stroke(this.contourColor);
    line.mousedown(this.elementClick);
    this.shapes.push(line);

    return line;
  }

  addCircle(posX,posY,d)
  {
    let circle=this.draw.circle(d).stroke({ width: this.strokeWidth });
    circle.move(posX,posY);
    circle.stroke(this.contourColor);
    circle.fill(this.fillColor);
    circle.mousedown(this.elementClick);
    this.shapes.push(circle);

    return circle;
  }

  dynAddRectangle()
  {
    this.isDynAdding=true;
    this.dynAddingShape="rectangle";
  }

  dynAddLine()
  {
    this.isDynAdding=true;
    this.dynAddingShape="line";
  }

  dynAddCircle()
  {
    this.isDynAdding=true;
    this.dynAddingShape="circle";
  }

  startErase()
  {
    this.erase=true;
  }

  setFillColor(color) //color format: string: '#RGB' R,G and B from '0' to 'F'
  {
    this.fillColor=color;
  }

  setContourColor(color) //color format: string: '#RGB' R,G and B from '0' to 'F'
  {
    this.contourColor=color;
  }

  setStrokeWidth(width)
  {
    this.strokeWidth=width;
  }


}

class EventManager
{
  constructor()
  {

  }
}

function init()
{
  canvas=new Canvas('svgEditor',$('#svgEditor').width(),$('#svgEditor').height());

  // for(let i=0;i<5;i++)
  // {
  //   canvas.setFillColor('#F'+i+i*2);
  //   canvas.setContourColor('#'+i+i*2+i);
  //   canvas.addRectangle(50*i,50*i,25,25);
  // }

}

function dynAddRectangle()
{
  canvas.dynAddRectangle();
}

function dynAddLine()
{
  canvas.dynAddLine();
}

function dynAddCircle()
{
  canvas.dynAddCircle();
}

function erase()
{
  canvas.startErase();
}

function updateFillColor()
{
  canvas.setFillColor($('#fillColor')["0"].value);

}

function updateContourColor()
{
  canvas.setContourColor($('#contourColor')["0"].value);
}

function updateStrokeWidth()
{
  canvas.setStrokeWidth($('#strokeWidth')["0"].value);
}
