<?php

namespace App\Models\Enums;

enum UserRole: string
{
    case Admin = 'admin';
    case Moderator = 'moderator';
    case User = 'user';
}
