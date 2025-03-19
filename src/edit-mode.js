import anime from "animejs";
import { DateTime } from "luxon";
import buildTable from "../js/build-table.js";
import deleteSelectedRows from "../js/delete-selected-rows.js";

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
    document.getElementById("button-insert").onclick = displayInsertForm(table, tableName, tableData);
    document.getElementById("button-delete").onclick = handleDelete(tableName, tableData, selectedRowsIndexes);
  });

  table.on("cellEdited", async function (cell) {
    await fetch(`//localhost:3000/php/controllers/update-data.php?table-name=${tableName}`, {
      method: "POST",
      body: JSON.stringify(cell.getRow().getData())
    });
  });

  table.on("rowSelected", (row) => selectedRowsIndexes.push(row.getCells()[0].getValue()));
  table.on("rowDeselected", (row) => selectedRowsIndexes.splice(selectedRowsIndexes.indexOf(row.getCells()[0].getValue()), 1));

  document.querySelector(".edit-buttons-wrapper").style.display = "flex";
}

function displayInsertForm (table, tableName, tableData) {
  return async function (event) {
    const response = await fetch(`//localhost:3000/php/forms/insert-form.php?table-name=${tableName}`);
    const formMarkup = await response.text();
    
    document.getElementById("insert-form-wrapper").innerHTML = formMarkup;
    document.forms["form-insert"].addEventListener("submit", handleInsert(table, tableName, tableData));
    anime({
      targets: "fieldset",
      duration: 5000,
      opacity: 1
    });
  }
}

function handleInsert (table, tableName, tableData) {
  return async function (event) {
    event.preventDefault();
    document.getElementById("insert-form-wrapper").innerHTML = "";
    const response = await fetch(`//localhost:3000/php/controllers/insert-data.php?table-name=${tableName}`, {
      method: "POST",
      body: new FormData(event.target),
    });

    const data = await response.json();
    tableData.push(data);
  }
}

function handleDelete (tableName, tableData, selectedRowsIndexes) {
  return async function (event) {
    const response = await fetch(`//localhost:3000/php/controllers/delete-data.php?table-name=${tableName}`, {
      method: "POST",
      body: JSON.stringify(selectedRowsIndexes)
    });
    const data = await response.text();
    deleteSelectedRows(tableName, tableData, selectedRowsIndexes);
  }
}

export default selectTableHandler;
