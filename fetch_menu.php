<?php
// Connect to the database
$conn = new mysqli('localhost', 'root', '', 'cafeteria_hub', 3306);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch menu items
$sql = "SELECT * FROM menu_items";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Loop through and display each item
    while ($row = $result->fetch_assoc()) {
        echo '
        <div class="' . htmlspecialchars($row['category']) . '" data-id="' . htmlspecialchars($row['item_id']) . '" data-name="' . htmlspecialchars($row['name']) . '" data-price="' . htmlspecialchars($row['price']) . '">
            <h3>' . htmlspecialchars($row['name']) . '</h3>
            <p>Price: Ksh. ' . htmlspecialchars($row['price']) . '</p>
            <div class="quantity-control">
                <button class="decrement" onclick="decrement(\'' . htmlspecialchars($row['item_id']) . '-qty\')">-</button>
                <input type="number" id="' . htmlspecialchars($row['item_id']) . '-qty" value="0" min="0">
                <button class="increment" onclick="increment(\'' . htmlspecialchars($row['item_id']) . '-qty\')">+</button>
            </div>
            <button onclick="addToOrder(\'' . htmlspecialchars($row['item_id']) . '\', \'' . htmlspecialchars($row['name']) . '\', ' . htmlspecialchars($row['price']) . ')" class="order-btn">Order Now</button>
        </div>';
    }
} else {
    echo '<p>No menu items available.</p>';
}

// Close the connection
$conn->close();
?>
