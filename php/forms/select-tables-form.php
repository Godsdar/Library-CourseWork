<?php
  function displayTablesForm ($pdo) {
    $query = $pdo->query("SHOW TABLES");
    $markup = "";
    while (($table = $query->fetchColumn()))
      $markup .= "<div class=\"form-element\"><label for=$table>$table</label><input type=\"checkbox\" name=$table class=\"select-table-input\"></div>";

    $markup .= "<div class\"form-element\"><input type=\"submit\" value=\"Отправить данные\"></div>";

    $markup = "<fieldset>$markup</fieldset>";
    return "<div class=\"select-tables-wrapper\">
    <form name=\"select-tables\" class=\"select-tables-form\">$markup</form>
    </div>";
  }
?>