'use client';
import { useState } from 'react';

export default function ExperienceToggle() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <section className="experience-section">
      <div className="experience-section__bg" style={{ background: 'linear-gradient(135deg, #0a0a0a, #1a1a1a)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(0,170,19,0.08) 0%, transparent 70%)' }} />
      </div>
      <div className="experience-section__content">
        <div className="experience-tabs">
          <button
            className={`experience-tab ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            Experience
          </button>
          <button
            className={`experience-tab ${activeTab === 'gym' ? 'active' : ''}`}
            onClick={() => setActiveTab('gym')}
          >
            Discover
          </button>
        </div>

        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          {activeTab === 'home' ? (
            <div className="fade-up">
              <h3 style={{ fontSize: 'var(--fs-h3)', color: 'var(--white)', marginBottom: '16px' }}>Home</h3>
              <p>Your personal power station. The RE:GEN transforms every pedal stroke into clean, usable energy for your home.</p>
            </div>
          ) : (
            <div className="fade-up">
              <h3 style={{ fontSize: 'var(--fs-h3)', color: 'var(--white)', marginBottom: '16px' }}>Gym</h3>
              <p>Power up your facility with our award-winning studio-grade indoor fitness bike and revolutionary software ecosystem.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
