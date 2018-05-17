
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
        <p>Enter a new name for your amazing image.</p>
        <input id="name-modal" class="form-control" type="text" placeholder="Default input" value="{{ isset($canvas)?$canvas->name:'' }}">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button id="save-modal" type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

<div id="modal-import" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Import</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>How do you want to import your image?</p>
      </div>
      <div class="modal-footer">
        <button id="import-new" type="button" class="btn btn-primary">Open in a new tab</button>
        <button id="import-saveopen" type="button" class="btn btn-secondary">Save changes & Open here</button>
        <button id="import-discardopen" type="button" class="btn btn-warning">Discard changes & Open here</button>
      </div>
    </div>
  </div>
</div>

<div id="modal-export" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Export</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Export your image as :</p>
      </div>
      <div class="modal-footer">
        <a id="png-link" href="/canvas/{{ isset($canvas)?$canvas->id:'' }}/png" role="button" class="btn btn-primary png-file" download></a>
        <a id="svg-link" href="/canvas/{{ isset($canvas)?$canvas->id:'' }}/svg" role="button" class="btn btn-dark svg-file" download></a>
      </div>
    </div>
  </div>
</div>
