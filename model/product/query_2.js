const knex_pg=require("../../database/knex");
let query_helper=require("../../helper/query_helper");

module.exports={

    listProduct:async({kode, product_category, is_ready, page, limit})=>{
        let offset=query_helper.parsePageToOffset({page,limit})

        let select=[
            "product.id","product.name","product.kode","product.harga","product.is_ready","product.gambar",
            knex_pg.raw("json_build_object('id',cp.id,'name',cp.name) as category"),
            "product.created_at","product.updated_at"
        ];

        let query=knex_pg.from("product");

        query.innerJoin("category_product as cp",function(){
            this.on("cp.id","=","product.id_category_product");
            this.andOn("cp.is_deleted",0);
        });

        query.where("product.is_deleted","=",0);
        
        if(is_ready){
            query.where("product.is_ready","=",is_ready);
        }
        
        if(kode){
            query.whereILike('product.kode',`%${kode}%`);
        }

        if(product_category){
            query.where(knex_pg.raw('lower(cp.name)'),'=',product_category);
        }


        let count = 0;

        if (limit) {
            let queryCountData = query.count("* as count");
            // console.log(queryCountData.toQuery());
            count = (await queryCountData)[0].count;
            query.limit(limit);
        }

        if (offset) {
            query.offset(offset);
        }

        query.clearSelect().select(select);

        let datas = await query;

        let result = {
            per_page: limit ? parseInt(limit) : "all",
            last_page: limit ? Math.ceil(count / limit) : 1,
            total_data: parseInt(count),
            current_page: parseInt(page),
            data: datas
        };

        return result;
    }

};
