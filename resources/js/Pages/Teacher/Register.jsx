// resources/js/Pages/Teacher/Register.jsx

import React from 'react';
import { useForm } from '@inertiajs/react';

const Register = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        university: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/teacher/register');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h1 className="text-2xl font-semibold text-center mb-6">Регистрация Учителя</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Имя</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                            placeholder="Введите ваше имя"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                            placeholder="Введите ваш email"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Пароль</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className={`mt-1 block w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                            placeholder="Введите ваш пароль"
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Подтвердите Пароль</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className={`mt-1 block w-full border ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                            placeholder="Подтвердите ваш пароль"
                        />
                        {errors.password_confirmation && <span className="text-red-500 text-sm">{errors.password_confirmation}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Университет</label>
                        <input
                            type="text"
                            value={data.university}
                            onChange={(e) => setData('university', e.target.value)}
                            className={`mt-1 block w-full border ${errors.university ? 'border-red-500' : 'border-gray-300'} rounded-md p-2`}
                            placeholder="Введите ваш университет"
                        />
                        {errors.university && <span className="text-red-500 text-sm">{errors.university}</span>}
                    </div>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
                    >
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
