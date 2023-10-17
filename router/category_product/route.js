const router=require("express").Router();

const controller=require("../../controller/category_product/controller");

const auth=require("../../middleware/auth.js");

const v_request=require("../../schemas/category_product/category_product.validate.js");
const validate=require("../../middleware/validate_joi.js");

router.get("/",auth.authjwt,controller.listCategoryProduct);
router.post("/create",auth.authjwt,controller.createCategoryProduct);
router.put("/update/:id_category_product",auth.authjwt,controller.updateCategoryProduct);
router.delete("/delete/:id_category_product",auth.authjwt,controller.deleteCategoryProduct);

module.exports=router;
