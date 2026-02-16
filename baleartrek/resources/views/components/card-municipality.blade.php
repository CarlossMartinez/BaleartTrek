<div class="block rounded-lg bg-white shadow-secondary-1">
    <div class="p-6 text-surface">
        @php $municipality = $municipality ?? null; @endphp

        <h5 class="mb-2 text-xl font-medium leading-tight">{{ $municipality->name }}</h5>
        <h3 class="mb-2 text-xl font-medium leading-tight">ID del municipi: {{ $municipality->id }}</h3> 
        <h3 class="mb-2 text-xl font-medium leading-tight">Id de la illa: {{ $municipality->island_id }}</h3>               
        <h3 class="mb-2 text-xl font-medium leading-tight">Id de la zona: {{ $municipality->zone_id }}</h3>
        <p class="mb-4 text-sm">Created at: {{ $municipality->created_at }}</p>
        <p class="mb-4 text-sm">Updated at: {{ $municipality->updated_at }}</p>
        <a href="{{ route('municipalityCRUD.show', ['municipalityCRUD' => $municipality->id]) }}" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Show</a>
        <a href="{{ route('municipalityCRUD.edit', ['municipalityCRUD' => $municipality->id]) }}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</a>
        <form action="{{ route('municipalityCRUD.destroy', ['municipalityCRUD' => $municipality->id]) }}" method="POST" class="float-right">
            @method('DELETE')
            @csrf
            <button type="submit" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        </form>
    </div>
</div>