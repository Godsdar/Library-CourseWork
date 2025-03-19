<?php
$username = "ed";
$password = "ed";
$servername = "library.com";
$dbname = "Библиотека";
return new PDO("mysql:host=localhost;dbname=$dbname", "$username", "$password");
?>
