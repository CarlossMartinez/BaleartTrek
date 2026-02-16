<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use Illuminate\Http\Request;

class MeetingCRUD extends Controller
{
    public function index()
    {
        $meetings = Meeting::orderBy('updated_at', 'desc')->paginate(10);
        return view('meetingCRUD.index', compact('meetings'));
    }

    public function create()
    {
        return view('meetingCRUD.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'day'        => 'required|date',
            'time'       => 'required',
            'user_id'    => 'required|exists:users,id',
            'trek_id'    => 'required|exists:treks,id',
            'appDateIni' => 'nullable|date',
            'appDateEnd' => 'nullable|date|after_or_equal:appDateIni',
        ]);

        Meeting::create($data);

        return redirect()->route('meetingCRUD.index');
    }

    public function show($id)
    {
        $meeting = Meeting::find($id);

        if (! $meeting) {
            return redirect()->route('meetingCRUD.index')
                ->with('error', 'Meeting no trobat.');
        }

        return view('meetingCRUD.show', compact('meeting'));
    }

    public function edit($id)
    {
        $meeting = Meeting::find($id);

        if (! $meeting) {
            return redirect()->route('meetingCRUD.index')
                ->with('error', 'Meeting no trobat.');
        }

        return view('meetingCRUD.edit', compact('meeting'));
    }

    public function update(Request $request, $id)
    {
        $meeting = Meeting::find($id);

        if (! $meeting) {
            return redirect()->route('meetingCRUD.index')
                ->with('error', 'Meeting no trobat.');
        }

        $data = $request->validate([
            'day'        => 'required|date',
            'time'       => 'required',
            'user_id'    => 'required|exists:users,id',
            'trek_id'    => 'required|exists:treks,id',
            'appDateIni' => 'nullable|date',
            'appDateEnd' => 'nullable|date|after_or_equal:appDateIni',
        ]);

        $meeting->update($data);

        return redirect()->route('meetingCRUD.index');
    }

    public function destroy($id)
    {
        $meeting = Meeting::find($id);

        if (! $meeting) {
            return redirect()->route('meetingCRUD.index')
                ->with('error', 'Meeting no trobat.');
        }

        $meeting->delete();

        return redirect()->route('meetingCRUD.index')
            ->with('success', 'Meeting eliminat.');
    }
}
