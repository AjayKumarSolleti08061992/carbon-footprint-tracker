import { 
  EMISSION_FACTORS, 
  INITIAL_CATEGORIES, 
  INITIAL_ACTIONS, 
  INSIGHTS, 
  GAS_LABELS, 
  TREND_DATA 
} from './constants.js';

/**
 * State Management Layer
 */
const state = {
  categories: JSON.parse(localStorage.getItem('cf_categories')) || [...INITIAL_CATEGORIES],
  actions: JSON.parse(localStorage.getItem('cf_actions')) || [...INITIAL_ACTIONS],
};

const saveState = () => {
  localStorage.setItem('cf_categories', JSON.stringify(state.categories));
  localStorage.setItem('cf_actions', JSON.stringify(state.actions));
};

/**
 * Pure Mathematical Core (Testing Injection Vector)
 */
export function calculateEmissions(inputs) {
  const { car, fly, transit, elec, gas, meat, shop } = inputs;
  
  const transportBreakdown = car * EMISSION_FACTORS.carWeeklyKmToAnnualCo2 * (1 - transit / 100);
  const flightBreakdown = fly * EMISSION_FACTORS.flightAnnualCo2;
  const homeBreakdown = (elec * EMISSION_FACTORS.electricityMonthlyKwhToAnnualCo2) + (gas * EMISSION_FACTORS.gasUnitToAnnualCo2);
  const dietBreakdown = meat * EMISSION_FACTORS.meatWeeklyMealsToAnnualCo2;
  const shoppingBreakdown = shop * EMISSION_FACTORS.shoppingMonthlySpendToAnnualCo2;
  
  const total = transportBreakdown + flightBreakdown + homeBreakdown + dietBreakdown + shoppingBreakdown;
  
  return {
    total,
    breakdown: {
      transport: transportBreakdown,
      flights: flightBreakdown,
      home: homeBreakdown,
      diet: dietBreakdown,
      shopping: shoppingBreakdown
    }
  };
}

/**
 * High Efficiency UI Helpers
 */
const debounce = (fn, delay = 150) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const safeHTML = (str) => {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
};

/**
 * View Rendering Modules
 */
function renderTabs(targetTabName) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.toggle('active', section.id === `tab-${targetTabName}`);
  });
  
  document.querySelectorAll('.tab').forEach(tab => {
    const isActive = tab.getAttribute('data-tab') === targetTabName;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
}

function renderBreakdownBars() {
  const container = document.getElementById('breakdown-bars');
  if (!container) return;
  
  const total = state.categories.reduce((acc, curr) => acc + curr.base, 0) || 1;
  
  const htmlContent = state.categories.map(c => {
    const percentage = ((c.base / total) * 100).toFixed(1);
    return `
      <div class="bar-row">
        <span class="bar-label">${safeHTML(c.name)}</span>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${percentage}%; background: ${safeHTML(c.color)};"></div>
        </div>
        <span class="bar-num">${c.base.toFixed(1)} t</span>
      </div>`;
  }).join('');
  
  container.innerHTML = htmlContent;
}

function renderActionsList() {
  const container = document.getElementById('action-list');
  if (!container) return;
  
  container.innerHTML = '';
  
  const fragment = document.createDocumentFragment();
  state.actions.forEach(act => {
    const wrapper = document.createElement('div');
    wrapper.className = `action-item ${act.done ? 'done' : ''}`;
    wrapper.id = `ai-${act.id}`;
    wrapper.setAttribute('role', 'button');
    wrapper.setAttribute('tabindex', '0');
    wrapper.setAttribute('aria-pressed', act.done ? 'true' : 'false');
    
    wrapper.innerHTML = `
      <div class="action-check">
        ${act.done ? '<i class="ti ti-check" style="font-size:13px;color:#fff;" aria-hidden="true"></i>' : ''}
      </div>
      <div>
        <div class="action-title">${safeHTML(act.title)}</div>
        <div class="action-desc">${safeHTML(act.desc)}</div>
        <div class="action-save">${safeHTML(act.save)}</div>
      </div>
    `;
    
    // Scoped clean event delegation targeting security metrics
    wrapper.addEventListener('click', () => toggleActionState(act.id));
    wrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleActionState(act.id);
      }
    });
    
    fragment.appendChild(wrapper);
  });
  
  container.appendChild(fragment);
  
  const counter = document.getElementById('actions-done-val');
  if (counter) {
    counter.textContent = state.actions.filter(a => a.done).length.toString();
  }
}

function toggleActionState(actionId) {
  const targetAction = state.actions.find(a => a.id === actionId);
  if (targetAction) {
    targetAction.done = !targetAction.done;
    saveState();
    renderActionsList();
  }
}

function renderInsightsList() {
  const container = document.getElementById('insights-list');
  if (!container) return;
  
  container.innerHTML = INSIGHTS.map(ins => `
    <div class="insight-card ${safeHTML(ins.type)}">
      <div class="insight-title">${safeHTML(ins.title)}</div>
      <div class="insight-body">${safeHTML(ins.body)}</div>
    </div>
  `).join('');
}

function updateCalculationsUi() {
  const inputs = {
    car: +document.getElementById('sl-car').value,
    fly: +document.getElementById('sl-fly').value,
    transit: +document.getElementById('sl-transit').value,
    elec: +document.getElementById('sl-elec').value,
    gas: +document.getElementById('sl-gas').value,
    meat: +document.getElementById('sl-meat').value,
    shop: +document.getElementById('sl-shop').value,
  };

  // Dynamic dynamic labels mapping updates
  document.getElementById('out-car').textContent = `${inputs.car} km`;
  document.getElementById('out-fly').textContent = inputs.fly.toString();
  document.getElementById('out-transit').textContent = `${inputs.transit}%`;
  document.getElementById('out-elec').textContent = inputs.elec.toString();
  document.getElementById('out-gas').textContent = GAS_LABELS[inputs.gas] || 'Medium';
  document.getElementById('out-meat').textContent = inputs.meat.toString();
  document.getElementById('out-shop').textContent = `₹${inputs.shop}`;

  const assessment = calculateEmissions(inputs);
  const optimizedString = assessment.total.toFixed(1);

  // Synchronize computational states across elements safely
  document.getElementById('total-val').textContent = optimizedString;
  document.getElementById('cmp-you').textContent = optimizedString;
  
  const totalDisplay = document.getElementById('calc-total-display');
  if (totalDisplay) {
    totalDisplay.innerHTML = `${optimizedString} <span class="calc-total-unit">t CO₂e / yr</span>`;
  }

  // Remap data matrices cleanly inside memory states
  const indexMap = { transport: 0, flights: 1, home: 2, diet: 3, shopping: 4 };
  Object.keys(assessment.breakdown).forEach(key => {
    const targetIdx = indexMap[key];
    if (state.categories[targetIdx]) {
      state.categories[targetIdx].base = Math.max(0.1, assessment.breakdown[key]);
    }
  });

  saveState();
  renderBreakdownBars();
}

// Optimization via a debounced execution layer 
const debouncedCalculationUi = debounce(updateCalculationsUi, 100);

/**
 * Visualization Infrastructure (Chart.js)
 */
function initTrendChart() {
  const canvas = document.getElementById('trendChart');
  if (!canvas) return;
  
  const context = canvas.getContext('2d');
  new Chart(context, {
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      datasets: