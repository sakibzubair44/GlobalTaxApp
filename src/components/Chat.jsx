import React, { useState } from 'react';
import { useTaxContext } from '../contexts/TaxContext';
import { Bot, User, Send } from 'lucide-react';

const Chat = () => {
  const { profile, chatHistory, addChatMessage } = useTaxContext();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const currentInput = input;
    addChatMessage('user', currentInput);
    setInput('');
    setIsTyping(true);

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      setTimeout(() => {
        addChatMessage('ai', "⚠️ **API Key Missing**: Please add `VITE_GEMINI_API_KEY` to your `.env` file to enable real AI logic. Running in Mock Mode.\n\n" + 
          (profile.country 
            ? `Mock response: In ${profile.country} as a ${profile.income_type}, follow the standard reporting procedures.` 
            : "Mock response: Please check local regulations.")
        );
        setIsTyping(false);
      }, 1500);
      return;
    }

    try {
      // Map existing history to Gemini API structure
      const modelHistory = chatHistory.map(msg => ({
        role: msg.role === 'ai' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));
      modelHistory.push({ role: 'user', parts: [{ text: currentInput }] });

      const systemPrompt = `You are an elite, certified Global Tax Professional AI. The user's tax profile is: Country: ${profile.country || 'Unknown'}, Income Type: ${profile.income_type || 'Unknown'}, Dependents: ${profile.dependents || 'Unknown'}. Provide accurate, extremely easy to understand, and legally sound advisory regarding global tax setup based on their country. Focus purely on tax workflows. Use Markdown formatting. Be concise.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: { text: systemPrompt } },
          contents: modelHistory
        })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      
      const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that.";
      addChatMessage('ai', aiReply);
    } catch (err) {
      addChatMessage('ai', "Network Error: " + err.message);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '2rem', maxWidth: '800px', width: '100%', height: '75vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Bot size={28} color="var(--primary)" /> 
          AI Tax Copilot
        </h2>
        {Object.keys(profile).length > 0 && (
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Context: {profile.country || 'Unknown Region'} | {profile.income_type || 'Unknown Income'}
          </div>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', paddingRight: '0.5rem', marginBottom: '1.5rem' }}>
        {chatHistory.map((msg, idx) => (
          <div key={idx} style={{ 
            display: 'flex', 
            justifyContent: msg.role === 'ai' ? 'flex-start' : 'flex-end',
            width: '100%' 
          }}>
            <div style={{ 
               maxWidth: '80%', 
               padding: '1.25rem', 
               borderRadius: 'var(--radius-lg)', 
               background: msg.role === 'ai' ? 'var(--bg-elevated)' : 'linear-gradient(135deg, var(--primary), #7c3aed)',
               borderBottomLeftRadius: msg.role === 'ai' ? '0' : 'var(--radius-lg)',
               borderBottomRightRadius: msg.role === 'ai' ? 'var(--radius-lg)' : '0',
               boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
               lineHeight: '1.5'
            }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', opacity: 0.8, fontSize: '0.85rem' }}>
                  {msg.role === 'ai' ? <Bot size={16} /> : <User size={16} />}
                  <strong>{msg.role === 'ai' ? 'Tax AI' : 'You'}</strong>
               </div>
               {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={{ alignSelf: 'flex-start', background: 'var(--bg-elevated)', padding: '1rem', borderRadius: 'var(--radius-md) var(--radius-md) var(--radius-md) 0' }}>
            <span className="text-muted">Typing...</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <input 
          type="text" 
          className="input-field" 
          placeholder="Ask a global tax rule..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="btn-primary" onClick={handleSend} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
           <Send size={18} /> Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
