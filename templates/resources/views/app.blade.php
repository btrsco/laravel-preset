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

        <title>@yield('page:title', config('meta.title.default')) {!! config('meta.title.separator') !!} {{ config('app.name') }}</title>
        <meta name="description"
              content="@yield('page:description', config('meta.description'))">

        <link href="/favicon.ico"
              rel="shortcut icon">
        <link href="/favicon.png"
              rel="shortcut icon">

        <meta property="og:locale"
              content="{{ str_replace( '_', '-', app()->getLocale() ) }}" />
        <meta property="og:type"
              content="@yield('meta:type', config('meta.type'))" />
        <meta property="og:title"
              content="@yield('meta:title', config('meta.title.default'))" />
        <meta property="og:description"
              content="@yield('meta:description', config('meta.description'))" />
        <meta property="og:url"
              content="@yield('meta:url', request()->url())" />
        <meta property="og:site_name"
              content="@yield('meta:title', config('app.name'))" />
        <meta property="og:image"
              content="@yield('meta:image', url( config('meta.image') ) )" />

        <meta name="twitter:card"
              content="{{ config('meta.twitter_card', 'summary_large_image') }}" />
        <meta name="twitter:title"
              content="@yield('meta:title', config('app.name'))" />
        <meta name="twitter:description"
              content="@yield('meta:description', config('meta.description'))" />
        <meta name="twitter:site"
              content="{{ config('social.twitter.at') }}" />
        <meta name="twitter:image"
              content="@yield( url( 'meta:image' ), url( config('meta.image') ) )" />

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
