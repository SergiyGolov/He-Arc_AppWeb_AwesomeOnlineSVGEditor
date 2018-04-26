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
    if(this.isMoving) //if clicked on element
    {
      this.shape.move(e.offsetX-this.shape.width()/2,e.offsetY-this.shape.height()/2);
    }
    else if(this.shape!=null) //dyn Adding
    {
      this.shape.mouseMove(e);
    }else {
      this.mouseX=e.offsetX;
      this.mouseY=e.offsetY;
    }
  }

  mouseDown()
  {
    switch(this.mode)
    {
      case this.modesEnum.rectangle:
        this.shape=new Rectangle(this,this.mouseX, this.mouseY, 1, 1);
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

    $("#import").click(function(e){
      e.preventDefault();
      $("#fileinput").trigger('click');
    });

    $("#fileinput").change(function (e){
      //source: https://stackoverflow.com/questions/32490959/filereader-on-input-change-jquery
      var f = e.target.files[0];
      if (f){
        var r = new FileReader();
        r.readAsText(f);
        r.onload = function(e){
          var importedSvg=e.target.result;

          $('#svgEditor').html(importedSvg);

          let existingSVG = $('#svgEditor svg');
          let id = existingSVG.attr('id') || 'svgEditor';

          $('#app').find("*").addBack().off(); //magouille pour deconnecter tous les événements

          window.canvas = new Canvas(id,1000,600);

          window.eventmanager = new EventManager(window.canvas);
          $("#fileinput").val("");
        };
      } else
      {
        console.log("failed");
      }
    });

    $('#save-modal').on('click',function(){
      let title = $('#name-modal').val();
      $('#name').val(title);
      $('#navbar-title').html(title);
      $('#modal-title').modal('toggle');
    })

    $('#title-edit').on('click', function(){
      $('#modal-title').modal('toggle');
    })

    //Load preconfigure colors and width
    $('#fillColor').trigger('change');
    $('#strokeColor').trigger('change');
    $('#strokeWidth').trigger('change');


    $('#save').on('click',function(e){
      e.preventDefault();
      canvas.draw.defs().remove();
      $('#code').val($('#svgEditor').html()); // TODO ne pas passer par l'élément DOM

      let name = $('#name').val();
      let code = $('#code').val();
      let id = $('#id').val();

      let _token = $('input[name=_token]').val();

      if(!name){
        $('#modal-title').modal('toggle');
        name = $('#name').val();
        if(!name){
          return;
        }
      }

      //new Canvas:
      if(!id || id<=0){
        $.ajax({
          type: "POST",
          url: '/canvas',
          data: {name:name, code:code, id:id, _token:_token},
          success: function(msg) {
            toastr.success('Canvas saved successfully!');
            $('#id').val(msg.id);
          },
          error: function(msg){
            toastr.error('Canvas error while saving');
          }
        });
      }else{
        $.ajax({
          type: "PUT",
          url: '/canvas/'+id,
          data: {name:name, code:code, id:id, _token:_token},
          success: function(msg) {
            toastr.success('Canvas saved successfully!');
            console.log(msg);
          },
          error: function(msg){
            toastr.error('Canvas error while updating');
          }
        });
      }
    });
  }
}

$(document).ready(function(){

  toastr.options.positionClass = "toast-top-center";

  $('#svgEditor').html($('#code').val());
  let existingSVG = $('#svgEditor svg');
  let id = existingSVG.attr('id') || 'svgEditor';

  //Paramètres de taille par défault:
  window.canvas = new Canvas(id,1000,600);
  window.eventmanager = new EventManager(window.canvas);

  let name = $('#name').val();
  if(!name){
    $('#modal-title').modal('toggle');
  }
});
