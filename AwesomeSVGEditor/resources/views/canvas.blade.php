@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="row">
      @foreach($canvas as $key => $value)
        <div class="col-md-6 col-sm-12 centered">
            <a href="canvas/{{ $value->id }}/edit"><h2>{{ $value->name }}</h2></a>
            <svg style="border-style: solid;" width="50%" height="50%" viewBox="0 0 1000 1000">{!! $value->code !!}</svg>
        </div>
    @endforeach
    </div>
</div>
@endsection
