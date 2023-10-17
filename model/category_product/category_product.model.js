const sub_query=require("./query_1");// CREATE,UPDATE,DELETE
const sub_query_1=require("./query_2"); // GET

module.exports={

    createCategoryProduct:sub_query.createCategoryProduct,
    updateCategoryProduct:sub_query.updateCategoryProduct,
    deleteCategoryProduct:sub_query.deleteCategoryProduct,
    listCategoryProduct:sub_query_1.listCategoryProduct

};