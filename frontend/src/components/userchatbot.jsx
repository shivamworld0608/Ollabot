import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, X } from 'lucide-react';

const API_URL ='http://localhost:5000';

export default function ChatbotInterface() {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
const recognitionRef = useRef(null);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const [attachment, setAttachment] = useState(null);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

 const handleSend = async () => {
  if (input.trim() === '' && !attachment) return;

  const currentInput = input.trim(); // Save before clearing
  const currentAttachment = attachment;

  const newUserMessage = {
    id: Date.now(),
    role: 'user',
    content: currentInput,
    timestamp: new Date(),
    attachment: currentAttachment ? currentAttachment.name : null,
  };

  setMessages((prev) => [...prev, newUserMessage]);
  setInput('');
  setAttachment(null);
  setIsTyping(true);

  try {
    let body;
    let headers = {};

    if (currentAttachment) {
      body = new FormData();
      body.append('question', currentInput);
      body.append('file', currentAttachment);
      console.log('Sending FormData with question:', currentInput, 'file:', currentAttachment.name);
    } else {
      body = JSON.stringify({ question: currentInput });
      headers = { 'Content-Type': 'application/json' };
      console.log('Sending JSON with question:', currentInput);
    }

    const res = await fetch(`${API_URL}/api/query`, {
      method: 'POST',
      headers,
      body,
    });

    if (!res.ok) {
      throw new Error('Server busy, please try again later.');
    }

    const data = await res.json();

    const newBotMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      content: data.answer || 'No response received.',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newBotMessage]);
  } catch (err) {
    console.error('Error:', err);
    const errorMessage = {
      id: Date.now() + 1,
      role: 'assistant',
      content: 'Server busy, please try again later.',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, errorMessage]);
  } finally {
    setIsTyping(false);
  }
};
const handleVoiceInput = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Your browser does not support voice input.");
    return;
  }

  if (isListening) {
    recognitionRef.current?.stop();
    setIsListening(false);
    return;
  }

  const recognition = new SpeechRecognition();
  recognitionRef.current = recognition;

  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.continuous = false;

  let finalTranscript = input; // Start with existing input

  recognition.onstart = () => {
    setIsListening(true);
    console.log("Listening...");
  };

  recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' ';
      } else {
        interimTranscript += transcript;
      }
    }
    setInput(finalTranscript + interimTranscript);
  };

  recognition.onend = () => {
    console.log("Stopped listening.");
    setIsListening(false);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    setIsListening(false);
  };

  recognition.start();
};



  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachment = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
    fileInputRef.current.value = null;
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden h-96 border border-gray-200 mt-8">
      {/* Header */}
      <div className="bg-[#0369A0] text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-white rounded-full p-1">
            <div className="h-8 w-8 rounded-full bg-[#0369A0] flex items-center justify-center text-white font-bold">
              AI
            </div>
          </div>
          <div>
            <h3 className="font-medium">Support Assistant</h3>
            <p className="text-xs">Online</p>
          </div>
        </div>
        <div className="h-2 w-2 bg-green-400 rounded-full"></div>
      </div>

      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 && !isTyping && (
          <div className="text-center text-gray-500 mt-4">
            Start the conversation by typing a message below.
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-3`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-[#0369A0] text-white rounded-br-none'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
              }`}
            >
              {message.content}
              {message.content && message.attachment && (
                <div className="mt-2 text-xs text-white">
                  📎 {message.attachment}
                </div>
              )}
              {message.attachment && !message.content && (
                <div className="mt-2 text-xs text-white">
                  📎 {message.attachment}
                </div>
              )}
              <div
                className={`text-xs mt-1 ${
                  message.role === 'user' ? 'text-white' : 'text-gray-500'
                }`}
              >
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start mb-3">
            <div className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-lg rounded-bl-none">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></div>
                <div
                  className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Attachment preview */}
      {attachment && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between bg-indigo-50 px-3 py-1 rounded">
            <div className="text-sm text-[#0369A0] truncate flex-1">
              📎 {attachment.name}
            </div>
            <button
              onClick={removeAttachment}
              className="text-[#0369A0] hover:text-indigo-800"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="relative flex items-center">
          <button
            onClick={handleAttachment}
            className="text-gray-500 hover:text-[#0369A0] p-1 rounded-full"
          >
            <Paperclip size={20} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:border-[#0369A0] resize-none max-h-50 mx-2"
            rows="1"
          />
       <button
  onClick={handleVoiceInput}
  className={`mr-2 p-2 rounded-full transition-colors ${
    isListening ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
  }`}
  title={isListening ? "Stop Listening" : "Start Voice Input"}
>
  <Mic size={16} />
</button>

{(input.trim() || attachment) && (
  <button
    onClick={handleSend}
    className="bg-[#0369A0] text-white p-2 rounded-full hover:bg-[#025f8a] transition-colors"
  >
    <Send size={16} />
  </button>
)}


        </div>
      </div>
    </div>
  );
}