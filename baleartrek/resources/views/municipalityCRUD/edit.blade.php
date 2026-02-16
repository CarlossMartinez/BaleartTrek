<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Editar Municipality:') }} {{ $municipality->name }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    @include('components.alert')

                    <form action="{{ route('municipalityCRUD.update', $municipality->id) }}" method="post">
                        @csrf @method('PUT')
                        <div class="mb-3">
                            <label for="name">Nombre</label>
                            <input type="text" class="mt-1 block w-full" style="@error('name') border-color:RED; @enderror" name="name" value="{{ old('name', $municipality->name) }}" />
                            @error('name') <div>{{ $message }}</div> @enderror
                        </div>
                        <div class="mb-3">
                            <label for="island_id">Island ID</label>
                            <input type="number" class="mt-1 block w-full" name="island_id" value="{{ old('island_id', $municipality->island_id) }}" />
                            @error('island_id') <div>{{ $message }}</div> @enderror
                        </div>
                        <div class="mb-3">
                            <label for="zone_id">Zone ID</label>
                            <input type="number" class="mt-1 block w-full" name="zone_id" value="{{ old('zone_id', $municipality->zone_id) }}" />
                            @error('zone_id') <div>{{ $message }}</div> @enderror
                        </div>
                        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Actualitzar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>