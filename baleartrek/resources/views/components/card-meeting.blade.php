<div class="block rounded-lg bg-white shadow-secondary-1">
    <div class="p-6 text-surface">
        <h5 class="mb-2 text-xl font-medium leading-tight">Data Trobada: {{ $meeting->day }}</h5>
        <p class="mb-4 text-sm">Meeting ID: {{ $meeting->id }}</p>
        <p class="mb-4 text-sm">ID del guia: {{ $meeting->user_id }}</p>
        <p class="mb-4 text-sm">ID de la Excursió: {{ $meeting->trek_id }}</p>
        <p class="mb-4 text-sm">Hora de la trobada: {{ $meeting->time }}</p>
        <p class="mb-4 text-sm">Puntuació total: {{ $meeting->totalScore }}</p>
        <p class="mb-4 text-sm">Total de puntuats: {{ $meeting->countScore }}</p>
        <p class="mb-4 text-sm">Data de inici: {{ $meeting->appDateIni }}</p>
        <p class="mb-4 text-sm">Data de finalització: {{ $meeting->appDateEnd }}</p>
        <p class="mb-4 text-sm">Created at: {{ $meeting->created_at }}</p>
        <p class="mb-4 text-sm">Updated at: {{ $meeting->updated_at }}</p>
        <a href="{{ route('meetingCRUD.show', ['meetingCRUD' => $meeting->id]) }}" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Show</a>
        <a href="{{ route('meetingCRUD.edit', ['meetingCRUD' => $meeting->id]) }}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</a>
        <form action="{{ route('meetingCRUD.destroy', ['meetingCRUD' => $meeting->id]) }}" method="POST" class="float-right">
            @method('DELETE')
            @csrf
            <button type="submit" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        </form>
    </div>
</div>