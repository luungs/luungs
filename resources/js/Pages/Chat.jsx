import React, { useState, useRef, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Chat() {
  const [messages, setMessages] = useState([]); // Store chat messages
  const [loading, setLoading] = useState(false); // Loading state
  const flatListRef = useRef(null); // Scroll reference

  // Initialize useForm hook
  const { data, setData, post, reset } = useForm({
    message: '',
  });

  // Handle sending messages to the Laravel controller
  const handleSend = () => {
    if (data.message.trim() === '') return;

    const userMessage = { id: Date.now().toString(), text: data.message, role: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Add user message to state
    reset(); // Clear input
    setLoading(true); // Show loading indicator

    // Send message to backend via Inertia
    post('/chat/send', {
      onSuccess: ({ props }) => {
        const aiMessage = {
          id: Date.now().toString(),
          text: props.assistantResponse, // Get the response from backend
          role: 'assistant',
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]); // Add assistant response
        setLoading(false);
      },
      onError: (error) => {
        console.error('Error fetching AI response:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now().toString(), text: 'Sorry, something went wrong.', role: 'error' },
        ]);
        setLoading(false);
      },
    });
  };

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollIntoView({ behavior: 'smooth' }); // Scroll to bottom
    }
  }, [messages]);

  return (
    <>
      <Head title="Welcome" />
      <Layout>
        <div className="grid grid-cols-10 pt-5 gap-x-5 h-screen">
          <div className="col-span-7 flex flex-col justify-between">
            {/* Chat Container */}
            <div className="overflow-auto">
              <ul ref={flatListRef} className="space-y-3 pt-5">
                {messages.map((message) => (
                  <li key={message.id} className={`message ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-gray-200' : 'bg-blue-200'}`}>
                      {message.text}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Input Field */}
            <div className="sticky bottom-0 p-4 w-full">
              <div className="flex gap-x-3 items-center w-full">
                <input
                  type="text"
                  placeholder="Введите свой запрос..."
                  value={data.message}
                  onChange={(e) => setData('message', e.target.value)}
                  className="border-gray-200 bg-white rounded-lg w-[80%] p-2"
                  disabled={loading} // Disable input during loading
                />
                <button
                  onClick={handleSend}
                  className={`w-[20%] text-center rounded-lg bg-blue-500 text-white py-2 px-5 ${loading ? 'opacity-50' : ''}`}
                  disabled={loading} // Disable button during loading
                >
                  {loading ? 'Отправка...' : 'Отправить'}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-3">
            <div className="py-3 px-5 rounded-lg bg-white border border-gray-200">
              <div className="text-lg font-semibold">Здесь нужно поставить новость</div>
              <div className="text-blue-500 font-semibold text-xl">luungs - bızden bızge</div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

