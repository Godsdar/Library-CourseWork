async function authors (table, tableName) {
  const response = await fetch(`//localhost:3000/php/controllers/get-table-pk?table-name=${tableName}`);
  const data = await repsonse.json();
  table.addRow(data);
}
