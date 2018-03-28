<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>SVG Editor - @yield('title')</title>

        <!--
        <script src="/js/manifest.js"></script>
        <script src="/js/vendor.js"></script>
        -->
        <script src="/js/app.js"></script>

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
