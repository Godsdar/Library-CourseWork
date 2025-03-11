<?php
  function select_tables_form ($pdo, $name) {
    $query = $pdo->query("SHOW TABLES");
    $markup = "";
    while (($table = $query->fetchColumn()))
      $markup .= "<div class=\"form-element\"><label for=$table>$table</label><input type=\"radio\" name=\"table-name\" class=\"select-table-input\"></div>";

    $markup .= "<div class=\"form-element\"><input type=\"submit\" value=\"Выбрать таблицы\" class=\"submit-select-table\"></div>";

    $markup = "<fieldset>$markup</fieldset>";
    return "<form name=$name class=\"select-tables\">$markup</form>";
  }

  function get_columns ($table, $index, $pdo) {
    $query = $pdo->query("DESCRIBE $table");
    $columns = [];

    while (($column = $query->fetchColumn($index)))
      $columns[] = $column;

    return $columns;
  }
?>
