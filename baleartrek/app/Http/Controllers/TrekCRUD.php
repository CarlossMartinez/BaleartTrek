<?php

namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use Illuminate\Database\Console\Migrations\StatusCommand;
use Illuminate\Http\Request;
use App\Models\Trek;
use App\Models\Municipality;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class TrekCRUD extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $trek = Trek::orderBy('updated_at', 'desc')->paginate(10);
        return view('trekCRUD.index', compact('trek'));
    }

    public function create()
    {
        $municipalities = Municipality::all('id', 'name');
        return view('trekCRUD.create', compact('municipalities'));
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
            'regNumber' => ['required', 'string', 'max:20', Rule::unique('treks', 'regNumber')->ignore($request->regNumber, 'regNumber')],
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
            'regNumber' => ['required', 'string', 'max:20', Rule::unique('treks', 'regNumber')->ignore($request->regNumber, 'regNumber')],
            'name' => 'required|string|max:100',
            'municipality_id' => 'exists:municipalities,id',
            'status' => 'in:y,n',
        ]);

        $user->update($data);

        return redirect()->route('trekCRUD.index');
    }

    public function edit($id)
    {
        $municipalities = Municipality::all('id', 'name');
        $treks = Trek::all();
        
        $trek = Trek::find($id);
        if (! $trek) {
            return redirect()->route('trekCRUD.index')->with('error', 'Trek no trobat.');
        }

        return view('trekCRUD.edit', compact('trek', 'treks', 'municipalities'));
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
