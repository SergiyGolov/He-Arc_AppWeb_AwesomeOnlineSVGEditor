@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="row">
      <div class="col-md-8 col-sm-12 mx-auto">
        <div class="card">
          <div class="card-header">
            <h3>{{ $canvas->name }}</h3><p>By <em>Author</em></p>
          </div>
          <div class="centered">
            {!! $canvas->code !!}
          <div>
        </div>
      </div>
    </div>
</div>
@endsection
