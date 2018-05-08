//Class to connect the interface with our canvas object
class EventManager
{
  constructor(canvas)
  {
    this.canvas = canvas;
    this.save=function(){
      canvas.draw.defs().remove();
      $('#svgEditor svg').removeAttr('xmlns:svgjs'); //Suppression d'un attribut qui est dupliqué
      $('#code').val($('#svgEditor').html()); // TODO ne pas passer par l'élément DOM

      let name = $('#name').val();
      let code = $('#code').val();
      let id = $('#id').val();
      let visibility = $('#visibility').prop('checked')?1:0; // Convert true/false in integer

      let _token = $('input[name=_token]').val();

      if(!name){
        $('#modal-title').modal('toggle');
        name = $('#name').val();
        if(!name){
          return;
        }
      }
      //new Canvas:
      if(!id || id<=0 ){
        $('#id').val(0);
        $.ajax({
          type: "POST",
          url: '/canvas',
          data: {name:name, code:code, id:id, _token:_token, visibility:visibility},
          success: function(msg) {
            if(msg.status == 'success'){
              toastr.success('Canvas saved successfully!');
              console.log(msg);
              if($('#id').val()==0){
                $('#id').val(msg.id);
                $('#svg-link').attr('href','/canvas/'+msg.id+'/svg')
                $('#png-link').attr('href','/canvas/'+msg.id+'/png')
              }

            }else{
              toastr.error('Canvas error while saving');
            }
          },
          error: function(msg){
            console.log(msg);
            toastr.error('Canvas error while saving');
          }
        });
      }else{
        $.ajax({
          type: "PUT",
          url: '/canvas/'+id,
          data: {name:name, code:code, id:id, _token:_token, visibility:visibility},
          success: function(msg) {
            if(msg.status == 'success'){
              toastr.success('Canvas updated successfully!');
              console.log(msg);
            }else{
              toastr.error('Canvas error while updating');
            }
          },
          error: function(msg){
            toastr.error('Canvas error while updating');
          }
        });
      }
    }
    this.saveNewTab=function(code){
      let name = "locally imported Canvas";
      let id=0;
      let visibility = $('#visibility').prop('checked')?1:0; // Convert true/false in integer
      let _token = $('input[name=_token]').val();

      //new Canvas:
      $.ajax({
        type: "POST",
        url: '/canvas',
        data: {name:name, code:code, id:id, _token:_token, visibility:visibility},
        success: function(msg) {
          if(msg.status == 'success'){
            toastr.success('Canvas imported successfully!');
            window.newTab.location.href ="/canvas/"+msg.id+"/edit";
          }else{
            toastr.error('Canvas error while importing');
          }
        },
        error: function(msg){
          console.log(msg);
          toastr.error('Canvas error while importing');
        }
      });
    }

    this._connect();
  }



