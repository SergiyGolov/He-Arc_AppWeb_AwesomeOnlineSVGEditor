class Rectangle {

  constructor(canvas,posX,posY,width,height){
    this.canvas=canvas;
    this.rect=this.canvas.draw.rect(width, height).stroke({ width: this.canvas.strokeWidth });
    this.rect.move(posX,posY);
    this.rect.fill(this.canvas.fillColor);
    this.rect.stroke(this.canvas.strokeColor);
    this.rect.mousedown(this.canvas.elementClick.bind(this.canvas));
    this.canvas.shapes.push(this);

    this.initialX=posX;
    this.initialY=posY;
  }

  mouseMove(e)
  {
    let relativePosX=e.pageX-$('#svgEditor').children().first().offset().left;
    let relativePosY=e.pageY-$('#svgEditor').children().first().offset().top;

    if (Math.min(this.initialX,relativePosX) == this.initialX )
    {
      this.rect.move(this.initialX,this.rect.y());
      this.rect.width(relativePosX-this.initialX);
    }
    else
    {
      this.rect.move(relativePosX,this.rect.y());
      this.rect.width(this.initialX-relativePosX);

    }

    if(Math.min(this.initialY,relativePosY) == this.initialY)
    {
      this.rect.move(this.rect.x(),this.initialY);
      this.rect.height(relativePosY-this.initialY);
    }
    else
    {
      this.rect.move(this.rect.x(),relativePosY);
      this.rect.height(this.initialY-relativePosY);
    }
  }
}

class Circle {

  constructor(canvas,posX,posY,d){
    this.canvas=canvas;
    this.circle=this.canvas.draw.circle(d).stroke({ width: this.canvas.strokeWidth });
    this.circle.move(posX,posY);
    this.circle.stroke(this.canvas.strokeColor);
    this.circle.fill(this.canvas.fillColor);
    this.circle.mousedown(this.canvas.elementClick.bind(this.canvas));
    this.canvas.shapes.push(this.circle);
  }
  mouseMove(e)
  {
    let r=this.circle.node.r.baseVal.value;
    this.circle.radius(r+Math.max(e.movementX,e.movementY));
  }
}

class Line {
  constructor(canvas,posX,posY,posX2,posY2){
    this.canvas = canvas;
    this.line=this.canvas.draw.line(posX, posY,posX2,posY2).stroke({ width: this.canvas.strokeWidth });
    this.line.stroke(this.canvas.strokeColor);
    this.line.mousedown(this.canvas.elementClick.bind(this.canvas));
    this.canvas.shapes.push(this.line);
  }

  mouseMove(e)
  {
    let x2=this.line.node.x2.baseVal.value;
    let y2=this.line.node.y2.baseVal.value;
    this.line.plot(this.canvas.mouseX,  this.canvas.mouseY,x2+e.movementX,y2+e.movementY);
  }
}

class Pen {


}
