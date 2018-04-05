@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Canvas</div>

                <div class="card-body">
                  @foreach ($listcanvas as $canvas)
                      @if ($loop->parent->first)
                          This is first iteration of the parent loop.
                      @endif
                      <p>test</p>
                      {{canvas.name}}
                  @endforeach
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
