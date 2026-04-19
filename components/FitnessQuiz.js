'use client';

import React, { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';

const Body = dynamic(() => import('react-muscle-highlighter').then(mod => mod.default), { ssr: false });

// ============================================
// QUIZ DATA
// ============================================
const STEPS = [
  {
    id: 'goal',
    question: 'What is your fitness goal?',
    subtitle: 'Select the goal that best describes what you want to achieve.',
    type: 'single',
    options: ['Lose weight', 'Build muscle', 'Get fit', 'Improve health'],
  },
  {
    id: 'experience',
    question: 'What is your experience level?',
    subtitle: 'Be honest — this helps us tailor your program.',
    type: 'single',
    options: ['Beginner', 'Intermediate', 'Advanced'],
  },
  {
    id: 'frequency',
    question: 'How many days per week can you train?',
    subtitle: 'Consistency matters more than intensity.',
    type: 'number',
    min: 1,
    max: 7,
    unit: 'days / week',
    defaultValue: 3,
  },
  {
    id: 'struggles',
    question: 'What are your biggest struggles?',
    subtitle: 'Select all that apply.',
    type: 'multi',
    options: ['Staying consistent', 'Nutrition planning', 'Lack of motivation', 'Time management', 'Not seeing results', 'Injuries'],
  },
  {
    id: 'height',
    question: 'What is your height?',
    subtitle: 'Used to calculate your body metrics.',
    type: 'slider',
    min: 140,
    max: 220,
    unit: 'cm',
    defaultValue: 170,
  },
  {
    id: 'weight',
    question: 'What is your current weight?',
    subtitle: 'This helps us project your transformation.',
    type: 'slider',
    min: 40,
    max: 200,
    unit: 'kg',
    step: 0.5,
    defaultValue: 70,
  },
  {
    id: 'targetWeight',
    question: 'What is your target weight?',
    subtitle: 'Set a realistic goal for the next 3 months.',
    type: 'slider',
    min: 40,
    max: 200,
    unit: 'kg',
    step: 0.5,
    defaultValue: 65,
  },
  {
    id: 'age',
    question: 'How old are you?',
    subtitle: 'Age affects metabolism and recovery.',
    type: 'number',
    min: 14,
    max: 80,
    unit: 'years',
    defaultValue: 25,
  },
  {
    id: 'gender',
    question: 'What is your gender?',
    subtitle: 'Used for accurate calorie and macro calculations.',
    type: 'single',
    options: ['Male', 'Female'],
  },
  {
    id: 'targetMuscles',
    question: 'Which areas do you want to focus on?',
    subtitle: 'Select all the body parts you want to improve.',
    type: 'multi',
    options: ['Chest', 'Arms', 'Shoulders', 'Abs', 'Back', 'Legs', 'Glutes', 'Full Body'],
  },
  {
    id: 'budget',
    question: 'What is your monthly budget?',
    subtitle: 'We will recommend options that fit your budget.',
    type: 'single',
    options: ['Under \u20B92,000', '\u20B92,000 - \u20B95,000', '\u20B95,000 - \u20B910,000', '\u20B910,000+'],
  },
];

// ============================================
// MUSCLE MAPPING
// ============================================
const MUSCLE_MAP = {
  'Chest': [{ slug: 'chest', intensity: 1 }],
  'Arms': [{ slug: 'biceps', intensity: 1 }, { slug: 'triceps', intensity: 1 }, { slug: 'forearm', intensity: 1 }],
  'Shoulders': [{ slug: 'deltoids', intensity: 1 }],
  'Abs': [{ slug: 'abs', intensity: 1 }, { slug: 'obliques', intensity: 1 }],
  'Back': [{ slug: 'upper-back', intensity: 1 }, { slug: 'lower-back', intensity: 1 }, { slug: 'trapezius', intensity: 1 }],
  'Legs': [{ slug: 'quadriceps', intensity: 1 }, { slug: 'hamstring', intensity: 1 }, { slug: 'calves', intensity: 1 }],
  'Glutes': [{ slug: 'gluteal', intensity: 1 }],
  'Full Body': [
    { slug: 'chest', intensity: 1 }, { slug: 'biceps', intensity: 1 }, { slug: 'deltoids', intensity: 1 },
    { slug: 'abs', intensity: 1 }, { slug: 'quadriceps', intensity: 1 }, { slug: 'upper-back', intensity: 1 },
    { slug: 'gluteal', intensity: 1 }, { slug: 'hamstring', intensity: 1 }, { slug: 'triceps', intensity: 1 },
    { slug: 'calves', intensity: 1 }, { slug: 'forearm', intensity: 1 }, { slug: 'obliques', intensity: 1 },
    { slug: 'lower-back', intensity: 1 }, { slug: 'trapezius', intensity: 1 },
  ],
};

function getMuscleData(targetMuscles) {
  const map = new Map();
  (targetMuscles || []).forEach(m => {
    (MUSCLE_MAP[m] || []).forEach(p => {
      if (map.has(p.slug)) {
        map.get(p.slug).intensity = Math.min(map.get(p.slug).intensity + 1, 3);
      } else {
        map.set(p.slug, { ...p });
      }
    });
  });
  return Array.from(map.values());
}

// ============================================
// RESULTS CALCULATOR
// ============================================
function calculateResults(answers) {
  const weight = answers.weight || 70;
  const targetWeight = answers.targetWeight || 65;
  const height = answers.height || 170;
  const age = answers.age || 25;
  const gender = answers.gender || 'Male';
  const frequency = answers.frequency || 3;

  const bmr = gender === 'Male'
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;

  const activityMultiplier = 1.2 + (frequency * 0.075);
  const tdee = Math.round(bmr * activityMultiplier);
  const deficit = weight > targetWeight ? 500 : (weight < targetWeight ? -300 : 0);
  const dailyCal = Math.round(tdee - deficit);

  const weightDiff = weight - targetWeight;
  const weeklyChange = weightDiff > 0 ? 0.5 : (weightDiff < 0 ? -0.3 : 0);
  const bfEstimate = gender === 'Male' ? 18 : 25;

  const protein = Math.round(weight * 2.0);
  const fat = Math.round(dailyCal * 0.25 / 9);
  const carbs = Math.round((dailyCal - protein * 4 - fat * 9) / 4);

  const timeline = [
    { label: 'Today', weight: weight },
    { label: 'Week 4', weight: Math.round((weight - weeklyChange * 4) * 10) / 10 },
    { label: 'Week 8', weight: Math.round((weight - weeklyChange * 8) * 10) / 10 },
    { label: 'Week 12', weight: Math.round((weight - weeklyChange * 12) * 10) / 10 },
  ];

  const milestones = [
    { week: 4, label: 'Foundation phase', weight: timeline[1].weight },
    { week: 8, label: 'Progress phase', weight: timeline[2].weight },
    { week: 12, label: 'Goal reached', weight: timeline[3].weight },
  ];

  const muscleData = getMuscleData(answers.targetMuscles);

  return { dailyCal, protein, carbs, fat, bfEstimate, milestones, weight, targetWeight, timeline, muscleData, gender };
}

// ============================================
// SUB-COMPONENTS
// ============================================

function ProgressBar({ current, total }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="sq-progress">
      <div className="sq-progress__track">
        <div className="sq-progress__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="sq-progress__label">
        <span>{String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
      </div>
    </div>
  );
}

function ChipSelector({ options, selected, onSelect, multi }) {
  return (
    <div className="sq-chips">
      {options.map((opt) => {
        const isSelected = multi
          ? (selected || []).includes(opt)
          : selected === opt;
        return (
          <button
            key={opt}
            className={`sq-chip ${isSelected ? 'sq-chip--active' : ''}`}
            onClick={() => onSelect(opt)}
            type="button"
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function NumberInput({ value, onChange, min, max, unit }) {
  return (
    <div className="sq-number">
      <button className="sq-number__btn" onClick={() => onChange(Math.max(min, value - 1))} type="button">-</button>
      <div className="sq-number__display">
        <span className="sq-number__value">{value}</span>
        <span className="sq-number__unit">{unit}</span>
      </div>
      <button className="sq-number__btn" onClick={() => onChange(Math.min(max, value + 1))} type="button">+</button>
    </div>
  );
}

function SliderInput({ value, onChange, min, max, unit, step = 1 }) {
  return (
    <div className="sq-slider">
      <div className="sq-slider__display">
        <span className="sq-slider__value">{value}</span>
        <span className="sq-slider__unit">{unit}</span>
      </div>
      <div className="sq-slider__track-wrap">
        <span className="sq-slider__bound">{min}</span>
        <input type="range" className="sq-slider__input" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
        <span className="sq-slider__bound">{max}</span>
      </div>
    </div>
  );
}

// ============================================
// WEIGHT TIMELINE GRAPH (SVG)
// ============================================
function WeightTimelineGraph({ timeline }) {
  const W = 400, H = 200, PAD = 50, PADT = 30, PADB = 40;
  const weights = timeline.map(p => p.weight);
  const minW = Math.min(...weights) - 2;
  const maxW = Math.max(...weights) + 2;
  const range = maxW - minW || 1;

  const points = timeline.map((p, i) => ({
    x: PAD + (i / (timeline.length - 1)) * (W - PAD * 2),
    y: PADT + ((maxW - p.weight) / range) * (H - PADT - PADB),
    ...p,
  }));

  const pathD = points.map((p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cpx1 = prev.x + (p.x - prev.x) * 0.4;
    const cpx2 = prev.x + (p.x - prev.x) * 0.6;
    return `C ${cpx1} ${prev.y}, ${cpx2} ${p.y}, ${p.x} ${p.y}`;
  }).join(' ');

  return (
    <div className="sq-graph">
      <h3 className="sq-graph__title">Projected Progress</h3>
      <svg viewBox={`0 0 ${W} ${H}`} className="sq-graph__svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00AA13" />
            <stop offset="100%" stopColor="#00dd18" />
          </linearGradient>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,170,19,0.25)" />
            <stop offset="100%" stopColor="rgba(0,170,19,0)" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map(i => {
          const y = PADT + (i / 3) * (H - PADT - PADB);
          const val = Math.round(maxW - (i / 3) * range);
          return (
            <g key={i}>
              <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <text x={PAD - 8} y={y + 4} textAnchor="end" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="Inter">{val}</text>
            </g>
          );
        })}
        <path d={`${pathD} L ${points[points.length - 1].x} ${H - PADB} L ${points[0].x} ${H - PADB} Z`} fill="url(#areaGrad)" />
        <path d={pathD} fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="5" fill="#0a0a0a" stroke="#00AA13" strokeWidth="2.5" />
            <text x={p.x} y={p.y - 12} textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700" fontFamily="Inter">{p.weight} kg</text>
            <text x={p.x} y={H - PADB + 18} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="Inter">{p.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ============================================
// MUSCLE HIGHLIGHTER — ALWAYS FRONT + BACK
// ============================================
function MuscleHighlighter({ muscleData, gender }) {
  if (!muscleData || muscleData.length === 0) return null;

  return (
    <div className="sq-muscle">
      <h3 className="sq-muscle__title">Target Muscle Groups</h3>
      <p className="sq-muscle__subtitle">Highlighted areas show your focus zones</p>
      <div className="sq-muscle__body">
        <div className="sq-muscle__view">
          <span className="sq-muscle__label">Front</span>
          {Body && (
            <Body
              data={muscleData}
              side="front"
              gender={gender === 'Female' ? 'female' : 'male'}
              scale={1}
              border="none"
              colors={['#00AA13', '#00cc16', '#00ff1a']}
              defaultFill="rgba(255,255,255,0.08)"
              defaultStroke="rgba(255,255,255,0.04)"
              defaultStrokeWidth={0.5}
            />
          )}
        </div>
        <div className="sq-muscle__view">
          <span className="sq-muscle__label">Back</span>
          {Body && (
            <Body
              data={muscleData}
              side="back"
              gender={gender === 'Female' ? 'female' : 'male'}
              scale={1}
              border="none"
              colors={['#00AA13', '#00cc16', '#00ff1a']}
              defaultFill="rgba(255,255,255,0.08)"
              defaultStroke="rgba(255,255,255,0.04)"
              defaultStrokeWidth={0.5}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// RESULTS
// ============================================
function Results({ data, onRestart }) {
  return (
    <div className="sq-results">
      <h2 className="sq-results__title">Your 3-Month Fitness Timeline</h2>
      <p className="sq-results__subtitle">Here is your personalized projection based on your answers.</p>

      <div className="sq-metrics">
        <div className="sq-metric">
          <span className="sq-metric__label">Current</span>
          <span className="sq-metric__value">{data.weight}</span>
          <span className="sq-metric__unit">kg</span>
        </div>
        <div className="sq-metric sq-metric--accent">
          <span className="sq-metric__label">Target</span>
          <span className="sq-metric__value">{data.targetWeight}</span>
          <span className="sq-metric__unit">kg</span>
        </div>
        <div className="sq-metric">
          <span className="sq-metric__label">Body Fat Est.</span>
          <span className="sq-metric__value">{data.bfEstimate}</span>
          <span className="sq-metric__unit">%</span>
        </div>
      </div>

      <WeightTimelineGraph timeline={data.timeline} />
      <MuscleHighlighter muscleData={data.muscleData} gender={data.gender} />

      <div className="sq-milestones">
        {data.milestones.map((m) => (
          <div key={m.week} className="sq-milestone">
            <span className="sq-milestone__week">Week {m.week}</span>
            <span className="sq-milestone__label">{m.label}</span>
          </div>
        ))}
      </div>

      <div className="sq-macros">
        <h3 className="sq-macros__title">Daily Nutrition Target</h3>
        <div className="sq-macros__bar">
          <div className="sq-macros__segment sq-macros__segment--protein" style={{ width: `${Math.round(data.protein * 4 / data.dailyCal * 100)}%` }} />
          <div className="sq-macros__segment sq-macros__segment--carbs" style={{ width: `${Math.round(data.carbs * 4 / data.dailyCal * 100)}%` }} />
          <div className="sq-macros__segment sq-macros__segment--fat" style={{ width: `${Math.round(data.fat * 9 / data.dailyCal * 100)}%` }} />
        </div>
        <div className="sq-macros__legend">
          <div className="sq-macros__item"><span className="sq-dot sq-dot--protein" /> Protein {data.protein}g</div>
          <div className="sq-macros__item"><span className="sq-dot sq-dot--carbs" /> Carbs {data.carbs}g</div>
          <div className="sq-macros__item"><span className="sq-dot sq-dot--fat" /> Fat {data.fat}g</div>
        </div>
      </div>

      <div className="sq-calorie">
        <div className="sq-calorie__inner">
          <div>
            <span className="sq-calorie__label">Recommended Daily Intake</span>
            <span className="sq-calorie__value">{data.dailyCal} kcal</span>
          </div>
        </div>
      </div>

      <button className="sq-btn sq-btn--restart" onClick={onRestart} type="button">
        Retake Quiz
      </button>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// Step 0 = hero overlay (compact card)
// Step 1+ = full-screen wizard overlay
// ============================================
export default function FitnessQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    frequency: 3,
    height: 170,
    weight: 70,
    targetWeight: 65,
    age: 25,
    struggles: [],
    targetMuscles: [],
  });
  const [showResults, setShowResults] = useState(false);

  const step = STEPS[currentStep];
  const totalSteps = STEPS.length;
  const isHeroMode = currentStep === 0 && !showResults;
  const isWizardMode = currentStep > 0 || showResults;

  const updateAnswer = useCallback((key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleChipSelect = useCallback((option) => {
    if (step.type === 'multi') {
      setAnswers((prev) => {
        const arr = prev[step.id] || [];
        return {
          ...prev,
          [step.id]: arr.includes(option)
            ? arr.filter((x) => x !== option)
            : [...arr, option],
        };
      });
    } else {
      updateAnswer(step.id, option);
    }
  }, [step, updateAnswer]);

  const canProceed = useMemo(() => {
    const val = answers[step.id];
    if (step.type === 'single') return !!val;
    if (step.type === 'multi') return (val || []).length > 0;
    return true;
  }, [answers, step]);

  const goNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setShowResults(true);
    }
  }, [currentStep, totalSteps]);

  const goBack = useCallback(() => {
    if (showResults) {
      setShowResults(false);
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep, showResults]);

  const restart = useCallback(() => {
    setCurrentStep(0);
    setShowResults(false);
    setAnswers({
      frequency: 3, height: 170, weight: 70, targetWeight: 65, age: 25,
      struggles: [], targetMuscles: [],
    });
  }, []);

  const results = useMemo(() => calculateResults(answers), [answers]);

  // Step content renderer
  const renderStepContent = () => (
    <>
      {(step.type === 'single' || step.type === 'multi') && (
        <ChipSelector options={step.options} selected={answers[step.id]} onSelect={handleChipSelect} multi={step.type === 'multi'} />
      )}
      {step.type === 'number' && (
        <NumberInput value={answers[step.id] ?? step.defaultValue} onChange={(v) => updateAnswer(step.id, v)} min={step.min} max={step.max} unit={step.unit} />
      )}
      {step.type === 'slider' && (
        <SliderInput value={answers[step.id] ?? step.defaultValue} onChange={(v) => updateAnswer(step.id, v)} min={step.min} max={step.max} unit={step.unit} step={step.step} />
      )}
    </>
  );

  // ==============================
  // HERO MODE — Step 1 only
  // ==============================
  if (isHeroMode) {
    return (
      <div className="sq-hero-wrapper">
        <div className="sq-hero-card">
          <h2 className="sq-hero-question">{step.question}</h2>
          <p className="sq-hero-subtitle">{step.subtitle}</p>
          <div className="sq-hero-chips">
            {step.options.map((opt) => (
              <button
                key={opt}
                className={`sq-hero-chip ${answers[step.id] === opt ? 'sq-hero-chip--active' : ''}`}
                onClick={() => updateAnswer(step.id, opt)}
                type="button"
              >
                {opt}
              </button>
            ))}
          </div>
          <button
            className="sq-hero-next"
            onClick={goNext}
            disabled={!canProceed}
            type="button"
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  // ==============================
  // WIZARD MODE — Steps 2+ and Results
  // ==============================
  return (
    <div className="sq-wizard-overlay">
      <div className="sq-wizard">
        <div className="sq-wizard__inner">
          {showResults ? (
            <Results data={results} onRestart={restart} />
          ) : (
            <>
              <ProgressBar current={currentStep} total={totalSteps} />
              <div className="sq-body" key={currentStep}>
                <h2 className="sq-question">{step.question}</h2>
                {step.subtitle && <p className="sq-subtitle">{step.subtitle}</p>}
                <div className="sq-content">{renderStepContent()}</div>
              </div>
              <div className="sq-nav">
                <button className="sq-btn sq-btn--back" onClick={goBack} type="button">Back</button>
                <button className="sq-btn sq-btn--next" onClick={goNext} disabled={!canProceed} type="button">
                  {currentStep === totalSteps - 1 ? 'See Results' : 'Next'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
