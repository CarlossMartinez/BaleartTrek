<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->api(prepend: [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        $middleware->alias([
            'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
            'API-KEY' => \App\Http\Middleware\ApiKeyMiddleware::class,  // 'API-KEY' és l'alias del middleware
            'CHECK-ROLEADMIN' => \App\Http\Middleware\CheckRoleAdmin::class,  // 'CHECK-ROLEADMIN' és l'alias del middleware
            'MULTI-AUTH' => \App\Http\Middleware\MultiAuthMiddleware::class,  // 'MULTI-AUTH' és l'alias del middleware
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
