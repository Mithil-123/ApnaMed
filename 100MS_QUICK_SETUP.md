# 100ms.live Quick Setup Guide

## 🚀 Quick Start

### Step 1: Get Your 100ms.live Credentials

1. **Sign up** at [100ms.live](https://100ms.live)
2. **Create a room template**:
   - Go to Dashboard → Room Templates
   - Create new template for "Medical Consultation"
   - Set up roles: "doctor" and "patient"
   - Copy the **Room Code**

3. **Generate Auth Token**:
   - Go to Dashboard → Developer → Auth Tokens
   - Click "Generate Token"
   - **Important**: Make sure to select the correct role (doctor/patient)
   - Copy the **Auth Token** (should be a JWT with 3 parts separated by dots)
   - Example format: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

### Step 2: Configure Your App

1. **Copy environment file**:
   ```bash
   cp env.example .env
   ```

2. **Edit `.env` file** and replace:
   ```env
   REACT_APP_HMS_ROOM_CODE="your-actual-room-code"
   REACT_APP_HMS_AUTH_TOKEN="your-actual-auth-token"
   ```

### Step 3: Test Your Setup

1. **Start the app**:
   ```bash
   npm start
   ```

2. **Test video calling**:
   - Go to Patient Dashboard → Video Consultation
   - Click "Start Video Consultation" with any doctor
   - You should see the 100ms video call interface

## 🎯 Features Included

### ✅ **Patient Video Call Screen**
- Real-time video/audio streaming
- Connection status indicator
- Audio/video controls (mute/unmute, show/hide video)
- Doctor information display
- End call functionality

### ✅ **Doctor Video Call Screen**
- All patient features plus:
- Prescription management during calls
- Add prescriptions in real-time
- Patient information display

### ✅ **100ms.live Integration**
- Room-based communication
- Automatic room joining with auth tokens
- Real-time peer management
- Connection status monitoring
- Error handling and reconnection

## 🔧 Configuration Options

### **Environment Variables**
```env
# Required for 100ms.live
REACT_APP_HMS_ROOM_CODE="your-room-code"
REACT_APP_HMS_AUTH_TOKEN="your-auth-token"

# Optional: Customize user names
# (Currently auto-generated as "Patient-{timestamp}" or "Doctor-{timestamp}")
```

### **Customization**
You can modify the user names in the video call screens:
- `PatientVideoCallScreen.js` - Line 24: `USER_NAME`
- `DoctorVideoCallScreen.js` - Line 25: `USER_NAME`

## 🐛 Troubleshooting

### **"Room code and auth token are required"**
- Check your `.env` file has the correct values
- Make sure you copied `env.example` to `.env`
- Restart the development server after changing `.env`

### **"Failed to join room"**
- Verify your room code is correct
- Check your auth token is valid and not expired
- Ensure your 100ms.live account is active

### **"Token is not in proper JWT format"**
- Your auth token must be a valid JWT with 3 parts separated by dots
- Go to 100ms.live Dashboard → Developer → Auth Tokens
- Generate a new token and make sure it's a complete JWT
- Example: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

### **No video/audio**
- Check browser permissions for camera/microphone
- Verify your 100ms.live room template allows video/audio
- Check browser console for errors

### **Connection issues**
- Check your internet connection
- Verify 100ms.live service status
- Try refreshing the page

## 📱 Testing with Multiple Users

1. **Open two browser windows/tabs**
2. **One as Patient, one as Doctor**
3. **Both join the same room** (same room code)
4. **You should see each other's video streams**

## 🔒 Security Notes

- **Development**: Current setup uses environment variables
- **Production**: Move auth token generation to your backend server
- **Token Management**: Implement proper token refresh logic
- **Room Security**: Use room codes with appropriate permissions

## 📚 Additional Resources

- [100ms.live Documentation](https://www.100ms.live/docs/javascript/v2/quickstart/react-quickstart)
- [100ms.live Dashboard](https://dashboard.100ms.live/)
- [100ms.live Support](https://100ms.live/support)

## 🎉 You're Ready!

Your ApnaMed app now has real 100ms.live video calling functionality! 

Just add your room code and auth token to the `.env` file and you're good to go! 🚀
