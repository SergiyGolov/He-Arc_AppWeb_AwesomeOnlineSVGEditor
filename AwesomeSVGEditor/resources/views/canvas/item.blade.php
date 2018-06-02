@extends('layouts.app')

@section('content')
<div class="container-fluid">
  <div class="row">
    <div class="col-md-8 col-sm-12 mx-auto">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-baseline single-title">
          <p class="invisible">By <em>{{ $canvas->user->name }}</em></p>
          <h2>{{ $canvas->name }}</h2>
          <p>By <em>{{ $canvas->user->name }}</em></p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            {!! $canvas->code !!}
          </li>
          <li class="list-group-item">
            <a href="/canvas/{{ $canvas->id }}/png" role="button" class="btn btn-primary png-file"></a>
            <a href="/canvas/{{ $canvas->id }}/svg" role="button" class="btn btn-dark svg-file"></a>
          </li>
        </ul>
        @if($admin)
        <div class="card-body">
          <h3>Admin section</h3>
          <h4 class="mt-3 mb-3">Share link</h4>
          <div class="card">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                @if($canvas->share=='')
                <a role="button" class="btn btn-outline-primary float-right" href="/canvas/{{ $canvas->id }}/share">Generate share link</a>
                <strong>Share this canvas</strong>
                <p class="card-text">Generate a share link to your show your work</p>
                @else
                <a role="button" class="btn btn-outline-primary float-right" href="/canvas/{{ $canvas->id }}/unshare">Remove share link</a>
                <strong>Unshare this canvas</strong>
                <div>
                  <label for="card-text">Your share link :</label>
                  <div class="contact">
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" disabled aria-label="Share link" aria-describedby="basic-addon2" value="{{ $url }}">
                      <div class="input-group-append">
                        <button type="button" class="btn btn-outline-default btn-copy js-tooltip js-copy" data-toggle="tooltip" data-placement="bottom" data-copy="{{ $url }}" title="Copy to clipboard">
                          <!-- icon from google's material design library -->
                          <svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24"><path d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                @endif
              </li>
            </ul>
          </div>
          <h4 class="mt-4 mb-3">Danger Zone</h4>
          <div class="card border-danger">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                @if($canvas->visibility == 1)
                <button type="button" class="btn btn-outline-danger float-right">Make private</button>
                <strong>Make this canvas private</strong>
                <p class="card-text">Hide this repositry from the public.</p>
                @else
                <button type="button" class="btn btn-outline-danger float-right">Make public</button>
                <strong>Make this canvas public</strong>
                <p class="card-text">Make this repositry visible from the public.</p>
                @endif
              </li>
              <li class="list-group-item">
                <button type="button" class="btn btn-outline-danger float-right" data-toggle="modal" data-target=".bd-modal-sm">Remove this canvas</button>
                <strong>Remove</strong>
                <p class="card-text">Once you delete a canvas, there is no going back. Please be certain.</p>
              </li>
            </ul>
          </div>
        </div>
        @endif
      </div>
    </div>
  </div>
</div>
@if($admin)
<div class="modal fade bd-modal-sm border-danger" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Are you absolutely sure?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <ul class="list-group list-group-flush">
        <li class="alert-warning alert">
          Unexpected bad things will happen if you don’t read this!
        </li>
        <li class="list-group-item">
          This action <strong>cannot</strong> be undone. This will permanently <strong>delete</strong> this canvas.
        </li>
      </ul>
      <div class="modal-footer">
        <button id="remove" type="button" class="btn btn-outline-danger">Remove this canvas</button>
        <button type="button" class="btn btn-outline-primary" data-dismiss="modal">Cancel</button>
      </div>
      <div class="invisible">
      {{ Form::open(array('route' => array('canvas.destroy',$canvas->id), 'id' => 'form-remove', 'method' => 'delete')) }}
      {{ Form::close() }}
      </div>
    </div>
  </div>
</div>
<script>
document.addEventListener("DOMContentLoaded", function(event) {
  $('#remove').on('click',function(){
    $('#form-remove').submit();
  });
});
</script>
@endif
@endsection
