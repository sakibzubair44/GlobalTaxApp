import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => (
  <div className="glass-panel animate-fade-in" style={{ padding: '3rem', maxWidth: '800px', width: '100%', textAlign: 'center' }}>
    <h1 style={{ marginBottom: '1.5rem', fontSize: '2.5rem' }} className="text-gradient">Peace of Mind for Global Taxes</h1>
    <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.2rem', lineHeight: '1.6' }}>
      No matter where you live or how you earn, our AI Tax Copilot analyzes local laws to guide you step-by-step. Let's make taxes stress-free.
    </p>
    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
      <Link to="/wizard">
        <button className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>Start Tax Setup</button>
      </Link>
      <Link to="/chat">
        <button className="btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>Chat with AI Copilot</button>
      </Link>
    </div>
  </div>
);

export default Dashboard;
