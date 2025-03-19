<?php
  $table_name = $_GET["table-name"];
  $pdo = require "./connection.php";
  $table_query = $pdo->query("DESCRIBE $table_name");
  echo $table_query->fetchColumn();
?>