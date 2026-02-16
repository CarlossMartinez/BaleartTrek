<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Editar user: ') }} {{ $user->name }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    @include('components.alert')
                    <form action="{{ route('userCRUD.update', $user->id) }}" method="post">
                        @csrf @method('PUT') 
                        <div class="mb-3">
                            <label for="name">Name: </label>
                            <input type="text" class="mt-1 block w-full" style="@error('name') border-color:RED; @enderror" name="name" value="{{ $user->name }}" />
                            @error('name') <div>{{ $message }}</div> @enderror
                        </div>
                        <div class="mb-3">
                            <label for="lastname">Last Name: </label>
                            <input type="text" class="mt-1 block w-full" style="@error('lastname') border-color:RED; @enderror" name="lastname" value="{{ $user->lastname }}"/>
                            @error('lastname') <div>{{ $message }}</div> @enderror
                        </div>
                         <div class="mb-3">
                            <label for="email">Email: </label>
                            <input type="text" class="mt-1 block w-full" style="@error('email') border-color:RED; @enderror" name="email" value="{{ $user->email }}"/>
                            @error('email') <div>{{ $message }}</div> @enderror
                        </div>
                        <div class="mb-3">
                            <label for="dni">DNI: </label>
                            <input type="text" class="mt-1 block w-full" style="@error('dni') border-color:RED; @enderror" name="dni" value="{{ $user->dni }}"/>
                            @error('dni') <div>{{ $message }}</div> @enderror
                        </div>
                        <div class="mb-3">
                            <label for="phone">Phone: </label>
                            <input type="text" class="mt-1 block w-full" style="@error('phone') border-color:RED; @enderror" name="phone" value="{{ $user->phone }}"/>
                            @error('phone') <div>{{ $message }}</div> @enderror
                        </div>
                        <div class="mb-3">
                            <label for="password">password: </label>
                            <input type="text" class="mt-1 block w-full" style="@error('password') border-color:RED; @enderror" name="password" value="{{ $user->password }}"/>
                            @error('password') <div>{{ $message }}</div> @enderror
                        </div>
                        <div class="mb-3">
                            <label for="role_id">Role ID: </label>
                            <input type="text" class="mt-1 block w-full" style="@error('role_id') border-color:RED; @enderror" name="role_id" value="{{ $user->role_id }}"/>
                            @error('role_id') <div>{{ $message }}</div> @enderror
                        </div>
                        <div class="mb-3">
                            <label for="status">Status (y, n): </label>
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
                        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Actualitzar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>