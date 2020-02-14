@extends('layouts.app')

@section('content')
<div class="container-fluid">
  <div class="card-columns">
    @foreach($canvas as $key => $value)
    <article class="card">
      <div class="card-header d-flex justify-content-between align-items-baseline single-title">
        <p class="invisible">By <em>{{ $value->user->name }}</em></p>
        <a href="canvas/{{ $value->id }}"><h3>{{ $value->name }}</h3></a>
        <p>By <em>{{ $value->user->name }}</em></p>
      </div>
      <div class="centered">
        {!! $value->code !!}
      </div>
    </article>
    @endforeach
  </div>
</div>
@if(session('status') != '')
<script>
document.addEventListener("DOMContentLoaded", function(event) {
  toastr.options.positionClass = "toast-top-center";
  toastr.success( "{{ session('status') }}" );
});
</script>
@endif

@endsection
