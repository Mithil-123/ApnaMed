# ApnaMed - Web Application

A web-based telemedicine application designed for performance in low-bandwidth areas with high accessibility for users with low literacy through an image-heavy, icon-driven UI.

## 🎯 Project Overview

ApnaMed Web is a comprehensive telemedicine platform that connects patients and doctors through video consultations, AI-powered symptom checking, and integrated pharmacy services. The web application is specifically designed for accessibility and performance in low-bandwidth environments.

## ✨ Key Features

### For Patients
- **Video Consultations**: Connect with doctors via WebRTC video calls
- **Health Records**: View personal medical history and vital signs
- **Prescriptions**: Access prescriptions and find nearby pharmacies
- **AI Symptom Checker**: OpenAI-powered symptom analysis and recommendations
- **Pharmacy Locator**: Find pharmacies with specific medicines

### For Doctors
- **Patient Queue**: View and manage waiting patients
- **Video Consultations**: Conduct live video consultations with WebRTC
- **Patient Records**: Search and access patient medical records
- **Prescription Management**: Add prescriptions during consultations

## 🛠 Technology Stack

- **Framework**: React 18
- **Routing**: React Router v6
- **Styling**: Styled Components
- **Video Calling**: WebRTC (peer-to-peer)
- **AI Integration**: OpenAI Chat Completions API
- **Build Tool**: Create React App
- **Icons**: React Icons

## 📱 Web Application Structure

```
web/
├── public/
│   └── index.html                 # HTML template
├── src/
│   ├── App.js                     # Main app component with routing
│   ├── index.js                   # Entry point
│   ├── data/
│   │   └── mockData.js           # Mock data and API simulation
│   └── components/
│       ├── RoleSelectionScreen.js # Entry point - role selection
│       ├── DoctorLoginScreen.js   # Doctor authentication
│       ├── DoctorDashboardScreen.js # Doctor main dashboard
│       ├── DoctorVideoCallScreen.js # Doctor video consultation
│       ├── PatientVideoCallScreen.js # Patient video consultation
│       ├── WebRTCVideoCall.js     # WebRTC video component
│       └── PlaceholderScreens.js  # Placeholder components
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Modern web browser with WebRTC support

### Installation

1. **Navigate to the web directory**
   ```bash
   cd web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `build` directory.

## 🔧 Configuration

### OpenAI API Setup

**Note**: The AI symptom checker works in two modes:

#### Demo Mode (Default)
- Works immediately without any configuration
- Provides intelligent mock responses based on symptom keywords
- Covers common symptoms like fever, headache, chest pain, etc.
- Includes emergency symptom detection

#### Real AI Mode (Optional)
1. Get an API key from [OpenAI](https://openai.com)
2. Create a `.env` file in the `web` directory:
   ```
   REACT_APP_OPENAI_API_KEY=your-actual-api-key-here
   ```
3. Restart the development server

**Security Note**: In production, API keys should be handled by your backend server for security.

### WebRTC Configuration

The application uses WebRTC for peer-to-peer video calling. No additional configuration is required for basic functionality, but for production use, you may want to implement:

- STUN/TURN servers for NAT traversal
- Signaling server for peer connection establishment
- Authentication and authorization

## 📋 Demo Data

### Demo Patient IDs
- `P001` - Rajesh Kumar (Complete health records)
- `P002` - Priya Sharma (Basic records)
- `P003` - Amit Singh (Minimal records)

### Demo Doctor Credentials
- Doctor ID: `doctor123`
- Password: `password123`

## 🎨 Design Principles

### Visual-First Approach
- **Icon-heavy UI** for low-literacy accessibility
- **Large touch targets** (minimum 44px)
- **High contrast colors** (medical green theme)
- **Card-based layouts** for easy navigation
- **Clear visual hierarchy** throughout

### Responsive Design
- **Mobile-first** approach
- **Flexible grid layouts**
- **Adaptive typography**
- **Touch-friendly interactions**

### Accessibility Features
- **Semantic HTML** elements
- **ARIA labels** and roles
- **Keyboard navigation** support
- **Screen reader** compatibility
- **High contrast** mode support
- **Reduced motion** preferences

## 🔄 User Flows

### Patient Flow
1. **Role Selection** → Choose "Patient"
2. **Dashboard** → Select desired service
3. **Service Access** → Use specific features
4. **Video Consultation** → Connect with doctors
5. **Health Management** → View records, prescriptions

### Doctor Flow
1. **Role Selection** → Choose "Doctor"
2. **Login** → Enter credentials
3. **Dashboard** → Select consultation or records
4. **Patient Management** → Handle consultations
5. **Record Management** → Search patient data

## 🧪 Testing

### Manual Testing Checklist

#### Patient Portal
- [ ] Navigate between all screens
- [ ] Access video consultation
- [ ] View health records
- [ ] Check prescriptions
- [ ] Use symptom checker

#### Doctor Portal
- [ ] Login with demo credentials
- [ ] Access patient queue
- [ ] Start video consultations
- [ ] Search patient records
- [ ] Add prescriptions

#### Video Calling
- [ ] Camera and microphone access
- [ ] Audio/video controls
- [ ] Multiple participants
- [ ] Call quality

## 🌐 Browser Support

### Minimum Requirements
- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+

### WebRTC Support
- All modern browsers support WebRTC
- HTTPS required for camera/microphone access
- Mobile browsers supported

## 🚨 Important Notes

### Security Considerations
- API keys should be stored securely
- HTTPS required for production
- Patient data should be encrypted
- Video calls should use proper authentication

### Production Deployment
- Replace mock data with real API endpoints
- Implement proper error handling
- Add comprehensive logging
- Set up monitoring and analytics
- Implement proper user authentication

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- Real-time notifications
- Offline mode support
- Multi-language support
- Advanced AI features
- Integration with wearable devices
- Telemedicine compliance features
- Payment integration
- Appointment scheduling

---

**Note**: This is a proof-of-concept web application. For production use, implement proper security measures, data encryption, and compliance with healthcare regulations.
