<?php
header('Content-Type: application/json');

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

// Fetch feedback data
$sql = "SELECT f.feedback_id, f.feedback, f.rating, f.created_at, u.username 
        FROM feedbacks f 
        JOIN users u ON f.user_id = u.user_id";
        
$result = $conn->query($sql);

if ($result) {
    $feedbacks = [];
    while ($row = $result->fetch_assoc()) {
        $feedbacks[] = $row;
    }
    // Output as JSON
    echo json_encode($feedbacks);
} else {
    // If there's an error with the query, return a JSON error response
    echo json_encode(["error" => "Error fetching feedback data"]);
}

// Return orders as JSON
echo json_encode(['success' => true, 'feedbacks' => $feedbacks]);
$conn->close();
?>

