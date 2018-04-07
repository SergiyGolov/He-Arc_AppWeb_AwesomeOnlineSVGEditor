@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="row">
      @foreach($nerds as $key => $value)
        <div class="col-md-6 col-sm-12 centered">
            <h2>{{ $value->name }}</h2>
            {{ $value->code }}
        </div>
    @endforeach
    </div>
</div>
@endsection
