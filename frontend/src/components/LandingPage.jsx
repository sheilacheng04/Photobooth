import { useState, useEffect } from 'react';
import './LandingPage.css';

function LandingPage({ onEnter }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="landing-page">
      <div className={`landing-content ${isVisible ? 'visible' : ''}`}>
        {/* Ornate oval frame */}
        <div className="ornate-frame">
          <div className="frame-top-ornament">𝜗ৎ</div>
          
          <div className="invitation-text">
            <p className="invitation-subtitle">Welcome to</p>
            <h1 className="invitation-title-main">The Keepsake</h1>
            <h2 className="invitation-title-coquette">Corner</h2>
            
            <div className="invitation-presenter">
              — <span>a cottagecore affair</span> —
            </div>

            <button 
              className="enter-button"
              onClick={onEnter}
            >
              <span className="button-text">Enter the Garden</span>
              <span className="button-decoration">❀</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
