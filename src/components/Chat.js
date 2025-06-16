import React, { useState } from 'react';
import axios from 'axios';

export default function Chat() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: '안녕하세요! MBTI GPT 상담이에요. 어떤 도움이 필요하신가요?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    try {
      const res = await axios.post(
        'https://mbti-gpt-proxy.vercel.app/api/chat',
        { message: input }
      );
      setMessages(prev => [...prev, { from: 'bot', text: res.data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { from: 'bot', text: '오류가 발생했어요.' }]);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.from}`}>{m.text}</div>
        ))}
      </div>
      <div className="input-box">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="메시지를 입력하세요"
        />
        <button onClick={sendMessage}>보내기</button>
      </div>
    </div>
  );
}
