<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\TrekResource;


class MeetingResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'appDateIni' => $this->appDateIni,
            'appDateEnd' => $this->appDateEnd,
            'day' => $this->day,
            'time' => $this->time,
            'totalScore' => $this->totalScore,
            'countScore' => $this->countScore,
            'users' => UserResource::collection($this->whenLoaded('users')),
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
        ];
    }
}
