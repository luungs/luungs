import Layout from '@/Layouts/Layout';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, users }) {
    return (
        <>
            <Head title="Welcome" />
            <Layout>
                <div className='grid grid-cols-10 pt-5 gap-x-5'>
                    <div className='col-span-7'>
                        <input
                            type='text'
                            className='w-full block bg-white border border-gray-200 rounded-lg'
                            placeholder='Поиск...'
                        />
                        {users.length > 0 && users.map((user, index) => (
                            <Link href={`/assignment/${user.id}`} key={index} className='w-full block border border-gray-200 px-7 mt-2 py-5 rounded-lg bg-white'>
                                <div className='text-xl font-semibold'>{user.name}</div>
                            </Link>
                        ))}
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

