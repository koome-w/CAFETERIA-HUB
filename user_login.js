// script.js

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Basic validation (you can enhance this with your own logic)
    if (validateEmail(email) && password.length >= 6) {
        // Here, you would normally send the login request to your server.
        // Simulating a successful login for now.
        window.location.href = 'menu.html'; // Redirect to dashboard or home page
    } else {
        errorMessage.textContent = "Invalid email or password. Please try again.";
        errorMessage.style.display = "block";
    }
});

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

//Password validation function
function isValidPassword(password) {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
}