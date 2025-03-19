<?php
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
?>