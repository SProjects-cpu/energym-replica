/* ============================================
   STRIVER FITNESS QUIZ — Logic & Engine
   Ported from AIAnalyticalReportController (Flutter)
   ============================================ */

(function () {
  'use strict';

  // ─── STATE ──────────────────────────────────
  const TOTAL_STEPS = 10;
  const TIMELINE_WEEKS = 12;

  const state = {
    currentStep: 1,
    goal: null,
    gender: null,
    age: 25,
    height: 170,
    weight: 70,
    targetWeight: 65,
    experience: null,
    trainingDays: null,
    sessionDuration: null,
    diet: [],
  };

  // ─── DOM REFS ─────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const stepLabel = $('#stepLabel');
  const stepCount = $('#stepCount');
  const progressFill = $('#progressFill');
  const btnBack = $('#btnBack');
  const btnNext = $('#btnNext');
  const btnSubmit = $('#btnSubmit');
  const quizNav = $('#quizNav');
  const quizProgress = $('#quizProgress');
  const generatingOverlay = $('#generatingOverlay');
  const resultsContainer = $('#resultsContainer');

  // ─── INIT ─────────────────────────────────────
  function init() {
    bindChipSelectors();
    bindNumberInputs();
    bindSliders();
    bindNavigation();
    updateUI();
  }

  // ─── CHIP SELECTORS ──────────────────────────
  function bindChipSelectors() {
    $$('.chips-group').forEach((group) => {
      const isMulti = group.dataset.multi === 'true';
      const field = group.dataset.field;

      group.querySelectorAll('.chip').forEach((chip) => {
        chip.addEventListener('click', () => {
          const value = chip.dataset.value;

          if (isMulti) {
            // Multi-select: toggle
            if (value === 'none') {
              // "No Restrictions" clears others
              state[field] = ['none'];
              group.querySelectorAll('.chip').forEach((c) => c.classList.remove('selected'));
              chip.classList.add('selected');
            } else {
              // Remove "none" if selecting specific restriction
              state[field] = state[field].filter((v) => v !== 'none');
              group.querySelector('[data-value="none"]')?.classList.remove('selected');

              if (chip.classList.contains('selected')) {
                chip.classList.remove('selected');
                state[field] = state[field].filter((v) => v !== value);
              } else {
                chip.classList.add('selected');
                state[field].push(value);
              }
            }

            if (state[field].length === 0) {
              state[field] = ['none'];
              group.querySelector('[data-value="none"]')?.classList.add('selected');
            }
          } else {
            // Single-select
            group.querySelectorAll('.chip').forEach((c) => c.classList.remove('selected'));
            chip.classList.add('selected');
            state[field] = value;
          }

          clearValidation(state.currentStep);
        });
      });
    });
  }

  // ─── NUMBER INPUTS ───────────────────────────
  function bindNumberInputs() {
    $$('.number-btn').forEach((btn) => {
      let interval = null;

      const doAction = () => {
        const target = btn.dataset.target;
        const action = btn.dataset.action;
        const limits = { age: { min: 16, max: 80 } };
        const lim = limits[target] || { min: 0, max: 100 };

        if (action === 'increment' && state[target] < lim.max) {
          state[target]++;
        } else if (action === 'decrement' && state[target] > lim.min) {
          state[target]--;
        }

        $(`#${target}Display`).textContent = state[target];
      };

      btn.addEventListener('click', doAction);

      // Hold to rapid increment
      btn.addEventListener('mousedown', () => {
        interval = setInterval(doAction, 120);
      });

      btn.addEventListener('mouseup', () => clearInterval(interval));
      btn.addEventListener('mouseleave', () => clearInterval(interval));
      btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        doAction();
        interval = setInterval(doAction, 120);
      });
      btn.addEventListener('touchend', () => clearInterval(interval));
    });
  }

  // ─── SLIDERS ──────────────────────────────────
  function bindSliders() {
    const sliderMap = {
      heightSlider: { field: 'height', display: 'heightDisplay' },
      weightSlider: { field: 'weight', display: 'weightDisplay' },
      targetWeightSlider: { field: 'targetWeight', display: 'targetWeightDisplay' },
    };

    Object.entries(sliderMap).forEach(([id, config]) => {
      const slider = $(`#${id}`);
      if (!slider) return;

      slider.addEventListener('input', () => {
        const val = parseFloat(slider.value);
        state[config.field] = val;
        $(`#${config.display}`).textContent =
          val % 1 === 0 ? val : val.toFixed(1);
        updateSliderFill(slider);
      });

      // Initial fill
      updateSliderFill(slider);
    });
  }

  function updateSliderFill(slider) {
    const min = parseFloat(slider.min);
    const max = parseFloat(slider.max);
    const val = parseFloat(slider.value);
    const pct = ((val - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, var(--accent) 0%, var(--accent) ${pct}%, var(--border) ${pct}%, var(--border) 100%)`;
  }

  // ─── NAVIGATION ───────────────────────────────
  function bindNavigation() {
    btnBack.addEventListener('click', prevStep);
    btnNext.addEventListener('click', nextStep);
    btnSubmit.addEventListener('click', generateResults);
    $('#retakeBtn')?.addEventListener('click', retakeQuiz);
  }

  function nextStep() {
    if (!validateStep(state.currentStep)) return;
    if (state.currentStep < TOTAL_STEPS) {
      state.currentStep++;
      updateUI();
    }
  }

  function prevStep() {
    if (state.currentStep > 1) {
      state.currentStep--;
      updateUI();
    }
  }

  function updateUI() {
    const step = state.currentStep;

    // Show/hide steps
    $$('.step').forEach((s) => {
      s.classList.remove('active');
      if (parseInt(s.dataset.step) === step) {
        s.classList.add('active');
      }
    });

    // Progress
    stepLabel.textContent = `STEP ${step}`;
    stepCount.textContent = `${step} / ${TOTAL_STEPS}`;
    progressFill.style.width = `${(step / TOTAL_STEPS) * 100}%`;

    // Back button
    btnBack.disabled = step === 1;

    // Show submit on last step
    if (step === TOTAL_STEPS) {
      btnNext.style.display = 'none';
      btnSubmit.style.display = 'inline-flex';
    } else {
      btnNext.style.display = 'inline-flex';
      btnSubmit.style.display = 'none';
    }

    // Auto-set target weight defaults when reaching step 6
    if (step === 6) {
      setTargetWeightDefaults();
    }

    // Update slider fills for active sliders
    $$('.step.active input[type="range"]').forEach(updateSliderFill);
  }

  function setTargetWeightDefaults() {
    const slider = $('#targetWeightSlider');
    if (!slider) return;

    let target = state.weight;
    if (state.goal === 'fat_loss') target = Math.max(40, state.weight - 5);
    else if (state.goal === 'muscle_gain') target = Math.min(200, state.weight + 5);
    else target = state.weight;

    state.targetWeight = target;
    slider.value = target;
    $('#targetWeightDisplay').textContent =
      target % 1 === 0 ? target : target.toFixed(1);
    updateSliderFill(slider);
  }

  // ─── VALIDATION ───────────────────────────────
  function validateStep(step) {
    const fieldMap = {
      1: 'goal',
      2: 'gender',
      7: 'experience',
      8: 'trainingDays',
      9: 'sessionDuration',
    };

    const field = fieldMap[step];
    if (!field) return true; // Steps without chip-based selection always pass

    const val = state[field];
    if (!val || (Array.isArray(val) && val.length === 0)) {
      showValidation(step, 'Please select an option to continue.');
      return false;
    }

    return true;
  }

  function showValidation(step, msg) {
    const valEl = $(`#val-${step}`);
    if (valEl) valEl.textContent = msg;
  }

  function clearValidation(step) {
    const valEl = $(`#val-${step}`);
    if (valEl) valEl.textContent = '';
  }

  // ─── RESULTS GENERATION ──────────────────────
  function generateResults() {
    if (!validateStep(state.currentStep)) return;

    // Show generating overlay
    generatingOverlay.classList.add('active');
    quizNav.style.display = 'none';

    // Simulate computation delay for UX
    setTimeout(() => {
      const results = computeProjection();
      renderResults(results);

      // Hide wizard UI, show results
      $$('.quiz-card-inner .step').forEach((s) => s.classList.remove('active'));
      generatingOverlay.classList.remove('active');
      quizProgress.style.display = 'none';
      resultsContainer.classList.add('active');
    }, 1800);
  }

  // ─── PROJECTION ENGINE ───────────────────────
  // Ported from AIAnalyticalReportController (Striver Flutter app)

  function computeProjection() {
    const { weight, targetWeight, height, gender, age, goal, trainingDays, sessionDuration, experience } = state;

    // Body fat estimation (from AIAnalyticalReportController._estimateBodyFatPercentage)
    const bmi = weight / Math.pow(height / 100, 2);
    let bodyFat;
    if (gender === 'male') {
      bodyFat = 15.0 + (bmi - 22) * 1.5;
    } else {
      bodyFat = 22.0 + (bmi - 22) * 1.5;
    }
    bodyFat = Math.max(5, Math.min(45, bodyFat));

    // Skeletal muscle mass (from AIAnalyticalReportController._estimateSkeletalMuscleMass)
    const musclePercent = gender === 'male' ? 0.42 : 0.36;
    const muscleMass = weight * musclePercent;

    // Target body fat
    let targetBodyFat;
    if (goal === 'fat_loss') targetBodyFat = Math.max(bodyFat - 5, gender === 'male' ? 10 : 17);
    else if (goal === 'muscle_gain') targetBodyFat = bodyFat - 1;
    else targetBodyFat = Math.max(bodyFat - 3, gender === 'male' ? 12 : 19);

    // Weekly progression using sigmoid curve
    const weeklyWeights = [];
    const weeklyBodyFat = [];

    for (let w = 0; w <= TIMELINE_WEEKS; w++) {
      const t = w / TIMELINE_WEEKS; // 0 to 1
      // Sigmoid: slower start, faster mid, plateau at end
      const sigmoid = 1 / (1 + Math.exp(-10 * (t - 0.5)));
      const normalizedSigmoid = (sigmoid - 1 / (1 + Math.exp(5))) / (1 / (1 + Math.exp(-5)) - 1 / (1 + Math.exp(5)));

      weeklyWeights.push(+(weight + (targetWeight - weight) * normalizedSigmoid).toFixed(1));
      weeklyBodyFat.push(+(bodyFat + (targetBodyFat - bodyFat) * normalizedSigmoid).toFixed(1));
    }

    // Daily calories (Mifflin-St Jeor)
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Activity multiplier
    const daysNum = parseInt(trainingDays) || 4;
    let activityMultiplier;
    if (daysNum <= 2) activityMultiplier = 1.375;
    else if (daysNum <= 3) activityMultiplier = 1.465;
    else if (daysNum <= 4) activityMultiplier = 1.55;
    else if (daysNum <= 5) activityMultiplier = 1.65;
    else activityMultiplier = 1.725;

    let tdee = bmr * activityMultiplier;

    // Adjust for goal
    let dailyCals;
    if (goal === 'fat_loss') dailyCals = tdee - 400;
    else if (goal === 'muscle_gain') dailyCals = tdee + 350;
    else if (goal === 'recomposition') dailyCals = tdee - 100;
    else dailyCals = tdee;

    dailyCals = Math.round(dailyCals);

    // Macro split (from AIAnalyticalReportController._generateChartData)
    let macros;
    switch (goal) {
      case 'fat_loss':
        macros = { protein: 35, carbs: 35, fat: 30 };
        break;
      case 'muscle_gain':
        macros = { protein: 30, carbs: 45, fat: 25 };
        break;
      case 'recomposition':
        macros = { protein: 35, carbs: 40, fat: 25 };
        break;
      case 'athletic':
        macros = { protein: 25, carbs: 50, fat: 25 };
        break;
      default:
        macros = { protein: 30, carbs: 40, fat: 30 };
    }

    // Workout split
    let workoutSplit;
    if (daysNum >= 6) {
      workoutSplit = [
        { day: 'Mon', focus: 'Push (Chest/Shoulders/Tri)' },
        { day: 'Tue', focus: 'Pull (Back/Biceps)' },
        { day: 'Wed', focus: 'Legs & Core' },
        { day: 'Thu', focus: 'Push (Variation)' },
        { day: 'Fri', focus: 'Pull (Variation)' },
        { day: 'Sat', focus: 'Legs & Cardio' },
      ];
      if (daysNum === 7) workoutSplit.push({ day: 'Sun', focus: 'Active Recovery / Cardio' });
    } else if (daysNum >= 4) {
      workoutSplit = [
        { day: 'Mon', focus: 'Upper Body' },
        { day: 'Tue', focus: 'Lower Body' },
        { day: 'Thu', focus: 'Push / Pull' },
        { day: 'Fri', focus: 'Full Body + Cardio' },
      ];
      if (daysNum === 5) workoutSplit.push({ day: 'Sat', focus: 'Cardio & Mobility' });
    } else {
      workoutSplit = [
        { day: 'Mon', focus: 'Full Body Strength' },
        { day: 'Wed', focus: 'Cardio + Core' },
      ];
      if (daysNum === 3) workoutSplit.push({ day: 'Fri', focus: 'Full Body + Flexibility' });
    }

    return {
      currentWeight: weight,
      targetWeight,
      bodyFat,
      targetBodyFat,
      muscleMass,
      weeklyWeights,
      weeklyBodyFat,
      dailyCals,
      macros,
      workoutSplit,
    };
  }

  // ─── RENDER RESULTS ──────────────────────────
  function renderResults(r) {
    // Metrics
    $('#resCurrentWeight').textContent = r.currentWeight;
    $('#resTargetWeight').textContent = r.targetWeight;
    $('#resBodyFat').textContent = r.bodyFat.toFixed(1);

    // Milestones
    $('#milestone4').textContent = r.weeklyWeights[4] + ' kg';
    $('#milestone8').textContent = r.weeklyWeights[8] + ' kg';
    $('#milestone12').textContent = r.weeklyWeights[12] + ' kg';

    // Calories
    $('#resDailyCalories').textContent = r.dailyCals.toLocaleString();

    // Macros
    const macroBar = $('#macroBar');
    macroBar.querySelector('.protein').style.width = r.macros.protein + '%';
    macroBar.querySelector('.carbs').style.width = r.macros.carbs + '%';
    macroBar.querySelector('.fat').style.width = r.macros.fat + '%';

    $('#macroProtein').textContent = r.macros.protein + '%';
    $('#macroCarbs').textContent = r.macros.carbs + '%';
    $('#macroFat').textContent = r.macros.fat + '%';

    // Workout list
    const workoutList = $('#workoutList');
    workoutList.innerHTML = r.workoutSplit
      .map((w) => `<li><span class="day-name">${w.day}</span><span>${w.focus}</span></li>`)
      .join('');

    // Render chart
    setTimeout(() => {
      renderChart(r.weeklyWeights, r.weeklyBodyFat);
    }, 200);
  }

  // ─── CHART RENDERING (Canvas) ────────────────
  function renderChart(weights, bodyFats) {
    const canvas = $('#timelineChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    // Set canvas size
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 220 * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = '220px';
    ctx.scale(dpr, dpr);

    const W = rect.width;
    const H = 220;
    const padding = { top: 20, right: 20, bottom: 35, left: 45 };
    const chartW = W - padding.left - padding.right;
    const chartH = H - padding.top - padding.bottom;

    // Clear
    ctx.clearRect(0, 0, W, H);

    // Calculate ranges
    const allVals = [...weights, ...bodyFats];
    const minVal = Math.floor(Math.min(...allVals) - 2);
    const maxVal = Math.ceil(Math.max(...allVals) + 2);

    const xScale = (i) => padding.left + (i / TIMELINE_WEEKS) * chartW;
    const yScale = (v) => padding.top + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;

    // Grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (chartH / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(W - padding.right, y);
      ctx.stroke();

      // Y labels
      const val = maxVal - ((maxVal - minVal) / gridLines) * i;
      ctx.fillStyle = '#9ca3af';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(val.toFixed(0), padding.left - 8, y + 4);
    }

    // X labels (weeks)
    ctx.fillStyle = '#9ca3af';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';
    for (let i = 0; i <= TIMELINE_WEEKS; i += 2) {
      const x = xScale(i);
      ctx.fillText(`W${i}`, x, H - 8);
    }

    // Animated drawing
    let animFrame = 0;
    const totalFrames = 60;

    function drawFrame() {
      animFrame++;
      const progress = Math.min(animFrame / totalFrames, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const drawCount = Math.floor(eased * TIMELINE_WEEKS);

      // Clear chart area only
      ctx.clearRect(padding.left - 1, padding.top - 1, chartW + 2, chartH + 2);

      // Redraw grid
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 0.5;
      for (let i = 0; i <= gridLines; i++) {
        const y = padding.top + (chartH / gridLines) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(W - padding.right, y);
        ctx.stroke();
      }

      // Weight line (green)
      if (drawCount >= 1) {
        // Fill area under weight line
        ctx.beginPath();
        ctx.moveTo(xScale(0), yScale(weights[0]));
        for (let i = 1; i <= drawCount; i++) {
          ctx.lineTo(xScale(i), yScale(weights[i]));
        }
        ctx.lineTo(xScale(drawCount), padding.top + chartH);
        ctx.lineTo(xScale(0), padding.top + chartH);
        ctx.closePath();
        const gradientW = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartH);
        gradientW.addColorStop(0, 'rgba(0, 170, 19, 0.15)');
        gradientW.addColorStop(1, 'rgba(0, 170, 19, 0)');
        ctx.fillStyle = gradientW;
        ctx.fill();

        // Weight line
        ctx.beginPath();
        ctx.moveTo(xScale(0), yScale(weights[0]));
        for (let i = 1; i <= drawCount; i++) {
          // Smooth curve
          if (i < drawCount) {
            const xc = (xScale(i) + xScale(i + 1)) / 2;
            const yc = (yScale(weights[i]) + yScale(weights[i + 1])) / 2;
            ctx.quadraticCurveTo(xScale(i), yScale(weights[i]), xc, yc);
          } else {
            ctx.lineTo(xScale(i), yScale(weights[i]));
          }
        }
        ctx.strokeStyle = '#00AA13';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Body fat line (blue)
        ctx.beginPath();
        ctx.moveTo(xScale(0), yScale(bodyFats[0]));
        for (let i = 1; i <= drawCount; i++) {
          if (i < drawCount) {
            const xc = (xScale(i) + xScale(i + 1)) / 2;
            const yc = (yScale(bodyFats[i]) + yScale(bodyFats[i + 1])) / 2;
            ctx.quadraticCurveTo(xScale(i), yScale(bodyFats[i]), xc, yc);
          } else {
            ctx.lineTo(xScale(i), yScale(bodyFats[i]));
          }
        }
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Milestone markers at weeks 4, 8, 12
        [4, 8, 12].forEach((week) => {
          if (week <= drawCount) {
            ctx.beginPath();
            ctx.arc(xScale(week), yScale(weights[week]), 4, 0, Math.PI * 2);
            ctx.fillStyle = '#00AA13';
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        });

        // Current weight dot
        ctx.beginPath();
        ctx.arc(xScale(0), yScale(weights[0]), 4, 0, Math.PI * 2);
        ctx.fillStyle = '#6b7280';
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      if (animFrame < totalFrames) {
        requestAnimationFrame(drawFrame);
      }
    }

    requestAnimationFrame(drawFrame);
  }

  // ─── RETAKE ─────────────────────────────────
  function retakeQuiz() {
    // Reset state
    state.currentStep = 1;
    state.goal = null;
    state.gender = null;
    state.age = 25;
    state.height = 170;
    state.weight = 70;
    state.targetWeight = 65;
    state.experience = null;
    state.trainingDays = null;
    state.sessionDuration = null;
    state.diet = [];

    // Reset UI
    $$('.chip').forEach((c) => c.classList.remove('selected'));
    $$('.validation-msg').forEach((v) => (v.textContent = ''));

    $('#ageDisplay').textContent = '25';
    $('#heightSlider').value = 170;
    $('#heightDisplay').textContent = '170';
    $('#weightSlider').value = 70;
    $('#weightDisplay').textContent = '70';
    $('#targetWeightSlider').value = 65;
    $('#targetWeightDisplay').textContent = '65';

    // Show quiz, hide results
    resultsContainer.classList.remove('active');
    quizNav.style.display = 'flex';
    quizProgress.style.display = 'block';

    updateUI();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ─── BOOT ───────────────────────────────────
  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", init); } else { setTimeout(init, 50); }
})();
