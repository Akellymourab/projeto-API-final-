const express = require('express');
const cors = require('cors');
const produtoRoutes = require("./resources/produto/routes");
const carrinhoRoutes = require("./resources/carrinho/routes");
const pedidosRoutes = require("./resources/pedidos/routes");
const clientesRouter = require('./resources/clientes/routes');
const enderecos_clientesRouter = require('./resources/enderecos_clientes/routes');
const imagens_pg3Router = require('./resources/imagem_pg3/routes');
const categoryRoutes = require("./resources/category/routes");
const bannerRoutes = require('./resources/banner/routes');
const marcaRoutes = require('./resources/marcas/routes');
const colecoesRoutes = require('./resources/colecoes/routes')
const cuponsRoutes = require("./resources/cupons/routes");
const pagamentoRoutes = require("./resources/pagamentos/routes");

const swagger = require("swagger-ui-express");
const docs = require('./docs.json');

const app = express();

app.use('/documentacao', swagger.serve, swagger.setup(docs));
app.use(cors());
app.use(express.json());
app.use(produtoRoutes);
app.use(carrinhoRoutes);
app.use(pedidosRoutes);
app.use(clientesRouter);
app.use(enderecos_clientesRouter);
app.use(imagens_pg3Router);
app.use(categoryRoutes);
app.use(bannerRoutes);
app.use(marcaRoutes);
app.use(colecoesRoutes);
app.use(cuponsRoutes);
app.use(pagamentoRoutes);

app.use((req, res) => {
    res.status(404).send("Nenhuma rota encontrada")
})

const PORTA = 8000;

app.listen(PORTA, () => {
    console.log('-----------');
    console.log('-- ATIVO --');
    console.log('-----------');
});