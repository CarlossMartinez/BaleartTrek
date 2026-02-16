<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Editar Meeting:') }} {{ $meeting->day }} {{ $meeting->time }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    @include('components.alert')

                    <form action="{{ route('meetingCRUD.update', $meeting->id) }}" method="post">
                        @csrf @method('PUT')
                        <div class="mb-3">
                            <label for="day">Dia</label>
                            <input type="date" class="mt-1 block w-full" name="day" value="{{ old('day', $meeting->day) }}" />
                            @error('day') <div>{{ $message }}</div> @enderror
                        </div>
                        <div class="mb-3">
                            <label for="time">Hora</label>
                            <input type="text" class="mt-1 block w-full" name="time" value="{{ old('time', $meeting->time) }}" />
                            @error('time') <div>{{ $message }}</div> @enderror
                        </div>
                        <div class="mb-3">
                            <label for="user_id">User ID</label>
                            <input type="number" class="mt-1 block w-full" name="user_id" value="{{ old('user_id', $meeting->user_id) }}" />
                            @error('user_id') <div>{{ $message }}</div> @enderror
                        </div>
                        <div class="mb-3">
                            <label for="trek_id">Trek ID</label>
                            <input type="number" class="mt-1 block w-full" name="trek_id" value="{{ old('trek_id', $meeting->trek_id) }}" />
                            @error('trek_id') <div>{{ $message }}</div> @enderror
                        </div>
                        <div class="mb-3">
                            <label for="appDateIni">App Inicio</label>
                            <input type="date" class="mt-1 block w-full" name="appDateIni" value="{{ old('appDateIni', $meeting->appDateIni) }}" />
                            @error('appDateIni') <div>{{ $message }}</div> @enderror
                        </div>
                        <div class="mb-3">
                            <label for="appDateEnd">App Fin</label>
                            <input type="date" class="mt-1 block w-full" name="appDateEnd" value="{{ old('appDateEnd', $meeting->appDateEnd) }}" />
                            @error('appDateEnd') <div>{{ $message }}</div> @enderror
                        </div>
                        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Actualizar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>