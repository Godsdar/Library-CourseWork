import { TabulatorFull as Tabulator } from "tabulator-tables";

async function searchHandler(event) {
  event.preventDefault();
  const response = await fetch("//localhost:3000/php/controllers/search-data.php", {
    method: "POST",
    body: new FormData(document.forms["search-form"])
  });
  const data = await response.json();
  const table = displaySearchngResult(data);
}

function displaySearchngResult (tableData) {
  const columnsSettings = [];

  columnsSettings.push({ title: "Название", field: "Название_книги" });
  columnsSettings.push({ title: "Автор", field: "ФИО" })
  columnsSettings.push({ title: "Год первой публикации", field: "Год_первой_публикации" });

  const table = new Tabulator("#search-results-table", {
    columns: columnsSettings,
    data: tableData,
    width: 500,
    layout: "fitColumns"
  });
  return table;
}

export default searchHandler;
