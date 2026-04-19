'use client';

import React from 'react';
import Script from 'next/script';

export default function FitnessQuiz() {
  return (
    <>
      <link rel="stylesheet" href="/quiz.css" />
      
      <div className="quiz-hero-wrapper">
        {/* Ghost Background Typography */}
        <div className="ghost-text">STRIVER</div>
        
<div className="ghost-text">STRIVER</div>

  <div className="quiz-container">

    <!-- Header -->
    <div className="quiz-header">
      <div className="quiz-logo">
        <span className="logo-accent">STRIVER</span> FITNESS QUIZ
      </div>
      <a href="energym_home.html" className="quiz-back-home">← Back to Home</a>
    </div>

    <!-- Progress Bar -->
    <div className="quiz-progress" id="quizProgress">
      <div className="progress-info">
        <span className="step-label" id="stepLabel">STEP 1</span>
        <span className="step-count" id="stepCount">1 / 10</span>
      </div>
      <div className="progress-bar-track">
        <div className="progress-bar-fill" id="progressFill"></div>
      </div>
    </div>

    <!-- Quiz Card -->
    <div className="quiz-card" id="quizCard">

      <!-- Generating Overlay -->
      <div className="generating-overlay" id="generatingOverlay">
        <div className="spinner"></div>
        <div className="generating-text">Generating Your Timeline</div>
        <div className="generating-sub">Analyzing your data...</div>
      </div>

      <!-- STEP 1: Fitness Goal -->
      <div className="quiz-card-inner">
        <div className="step active" id="step-1" data-step="1">
          <h2 className="step-question">What's your fitness goal?</h2>
          <p className="step-subtitle">Choose the goal that best matches what you want to achieve.</p>
          <div className="chips-group" data-field="goal">
            <button className="chip" data-value="fat_loss"><span className="chip-icon">🔥</span> Fat Loss</button>
            <button className="chip" data-value="muscle_gain"><span className="chip-icon">💪</span> Muscle Gain</button>
            <button className="chip" data-value="recomposition"><span className="chip-icon">⚡</span> Body Recomp</button>
            <button className="chip" data-value="athletic"><span className="chip-icon">🏃</span> Athletic Performance</button>
            <button className="chip" data-value="general"><span className="chip-icon">❤️</span> General Fitness</button>
          </div>
          <div className="validation-msg" id="val-1"></div>
        </div>

        <!-- STEP 2: Gender -->
        <div className="step" id="step-2" data-step="2">
          <h2 className="step-question">What's your gender?</h2>
          <p className="step-subtitle">This helps us calculate accurate projections.</p>
          <div className="chips-group" data-field="gender">
            <button className="chip" data-value="male"><span className="chip-icon">♂️</span> Male</button>
            <button className="chip" data-value="female"><span className="chip-icon">♀️</span> Female</button>
            <button className="chip" data-value="other"><span className="chip-icon">⚧</span> Other</button>
          </div>
          <div className="validation-msg" id="val-2"></div>
        </div>

        <!-- STEP 3: Age -->
        <div className="step" id="step-3" data-step="3">
          <h2 className="step-question">How old are you?</h2>
          <p className="step-subtitle">Age affects metabolism and training capacity.</p>
          <div className="number-input-group">
            <button className="number-btn" data-action="decrement" data-target="age">−</button>
            <div>
              <span className="number-display" id="ageDisplay">25</span>
              <span className="number-unit">years</span>
            </div>
            <button className="number-btn" data-action="increment" data-target="age">+</button>
          </div>
          <div className="validation-msg" id="val-3"></div>
        </div>

        <!-- STEP 4: Height -->
        <div className="step" id="step-4" data-step="4">
          <h2 className="step-question">What's your height?</h2>
          <div className="slider-group">
            <div className="slider-value-display">
              <span className="slider-value" id="heightDisplay">170</span>
              <span className="slider-unit">cm</span>
            </div>
            <div className="slider-range">
              <span className="slider-min">140 cm</span>
              <input type="range" id="heightSlider" min="140" max="220" defaultValue="170" step="1" />
              <span className="slider-max">220 cm</span>
            </div>
          </div>
        </div>

        <!-- STEP 5: Current Weight -->
        <div className="step" id="step-5" data-step="5">
          <h2 className="step-question">What's your current weight?</h2>
          <div className="slider-group">
            <div className="slider-value-display">
              <span className="slider-value" id="weightDisplay">70</span>
              <span className="slider-unit">kg</span>
            </div>
            <div className="slider-range">
              <span className="slider-min">40 kg</span>
              <input type="range" id="weightSlider" min="40" max="200" defaultValue="70" step="0.5" />
              <span className="slider-max">200 kg</span>
            </div>
          </div>
        </div>

        <!-- STEP 6: Target Weight -->
        <div className="step" id="step-6" data-step="6">
          <h2 className="step-question">What's your target weight?</h2>
          <p className="step-subtitle">Where do you want to be in 3 months?</p>
          <div className="slider-group">
            <div className="slider-value-display">
              <span className="slider-value" id="targetWeightDisplay">65</span>
              <span className="slider-unit">kg</span>
            </div>
            <div className="slider-range">
              <span className="slider-min">40 kg</span>
              <input type="range" id="targetWeightSlider" min="40" max="200" defaultValue="65" step="0.5" />
              <span className="slider-max">200 kg</span>
            </div>
          </div>
        </div>

        <!-- STEP 7: Experience Level -->
        <div className="step" id="step-7" data-step="7">
          <h2 className="step-question">What's your experience level?</h2>
          <p className="step-subtitle">Be honest — it helps us set realistic targets.</p>
          <div className="chips-group" data-field="experience">
            <button className="chip" data-value="beginner"><span className="chip-icon">🌱</span> Beginner<br><small style={{ color: "#9ca3af", fontWeight: "400" }}>Less than 1 year</small></button>
            <button className="chip" data-value="intermediate"><span className="chip-icon">🏋️</span> Intermediate<br><small style={{ color: "#9ca3af", fontWeight: "400" }}>1–3 years</small></button>
            <button className="chip" data-value="advanced"><span className="chip-icon">🏆</span> Advanced<br><small style={{ color: "#9ca3af", fontWeight: "400" }}>3+ years</small></button>
          </div>
          <div className="validation-msg" id="val-7"></div>
        </div>

        <!-- STEP 8: Training Days -->
        <div className="step" id="step-8" data-step="8">
          <h2 className="step-question">How many days per week can you train?</h2>
          <div className="chips-group" data-field="trainingDays">
            <button className="chip" data-value="2">2 days</button>
            <button className="chip" data-value="3">3 days</button>
            <button className="chip" data-value="4">4 days</button>
            <button className="chip" data-value="5">5 days</button>
            <button className="chip" data-value="6">6 days</button>
            <button className="chip" data-value="7">7 days</button>
          </div>
          <div className="validation-msg" id="val-8"></div>
        </div>

        <!-- STEP 9: Session Duration -->
        <div className="step" id="step-9" data-step="9">
          <h2 className="step-question">How long per workout session?</h2>
          <div className="chips-group" data-field="sessionDuration">
            <button className="chip" data-value="30">30 min</button>
            <button className="chip" data-value="45">45 min</button>
            <button className="chip" data-value="60">60 min</button>
            <button className="chip" data-value="75">75 min</button>
            <button className="chip" data-value="90">90 min</button>
          </div>
          <div className="validation-msg" id="val-9"></div>
        </div>

        <!-- STEP 10: Dietary Preferences -->
        <div className="step" id="step-10" data-step="10">
          <h2 className="step-question">Any dietary preferences?</h2>
          <p className="step-subtitle">Select all that apply.</p>
          <div className="chips-group" data-field="diet" data-multi="true">
            <button className="chip multi" data-value="none">🍽️ No Restrictions</button>
            <button className="chip multi" data-value="vegetarian">🥬 Vegetarian</button>
            <button className="chip multi" data-value="vegan">🌿 Vegan</button>
            <button className="chip multi" data-value="keto">🥩 Keto</button>
            <button className="chip multi" data-value="halal">☪️ Halal</button>
            <button className="chip multi" data-value="gluten_free">🌾 Gluten-Free</button>
            <button className="chip multi" data-value="dairy_free">🥛 Dairy-Free</button>
          </div>
          <div className="validation-msg" id="val-10"></div>
        </div>
      </div>

      <!-- Navigation -->
      <div className="quiz-nav" id="quizNav">
        <button className="btn-back" id="btnBack" disabled>
          ← Back
        </button>
        <button className="btn-next" id="btnNext">
          Next <span className="arrow">→</span>
        </button>
        <button className="btn-submit" id="btnSubmit" style={{ display: "none" }}>
          Generate My Timeline 🚀
        </button>
      </div>

      <!-- RESULTS -->
      <div className="results-container" id="resultsContainer">

        <div className="results-header">
          <h2>Your 3-Month Fitness Timeline</h2>
          <p>Here's your personalized projection based on your answers.</p>
        </div>

        <!-- Summary Metrics -->
        <div className="metrics-row">
          <div className="metric-card">
            <div className="metric-label">Current</div>
            <div className="metric-value" id="resCurrentWeight">70</div>
            <div className="metric-unit">kg</div>
          </div>
          <div className="metric-card highlight">
            <div className="metric-label">Target</div>
            <div className="metric-value green" id="resTargetWeight">65</div>
            <div className="metric-unit">kg</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Body Fat Est.</div>
            <div className="metric-value" id="resBodyFat">18.5</div>
            <div className="metric-unit">%</div>
          </div>
        </div>

        <!-- Milestones -->
        <div className="milestones-row">
          <div className="milestone">
            <div className="milestone-week">Week 4</div>
            <div className="milestone-value" id="milestone4">68.2 kg</div>
            <div className="milestone-desc">Foundation phase</div>
          </div>
          <div className="milestone">
            <div className="milestone-week">Week 8</div>
            <div className="milestone-value" id="milestone8">66.5 kg</div>
            <div className="milestone-desc">Progress phase</div>
          </div>
          <div className="milestone">
            <div className="milestone-week">Week 12</div>
            <div className="milestone-value" id="milestone12">65.0 kg</div>
            <div className="milestone-desc">Goal reached</div>
          </div>
        </div>

        <!-- Chart -->
        <div className="chart-section">
          <h3 className="chart-title">Projected Progress</h3>
          <div className="chart-wrapper">
            <canvas className="chart-canvas" id="timelineChart" />
          </div>
          <div className="chart-legend">
            <span className="legend-item"><span className="legend-dot weight"></span> Weight (kg)</span>
            <span className="legend-item"><span className="legend-dot bodyfat"></span> Body Fat (%)</span>
          </div>
        </div>

        <!-- Calorie Estimate -->
        <div className="calorie-box">
          <div className="calorie-card">
            <div className="calorie-info">
              <h4>Daily Calorie Target</h4>
              <div>
                <span className="calorie-number" id="resDailyCalories">2,150</span>
                <span className="calorie-unit">kcal / day</span>
              </div>
            </div>
            <div style={{ "font-size": "2.5rem" }}>🔥</div>
          </div>
        </div>

        <!-- Breakdown -->
        <div className="breakdown-grid">
          <div className="breakdown-panel">
            <h4>Macro Split</h4>
            <div className="macro-bar" id="macroBar">
              <div className="protein" style={{ width: "35%" }}></div>
              <div className="carbs" style={{ width: "35%" }}></div>
              <div className="fat" style={{ width: "30%" }}></div>
            </div>
            <div className="macro-labels" id="macroLabels">
              <div className="macro-label">
                <span className="dot" style={{ background: "var(--accent)" }}></span>
                <span className="name">Protein</span>
                <span className="value" id="macroProtein">35%</span>
              </div>
              <div className="macro-label">
                <span className="dot" style={{ background: "#3b82f6" }}></span>
                <span className="name">Carbs</span>
                <span className="value" id="macroCarbs">35%</span>
              </div>
              <div className="macro-label">
                <span className="dot" style={{ background: "#f59e0b" }}></span>
                <span className="name">Fat</span>
                <span className="value" id="macroFat">30%</span>
              </div>
            </div>
          </div>

          <div className="breakdown-panel">
            <h4>Weekly Schedule</h4>
            <ul className="workout-list" id="workoutList">
              <!-- Filled by JS -->
            </ul>
          </div>
        </div>

        <!-- CTA -->
        <div className="cta-section">
          <a href="#" className="cta-btn" id="ctaDownload">
            🚀 Start Your Journey with Striver
          </a>
          <button className="retake-link" id="retakeBtn">↻ Retake Quiz</button>
        </div>

      </div>
    </div>

  </div>

      </div>
      
      {/* Load external logic script seamlessly */}
      <Script src="/quiz.js" strategy="lazyOnload" />
    </>
  );
}
