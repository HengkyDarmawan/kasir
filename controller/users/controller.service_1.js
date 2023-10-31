const query=require("../../model/users/users.model");
const hashing=require("../../helper/hashing");
const jwttoken=require("../../helper/jwt_token");

let users={};

users.login=async({email,password})=>{
    try {

        let data=await query.login({
            email
        });

        if(data){
            let valid_password = hashing.checkPass(password, data.password);

            if(valid_password){
                let token = await jwttoken.generateToken({
                    id: data.id,
                    username: data.username
                });
                return {valid_password,data,token};
            }
            
        }

        return null;

    } catch (error) {
        throw error;
    }

}

users.getUsers=async({id_users})=>{
    try {
        return query.getUsers({id_users});
    } catch (error) {
        throw error;
    }
};

module.exports=users;