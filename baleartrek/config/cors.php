<?php

return[

    'paths' => ['*'],   
    'allowed_methods' => ['*'],
    'allowed_origins' => [
    env('FRONT_URL', 'http://localhost:5173')
    ],

    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];

