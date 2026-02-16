<?php

namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use Illuminate\Database\Console\Migrations\StatusCommand;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserCRUD extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::paginate(10);
        return view('userCRUD.index', compact('users'));
    }

    public function create()
    {
        return view('userCRUD.create');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::find($id);
        if (! $user) {
            return redirect()->route('userCRUD.index')->with('error', 'User no trobat.');
        }

        return view('userCRUD.show', compact('user'));
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'lastname' => 'required|string|max:100',
            'email' => 'required|string|email|max:255|unique:users,email',
            'dni' => 'nullable|string|max:20',
            'phone' => 'nullable|string|max:20',
            'password' => 'required|string|min:8',
            'role_id' => 'nullable|exists:roles,id',
            'status' => 'required|in:y,n',
        ]);

        $data['password'] = Hash::make($data['password']);

        User::create($data);

        return redirect()->route('userCRUD.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = User::find( $id);
        if (! $user) {
            return redirect()->route('userCRUD.index')->with('error', 'User no trobat.');
        }

        $data = $request->validate([
            'name' => 'string|max:100',
            'lastname' => 'string|max:100',
            'email' => ['string','email','max:255', Rule::unique('users')->ignore($id)
            ],
            'dni' => 'nullable|string|max:20',
            'phone' => 'nullable|string|max:20',
            'password' => 'nullable|string|min:8',
            'role_id' => 'nullable|exists:roles,id',
            'status' => 'required|in:y,n'
        ]);

        $user->update($data);

        return redirect()->route('userCRUD.index');
    }

    public function edit($id)
    {
        $user = User::find($id);
        if (! $user) {
            return redirect()->route('userCRUD.index')->with('error', 'User no trobat.');
        }

        return view('userCRUD.edit', compact('user'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    { 
        $user = User::find($id);
        if (! $user) {
            return redirect()->route('userCRUD.index')->with('error', 'User no trobat.');
        }

        User::where('id', $id)->update(['status'=>'n']);


        return redirect()->route('userCRUD.index')->with('success', 'User eliminat.');
    }
}
