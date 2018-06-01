@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="row">
      <div class="col-md-8 col-sm-12 mx-auto">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-baseline single-title">
            <p class="invisible">By <em>{{ $canvas->user->name }}</em></p>
            <h3>{{ $canvas->name }}</h3>
            <p>By <em>{{ $canvas->user->name }}</em></p>
          </div>
          <div class="card-body">
            {!! $canvas->code !!}
          </div>
          <div class="card-footer">
              <a href="canvas/{{ $canvas->id }}/png" role="button" class="btn btn-primary png-file"></a>
              <a href="canvas/{{ $canvas->id }}/svg" role="button" class="btn btn-dark svg-file"></a>
          </div>
        </div>
      </div>
    </div>
</div>
@endsection
