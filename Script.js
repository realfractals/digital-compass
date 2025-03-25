// Get the compass needle and heading display
const needle = document.getElementById('needle');
const headingDisplay = document.getElementById('heading');

// Function to handle compass rotation based on device orientation
function updateCompass(event) {
    let heading = event.alpha; // Get the heading in degrees

    // If heading is negative, adjust the value to keep it between 0 and 360
    if (heading < 0) {
        heading += 360;
    }

    // Update the heading display with the calculated heading
    headingDisplay.innerText = `Heading: ${Math.round(heading)}°`;

    // Rotate the needle based on the heading value
    needle.style.transform = `rotate(${heading}deg)`;
}

// Function to request permission to use the device's sensors
function requestPermission() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(response => {
                if (response === 'granted') {
                    window.addEventListener('deviceorientation', updateCompass);
                } else {
                    alert("Permission to access device orientation was denied.");
                }
            })
            .catch(err => {
                alert("Error requesting permission: " + err);
            });
    } else {
        // For devices that don't require explicit permission
        window.addEventListener('deviceorientation', updateCompass);
    }
}

// Check if DeviceOrientationEvent is available and request permission if necessary
if (window.DeviceOrientationEvent) {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // For iOS 13+ devices
        requestPermission();
    } else {
        // For Android devices and others
        window.addEventListener('deviceorientation', updateCompass);
    }
} else {
    alert('Device orientation is not supported on this device.');
}