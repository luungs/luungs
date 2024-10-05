import React from 'react';
import { Button, Form, Input } from 'antd';
import TeacherLayout from '@/Layouts/TeacherLayout';
import { useForm } from '@inertiajs/react';

const CreateAssignment = () => {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        rating: '',
        type: '',
        tests: [{ question: '', a: '', b: '', c: '', d: '', correct_answer: '' }], // Initialize with one test
        tasks: [{ question: '' }], // Initialize with one task
    });

    console.log(data)
    // Handles input changes for dynamic arrays (tests/tasks)
    const handleArrayChange = (index, name, value, arrayName) => {
        const updatedArray = [...data[arrayName]];

        // Ensure the object exists before trying to set the property
        if (!updatedArray[index]) {
            updatedArray[index] = {}; // Create a new object if it doesn't exist
        }

        updatedArray[index][name] = value; // Set the property
        setData(arrayName, updatedArray); // Update the state with the new array
    };

    // Handles submission of the form
    const onFinish = () => {
        post('/teacher/store-assignment', {
            onSuccess: () => {
                // Handle success, e.g., redirect or show success message
            },
        });
    };

    return (
        <TeacherLayout>
            <div>
                <h1 className="text-2xl font-semibold mb-4">Создать задание</h1>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Заголовок"
                        required
                        help={errors.title}
                    >
                        <Input
                            name="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="Описание">
                        <Input.TextArea
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Рейтинг"
                        required
                        help={errors.rating}
                    >
                        <Input
                            type="number"
                            name="rating"
                            value={data.rating}
                            onChange={(e) => setData('rating', e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Тип"
                        required
                        help={errors.type}
                    >
                        <Input
                            name="type"
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                        />
                    </Form.Item>

                    {/* Tests List */}
                    <Form.List name="tests">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name }) => (
                                    <div key={key} style={{ marginBottom: '16px' }}>
                                        <Form.Item
                                            label={`Вопрос ${key + 1}`}
                                            required
                                            help={errors.tests?.[key]?.question}
                                        >
                                            <Input
                                                name={[name, 'question']}
                                                value={data.tests[key]?.question}
                                                onChange={(e) => handleArrayChange(key, 'question', e.target.value, 'tests')}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Ответ A"
                                            required
                                            help={errors.tests?.[key]?.a}
                                        >
                                            <Input
                                                name={[name, 'a']}
                                                value={data.tests[key]?.a}
                                                onChange={(e) => handleArrayChange(key, 'a', e.target.value, 'tests')}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Ответ B"
                                            required
                                            help={errors.tests?.[key]?.b}
                                        >
                                            <Input
                                                name={[name, 'b']}
                                                value={data.tests[key]?.b}
                                                onChange={(e) => handleArrayChange(key, 'b', e.target.value, 'tests')}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Ответ C"
                                            required
                                            help={errors.tests?.[key]?.c}
                                        >
                                            <Input
                                                name={[name, 'c']}
                                                value={data.tests[key]?.c}
                                                onChange={(e) => handleArrayChange(key, 'c', e.target.value, 'tests')}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Ответ D"
                                            required
                                            help={errors.tests?.[key]?.d}
                                        >
                                            <Input
                                                name={[name, 'd']}
                                                value={data.tests[key]?.d}
                                                onChange={(e) => handleArrayChange(key, 'd', e.target.value, 'tests')}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Правильный ответ"
                                            required
                                            help={errors.tests?.[key]?.correct_answer}
                                        >
                                            <Input
                                                name={[name, 'correct_answer']}
                                                value={data.tests[key]?.correct_answer}
                                                onChange={(e) => handleArrayChange(key, 'correct_answer', e.target.value, 'tests')}
                                            />
                                        </Form.Item>
                                        <Button type="danger" onClick={() => {
                                            remove(name); // Remove the test
                                            // Update state manually
                                            const updatedTests = [...data.tests];
                                            updatedTests.splice(key, 1); // Remove the item from the array
                                            setData('tests', updatedTests); // Update the state
                                            console.log('Updated tests:', updatedTests); // Log updated tests
                                        }}>
                                            Удалить вопрос
                                        </Button>
                                    </div>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block>
                                        Добавить вопрос
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    {/* Tasks List */}
                    <Form.List name="tasks">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name }) => (
                                    <div key={key} style={{ marginBottom: '16px' }}>
                                        <Form.Item
                                            label={`Задание ${key + 1}`}
                                            required
                                            help={errors.tasks?.[key]?.question}
                                        >
                                            <Input
                                                name={[name, 'question']}
                                                value={data.tasks[key]?.question}
                                                onChange={(e) => handleArrayChange(key, 'question', e.target.value, 'tasks')}
                                            />
                                        </Form.Item>
                                        <Button type="danger" onClick={() => {
                                            remove(name); // Remove the task
                                            const updatedTasks = [...data.tasks];
                                            updatedTasks.splice(key, 1); // Remove the item from the array
                                            setData('tasks', updatedTasks); // Update the state
                                            console.log('Updated tasks:', updatedTasks); // Log updated tasks
                                        }}>
                                            Удалить задание
                                        </Button>
                                    </div>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block>
                                        Добавить задание
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={processing}>
                            Создать
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </TeacherLayout>
    );
};

export default CreateAssignment;

