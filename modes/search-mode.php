<div class="search-form-wrapper">
  <form name="search-form">
    <fieldset id="search-fieldset">
      <div class="form-element">
        <label for="title">Поиск по заглавию</label>
        <input type="text" name="title">
      </div>
      <div class="form-element">
        <label for="author">Авторы</label>
        <select name="author">
          <?php
            $pdo = require "../php/controllers/connection.php";
            $markup = "";
            echo "<option value=\"Не учитывать\" selected>Не учитывать</option>";
            $authors = $pdo->query("SELECT * FROM Авторы");
            while (($author = $authors->fetch(PDO::FETCH_ASSOC))) {
              $id = $author["Код_автора"];
              $val = $author["ФИО"];
              echo "<option value=$id>$val</option>";
            }
          ?>
        </select>
      </div>
      <div class="form-element">
      <label for="genre">Жанры</label>
      <select name="genre">
        <?php
          $pdo = require "../php/controllers/connection.php";
          $markup = "";
          $genres = $pdo->query("SELECT * FROM Жанры");
          echo "<option value=\"Не учитывать\" selected>Не учитывать</option>";
          while (($genre = $genres->fetch(PDO::FETCH_ASSOC))) {
            $id = $genre["Код_жанра"];
            $name = $genre["Название"];
            echo "<option value=$id>$name</option>";
          }
        ?>
      </select>
      </div>
      <div class="form-element">
        <label for="min-year">C</label>
        <input type="text" name="min-year">
        <label for="max-year">По</label>
        <input type="text" name="max-year">
      </div>
      <div class="form-element"><label for="logic-type">Логика</label>
        <select name="logic-type">
          <option value="AND">И</option>
          <option value="OR">ИЛИ</option>
        </select>
      </div>
      <div class="form-element"><input type="submit" value="Поиск"></div>
    </fieldset>
  </form>
  <div id="search-results-table"></div>
</div>