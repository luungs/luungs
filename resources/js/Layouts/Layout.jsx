import { useState } from 'react';
import { HiOutlineHome, HiOutlineClipboardDocument, HiOutlineChatBubbleOvalLeft, HiOutlineUsers } from "react-icons/hi2";
import { CgClose } from "react-icons/cg";
import { useForm, Link, usePage } from '@inertiajs/react';
import { IoMdLogOut } from "react-icons/io";
import { message } from 'antd';

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

    const handleChatClick = () => {
        if (!auth.user) {
            message.warning('Вы должны авторизоваться чтобы пользоваться чат-помощником');
        }
    };

    return (
        <div>
            {/* Header */}
            <div className='w-full z-20 bg-white py-4 flex sticky top-0'>
                <div className='mx-auto items-center min-w-[1200px] max-w-[1400px] flex px-4 lg:px-0'>
                    <div className='lg:text-3xl text-5xl px-5 lg:px-[0px] text-blue-500 font-semibold'>luungs</div>

                    {/* Profile section (hidden on mobile) */}
                    {auth.user ? (
                        <div className='flex ml-auto gap-x-5 items-center hidden lg:flex'>
                            <div className='w-[50px] h-[50px] flex items-center font-semibold justify-center rounded-full text-white bg-blue-500'>
                                {auth.user.name[0]}
                            </div>
                            <div>
                                <div className='font-semibold text-xl'>{auth.user.name}</div>
                                <div className='text-gray-500 text-sm'>Рейтинг: {auth.user.rating} | {auth.user.university}</div>
                            </div>
                            <div>
                                <IoMdLogOut className='text-3xl cursor-pointer' />
                            </div>
                        </div>
                    ) : (
                        <div className='flex ml-auto gap-x-5 items-center hidden lg:flex'>
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
                <div className='mx-auto min-w-[1200px] max-w-[1400px] grid grid-cols-12 gap-x-3 px-4 lg:px-0'>
                    {/* Sidebar (only for larger screens) */}
                    <div className='z-10 col-span-2 sticky top-0 mt-5 hidden lg:block'>
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
                            onClick={handleChatClick}
                        >
                            <HiOutlineChatBubbleOvalLeft className='text-2xl' />
                            <div className='text-lg'>Чат-помощник</div>
                        </Link>
                    </div>

                    {/* Main content */}
                    <div className='col-span-12 lg:col-span-10 w-full lg:min-h-screen h-auto'>
                        {children}
                    </div>
                </div>
            </div>

            {/* Bottom navigation bar for mobile */}
            <div className="fixed inset-x-0 bottom-0 bg-white shadow-lg block lg:hidden">
                <div className="flex justify-between items-center px-10 py-3">
                    <Link
                        href='/'
                        className={`flex flex-col items-center ${url === '/' ? 'text-blue-500' : 'text-gray-500'}`}
                    >
                        <HiOutlineHome className='text-4xl' />
                        <div className='text-xs'>Главная</div>
                    </Link>
                    <Link
                        href='/assignment'
                        className={`flex flex-col items-center ${url === '/assignment' ? 'text-blue-500' : 'text-gray-500'}`}
                    >
                        <HiOutlineClipboardDocument className='text-4xl' />
                        <div className='text-xs'>Задания</div>
                    </Link>
                    <Link
                        href='/user'
                        className={`flex flex-col items-center ${url === '/user' ? 'text-blue-500' : 'text-gray-500'}`}
                    >
                        <HiOutlineUsers className='text-4xl' />
                        <div className='text-xs'>Студенты</div>
                    </Link>
                    <button
                        onClick={handleChatClick}
                        className={`flex flex-col items-center ${url === '/chat' ? 'text-blue-500' : 'text-gray-500'}`}
                    >
                        <HiOutlineChatBubbleOvalLeft className='text-4xl' />
                        <div className='text-xs'>Чат</div>
                    </button>
                </div>
            </div>

            {/* Login Modal (responsive) */}
            {isLoginOpen && (
                <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
                    <div className="bg-white rounded-lg p-5 w-[90%] lg:w-[30%]">
                        <button onClick={() => setLoginOpen(false)} className="ml-auto flex justify-end">
                            <CgClose className='text-3xl' />
                        </button>
                        <h2 className="text-2xl font-semibold mb-4">Войти</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-2 border mb-4 rounded-lg"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Пароль"
                                className="w-full p-2 border mb-4 rounded-lg"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <button className="w-full bg-blue-500 text-white py-2 rounded-lg">Войти</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Register Modal (responsive) */}
            {isRegisterOpen && (
                <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
                    <div className="bg-white rounded-lg p-5 w-[90%] lg:w-[30%]">
                        <button onClick={() => setRegisterOpen(false)} className="ml-auto flex justify-end">
                            <CgClose className='text-3xl' />
                        </button>
                        <h2 className="text-2xl font-semibold mb-4">Регистрация</h2>
                        <form onSubmit={handleRegisterSubmit}>
                            <input
                                type="text"
                                placeholder="Имя"
                                className="w-full p-2 border mb-4 rounded-lg"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <select
                                value={data.university}
                                onChange={e => setData('university', e.target.value)}
                                className='border border-gray-300 p-2 mb-4 w-full rounded-lg'
                            >
                                <option value="">Выберите университет</option>
                                <option value='Семейский медицинский университет'>Семейский медицинский университет</option>
                                <option value='Казахстанско-Российский медицинский университет'>Казахстанско-Российский медицинский университет</option>
                                <option value='Медицинский университет Астана'>Медицинский университет Астана</option>
                                <option value='Академия медицинских наук им. С.Д. Асфендиярова'>Академия медицинских наук им. С.Д. Асфендиярова</option>
                                <option value='Карагандинский медицинский университет'>Карагандинский медицинский университет</option>
                                <option value='Западно-Казахстанский медицинский университет имени Марата Оспанова'>Западно-Казахстанский медицинский университет имени Марата Оспанова</option>
                                <option value='Международный казахско-турецкий университет имени Ходжи Ахмеда Ясави'>Международный казахско-турецкий университет имени Ходжи Ахмеда Ясави</option>
                            </select>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-2 border mb-4 rounded-lg"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Пароль"
                                className="w-full p-2 border mb-4 rounded-lg"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Подтверждение пароля"
                                className="w-full p-2 border mb-4 rounded-lg"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                            <button className="w-full bg-blue-500 text-white py-2 rounded-lg">Создать аккаунт</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

