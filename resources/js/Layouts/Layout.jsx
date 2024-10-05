import { useState } from 'react';
import { HiOutlineHome, HiOutlineClipboardDocument, HiOutlineChatBubbleOvalLeft, HiOutlineUsers } from "react-icons/hi2";
import { CgClose } from "react-icons/cg";
import { useForm, Link, usePage } from '@inertiajs/react';
import { IoMdLogOut } from "react-icons/io";


export default function Layout({ children, user }) {
    const { url } = usePage();
    const { auth } = usePage().props;
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);

    const { data, setData, post, errors } = useForm({
        name: '',
        university: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div>
            <div className='w-full z-20 bg-white py-4 flex sticky top-0'>
                <div className='mx-auto items-center min-w-[1200px] max-w-[1400px] flex'>
                    <div className='text-3xl text-blue-500 font-semibold'>luungs</div>
                    {auth.user ? (
                        <div className='flex ml-auto gap-x-5 items-center'>
                            <div className='w-[50px] h-[50px] flex items-center font-semibold justify-center rounded-full text-white bg-blue-500'>
                                {auth.user.name[0]}
                            </div>
                            <div>
                                <div className='font-semibold text-xl'>{auth.user.name}</div>
                                <div className='text-gray-500 text-sm'>Рейтинг: {auth.user.rating} | {auth.user.university}</div>
                            </div>
                            <div>
                                <IoMdLogOut className='text-3xl cursor-pointer'/>
                            </div>
                        </div>
                    ) : (
                        <div className='flex ml-auto gap-x-5 items-center'>
                            <button
                                onClick={() => setLoginOpen(true)}
                                className='px-10 py-2 border-2 border-blue-500 rounded-lg font-semibold text-blue-500'>
                                Войти
                            </button>
                            <button
                                onClick={() => setRegisterOpen(true)}
                                className='px-10 py-2 bg-blue-500 rounded-lg text-white font-semibold border-2 border-blue-500'>
                                Создать аккаунт
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex bg-gray-100'>
                <div className='mx-auto min-w-[1200px] max-w-[1400px] grid grid-cols-12 gap-x-3'>
                    <div className='z-10 col-span-2 sticky top-0 mt-5'>
                        <Link
                            href='/'
                            className={`flex items-center gap-x-3 py-2 px-3 rounded-lg ${url === '/' ? 'bg-white' : 'text-gray-500'}`}
                        >
                            <HiOutlineHome className='text-2xl' />
                            <div className='text-lg'>Главная</div>
                        </Link>
                        <Link
                            href='/assignment'
                            className={`flex items-center gap-x-3 mt-2 py-2 px-3 rounded-lg ${url === '/assignment' ? 'bg-white' : 'text-gray-500'}`}
                        >
                            <HiOutlineClipboardDocument className='text-2xl' />
                            <div className='text-lg'>Задания</div>
                        </Link>
                        <Link
                            href='/user'
                            className={`flex items-center gap-x-3 mt-2 py-2 px-3 rounded-lg ${url === '/user' ? 'bg-white' : 'text-gray-500'}`}
                        >
                            <HiOutlineUsers className='text-2xl' />
                            <div className='text-lg'>Студенты</div>
                        </Link>
                        <Link
                            href='/chat'
                            className={`flex items-center gap-x-3 mt-2 py-2 px-3 rounded-lg ${url === '/chat' ? 'bg-white' : 'text-gray-500'}`}
                        >
                            <HiOutlineChatBubbleOvalLeft className='text-2xl' />
                            <div className='text-lg'>Чат-помощник</div>
                        </Link>
                    </div>
                    <div className='col-span-10 w-full min-h-screen'>
                        {children}
                    </div>
                </div>
            </div>

            {isLoginOpen && (
                <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
                    <div className='bg-white rounded-lg w-[700px]'>
                        <div className='grid grid-cols-2 gap-x-5'>
                            <div className='bg-gray-100 rounded-l-lg px-8 py-8'>
                                <div className='text-3xl text-blue-500 font-semibold'>luungs</div>
                                <div className='text-xl text-gray-500'>bızden bızge</div>
                            </div>
                            <div className='py-6 pr-5'>
                                <div className='flex items-center'>
                                    <div className='text-xl font-semibold'>Войти</div>
                                    <button onClick={() => setLoginOpen(false)} className='ml-auto text-xl bg-gray-200 text-gray-500 rounded-full p-1'><CgClose /></button>
                                </div>
                                <form onSubmit={handleLoginSubmit} className='mt-10'>
                                    <div className='text-gray-500 font-light mb-2'>Введите почту</div>
                                    <input
                                        type="email"
                                        placeholder="Почта"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className='border border-gray-300 p-2 mb-4 w-full rounded-lg'
                                    />
                                    {errors.email && <div className="text-red-500">{errors.email}</div>}

                                    <div className='text-gray-500 font-light mb-2'>Введите пароль</div>
                                    <input
                                        type="password"
                                        placeholder="Пароль"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className='border border-gray-300 p-2 mb-4 w-full rounded-lg'
                                    />
                                    {errors.password && <div className="text-red-500">{errors.password}</div>}

                                    <button type="submit" className='bg-blue-500 text-white px-4 py-2 w-full text-center rounded-lg'>Войти</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isRegisterOpen && (
                <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
                     <div className='bg-white rounded-lg w-[700px]'>
                        <div className='grid grid-cols-2 gap-x-5'>
                            <div className='bg-gray-100 rounded-l-lg px-8 py-8'>
                                <div className='text-3xl text-blue-500 font-semibold'>luungs</div>
                                <div className='text-xl text-gray-500'>bızden bızge</div>
                            </div>
                            <div className='py-6 pr-5'>
                                <div className='flex items-center'>
                                    <div className='text-xl font-semibold'>Регистрация</div>
                                    <button onClick={() => setRegisterOpen(false)} className='ml-auto text-xl bg-gray-200 text-gray-500 rounded-full p-1'><CgClose /></button>
                                </div>
                                <form onSubmit={handleRegisterSubmit} className='mt-10'>
                                    <div className='text-gray-500 font-light mb-1'>Имя и Фамиилия</div>
                                    <input
                                        type="text"
                                        placeholder="Имя и Фамилия"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className='border border-gray-300 p-2 mb-4 w-full rounded-lg'
                                    />
                                    {errors.name && <div className="text-red-500">{errors.name}</div>}

                                    <div className='text-gray-500 font-light mb-1'>Введите университет</div>
                                    <input
                                        type="text"
                                        placeholder="Университет"
                                        value={data.university}
                                        onChange={e => setData('university', e.target.value)}
                                        className='border border-gray-300 p-2 mb-4 w-full rounded-lg'
                                    />
                                    {errors.university && <div className="text-red-500">{errors.university}</div>}

                                    <div className='text-gray-500 font-light mb-1'>Введите почту</div>
                                    <input
                                        type="email"
                                        placeholder="Почта"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className='border border-gray-300 p-2 mb-4 w-full rounded-lg'
                                    />
                                    {errors.email && <div className="text-red-500">{errors.email}</div>}

                                    <div className='text-gray-500 font-light mb-1'>Придумайте пароль</div>
                                    <input
                                        type="password"
                                        placeholder="Пароль"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        className='border border-gray-300 p-2 mb-4 w-full rounded-lg'
                                    />
                                    {errors.password && <div className="text-red-500">{errors.password}</div>}

                                    <div className='text-gray-500 font-light mb-1'>Повторите пароль</div>
                                    <input
                                        type="password"
                                        placeholder="Повторите пароль"
                                        value={data.password_confirmation}
                                        onChange={e => setData('password_confirmation', e.target.value)}
                                        className='border border-gray-300 p-2 mb-4 w-full rounded-lg'
                                    />
                                    {errors.password_confirmation && <div className="text-red-500">{errors.password_confirmation}</div>}

                                    <button type="submit" className='bg-blue-500 text-white px-4 py-2 w-full text-center rounded-lg mt-2'>Регистрация</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

