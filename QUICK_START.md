# ApnaMed Web - Quick Start Guide

## 🚀 Immediate Testing (Web Version)

The ApnaMed web application is ready to run immediately with WebRTC video calling and all core features.

### Quick Start Steps

1. **Navigate to Web Directory**
   ```bash
   cd web
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm start
   ```

4. **Open Your Browser**
   Navigate to `http://localhost:3000`

### 🎯 What Works Right Now

#### ✅ Fully Functional Features
- **Role Selection Screen** - Choose Patient/Doctor
- **Doctor Portal** - Login, Dashboard, Video Calls
- **Patient Portal** - Dashboard, Video Calls
- **WebRTC Video Calling** - Real peer-to-peer video calls
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Accessibility Features** - Screen reader support, keyboard navigation
- **Visual-First Design** - Icon-heavy UI for low literacy users

#### 🔧 Web-Specific Features
- **WebRTC Integration** - Real video calling using browser APIs
- **Responsive Layout** - Adapts to different screen sizes
- **Progressive Web App** - Can be installed on mobile devices
- **Modern Browser Support** - Works in all modern browsers
- **HTTPS Ready** - Secure video calling support

### 📱 Demo Data

#### Patient IDs for Testing
- `P001` - Rajesh Kumar (Complete health records)
- `P002` - Priya Sharma (Basic records)  
- `P003` - Amit Singh (Minimal records)

#### Doctor Credentials
- **Doctor ID**: `doctor123`
- **Password**: `password123`

### 🎨 Web UI Features

#### Visual-First Design
- **Large Icons** - Easy to understand for low literacy users
- **High Contrast** - Medical green theme with white cards
- **Card-Based Layout** - Intuitive navigation
- **Minimal Text** - Secondary descriptions only
- **Touch-Friendly** - Large touch targets (44px minimum)

#### Responsive Design
- **Mobile-First** - Optimized for mobile devices
- **Flexible Grid** - Adapts to different screen sizes
- **Touch Interactions** - Optimized for touch devices
- **Fast Loading** - Optimized for low-bandwidth areas

#### Accessibility Features
- **Semantic HTML** - Proper HTML structure
- **ARIA Labels** - Screen reader support
- **Keyboard Navigation** - Full keyboard support
- **High Contrast** - WCAG compliant colors
- **Focus Management** - Clear focus indicators

### 🔍 Testing Scenarios

#### Patient Flow Testing
1. **Role Selection** → Choose "Patient"
2. **Dashboard** → Access patient features
3. **Video Consultation** → Connect with doctors
4. **Health Records** → View personal medical data
5. **Prescriptions** → View prescriptions and find pharmacies
6. **Symptom Checker** → Test AI analysis (needs OpenAI key)

#### Doctor Flow Testing
1. **Role Selection** → Choose "Doctor"
2. **Login** → Enter `doctor123` / `password123`
3. **Dashboard** → Choose consultation or records
4. **Video Call** → Start consultation with patient
5. **Prescription Management** → Add prescriptions during calls

#### Video Calling Testing
1. **Camera Access** → Allow camera and microphone permissions
2. **Video Controls** → Test mute, video off, end call
3. **Call Quality** → Check video and audio quality
4. **Multiple Participants** → Test with multiple users

### 🛠 Web Development Notes

#### Current Architecture
- **React 18** with modern hooks
- **React Router v6** for navigation
- **Styled Components** for styling
- **WebRTC** for video calling
- **Mock Data** for API simulation

#### File Structure
```
web/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── App.js                  # Main app with routing
│   ├── index.js                # Entry point
│   ├── data/mockData.js        # Mock data & API simulation
│   └── components/             # All React components
│       ├── RoleSelectionScreen.js
│       ├── DoctorLoginScreen.js
│       ├── DoctorDashboardScreen.js
│       ├── DoctorVideoCallScreen.js
│       ├── PatientVideoCallScreen.js
│       ├── WebRTCVideoCall.js   # WebRTC video component
│       └── PlaceholderScreens.js
├── package.json                # Dependencies
└── README.md                   # Documentation
```

### 🌐 Browser Requirements

#### Minimum Browser Versions
- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+

#### WebRTC Requirements
- **HTTPS** required for camera/microphone access
- **Modern browser** with WebRTC support
- **Camera and microphone** permissions

### 🚨 Important Notes

#### For Production
- Replace mock implementations with real APIs
- Add proper authentication and security
- Implement HTTPS for video calling
- Add proper error handling and validation
- Follow healthcare compliance requirements

#### For Development
- All mock data is in `src/data/mockData.js`
- Video calling uses WebRTC APIs
- OpenAI integration needs API key configuration
- Navigation and UI are production-ready

### 🎉 Success Indicators

The web application is working correctly if you can:
- ✅ Navigate between all screens
- ✅ Login as doctor with demo credentials
- ✅ Access video calling with camera/microphone
- ✅ See responsive design on different screen sizes
- ✅ Use keyboard navigation throughout
- ✅ See high contrast, accessible design
- ✅ Experience smooth video calling

### 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Ensure camera/microphone permissions are granted
3. Verify HTTPS is used for video calling
4. Test with demo credentials first
5. Check browser compatibility

### 🔧 Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Preview production build
npm run preview
```

---

**Ready to test!** 🚀 The ApnaMed web application is fully functional for demonstration and development purposes with real WebRTC video calling.
