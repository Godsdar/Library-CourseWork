async function deleteSelectedRows (tableName, tableData, selectedRowsIndexes) {
  const response = await fetch(`//localhost:3000/php/controllers/get-primary-key.php?table-name=${tableName}`);
  const pk = await response.text();
  const vals = [];
  let offset = 0;

  selectedRowsIndexes.sort((a, b) => a - b);
  for (let row of tableData) vals.push(row[pk]);
  vals.forEach((val, i) => selectedRowsIndexes.includes(val) && tableData.splice(i - offset++, 1));
}

export default deleteSelectedRows;