<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Crear un Interesting Place') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    @include('components.alert')

                    <form action="{{ route('interesting_place.store') }}" method="post">
                        @csrf
                        <div class="mb-3">
                            <label for="name">Nom</label>
                            <input type="text" class="mt-1 block w-full" style="@error('name') border-color:RED; @enderror" name="name" value="{{ old('name') }}" />
                            @error('name') <div>{{ $message }}</div> @enderror
                        </div>

                        <div class="mb-3">
                            <label for="gps">Ubicació (GPS)</label>
                            <input type="text" class="mt-1 block w-full" style="@error('gps') border-color:RED; @enderror" name="gps" value="{{ old('gps') }}" />
                            @error('gps') <div>{{ $message }}</div> @enderror
                        </div>

                        <div class="mb-3">
                            <label for="place_type_id">Tipus</label>
                            <select name="place_type_id" class="mt-1 block w-full">
                                <option value="">-- Selecciona un tipus --</option>
                                @foreach ($placeTypes as $title => $id)
                                    <option value="{{ $id }}">{{ $title }}</option>
                                @endforeach
                            </select>
                            @error('place_type_id') <div>{{ $message }}</div> @enderror
                        </div>

                        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Crear</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>