<?php

session_start();

// Database connection parameters
$servername = "localhost";
$username = "root"; // Change this if you have a different username
$password = ""; // Add a password if your database uses one
$dbname = "cafeteria_hub";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Ensure email and password keys exist to avoid undefined array key warnings
    if (isset($_POST['email']) && isset($_POST['password'])) {
        $email = $_POST['email'];
        $password = $_POST['password'];

        // Prepare the SQL statement to prevent SQL injection
        $stmt = $conn->prepare("SELECT * FROM admins WHERE email = ? LIMIT 1");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Fetch user data
            $user = $result->fetch_assoc();
            
            // Verify the password with the hash stored in the database
            if (password_verify($password, $user['password'])) {
                // Start user session and redirect to menu page
                $_SESSION['admin_id'] = $user['admin_id'];
                $_SESSION['username'] = $user['username'];
                //header("Location: admin_dashboard.html");
                // Send a plain text response for successful login
                echo 'admin_dashboard.html';
                exit(); // Ensure the script stops after redirection
            } else {
                echo 'Invalid password'; // Password mismatch
            }
        } else {
            echo 'User not found'; // No user matches the provided email
        }

        // Close statement
        $stmt->close();
    } else {
        echo 'Email or password not provided'; // Handle missing input
    }
} else {
    echo 'Invalid request'; // Handle non-POST requests
}

// Close connection
$conn->close();
?>