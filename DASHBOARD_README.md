# Dashboard Guide

## Accessing the Dashboard

1. **URL**: Navigate to `http://localhost:8081/dashboard`
2. **Default Passcode**: `123456` (set in `.env` file)

## Changing the Passcode

Edit the `.env` file and change:
```
VITE_DASHBOARD_PASSCODE=123456
```

To your preferred 6-digit code (e.g., `789012`)

**Important**: Restart the dev server after changing the passcode!

## Features

### Hero Section Management
You can edit:
- **Trust Badge**: The rating text (e.g., "4.9/5 من أكثر من 10,000+ عميلة")
- **Main Headline**: Large headline text
- **Subheadline**: Description text below headline
- **CTA Button Text**: Text on the call-to-action button
- **Background Image**: Path to the product image

### Available Images
All images are in `/public/crystal images/`:
- `GODDESS_ROSE_Mockup_Style1 copy 2.png` (currently in use)
- `PHEROMONE_Mockup_Style1 copy.png`
- `DRAGONS_BLOOD_Mockup_Style1.png`
- `CRYSTAL_OIL_Mockup_Style1.png`

To change the image, use the full path:
```
/crystal images/PHEROMONE_Mockup_Style1 copy.png
```

## How It Works

- **Data Storage**: All changes are saved in the browser's localStorage
- **Live Updates**: Changes appear immediately on the homepage after saving
- **Session**: You stay logged in until you close the browser tab (uses sessionStorage)
- **Security**: Simple passcode protection (good for basic content management)

## Tips

1. **Preview before saving**: Check the preview section at the bottom of the form
2. **Test changes**: Save and refresh the homepage to see your changes
3. **Logout**: Click "تسجيل الخروج" (Logout) when done
4. **Reset to defaults**: Clear localStorage in browser DevTools to reset to default content

## Security Note

This is a simple dashboard for content management. For production use with sensitive data, consider implementing proper authentication (JWT, OAuth, etc.).
