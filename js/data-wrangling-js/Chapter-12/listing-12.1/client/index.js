//
// Emulates a 'sender' of data to our Node.js server.
//

"use strict";

const fs = require('fs');
const request = require('request-promise');
const importCsvFile = require('./toolkit/importCsvFile.js');

const location = "brisbanecbd"; // Location tag for the example data.
const dataFilePath = "../../data/brisbanecbd-aq-2014.csv"; // CSV file containing example data.

const dataSubmitUrl = "http://localhost:3000/data-collection-point"; // URL for submitting data to our Node.js server.

importCsvFile(dataFilePath) // Load the example data from the CSV file.
    .then(data => {
        let curIndex = 0;

        setInterval(() => { // Every second send a chunk of data to the server.
        
                const outgoingData = Object.assign({}, data[curIndex]); // Clone the data so we can modify it.
                curIndex += 1; // Work our way through the example data.
        
                outgoingData.Location = location; // Tag the data with a location so that we can differentuate our data sources. We'll need this later when we are accepting data from a variety of different locations.

                console.log("Sending data to server!");
        
                request.post({ // Use HTTP POST to submit a packet of data to the server.
                    uri: dataSubmitUrl, // The URL to submit data to.
                    body: outgoingData, // The data being submitted.
                    json: true // Use JSON encoding. The data is sent over the wire using the JSON data format.
                });
         
            }, 1000);
    })
    .catch(err => {
        console.error("An error occurred.");
        console.error(err);
    });

