import express from 'express';
import Hero from '../models/Hero.js';

const router = express.Router();

// GET hero data
router.get('/', async (req, res) => {
  try {
    let hero = await Hero.findOne();

    // If no hero exists, create default
    if (!hero) {
      hero = await Hero.create({
        trustBadge: '4.9/5 من أكثر من 10,000+ عميلة',
        headline: 'جاذبية طبيعية لا تُقاوم',
        subheadline: 'زيوت طبيعية فاخرة مُعززة بالفيرمونات، مصممة لتترك انطباعاً لا يُنسى وإطلالة متألقة',
        ctaText: 'تسوقي الآن',
        backgroundImage: '/crystal images/GODDESS_ROSE_Mockup_Style1 copy 2.png',
      });
    }

    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE hero data
router.put('/', async (req, res) => {
  try {
    const { trustBadge, headline, subheadline, ctaText, backgroundImage } = req.body;

    let hero = await Hero.findOne();

    if (!hero) {
      hero = await Hero.create(req.body);
    } else {
      hero.trustBadge = trustBadge;
      hero.headline = headline;
      hero.subheadline = subheadline;
      hero.ctaText = ctaText;
      hero.backgroundImage = backgroundImage;
      await hero.save();
    }

    res.json(hero);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
