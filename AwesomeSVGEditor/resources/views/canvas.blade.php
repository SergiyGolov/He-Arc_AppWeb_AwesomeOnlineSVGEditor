@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="row">
      @foreach($canvas as $key => $value)
        <div class="col-md-6 col-sm-12 centered">
            <a href="canvas/{{ $value->id }}/edit"><h2>{{ $value->name }}</h2></a>
            {!! $value->code !!}
        </div>
    @endforeach
    </div>
</div>
@endsection
