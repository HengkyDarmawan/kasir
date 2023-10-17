const router=require("express").Router();

const controller=require("../../controller/product/controller");

const auth=require("../../middleware/auth.js");

const {upload_product} = require("../../helper/upload_file");

const v_request=require("../../schemas/product/product.validate.js");
const validate=require("../../middleware/validate_joi.js");

router.get("/",auth.authjwt,controller.listProduct);
router.post("/create",auth.authjwt,upload_product.single("gambar"),controller.createProduct);
router.put("/update/:id_product",auth.authjwt,upload_product.single("gambar"),controller.updateProduct);
router.delete("/delete/:id_product",auth.authjwt,controller.deleteProduct);

module.exports=router;
