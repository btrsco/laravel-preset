<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LoggedOut
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * The user instance.
     *
     * @var Authenticatable|User
     */
    public Authenticatable|User $user;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct( Authenticatable|User $user )
    {
        $this->user = $user;
    }
}
