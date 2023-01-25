const Product = require('../models/product.model');

exports.findProducts = async (req, res) => {

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
};

exports.findProduct = async (req, res) => {

  const { id } = req.params
  const product = await Product.findOne({
    where: {
      id, // ? la llave sera el id del modelo, y el valor el id del parametro
      status: true
    }
  })

  // ? = Condicional para manejo de error.!
  if (!product) {
    return res.status(404).json({
      status: 'error',
      message: 'The product was not fount'
    })
  }

  res.status(200).json({
    status: 'success',
    message: 'The product was found succssfully',
    product
  });
};

exports.createProduct = async (req, res) => {
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
};

exports.updateProduct = async (req, res) => {
  // ? obtener el id del parametro
  const { id } = req.params
  // ? obtener la informacion a actualizar.
  const { title, description, quantity, price } = req.body
  // ? obetener el producto ah actualizar
  const product = await Product.findOne({
    where: {
      id,
      status: true
    }
  })
  // ? si el producto no se encuentra enviamos un error
  if (!product) {
    return res.status(404).json({
      status: 'error',
      messaje: 'The product was not fount'
    })
  }
  // ? enviamos las propiedades que se van ah actualizar
  const updateProduct = await product.update({
    title,
    description,
    quantity,
    price
  })
  // ? enviamos una respuesta correcta con el producto actualizado
  res.status(200).json({
    status: 'success',
    message: 'The product was fount update',
    updateProduct
  });
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findOne({
    where: {
      id,
      status: true
    }
  })

  if (!product) {
    return res.status(404).json({
      status: 'error',
      messaje: 'The product was not fount'
    })
  }

  await product.update({ status: false })


  res.status(200).json({
    status: 'success',
    message: 'The product has been delete succssfully'
  });
};
