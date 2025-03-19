<?php
  $table_name = $_GET["table-name"];
  $columns = "";
  $values = "";
  $pdo = require "./connection.php";
  $table_query = $pdo->query("DESCRIBE $table_name");

  for ($i = 0; $column = $table_query->fetchColumn(); $i++) {
    if (!in_array($table_name, ["Книги_и_авторы", "Книги_и_жанры"]) && !
    $i) {
      $pk_col = $column;
      continue;
    };
    $columns .= $column . ",";
  }

  foreach ($_POST as $name => $value) {
    if (!is_numeric($value))
      $value = "\"$value\"";
    $values .= $value . ",";
  }

  $columns = substr($columns, 0, -1);
  $values = substr($values, 0, -1);

  $sql = "INSERT INTO $table_name($columns) VALUES ($values)";
  $fetch_sql = "SELECT * FROM $table_name ORDER BY $pk_col DESC LIMIT 1";
  $query = $pdo->query($sql);
  $fetch_query = $pdo->query($fetch_sql);
  echo json_encode($fetch_query->fetch(PDO::FETCH_ASSOC), true);
?>
