import { TabulatorFull as Tabulator, EditModule } from "tabulator-tables";
import * as getTableData from "./get-tables-data.js";
import { html } from "gridjs";

function buildTable(tableName, tableData) {
  let columnsSettings;
  switch (tableName) {
    case "Книги":
      columnsSettings = getTableData.getBooksData();
      break;
    case "Авторы":
      columnsSettings = getTableData.getAuthorsData();
      break;
    case "Жанры":
      columnsSettings = getTableData.getGenresData();
      break;
    case "Издательства":
      columnsSettings = getTableData.getPublishingHouseData();
      break;
    case "Книги_и_авторы":
      columnsSettings = getTableData.getBooksAndAuthorsData();
      break;
    case "Книги_и_жанры":
      columnsSettings = getTableData.getBooksAndGenresData();
      break;
    case "Экземпляры":
      columnsSettings = getTableData.getCopiesData();
      break;
    case "Читатели":
      columnsSettings = getTableData.getReadersData();
      break;
    case "Хранилище_экземпляров":
      columnsSettings = getTableData.getСopiesStorageData();
      break;
    case "Причины_утерь_экземпляров":
      columnsSettings = getTableData.getReasonsForLossOfCopiesData();
      break;
    case "Книговыдачи":
      columnsSettings = getTableData.getBookCirculationsData();
      break;
    case "Штрафы":
      columnsSettings = getTableData.getFinesData();
      break;
    default:
      columnsSettings = [];
  }
  return new Tabulator("#table-node", {
    dependencies: {
      DateTime: DateTime,
    },
    columns: columnsSettings,
    height: 300,
    layout: "fitColumns",
    data: tableData,
    reactiveData: true,
    selectableRows: true,
  });
}
export default buildTable;
