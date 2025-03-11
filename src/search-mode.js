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

  columnsSettings.push({ title: "Название", field: "Название_книги", editable: false });
  columnsSettings.push({ title: "Имя автора", field: "Имя_автора", editable: false })
  columnsSettings.push({ title: "Фамилия автора", field: "Фамилия_автора", editable: false });
  columnsSettings.push({ title: "Год первой публикации", field: "Год_первой_публикации", editable: false });
  console.log(document.querySelector("#search-results-table").outerHTML);

  const table = new Tabulator("#search-results-table", {
    columns: columnsSettings,
    data: tableData,
    width: 500,
    layout: "fitColumns"
  });
  displayTableAnime.play();
  return table;
}

export default searchHandler;
