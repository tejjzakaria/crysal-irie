import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  footerDescription: { type: String, default: '' },
  primaryColor: { type: String, default: '#28bdbd' },
  contactPhone: { type: String, default: '0632454694' },
  contactEmail: { type: String, default: 'info@crystaloil.ma' },
  whatsappNumber: { type: String, default: '212632454694' },
  whatsappMessage: { type: String, default: 'مرحبًا! أود الاستفسار عن منتجات كريستال أويل.' },
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
