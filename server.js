const express = require('express');
const productRoutes = require("./resources/produto/routes");

const app = express();

app.use(express.json());
app.use(productRoutes);

app.listen(8000, () => {
    console.log('ok');
});