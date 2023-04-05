const express = require('express');
const categoryRoutes = require("./resources/category/routes");
const bannerRoutes = require('./resources/banner/routes');
const marcaRoutes = require('./resources/marcas/routes');
const categoriaRoutes = require('./resources/categorias/routes')
const colecoesRoutes = require('./resources/colecoes/routes')
const cors = require('cors')
//const categoriaRoutes = require('./resources/categorias/routes');

const app = express();

app.use(cors());
app.use(express.json()); //a cunicação toda vai ser feita em json, ta ligado!?
app.use(categoryRoutes);
app.use(bannerRoutes);
app.use(marcaRoutes);
app.use(categoriaRoutes);
app.use(colecoesRoutes);

app.listen(8000, () => {
    console.log('--------------');
    console.log('--- PRONTO ---')
    console.log('--------------');
});
