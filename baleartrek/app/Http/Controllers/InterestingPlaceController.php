<?php

namespace App\Http\Controllers;

use App\Models\InterestingPlace;
use Illuminate\Http\Request;

class InterestingPlaceController extends Controller
{
    public function index()
    {
        $interesting_places = InterestingPlace::paginate(10);
        return view('interesting_place.index', compact('interesting_places'));
    }

    public function create()
    {
        return view('interesting_place.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
            'gps' => 'required|string|unique:interesting_place,gps',
        ]);

        InterestingPlace::create($data);

        return redirect()->route('interesting_place.index');
    }

    public function show($id)
    {
        $interesting_place = InterestingPlace::find($id);
        if (! $interesting_place) {
            return redirect()->route('interesting_place.index')->with('error', 'Interesting place no trobat.');
        }

        return view('interesting_place.show', compact('interesting_place'));
    }

    public function edit($id)
    {
        $interesting_place = InterestingPlace::find($id);
        if (! $interesting_place) {
            return redirect()->route('interesting_place.index')->with('error', 'Interesting place no trobat.');
        }

        return view('interesting_place.edit', compact('interesting_place'));
    }

    public function update(Request $request, $id)
    {
        $interesting_place = InterestingPlace::find($id);
        if (! $interesting_place) {
            return redirect()->route('interesting_place.index')->with('error', 'Interesting place no trobat.');
        }

        $data = $request->validate([
            'name' => 'required|string|max:100',
            'gps' => 'required|string|unique:interesting_places,gps,' . $interesting_place->id,
        ]);

        $interesting_place->update($data);

        return redirect()->route('interesting_place.index');
    }

    public function destroy($id)
    {
        $interesting_place = InterestingPlace::find($id);
        if (! $interesting_place) {
            return redirect()->route('interesting_place.index')->with('error', 'Interesting place no trobat.');
        }

        // detach related treks in pivot table to avoid foreign key restriction
        $interesting_place->treks()->detach();
        $interesting_place->delete();

        return redirect()->route('interesting_place.index')->with('success', 'Interesting place eliminat.');
    }
}