  _connect(){
    let canvas = this.canvas;

    //Paint mode
    $('#pointer').on('click',function(){
      $('#tools a').removeClass("active");
      $(this).addClass("active");
      console.log($(this));
      canvas.startMoving();
    });
    $('#line').on('click',function(){
      $('#tools a').removeClass("active");
      $(this).addClass("active");
      canvas.dynAddLine();
    });
    $('#pen').on('click',function(){
      $('#tools a').removeClass("active");
      $(this).addClass("active");
      //TODO connect to the right element
    });
    $('#rectangle').on('click',function(){
      $('#tools a').removeClass("active");
      $(this).addClass("active");
      canvas.dynAddRectangle();
    });
    $('#ellipse').on('click',function(){
      $('#tools a').removeClass("active");
      $(this).addClass("active");
      canvas.dynAddCircle();
    });

    //Color picker
    $('#fill-color, #color-mode').on('click',function(){
      $('#color-mode').attr("xlink:href","#fill-color");
    });
    $('#stroke-color').on('click',function(){
      $('#color-mode').attr("xlink:href","#");
    });
    $('#fill-color, #color-mode').on("dblclick",function(){
      //TODO Show color picker
      $('#fillColor').trigger("click");
    });
    $('#stroke-color').on("dblclick",function(){
      //TODO Show color picker
      $('#strokeColor').trigger("click");
    });

    $('#fillColor').on('change',function(){
      let color = $('#fillColor')[0].value;
      console.log(color)
      $('.fill-color').attr("fill",color);
      canvas.setFillColor(color);
    });
    $('#strokeColor').on('change',function(){
      let color = $('#strokeColor')[0].value;
      console.log(color)
      $('.stroke-color').attr("fill",color);
      canvas.setStrokeColor(color);
    })

    //Eraser
    $('#erase').on('click',function(){
      $('#tools a').removeClass("active");
      $(this).addClass("active");
      canvas.startErase();
    });

    //Left side
    $('#strokeWidth').on('change',function(){
      let width=$('#strokeWidth')[0].value;
      if(width<0)
      {
        width=0;
        $('#strokeWidth')[0].value(0);
      }
      canvas.setStrokeWidth(width);
    })

    //Modals link
    $("#import").click(function(e){
      e.preventDefault();
      $('#modal-import').modal('toggle');
    });

    $("#export").click(function(e){
      e.preventDefault();
      window.eventmanager.save();
      $('#modal-export').modal('toggle');
    });

    //Modal events
    $("#import-new").click(function(e){
      $('#modal-import').modal('toggle');
      window.eventmanager.import="new";
      $("#fileinput").trigger('click');
      window.newTab = window.open('/canvas/create', '_blank');
    });

    $("#import-saveopen").click(function(e){
      $('#modal-import').modal('toggle');
      window.eventmanager.import="saveopen";
      $("#fileinput").trigger('click');
    });

    $("#import-discardopen").click(function(e){
      $('#modal-import').modal('toggle');
      window.eventmanager.import="discardopen";
      $("#fileinput").trigger('click');
    });

    $("#fileinput").change(function (e){
      //source: https://stackoverflow.com/questions/32490959/filereader-on-input-change-jquery
      var f = e.target.files[0];
      if (f){
        var r = new FileReader();
        r.readAsText(f);
        r.onload = function(e){

          let importedSvg=e.target.result;
          let _token = $('input[name=_token]').val();

          $.ajax({
            type: "POST",
            url: '/sanitiseAjax',
            data: {code:importedSvg, _token:_token},
            success: function(msg) {
              if(msg.status == 'success')
              {
                let existingSVG = $('#svgEditor svg');
                let id = existingSVG.attr('id') || 'svgEditor';

                switch(window.eventmanager.import)
                {
                  case "discardopen":
                  $('#svgEditor').html(importedSvg);

                  $('#app').find("*").addBack().off(); //magouille pour deconnecter tous les événements

                  window.canvas = new Canvas(id,1000,600);

                  window.eventmanager = new EventManager(window.canvas);
                  $("#fileinput").val("");
                  break;

                  case "saveopen":
                  window.eventmanager.save();
                  $('#name').val($('#name').val()+"v2");
                  $('#navbar-title').text($('#name').val());
                  $('#id').val(-1);

                  $('#svgEditor').html(importedSvg);

                  $('#app').find("*").addBack().off(); //magouille pour deconnecter tous les événements

                  window.canvas = new Canvas(id,1000,600);

                  window.eventmanager = new EventManager(window.canvas);
                  $("#fileinput").val("");
                  break;

                  case "new":
                  window.eventmanager.saveNewTab(importedSvg);
                  break;
                }
              }
              else
              {
                toastr.error('Your imported .svg file is not valid');
              }
            },
            error: function(msg){
              console.log(msg);
              toastr.error('Your imported .svg file is not valid');

            }
          });
        };
      }
      else
      {
        console.log("failed");
      }
    });

    $('#save-modal').on('click',function(){
      let title = $('#name-modal').val();
      $('#name').val(title);
      $('#navbar-title').text(title);
      $('#modal-title').modal('toggle');
    })

    $('#title-edit').on('click', function(){
      $('#modal-title').modal('toggle');
    })

    //Load preconfigure colors and width
    $('#fillColor').trigger('change');
    $('#strokeColor').trigger('change');
    $('#strokeWidth').trigger('change');


    $('#save').on('click',this.save);

    //source: https://www.htmlgoodies.com/html5/javascript/drag-files-into-the-browser-from-the-desktop-using-jquery-event-binding.html
    $('#svgEditor').on({
      'dragover dragenter': function(e) {
        e.preventDefault();
        e.stopPropagation();
      },
      'drop': function(e) {
        var dataTransfer =  e.originalEvent.dataTransfer;
        if( dataTransfer && dataTransfer.files.length) {
          e.preventDefault();
          e.stopPropagation();
          
          if(dataTransfer.files.length==1){
            window.newTab = window.open('/canvas/create', '_blank');
            var reader = new FileReader();
            reader.readAsText(dataTransfer.files[0]);
            reader.onload = function(e){
              let importedSvg=e.target.result;
              let _token = $('input[name=_token]').val();

              $.ajax({
                type: "POST",
                url: '/sanitiseAjax',
                data: {code:importedSvg, _token:_token},
                success: function(msg) {
                  if(msg.status == 'success')
                  {
                    window.eventmanager.saveNewTab(importedSvg);
                  }
                  else
                  {
                    toastr.error('Your imported .svg file is not valid');
                  }
                },
                error: function(msg){
                  console.log(msg);
                  toastr.error('Your imported .svg file is not valid');

                }
              });
            };

          }

        }
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
