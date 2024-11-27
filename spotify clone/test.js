const fs = require('fs');

// Function to read the JSON file and log the data
function readJsonFile(filename) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
        try {
            const jsonData = JSON.parse(data);
            // console.log(jsonData);
            const items = jsonData.tracks.items;
            items.forEach(item => {
                console.log(item.name)
                
            });
        } catch (parseErr) {
            console.error('Error parsing JSON data:', parseErr);
        }
    });
}

// Call the function with the path to your JSON file
readJsonFile('data.json');
