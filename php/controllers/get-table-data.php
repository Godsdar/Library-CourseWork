<?php
  $table_name = $_GET["table-name"];
  $pdo = require "./connection.php";
  $table_data_query = $pdo->query("SELECT * FROM $table_name");
  $data = $table_data_query->fetchAll(PDO::FETCH_ASSOC);
  $pdo = NULL;
  echo json_encode($data);
?>
