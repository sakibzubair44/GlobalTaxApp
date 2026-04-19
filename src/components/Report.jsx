import React, { useState } from 'react';
import { useTaxContext } from '../contexts/TaxContext';
import { CheckCircle2, Circle, Download, FileCheck, ArrowRight } from 'lucide-react';

const Report = () => {
  const { profile } = useTaxContext();
  const [completedSteps, setCompletedSteps] = useState({});

  const toggleStep = (stepIdx) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepIdx]: !prev[stepIdx]
    }));
  };

  // Mock Tax Rules based on country
  const getTaxChecklist = () => {
    if (profile.country?.toLowerCase().includes('united states') || profile.country?.toLowerCase() === 'us') {
      return [
        { id: 1, title: 'Gather Forms W-2 and 1099', desc: 'Ensure you have received all employer and contractor forms.' },
        { id: 2, title: 'File Form 1040', desc: 'The standard individual income tax return form for the U.S.' },
        { id: 3, title: 'Review State Taxes', desc: 'Check if your resident state requires a separate filing.' }
      ];
    } else if (profile.country?.toLowerCase().includes('kingdom') || profile.country?.toLowerCase() === 'uk') {
      return [
        { id: 1, title: 'Register for Self Assessment', desc: 'If a freelancer, ensure you have your UTR number.' },
        { id: 2, title: 'Gather P60 / P45 Forms', desc: 'These forms summarize your pay and tax deducted.' },
        { id: 3, title: 'Submit HMRC Tax Return', desc: 'Submit digitally via the HMRC portal by Jan 31st.' }
      ];
    }
    // Default Global
    return [
      { id: 1, title: 'Consolidate Global Income', desc: 'Gather all domestic and foreign income statements.' },
      { id: 2, title: 'Identify Local Tax Forms', desc: 'Find your country-specific annual income declaration form.' },
      { id: 3, title: 'Submit to Local Tax Authority', desc: 'File the declaration adhering to your local deadlines.' }
    ];
  };

  const checklist = getTaxChecklist();

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '3rem', maxWidth: '800px', width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
        <div>
          <h1 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Your Tax Strategy Guide</h1>
          <p style={{ color: 'var(--text-muted)' }}>Customized for: {profile.country || 'Global Context'} | {profile.income_type || 'General Income'}</p>
        </div>
        <FileCheck size={48} color="var(--secondary)" opacity={0.8} />
      </div>

      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Filing Checklist
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {checklist.map((item, idx) => (
            <div 
              key={item.id} 
              onClick={() => toggleStep(idx)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                padding: '1.25rem',
                background: completedSteps[idx] ? 'rgba(14, 165, 233, 0.1)' : 'var(--bg-elevated)',
                border: `1px solid ${completedSteps[idx] ? 'var(--secondary)' : 'var(--border-light)'}`,
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
            >
              <div style={{ marginTop: '0.25rem' }}>
                {completedSteps[idx] ? <CheckCircle2 color="var(--secondary)" /> : <Circle color="var(--text-muted)" />}
              </div>
              <div>
                <h3 style={{ marginBottom: '0.25rem', color: completedSteps[idx] ? 'var(--secondary)' : 'var(--text-main)', textDecoration: completedSteps[idx] ? 'line-through' : 'none' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
        <div>
          <h4 style={{ marginBottom: '0.25rem' }}>Ready to submit?</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Download a PDF summary of these instructions.</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Download size={18} /> Export Summary
        </button>
      </div>

    </div>
  );
};

export default Report;
