<div class="choice-table row">
  <h2>Выберите одну из существующих таблиц</h2>
  <div class="grid-tables">
    <?php
      $pdo = require "../php/controllers/connection.php";
      $query = $pdo->query("SHOW TABLES");
      $grid_content = "";
      while (($table = $query->fetchColumn())) {
        $grid_content .= `<div class="grid-item-wrapper">
          <div class="grid-item" id=$table>$table</div>
        </div>`;
      }
      echo $grid_content;
    ?>
  </div>