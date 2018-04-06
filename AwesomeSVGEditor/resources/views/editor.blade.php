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
    <script src="{{ asset('js/shapes.js') }}" defer></script>
    <script src="{{ asset('js/editor.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,600" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/editor.css') }}" rel="stylesheet">
    <style type="text/css">
      /* TODO coller ce code dans editor.scss à définir */
        .expand {
          height: 100%;
        }

        #app {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: min-content 1fr;
        }

        #editor {
          display: grid;
          grid-template-columns: 50px 1fr 250px;
          grid-template-rows: 1fr;
        }

        #tools {
          display: flex;
          flex-direction: column;
          background-color: #2c3e50;
        }

        #tools a {
          padding: 1.2em 1em;
          height: 50px;
        }

        #canvas {
          background-color: #ecf0f1;
        }

        #options {
          background-color: #2c3e50;
        }

        a svg .fill{
          fill: #ecf0f1;
        }

        a svg:hover .fill{
          fill: white;
        }

        a svg .stroke{
          stroke: #ecf0f1;
        }

        a svg:hover .stroke{
          stroke: white;
        }

        #svgEditor{
          width:90%;
          height:500px;
          background-color: white;
        }

        #toolbox{
          float:left;
        }

        #strokeWidth{
          width:50px;
        }

    </style>
</head>
<body class="expand">
    <div id="app" class="expand">
        <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
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
                                <a class="dropdown-item" href="{{ route('logout') }}">
                                    Export as
                                </a>
                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    @csrf
                                </form>
                            </div>
                        </li>
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        @guest
                            <li><a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a></li>
                            <li><a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a></li>
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
              <a id="pointer"> <!-- TODO mode souris -->
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <polygon class="fill" points="429.742,319.31 82.489,0 82.258,471.744 187.633,370.918 249.523,512 346.083,469.642 284.193,328.56"/>
                </svg>
              </a>
              <a id="pen"> <!-- TODO mode pinceau -->
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                	 viewBox="0 0 493.638 493.638" style="enable-background:new 0 0 493.638 493.638;" xml:space="preserve">
                  <g>
                  	<polygon class="fill" fill="#020202" points="427.092,118.538 99.89,445.738 90.239,436.086 417.439,108.885 358.708,50.154
                  		31.376,377.481 116.022,462.13 443.351,134.798 			"/>
                  	<path class="fill" file="#020202" d="M492.627,85.523c-10.064,23.448-43.053,43.053-43.053,43.053l-84.646-84.644
                  		c0,0,27.29-33.513,43.054-43.053S502.692,62.074,492.627,85.523z"/>
                  	<polygon class="fill" fill="#020202" points="110.059,468.088 0.127,493.638 25.413,383.447"/>
                  </g>
                </svg>
              </a>
              <a id="line"> <!-- TODO mode line -->
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                	 viewBox="0 0 511.998 511.998" style="enable-background:new 0 0 511.998 511.998;" xml:space="preserve">
                   <line class="stroke" fill="none" stroke="#000" stroke-width="70" stroke-opacity="null" fill-opacity="null" x1="0" y1="0"
                   x2="511.998" y2="511.998" stroke-linejoin="null" stroke-linecap="null" stroke-dasharray="none"></line>
                </svg>
              </a>
              <a id="rectangle"> <!-- TODO mode square -->
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                	 viewBox="0 0 64 48" style="enable-background:new 0 0 64 64;" xml:space="preserve">
                	<rect class="fill" width="64" height="48"/>
                </svg>
              </a>
              <a id="ellipse">
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                	 viewBox="0 0 512 300" style="enable-background:new 0 0 512 300;" xml:space="preserve">
                  <ellipse class="fill" fill="none" stroke="none" cx="256" cy="150" rx="256" ry="150"></ellipse>
                </svg>
              </a>
              <input type="button" value="Erase" id="erase">
              <input type="color" id="fillColor">
              <input type="color" id="strokeColor">
              <input type="number" id="strokeWidth" min=0 value=1>
              </ul>
            </div>
            <div id="canvas">
              <div id="svgEditor"></div>
            </div>
            <div id="options">

            </div>
          </div>
        </main>
    </div>
</body>
</html>
