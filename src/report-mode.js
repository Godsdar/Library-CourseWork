import { TabulatorFull as Tabulator } from "tabulator-tables";

function displayReport (data) {
  const columnsSettings = [];

  columnsSettings.push({title: "Название книги", field: "Название"});
  columnsSettings.push({title: "Имя читателя", field: "Имя"});
  columnsSettings.push({title: "Фамилия читателя", field: "Фамилия"});
  columnsSettings.push({title: "Телефон читателя", field: "Телефон"});
  columnsSettings.push({title: "Дата выдачи", field: "Дата_выдачи"});
  columnsSettings.push({title: "Дата сдачи", field: "Дата_сдачи"});
  columnsSettings.push({title: "Число дней в пользовании", field: "Число_дней"});
  columnsSettings.push({title: "Дата утери", field: "Дата_утери"});
  
  const table = new Tabulator ("#report-node", {
    layout: "fitColumns",
    columns: columnsSettings,
    data: data,
    printAsHtml: true,
    printHeader: "<h2 id=\"report-header\">Книговыдача</h2>",
  });

  return table;
}

async function createBookLendingReport (event) {
  event.preventDefault();
  const response = await fetch("//localhost:3000/php/controllers/report-data.php", {
    method: "POST",
    body: new FormData(document.forms["report-form"])
  });
  const data = await response.json();
  const table = displayReport(data);
  document.querySelector("#print-button").addEventListener("click", () => table.print(false, true)); 
}

export default createBookLendingReport;
