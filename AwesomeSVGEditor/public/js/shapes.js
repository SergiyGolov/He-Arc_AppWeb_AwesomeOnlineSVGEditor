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

    let deltaX=e.movementX;
    let deltaY=e.movementY;

    let maxDeltaX=relativePosX-this.initialX;
    let maxDeltaY=relativePosY-this.initialY;
    let needToMove=true;

    if(this.initialX<relativePosX && this.initialY<relativePosY) //cadran "bas-droite"
    {
      if(deltaX > 0 && deltaX>maxDeltaX)
      {
        deltaX=maxDeltaX;
        //console.log("too much bas-droite X");
        this.rect.move(this.initialX,this.rect.y());
      }
      if(deltaY > 0 && deltaY >maxDeltaY)
      {
        deltaY=maxDeltaY;
        //console.log("too much bas-droite Y");
        this.rect.move(this.rect.x(),this.initialY);
      }

      this.rect.width(Math.abs(this.rect.width()+deltaX));
      this.rect.height(Math.abs(this.rect.height()+deltaY));
    }
    else if (this.initialX>relativePosX && this.initialY>relativePosY ) //cadran "haut-gauche"
    {
      if(deltaX < 0 && deltaX<maxDeltaX)
      {
        needToMove=false;
        deltaX=maxDeltaX;
        //console.log("too much haut-gauche X");
        this.rect.width(Math.abs(deltaX));
        this.rect.move(this.initialX+deltaX,this.rect.y());
      }
      else
      {
        this.rect.width(Math.abs(this.rect.width()-Math.sign(deltaX)*Math.abs(deltaX)));
      }

      if(deltaY < 0 && deltaY<maxDeltaY)
      {
        needToMove=false;
        deltaY=maxDeltaY;
        //console.log("too much haut-gauche Y");
        this.rect.height(Math.abs(deltaY));
        this.rect.move(this.rect.x(),this.initialY+deltaY);
      }
      else
      {
        this.rect.height(Math.abs(this.rect.height()-Math.sign(deltaY)*Math.abs(deltaY)));
      }

      if(needToMove)
      {
        this.rect.move(this.rect.x()+deltaX,this.rect.y()+deltaY);
      }

    }
    else if(this.initialX>relativePosX && this.initialY<relativePosY) // cadran "bas-gauche"
    {
      if(deltaX < 0 && deltaX < maxDeltaX)
      {
        needToMove=false;
        deltaX=maxDeltaX;
        //console.log("too much bas-gauche X");
        this.rect.width(Math.abs(deltaX));
        this.rect.move(this.initialX+deltaX,this.rect.y());
      }
      else
      {
        this.rect.width(this.rect.width()-Math.sign(deltaX)*Math.abs(deltaX));
      }

      if(deltaY > 0 && deltaY > maxDeltaY)
      {
        needToMove=false;
        deltaY=maxDeltaY;
        //console.log("too much bas-gauche Y");
        this.rect.height(Math.abs(deltaY));
        this.rect.move(this.rect.x(),this.initialY+deltaY);
      }
      else
      {
        this.rect.height(Math.abs(this.rect.height()+Math.sign(deltaY)*Math.abs(deltaY)));
      }

      if(needToMove)
      {
        this.rect.move(this.rect.x()+deltaX,this.rect.y());
      }


    }
    else if(this.initialX<relativePosX && this.initialY>relativePosY) // cadran "haut-droite"
    {
      if(deltaX > 0 && deltaX>maxDeltaX)
      {
        needToMove=false;
        deltaX=maxDeltaX;
        //console.log("too much haut-droite X");
        this.rect.width(Math.abs(deltaX));
        this.rect.move(this.initialX+deltaX,this.rect.y());
      }
      else
      {
        this.rect.width(Math.abs(this.rect.width()+Math.sign(deltaX)*Math.abs(deltaX)));
      }

      if(deltaY < 0 && deltaY<maxDeltaY)
      {
        needToMove=false;
        deltaY=maxDeltaY;
        //console.log("too much haut-droite Y");
        this.rect.height(Math.abs(deltaY));
        this.rect.move(this.rect.x(),this.initialY+deltaY);
      }
      else
      {
        this.rect.height(Math.abs(this.rect.height()-Math.sign(deltaY)*Math.abs(deltaY)));
      }

      if(needToMove)
      {
        this.rect.move(this.rect.x(),this.rect.y()+deltaY);

      }
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
