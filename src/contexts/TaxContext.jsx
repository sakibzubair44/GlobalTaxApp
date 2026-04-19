import React, { createContext, useContext, useState } from 'react';

const TaxContext = createContext();

export const useTaxContext = () => useContext(TaxContext);

export const TaxProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', text: 'Hello! I am your AI Tax Copilot. I have access to global tax laws. How can I help you today?' }
  ]);

  const updateProfile = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const addChatMessage = (role, text) => {
    setChatHistory(prev => [...prev, { role, text }]);
  };

  return (
    <TaxContext.Provider value={{ profile, updateProfile, chatHistory, addChatMessage }}>
      {children}
    </TaxContext.Provider>
  );
};
