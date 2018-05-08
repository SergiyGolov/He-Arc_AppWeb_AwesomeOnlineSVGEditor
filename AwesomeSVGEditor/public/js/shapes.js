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
      if(this.canvas.shiftKey)
      {
        if (Math.min(this.initialX,relativePosX) == this.initialX  && Math.min(this.initialY,relativePosY) == this.initialY) // cadran bas droite
        {
          this.rect.move(this.initialX,this.initialY);
          this.rect.width(Math.min(relativePosX-this.initialX,relativePosY-this.initialY));
          this.rect.height(Math.min(relativePosX-this.initialX,relativePosY-this.initialY));
        }
        else if(Math.min(this.initialX,relativePosX) == this.initialX  && Math.min(this.initialY,relativePosY) == relativePosY) // cadran haut droite
        {
          this.rect.move(this.initialX,relativePosY);
          this.rect.width(Math.min(relativePosX-this.initialX,this.initialY-relativePosY));
          this.rect.height(Math.min(relativePosX-this.initialX,this.initialY-relativePosY));
        }
        else if(Math.min(this.initialX,relativePosX) == relativePosX  && Math.min(this.initialY,relativePosY) == this.initialY) // cadran bas gauche
        {
          this.rect.move(relativePosX,this.initialY);
          this.rect.width(Math.min(this.initialX-relativePosX,relativePosY-this.initialY));
          this.rect.height(Math.min(this.initialX-relativePosX,relativePosY-this.initialY));
        }
        else // cadran haut gauche
        {
          this.rect.move(relativePosX,relativePosY);
          this.rect.width(Math.min(this.initialX-relativePosX,this.initialY-relativePosY));
          this.rect.height(Math.min(this.initialX-relativePosX,this.initialY-relativePosY));
        }


      }
      else
      {
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
}

class Circle {

  constructor(canvas,posX,posY,d){
    this.canvas=canvas;
    this.circle=this.canvas.draw.ellipse(d,d).stroke({ width: this.canvas.strokeWidth });
    this.circle.move(posX,posY);
    this.circle.stroke(this.canvas.strokeColor);
    this.circle.fill(this.canvas.fillColor);
    this.circle.mousedown(this.canvas.elementClick.bind(this.canvas));
    this.canvas.shapes.push(this.circle);
    this.initialX=posX;
    this.initialY=posY;
  }
  mouseMove(e)
  {
    let relativePosX=e.pageX-$('#svgEditor').children().first().offset().left;
    let relativePosY=e.pageY-$('#svgEditor').children().first().offset().top;

    if(this.canvas.shiftKey)
      {
        let r=Math.sqrt(Math.pow(Math.abs(relativePosX-this.initialX),2)+Math.pow(Math.abs(relativePosY-this.initialY),2));
        this.circle.radius(r);
      }
      else
      {
        let rX=Math.abs(relativePosX-this.initialX);
        let rY=Math.abs(relativePosY-this.initialY);
        this.circle.radius(rX,rY);
      }
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
