<?php
  $data = json_decode(file_get_contents("php://input"), true);
  $table_name = $_GET["table-name"];
  $values = "";
  $pdo = require "./connection.php";
  $first_column = array_keys($data)[0];
  $first_column_value = $data[$first_column];

  foreach ($data as $name => $value) {
    if (!is_numeric($value))
      $value = "\"$value\"";
    $values .= "$name = $value,";
  }

  $values = substr($values, 0, -1);

  $sql = "UPDATE $table_name
          SET $values
          WHERE $first_column = $first_column_value";
  if (!$pdo->query($sql))
    echo "При попытке изменения данных произошла ошибка";
  else
    $pdo = NULL;
?>
