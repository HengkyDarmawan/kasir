const router=require("express").Router();

const controller=require("../../controller/upload_file/controller.js");

router.get("/image/:filename",controller.readImage);

module.exports=router;