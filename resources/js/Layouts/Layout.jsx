import { Link, usePage } from '@inertiajs/react';
import { HiOutlineHome, HiOutlineClipboardDocument, HiOutlineChatBubbleOvalLeft, HiOutlineUsers } from "react-icons/hi2";

export default function Layout ({ children }) {
    const { url } = usePage();

    return (
        <div>
            <div className='w-full bg-white py-4 flex sticky top-0'>
                <div className='mx-auto items-center min-w-[1200px] max-w-[1400px] flex'>
                    <div className='text-3xl text-blue-500 font-semibold'>luungs</div>
                    <div className='flex ml-auto gap-x-5 items-center'>
                        <div className='px-10 py-2 border-2 border-blue-500 rounded-lg font-semibold text-blue-500'>Войти</div>
                        <div className='px-10 py-2 bg-blue-500 rounded-lg text-white font-semibold border-2 border-blue-500'>Создать аккаунт</div>
                    </div>
                </div>
            </div>
            <div className='flex bg-gray-100'>
                <div className='mx-auto min-w-[1200px] max-w-[1400px] grid grid-cols-12 gap-x-3'>
                    <div className='col-span-2 sticky top-0 mt-5'>
                        <Link
                            href='/'
                            className={`flex items-center gap-x-3 py-2 px-3 rounded-lg ${url === '/' ? 'bg-white' : 'text-gray-500'}`}
                        >
                            <HiOutlineHome className='text-2xl'/>
                            <div className='text-lg'>Главная</div>
                        </Link>
                        <Link
                            href='/assignment'
                            className={`flex items-center gap-x-3 mt-2 py-2 px-3 rounded-lg ${url === '/assignment' ? 'bg-white' : 'text-gray-500'}`}
                        >
                            <HiOutlineClipboardDocument className='text-2xl'/>
                            <div className='text-lg'>Задания</div>
                        </Link>
                        <Link
                            href='/user'
                            className={`flex items-center gap-x-3 mt-2 py-2 px-3 rounded-lg ${url === '/user' ? 'bg-white' : 'text-gray-500'}`}
                        >
                            <HiOutlineUsers className='text-2xl'/>
                            <div className='text-lg'>Студенты</div>
                        </Link>
                        <Link
                            href='/chat'
                            className={`flex items-center gap-x-3 mt-2 py-2 px-3 rounded-lg ${url === '/chat' ? 'bg-white' : 'text-gray-500'}`}
                        >
                            <HiOutlineChatBubbleOvalLeft className='text-2xl'/>
                            <div className='text-lg'>Чат-помощник</div>
                        </Link>
                    </div>
                    <div className='col-span-10 w-full min-h-screen'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

