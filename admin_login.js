/*
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
        window.location.href = 'admin_dashboard.html'; // Redirect to dashboard or home page
        updateDashboardStats();//Update stats on login
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
*/

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the values from the input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Prepare the data to be sent
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    // Send the data using the fetch API
    fetch('admin_login.php', { // Replace with the path to your PHP file
        method: 'POST',
        body: formData
    })
    .then(response => response.text()) // Assuming PHP script outputs plain text
    .then(data => {
        if (data.includes('admin_dashboard.html')) {
            // Redirect to the menu page if the login is successful
            window.location.href = 'admin_dashboard.html';
        } else {
            // Display the error message from PHP or custom alert
            alert(data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while processing the request.');
    });
});