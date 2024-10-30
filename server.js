const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the "Reference Waveforms" directory
app.use('/waveforms', express.static(path.join(__dirname, 'Reference Waveforms')));

// Endpoint to get the list of images
app.get('/images', (req, res) => {
    const directoryPath = path.join(__dirname, 'Reference Waveforms');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory: ' + err);
        }
        // Filter and return only image files
        const images = files.filter(file => {
            return /\.(jpg|jpeg|png|gif)$/.test(file);
        });
        res.json(images);
    });
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Waveforms.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
