import express from 'express';
import Settings from '../models/Settings.js';

const router = express.Router();

// GET settings
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE settings
router.put('/', async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json(settings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
