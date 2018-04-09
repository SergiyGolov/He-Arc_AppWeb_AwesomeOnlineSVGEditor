@extends('layouts.app')

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-md-6 col-sm-12 centered">
            <h2>Create your own SVG</h2>
            <img src="img/editor.png" alt="Amazing SVG Editor"/>
            {{ Html::link('/canvas/create', 'Start right now', array('class' => 'btn btn-outline-primary btn-lg')) }}
        </div>
        <div class="col-md-6 col-sm-12 centered">
            <h2>Explore existing SVG</h2>
            <img src="img/gallery.png" alt="Amazing gallery"/>
            {{ Html::link('/canvas', 'Let\'s explore', array('class' => 'btn btn-outline-primary btn-lg')) }}
        </div>
    </div>
    <!--
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success">
                            {{ session('status') }}
                        </div>
                    @endif

                    You are logged in!
                </div>
            </div>
        </div>
    </div>
  -->
</div>
@endsection
