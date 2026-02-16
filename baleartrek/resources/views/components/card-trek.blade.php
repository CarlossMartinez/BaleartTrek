<div class="block rounded-lg bg-white shadow-secondary-1">
    <div class="p-6 text-surface">
        <h5 class="mb-2 text-xl font-medium leading-tight">{{ $trek->name }}</h5>
        <h3 class="mb-2 text-xl font-medium leading-tight">Trek ID: {{ $trek->id }}</h3>
        <h3 class="mb-2 text-xl font-medium leading-tight">Reg. Number: {{ $trek->regNumber }}</h3>
        <p class="mb-4 text-base">Estat: {{ $trek->status }}</p>
        <p class="mb-4 text-sm">Posted: {{ $trek->municipality_id }}</p>
        <p class="mb-4 text-sm">Created at: {{ $trek->created_at }}</p>
        <p class="mb-4 text-sm">Updated at: {{ $trek->updated_at }}</p>
        
        @if($trek->meetings->count() > 0)
            <div class="mb-4">
                <h4 class="font-semibold text-lg mb-2">Reuniones Asociadas:</h4>
                <ul class="list-disc list-inside text-sm">
                    @foreach($trek->meetings as $meeting)
                        <li>{{ $meeting->day ?? ' ' }} (ID: {{ $meeting->id }})</li>
                    @endforeach
                </ul>
            </div>
        @else
            <p class="mb-4 text-sm text-gray-500">No hay reuniones asociadas</p>
        @endif
        
        @if($trek->interestingPlaces->count() > 0)
            <div class="mb-4">
                <h4 class="font-semibold text-lg mb-2">Lugares Interesantes Asociados:</h4>
                <ul class="list-disc list-inside text-sm">
                    @foreach($trek->interestingPlaces as $place)
                        <li>{{ $place->name ?? 'Sin nombre' }} (ID: {{ $place->id }})</li>
                    @endforeach
                </ul>
            </div>
        @else
            <p class="mb-4 text-sm text-gray-500">No hay lugares interesantes asociados</p>
        @endif
        
        <a href="{{ route('trekCRUD.show', ['trekCRUD' => $trek->id]) }}" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Show</a>
        <a href="{{ route('trekCRUD.edit', ['trekCRUD' => $trek->id]) }}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</a>
        <form action="{{ route('trekCRUD.destroy', ['trekCRUD' => $trek->id]) }}" method="POST" class="float-right">
            @method('DELETE')
            @csrf
            <button type="submit" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        </form>
    </div>
</div>