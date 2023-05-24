<?php

if ( ! function_exists('is_impersonating')) {
    /**
     * Check if user is currently being impersonated.
     *
     * @return bool
     */
    function is_impersonating(): bool
    {
        return session()->has('nova_impersonated_by');
    }
}

if ( ! function_exists('inertia')) {
    /**
     * Inertia helper.
     *
     * @param string|null $component
     * @param array       $props
     *
     * @return \Inertia\Response|\Inertia\ResponseFactory
     */
    function inertia(?string $component = null, array $props = []): \Inertia\Response|\Inertia\ResponseFactory
    {
        $instance = \Inertia\Inertia::getFacadeRoot();

        if ($component) {
            return $instance->render($component, $props);
        }

        return $instance;
    }
}


if ( ! function_exists('inertia_location')) {
    /**
     * Inertia location helper.
     *
     * @param string $url
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    function inertia_location(string $url): \Symfony\Component\HttpFoundation\Response
    {
        $instance = Inertia\Inertia::getFacadeRoot();

        return $instance->location($url);
    }
}
