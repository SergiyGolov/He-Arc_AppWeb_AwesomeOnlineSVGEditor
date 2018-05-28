// import Line from './shapes/line';
// import Pen from './shapes/pen';
// import Rectangle from './shapes/rectangle';
// import Circle from './shapes/circle';

export class Rectangle {

  constructor(canvas,posX,posY,width,height){
    this.canvas=canvas;
    this.shape=this.canvas.draw.rect(width, height).stroke({ width: this.canvas.strokeWidth });
    this.shape.move(posX,posY);
    this.shape.fill(this.canvas.fillColor);
    this.shape.stroke(this.canvas.strokeColor);
    this.shape.mousedown(this.canvas.elementClick.bind(this.canvas));

    this.initialX=posX;
    this.initialY=posY;
  }

  mouseMove(e)
  {
    let relativePosX=e.pageX-$('#svgEditor').children().first().offset().left;
    let relativePosY=e.pageY-$('#svgEditor').children().first().offset().top;
    let box = this.canvas.draw.viewbox();
    let zoom = box.zoom;
    relativePosX /= zoom;
    relativePosY /= zoom;
    if(this.canvas.shiftKey)
    {
      if (Math.min(this.initialX,relativePosX) == this.initialX  && Math.min(this.initialY,relativePosY) == this.initialY) // cadran bas droite
      {
        this.shape.move(this.initialX,this.initialY);
        this.shape.width(Math.min(relativePosX-this.initialX,relativePosY-this.initialY));
        this.shape.height(Math.min(relativePosX-this.initialX,relativePosY-this.initialY));
      }
      else if(Math.min(this.initialX,relativePosX) == this.initialX  && Math.min(this.initialY,relativePosY) == relativePosY) // cadran haut droite
      {
        this.shape.move(this.initialX,relativePosY);
        this.shape.width(Math.min(relativePosX-this.initialX,this.initialY-relativePosY));
        this.shape.height(Math.min(relativePosX-this.initialX,this.initialY-relativePosY));
      }
      else if(Math.min(this.initialX,relativePosX) == relativePosX  && Math.min(this.initialY,relativePosY) == this.initialY) // cadran bas gauche
      {
        this.shape.move(relativePosX,this.initialY);
        this.shape.width(Math.min(this.initialX-relativePosX,relativePosY-this.initialY));
        this.shape.height(Math.min(this.initialX-relativePosX,relativePosY-this.initialY));
      }
      else // cadran haut gauche
      {
        this.shape.move(relativePosX,relativePosY);
        this.shape.width(Math.min(this.initialX-relativePosX,this.initialY-relativePosY));
        this.shape.height(Math.min(this.initialX-relativePosX,this.initialY-relativePosY));
      }
    }
    else
    {
      if (Math.min(this.initialX,relativePosX) == this.initialX )
      {
        this.shape.move(this.initialX,this.shape.y());
        this.shape.width(relativePosX-this.initialX);
      }
      else
      {
        this.shape.move(relativePosX,this.shape.y());
        this.shape.width(this.initialX-relativePosX);
      }

      if(Math.min(this.initialY,relativePosY) == this.initialY)
      {
        this.shape.move(this.shape.x(),this.initialY);
        this.shape.height(relativePosY-this.initialY);
      }
      else
      {
        this.shape.move(this.shape.x(),relativePosY);
        this.shape.height(this.initialY-relativePosY);
      }
    }
  }
}


export class Circle {

  constructor(canvas,posX,posY,rx,ry){
    this.canvas=canvas;
    this.shape=this.canvas.draw.ellipse(rx,ry).stroke({ width: this.canvas.strokeWidth });
    this.shape.move(posX,posY);
    this.shape.stroke(this.canvas.strokeColor);
    this.shape.fill(this.canvas.fillColor);
    this.shape.mousedown(this.canvas.elementClick.bind(this.canvas));
    this.initialX=posX;
    this.initialY=posY;
  }
  mouseMove(e)
  {
    let relativePosX=e.pageX-$('#svgEditor').children().first().offset().left;
    let relativePosY=e.pageY-$('#svgEditor').children().first().offset().top;
    let box = this.canvas.draw.viewbox();
    let zoom = box.zoom;
    relativePosX /= zoom;
    relativePosY /= zoom;

    if(this.canvas.shiftKey)
    {
      let r=Math.sqrt(Math.pow(Math.abs(relativePosX-this.initialX),2)+Math.pow(Math.abs(relativePosY-this.initialY),2));
      this.shape.radius(r);
    }
    else
    {
      let rX=Math.abs(relativePosX-this.initialX);
      let rY=Math.abs(relativePosY-this.initialY);
      this.shape.radius(rX,rY);
    }
  }
}


export class Line {
  constructor(canvas,posX,posY,posX2,posY2){
    this.canvas = canvas;
    this.shape=this.canvas.draw.line(posX, posY,posX2,posY2).stroke({ width: this.canvas.strokeWidth });
    this.shape.stroke(this.canvas.strokeColor);
    this.shape.mousedown(this.canvas.elementClick.bind(this.canvas));
  }

  mouseMove(e)
  {
    let x2=this.shape.node.x2.baseVal.value;
    let y2=this.shape.node.y2.baseVal.value;
    let box = this.canvas.draw.viewbox();
    let zoom = box.zoom;
    this.shape.plot(this.canvas.mouseX,  this.canvas.mouseY,x2+e.movementX/zoom,y2+e.movementY/zoom);
  }
}

export class Pen {
  constructor(canvas,posX,posY,posX2,posY2){
    this.canvas = canvas;
    this.data = [[posX,posY],[posX2,posY2]];
    this.shape=this.canvas.draw.polyline(this.data).fill('none').stroke({ width: this.canvas.strokeWidth });
    this.shape.stroke(this.canvas.strokeColor);
    this.shape.mousedown(this.canvas.elementClick.bind(this.canvas));
  }

  mouseMove(e)
  {
    let relativePosX=e.pageX-$('#svgEditor').children().first().offset().left;
    let relativePosY=e.pageY-$('#svgEditor').children().first().offset().top;
    let box = this.canvas.draw.viewbox();
    let zoom = box.zoom;
    relativePosX /= zoom;
    relativePosY /= zoom;
    this.data.push([relativePosX,relativePosY]);
    this.shape.plot(this.data);
  }
}
