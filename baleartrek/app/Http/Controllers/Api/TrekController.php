<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TrekRequest;
use App\Http\Resources\TrekResource;
use App\Models\Comment;
use App\Models\Municipality;
use App\Models\Trek;
use App\Models\Meeting;
use App\Models\User;
use Illuminate\Http\Request;
use Exception;
use Carbon\Carbon;

class TrekController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            //FALTA ARREGLAR EL WHEN CON FILTROS PRESENTACIÓN TOMEU
            $treks = Trek::with('meetings', "municipality.island")->when(
                $request->island,
                fn($q, $island) =>
                $q->whereHas(
                    'municipality',
                    fn($q) =>
                    $q->whereHas(
                        'island',
                        fn($q) =>
                        $q->where('name', 'like', "%{$island}%")
                    )
                )
            )->get();
            return TrekResource::collection($treks);
        } catch (Exception $e) {
            return response()->json([
                'msg' => "Error durant la recerca dels treks",
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Trek $trek)
    {
        try {
            return new TrekResource($trek);
        } catch (Exception $e) {
            return response()->json([
                'msg' => "Error durant la recerca del trek",
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $trek = Trek::updateOrCreate(
                [
                    'regNumber' => $request->regNumber,
                ],
                [   // Cal habilitar aquests atributs en Model->'$fillable'
                    'name' => $request->name,
                    'municipality_id' => Municipality::where('name', $request->municipality)->value('id'),
                ]
            );

            foreach ($request->meetings as $meeting) {
                $newMeeting = Meeting::updateOrCreate(
                    [
                        'user_id' => User::where('dni', $meeting['DNI'])->value('id'),
                        'trek_id' => $trek->id,
                        'day' => $meeting['day'],
                        'time' => $meeting['time']
                    ],
                    [
                        'appDateIni' => Carbon::parse($meeting['day'])->subMonth(),
                        'appDateEnd' => Carbon::parse($meeting['day'])->subWeek()
                    ]
                );

                foreach ($meeting['comments'] as $comment) {
                    Comment::updateOrCreate(
                        ['meeting_id' => $newMeeting['id']],
                        [
                            'comment' => $comment['comment'],
                            'score' => $comment['score'],
                            'user_id' => User::where('dni', $comment['DNI'])->value('id'),
                        ]
                    );
                }
            }

            $trek->load('meetings.comments');
            return (new TrekResource($trek))->additional(['meta' => 'Post modificat correctament']);

        } catch (Exception $e) {
            return response()->json([

                'msg' => "Error al guardar el trek",
                'error' => $e->getMessage()
            ]);
        }

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
