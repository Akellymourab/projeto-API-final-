const express = require('express');
const produtoRoutes = require("./resources/produto/routes");
const carrinhoRoutes = require("./resources/carrinho/routes");
const pedidosRoutes = require("./resources/pedidos/routes");

const app = express();

app.use(express.json());
app.use(produtoRoutes);
app.use(carrinhoRoutes);
app.use(pedidosRoutes);

app.listen(8000, () => {
    console.log('ok');
});