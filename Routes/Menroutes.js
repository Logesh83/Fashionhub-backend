const Route=require("express");
const { getAllMens, createMen, updateMen, deleteMen, getMenById, menUploadImages } = require("../Controllers/Men");
const router = Route();

router.post("/createMen",createMen);
router.post("/updateMen/:id",updateMen);
router.post("/deleteMen/:id",deleteMen);

router.get("/getAllMen",getAllMens);
router.get("/getbyid/Men/:id",getMenById);
router.post("/menUploadImages",menUploadImages);




module.exports=router;