<?php
session_start();
session_destroy();
header('Location: home.html'); // Redirect to login page after logout
exit;
?>
