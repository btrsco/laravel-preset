<?php

namespace App\Providers;

use App\Events\EmailUpdated;
use App\Events\LoggedIn;
use App\Events\LoggedOut;
use App\Events\PasswordUpdated;
use App\Listeners\TrackLastLoggedIn;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class      => [
            SendEmailVerificationNotification::class,
        ],
        Lockout::class         => [],
        LoggedIn::class        => [
            TrackLastLoggedIn::class,
        ],
        LoggedOut::class       => [],
        EmailUpdated::class    => [
            SendEmailVerificationNotification::class,
        ],
        PasswordUpdated::class => [],
        PasswordReset::class   => [],
        Verified::class        => [],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
