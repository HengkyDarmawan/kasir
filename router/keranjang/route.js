const router=require("express").Router();

const controller=require("../../controller/keranjang/controller.js");

const v_request=require("../../schemas/keranjang/keranjang.validate.js");
const validate=require("../../middleware/validate_joi.js");

const auth=require("../../middleware/auth.js");

router.get("/get",auth.authjwt,controller.listKeranjang);
router.put("/add/:id_product",auth.authjwt,controller.addToCart);

module.exports=router;
