const sub_query=require("./query_1");// CREATE,UPDATE,DELETE
const sub_query_1=require("./query_2"); // GET

module.exports={

    createProduct:sub_query.createProduct,
    updateProduct:sub_query.updateProduct,
    deleteProduct:sub_query.deleteProduct,
    listProduct:sub_query_1.listProduct

};