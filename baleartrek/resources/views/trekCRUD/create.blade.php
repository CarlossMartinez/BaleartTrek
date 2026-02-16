<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Crear un trek') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    @include('components.alert')

                    <form action="{{ route('trekCRUD.store') }}" method="post">
                        @csrf
                        <div class="mb-3">
                            <label for="regNumber">Reg Number: </label>
                            <input type="text" class="mt-1 block w-full" style="@error('regNumber') border-color:RED; @enderror" name="regNumber" value="{{ old('regNumber') }}" />
                            @error('regNumber') <div>{{ $message }}</div> @enderror
                        </div>
                        <div class="mb-3">
                            <label for="name">Nombre: </label>
                            <input type="text" class="mt-1 block w-full" style="@error('name') border-color:RED; @enderror" name="name" />
                            @error('name') <div>{{ $message }}</div> @enderror
                        </div>
                        <div class="mb-3">
                            <label for="Municipality ID"> Municipality ID: </label>
                            <select name="municipality_id" class="mt-1 block w-full">                            
                                @foreach($municipalities as $municipality)
                                    <option value="{{ $municipality->id}}" @selected(old('municipality_id') == $municipality->id)>
                                        {{ $municipality->name .' (id: '. $municipality->id .')' }}
                                    </option>
                                @endforeach
                            </select>
                            @error('municipality_id') <div>{{ $message }}</div> @enderror
                        </div>
                        <div class="mb-3">
                            <label for="status">Estado (y, n): </label>
                            <select name="status" class="mt-1 block w-full">
                                <option value="{{'y'}}" @selected(old('status'))>
                                    {{ 'Activo' }}
                                </option>
                                <option value="{{'n'}}" @selected(old('status'))>
                                    {{ 'Inactivo' }}
                                </option>
                            </select>
                            @error('status') <div>{{ $message }}</div> @enderror
                        </div>
                        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Crear</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>