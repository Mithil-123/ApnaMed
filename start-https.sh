#!/bin/bash

# Start ApnaMed Web App with HTTPS for 100ms.live WebRTC support

echo "🚀 Starting ApnaMed Web App with HTTPS..."
echo "📱 This is required for 100ms.live video calling to work"
echo ""

# Kill any existing React processes
echo "🔄 Stopping any existing React processes..."
pkill -f "react-scripts start" 2>/dev/null || true

# Wait a moment
sleep 2

# Start with HTTPS
echo "🔒 Starting with HTTPS enabled..."
echo "🌐 App will be available at: https://localhost:3000"
echo "⚠️  You may need to accept a certificate warning in your browser"
echo ""

HTTPS=true npm start
