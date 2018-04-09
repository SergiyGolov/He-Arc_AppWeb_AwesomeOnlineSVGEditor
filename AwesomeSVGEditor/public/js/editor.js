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

    this.shape = null;

    this.fillColor='#000';
    this.strokeColor='#000';
    this.strokeWidth=1;

    /* TODO Remove those lines */
    this.isMoving=false;
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
    let event = e.target || e.srcElement;
    if(this.mode == 1)
    { // Erase
      this.shapes.splice(this.shapes.indexOf(event.instance),1);
      event.instance.remove();
      this.erase=false;
    }
    else if(this.mode == 0) //TODO update self second part
    {
      this.isMoving=true;
      this.shape=event.instance;
    }
  }

  mouseUp(e)
  {
    if(this.mode == 0)
    {
      this.isMoving=false;
      this.shape=null;
    }else if(this.mode > 1){
      this.isDynAdding=false;
      this.shape=null;
    }
  }

  mouseMove(e)
  {
    if(this.isMoving)
    {
      this.shape.move(e.offsetX-this.shape.width()/2,e.offsetY-this.shape.height()/2);
      this.shape.front();
    }
    else if(this.shape!=null)
    {
      switch(this.mode) {
        case 4: //rectangle
          this.shape.width(this.shape.width()+e.movementX);
          this.shape.height(this.shape.height()+e.movementY);
        break;
        case 3: //line
          let x2=this.shape.node.x2.baseVal.value;
          let y2=this.shape.node.y2.baseVal.value;
          this.shape.plot(this.mouseX,  this.mouseY,x2+e.movementX,y2+e.movementY);
        break;
        case 5: //circle
          let r=this.shape.node.r.baseVal.value;
          this.shape.radius(r+Math.max(e.movementX,e.movementY));
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
        this.shape=this.addRectangle(this.mouseX, this.mouseY, 1, 1);
      break;
      case 3: //line
        this.shape=this.addLine(this.mouseX, this.mouseY, this.mouseX+1, this.mouseY+1);
      break;
      case 5: //circle
        this.shape=this.addCircle(this.mouseX, this.mouseY, 1);
      break;
    }
  }

  addRectangle(posX,posY,width,height)
  {
    let rect=this.draw.rect(width, height).stroke({ width: this.strokeWidth });

    rect.move(posX,posY);
    rect.fill(this.fillColor);
    rect.stroke(this.strokeColor);
    rect.mousedown(this.elementClick.bind(this));

    this.shapes.push(rect);

    return rect;
  }

  addLine(posX,posY,posX2,posY2)
  {
    let line=this.draw.line(posX, posY,posX2,posY2).stroke({ width: this.strokeWidth });
    line.stroke(this.strokeColor);
    line.mousedown(this.elementClick.bind(this));
    this.shapes.push(line);

    return line;
  }

  addCircle(posX,posY,d)
  {
    let circle=this.draw.circle(d).stroke({ width: this.strokeWidth });
    circle.move(posX,posY);
    circle.stroke(this.strokeColor);
    circle.fill(this.fillColor);
    circle.mousedown(this.elementClick.bind(this));
    this.shapes.push(circle);

    return circle;
  }

  startMoving()
  {
    this.mode = 0;
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
    $('#pointer').on('click',function(){
      canvas.startMoving();
    });
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

    //Load preconfigure colors and width
    $('#fillColor').trigger('change');
    $('#strokeColor').trigger('change');
    $('#strokeWidth').trigger('change');


    $('#save').on('click',function(e){
      e.preventDefault();

      let name = $('#name').val();
      let code = $('#code').val();
      let id = $('#id').val();
      let _token = $('input[name=_token]').val();

      //new Canvas:
      if(!id || id<=0){
          $.ajax({
             type: "POST",
             url: '/canvas',
             data: {name:name, code:code, id:id, _token:_token},
             success: function(msg) {
               console.log("Creation ok");
               console.log(msg);
               $('#id').val(msg.id);
             },
             error: function(msg){
               console.log(msg);
               console.log("Error creation");
             }
          });
      }else{
          $.ajax({
             type: "PUT",
             url: '/canvas/'+id,
             data: {name:name, code:code, id:id, _token:_token},
             success: function(msg) {
               console.log("Update ok");
               console.log(msg);
             },
             error: function(msg){
               console.log("error update");
               console.log(msg)
             }
          });
      }
    });
  }
}

$(document).ready(function(){
  let canvas = new Canvas('svgEditor',$('#svgEditor').width(),$('#svgEditor').height());
  let eventmanager = new EventManager(canvas);
});
