const sub_query=require("./query_1");
const sub_query_2=require("./query_2");

module.exports={

    addToCart:sub_query.addToCart,
    updateToCart:sub_query.updateToCart,
    listKeranjang:sub_query_2.listKeranjang,
    findOneKeranjang:sub_query_2.findOneKeranjang,
    deleteCart:sub_query.deleteCart

};