'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Modal, ModalBody, Spinner } from '@nextui-org/react';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';

interface ChatEntry {
  question: string;
  answer?: string;
  isLoading: boolean;
}

const ChatComponent = ({ additionalData }: { additionalData: string }) => {
    console.log(additionalData);
    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
    const messagesEndRef = useRef<HTMLUListElement>(null);

    const handleQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newEntry: ChatEntry = { question, isLoading: true };
        setChatHistory((prev) => [...prev, newEntry]);
        setQuestion('');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_FLASK_API_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: question,
                    // chat_history: chatHistory,
                    chat_history: [],
                    additional_data: additionalData,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setChatHistory((prev) =>
                prev.map((entry) =>
                    entry.question === question ? { ...entry, answer: data.answer, isLoading: false } : entry
                )
            );
        } catch (error) {
            console.error('Failed to fetch from the API', error);
            setChatHistory((prev) =>
                prev.map((entry) =>
                    entry.question === question ? { ...entry, answer: 'Sorry, an error occurred. Please try again in a moment.', isLoading: false } : entry
                )
            );
        }
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <div className='fixed bottom-10 right-10 z-50'>
            <Button color="primary" onClick={() => setOpen(!open)}>
                {open ? 'Close Chat' : 'Open Chat'} <SmartToyOutlinedIcon />
            </Button>

            <Modal closeButton isOpen={open} aria-labelledby="modal-title" onClose={() => setOpen(false)}>
                <ModalBody className='fixed bottom-20 justify-end right-10 z-50 bg-slate-300 rounded-2xl shadow-lg w-[30vw] mb-2 min-h-[20vh]'>
                    <ul className="space-y-2 overflow-auto max-h-[35vh]" ref={messagesEndRef}>
                        {chatHistory.map((entry, index) => (
                            <li key={index} className="flex flex-col text-black justify-between">
                                <div className="w-auto text-right p-2 bg-green-200 rounded-lg self-end">
                                    {entry.question}
                                </div>
                                {entry.isLoading ? (
                                    <div className="w-auto text-left p-2 bg-blue-400 rounded-lg self-start mt-2">
                                        <Spinner size="md" />
                                    </div>
                                ) : (
                                    <div className="w-auto text-left p-2 bg-blue-400 rounded-lg self-start mt-2">
                                        {entry.answer}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                    <form onSubmit={handleSubmit} className="flex gap-4 mt-4">
                        <Input
                            fullWidth
                            size="md"
                            placeholder="Ask a question"
                            value={question}
                            onChange={handleQuestionChange}
                        />
                        <Button type="submit" color='primary' size='md'>
                            Submit
                        </Button>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default ChatComponent;
