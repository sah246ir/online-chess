import React, { useState, useContext, useEffect } from 'react';
import { gameContext } from '../context/GameContext';
import { useParams } from 'react-router-dom';

interface Message {
  label: string;
  content: string;
}

const Chat = () => {
  const game = useContext(gameContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [msg, setMsg] = useState<string>('');
  const params = useParams();

  useEffect(() => {
    if (game.messages) {
      setMessages(game.messages);
    }
  }, [game.messages]);

  const sendMessage = () => {
    if (!game.Socket || !msg.trim()) return;

    game.Socket.send(JSON.stringify({
      type: 'MESSAGE',
      content: {
        code: params.id,
        from: game.Chess.color,
        message: msg,
      },
    }));

    setMsg(''); // Clear the input field after sending the message
  };

  return (
    <div className='flex flex-col h-full w-full gap-1'>
      <div className='bg-gray-800 flex-grow'>
        {messages.map((msg, index) => (
          <div key={index} className={`w-full flex justify-between items-baseline px-2 py-1 ${msg.label!=="You"?"":""}`}>
            <p className={`min-w-16 text-left text-white text-xs`}>{msg.label}:</p>
            <p className={`w-full text-left break-all ${msg.label==="You"?'text-green-500':'text-red-500'}`}>{msg.content}</p>
          </div>
        ))}
      </div>
      <input
        className='bg-gray-600 w-full text-white text-center py-1 px-1 text-sm'
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        type='text'
        placeholder='Enter message here'
      />
      <button onClick={sendMessage} className='bg-green-700 hover:bg-green-800'>
        Send
      </button>
    </div>
  );
};

export default Chat;
