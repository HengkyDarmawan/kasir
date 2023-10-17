const query=require("../../model/product/product.model.js");

let product={};

product.listProduct=async({kode, product_category, is_ready, page, limit})=>{
    try {
        
        return query.listProduct({kode, product_category, is_ready, page, limit});
        
    } catch (error) {
        throw error;
    }
};

product.createProduct=async({payload})=>{
    try {
        
        return query.createProduct({payload});
        
    } catch (error) {
        throw error;
    }
};

product.updateProduct=async({payload,id_product})=>{
    try {
        
        return query.updateProduct({payload,id_product});
        
    } catch (error) {
        throw error;
    }
};

product.deleteProduct=async({id_product})=>{
    try {
        
        return query.deleteProduct({id_product});
        
    } catch (error) {
        throw error;
    }
};

module.exports=product;