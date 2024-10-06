import React, { useEffect, useState } from 'react';
import Layout from '@/Layouts/Layout';
import { Head, useForm } from '@inertiajs/react';

export default function Assignment({ auth, assignment, message, is_attempted, correct_answers, correct_count, total_questions, rating_gained }) {
    const itemsPerPage = 5;
    const { post, data, setData } = useForm({
        answers: [],
        taskAnswers: [],
    });

    useEffect(() => {
        if(message) {
            console.log(message)
        }
    }, [message]);

    const [currentTestPage, setCurrentTestPage] = useState(1);
    const [currentTaskPage, setCurrentTaskPage] = useState(1);

    const handleTestAnswerChange = (index, value) => {
        const updatedAnswers = [...data.answers];
        updatedAnswers[index] = { question_id: assignment.test[(currentTestPage - 1) * itemsPerPage + index].id, selected_answer: value };
        setData('answers', updatedAnswers); // Update form data
    };

    // Handle changes in task answers
    const handleTaskAnswerChange = (index, value) => {
        const updatedTaskAnswers = [...data.taskAnswers];
        updatedTaskAnswers[index] = { question_id: assignment.task[(currentTaskPage - 1) * itemsPerPage + index].id, selected_answer: value };
        setData('taskAnswers', updatedTaskAnswers); // Update form data
    };

    // Submit the answers
    const handleSubmit = () => {
        post(`/assignments/${assignment.id}/submit-answers`, {
            onSuccess: (response) => {
            },
            onError: (errors) => {
                console.error(errors);
                setMessage('There was an error submitting your answers.');
            }
        });
    };

    const totalTestPages = Math.ceil(assignment.test.length / itemsPerPage);
    const totalTaskPages = Math.ceil(assignment.task.length / itemsPerPage);

    const currentTests = assignment.test.slice(
        (currentTestPage - 1) * itemsPerPage,
        currentTestPage * itemsPerPage
    );

    const currentTasks = assignment.task.slice(
        (currentTaskPage - 1) * itemsPerPage,
        currentTaskPage * itemsPerPage
    );

    const PaginationGrid = ({ totalPages, onPageChange }) => (
        <div className='grid grid-cols-5 mt-4 gap-2'>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    className={`px-3 py-1 mx-1 ${currentTestPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );

    // Previous and Next buttons for navigation
    const PaginationNav = ({ currentPage, totalPages, onPageChange }) => (
        <div className="flex justify-between mt-5">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={`px-3 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
            >
                Назад
            </button>
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className={`px-3 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
            >
                Далее
            </button>
        </div>
    );

    return (
        <>
            <Head title="Assignment" />
            <Layout>
                <div className='grid grid-cols-1 lg:grid-cols-10 pt-5 gap-x-5'>
                    <div className='col-span-7'>
                        <div className='px-5 py-4 bg-white border border-gray-200 rounded-lg'>
                            <div className='text-xl font-semibold'>{assignment.title}</div>
                            <div className='text-gray-500'>{assignment.description}</div>
                        </div>
                        {is_attempted ? (
                            <div className='bg-white border border-gray-200 rounded-lg p-5 mt-5'>
                                <div className='text-xl font-semibold'>Результаты</div>

                                {/* Correct Answers */}
                                <div className='mt-4'>
                                    <div className='font-semibold'>Количество правильных ответов: {correct_count} из {assignment.test.length}</div>
                                    <div className='w-full bg-gray-200 rounded-lg overflow-hidden mt-2'>
                                        <div className='bg-green-500 h-4' style={{ width: `${(correct_count / assignment.test.length) * 100}%` }}></div>
                                    </div>
                                </div>

                                {/* Show Each Question, User's Answer, and Correct Answer */}
                                <div className='mt-5'>
                                    {assignment.test.map((test, index) => (
                                        <div key={index} className='mt-4'>
                                            <div className='font-semibold'>{index + 1}. {test.question}</div>
                                            <div className={`mt-2 px-3 py-2 rounded-md ${test.correct_answer === data.answers[index]?.selected_answer ? 'bg-green-100' : 'bg-red-100'}`}>
                                                Ваш ответ: {data.answers[index]?.selected_answer || 'Нет ответа'}
                                            </div>
                                            <div className='mt-1 text-sm text-gray-500'>
                                                Правильный ответ: {test.correct_answer}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Rating Gained */}
                                <div className='mt-5'>
                                    <div className='text-xl font-semibold'>Ваш рейтинг: {assignment.rating} баллов</div>
                                </div>
                            </div>
                        ) : (
                            <div className='px-5 py-4 bg-white border border-gray-200 rounded-lg mt-2'>
                                <div className='font-semibold'>Тесты</div>
                                {currentTests.length > 0 && (
                                    <div>
                                        {currentTests.map((test, index) => (
                                            <div key={index} className='mt-2'>
                                                <div>{test.question}</div>
                                                <div className='flex items-center gap-x-2 mt-2'>
                                                    <input
                                                        id={`test-a-${index}`}
                                                        type='radio'
                                                        value={test.a}
                                                        checked={data.answers[(currentTestPage - 1) * itemsPerPage + index]?.selected_answer === test.a}
                                                        onChange={() => handleTestAnswerChange((currentTestPage - 1) * itemsPerPage + index, test.a)}
                                                    />
                                                    <label htmlFor={`test-a-${index}`}>{test.a}</label>
                                                </div>
                                                <div className='flex items-center gap-x-2 mt-2'>
                                                    <input
                                                        id={`test-b-${index}`}
                                                        type='radio'
                                                        value={test.b}
                                                        checked={data.answers[(currentTestPage - 1) * itemsPerPage + index]?.selected_answer === test.b}
                                                        onChange={() => handleTestAnswerChange((currentTestPage - 1) * itemsPerPage + index, test.b)}
                                                    />
                                                    <label htmlFor={`test-b-${index}`}>{test.b}</label>
                                                </div>
                                                <div className='flex items-center gap-x-2 mt-2'>
                                                    <input
                                                        id={`test-c-${index}`}
                                                        type='radio'
                                                        value={test.c}
                                                        checked={data.answers[(currentTestPage - 1) * itemsPerPage + index]?.selected_answer === test.c}
                                                        onChange={() => handleTestAnswerChange((currentTestPage - 1) * itemsPerPage + index, test.c)}
                                                    />
                                                    <label htmlFor={`test-c-${index}`}>{test.c}</label>
                                                </div>
                                                <div className='flex items-center gap-x-2 mt-2'>
                                                    <input
                                                        id={`test-d-${index}`}
                                                        type='radio'
                                                        value={test.d}
                                                        checked={data.answers[(currentTestPage - 1) * itemsPerPage + index]?.selected_answer === test.d}
                                                        onChange={() => handleTestAnswerChange((currentTestPage - 1) * itemsPerPage + index, test.d)}
                                                    />
                                                    <label htmlFor={`test-d-${index}`}>{test.d}</label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Task Section */}
                                {currentTasks.length > 0 && (
                                    <div>
                                        {currentTasks.map((task, index) => (
                                            <div className='mt-2' key={index}>
                                                <div>{index + 1}. {task.question}</div>
                                                <textarea
                                                    className='w-full border-gray-300 mt-2 rounded-lg h-[100px]'
                                                    placeholder='Введите ответ...'
                                                    value={data.taskAnswers[(currentTaskPage - 1) * itemsPerPage + index]?.selected_answer || ''}
                                                    onChange={(e) => handleTaskAnswerChange((currentTaskPage - 1) * itemsPerPage + index, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div onClick={handleSubmit} className='w-full bg-blue-500 rounded-lg font-semibold text-white text-center py-2 mt-5'>Ответить</div>
                                <div className='w-full border-blue-500 border-2 rounded-lg font-semibold text-blue-500 text-center py-2 mt-2 mb-10'>Посмотреть ответ</div>
                            </div>
                        )}
                    </div>

                    {/* Pagination above the News Section */}
                    <div className='col-span-3 hidden lg:block'>
                        <div className='py-3 px-5 rounded-lg bg-white border border-gray-200'>
                            <PaginationGrid
                                totalPages={totalTestPages}
                                onPageChange={(page) => setCurrentTestPage(page)}
                            />

                            <div className='text-lg font-semibold mt-5'>Здесь нужно поставить новость</div>
                            <div className='text-blue-500 font-semibold mt-2'>Ссылка на новость</div>
                        </div>

                        <PaginationNav
                            currentPage={currentTestPage}
                            totalPages={totalTestPages}
                            onPageChange={setCurrentTestPage}
                        />
                    </div>
                </div>
            </Layout>
        </>
    );
}

