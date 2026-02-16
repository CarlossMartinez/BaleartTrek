<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;
use Exception;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $users = User::with('role')->get();
            return UserResource::collection($users);
        } catch (Exception $e) {
            return response()->json([
                'msg' => "Error durant la recerca dels usuaris",
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        try {
            return new UserResource($user);
        } catch (Exception $e) {
            return response()->json([
                'msg' => "Error durant la recerca de l'usuari",
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user)
    {
        try {
            $data = $request->validated();
            $user->update($data);

            return response()->json([
                'msg' => 'User actualitzat correctament',
                'user' => new UserResource($user)
            ]);
        } catch (Exception $e) {
            return response()->json([
                'msg' => "Error durant l'actualització d'un usuari",
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $user->delete();
            return (new UserResource($user))->additional(['msg' => 'Usuari eliminat correctament']);
        } catch (Exception $e) {
            return response()->json([
                'msg' => 'Aquest usuari no pot ser eliminat perquè està referenciat en altres taules',
                'error' => $e->getMessage()
            ]);
        }
    }
}
