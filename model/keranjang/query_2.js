const knex_pg=require("../../database/knex");

module.exports={

    listKeranjang:async({id_users})=>{

        let query=knex_pg.select([
            "keranjang.jumlah",
            knex_pg.raw("(produk.harga*keranjang.jumlah) as total_bayar"),
            knex_pg.raw(`
                json_build_object(
                    'id',produk.id,'name',produk.name,'harga',produk.harga,
                    'is_ready',produk.is_ready,
                    'gambar',produk.gambar,
                    'kode',produk.kode,
                    'category',produk.category
                ) as product
            `)
        ]).from("keranjang");

        query.innerJoin(function(subQuery){

            subQuery.select([
                "product.id","product.name","product.kode","product.harga","product.is_ready",
                "product.gambar",
                knex_pg.raw("json_build_object('id',cp.id,'name',cp.name) as category")
            ]).from("product");

            subQuery.innerJoin("category_product as cp","cp.id","product.id_category_product");

            return subQuery.as("produk");
        },"produk.id","keranjang.id_product");

        if(id_users){
            query.where({"keranjang.created_by":id_users});
        }

        return query;
        
    },

    findOneKeranjang:async({id_users,id_product})=>{

        let query=knex_pg.select([
            "keranjang.jumlah",
            knex_pg.raw("(produk.harga*keranjang.jumlah) as total_bayar"),
            knex_pg.raw(`
                json_build_object(
                    'id',produk.id,'name',produk.name,'harga',produk.harga,
                    'is_ready',produk.is_ready,
                    'gambar',produk.gambar,
                    'kode',produk.kode,
                    'category',produk.category
                ) as product
            `)
        ]).from("keranjang");

        query.innerJoin(function(subQuery){

            subQuery.select([
                "product.id","product.name","product.kode","product.harga","product.is_ready",
                "product.gambar",
                knex_pg.raw("json_build_object('id',cp.id,'name',cp.name) as category")
            ]).from("product");

            subQuery.innerJoin("category_product as cp","cp.id","product.id_category_product");

            return subQuery.as("produk");
        },"produk.id","keranjang.id_product");

        if(id_product){
            query.where({'produk.id':id_product});
        }

        if(id_users){
            query.where({"keranjang.created_by":id_users});
        }

        return query;
        
    }
    
};
