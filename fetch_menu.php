<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$host = "localhost"; // Correctly define the database host
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password
$dbname = "cafeteria_hub"; // Replace with your database name

// Create a connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Database connection failed: " . $conn->connect_error]));
}

// Fetch menu items
$sql = "SELECT item_name, item_price, item_category FROM menu_items";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $menu_items = [];
    while ($row = $result->fetch_assoc()) {
        $menu_items[] = $row;
    }
    echo json_encode(["success" => true, "menu_items" => $menu_items]);
} else {
    echo json_encode(["success" => false, "message" => "No menu items found."]);
}

$conn->close();
?>
