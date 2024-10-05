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
                            <Link
                            href={`/assignment/${assignment.id}`}
                            key={index}
                            className={`${assignment.is_attempted ? ('bg-gray-100') : ('bg-white')} w-full block border border-gray-200 px-7 mt-2 py-5 rounded-lg `}
                        >
                                {assignment.is_attempted && (
                                    <div className='text-blue-500 font-semibold'>Вы уже решили</div>
                                )}
                                <div className={`${assignment.is_attempted ? ('text-gray-500 font-regular') : ('text-black font-semibold')} text-xl`}>{assignment.title}</div>
                                <div className='text-gray-500'>{assignment.description}</div>
                                <div className={`${assignment.is_attempted ? ('text-gray-500') : ('text-blue-500')}`}>Рейтинг: {assignment.rating}</div>
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

