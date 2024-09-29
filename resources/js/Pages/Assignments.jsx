import Layout from '@/Layouts/Layout';
import { Link, Head } from '@inertiajs/react';

export default function Assignments({ auth, assignments }) {
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
                        {assignments.map((assignment, index) => (
                            <Link href={`/assignment/${assignment.id}`} key={index} className='w-full block border border-gray-200 px-7 mt-2 py-5 rounded-lg bg-white'>
                                <div className='text-xl font-semibold'>{assignment.title}</div>
                                <div className='text-gray-500'>{assignment.description}</div>
                                <div className='text-blue-500'>Рейтинг: {assignment.rating}</div>
                            </Link>
                        ))}
                    </div>
                    <div className='col-span-3'>
                        <div className='py-20 w-full rounded-lg bg-white'></div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

