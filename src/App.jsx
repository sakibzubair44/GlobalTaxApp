import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Shield, Settings, FileText, Bot, FileCheck } from 'lucide-react';
import './index.css';

import { TaxProvider } from './contexts/TaxContext';
import Dashboard from './components/Dashboard';
import Wizard from './components/Wizard';
import Chat from './components/Chat';
import Report from './components/Report';

function App() {
  return (
    <TaxProvider>
      <Router>
        <div className="app-container">
          {/* Top Navigation */}
          <nav style={{ 
            padding: '1.25rem 2rem', 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--border-light)',
            background: 'var(--bg-dark)',
            position: 'sticky',
            top: 0,
            zIndex: 100
          }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
              <Shield size={32} color="var(--primary)" />
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)', letterSpacing: '-0.02em' }}>TaxAI</span>
            </Link>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <Link to="/wizard" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                <FileText size={20} /> Setup
              </Link>
              <Link to="/chat" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                <Bot size={20} /> Copilot
              </Link>
              <Link to="/report" style={{ color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                <FileCheck size={20} /> Checklist
              </Link>
              <Settings size={20} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} />
            </div>
          </nav>

          {/* Main Stage */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/wizard" element={<Wizard />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/report" element={<Report />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TaxProvider>
  );
}

export default App;
