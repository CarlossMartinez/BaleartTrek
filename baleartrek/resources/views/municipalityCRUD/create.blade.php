<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Crear Municipality') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    @include('components.alert')

                    <form action="{{ route('municipalityCRUD.store') }}" method="post">
                        @csrf
                        <div class="mb-3">
                            <label for="name">Nombre</label>
                            <input type="text" class="mt-1 block w-full" style="@error('name') border-color:RED; @enderror" name="name" value="{{ old('name') }}" />
                            @error('name') <div>{{ $message }}</div> @enderror
                        </div>
                        <div class="mb-3">
                            <label for="island_id">Island ID</label>
                            <input type="number" class="mt-1 block w-full" name="island_id" value="{{ old('island_id') }}" />
                            @error('island_id') <div>{{ $message }}</div> @enderror
                        </div>
                        <div class="mb-3">
                            <label for="zone_id">Zone ID</label>
                            <input type="number" class="mt-1 block w-full" name="zone_id" value="{{ old('zone_id') }}" />
                            @error('zone_id') <div>{{ $message }}</div> @enderror
                        </div>
                        <div class="mb-3">
                            <label for="status">Status (y/n)</label>
                            <input type="text" class="mt-1 block w-full" name="status" value="{{ old('status') }}" />
                            @error('status') <div>{{ $message }}</div> @enderror
                        </div>
                        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Crear</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>