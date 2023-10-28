const services = require("./controller.service_1.js");
const response = require("../../helper/response");

module.exports = {

    addToCart: async (req, res) => {
        try {

            const id_users = req.decoded?.id;

            const { id_product } = req.params;

            const { jumlah } = req.body;

            let payload = await services.addToCart({
                payload: {
                    jumlah
                }, id_product, id_users
            });

            return response.ok({
                payload
            }, res);

        } catch (error) {
            console.log(error);
            return response.error({}, res, error.message);
        }
    },

    listKeranjang: async (req, res) => {
        try {

            const id_users = req.decoded?.id;

            let payload = await services.listKeranjang({ id_users });

            return response.ok({
                payload
            }, res);

        } catch (error) {
            console.log(error);
            return response.error({}, res, error.message);
        }
    },

    findOneKeranjang: async (req, res) => {
        try {

            const id_users = req.decoded?.id;
            const { id_product } = req.params;

            let payload = await services.findOneKeranjang({ id_users, id_product });

            return response.ok({
                payload:payload??null
            }, res);

        } catch (error) {
            console.log(error);
            return response.error({}, res, error.message);
        }
    },

    deleteToCart: async (req, res) => {
        try {

            const id_users = req.decoded?.id;
            const { id_product } = req.params;

            let payload = await services.deleteToCart({ id_users, id_product });

            return response.ok({
                payload:payload??null
            }, res);

        } catch (error) {
            console.log(error);
            return response.error({}, res, error.message);
        }
    }

};