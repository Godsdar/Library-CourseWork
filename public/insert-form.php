<?php
  $pdo = require "../public/connection.php";
  $table_name = $_GET["table-name"];
  $columns = [];
  $query = $pdo->query("DESCRIBE $table_name");

  while (($column = $query->fetchColumn()) !== false)
    $columns[] = $column;

  $markup = "";

  foreach ($columns as $column) {
    $markup .= "<div class=\"form-element\"><label for=$column>$column</label><input type=\"text\" name=$column></div>";
  }

  $markup .= "<input type=\"submit\" id=\"submit-insert\">Добавить запись в таблицу</input>";
  echo "<form class=\"form-insert\">$markup</form>";
?>
