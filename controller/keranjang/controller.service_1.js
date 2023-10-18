const query=require("../../model/keranjang/keranjang.model.js");
const reuse_query_keranjang=require("../../model/keranjang/reuse_query.js");

let keranjang={};

keranjang.addToCart=async({payload,id_product,id_users})=>{
    try {

        let existsDataCart=await reuse_query_keranjang.existsCartById({id_product});
        if(!existsDataCart){
            return query.addToCart({payload,id_product,id_users});
        }else{
            return query.updateToCart({payload,id_product,id_users});
        }

    } catch (error) {
        throw error;
    }
};

keranjang.listKeranjang=async({id_users})=>{
    try {
        
        return query.listKeranjang({id_users})

    } catch (error) {
        throw error;
    }
};

module.exports=keranjang;