import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Feather, Loader2, Image as ImageIcon } from 'lucide-react';
import { getMakeupAdvice } from '../lib/gemini';
import { generateImage } from '../lib/huggingface';

interface Message {
  text: string;
  isBot: boolean;
  images?: string[];
  imageLoading?: boolean;
  imageError?: boolean;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: `Hi! Welcome to Atelier Style, I'm StAilist your AI fashion advisor!

I'm here to help you create the perfect look with personalized fashion and makeup advice! ✨

Just start chatting and let's elevate your style together!`, 
      isBot: true 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Only scroll to bottom when user sends a message or receives a response
  const scrollToBottom = () => {
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom();
    }
  }, [messages]);

  const renderMessageContent = (message: Message) => {
    return (
      <div>
        <span className="whitespace-pre-wrap">{message.text}</span>
        {message.imageLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center justify-center p-6 bg-cream-50/80 rounded-2xl border border-gold-400"
          >
            <Loader2 className="w-6 h-6 animate-spin text-gold-600 mr-2" />
            <span className="text-mauve-700">Creating your style preview...</span>
          </motion.div>
        )}
        {message.imageError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center justify-center p-6 bg-rose-50/50 rounded-2xl border border-rose-100"
          >
            <ImageIcon className="w-6 h-6 text-rose-500 mr-2" />
            <span className="text-rose-600">Sorry, I couldn't create previews this time. Let me know if you'd like to try again!</span>
          </motion.div>
        )}
        <AnimatePresence>
          {message.images && message.images.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-6 grid gap-6 grid-cols-1"
            >
              {message.images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative group"
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]">
                    <img
                      src={image}
                      alt={`Style preview ${index + 1}`}
                      className="w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-sm font-medium border border-white/10">
                    Look {index + 1}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getMakeupAdvice(input);
      const hasOutfitSuggestions = /Here's your outfit suggestion:/i.test(response);
      
      const botMessage: Message = { text: response, isBot: true };
      setMessages(prev => [...prev, botMessage]);

      if (hasOutfitSuggestions) {
        setMessages(prev => prev.map((msg, idx) => 
          idx === prev.length - 1 ? { ...msg, imageLoading: true } : msg
        ));

        try {
          const images = await generateImage(response);
          setMessages(prev => prev.map((msg, idx) => 
            idx === prev.length - 1 
              ? { ...msg, images, imageLoading: false }
              : msg
          ));
        } catch (imageError) {
          console.error('Error generating images:', imageError);
          setMessages(prev => prev.map((msg, idx) => 
            idx === prev.length - 1 
              ? { ...msg, imageLoading: false, imageError: true }
              : msg
          ));
        }
      }
    } catch (error) {
      const errorMessage = { 
        text: "Oops! Having a little glitch moment! Let's try that again in a sec! 😊", 
        isBot: true 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col h-[600px] bg-white/50 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border-2 border-gold-400/40">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23B16581' fill-opacity='0.3'%3E%3Cpath d='M50 0l12.5 12.5L75 0h25v25L87.5 37.5 100 50v50H50L37.5 87.5 25 100H0V75l12.5-12.5L0 50V0h25l12.5 12.5L50 0zm0 100l12.5-12.5L75 100h25V75L87.5 62.5 100 50V0H50L37.5 12.5 25 0H0v25l12.5 12.5L0 50v50h25l12.5-12.5L50 100z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`relative max-w-[80%] p-6 rounded-2xl backdrop-blur-sm ${
                  message.isBot
                    ? 'bg-gradient-to-br from-cream-50/90 to-mauve-50/80 text-gray-800'
                    : 'bg-gradient-to-br from-mauve-600 to-rose-500 text-white'
                } shadow-[0_4px_20px_rgba(0,0,0,0.05)]`}
              >
                <div className="absolute inset-0 rounded-2xl border-2 border-gold-500/40" />
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold-600/60 rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold-600/60 rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold-600/60 rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold-600/60 rounded-br-xl" />
                <div className="relative">
                  {message.isBot && (
                    <Feather className="inline-block w-4 h-4 mr-2 mb-1 text-gold-600" />
                  )}
                  {renderMessageContent(message)}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t-2 border-gold-400/40">
        <div className="flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask StAilist about your perfect look..."
            className="flex-1 px-4 py-3 rounded-xl border-2 border-gold-400/40 focus:outline-none focus:border-gold-500/60 focus:ring-1 focus:ring-gold-400/20 bg-white/80 placeholder-mauve-300 text-mauve-700 transition-all duration-200"
            disabled={isLoading}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative group bg-gradient-to-r from-mauve-600 to-rose-500 text-white p-3 rounded-xl shadow-lg transition-all overflow-hidden ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
            }`}
            disabled={isLoading}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold-400/0 via-gold-400/30 to-gold-400/0 opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="relative">
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Feather className="w-5 h-5 transform rotate-45" />
              )}
            </div>
            <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-gold-400 to-rose-300 opacity-0 group-hover:opacity-30 rounded-xl" style={{ padding: '1px' }} />
          </motion.button>
        </div>
      </form>
    </div>
  );
}