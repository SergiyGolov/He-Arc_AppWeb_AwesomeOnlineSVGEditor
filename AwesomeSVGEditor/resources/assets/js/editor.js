import Canvas from './canvas';

//Class to connect the interface with our canvas object
class EventManager
{
  constructor(canvas)
  {
    this.canvas = canvas;
    this.save=function(){
      canvas.unselect();
      canvas.draw.defs().remove();
      $('#svgEditor svg').removeAttr('xmlns:svgjs'); //Suppression d'un attribut qui est dupliqué
      let detached=$('#svgEditor').find(':hidden').detach();
      $('#code').val($('#svgEditor').html()); // TODO ne pas passer par l'élément DOM
      $('#svgEditor svg').append(detached);

      let name = $('#name-canvas').val();
      let code = $('#code').val();
      let id = $('#id').val();
      let visibility = $('#visibility').prop('checked')?1:0; // Convert true/false in integer

      let _token = $('input[name=_token]').val();

      if(!name){
        $('#modal-title').modal('toggle');
        name = $('#name-canvas').val();
        if(!name){
          return;
        }
      }
      //new Canvas:
      if(!id || id<=0 ){
        $('#id').val(0);
        $.ajax({
          type: "post",
          url: '/canvas',
          responseType: 'json',
          xhrFields: { withCredentials: true },
          data: {name:name, code:code, id:id, _token:_token, visibility:visibility},
          success: function(msg) {
            if(msg.status == 'success'){
              toastr.success('Canvas saved successfully!');
              if($('#id').val()==0){
                $('#id').val(msg.id);
                $('#svg-link').attr('href','/canvas/'+msg.id+'/svg')
                $('#png-link').attr('href','/canvas/'+msg.id+'/png')
                // $('#share').val(msg.share);
                // $('#share').val(window.location.origin+"/shared/"+$('#share').val());
              }

            }else{
              toastr.error('Canvas error while saving');
            }
          },
          error: function(msg){
            toastr.error('Canvas error while saving');
          }
        });
      }else{
        $.ajax({
          type: "put",
          url: '/canvas/'+id,
          responseType: 'json',
          xhrFields: { withCredentials: true },
          data: {name:name, code:code, id:id, _token:_token, visibility:visibility},
          success: function(msg) {
            if(msg.status == 'success'){
              toastr.success('Canvas updated successfully!');
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
        type: "post",
        url: '/canvas',
        responseType: 'json',
        xhrFields: { withCredentials: true },
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
          toastr.error('Canvas error while importing');
        }
      });
    }
    this._connect();
  }

  showHelp()
  {
    $('#strokeWidth').popover('show');
    $('#pointer').popover('show');
    $('#pen').popover('show');
    $('#line').popover('show');
    $('#rectangle').popover('show');
    $('#ellipse').popover('show');
    $('#erase').popover('show');
    $('#fill-color, #color-mode').popover('show');
  }

  hideHelp()
  {
    $('#strokeWidth').popover('hide');
    $('#pointer').popover('hide');
    $('#pen').popover('hide');
    $('#line').popover('hide');
    $('#rectangle').popover('hide');
    $('#ellipse').popover('hide');
    $('#erase').popover('hide');
    $('#fill-color, #color-mode').popover('hide');
  }

  _connect(){
    let canvas = this.canvas;

    $(document).keydown(function(e) {
      if(e.keyCode == 83 && e.ctrlKey){
        e.preventDefault();
        window.eventmanager.save();
      }else if(e.keyCode == 49 ){
        $('#pointer').click();
      }else if(e.keyCode == 50 ){
        $('#pen').click();
      }else if(e.keyCode == 51 ){
        $('#line').click();
      }else if(e.keyCode == 52 ){
        $('#rectangle').click();
      }else if(e.keyCode == 53 ){
        $('#ellipse').click();
      }else if(e.keyCode == 54 ){
        $('#erase').click();
      }else if(e.keyCode==112 && e.ctrlKey){
        window.eventmanager.showHelp();
      }
    });

    $(document).keyup(function(e) {
      if(e.keyCode==112 && e.ctrlKey){
        window.eventmanager.hideHelp();
      }
    });


    //Paint mode
    $('#pointer').on('click',function(){
      $('#tools a').removeClass("active");
      $(this).addClass("active");
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
      canvas.dynAddPolyLine();
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
      $('.fill-color').attr("fill",color);
      canvas.setFillColor(color);
    });
    $('#strokeColor').on('change',function(){
      let color = $('#strokeColor')[0].value;
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
      //TODO Export sans sauvegarde
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


    $('#shareLink').click(function(e) {
      e.preventDefault();
      $('#modal-share').modal('toggle');
    });

    $('#share-btn').click(function(e){
      let id=$('#id').val();
      let _token = $('input[name=_token]').val();
      $.ajax({
        type: 'post',
        url: '/canvas/'+id+'/share',
        responseType: 'json',
        data: {_token:_token},
        success: function(msg) {
          if(msg.status == 'OK'){
            $('#div-unshare').removeClass('d-none');
            $('#div-share').addClass('d-none');
            $('#link-copy').attr('data-copy',msg.link);
            $('#link-display').val(msg.link);
          }else{
            toastr.error('Error while getting share link');
          }
        },
        error: function(msg){
          toastr.error('Error while getting share link');
        }
      });
    });

    $('#unshare-btn').click(function(e){
      let id=$('#id').val();
      let _token = $('input[name=_token]').val();
      $.ajax({
        type: 'post',
        url: '/canvas/'+id+'/unshare',
        responseType: 'json',
        data: {_token:_token},
        success: function(msg) {
          if(msg.status == 'OK'){
            $('#div-share').removeClass('d-none');
            $('#div-unshare').addClass('d-none');
          }else{
            toastr.error('Error unsharing');
          }
        },
        error: function(msg){
          toastr.error('Error while unsharing');
        }
      });
    });

    $("#fileinput").change(function (e){
      //source: https://stackoverflow.com/questions/32490959/filereader-on-input-change-jquery
      var f = e.target.files[0];
      if(f){
        var r = new FileReader();
        r.readAsText(f);
        r.onload = function(e){

          let importedSvg=e.target.result;
          let _token = $('input[name=_token]').val();

          $.ajax({
            type: "post",
            url: '/canvas/sanitise',
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
                  $('#name-canvas').val($('#name-canvas').val()+"v2");
                  $('#navbar-title').text($('#name-canvas').val());
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
              toastr.error('Your imported .svg file is not valid');
            }
          });
        };
      } else {
        console.log("failed");
      }
    });

    $('#save-modal').on('click',function(){
      let title = $('#name-modal').val();
      $('#name-canvas').val(title);
      $('#navbar-title').text(title);
      $('#modal-title').modal('toggle');
    })

    $('#title-edit').click(function(e){
      e.preventDefault();
      $('#modal-title').modal('toggle');
    })

    $("label[for='visibility']").on('click',function(e){
      $('#visibility').click();
      return false;
    });

    //Load preconfigure colors and width
    $('#fillColor').trigger('change');
    $('#strokeColor').trigger('change');
    $('#strokeWidth').trigger('change');

    //Open login and register modal
    $('#register').on('click',function(e){
      $('#authTab a[href="#tab-register"]').tab('show');
      $('#modal-auth').modal('toggle');
    });
    $('#login').on('click',function(){
      $('#authTab a[href="#tab-login"]').tab('show');
      $('#modal-auth').modal('toggle');
    });

    //Save button
    $('#save').on('click',this.save);

    //Loggin button
    let authReload = function(){
      $('#svgEditor svg').removeAttr('xmlns:svgjs'); //Suppression d'un attribut qui est dupliqué
      let detached=$('#svgEditor').find(':hidden').detach();
      $('#code').val($('#svgEditor').html()); // TODO ne pas passer par l'élément DOM

      $('#svgEditor svg').append(detached);
      $('#form-update').attr('method','put');
      $('#form-update').submit();
    }

    $('#btn-login').on('click',function(e){
      e.preventDefault();
      e.stopPropagation();

      let email = $('#login-form #email').val();
      let password = $('#login-form #password').val();
      let _token = $('#login-form input[name=_token]').val();

      $.ajax({
        type: "post",
        url: '/login',
        data: {email:email, password:password, _token:_token},
        success: function(msg) {
          authReload();
        },
        error: function(msg){
          toastr.error('Error while login');
        }
      });
    });
    $('#btn-register').on('click',function(e){
      e.preventDefault();
      e.stopPropagation();

      let email = $('#register-form #email').val();
      let name = $('#register-form #name').val();
      let password = $('#register-form #password').val();
      let password_confirmation = $('#register-form #password-confirm').val();
      let _token = $('#register-form input[name=_token]').val();
      $.ajax({
        type: "post",
        url: '/register',
        data: {email:email, name:name, password:password, password_confirmation:password_confirmation, _token:_token},
        success: function(msg) {
          authReload();
        },
        error: function(msg){
          toastr.error('Error while register');
        }
      });
    });

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
                type: "post",
                url: '/canvas/sanitize',
                data: {code:importedSvg, _token:_token},
                success: function(msg) {
                  if(msg.status == 'success') {
                    window.eventmanager.saveNewTab(importedSvg);
                  } else {
                    toastr.error('Your imported .svg file is not valid');
                  }
                },
                error: function(msg){
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

  let name = $('#name-canvas').val();
  if(!name){
    $('#modal-title').modal('toggle');
  }

  $('#strokeWidth').popover({ trigger: 'hover',content: "Stroke width in pixels" });
  $('#pointer').popover({ trigger: 'hover',content: "[1] Pointer tool: select shape to move/resize" });
  $('#pen').popover({ trigger: 'hover',content: "[2] Free draw tool" });
  $('#line').popover({ trigger: 'hover',content: "[3] Line draw tool" });
  $('#rectangle').popover({ trigger: 'hover',content: "[4] Rectangle draw tool, press shift while drawing to draw a square" });
  $('#ellipse').popover({ trigger: 'hover',content: "[5] Ellipse draw tool, press shift while drawing to draw a circle" });
  $('#erase').popover({ trigger: 'hover',content: "[6] Erase tool: click on a shape to erase it" });
  $('#fill-color, #color-mode').popover({ trigger: 'hover',content: "Select shape fill color" });
  $('#stroke-color').popover({ trigger: 'hover',content: "Select shape stroke color" });
});
