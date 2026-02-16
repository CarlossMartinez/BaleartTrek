<div class="block rounded-lg bg-white shadow-secondary-1">
    <div class="p-6 text-surface">
        <h5 class="mb-2 text-xl font-medium leading-tight">{{ $trek->name }}</h5>
        <h3 class="mb-2 text-xl font-medium leading-tight">Trek ID: {{ $trek->id }}</h3>
        <h3 class="mb-2 text-xl font-medium leading-tight">Reg. Number: {{ $trek->regNumber }}</h3>
        <p class="mb-4 text-base">Estat: {{ $trek->status }}</p>
        <p class="mb-4 text-sm">Posted: {{ $trek->municipality_id }}</p>
        <p class="mb-4 text-sm">Created at: {{ $trek->created_at }}</p>
        <p class="mb-4 text-sm">Updated at: {{ $trek->updated_at }}</p>
        <a href="{{ route('treksCRUD.show', ['trekCRUD' => $trek->id]) }}" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Show</a>
        <a href="{{ route('treksCRUD.edit', ['trekCRUD' => $trek->id]) }}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</a>
        <form action="{{ route('treksCRUD.destroy', ['trekCRUD' => $trek->id]) }}" method="POST" class="float-right">
            @method('DELETE')
            @csrf
            <button type="submit" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        </form>
    </div>
</div>