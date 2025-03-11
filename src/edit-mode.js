import { TabulatorFull as Tabulator, EditModule } from "tabulator-tables";
import { DateTime } from "luxon";
import buildTable from "../js/build-table.js";

window.DateTime = DateTime;

async function selectTableHandler (event) {
  event.preventDefault();
  const selectTableForm = document.forms["select-table-form"];
  const response = await fetch("//localhost:3000/php/controllers/select-table.php", {
    method: "POST",
    body: new FormData(selectTableForm)
  });

  let tableName;

  for (let element of selectTableForm) {
    if (element.checked) {
      tableName = element.value;
      break;
    }
  }

  const tableData = await response.json();
  const table = buildTable(tableName, tableData);
  const selectedRowsIndexes = [];

  table.on("tableBuilt", () => {
    document.getElementById("button-insert")
    .addEventListener("click", displayInsertForm(table, tableName));
    document.getElementById("button-delete")
    .addEventListener("click", handleDelete(tableData, tableName, selectedRowsIndexes));
  });

  table.on("cellEdited", async function (cell) {
    await fetch(`//localhost:3000/php/controllers/update-data.php?table-name=${tableName}`, {
      method: "POST",
      body: JSON.stringify(cell.getRow().getData())
    });
  });

  table.on("rowSelected", (row) => selectedRowsIndexes.push(row.getCells()[0].getValue()));
  table.on("rowDeselected", (row) => selectedRowsIndexes.splice(row.getCells()[0].getValue() - 1), 1);

  document.querySelector(".edit-buttons-wrapper").style.display = "flex";
}

function updateHandler (table, tableName) {
  return async function (event) {
    const dataStrignify = JSON.stringify(table.getData());
    await fetch(`//localhost:3000/php/controllers/insert-data .php?table-name=${tableName}&table-data=${dataStrignify}`);
  }
}

function performUpdate (table) {
  return function (event) {
    event.preventDefault();
    fetch(`//localhost:3000/controllers/update-controller.php`, {
      method: "POST",
      body: new FormData(document.event.target),
    });
  }
}

function displayInsertForm (table, tableName) {
  return async function (event) {
    const response = await fetch(`//localhost:3000/php/forms/insert-form.php?table-name=${tableName}`);
    const formMarkup = await response.text();
    document.getElementById("insert-form-wrapper").innerHTML = formMarkup;
    document.forms["form-insert"].addEventListener("submit", handleInsert(table, tableName));
  }
}

function handleInsert (table, tableName) {
  return async function (event) {
    event.preventDefault();
    const response = await fetch(`//localhost:3000/php/controllers/insert-controller.php?table-name=${tableName}`, {
      method: "POST",
      body: new FormData(event.target),
    });
    const data = await response.json();
    table.addRow(data);
  }
}

function handleDelete (tableData, tableName, selectedRowsIndexes) {
  return async function (event) {
    const response = await fetch(`//localhost:3000/php/controllers/delete-table-data.php?table-name=${tableName}`, {
      method: "POST",
      body: JSON.stringify(selectedRowsIndexes)
    });
    const data = await response.text();
    console.log(data);
    for (let element of selectedRowsIndexes)
      tableData.splice(element, 1);
  }
}

export default selectTableHandler;
