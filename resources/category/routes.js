const express = require("express");
const app = express.Router();
const controller = require("./controller");

app.get("/categorias", async (req, res) => {
    res.send(await controller.listAll());
})

app.get("/categorias/:id", async (req, res) => {
    res.send(await controller.listOne(req.params.id));
})

app.post("/categorias", async (req, res) => {
    res.send(await controller.create(req.body));
})

app.put("/categorias/:id", async (req, res) => {
    res.send(await controller.edit(req.params.id, req.body));
})

app.patch("/categorias/:id", async (req, res) => {
    res.send(await controller.disable(req.params.id));
})

app.delete("/categorias/:id", async (req, res) => {
    res.send(await controller.destroy(req.params.id));
})




module.exports = app;
