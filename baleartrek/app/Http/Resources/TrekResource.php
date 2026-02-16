<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrekResource extends JsonResource
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
            'regNumber' => $this->regNumber,
            'name' => $this->name,
            'municipality' => new MunicipalityResource($this->whenLoaded('municipality')),
            'status' => $this->status,
            'interestingPlaces' => InterestingPlaceResource::collection($this->whenLoaded('interestingPlaces')),
            'meetings' => MeetingResource::collection($this->whenLoaded('meetings')),
        ];
    }
}
