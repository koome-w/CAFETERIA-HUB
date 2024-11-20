<?php
$conn = new mysqli('localhost', 'root', '', 'cafeteria_hub', '3306');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['item_name'];
    $price = $_POST['item_price'];
    $category = $_POST['item_category'];

    $sql = "INSERT INTO menu_items (item_name, item_price, item_category) VALUES ('$name', '$price', '$category')";
    
    if ($conn->query($sql) === TRUE) {
        echo "New item added successfully.";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}
$conn->close();
?>
