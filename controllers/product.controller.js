const Product = require('../models/product.model');

exports.findProducts = async (req, res) => {

  try {
    const products = await Product.findAll({
      // ? clausulas
      where: {
        status: true
      }
    })

    res.status(200).json({
      status: 'success',
      message: 'The products found were successfully',
      products
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.findProduct = async (req, res) => {

  try {
    const { product } = req

    res.status(200).json({
      status: 'success',
      message: 'The product was found succssfully',
      product
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { title, description, quantity, price, categoryId, userId } = req.body;

    const newProduct = await Product.create({
      title: title.toLowerCase(),
      description: description.toLowerCase(),
      quantity,
      price,
      categoryId,
      userId,
    });

    res.status(201).json({
      status: 'success',
      message: 'The product was created successfully',
      newProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { product } = req

    const { title, description, quantity, price } = req.body

    const updateProduct = await product.update({
      title,
      description,
      quantity,
      price
    })

    res.status(200).json({
      status: 'success',
      message: 'The product was fount update',
      updateProduct
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { product } = req

    await product.update({ status: false })

    res.status(200).json({
      status: 'success',
      message: 'The product has been delete succssfully'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
