<?php
session_start();
session_destroy();
header('Location: user_login.html'); // Redirect to login page after logout
exit;
?>
