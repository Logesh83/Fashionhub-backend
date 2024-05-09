const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./Database/dbconfig");
const path = require('path');

const HTTP_SERVER = express();

HTTP_SERVER.use(bodyParser.json());
HTTP_SERVER.use(bodyParser.urlencoded({ extended: false }));
HTTP_SERVER.use(cors());

// Routes
HTTP_SERVER.use("/", require("./App"));

const statickidsImagesPath = path.join(process.cwd(), 'Controllers', 'kidsImageUpload', 'Images');
HTTP_SERVER.use('/api/kidsImageUpload/Images', express.static(statickidsImagesPath));

const staticmenImagesPath = path.join(process.cwd(), 'Controllers', 'menImageUpload', 'Images');
HTTP_SERVER.use('/api/menImageUpload/Images', express.static(staticmenImagesPath));

const staticwomenImagesPath = path.join(process.cwd(), 'Controllers', 'womenImageUpload', 'Images');
HTTP_SERVER.use('/api/womenImageUpload/Images', express.static(staticwomenImagesPath));


const PORT=process.env.PORT || 3001
HTTP_SERVER.listen(PORT,()=>{
console.log("Listening to the port")
})
HTTP_SERVER.get("/",(req,res)=>{
    res.send("Welcome to my port")
})
