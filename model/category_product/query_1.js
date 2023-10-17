const knex_pg=require("../../database/knex");

module.exports={

    createCategoryProduct:async({payload})=>{
        await knex_pg("category_product").insert(payload);
    },

    updateCategoryProduct:async({payload,id_category_product})=>{
        await knex_pg.transaction(async(trx)=>{
            await trx("category_product").update(payload).where({'id':id_category_product});
            await trx("category_product").update({updated_at:knex_pg.fn.now()}).where({'id':id_category_product});
        })
    },

    deleteCategoryProduct:async({id_category_product})=>{
        await knex_pg.transaction(async(trx)=>{
            await trx("product").where({id_category_product}).del();
            await trx("category_product").where({'id':id_category_product}).del();
        })
    }

};
