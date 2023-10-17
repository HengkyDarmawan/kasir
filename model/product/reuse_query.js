const knex_pg=require("../../database/knex");

module.exports={

    existsProductById:async({id_product})=>{
        let select=[
            "product.id","product.kode","product.harga","product.is_ready","product.gambar",
            knex_pg.raw("json_build_object('id',cp.id,'name',cp.name) as category"),
            "product.created_at","product.updated_at"
        ];


        let query=knex_pg.select(select).from("product");

        query.innerJoin("category_product as cp",function(){
            this.on("cp.id","=","product.id_category_product");
            this.andOn("cp.is_deleted",0);
        });

        if(id_product){
            query.where("product.id","=",id_product);
        }
        
        return query.first();
    },


};
