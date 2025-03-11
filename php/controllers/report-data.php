<?php
  $count_params = 0;
  $grouping = "";
  $sorting = "";
  $instructions = "";

  if (!empty($_POST["grouping"])) {
    $count_params++;
    $grouping = $_POST["grouping"];
    $instructions .= "GROUP BY $grouping";
  }
  if (!empty($_POST["sorting"])) {
    $count_params++;
    if ($count_params > 1)
      $conds .=  " AND ";
    $sorting = $_POST["sorting"];
    $sorting_type = $_POST["sorting-order"];
    $instructions .= " ORDER BY $sorting $sorting_type";
  }

  $sql = "SELECT Книги.Название, Читатели.Имя, Читатели.Фамилия, Читатели.Телефон, Книговыдачи.Дата_выдачи, Книговыдачи.Дата_сдачи, IF (Экземпляры.Дата_утери IS NULL, DATEDIFF(Книговыдачи.Дата_сдачи, Книговыдачи.Дата_выдачи), NULL) as Число_дней, Экземпляры.Дата_утери, Причины_утерь_экземпляров.Описание FROM Книговыдачи
    JOIN Экземпляры ON Книговыдачи.Код_экземпляра = Экземпляры.Код_экземпляра
    JOIN Читатели ON Читатели.Код_читателя = Книговыдачи.Код_читателя
    JOIN Книги ON Книги.Код_книги = Экземпляры.Код_книги
    LEFT JOIN Причины_утерь_экземпляров ON Причины_утерь_экземпляров.Код_причины_утери = Экземпляры.Код_причины_утери $instructions";

  $pdo = require "./connection.php";

  $query = $pdo->query($sql);
  $pdo = NULL;
  echo json_encode($query->fetchAll(PDO::FETCH_ASSOC), true);
 ?>
