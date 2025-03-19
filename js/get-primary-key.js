function getPrimaryKey (tableName) {
  switch (tableName) {
    case "Книги":
      return "Код_книги";
    case "Авторы":
      return "Код_автора";
    case "Жанры":
      return "Код_жанра";
    case "Издательства":
      return "Код_издательства";
    case "Книги_и_авторы":
      return "Код_книги";
    case "Книги_и_жанры":
      return "Код_книги";
    case "Экземпляры":
      return "Код_экземпляра";
    case "Читатели":
      return "Код_читателя";
    case "Хранилище_экземпляров":
      return "Код_хранилища";
    case "Причины_утерь_экземпляров":
      return "Код_причины_утери";
    case "Книговыдачи":
      return "Код_выдачи";
    case "Штрафы":
      return "Код_штрафа";
  }
}

export default getPrimaryKey;