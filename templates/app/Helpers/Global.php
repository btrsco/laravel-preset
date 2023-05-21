<?php

if ( !function_exists( 'is_impersonating' ) ) {
    /**
     * Check if user is currently being impersonated.
     *
     * @return bool
     */
    function is_impersonating(): bool
    {
        return session()->has( 'nova_impersonated_by' );
    }
}
