const Categories = require('../models/categories.model')

exports.findCategories = async (req, res) => {
    try {
        const categories = await Categories.findAll({
            where: {
                status: true
            }
        })

        res.status(200).json({
            status: 'success',
            message: 'The categorie found were successfully',
            categories
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
        });
    }
}

exports.findCategory = async (req, res) => {
    try {
        const { id } = req.params
        const categories = await Categories.findOne({
            where: {
                id,
                status: true
            }
        })

        if (!categories) {
            return res.status(404).json({
                status: 'error',
                message: 'The product was not fount'
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'The categorie was found succssfully',
            categories
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
        });
    }
}

exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        const newCategory = await Categories.create({
            name: name.toLowerCase()
        });

        res.status(201).json({
            status: 'success',
            message: 'The categorie was created successfully',
            newCategory
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
        });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params

        const { name } = req.body

        const categorie = await Categories.findOne({
            where: {
                id,
                status: true
            }
        })

        const updateCategorie = await categorie.update({
            name
        })

        res.status(200).json({
            status: 'success',
            message: 'The categorie was fount update',
            updateCategorie
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
        });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const categorie = await Categories.findOne({
            where: {
                id,
                status: true
            }
        })

        await categorie.update({ status: false })


        res.status(200).json({
            status: 'success',
            message: 'The categorie has been delete succssfully'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'fail',
            message: 'Internal server error',
        });
    }
}