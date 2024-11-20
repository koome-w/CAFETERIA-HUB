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

// Fetch orders
$orders_query = "SELECT o.order_id, o.total_amount, o.order_date, u.username 
                 FROM orders o 
                 JOIN users u ON o.user_id = u.user_id";
$orders_result = $conn->query($orders_query);

if (!$orders_result) {
    echo json_encode(['success' => false, 'message' => 'Orders query failed']);
    exit();
}

$orders = [];
while ($row = $orders_result->fetch_assoc()) {
    $order_id = $row['order_id'];

    // Fetch items for each order
    $items_query = "SELECT product_name, price, quantity 
                    FROM order_items 
                    WHERE order_id = $order_id";
    $items_result = $conn->query($items_query);

    if (!$items_result) {
        echo json_encode(['success' => false, 'message' => "Items query failed for order ID: $order_id"]);
        exit();
    }

    $items = [];
    while ($item_row = $items_result->fetch_assoc()) {
        $items[] = $item_row;
    }

    $row['items'] = $items; // Add items to the order
    $orders[] = $row;
}

// Return orders as JSON
echo json_encode(['success' => true, 'orders' => $orders]);
$conn->close();
?>
