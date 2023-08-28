const express = require('express');
const ProductManager = require('./ProductManager');
const productManager = new ProductManager();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts();

  if (limit) {
    return res.send(products.slice(0, limit));
  }

  res.send(products);
});

app.get('/products/:productId', (req, res) => {
  const productId = parseInt(req.params.productId, 10);
  const products = productManager.getProducts();

  const product = products.find(({ id }) => id === productId);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send('Product not found');
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
