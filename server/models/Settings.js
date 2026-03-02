import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  facebookPixelId: { type: String, default: '' },
  facebookPixelEnabled: { type: Boolean, default: false },
  tiktokPixelId: { type: String, default: '' },
  tiktokPixelEnabled: { type: Boolean, default: false },
  snapchatPixelId: { type: String, default: '' },
  snapchatPixelEnabled: { type: Boolean, default: false },
  googleTagManagerId: { type: String, default: '' },
  googleTagManagerEnabled: { type: Boolean, default: false },
}, {
  timestamps: true,
});

export default mongoose.model('Settings', settingsSchema);
