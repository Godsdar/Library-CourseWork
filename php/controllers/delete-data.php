<?php
  $data = json_decode(file_get_contents("php://input"));
  $table_name = $_GET["table-name"];
  $pdo = require "./connection.php";
  $table_query = $pdo->query("DESCRIBE $table_name");
  $first_column = $table_query->fetchColumn();

  foreach ($data as $index)
    $conditions .= "$first_column" . " = " . "$index" . " OR ";

  $conditions = substr($conditions, 0, -4);
  $sql = "DELETE FROM $table_name WHERE $conditions";
  $pdo->query($sql);
?>
