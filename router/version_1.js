const router=require("express").Router();

router.use("/users",require("./users/route"));
router.use("/users_account",require("./users_account/route"));
router.use("/roles",require("./roles/route"));
router.use("/permission",require("./permissions/route"));
router.use("/category_product",require("./category_product/route"));
router.use("/product",require("./product/route"));
router.use("/uploads",require("./upload_file/route"));

module.exports=router;