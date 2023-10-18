const knex_pg=require("../../database/knex");

module.exports={

    existsCartById:async({id_product})=>{
        let query=knex_pg.select([
            "keranjang.jumlah",
            knex_pg.raw("json_build_object('id',product.id,'harga',product.harga,'is_ready',product.is_ready,'name',product.name) as product")
        ]).from("keranjang");

        query.innerJoin("product","product.id","keranjang.id_product");

        if(id_product){
            query.where({'product.id':id_product});
        }

        return query.first();
    }
    
};
