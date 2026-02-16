<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\CommentResource;
use App\Http\Resources\MeetingResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'lastname' => $this->lastname,
            'dni' => $this->dni,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'phone' => $this->phone,
            'password' => $this->password,
            'role' => new RoleResource($this->whenLoaded('role')),
            'meeting' => new MeetingResource($this->whenLoaded('meeting')),
            'meetings' => MeetingResource::collection($this->whenLoaded('meetings')),
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
        ];
    }
}
