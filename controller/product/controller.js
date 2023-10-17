const services = require("./controller.service_1.js");
const response = require("../../helper/response");
const reuse_query_product = require("../../model/product/reuse_query.js");
const helper_function = require('../../helper/function.js');
const fs = require("fs");
const path = require("path");

module.exports = {

    listProduct: async (req, res) => {
        try {

            const { kode, product_category, is_ready, page, limit } = req.query;

            let payload = await services.listProduct({
                kode, product_category, is_ready, page, limit
            });

            return response.ok({
                payload
            }, res);

        } catch (error) {
            console.log(error);
            return response.error({}, res, error.message);
        }
    },

    createProduct: async (req, res) => {
        try {

            const id_users=req.decoded.id;

            const { name, harga, id_category_product } = req.body;
            let filename = req.file ? req.file.filename : "none.png";

            await services.createProduct({
                payload: {
                    name, harga, id_category_product, is_ready:1, created_by:id_users,
                    kode:`P-${parseInt(helper_function.getRandomFloat(1000,9999))}-${parseInt(helper_function.getRandomFloat(100,999))}`,
                    gambar: `http://localhost:8000/api/v1/uploads/image/${filename}`
                }
            });

            return response.ok({}, res);

        } catch (error) {
            console.log(error);
            return response.error({}, res, error.message);
        }
    },

    updateProduct: async (req, res) => {
        try {

            const id_users=req.decoded.id;

            const { id_product } = req.params;

            const { name, harga, id_category_product, is_ready } = req.body;
            let new_filename = req.file ? req.file.filename : null;

            let payload={
                name, harga, id_category_product, is_ready,
                updated_by:id_users
            };

            let product_data=await reuse_query_product.existsProductById({id_product});

            if(product_data){
                if(new_filename){
                    let filename=product_data.gambar.split("\/");
                    filename=filename[filename.length-1];
                    let path_folder = global.root_dir;
                    if(fs.existsSync(path.join(path_folder,"uploaded",filename))){
                        await fs.unlinkSync(path.join(path_folder,"uploaded",filename));
                    }
                    payload={
                        ...payload,
                        gambar: `http://localhost:8000/api/v1/uploads/image/${new_filename}`
                    }
                }

                await services.updateProduct({
                    payload, id_product
                });
    
                return response.ok({}, res);
            }else{
                return response.notFound({},res,"Product tidak ditemukan");
            }

        } catch (error) {
            console.log(error);
            return response.error({}, res, error.message);
        }
    },

    deleteProduct: async (req, res) => {
        try {

            const { id_product } = req.params;

            await services.deleteProduct({
                payload: {
                    is_deleted:1
                }, id_product
            });

            return response.ok({}, res);

        } catch (error) {
            console.log(error);
            return response.error({}, res, error.message);
        }
    }

};