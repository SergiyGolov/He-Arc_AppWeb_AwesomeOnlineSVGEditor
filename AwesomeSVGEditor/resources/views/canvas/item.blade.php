@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="row">
      <div class="col-md-6 col-sm-12 centered">
          <a href="canvas/{{ $canvas->id }}/edit"><h2>{{ $canvas->name }}</h2></a>
          {!! $canvas->code !!}
      </div>
    </div>
</div>
@endsection
