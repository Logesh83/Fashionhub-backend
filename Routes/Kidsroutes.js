const { Router } = require("express");
const router = Router();

const { getAllKids, createKids, updateKids, deleteKids, getKidsById, kidsUploadImages } = require("../Controllers/Kids");

router.post("/createKids", createKids);
router.post("/updateKids/:id", updateKids);
router.post("/deleteKids/:id", deleteKids);
router.get("/getKids/:id", getKidsById);
router.get("/getAllKids", getAllKids);
router.post("/kidsUploadImages",kidsUploadImages);


module.exports=router; 