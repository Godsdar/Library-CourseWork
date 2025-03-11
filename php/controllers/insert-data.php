<?php
  $table_name = $_GET["table-name"];
  $columns = "";
  $values = "";
  $pdo = require "./connection.php";

  $table_query = $pdo->query("DESCRIBE $table_name");
  while (($column = $table_query->fetchColumn()))
    $columns .= $column . ",";

  foreach ($_POST as $name => $value) {
    if (!$first_column)
      $first_column = $name;
    if (!is_numeric($value))
      $value = "\"$value\"";
    $values .= $value . ",";
  }

  $columns = substr($columns, 0, -1);
  $values = substr($values, 0, -1);

  $sql = "INSERT INTO $table_name($columns) VALUES ($values)";
  $fetch_sql = "SELECT * FROM $table_name order by $first_column DESC LIMIT 1";
  $query = $pdo->query($sql);
  $fetch_query = $pdo->query($fetch_sql);
  $data = json_encode($fetch_query->fetchAll(PDO::FETCH_ASSOC), true);
  $pdo = NULL;
  echo $data;
?>
