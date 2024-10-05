// resources/js/Pages/Teacher/Tasks.jsx

import React, { useState } from 'react';
import { Button, Form, Input, Modal, Table } from 'antd';
import TeacherLayout from '@/Layouts/TeacherLayout';

export default function Tasks({ assignments }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (values) => {
        // Submit assignment creation
        fetch('/teacher/create-assignment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content,
            },
            body: JSON.stringify(values),
        })
            .then(response => {
                if (response.ok) {
                    form.resetFields();
                    setIsModalVisible(false);
                    // Optionally refresh the assignments list or show a success message
                }
            });
    };

    const columns = [
        {
            title: 'Заголовок',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Рейтинг',
            dataIndex: 'rating',
            key: 'rating',
        },
        {
            title: 'Тип',
            dataIndex: 'type',
            key: 'type',
        },
    ];

    return (
        <TeacherLayout>
            <div>
                <h1 className="text-2xl font-semibold mb-4">Задачи</h1>
                <Button type="primary" onClick={showModal}>
                    Создать задание
                </Button>
                <Modal title="Создать задание" visible={isModalVisible} onCancel={handleCancel} footer={null}>
                    <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item name="title" label="Заголовок" rules={[{ required: true, message: 'Пожалуйста, введите заголовок!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="description" label="Описание">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item name="rating" label="Рейтинг" rules={[{ required: true, message: 'Пожалуйста, введите рейтинг!' }]}>
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item name="type" label="Тип" rules={[{ required: true, message: 'Пожалуйста, введите тип!' }]}>
                            <Input />
                        </Form.Item>
                        <Form.List name="tests">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                                        <div key={key} style={{ marginBottom: '16px' }}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'question']}
                                                fieldKey={[fieldKey, 'question']}
                                                label={`Вопрос ${key + 1}`}
                                                rules={[{ required: true, message: 'Пожалуйста, введите вопрос!' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'a']}
                                                fieldKey={[fieldKey, 'a']}
                                                label="Ответ A"
                                                rules={[{ required: true, message: 'Пожалуйста, введите ответ A!' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'b']}
                                                fieldKey={[fieldKey, 'b']}
                                                label="Ответ B"
                                                rules={[{ required: true, message: 'Пожалуйста, введите ответ B!' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'c']}
                                                fieldKey={[fieldKey, 'c']}
                                                label="Ответ C"
                                                rules={[{ required: true, message: 'Пожалуйста, введите ответ C!' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'd']}
                                                fieldKey={[fieldKey, 'd']}
                                                label="Ответ D"
                                                rules={[{ required: true, message: 'Пожалуйста, введите ответ D!' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'correct_answer']}
                                                fieldKey={[fieldKey, 'correct_answer']}
                                                label="Правильный ответ"
                                                rules={[{ required: true, message: 'Пожалуйста, введите правильный ответ!' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Button type="danger" onClick={() => remove(name)}>
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
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Создать
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Table dataSource={assignments} columns={columns} rowKey="id" />
            </div>
        </TeacherLayout>
    );
}
