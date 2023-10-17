const knex_pg=require("../../database/knex");

module.exports={

    createProduct:async({payload})=>{
        await knex_pg("product").insert(payload);
    },

    updateProduct:async({payload,id_product})=>{
        await knex_pg.transaction(async(trx)=>{
            await trx("product").update(payload).where({'id':id_product,'is_deleted':0});
            await trx("product").update({updated_at:knex_pg.fn.now()}).where({'id':id_product,'is_deleted':0});
        })
    },

    deleteProduct:async({id_product})=>{
        await knex_pg.transaction(async(trx)=>{
            await trx("product").update({"is_deleted":1}).where({'id':id_product});
            await trx("product").update({updated_at:knex_pg.fn.now()}).where({'id':id_product});
        })
    }

};
