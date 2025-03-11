<?php
  $table_name = $_POST["table-name"];
  $pdo = require "./connection.php";

  $table_query = $pdo->query("SELECT * FROM $table_name");
  $data = $table_query->fetchAll(PDO::FETCH_ASSOC);
  $pdo = NULL;

  echo json_encode($data);
?>
