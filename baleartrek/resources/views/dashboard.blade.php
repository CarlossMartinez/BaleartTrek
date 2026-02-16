<x-app-layout>
    <x-slot name="header">
        <h2 class="font-bold text-2xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12 bg-gray-50 min-h-screen">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-2xl border border-gray-100">
                <div class="p-8 text-center sm:text-left">
                    <div
                        class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-50 text-emerald-600 mb-4">
                        <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span class="text-sm font-semibold tracking-wide uppercase">
                            {{ __("Has iniciado sesión correctamente") }}
                        </span>
                    </div>

                    <h3 class="text-4xl font-extrabold text-gray-900 tracking-tight">
                        {{ __('Bienvenido/a') }},
                        <span class="text-indigo-600">
                            {{ Auth::user()->name }}
                        </span>!
                    </h3>
                </div>
            </div>
        </div>
    </div>
</x-app-layout>