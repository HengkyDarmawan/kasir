const query=require("../../model/category_product/category_product.model.js");

let category_product={};

category_product.listCategoryProduct=async({name,description,page,limit})=>{
    try {
        
        return query.listCategoryProduct({name,description,page,limit});
        
    } catch (error) {
        throw error;
    }
};

category_product.createCategoryProduct=async({payload})=>{
    try {
        
        return query.createCategoryProduct({payload});
        
    } catch (error) {
        throw error;
    }
};

category_product.updateCategoryProduct=async({payload,id_category_product})=>{
    try {
        
        return query.updateCategoryProduct({payload,id_category_product});
        
    } catch (error) {
        throw error;
    }
};

category_product.deleteCategoryProduct=async({id_category_product})=>{
    try {
        
        return query.deleteCategoryProduct({id_category_product});
        
    } catch (error) {
        throw error;
    }
};

module.exports=category_product;