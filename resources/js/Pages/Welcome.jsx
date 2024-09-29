import Layout from '@/Layouts/Layout';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, assignments }) {
    return (
        <>
            <Head title="Welcome" />
            <Layout>
                <div className='grid grid-cols-10 pt-5 gap-x-5'>
                    <div className='col-span-7'>
                        <div className='bg-white rounded-lg border border-gray-200 px-7 py-5 mb-3'>
                            <div className='text-4xl text-blue-500 font-semibold'>luungs</div>
                            <div className='text-gray-500 text-xl'>bızden bızge</div>
                        </div>
                        <input
                            type='text'
                            className='w-full block bg-white border border-gray-200 rounded-lg'
                            placeholder='Поиск...'
                        />
                        {assignments.map((assignment, index) => (
                            <Link href={`/assignment/${assignment.id}`} key={index} className='w-full block border border-gray-200 px-7 mt-2 py-5 rounded-lg bg-white'>
                                <div className='text-xl font-semibold'>{assignment.title}</div>
                                <div className='text-gray-500'>{assignment.description}</div>
                                <div className='text-blue-500'>Рейтинг: {assignment.rating}</div>
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
