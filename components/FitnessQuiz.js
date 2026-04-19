'use client';

import React, { useState, useCallback, useMemo } from 'react';

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
    id: 'budget',
    question: 'What is your monthly budget?',
    subtitle: 'We will recommend options that fit your budget.',
    type: 'single',
    options: ['Under $50', '$50 - $100', '$100 - $200', '$200+'],
  },
];

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

  const milestones = [
    { week: 4, label: 'Foundation phase', weight: Math.round((weight - weeklyChange * 4) * 10) / 10 },
    { week: 8, label: 'Progress phase', weight: Math.round((weight - weeklyChange * 8) * 10) / 10 },
    { week: 12, label: 'Goal reached', weight: Math.round((weight - weeklyChange * 12) * 10) / 10 },
  ];

  return { dailyCal, protein, carbs, fat, bfEstimate, milestones, weight, targetWeight };
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
      <button
        className="sq-number__btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        type="button"
      >
        −
      </button>
      <div className="sq-number__display">
        <span className="sq-number__value">{value}</span>
        <span className="sq-number__unit">{unit}</span>
      </div>
      <button
        className="sq-number__btn"
        onClick={() => onChange(Math.min(max, value + 1))}
        type="button"
      >
        +
      </button>
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
        <input
          type="range"
          className="sq-slider__input"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <span className="sq-slider__bound">{max}</span>
      </div>
    </div>
  );
}

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
  });
  const [showResults, setShowResults] = useState(false);

  const step = STEPS[currentStep];
  const totalSteps = STEPS.length;

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
    return true; // number & slider always have defaults
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
      frequency: 3,
      height: 170,
      weight: 70,
      targetWeight: 65,
      age: 25,
      struggles: [],
    });
  }, []);

  const results = useMemo(() => calculateResults(answers), [answers]);

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="sq-wrapper">
      <div className="sq-card">
        {showResults ? (
          <Results data={results} onRestart={restart} />
        ) : (
          <>
            <ProgressBar current={currentStep} total={totalSteps} />

            <div className="sq-body" key={currentStep}>
              <h2 className="sq-question">{step.question}</h2>
              {step.subtitle && <p className="sq-subtitle">{step.subtitle}</p>}

              <div className="sq-content">
                {(step.type === 'single' || step.type === 'multi') && (
                  <ChipSelector
                    options={step.options}
                    selected={answers[step.id]}
                    onSelect={handleChipSelect}
                    multi={step.type === 'multi'}
                  />
                )}
                {step.type === 'number' && (
                  <NumberInput
                    value={answers[step.id] ?? step.defaultValue}
                    onChange={(v) => updateAnswer(step.id, v)}
                    min={step.min}
                    max={step.max}
                    unit={step.unit}
                  />
                )}
                {step.type === 'slider' && (
                  <SliderInput
                    value={answers[step.id] ?? step.defaultValue}
                    onChange={(v) => updateAnswer(step.id, v)}
                    min={step.min}
                    max={step.max}
                    unit={step.unit}
                    step={step.step}
                  />
                )}
              </div>
            </div>

            <div className="sq-nav">
              <button
                className="sq-btn sq-btn--back"
                onClick={goBack}
                disabled={currentStep === 0}
                type="button"
              >
                Back
              </button>
              <button
                className="sq-btn sq-btn--next"
                onClick={goNext}
                disabled={!canProceed}
                type="button"
              >
                {currentStep === totalSteps - 1 ? 'See Results' : 'Next'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
