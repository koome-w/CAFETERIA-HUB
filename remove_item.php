<?php
// Establish a connection to the database
$conn = new mysqli('localhost', 'root', '', 'cafeteria_hub', '3306');

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle the removal request
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['item_name']; // Get the item name from the form

    // Prepare the SQL statement to remove the item
    $sql = "DELETE FROM menu_items WHERE item_name = ?";

    // Use a prepared statement to prevent SQL injection
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $name); // Bind the item name parameter

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo "Item removed successfully.";
        } else {
            echo "No item found with the given name.";
        }
    } else {
        echo "Error removing item: " . $stmt->error;
    }

    // Close the prepared statement
    $stmt->close();
}

// Close the database connection
$conn->close();
?>
