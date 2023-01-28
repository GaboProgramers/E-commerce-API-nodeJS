const { Router } = require('express');
const { check } = require('express-validator');
// const { ckeck } = require("express-validator")
const {
  findProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  findProduct,
} = require('../controllers/product.controller');
const { validProductById } = require('../middlewares/products.middlewares');
const { validateFields } = require('../middlewares/validateField.middleware');

const router = Router();

//IMPORTANTE ESTOS COMENTARIOS SON MERAMENTE EDUCATIVOS

// Esta ruta me va a encontrar todos los productos, esta ruta viene
// del archivo servidor que tiene un path product y este ruta se dirige hacia
// el controlador de productos que se llama findProduct
router.get('/', findProducts);

// Esta ruta me va a encontrar un un producto dado un id, este id se lo especifico
// por el path es decir por los parametros de la url, esta ruta viene
// del archivo servidor que tiene un path product y este ruta se dirige hacia
// el controlador de productos que se llama findProductById
router.get('/:id', validProductById, findProduct);

// Esta ruta me va a crear un un producto ,esta ruta viene
// del archivo servidor que tiene un path product y este ruta se dirige hacia
// el controlador de productos que se llama createProduct
router.post('/', [
  check('title', 'The title require').not().isEmpty(),
  check('description', 'The description must be require').not().isEmpty(),
  check('quantity', 'The quantity require').isNumeric(),
  check('price', 'The price require').isNumeric(),
  check('categoryId', 'The categoryId require').isNumeric(),
  check('userId', 'The userId requerid').isNumeric(),
  validateFields
], createProduct);

// Esta ruta me va a actualizar un un producto dado un id, este id se lo especifico
// por el path es decir por los parametros de la url, esta ruta viene
// del archivo servidor que tiene un path product y este ruta se dirige hacia
// el controlador de productos que se llama updateProduct
router.patch('/:id', [
  check('title', 'The title require').not().isEmpty(),
  check('description', 'The description must be require').not().isEmpty(),
  check('quantity', 'The quantity require').isNumeric(),
  check('price', 'The price require').isNumeric(),
  validateFields,
  validProductById
], updateProduct);

// Esta ruta me va a actualizar un un producto dado un id, este id se lo especifico
// por el path es decir por los parametros de la url, esta ruta viene
// del archivo servidor que tiene un path product y este ruta se dirige hacia
// el controlador de productos que se llama updateProduct

router.delete('/:id', validProductById, deleteProduct);

module.exports = {
  productRouter: router
};
