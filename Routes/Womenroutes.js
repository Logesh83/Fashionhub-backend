const Route=require("express");
const { getAllWomen, createWomen, updateWomen, deleteWomen, getWomenById, womenUploadImages } = require("../Controllers/Women");
const router = Route();

router.post("/createWomen",createWomen);
router.post("/updateWomen/:id",updateWomen);
router.post("/deleteWomen/:id",deleteWomen);

router.get("/getAllWomen",getAllWomen);
router.get("/getbyid/Women/:id",getWomenById);
router.post("/womenUploadImages",womenUploadImages);



module.exports=router;