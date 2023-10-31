const service=require("./controller.service_1");
const response=require("../../helper/response");
const { series } = require("async");

module.exports={

    login:async(req,res,next)=>{
        try {
            
            const {email="",password=""} = req.body;

            let payload=await service.login({email,password});
            
            if(payload){
                let {data,token}=payload;

                return response.ok({
                    account:{
                        id:data.id,
                        username:data.username
                    },
                    token
                },res);
                
            }

            return response.error({},res,`Invalid email atau password, silakan cek kembali`);

        } catch (error) {
            console.log(error);
            return response.error({},res,error.message);
        }

    },

    getUsers:async(req,res) => {
        try {
            
            const id_users=req.decoded.id;

            let payload=await service.getUsers({id_users});

            return response.ok({
                payload
            },res);

        } catch (error) {
            return response.error({},res);
        }
    }

};
