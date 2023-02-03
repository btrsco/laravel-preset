<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>

        @if( app()->environment( ['local', 'staging'] ) )
            <meta name="robots"
                  content="noindex, nofollow">
        @endif

        <meta charset="utf-8">
        <meta name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <meta http-equiv="x-ua-compatible"
              content="ie=edge">

        <meta name="theme-color"
              content="@yield('meta:theme_light', config( 'meta.theme.light' ))"
              media="(prefers-color-scheme: light)" />
        <meta name="theme-color"
              content="@yield('meta:theme_dark', config( 'meta.theme.dark' ))"
              media="(prefers-color-scheme: dark)" />

        <link rel="dns-prefetch"
              href="https://cdn.serve.ooo">

        @if( !app()->environment(['local', 'staging']) )
            <script defer
                    data-domain=""
                    src="https://a.serve.ooo/js/plausible.js"></script>
        @else
            <script defer
                    data-domain=""
                    src="https://a.serve.ooo/js/plausible.js"></script>
        @endif
        <script>window.plausible = window.plausible || function () { ( window.plausible.q = window.plausible.q || [] ).push( arguments ) }</script>

        @vite
        @inertiaHead

    </head>
    <body>

        @inertia

    </body>
</html>
