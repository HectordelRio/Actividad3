
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const prodsPath = path.join(__dirname, '../data/productos.json');

//obtiene todos
router.get('/', (req, res) => {
    const productos = JSON.parse(fs.readFileSync(prodsPath, 'utf8'));
    res.json(productos);
});

//agrega
router.post('/', (req, res) => {
    const { nombre, precio } = req.body;
    const productos = JSON.parse(fs.readFileSync(prodsPath, 'utf8'));
    
    const nuevo = { id: Date.now(), nombre, precio };
    productos.push(nuevo);
    
    fs.writeFileSync(prodsPath, JSON.stringify(productos, null, 2));
    res.json(nuevo);
});

//elimina
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    let productos = JSON.parse(fs.readFileSync(prodsPath, 'utf8'));
    
    productos = productos.filter(p => p.id != id);
    
    fs.writeFileSync(prodsPath, JSON.stringify(productos, null, 2));
    res.json({ mensaje: "Eliminado" });
});


module.exports = router;
