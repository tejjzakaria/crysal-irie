import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  trustBadge: {
    type: String,
    required: true,
    default: '4.9/5 من أكثر من 10,000+ عميلة',
  },
  headline: {
    type: String,
    required: true,
    default: 'جاذبية طبيعية لا تُقاوم',
  },
  subheadline: {
    type: String,
    required: true,
    default: 'زيوت طبيعية فاخرة مُعززة بالفيرمونات، مصممة لتترك انطباعاً لا يُنسى وإطلالة متألقة',
  },
  ctaText: {
    type: String,
    required: true,
    default: 'تسوقي الآن',
  },
  backgroundImage: {
    type: String,
    required: true,
    default: '/crystal images/GODDESS_ROSE_Mockup_Style1 copy 2.png',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Hero', heroSchema);
