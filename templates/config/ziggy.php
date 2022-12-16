<?php

return [
    // 'only'   => [ 'login', 'register', 'post.like' ],
    'except' => ['nova.*', 'ignition.*', 'sanctum.*', 'stancl.*', 'debugbar.*'],
    'groups' => [
        'nova' => 'nova.*',
    ],
];
