class Rectangle {
  constructor(data){
    this.data = data;
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
    this.movingShape.width(this.movingShape.width()+e.movementX);
    this.movingShape.height(this.movingShape.height()+e.movementY);
  }

  mouseDown()
  {
    this.movingShape=this.addRectangle(this.mouseX, this.mouseY, 1, 1);
  }
}

class Circle {
  constructor(data){
    this.data = data;
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
    let r=this.movingShape.node.r.baseVal.value;
    this.movingShape.radius(r+Math.max(e.movementX,e.movementY));
  }

  mouseDown()
  {
    this.movingShape=this.addCircle(this.mouseX, this.mouseY, 1);
  }
}

class Line {

  constructor(data){
    this.data = data;
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
    let x2=this.movingShape.node.x2.baseVal.value;
    let y2=this.movingShape.node.y2.baseVal.value;
    this.movingShape.plot(this.mouseX,  this.mouseY,x2+e.movementX,y2+e.movementY);
  }

  mouseDown()
  {
    this.movingShape=this.addLine(this.mouseX, this.mouseY, this.mouseX+1, this.mouseY+1);
  }

}

class Pen {


}
