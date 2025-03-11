<div class="edit-mode">
  <?php
    require "../php/functions/funcs.php";
    $pdo = require "../php/controllers/connection.php";
    echo select_tables_form($pdo, "select-table-form");
    $pdo = NULL;
  ?>
  <div class="edit-buttons-wrapper">
    <button id="button-insert">Создать новую запись</button>
    <button id="button-delete">Удалить запись</button>
  </div>
  <div id="table-node"></div>
  <div id="insert-form-wrapper"></div>
</div>
