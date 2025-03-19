<?php
  $pdo = require "../controllers/connection.php";
  require "../controllers/referencing-key.php";
  $table_name = $_GET["table-name"];
  $form_markup = referencingKey($table_name, $pdo);
  echo "<form name=\"form-insert\"><fieldset>$form_markup</fieldset></form>";
?>
