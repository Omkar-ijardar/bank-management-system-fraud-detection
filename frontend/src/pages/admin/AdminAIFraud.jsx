import React from 'react';
import { Bot, Cpu, ShieldAlert, Zap, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const AdminAIFraud = () => {
  const sampleCase = {
    riskScore: 90,
    amount: 150000.00,
    cityJump: 'Pune → Mumbai',
    ipJump: '10.0.0.12 → 192.168.1.45',
    reasons: ['High Value Amount (≥ ₹50,000)', 'Geographical Velocity Jump', 'Unusual Client IP'],
    aiExplanation: 'The machine learning engine flagged this transaction due to a rapid spatial shift between Pune and Mumbai combined with a high-value transfer amount (₹1,50,000). The user requested manual customer security verification.',
    model: 'Google Gemini 1.5 Pro / .NET Fraud Microservice Pipeline'
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Presentation Banner Header */}
      <div style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.15))', padding: '2.25rem', borderRadius: '20px', border: '1px solid rgba(6, 182, 212, 0.4)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>
            <Sparkles size={18} /> PROJECT DEMO SHOWCASE • AI FRAUD ANALYTICS
          </div>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#fff', margin: 0 }}>Gemini AI Fraud Reasoning Engine</h1>
          <p style={{ color: '#cbd5e1', fontSize: '0.925rem', margin: '0.4rem 0 0' }}>Real-time generative explanation pipeline integrated into the .NET microservice ecosystem.</p>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '0.85rem 1.25rem', borderRadius: '14px', border: '1px solid rgba(6, 182, 212, 0.3)', textAlign: 'right' }}>
          <div style={{ color: '#06b6d4', fontSize: '0.8rem', fontWeight: 700 }}>ENGINE MODEL</div>
          <div style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 800 }}>{sampleCase.model}</div>
        </div>
      </div>

      {/* Grid Showcase */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
        {/* Left: Risk Score Gauge & Status */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '20px', border: '1px solid rgba(244, 63, 94, 0.4)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', width: '90px', height: '90px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', border: '2px solid #f43f5e' }}>
            <ShieldAlert size={48} color="#f43f5e" />
          </div>

          <div style={{ fontSize: '3rem', fontWeight: 900, color: '#f87171', lineHeight: 1 }}>{sampleCase.riskScore}</div>
          <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 700, marginTop: '0.25rem', marginBottom: '1.5rem' }}>RISK SCORE (OUT OF 100)</div>

          <div style={{ background: 'rgba(244, 63, 94, 0.2)', color: '#f87171', padding: '0.5rem 1.25rem', borderRadius: '20px', fontWeight: 800, fontSize: '0.85rem', border: '1px solid rgba(244, 63, 94, 0.3)', width: '100%' }}>
            STATUS: HIGH RISK FLAGGED
          </div>
        </div>

        {/* Right: AI Explanation & Reasons */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bot size={22} color="#06b6d4" /> Live AI-Generated Assessment
            </h3>
            <div style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '1.25rem', borderRadius: '14px', borderLeft: '4px solid #06b6d4', fontSize: '0.95rem', color: '#e2e8f0', lineHeight: '1.6', fontStyle: 'italic' }}>
              "{sampleCase.aiExplanation}"
            </div>
          </div>

          <div>
            <h4 style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.75rem' }}>
              Detected Risk Factors & Rules Triggered
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {sampleCase.reasons.map((r, idx) => (
                <span key={idx} style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8', padding: '0.5rem 0.85rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, border: '1px solid rgba(6, 182, 212, 0.3)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Zap size={15} /> {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Presentation Feature Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
          <div style={{ color: '#06b6d4', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={20} /> .NET Microservice
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0, lineHeight: '1.5' }}>
            Runs asynchronously on Port 5000, calculating mathematical risk scores and connecting directly to Gemini AI API.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
          <div style={{ color: '#34d399', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={20} /> ₹50,000 Guard Threshold
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0, lineHeight: '1.5' }}>
            Transfers under ₹50k execute instantly. Transfers ≥ ₹50k prompt customer security verification popup.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '16px' }}>
          <div style={{ color: '#c084fc', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={20} /> Audit Trail Logging
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0, lineHeight: '1.5' }}>
            Customer decision (Allowed vs Blocked) is recorded into MySQL FraudLog table with complete timestamping.
          </p>
        </div>
      </div>
    </div>
  );
};
