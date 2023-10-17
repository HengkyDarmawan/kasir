const services = require("./controller.service_1.js");
const response = require("../../helper/response");

module.exports = {

    listCategoryProduct: async (req, res, next) => {
        try {

            const { name, description, page, limit } = req.query;

            let payload = await services.listCategoryProduct({
                name, description, page, limit
            });

            return response.ok({
                payload
            }, res);

        } catch (error) {
            console.log(error);
            return response.error({}, res, error.message);
        }
    },

    createCategoryProduct: async (req, res, next) => {
        try {

            const { name, description } = req.body;

            await services.createCategoryProduct({
                payload: {
                    name, description
                }
            });

            return response.ok({}, res);

        } catch (error) {
            console.log(error);
            return response.error({}, res, error.message);
        }
    },

    updateCategoryProduct: async (req, res, next) => {
        try {

            const { id_category_product } = req.params;

            const { name, description } = req.body;

            await services.updateCategoryProduct({
                payload: {
                    name, description
                }, id_category_product
            });

            return response.ok({}, res);

        } catch (error) {
            console.log(error);
            return response.error({}, res, error.message);
        }
    },

    deleteCategoryProduct: async (req, res, next) => {
        try {

            const { id_category_product } = req.params;

            await services.deleteCategoryProduct({
                payload: {
                    is_deleted:1
                }, id_category_product
            });

            return response.ok({}, res);

        } catch (error) {
            console.log(error);
            return response.error({}, res, error.message);
        }
    }

};