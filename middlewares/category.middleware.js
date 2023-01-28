const Categories = require("../models/categories.model");

exports.validCategoryById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const categories = await Categories.findOne({
            where: {
                id,
                status: true
            }
        })

        if (!categories) {
            return res.status(404).json({
                status: 'error',
                messaje: 'categories not fount'
            })
        }
        req.categories = categories
        next()
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
        });
    }
}

// ? next =  sirve para decirle que siga ah la siguiente funcion.