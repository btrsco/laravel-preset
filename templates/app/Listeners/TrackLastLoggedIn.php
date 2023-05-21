<?php

namespace App\Listeners;

use App\Events\LoggedIn;

class TrackLastLoggedIn
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param LoggedIn $event
     * @return void
     */
    public function handle( LoggedIn $event ): void
    {
        if ( !$event->user->last_logged_in_at || $event->user->last_logged_in_at->isPast() ) {
            $event->user->update( [
                'last_logged_in_at' => now(),
            ] );
        }
    }
}
