function getBooksData() {
  const columnsSettings = [];
  columnsSettings.push({ title: "Код книги", field: "Код_книги" });
  columnsSettings.push({ title: "Название", field: "Название", editor: "input" });
  columnsSettings.push({ title: "Год первой публикации", field: "Год_первой_публикации", editor: "number" });
  columnsSettings.push({ title: "Код издательства", field: "Код_издательства", editor: "number", });
  return columnsSettings;
}

function getGenresData() {
  const columnsSettings = [];
  columnsSettings.push({ title: "Код жанра", field: "Код_жанра" });
  columnsSettings.push({ title: "Название", field: "Название", editor: "input", });
  columnsSettings.push({
    title: "Описание", field: "Описание", editor: "textarea", editorParams: {
      selectContents: true,
      verticalNavigation: "editor",
      shiftEnterSubmit: true
    }
  });
  return columnsSettings;
}

function getAuthorsData() {
  const columnsSettings = [];
  columnsSettings.push({ title: "Код автора", field: "Код_автора" });
  columnsSettings.push({ title: "ФИО", field: "ФИО", editor: "input" });
  columnsSettings.push({ title: "Дата рождения", field: "Дата_рождения", editor: "date" });
  columnsSettings.push({ title: "Дата смерти", field: "Дата_смерти", editor: "date" });
  return columnsSettings;
}

function getPublishingHouseData() {
  const columnsSettings = [];
  columnsSettings.push({ title: "Код издательства", field: "Код_издательства", });
  columnsSettings.push({ title: "Название", field: "Название", editor: "input" });
  columnsSettings.push({
    title: "Адрес", field: "Адрес", editor: "textarea", editorParams: {
      selectContents: true,
      verticalNavigation: "editor",
      shiftEnterSubmit: true
    }
  });
  columnsSettings.push({ title: "Год основания", field: "Год_основания", });
  return columnsSettings;
}

function getReadersData() {
  const columnsSettings = [];
  columnsSettings.push({ title: "Код читателя", field: "Код_читателя" });
  columnsSettings.push({ title: "ФИО", field: "ФИО", editor: "input" });
  columnsSettings.push({
    title: "Дата рождения", field: "Дата_рождения", editor: "date", editorParams: {
      format: "dd/MM/yyyy",
      verticalNavigation: "table"
    }
  });
  columnsSettings.push({ title: "Телефон", field: "Телефон", editor: "input" });
  return columnsSettings;
}

function getCopiesData() {
  const columnsSettings = [];
  columnsSettings.push({ title: "Код экземпляра", field: "Код_экземпляра", });
  columnsSettings.push({ title: "Код книги", field: "Код_книги", editor: "number" });
  columnsSettings.push({
    title: "Дата поступления", field: "Дата_поступления", editor: "date", editorParams: {
      format: "dd/MM/yyyy",
      verticalNavigation: "table"
    }
  });
  columnsSettings.push({
    title: "Дата утери", field: "Дата_утери", editor: "date", editorParams: {
      format: "dd/MM/yyyy",
      verticalNavigation: "table"
    }
  });
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
  columnsSettings.push({ title: "Код выдачи", field: "Код_выдачи" });
  columnsSettings.push({ title: "Код экземпляра", field: "Код_экземпляра", editor: "number" });
  columnsSettings.push({ title: "Код читателя", field: "Код_читателя", editor: "number" });
  columnsSettings.push({
    title: "Дата выдачи", field: "Дата_выдачи", editor: "date", editorParams: {
      format: "dd/MM/yyyy",
      verticalNavigation: "table"
    }
  });
  columnsSettings.push({
    title: "Дата сдачи", field: "Дата_сдачи", editor: "date", editorParams: {
      format: "dd/MM/yyyy",
      verticalNavigation: "table"
    }
  });
  return columnsSettings;
}

function getСopiesStorageData() {
  const columnsSettings = [];
  columnsSettings.push({ title: "Код архива", field: "Код_архива" });
  columnsSettings.push({ title: "Номер стеллажа", field: "Номер_стеллажа", editor: "number" });
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
  columnsSettings.push({ title: "Код причины утери", field: "Код_причины_утери", });
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
  columnsSettings.push({ title: "Код штрафа", field: "Код_штрафа", });
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
