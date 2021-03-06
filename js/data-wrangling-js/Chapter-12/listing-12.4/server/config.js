//
// A simple JavaScript configuration file.
// Gathers all the configuration for our server in the same place.
//

"use strict";

module.exports = {
    server: {
        hostName: "localhost", // Server setup details.
        portNo: 3030
    },
    
    database: { // Database connection details.
        host: "mongodb://localhost:27017",
        name: "air_quality"
    }
};