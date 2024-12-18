<?php
// Database connection (replace with your credentials)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "cafeteria_hub"; // Replace with your actual database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch feedback data
$sql = "SELECT * FROM feedbacks"; // Replace 'feedbacks' with your actual feedback table name
$result = $conn->query($sql);

$feedbacks = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $feedbacks[] = $row;
    }
}

// Return feedbacks as JSON
header('Content-Type: application/json');
echo json_encode($feedbacks);

// Close connection
$conn->close();
?>
