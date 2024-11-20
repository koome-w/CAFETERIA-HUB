<?php
header('Content-Type: application/json');
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

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($data['user_id'], $data['totalAmount'], $data['items'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid order data']);
    exit();
}

$user_id = $data['user_id'];
$total_amount = $data['totalAmount'];
$items = $data['items'];

// Insert order into `orders` table
$stmt = $conn->prepare("INSERT INTO orders (user_id, total_amount) VALUES (?, ?)");
$stmt->bind_param("id", $user_id, $total_amount);

if ($stmt->execute()) {
    $order_id = $stmt->insert_id; // Get the last inserted order ID

    // Insert items into `order_items` table
    $item_stmt = $conn->prepare("INSERT INTO order_items (order_id, product_name, price, quantity) VALUES (?, ?, ?, ?)");

    foreach ($items as $item) {
        $item_stmt->bind_param("isdi", $order_id, $item['name'], $item['price'], $item['quantity']);
        $item_stmt->execute();
    }

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to store order']);
}

$conn->close();
?>
