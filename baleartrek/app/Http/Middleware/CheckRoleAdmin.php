<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\Role;

class CheckRoleAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {

        // Comprovar si està autenticat
        if (!Auth::guard('sanctum')->check()) {
            return response()->json(['message' => 'No autenticat'], 401);
        }

        // Comprovar si és admin
        if (!Auth::guard('sanctum')->user()->isAdmin()) {
            return response()->json(['message' => 'Accés denegat: permisos insuficients'], 403);
        }
        return $next($request);
    }
}
