<?php
  $markup = "";
  $tables = [];
  $columns = [];
  $pdo = require "../public/connection.php";
  foreach ($_POST as $name => $value) {
    $tables[] = $name;
    $query = $pdo->query("DESCRIBE $name");
    while (($column = $query->fetchColumn()))
      $markup .= "<div class=\"form-element\"><label for=$name-$column>$name.$column</label><input type=\"text\" name=$name-$column></div>";
  }

  $markup .= "<button type=\"submit\" id=\"perform-selection\">Поиск по таблицам</button>";
  echo "<form name=\"form-selection\"><fieldset class=\"fieldset-selection\">$markup</fieldset></form>";
?>
