async function insertField (table, tableName) {
  const response = await fetch(`//localhost:3000/php/controllers/get-table-data?table-name=${tableName}`)
  const columns = await response.text();
  const data = {};
  table.addRow({"Код_автора": n, "Имя": null, "Фамилия": null, "Дата_рождения": null, "Телефон": null, "email": null });
}

function books (table, tableName) {
  table.addRow({ "Код_книги": n, "Название": null,  "Год_первой_публикации": null, "Код_издательства": null });
}
function genres (table, tableName) {
  table.addRow({ "Код_жанра": n, "Название": null });
}
function publishHouses (table, tableName) {
  table.addRow({ "Код_издательства": n, "Название": null, "Год_основания": null, "Адрес": null });
}
function readers (table, tableName) {
  table.addRow({ "Код_читателя": n, "Название": null,  "Год_первой_публикации": null, "Код_издательства": null });
}
function books (table, tableName) {
  table.addRow({ "Код_книги": n, "Название": null,  "Год_первой_публикации": null, "Код_издательства": null });
}
function books (table, tableName) {
  table.addRow({ "Код_книги": n, "Название": null,  "Год_первой_публикации": null, "Код_издательства": null });
}
