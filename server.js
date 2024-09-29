const express = require('express');
const path = require('path');
const app = express();

// Middleware to handle URL encoded data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/login', (req, res) => {
  const { enrollment, password } = req.body;
  res.send('Login successful!');
});

app.get('/forgot-password.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'forgot-password.html'));
});

app.post('/send-otp', (req, res) => {
  res.send('OTP sent!');
});

app.post('/verify-otp', (req, res) => {
  res.send('OTP verified!');
});

app.post('/reset-password', (req, res) => {
  res.send('Password reset successful!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const otpForm = document.getElementById('otpForm');

otpForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get the OTP value
    const otp = document.getElementById('otp').value;

    // Send the OTP to the server for verification
    fetch('/verify-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `otp=${otp}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // OTP verification successful, redirect to the desired page
            window.location.href = '/dashboard'; // Replace '/dashboard' with the actual URL of your dashboard page
        } else {
            // Handle OTP verification failure (e.g., display an error message)
            alert('Invalid OTP');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

const newPasswordForm = document.getElementById('new-password-form');

newPasswordForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get the new password values
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validate password matching
    if (newPassword !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // Send the new password to the server for updating
    fetch('/update-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `new_password=${newPassword}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Password update successful, redirect to the sign-in page
            window.location.href = '/sign-in'; // Replace '/sign-in' with the actual URL of your sign-in page
        } else {
            // Handle password update failure (e.g., display an error message)
            alert('Error updating password.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});