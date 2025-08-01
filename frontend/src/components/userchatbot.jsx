import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, X, FileSearch,Volume2,ThumbsUp,ThumbsDown } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/authSlice';
import PDFViewer from './pdfviewer';
import bgImage from '../assets/bg3.jpg';


export default function ChatbotInterface() {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [feedbackMap, setFeedbackMap] = useState({});
  const [activeSources, setActiveSources] = useState([]);
  const [showSourceModal, setShowSourceModal] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null); // New state for selected source

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const { userData } = useSelector((state) => state.auth);
  const username = userData?.name || 'User';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    if (hour < 20) return 'Good evening';
    return 'Good night';
  };

  const handleSend = async () => {
    if (input.trim() === '' && !attachment) return;

    const currentInput = input.trim();
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
      let config = {
        withCredentials: true,
        headers: {},
      };

      if (currentAttachment) {
        body = new FormData();
        body.append('question', currentInput);
        body.append('file', currentAttachment);
      } else {
        body = { question: currentInput };
        config.headers['Content-Type'] = 'application/json';
      }

      const res = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/query`, body, config);
      const data = res.data;

      const newBotMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.answer.answer || 'No response received.',
        timestamp: new Date(),
        sources: data.answer.sources || [],
        chunks: data.answer.chunks || [],
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

  const speak = (text) => {
  const synth = window.speechSynthesis;
  if (!synth) return;
  synth.cancel(); // Stop any previous speech
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  synth.speak(utterance);
};

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support voice input.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;

    let finalTranscript = input;

    recognition.onstart = () => {
      setIsListening(true);
      console.log('Listening...');
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
      console.log('Stopped listening.');
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
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

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/auth/logout`, {
        withCredentials: true,
      });
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  const handleFeedback = async (question, answer, isHelpful) => {
    try {
      await axios.post(
       `${import.meta.env.VITE_APP_BASE_URL}/feedback/submit`,
        {
          question,
          answer,
          isHelpful,
        },
        { withCredentials: true }
      );

      setFeedbackMap((prev) => ({
        ...prev,
        [answer]: isHelpful,
      }));
    } catch (err) {
      console.error('Feedback submission failed:', err);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fafc]" style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat', 
  }}>
      {/* Logout Button */}
      <div className="absolute top-5 right-5 z-20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full shadow-md hover:bg-red-50 transition-all group"
        >
          <LogOut className="w-4 h-4 text-red-500 group-hover:rotate-[-20deg] group-hover:scale-110 transition-transform duration-200" />
          <span className="text-sm font-medium text-red-500 group-hover:text-red-600">Logout</span>
        </button>
      </div>

      <div className="relative z-10 w-full px-4 mt-20">

        {/* Greeting */}
        <div className="text-center mb-1 text-xl font-bold text-black">
          {getGreeting()}, {username}
        </div>
        <div className="flex flex-col w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden h-96 border border-gray-200 mt-4">
          {/* Header */}
          <div className="bg-[#0369A0] text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-white rounded-full p-1">
                <div className="h-8 w-8 rounded-full bg-[#0369A0] flex items-center justify-center text-white font-bold">
                  AI
                </div>
              </div>
              <div>
                <p className="text-md">TPO NITJ Support Assistant</p>
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
                  <div>
                    <div>{message.content}</div>

                    {/* Feedback Buttons */}
                    {message.role === 'assistant' && (
                      <div className="flex mt-2 space-x-2 items-center">
                        <button
                          onClick={() =>
                            handleFeedback(
                              messages.find((m) => m.id < message.id && m.role === 'user')?.content || '',
                              message.content,
                              true
                            )
                          }
                          className={`text-sm px-2 py-1 ${
                            feedbackMap[message.content] === true
                              ? 'bg-green-100 border-green-400 text-green-700 rounded-full border'
                              : 'bg-white border-gray-300 text-gray-600 '
                          }`}
                        >
                          <ThumbsUp className='h-4 w-4 hover:text-black'/>
                        </button>
                        <button
                          onClick={() =>
                            handleFeedback(
                              messages.find((m) => m.id < message.id && m.role === 'user')?.content || '',
                              message.content,
                              false
                            )
                          }
                          className={`text-sm px-2 py-1 ${
                            feedbackMap[message.content] === false
                              ? 'bg-red-100 border-red-400 text-red-700 rounded-full border'
                              : 'bg-white border-gray-300 text-gray-600'
                          }`}
                        >
                          <ThumbsDown className='h-4 w-4 hover:text-black'/>
                        </button>
                         <button
      onClick={() => speak(message.content)}
      className="text-gray-500 hover:text-[#0369A0]"
      title="Listen"
    >
      <Volume2 className='h-4 w-4'/>
    </button>
                        {message.sources && message.sources.length > 0 && (
                          <button
                            onClick={() => {
                              setActiveSources(message.sources);
                              setShowSourceModal(true);
                            }}
                            className="inline-flex items-center text-xs text-blue-600 hover:underline"
                          >
                            <FileSearch className="w-4 h-4  text-gray-600" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {message.content && message.attachment && (
                    <div className="mt-2 text-xs text-white">📎 {message.attachment}</div>
                  )}
                  {message.attachment && !message.content && (
                    <div className="mt-2 text-xs text-white">📎 {message.attachment}</div>
                  )}
                  <div
                    className={`text-xs mt-1 ${message.role === 'user' ? 'text-white' : 'text-gray-500'}`}
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
                <div className="text-sm text-[#0369A0] truncate flex-1">📎 {attachment.name}</div>
                <button onClick={removeAttachment} className="text-[#0369A0] hover:text-indigo-800">
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
                  isListening ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                title={isListening ? 'Stop Listening' : 'Start Voice Input'}
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
      </div>

      {/* Source Modal */}
      {showSourceModal && (
        <div className="fixed inset-0 bg-blur bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm relative">
            <h3 className="text-lg font-semibold mb-4 text-[#0369A0]">Sources</h3>
            <ul className="space-y-2 max-h-60 overflow-auto text-sm text-gray-800">
              {activeSources.map((src, index) => (
                <li key={index} className="border p-2 rounded bg-gray-50">
                  <div>
                    <span className="font-semibold">Source:</span> {src.source}
                  </div>
                  <div>
                    <span className="font-semibold">Similarity-Score:</span> {src.similarity_score}
                  </div>
                  <div>
                    <span className="font-semibold">Chunk:</span> {src.chunk_index + 1} / {src.total_chunks}
                  </div>
                  <div>
                    <span className="font-semibold">Page:</span> {src.page_number}
                  </div>
                  <div>
                    <span className="font-semibold">Text Range:</span> {src.text_start} - {src.text_end}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedSource(src);
                      console.log(selectedSource);
                      setShowSourceModal(false);
                    }}
                    className="mt-2 text-blue-600 hover:underline"
                  >
                    View in PDF
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowSourceModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* PDF Viewer Modal */}
      {selectedSource && (
        <div className="fixed inset-0 bg-blur bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl relative">
            <PDFViewer
              file={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${selectedSource.source}`}
              pageNumber={parseInt(selectedSource.page_number, 10)}
              textStart={parseInt(selectedSource.text_start, 10)}
              textEnd={parseInt(selectedSource.text_end, 10)}
            />
            <button
              onClick={() => setSelectedSource(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}