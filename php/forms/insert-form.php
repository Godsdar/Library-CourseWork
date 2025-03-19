<?php
  $pdo = require "../controllers/connection.php";
  $table_name = $_GET["table-name"];
  $columns = [];

  function referencedKey ($table_name, $pdo) {
    $query = null;

    switch ($table_name) {
      case "Книги":
      case "Издательства":
      case "Жанры":
      case "Причины_утерь_экземпляров":
        $query = $pdo->query("SELECT Название FROM $table_name");
        break;
      case "Авторы":
      case "Читатели":
        $query = $pdo->query("SELECT ФИО FROM $table_name");
        break;
      case "Хранилище_экземпляров":
        $query = $pdo->query("SELECT Код_хранилища FROM $table_name");
        break;
      case "Экземпляры":
        $query = $pdo->query("SELECT Код_экземпляра FROM $table_name");
       break;
      case "Книговыдачи":
        $query = $pdo->query("SELECT Код_выдачи FROM $table_name");
        break;
      case "Штрафы":
        $query = $pdo->query("SELECT Код_штрафа FROM $table_name");
        break;
    }

    $pk_query = $pdo->query("DESCRIBE $table_name");
    $pk_col = null;

    while (($pk = $pk_query->fetchColumn())) {
      $pk_col = $pk;
      break;
    }

    $pk_vals_query = $pdo->query("SELECT $pk_col FROM $table_name");
    $pk_vals = [];

    while (($pk_val = $pk_vals_query->fetch(PDO::FETCH_ASSOC)))
      $pk_vals[] = $pk_val[$pk_col];

    $data = $query->fetchAll(PDO::FETCH_ASSOC);
    sort($pk_vals);
    $i = 0;

    foreach ($data as $row) {
      foreach ($row as $key => $val) {
        $server_value = $pk_vals[$i];
        $options .= "<option value=$server_value>$val</option>";
        $i++;
      }
    }
    return "<select name=$pk_col>$options</select>";
  }

  function referencingKey ($table_name, $pdo) {
    $markup = null;

    switch ($table_name) {
      case "Авторы":
        $markup = "<div class=\"form-element insert-form-field\"><label for=\"ФИО\">ФИО</label><input type=\"text\" name=\"ФИО\"></div>
        <div class=\"form-element insert-form-field\"><label for=\"Дата_рождения\">Дата рождения</label><input type=\"date\" name=\"Дата_рождения\" min=\"1100-01-01\" max=\"2009-12-31\"></div>
        <div class=\"form-element insert-form-field\"><label for=\"Дата_смерти\">Дата смерти</label><input type=\"date\" name=\"Дата_смерти\" min=\"1100-01-01\" max=\"2024-12-31\"></div></div>";
        break;
      case "Издательства":
        $markup = "<div class=\"form-element insert-form-field\"><label for=\"Название\">Название</label><input type=\"text\" name=\"Название\"></div>
        <div class=\"form-element insert-form-field\"><label for=\"Адрес\">Адрес</label><input type=\"textarea\" name=\"Адрес\"></div>
        <div class=\"form-element insert-form-field\"><label for=\"Год_основания\">Год основания</label><input type=\"number\" name=\"Год_основания\"></div>";
        break;
      case "Книги":
        $publishes = referencedKey("Издательства", $pdo);
        $markup = "<div class=\"form-element insert-form-field\"><label for=\"Название\">Название</label><input type=\"text\" name=\"Название\"></div>
        <div class=\"form-element insert-form-field\"><label for=\"Год_первой_публикации\">Год первой публикации</label><input type=\"text\" name=\"Год_первой_публикации\"></div><div class=\"form-element insert-form-field\"><label for=\"Код_издательства\">Издательство</label>$publishes</div>";
        break;
      case "Жанры":
        $markup = "<div class=\"form-element insert-form-field\"><label for=\"Название\">Название</label><input type=\"text\" name=\"Название\"></div>
        <div class=\"form-element insert-form-field\"><label for=\"Описание\">Описание</label><input type=\"textarea\" name=\"Описание\"></div>";
        break;
      case "Книги_и_авторы":
        $books = referencedKey("Книги", $pdo);
        $authors = referencedKey("Авторы", $pdo);
        $markup = "<div class=\"form-element insert-form-field\"><label for=\"Код_книги\">Название книги</label>$books</div><div class=\"form-element insert-form-field\"><label for=\"Код_автора\">ФИО автора</label>$authors</div>";
        break;
      case "Книги_и_жанры":
        $books = referencedKey("Книги", $pdo);
        $genres = referencedKey("Жанры", $pdo);
        $markup = "<div class=\"form-element insert-form-field\"><label for=\"Код_книги\">Название книги</label>$books</div><div class=\"form-element insert-form-field\"><label for=\"Код_жанра\">Название жанра</label>$genres</div>";
        break;
      case "Экземпляры":
        $books = referencedKey("Книги", $pdo);
        $reasons = referencedKey("Причины_утерь_экземпляров", $pdo);
        $markup = "<div class=\"form-element insert-form-field\"><label for=\"Код_книги\">Книга</label>$books</div><div class=\"form-element insert-form-field\"><label for=\"Дата_поступления\">Дата поступления</label><input type=\"date\" name=\"Дата_поступления\" min=\"2022-01-01\" max=\"2025-12-31\"></div>" . "<div class=\"form-element insert-form-field\"><label for=\"Дата_утери\">Дата утери</label><input type=\"date\" name=\"Дата_утери\" min=\"2022-01-01\" max=\"2025-12-31\"></div><div class=\"form-element insert-form-field\"><label for=\"Код_причины_утери\">Причина утери</label>$reasons</div>";
        break;
      case "Хранилище_экземпляров":
        $markup = "<div class=\"form-element insert-form-field\"><label for=\"Номер_стеллажа\">Номер стеллажа</label><input type=\"number\" name=\"Номер_стеллажа\"></div>
        <div class=\"form-element insert-form-field\"><label for=\"Номер_полки\">Номер полки</label><input type=\"number\" name=\"Номер_полки\"></div>
        <div class=\"form-element insert-form-field\"><label for=\"Тип_хранилища\">Тип хранилища</label><select name=\"Тип_хранилища\"><option value=\" Открытый доступ\">Открытый доступ</option><option value=\"Закрытый фонд\">Закрытый фонд</option></select></div>";
        break;
      case "Причины_утерь_экземпляров":
        $markup = "<div class=\"form-element insert-form-field\"><label for=\"Название\">Название</label><input type=\"text\" name=\"Название\"></div>
        <div class=\"form-element insert-form-field\"><label for=\"Описание\">Описание</label><input type=\"textarea\" name=\"Описание\"></div>";
        break;
      case "Читатели":
        $markup = "<div class=\"form-element insert-form-field\"><label for=\"ФИО\">ФИО</label><input type=\"text\" name=\"ФИО\"></div>
        <div class=\"form-element insert-form-field\"><label for=\"Дата_рождения\">Дата рождения</label><input type=\"date\" min=\"1930-01-01\" max=\"2012-01-01\" name=\"Дата_рождения\"></div>
        <div class=\"form-element insert-form-field\"><label for=\"Телефон\">Телефон</label><input type=\"text\" name=\"Телефон\"></div>";
        break;
      case "Книговыдачи":
        $copies = referencedKey("Экземпляры", $pdo);
        $readers = referencedKey("Читатели", $pdo);
        $markup = "<div class=\"form-element insert-form-field\"><label for=\"Код_экземпляра\">Код экземпляра</label>$copies</div><div class=\"form-element insert-form-field\"><label for=\"Код_читателя\">Читатель</label>$readers</div><div class=\"form-element insert-form-field\"><label for=\"Дата_выдачи\">Дата выдачи</label><input type=\"date\" name=\"Дата_выдачи\" min=\"2022-01-01\" max=\"2025-12-31\"></div>" . "<div class=\"form-element insert-form-field\"><label for=\"Дата_сдачи\">Дата сдачи</label><input type=\"date\" name=\"Дата_сдачи\" min=\"2022-01-01\" max=\"2025-12-31\"></div>";
        break;
      case "Штрафы":
        $circulations = referencedKey("Книговыдачи", $pdo);
        $markup = "<div class=\"form-element insert-form-field\"><label for=\"Код_выдачи\">Код выдачи</label>$circulations</div><div class=\"form-element insert-form-field\"><label for=\"Сумма\">Сумма</label><input type=\"number\" name=\"Сумма\"></div>
        <div class=\"form-element insert-form-field\"><label for=\"\"></label><select name=\"\"><option value=\"Оплачен\">Оплачен</option><option value=\"Не оплачен\">Не оплачен</option></select></div>";
    }
    $markup .= "<div class=\"form-element insert-form-field\"><input type=\"submit\" value=\"Добавить новую запись\"></div>";
    return $markup;
  }
  $form_markup = referencingKey($table_name, $pdo);
  echo "<form name=\"form-insert\"><fieldset>$form_markup</fieldset></form>";
?>
