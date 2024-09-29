import Layout from '@/Layouts/Layout';
import { Link, Head } from '@inertiajs/react';

export default function Assignment({ auth, assignment }) {
    console.log(assignment)
    return (
        <>
            <Head title="Welcome" />
            <Layout>
                <div className='grid grid-cols-10 pt-5 gap-x-5'>
                    <div className='col-span-7'>
                        <div className='px-5 py-4 bg-white border border-gray-200 rounded-lg'>
                            <div className='text-xl font-semibold'>{assignment.title}</div>
                            <div className='text-gray-500'>{assignment.description}</div>
                        </div>
                        <div className='px-5 py-4 bg-white border border-gray-200 rounded-lg mt-2'>
                            <div className='font-semibold'>Задания</div>
                            {assignment.type == 'test' && (
                                <div>
                                    {assignment.test.map((test, index) => (
                                        <div key={index} className='mt-2'>
                                            <div>{test.question}</div>
                                            <div className='flex items-center gap-x-2 mt-2'>
                                                <input id='a' type='radio' value='a' />
                                                <label for='a'>{test.a}</label>
                                            </div>
                                            <div className='flex items-center gap-x-2 mt-2'>
                                                <input id='b' type='radio' value='b' />
                                                <label for='b'>{test.b}</label>
                                            </div>
                                            <div className='flex items-center gap-x-2 mt-2'>
                                                <input id='c' type='radio' value='c' />
                                                <label for='c'>{test.c}</label>
                                            </div>
                                            <div className='flex items-center gap-x-2 mt-2'>
                                                <input id='d' type='radio' value='d' />
                                                <label for='d'>{test.d}</label>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {assignment.type == 'task' && (
                                <div>
                                    {assignment.task.map((task, index) => (
                                        <div className='mt-2' key={index}>
                                            <div>{index + 1}. {task.question}</div>
                                        </div>
                                    ))}
                                    <textarea
                                        className='w-full border-gray-300 mt-5 rounded-lg h-[250px]'
                                        placeholder='Введите ответ...'
                                    />
                                </div>
                            )}
                            <div className='w-full bg-blue-500 rounded-lg font-semibold text-white text-center py-2 mt-5'>Ответить</div>
                            <div className='w-full border-blue-500 border-2 rounded-lg font-semibold text-blue-500 text-center py-2 mt-2 mb-10'>Посмотреть ответ</div>
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <div className='py-20 w-full rounded-lg bg-white'></div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

