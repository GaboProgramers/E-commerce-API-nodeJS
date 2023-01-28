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
        const { categories } = req

        res.status(200).json({
            status: 'success',
            message: 'Category fetched succssfully',
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
        const { categories } = req

        const { name } = req.body

        const updateCategorie = await categories.update({
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
        const { categories } = req

        await categories.update({ status: false })


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