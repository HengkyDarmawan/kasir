const knex_pg=require("../../database/knex");

module.exports={

    addToCart:async({payload,id_product,id_users})=>{
        if(!id_users){
            throw({
                code:123456,
                message:"Unknown users"
            })
        }
        payload={
            ...payload,
            id_product,
            created_by:id_users
        }
        await knex_pg.transaction(async(trx)=>{
            await trx("keranjang").insert(payload).returning("*");
        });
    },

    updateToCart:async({payload,id_product,id_users})=>{
        if(!id_users){
            throw({
                code:123456,
                message:"Unknown users"
            })
        }
        payload={
            ...payload,
            created_by:id_users
        }
        await knex_pg.transaction(async(trx)=>{
            await trx("keranjang").where({'id_product':id_product}).update(payload).returning("*");
        });
    }
    
};
