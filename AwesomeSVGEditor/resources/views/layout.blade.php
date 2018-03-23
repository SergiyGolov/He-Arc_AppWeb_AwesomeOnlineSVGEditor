<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>SVG Editor - @yield('title')</title>
    </head>
    <body>
        <div class="container-fluid">
            @yield('content')
        </div>
        <!--
        @section('sidebar')
            This is the master sidebar.
        @show
        -->
    </body>
</html>
