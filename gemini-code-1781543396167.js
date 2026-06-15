/**
 * Application Constants and Configs
 */

export const EMISSION_FACTORS = {
  carWeeklyKmToAnnualCo2: 0.00021 * 52,
  flightAnnualCo2: 0.5,
  electricityMonthlyKwhToAnnualCo2: 0.00082 * 12,
  gasUnitToAnnualCo2: 0.3,
  meatWeeklyMealsToAnnualCo2: 0.0025 * 52,
  shoppingMonthlySpendToAnnualCo2: 0.001 * 12
};

export const INITIAL_CATEGORIES = [
  { key: 'transport', name: 'Transport', color: '#5DCAA5', base: 2.8 },
  { key: 'flights',   name: 'Flights',   color: '#D85A30', base: 1.6 },
  { key: 'home',      name: 'Home energy', color: '#EF9F27', base: 1.2 },
  { key: 'diet',      name: 'Diet',      color: '#85B7EB', base: 0.9 },
  { key: 'shopping',  name: 'Shopping',  color: '#AFA9EC', base: 0.7 },
];

export const INITIAL_ACTIONS = [
  { id: 'a1', title: 'Take public transit today',    desc: 'Bus or metro instead of driving',       save: '~0.8 kg CO₂ saved', done: true  },
  { id: 'a2', title: 'Eat a plant-based meal',       desc: 'Skip meat at one meal this week',       save: '~2.5 kg CO₂ saved', done: true  },
  { id: 'a3', title: 'Unplug idle electronics',    desc: 'Standby power is often overlooked',     save: '~0.3 kg CO₂ saved', done: false },
  { id: 'a4', title: 'Wash clothes in cold water',   desc: '90% of washing energy is just heating', save: '~0.6 kg CO₂ saved', done: false },
  { id: 'a5', title: 'Buy local produce this week',  desc: 'Less transport = lower food miles',     save: '~1.0 kg CO₂ saved', done: false },
  { id: 'a6', title: 'Turn off AC 1 hour earlier',   desc: 'Air conditioning is a big home emitter',save: '~0.5 kg CO₂ saved', done: false },
];

export const INSIGHTS = [
  { type: 'warn', title: 'Your biggest lever: flights',     body: 'Your flights account for a massive chunk of your footprint. One fewer long-haul flight saves more than 6 months of driving.' },
  { type: 'tip',  title: 'Switch to an EV or hybrid',       body: 'If you drive heavily, moving to an electric vehicle could cut your transport emissions by up to 70%.' },
  { type: 'neutral', title: 'Diet is easier than you think', body: 'Replacing 3 meat meals/week with plant-based options saves ~0.5 t CO₂e per year.' },
  { type: 'tip',  title: 'Rooftop solar potential',         body: 'With ~300 sunny days/year in Hyderabad, a 3 kW solar system could eliminate your home electricity emissions.' },
  { type: 'warn', title: 'Fast fashion footprint',          body: 'Buying second-hand or choosing longer-lasting items is one of the fastest wins for high consumers.' },
];

export const GAS_LABELS = ['None', 'Low', 'Medium', 'High', 'Very high', 'Max'];

export const TREND_DATA = [8.1, 7.9, 8.3, 7.8, 7.6, 7.4, 7.5, 7.2, 7.0, 6.9, 6.7, 6.4];