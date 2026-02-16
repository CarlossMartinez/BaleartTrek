<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;  // Permet que l'usuari passi l'autorització
    }

    public function rules(): array
    {
        return [
            'name'      => 'required|string|max:100',
            'lastname'  => 'required|string|max:100',
            'phone'     => 'required|string|max:20',
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'El nom es obligatori',
            'lastname.required' => 'El llinatge es obligatori',
            'phone.required' => 'El número de telèfon es obligatori',
            'name.max'     => 'El nom no pot superar els 100 caràcters.',
            'lastname.max' => 'El cognom no pot superar els 100 caràcters.',
            'phone.max'    => 'El telèfon no pot superar els 20 caràcters.',
        ];
    }
}
