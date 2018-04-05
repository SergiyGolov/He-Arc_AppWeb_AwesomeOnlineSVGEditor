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
    this.strokeColor='#000';
    this.strokeWidth=1;

    /* TODO Remove those lines */
    this.isMoving=false;
    this.movingShape=null; // rename in shape
    this.isDynAdding=false;
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
    if(this.mode == 0)
    {
      this.isMoving=false;
      this.movingShape=null;
    }else if(this.mode > 1){
      this.isDynAdding=false;
      this.movingShape=null;
    }
  }

  mouseMove(e)
  {
    if(this.isMoving)
    {
      this.movingShape.move(e.offsetX-this.movingShape.width()/2,e.offsetY-this.movingShape.height()/2);
      this.movingShape.front();
    }
    else if(this.movingShape!=null)
    {
      switch(this.mode) {
        case 4: //rectangle
          this.movingShape.width(this.movingShape.width()+e.movementX);
          this.movingShape.height(this.movingShape.height()+e.movementY);
        break;
        case 3: //line
          let x2=this.movingShape.node.x2.baseVal.value;
          let y2=this.movingShape.node.y2.baseVal.value;
          this.movingShape.plot(this.mouseX,  this.mouseY,x2+e.movementX,y2+e.movementY);
        break;
        case 5: //circle
          let r=this.movingShape.node.r.baseVal.value;
          this.movingShape.radius(r+Math.max(e.movementX,e.movementY));
        break;
      }

    }else {
      this.mouseX=e.offsetX;
      this.mouseY=e.offsetY;
    }
  }

  mouseDown()
  {
    switch(this.mode)
    {
      case 4: //rectangle
        this.movingShape=this.addRectangle(this.mouseX, this.mouseY, 1, 1);
      break;
      case 3: //line
        this.movingShape=this.addLine(this.mouseX, this.mouseY, this.mouseX+1, this.mouseY+1);
      break;
      case 5: //circle
        this.movingShape=this.addCircle(this.mouseX, this.mouseY, 1);
      break;
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

  setStrokeColor(color) //color format: string: '#RGB' R,G and B from '0' to 'F'
  {
    this.strokeColor=color;
  }

  setStrokeWidth(width)
  {
    this.strokeWidth=width;
  }
}

//Class to connect the interface with our canvas object
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
    });
    $('#rectangle').on('click',function(){
      canvas.dynAddRectangle();
    });
    $('#ellipse').on('click',function(){
      canvas.dynAddCircle();
    });
    $('#erase').on('click',function(){
      canvas.startErase();
    });
    $('#fillColor').on('change',function(){
      canvas.setFillColor($('#fillColor')[0].value);
    });
    $('#strokeColor').on('change',function(){
      canvas.setStrokeColor($('#strokeColor')[0].value);
    })
    $('#strokeWidth').on('change',function(){
      canvas.setStrokeWidth($('#strokeWidth')[0].value);
    })

    //Loadd preconfigure colors and width
    $('#fillColor').trigger('change');
    $('#strokeColor').trigger('change');
    $('#strokeWidth').trigger('change');
  }
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
