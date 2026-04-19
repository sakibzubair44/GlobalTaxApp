import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaxContext } from '../contexts/TaxContext';

const QUESTIONS = [
  { id: 'country', question: 'Where is your primary residence for tax purposes?', placeholder: 'e.g., United States' },
  { id: 'income_type', question: 'How do you primarily earn income?', placeholder: 'e.g., Full-time Employee, Freelancer, Business Owner' },
  { id: 'dependents', question: 'Do you have any dependents?', placeholder: 'e.g., No, 2 children' }
];

const Wizard = () => {
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const { updateProfile } = useTaxContext();
  const navigate = useNavigate();

  const currentQ = QUESTIONS[step];

  const handleNext = () => {
    if (inputValue.trim() === '') return;
    
    updateProfile(currentQ.id, inputValue);
    setInputValue('');
    
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // Finished wizard -> Head to Copilot
      navigate('/chat');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleNext();
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '3rem', maxWidth: '600px', width: '100%', position: 'relative', overflow: 'hidden' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '0.5rem' }}>
        {QUESTIONS.map((_, i) => (
          <div key={i} style={{ 
            height: '4px', 
            flex: 1, 
            background: i <= step ? 'var(--primary)' : 'var(--border-light)',
            borderRadius: '2px',
            transition: 'var(--transition-smooth)'
          }} />
        ))}
      </div>
      
      <div key={step} className="animate-fade-in">
        <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>{currentQ.question}</h2>
        <input 
          type="text" 
          className="input-field" 
          placeholder={currentQ.placeholder} 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{ marginBottom: '2rem', fontSize: '1.2rem', padding: '1.25rem' }} 
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {step > 0 ? (
            <button className="btn-secondary" onClick={() => setStep(step - 1)}>Back</button>
          ) : (
             <div />
          )}
          <button className="btn-primary" onClick={handleNext}>
            {step === QUESTIONS.length - 1 ? 'Finish & Analyze' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wizard;
