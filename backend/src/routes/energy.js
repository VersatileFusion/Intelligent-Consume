const express = require('express');
const router = express.Router();
const energyController = require('../controllers/energy');

console.log('Energy router module loaded');

/**
 * @swagger
 * tags:
 *   name: Energy
 *   description: API endpoints for energy consumption analysis
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     EnergyData:
 *       type: object
 *       required:
 *         - type
 *         - value
 *         - date
 *       properties:
 *         type:
 *           type: string
 *           description: Type of energy (electricity, water, gas)
 *           enum: [electricity, water, gas]
 *         value:
 *           type: number
 *           description: Consumption value
 *         date:
 *           type: string
 *           format: date
 *           description: Date of consumption
 *         time:
 *           type: string
 *           description: Time of consumption (if available)
 *       example:
 *         type: electricity
 *         value: 245.5
 *         date: 2023-03-15
 */

/**
 * @swagger
 * /api/energy:
 *   get:
 *     summary: Get all energy consumption data
 *     tags: [Energy]
 *     responses:
 *       200:
 *         description: List of energy consumption records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EnergyData'
 */
router.get('/', energyController.getAllEnergyData);

/**
 * @swagger
 * /api/energy:
 *   post:
 *     summary: Add new energy consumption data
 *     tags: [Energy]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnergyData'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EnergyData'
 *       400:
 *         description: Bad request
 */
router.post('/', energyController.addEnergyData);

/**
 * @swagger
 * /api/energy/analyze:
 *   post:
 *     summary: Analyze energy consumption data
 *     tags: [Energy]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Analysis results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 averageConsumption:
 *                   type: number
 *                 totalConsumption:
 *                   type: number
 *                 recommendations:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.post('/analyze', energyController.analyzeEnergyData);

/**
 * @swagger
 * /api/energy/optimize:
 *   post:
 *     summary: Get optimization suggestions
 *     tags: [Energy]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               energyType:
 *                 type: string
 *               currentConsumption:
 *                 type: number
 *     responses:
 *       200:
 *         description: Optimization suggestions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 suggestions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       description:
 *                         type: string
 *                       savingPotential:
 *                         type: string
 */
router.post('/optimize', energyController.getOptimizationSuggestions);

module.exports = router; 