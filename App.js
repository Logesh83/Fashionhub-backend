const express = require("express");
const APP_SERVER = express();

// Consolidated route handling
APP_SERVER.use("/api", require("./Routes/Kidsroutes"));
APP_SERVER.use("/api", require("./Routes/Menroutes"));
APP_SERVER.use("/api", require("./Routes/Womenroutes"));

module.exports = APP_SERVER;
