#!/bin/bash

# Build and deployment script for Fatima Dental Clinic application
echo "Building and preparing deployment package for Fatima Dental Clinic application..."

# Create build directory if it doesn't exist
mkdir -p build

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the application for production
echo "Building application for production..."
npm run build

# Ensure the icons directory exists in the build folder
mkdir -p build/icons

# Generate app icons for different sizes
echo "Generating app icons..."
# In a real environment, we would use a tool like sharp to generate icons from a source image
# For this demo, we'll create placeholder files
sizes=(72 96 128 144 152 192 384 512)
for size in "${sizes[@]}"; do
  echo "Creating icon-${size}x${size}.png"
  # This would normally use an image processing library
  # For demo purposes, we're just creating empty files
  touch build/icons/icon-${size}x${size}.png
done

# Create badge icon for notifications
touch build/icons/badge-72x72.png

# Create shortcut icons
mkdir -p build/icons
touch build/icons/shortcut-appointment.png
touch build/icons/shortcut-calendar.png

# Create screenshots directory
mkdir -p build/screenshots
touch build/screenshots/home-screen.png
touch build/screenshots/appointment-booking.png
touch build/screenshots/patient-dashboard.png

# Copy PWA files to build directory
echo "Copying PWA files to build directory..."
cp public/manifest.json build/
cp public/service-worker.js build/
cp public/offline.html build/

# Create a file to register the service worker
cat > build/register-service-worker.js << 'EOL'
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
EOL

# Add service worker registration to index.html
echo "Adding service worker registration to index.html..."
# In a real environment, we would modify the actual index.html file
# For this demo, we'll just print what we would do
echo "Would add <script src=\"/register-service-worker.js\"></script> to index.html"

# Optimize images
echo "Optimizing images..."
# In a real environment, we would use a tool like imagemin
# For this demo, we'll just print what we would do
echo "Would optimize all images in the build directory"

# Minify CSS and JS
echo "Minifying CSS and JS..."
# In a real environment, this would be handled by the build process
# For this demo, we'll just print what we would do
echo "Would minify all CSS and JS files in the build directory"

# Generate app bundle for Android
echo "Generating Android app bundle..."
# In a real environment, we would use a tool like PWABuilder or Capacitor
# For this demo, we'll just print what we would do
echo "Would generate Android app bundle using PWABuilder or Capacitor"

# Generate iOS app
echo "Generating iOS app..."
# In a real environment, we would use a tool like PWABuilder or Capacitor
# For this demo, we'll just print what we would do
echo "Would generate iOS app using PWABuilder or Capacitor"

# Create a zip file of the build directory
echo "Creating deployment zip file..."
cd build
zip -r ../fatima-dental-clinic-app.zip .
cd ..

echo "Deployment package created successfully!"
echo "The application can now be deployed to a web server or packaged as a native app for Android and iOS."
echo "Deployment package is available at: fatima-dental-clinic-app.zip"
