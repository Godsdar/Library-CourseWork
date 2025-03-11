function getBooksData() {
  const columnsSettings = [];
  columnsSettings.push({ title: "Код книги", field: "Код_книги", editor: "number", editable: false });
  columnsSettings.push({ title: "Название", field: "Название", editor: "input" });
  columnsSettings.push({ title: "Год первой публикации", field: "Год_первой_публикации", editor: "number" });
  columnsSettings.push({ title: "Код издательства", field: "Код_издательства", editor: "number" });
  return columnsSettings;
}

function getGenresData() {
  const columnsSettings = [];
  columnsSettings.push({ title: "Код жанра", field: "Код_жанра", editor: "number", editable: false });
  columnsSettings.push({ title: "Название", field: "Название", editor: "input", editable: false });
  columnsSettings.push({
    title: "Описание", field: "Описание", editor: "textarea", editorParams: {
      selectContents: true,
      verticalNavigation: "editor",
      shiftEnterSubmit: true
    }
  });
  columnsSettings.push({ title: "Рейтинг", field: "Рейтинг", editor: "number" });
  return columnsSettings;
}

function getAuthorsData() {
  const columnsSettings = [];
  columnsSettings.push({ title: "Код автора", field: "Код_автора", editable: false });
  columnsSettings.push({ title: "Имя", field: "Имя", editable: true, editor: "input" });
  columnsSettings.push({ title: "Фамилия", field: "Фамилия", editable: false, editor: "input" });
  columnsSettings.push({ title: "Дата рождения", field: "Дата_рождения", editor: "date" });
  columnsSettings.push({ title: "Дата смерти", field: "Дата_смерти", editor: "date" });
  return columnsSettings;
}

function getPublishingHouseData() {
  const columnsSettings = [];
  columnsSettings.push({ title: "Код издательства", field: "Код_издательства", editable: false });
  columnsSettings.push({ title: "Название", field: "Название", editable: false });
  columnsSettings.push({ title: "Адрес", field: "Адрес", editor: "input" });
  columnsSettings.push({ title: "Год основания", field: "Год_основания", editable: false });
  return columnsSettings;
}

function getReadersData() {
  const columnsSettings = [];
  columnsSettings.push({ title: "Код читателя", field: "Код_читателя", editable: false });
  columnsSettings.push({ title: "Имя", field: "Имя", editable: false });
  columnsSettings.push({ title: "Фамилия", field: "Фамилия", editable: false });
  columnsSettings.push({ title: "Дата рождения", field: "Дата_рождения", editable: false });
  columnsSettings.push({ title: "Телефон", field: "Телефон", editor: "input" });
  return columnsSettings;
}

function getCopiesData() {
  const columnsSettings = [];
  columnsSettings.push({ title: "Код экземпляра", field: "Код_экземпляра", editable: false });
  columnsSettings.push({ title: "Код книги", field: "Код_книги", editable: false });
  columnsSettings.push({ title: "Дата поступления", field: "Дата_поступления", editable: false });
  columnsSettings.push({ title: "Дата утери", field: "Дата_утери", editable: false });
  columnsSettings.push({ title: "Код причины утери", field: "Код_причины_утери", editor: "number" });
  return columnsSettings;
}

function getBooksAndAuthorsData() {
  const columnsSettings = [];
  columnsSettings.push({ title: "Код книги", field: "Код_книги", editor: "number" });
  columnsSettings.push({ title: "Код автора", field: "Код_автора", editor: "number" });
  return columnsSettings;
}

function getBooksAndGenresData() {
  const columnsSettings = [];
  columnsSettings.push({ title: "Код жанра", field: "Код_жанра", editor: "number" });
  columnsSettings.push({ title: "Код книги", field: "Код_книги", editor: "number" });
  return columnsSettings;
}

function getBookCirculationsData() {
  const columnsSettings = [];
  columnsSettings.push({ title: "Код выдачи", field: "Код_выдачи", editable: false });
  columnsSettings.push({ title: "Код экземпляра", field: "Код_экземпляра", editable: false });
  columnsSettings.push({ title: "Код читателя", field: "Код_читателя", input: "number" });
  columnsSettings.push({ title: "Время выдачи", field: "Время_выдачи", editable: false });
  columnsSettings.push({
    title: "Время сдачи", field: "Время_сдачи", editor: "date", editorParams: {
      format: "dd/MM/yyyy",
      verticalNavigation: "table"
    }
  });
  return columnsSettings;
}

function getСopiesStorageData() {
  const columnsSettings = [];
  columnsSettings.push({ title: "Код архива", field: "Код_архива", editor: "number", editable: false });
  columnsSettings.push({ title: "Номер стеллажа", field: "Номер_стеллажа", editor: "number", editable: false });
  columnsSettings.push({ title: "Номер полки", field: "Номер_полки", editor: "number" });
  columnsSettings.push({
    title: "Тип хранилища", field: "Тип_хранилища", editor: "list", editorParams: {
      values: ["Открытый доступ", "Закрытый фонд"]
    }
  });
  return columnsSettings;
}

function getReasonsForLossOfCopiesData() {
  const columnsSettings = [];
  columnsSettings.push({ title: "Код причины утери", field: "Код_причины_утери", editable: false });
  columnsSettings.push({ title: "Название", field: "Название", editor: "input" });
  columnsSettings.push({
    title: "Описание", field: "Описание", editor: "textarea", editorParams: {
      selectContents: true,
      verticalNavigation: "editor",
      shiftEnterSubmit: true
    }
  });
  return columnsSettings;
}

function getFinesData() {
  const columnsSettings = [];
  columnsSettings.push({ title: "Код штрафа", field: "Код_штрафа", editable: false });
  columnsSettings.push({
    title: "Статус", field: "Статус", editor: "list", editorParams: {
      values: ["Оплачен", "Не оплачен"]
    }
  });
  columnsSettings.push({ title: "Сумма", field: "Сумма", editor: "number" });
  columnsSettings.push({ title: "Код выдачи", field: "Код_выдачи", editor: "number" });
  return columnsSettings;
}

export { getBooksData, getAuthorsData, getGenresData, getPublishingHouseData, getBooksAndAuthorsData, getBooksAndGenresData, getReadersData, getCopiesData, getСopiesStorageData, getReasonsForLossOfCopiesData, getBookCirculationsData, getFinesData };
