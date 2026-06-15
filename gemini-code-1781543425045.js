import { calculateEmissions } from './app.js';

describe('Carbon Footprint Logic Verification Suite', () => {
  
  test('should handle baseline zero parameters gracefully without throwing error exceptions', () => {
    const zeroStateInputs = { car: 0, fly: 0, transit: 0, elec: 0, gas: 0, meat: 0, shop: 0 };
    const outputs = calculateEmissions(zeroStateInputs);
    
    expect(outputs.total).toBeCloseTo(0, 4);
    expect(outputs.breakdown.transport).toBe(0);
  });

  test('should apply the correct mathematical deductions when public transit usage goes to 100%', () => {
    const fullTransitInputs = { car: 200, fly: 0, transit: 100, elec: 0, gas: 0, meat: 0, shop: 0 };
    const outputs = calculateEmissions(fullTransitInputs);
    
    // With transit handling at 100%, direct car emissions must zero out cleanly
    expect(outputs.breakdown.transport).toBe(0);
  });
  
  test('should verify calculations with standard default entry metrics matching expected ranges', () => {
    const normalInputs = { car: 200, fly: 3, transit: 30, elec: 300, gas: 2, meat: 7, shop: 150 };
    const outputs = calculateEmissions(normalInputs);
    
    expect(outputs.total).toBeGreaterThan(0);
    expect(outputs.breakdown.flights).toEqual(1.5);
  });
});