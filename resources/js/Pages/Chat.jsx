import Layout from '@/Layouts/Layout';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <Layout>
                <div className='grid grid-cols-10 pt-5 gap-x-5'>
                    <div className='col-span-7'>
                        <div className='flex gap-x-3 h-screen pb-40 items-center'>
                            <input type='text' placeholder='Введите свой запрос...' className='border-gray-200 bg-white rounded-lg w-[80%] mt-auto'/>
                            <div className='w-[20%] text-center rounded-lg bg-blue-500 text-white mt-auto py-2 px-5'>Отправить</div>
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <div className='py-3 px-5 rounded-lg bg-white border border-gray-200'>
                            <div className='text-lg font-semibold'>Здесь нужно поставить новость</div>
                            <div className='text-blue-500 font-semibold text-xl'>luungs - bızden bızge</div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}


