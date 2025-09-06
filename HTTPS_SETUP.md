# HTTPS Setup for 100ms.live WebRTC

## 🚨 Important: WebRTC Requires HTTPS

100ms.live video calling requires HTTPS (or localhost) to work properly. WebRTC is blocked on HTTP endpoints for security reasons.

## 🚀 Quick Fix: Enable HTTPS

### Method 1: Environment Variable (Recommended)
```bash
HTTPS=true npm start
```

### Method 2: Create .env file
Create a `.env` file in the `web` directory with:
```env
HTTPS=true
```

### Method 3: Package.json Script
Add to your `package.json` scripts:
```json
{
  "scripts": {
    "start": "react-scripts start",
    "start:https": "HTTPS=true react-scripts start"
  }
}
```

## 🔧 Alternative: Use localhost

If HTTPS doesn't work, make sure you're accessing the app via:
- `http://localhost:3000` (not 127.0.0.1 or other IPs)
- `https://localhost:3000` (if HTTPS is enabled)

## 🛠️ Troubleshooting

### "navigator.mediaDevices is undefined"
- **Cause**: App is running on HTTP instead of HTTPS
- **Solution**: Use `HTTPS=true npm start` or access via localhost

### "WebRTC is not supported on HTTP endpoints"
- **Cause**: Browser blocks WebRTC on non-secure connections
- **Solution**: Enable HTTPS or use localhost

### Certificate Warnings
- **Chrome**: Click "Advanced" → "Proceed to localhost (unsafe)"
- **Firefox**: Click "Advanced" → "Accept the Risk and Continue"
- **Safari**: Click "Show Details" → "visit this website"

## 📱 Testing

1. **Start with HTTPS**:
   ```bash
   HTTPS=true npm start
   ```

2. **Access the app**:
   - Go to `https://localhost:3000`
   - Accept any certificate warnings

3. **Test video calling**:
   - Login as patient/doctor
   - Go to video consultation
   - Should work without WebRTC errors

## 🔒 Production Deployment

For production, ensure your hosting provider supports HTTPS:
- **Vercel**: Automatic HTTPS
- **Netlify**: Automatic HTTPS  
- **Heroku**: Automatic HTTPS
- **AWS**: Configure SSL certificate

## ✅ Verification

You'll know HTTPS is working when:
- URL shows `https://localhost:3000`
- No "navigator.mediaDevices is undefined" errors
- Video calling works properly
- Browser shows a lock icon in the address bar
