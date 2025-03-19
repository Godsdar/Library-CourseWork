<?php
  $logic_type = $_POST["logic-type"];
  $title_part = "";
  $publish_years_part = "";
  $author_part = "";
  $genre_part = "";
  $joins = "FROM Книги ";
  $cond = "";
  $select = "SELECT Книги.Название AS Название_книги, ";
  $count_conditions = 0;

  if (!empty($_POST["logic-type"]) && empty($_POST["title"]) && empty($_POST["min-year"]) && empty($_POST["max-year"]) && $_POST["author"] == "Не учитывать" && $_POST["genre"] == "Не учитывать") {
    echo "Вы не указали ни одного критерия поиска данных";
    exit(1);
  }
  if (empty($_POST["min-year"]) && !empty($_POST["max-year"]) || !empty($_POST["min-year"]) && empty($_POST["max-year"])){
    echo "Вы не полностью указали период публикации";
    exit(2);
  }
  if (!empty($_POST["title"])) {
    $count_conditions++;
    $title = $_POST["title"];
    $cond .= "WHERE Книги.Название LIKE '%$title%'";
  }
  if ($_POST["author"] != "Не учитывать") {
    $count_conditions++;
    $author_id = $_POST["author"];

    if ($count_conditions > 1)
      $cond .= " " . $logic_type . " ";
    else
      $cond .= "WHERE ";

    $select .= "Авторы.Имя AS Имя_автора, Авторы.Фамилия AS Фамилия_автора, ";
    $cond .= "Авторы.Код_автора = $author_id";
  }
  if ($_POST["genre"] != "Не учитывать") {
    $genre_id = $_POST["genre"];
    $count_conditions++;

    if ($count_conditions > 1)
      $cond .= " " . $logic_type . " ";
    else
      $cond .= "WHERE ";

    $joins .= "JOIN Книги_и_жанры ON Книги_и_жанры.Код_книги = Книги.Код_книги JOIN Жанры ON Книги_и_жанры.Код_жанра = Жанры.Код_жанра";
    $cond .= "Жанры.Код_жанра = $genre_id";
  }
  if (!empty($_POST["min-year"]) && !empty($_POST["max-year"])) {
    $min_year = $_POST["min-year"];
    $max_year = $_POST["max-year"];
    $count_conditions++;

    if ($count_conditions > 1)
      $cond .= " " . $logic_type . " ";
    else
      $cond .= "WHERE ";

    $cond .= "Книги.Год_первой_публикации BETWEEN $min_year AND $max_year";
  }

  $select = "SELECT Книги.Название AS Название_книги, Авторы.ФИО AS ФИО, Книги.Год_первой_публикации";
  $joins .= " JOIN Книги_и_авторы ON Книги.Код_книги = Книги_и_авторы.Код_книги
  JOIN Авторы ON Авторы.Код_автора = Книги_и_авторы.Код_автора";

  $pdo = require "./connection.php";
  $sql = "$select $joins $cond";
  $search_query = $pdo->query($sql);
  echo json_encode($search_query->fetchAll(PDO::FETCH_ASSOC));
?>
