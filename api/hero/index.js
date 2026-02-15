import { connectToDatabase } from '../_lib/mongodb.js';
import { Hero } from '../_lib/models.js';

export default async function handler(req, res) {
  // Enable CORS
  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:8080',
    'http://localhost:5001',
    process.env.FRONTEND_URL,
  ].filter(Boolean);

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectToDatabase();

    // GET hero data
    if (req.method === 'GET') {
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

      return res.status(200).json(hero);
    }

    // UPDATE hero data
    if (req.method === 'PUT') {
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

      return res.status(200).json(hero);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
