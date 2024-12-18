<?php
session_start();

// Database connection
$servername = "localhost";
$username = "root";
$password = ""; // Replace with your database password
$dbname = "cafeteria_hub";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Process form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!empty($_POST['feedback']) && !empty($_POST['rating'])) {
        $feedback = $conn->real_escape_string($_POST['feedback']);
        $rating = (int) $_POST['rating'];

        // Ensure user is logged in
        if (isset($_SESSION['user_id'])) {
            $user_id = $_SESSION['user_id'];

            // Insert feedback into the database
            $sql = "INSERT INTO feedbacks (user_id, feedback, rating, created_at) VALUES (?, ?, ?, NOW())";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("isi", $user_id, $feedback, $rating);

            if ($stmt->execute()) {
                echo "Feedback submitted successfully.";
            } else {
                echo "Error: " . $stmt->error;
            }

            $stmt->close();
        } else {
            echo "Error: You must be logged in to submit feedback.";
        }
    } else {
        echo "Error: Feedback and rating are required.";
    }
} else {
    echo "Error: Invalid request.";
}

$conn->close();
?>
