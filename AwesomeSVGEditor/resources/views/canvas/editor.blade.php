<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" class="expand">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="{{ asset('js/editor.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,600" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/editor.css') }}" rel="stylesheet">
    <style type="text/css">

    </style>
</head>
<body class="expand">
    <div id="app" class="expand">
        <nav class="navbar navbar-expand-md navbar-laravel">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    {{ config('app.name', 'Laravel') }}
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                File <span class="caret"></span>
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="" id="export">
                                    Export as
                                </a>
                                <a class="dropdown-item" href="" id="import">
                                    Import .svg
                                </a>
                                <input type='file' id='fileinput'>
                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    @csrf
                                </form>
                                <a class="dropdown-item" href="" id="shareLink">
                                    Get share link
                                </a>
                            </div>
                        </li>
                    </ul>
                    <span class="navbar-nav whitetext"><input type="checkbox" id="visibility"><label for="visibility">publicly visible</label></span>
                    <ul class="navbar-nav mx-auto">
                      <div id="navbar-title">
                        {{ isset($canvas)?$canvas->name:'' }}
                      </div>
                      <button id="title-edit" type="button" class="btn btn-default">
                        <span class="glyphicon glyphicon-pencil"></span>
                      </button>

                      <a id="save" href="#" class="btn btn-lg btn-outline-danger">Save</a>
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        @guest
                            <li><a id="login" class="nav-link" href="#">{{ __('Login') }}</a></li>
                            <li><a id="register" class="nav-link" href="#">{{ __('Register') }}</a></li>
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>
        <main class="expand">
          <div id="editor" class="expand">
            <div id="tools">
              <a id="pointer" class="active">
                <svg version="1.1" id="svg-pointer" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                	 viewBox="0 0 512 512" xml:space="preserve">
                <polygon class="fill" points="429.742,319.31 82.489,0 82.258,471.744 187.633,370.918 249.523,512 346.083,469.642 284.193,328.56"/>
                </svg>
              </a>
              <a id="pen">
                <svg version="1.1" id="svg-pen" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                	 viewBox="0 0 493.638 493.638" xml:space="preserve">
                  <polygon class="fill" fill="#020202" points="427.092,118.538 99.89,445.738 90.239,436.086 417.439,108.885 358.708,50.154
                  		31.376,377.481 116.022,462.13 443.351,134.798"/>
                	<path class="fill" file="#020202" d="M492.627,85.523c-10.064,23.448-43.053,43.053-43.053,43.053l-84.646-84.644
                		c0,0,27.29-33.513,43.054-43.053S502.692,62.074,492.627,85.523z"/>
                	<polygon class="fill" fill="#020202" points="110.059,468.088 0.127,493.638 25.413,383.447"/>
                </svg>
              </a>
              <a id="line">
                <svg version="1.1" id="svg-line" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                	 viewBox="0 0 511.998 511.998" xml:space="preserve">
                   <line class="stroke" fill="none" stroke="#000" stroke-width="70" stroke-opacity="null" fill-opacity="null" x1="0" y1="0"
                   x2="511.998" y2="511.998" stroke-linejoin="null" stroke-linecap="null" stroke-dasharray="none"></line>
                </svg>
              </a>
              <a id="rectangle">
                <svg version="1.1" id="svg-rectangle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                	 viewBox="0 0 64 48" xml:space="preserve">
                	<rect class="fill" width="64" height="48"/>
                </svg>
              </a>
              <a id="ellipse">
                <svg version="1.1" id="svg-ellipse" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                	 viewBox="0 0 512 300" xml:space="preserve">
                  <ellipse class="fill" fill="none" stroke="none" cx="256" cy="150" rx="256" ry="150"></ellipse>
                </svg>
              </a>
              <a id="erase">
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                	viewBox="0 0 900.5 900.5" style="enable-background:new 0 0 900.5 900.5;" xml:space="preserve"
                	>
                <g>
                	<path class="fill" fill="#020202" d="M176.415,880.5c0,11.046,8.954,20,20,20h507.67c11.046,0,20-8.954,20-20V232.487h-547.67V880.5L176.415,880.5z
                		 M562.75,342.766h75v436.029h-75V342.766z M412.75,342.766h75v436.029h-75V342.766z M262.75,342.766h75v436.029h-75V342.766z"/>
                	<path class="fill" fill="#020202" d="M618.825,91.911V20c0-11.046-8.954-20-20-20h-297.15c-11.046,0-20,8.954-20,20v71.911v12.5v12.5H141.874
                		c-11.046,0-20,8.954-20,20v50.576c0,11.045,8.954,20,20,20h34.541h547.67h34.541c11.046,0,20-8.955,20-20v-50.576
                		c0-11.046-8.954-20-20-20H618.825v-12.5V91.911z M543.825,112.799h-187.15v-8.389v-12.5V75h187.15v16.911v12.5V112.799z"/>
                </g>
                </svg>
              </a>

              <a id="color-picker">
                <svg version="1.1" id="svg-rectangle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                   viewBox="0 0 96 96" xml:space="preserve">
                  <rect id="fill-color" class="fill-color" fill="#f00" width="64" height="64"/>
                  <g id="stroke-color">
                    <rect class="stroke-color" stroke="#fff" stroke-width="1" fill="#0f0" x="32" y="32" width="64" height="64"/>
                    <rect id="background-color" stroke="#fff" stroke-width="1" x="52" y="52" width="24" height="24"/>
                  </g>
                  <use id="color-mode" xlink:href="#fill-color"/>
                </svg>
              </a>

              <input type="number" id="strokeWidth" min=0 value=1>

              <!-- Hidden color picker, don't remove those lines -->
              <input type="color" id="fillColor" class="invisible">
              <input type="color" id="strokeColor" class="invisible">
            </div>
            <div id="canvas">
              <div id="svgEditor"></div>
            </div>
            <div id="options">
              <h5 id="option-select">Canvas</h5>
              <div class="height-null">
                <div id="width">
                  <div class="aspect-ratio">
                    <label>Width</label>
                    <input type="number" value="500" id="widthVal"/>
                  </div>
                </div>
                <div id="height">
                  <div class="aspect-ratio">
                    <label>Height</label>
                    <input type="number" value="500" id="heightVal"/>
                  </div>
                </div>
                <div id="x">
                  <div class="aspect-ratio">
                    <label>X</label>
                    <input type="number" value="500" id="xVal"/>
                  </div>
                </div>
                <div id="y">
                  <div class="aspect-ratio">
                    <label>Y</label>
                    <input type="number" value="500" id="yVal"/>
                  </div>
                </div>
                <div id="x1">
                  <div class="aspect-ratio">
                    <label>X1</label>
                    <input type="number" value="500" id="x1Val"/>
                  </div>
                </div>
                <div id="y1">
                  <div class="aspect-ratio">
                    <label>Y1</label>
                    <input type="number" value="500" id="y1Val"/>
                  </div>
                </div>
                <div id="x2">
                  <div class="aspect-ratio">
                    <label>X2</label>
                    <input type="number" value="500" id="x2Val"/>
                  </div>
                </div>
                <div id="y2">
                  <div class="aspect-ratio">
                    <label>Y2</label>
                    <input type="number" value="500" id="y2Val"/>
                  </div>
                </div>
                <div id="colorStroke">
                  <div class="aspect-ratio">
                    <label>Stroke</label>
                    <input type="color" id="colorStrokeVal"/>
                  </div>
                </div>
                <div id="colorFill">
                  <div class="aspect-ratio">
                    <label>Fill</label>
                    <input type="color" id="colorFillVal"/>
                  </div>
                </div>
              <div>
            </div>
            <div class="hidden-data"></div>
            <div class="hidden-data">
                {{ Form::open(array('id' => 'form-update')) }}
                {{ Form::text('name', isset($canvas)?$canvas->name:'', array('id' => 'name', 'class' => 'form-control')) }}
                {{ Form::textarea('code', isset($canvas)?$canvas->code:'', array('id' => 'code', 'class' => 'form-control')) }}
                {{ Form::hidden('id', isset($canvas)?$canvas->id:'', array('id' => 'id')) }}
                {{ Form::checkbox('visibility',isset($canvas)?$canvas->visibility:1, isset($canvas)?$canvas->visibility?true:false:true, array('id' => 'visibility')) }}
                {{ Form::submit() }}
                {{ Form::close() }}
            </div>
          </div>
        </div>
        @component('canvas.partial.modal', ['canvas' => isset($canvas)?$canvas:null])
            You are not allowed to access this resource!
        @endcomponent
      </main>
    </div>
</body>
</html>
