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
        $trek = Trek::paginate(10);
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
        $trek = Trek::find($id);
        if (! $trek) {
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
            'id' => 'required',
            'regNumber' => 'required|string|max:20',
            'name' => 'required|string|max:100',
            'municipality_id' => 'nullable|exists:municipalities,id',
            'status' => 'required|in:y,n',
            ]);

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
            'id' => 'required',
            'regNumber' => 'required|string|max:20',
            'name' => 'required|string|max:100',
            'municipality_id' => 'nullable|exists:municipalities,id',
            'status' => 'required|in:y,n',
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

        // Elimino todo lo relacionado con el trek para poder eliminar el trek
        $trek->meetings()->delete();
        $trek->interestingPlaces()->detach();
        $trek->delete();

        return redirect()->route('trekCRUD.index')->with('success', 'Trek eliminat correctament.');
    }
}
