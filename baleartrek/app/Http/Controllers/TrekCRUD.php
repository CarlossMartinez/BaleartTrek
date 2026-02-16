<?php

namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use Illuminate\Database\Console\Migrations\StatusCommand;
use Illuminate\Http\Request;
use App\Models\Trek;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class TrekCRUD extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = Trek::paginate(10);
        return view('trekCRUD.index', compact('trek'));
    }

    public function create()
    {
        return view('trekCRUD.create');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::find($id);
        if (! $user) {
            return redirect()->route('trekCRUD.index')->with('error', 'Trek no trobat.');
        }

        return view('trekCRUD.show', compact('trek'));
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
            'status' => 'nullable',
        ]);

        $data['password'] = Hash::make($data['password']);

        Trek::create($data);

        return redirect()->route('trekCRUD.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = Trek::find( $id);
        if (! $user) {
            return redirect()->route('trekCRUD.index')->with('error', 'Trek no trobat.');
        }

        $data = $request->validate([
            'name' => 'string|max:100',
            'lastname' => 'string|max:100',
            'email' => ['string','email','max:255', Rule::unique('trek')->ignore($id)
            ],
            'dni' => 'nullable|string|max:20',
            'phone' => 'nullable|string|max:20',
            'password' => 'nullable|string|min:8',
            'role_id' => 'nullable|exists:roles,id',
            'status' => 'required|in:y,n'
        ]);

        $user->update($data);

        return redirect()->route('trekCRUD.index');
    }

    public function edit($id)
    {
        $trek = Trek::find($id);
        if (! $trek) {
            return redirect()->route('trekCRUD.index')->with('error', 'Trek no trobat.');
        }

        return view('trekCRUD.edit', compact('trek'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    { 
        $trek = Trek::find($id);
        if (! $trek) {
            return redirect()->route('trekCRUD.index')->with('error', 'Trek no trobat.');
        }



        return redirect()->route('trekCRUD.index')->with('success', 'User eliminat.');
    }
}
