
<!-- Small modal -->
<div id="modal-title" class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Name of your image</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <input id="name-modal" class="form-control" type="text" placeholder="Default input" value="{{ isset($canvas)?$canvas->name:'' }}">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button id="save-modal" type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

<!-- Large modal -->
<div id="modal-import" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">How do you want to import the svg file?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-footer">
        <button id="import-new" type="button" class="btn btn-primary">Open file in new tab</button>
        <button id="import-saveopen" type="button" class="btn btn-primary">Save current canvas and open file here</button>
        <button id="import-discardopen" type="button" class="btn btn-primary">Discard changes and open file here</button>
      </div>
    </div>
  </div>
</div>

<!-- Large modal -->
<div id="modal-export" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Export as</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-footer">
        <a id="svg-link" href="/canvas/{{ isset($canvas)?$canvas->id:'' }}/svg" role="button" class="btn btn-primary" download>SVG</a>
        <a id="png-link" href="/canvas/{{ isset($canvas)?$canvas->id:'' }}/png" role="button" class="btn btn-primary" download>PNG</a>
      </div>
    </div>
  </div>
</div>
