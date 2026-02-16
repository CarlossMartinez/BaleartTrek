<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Municipality;
use App\Models\Island;
use App\Models\Zone;

class MunicipalityCRUD extends Controller
{
    public function index()
    {
        $municipalities = Municipality::orderBy('updated_at', 'desc')->paginate(10);
        return view('municipalityCRUD.index', compact('municipalities'));
    }

    public function create()
    {
        $islands = Island::all();
        $zones = Zone::all();
        return view('municipalityCRUD.create', compact('islands', 'zones'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'island_id' => 'nullable|exists:islands,id',
            'zone_id' => 'nullable|exists:zones,id',
            'status' => 'nullable|in:y,n',
        ]);

        Municipality::create($data);

        return redirect()->route('municipalityCRUD.index');
    }

    public function show($id)
    {
        $municipality = Municipality::find($id);
        if (! $municipality) {
            return redirect()->route('municipalityCRUD.index')->with('error', 'Municipality no trobat.');
        }

        return view('municipalityCRUD.show', compact('municipality'));
    }

    public function edit($id)
    {
        $municipality = Municipality::find($id);
        if (! $municipality) {
            return redirect()->route('municipalityCRUD.index')->with('error', 'Municipality no trobat.');
        }

        $islands = Island::all();
        $zones = Zone::all();
        return view('municipalityCRUD.edit', compact('municipality', 'islands', 'zones'));
    }

    public function update(Request $request, $id)
    {
        $municipality = Municipality::find($id);
        if (! $municipality) {
            return redirect()->route('municipalityCRUD.index')->with('error', 'Municipality no trobat.');
        }

        $data = $request->validate([
            'name' => 'required|string|max:100',
            'island_id' => 'nullable|exists:islands,id',
            'zone_id' => 'nullable|exists:zones,id',
        ]);

        $municipality->update($data);

        return redirect()->route('municipalityCRUD.index');
    }

    public function destroy($id)
    {
        $municipality = Municipality::find($id);
        if (! $municipality) {
            return redirect()->route('municipalityCRUD.index')->with('error', 'Municipality no trobat.');
        }

        $municipality->treks()->update(['municipality_id' => null]);

        $municipality->delete();

        return redirect()->route('municipalityCRUD.index')->with('success', 'Municipality eliminat.');
    }
}
