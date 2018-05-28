@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="row">
      <div class="col-md-6 col-sm-12">
        <div class="centered card">
          <h2>{{ $canvas->name }}</h2>
          {!! $canvas->code !!}
        </div>
      </div>
    </div>
</div>
@endsection
