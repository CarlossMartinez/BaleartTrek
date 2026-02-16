<div class="block rounded-lg bg-white shadow-secondary-1">
    <div class="p-6 text-surface">
        <!-- Para prevenir errores  -->
        @php $user = $user ?? null; @endphp
        <h5 class="mb-2 text-xl font-medium leading-tight">{{ $user->id }}</h5>
        <p class="mb-4 text-base">Nom: {{ $user->name }}</p>
        <p class="mb-4 text-base">Cognom: {{ $user->lastname }}</p>
        <p class="mb-4 text-base">DNI: {{ $user->dni }}</p>
        <p class="mb-4 text-base">Email: {{ $user->email }}</p>
        <p class="mb-4 text-base">Email Verified At: {{ $user->email_verified_at }}</p>
        <p class="mb-4 text-base">Telèfon: {{ $user->phone }}</p>
        <p class="mb-4 text-base">Estat: {{ $user->status }}</p>
        <p class="mb-4 text-base">Id del rol: {{ $user->role_id }}</p>
        <p class="mb-4 text-sm">Created at: {{ $user->created_at }}</p>
        <p class="mb-4 text-sm">Updated at: {{ $user->updated_at }}</p>
        <a href="{{ route('userCRUD.show', ['userCRUD' => $user->id]) }}" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Show</a>
        <a href="{{ route('userCRUD.edit', ['userCRUD' => $user->id]) }}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</a>
        <form action="{{ route('userCRUD.destroy', ['userCRUD' => $user->id]) }}" method="POST" class="float-right">
            @method('DELETE')
            @csrf
            <button type="submit" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        </form>
    </div>
</div>