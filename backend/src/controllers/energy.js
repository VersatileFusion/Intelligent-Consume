const logger = require('../utils/logger');

// Get all energy consumption data
const getAllEnergyData = (req, res) => {
  console.log('Controller: getAllEnergyData called');
  logger.info('Getting all energy data');
  
  // Mock data for demonstration
  const energyData = [
    { type: 'electricity', value: 245.5, date: '2023-03-15' },
    { type: 'water', value: 8.2, date: '2023-03-15' },
    { type: 'gas', value: 12.4, date: '2023-03-15' }
  ];
  
  console.log(`Returning ${energyData.length} energy records`);
  logger.info(`Returning ${energyData.length} energy records`);
  res.json(energyData);
};

// Add new energy consumption data
const addEnergyData = (req, res) => {
  console.log('Controller: addEnergyData called');
  logger.info('Adding new energy data', { body: req.body });
  
  const { type, value, date } = req.body;
  
  // Validate request
  if (!type || !value || !date) {
    console.error('Validation failed - Missing required fields');
    logger.error('Validation failed - Missing required fields', { body: req.body });
    return res.status(400).json({ error: 'Type, value, and date are required' });
  }
  
  // Mock successful creation
  const newEnergyData = {
    id: Date.now().toString(),
    ...req.body
  };
  
  console.log('Created new energy record:', newEnergyData);
  logger.info('Created new energy record', { data: newEnergyData });
  res.status(201).json(newEnergyData);
};

// Analyze energy consumption data
const analyzeEnergyData = (req, res) => {
  console.log('Controller: analyzeEnergyData called');
  logger.info('Analyzing energy data', { params: req.body });
  
  const { type, startDate, endDate } = req.body;
  
  // Validate request
  if (!type || !startDate || !endDate) {
    console.error('Validation failed - Missing required fields');
    logger.error('Validation failed - Missing required fields for analysis', { body: req.body });
    return res.status(400).json({ error: 'Type, startDate, and endDate are required' });
  }
  
  // Mock analysis results
  const analysis = {
    averageConsumption: 245.5,
    totalConsumption: 7365.0,
    recommendations: [
      'Switch to LED light bulbs to save up to 15% on electricity',
      'Consider adjusting your thermostat by 1-2 degrees to save energy',
      'Check for water leaks that might be increasing your water bill'
    ]
  };
  
  console.log('Returning analysis results:', analysis);
  logger.info('Analysis complete', { type, results: analysis });
  res.json(analysis);
};

// Get optimization suggestions
const getOptimizationSuggestions = (req, res) => {
  console.log('Controller: getOptimizationSuggestions called');
  logger.info('Getting optimization suggestions', { params: req.body });
  
  const { energyType, currentConsumption } = req.body;
  
  // Validate request
  if (!energyType || !currentConsumption) {
    console.error('Validation failed - Missing required fields');
    logger.error('Validation failed - Missing required fields for optimization', { body: req.body });
    return res.status(400).json({ error: 'Energy type and current consumption are required' });
  }
  
  // Mock optimization suggestions
  const suggestions = {
    suggestions: [
      {
        description: 'Install a programmable thermostat',
        savingPotential: '10-15% on heating/cooling costs'
      },
      {
        description: 'Upgrade to energy-efficient appliances',
        savingPotential: '10-50% depending on appliance'
      },
      {
        description: 'Improve home insulation',
        savingPotential: '15-25% on heating/cooling costs'
      }
    ]
  };
  
  console.log('Returning optimization suggestions:', suggestions);
  logger.info('Optimization suggestions generated', { type: energyType, suggestions });
  res.json(suggestions);
};

module.exports = {
  getAllEnergyData,
  addEnergyData,
  analyzeEnergyData,
  getOptimizationSuggestions
}; 