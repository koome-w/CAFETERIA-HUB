<?php
session_start();
if (!isset($_SESSION['user_id'])) {
    header('Location: userlogin.html'); // Redirect to login if not logged in
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Account</title>
    <link rel="stylesheet" href="my_account.css"> <!-- Add your CSS file -->
</head>
<body>
    <!--
    <div class="profile-container">
        <h2>My Account</h2>
        <p><strong>Username:</strong> <?php echo $_SESSION['username']; ?></p>
        <p><strong>Email:</strong> <?php echo $_SESSION['email']; ?></p>
        <a href="user_logout.php">Logout</a>
    </div>
    -->

    <div class="profile-container">
        <h2>My Account</h2>
        <p><strong>Username:</strong> 
            <?php 
            echo isset($_SESSION['username']) ? $_SESSION['username'] : 'N/A'; 
            ?>
        </p>
        <p><strong>Email:</strong> 
            <?php 
            echo isset($_SESSION['email']) ? $_SESSION['email'] : 'N/A'; 
            ?>
        </p>
        <button>
        <a href="user_logout.php">Logout</a>
        </button>
    </div>

</body>
</html>
