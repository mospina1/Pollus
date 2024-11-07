const csvFileInput = document.getElementById('csvFileInput');
const output = document.getElementById('output');
const uploadButton = document.getElementById('uploadButton');

csvFileInput.addEventListener('change', handleFileSelect);

    function handleFileSelect(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const text = e.target.result;
    const data = parseCSV(text);
    displayData(data);
  };

  reader.readAsText(file);
}

function parseCSV(text) {
  const lines = text.split('\n');
  const headers = lines[0].split(',');

  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',');
    const rowData = {};

    for (let j = 0; j < headers.length; j++) {
      rowData[headers[j]] = row[j];
    }

    data.push(rowData);
  }

  return data;
}

function displayData(data) {
  output.innerHTML = '<table>';
  output.innerHTML += '<tr><th>' + Object.keys(data[0]).join('</th><th>') + '</th></tr>';

  for (const row of data) {
    output.innerHTML += '<tr>';
    for (const key in row) {
      output.innerHTML += '<td>' + row[key] + '</td>';
    }
    output.innerHTML += '</tr>';
  }

  output.innerHTML += '</table>';
}