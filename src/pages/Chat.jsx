import React, { useState, useRef, useEffect } from 'react';
import { model } from '../gemini'; 
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Start a new chat session when the component mounts
    chatRef.current = model.startChat({
        history: [
            {
              role: "user",
              parts: [{ text: "You are a friendly and empathetic career counselor chatbot named \"Gildong\". Your goal is to help users explore their career paths by listening to their concerns, asking clarifying questions, and providing thoughtful, supportive advice. Engage in a natural, conversational manner."}],
            },
            {
              role: "model",
              parts: [{ text: "안녕하세요! AI 진로 멘토 길동이입니다. 무엇이든 물어보세요."}],
            },
        ],
    });

    setMessages([
      {
        sender: 'ai',
        text: '안녕하세요! AI 진로 동반자 길동이입니다. 무엇이든 물어보세요.'
      }
    ]);
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatRef.current.sendMessage(input);
      const response = await result.response;
      const text = response.text();

      const aiMessage = { sender: 'ai', text: text };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI 응답 에러:", error);
      const errorMessage = { sender: 'ai', text: '죄송해요, 답변을 생성하는 데 문제가 발생했어요. 다시 시도해 주시겠어요?' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>AI 챗봇 길동이</h2>
        <p>진로에 대한 모든 것을 물어보세요!</p>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-bubble">{msg.text}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message ai">
            <div className="message-bubble loading">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className="chat-input-form" onSubmit={sendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="길동이에게 메시지 보내기..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>전송</button>
      </form>
    </div>
  );
};

export default Chat;
