async function displayData (node, json) {
  const responseToDisplay = await fetch(`//localhost:3000/public/display-data.php?json=${JSON.stringify(json)}`);
  node.innerHTML = await responseToDisplay.text();
}

export default displayData;