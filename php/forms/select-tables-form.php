<?php
  function select_tables_form ($pdo, $name)
  {
    $content = "";
    $tables_query = $pdo->query("SHOW TABLES");
    $tables = [];

    while (($table_name = $tables_query->fetchColumn()))
      $tables[] = $table_name;

    foreach ($tables as $table) {
      $label_content = str_replace("_", " ", $table);
      $content .= "<div class=\"form-element\"><label for=$table>$label_content</label><input type=\"radio\" name=\"table-name\" value=$table></div>";
    }

    $content .= "<div class=\"form-element\"><input type=\"submit\" value=\"Выбрать таблицу\"></div>";
    echo "<form name=$name><fieldset>$content</fieldset></form>";
  }
?>