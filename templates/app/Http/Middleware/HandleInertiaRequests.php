<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     *
     * @param Request $request
     *
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return vite()->getHash();
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @param Request $request
     *
     * @return array
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'app'       => [
                'name'     => config('app.name'),
                'timezone' => config('app.timezone'),
                'locale'   => config('app.locale'),
                'meta'     => config('meta'),
            ],
            'auth.user' => fn() => $request->user()
                ? $request->user()
                    ->only('id', 'name', 'email')
                : null,
            'flash'     => [
                'message' => fn() => $request->session()->get('message'),
                'success' => fn() => $request->session()->get('success'),
                'warning' => fn() => $request->session()->get('warning'),
            ],
            'versions'  => [
                'php'     => PHP_VERSION,
                'laravel' => Application::VERSION,
            ],
        ]);
    }
}
