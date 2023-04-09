const express = require('express');
const cors = require('cors');
const produtoRoutes = require("./resources/produto/routes");
const carrinhoRoutes = require("./resources/carrinho/routes");
const pedidosRoutes = require("./resources/pedidos/routes");
const cuponsRoutes = require("./resources/cupons/routes");
const pagamentoRoutes = require("./resources/pagamentos/routes");
const bannerRoutes = require('./resources/banner/routes')

const app = express();

app.use(cors());
app.use(express.json());
app.use(produtoRoutes);
app.use(carrinhoRoutes);
app.use(pedidosRoutes);
app.use(cuponsRoutes);
app.use(pagamentoRoutes);
app.use(bannerRoutes);


app.listen(8002, () => {
    console.log('ok');
});