const knex_pg=require("../../database/knex");


module.exports={

    login:async({email})=>{
        let query=knex_pg.select(["*"]).from("users");

        query.where({email});

        return query.first();
    },
    
    getUsers:async({id_users})=>{
        let query=knex_pg.select(["users.id","users.username","users.email","users.created_at","users.updated_at"]).from("users");

        if(id_users){
            query.where({"users.id":id_users});
        }

        return query.first();
    }

};