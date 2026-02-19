const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const PRODUCTOS_FILE = path.join(__dirname, 'data', 'productos.json');

// --- AUTENTICACIÓN DE ADMINISTRADOR/CLIENTE ---
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Validación de acceso al sistema SmartStore
    if (username === 'admin' && password === '1234') {
        res.json({ success: true, role: 'admin' });
    } else {
        res.status(401).json({ success: false, message: 'Acceso denegado' });
    }
});

// --- API DE INVENTARIO (SMARTSTORE) ---
app.get('/productos', (req, res) => {
    const data = JSON.parse(fs.readFileSync(PRODUCTOS_FILE, 'utf-8'));
    res.json(data);
});

// Ruta para actualizar stock (Esto ya no es una "tarea", es una venta)
app.post('/comprar', (req, res) => {
    const productos = JSON.parse(fs.readFileSync(PRODUCTOS_FILE, 'utf-8'));
    const { id, cantidad } = req.body;
    
    const index = productos.findIndex(p => p.id === id);
    if (index !== -1 && productos[index].stock >= cantidad) {
        productos[index].stock -= cantidad; // Resta del inventario
        fs.writeFileSync(PRODUCTOS_FILE, JSON.stringify(productos, null, 2));
        res.json({ success: true, message: 'Compra realizada' });
    } else {
        res.status(400).json({ success: false, message: 'Sin stock' });
    }
});

app.listen(PORT, () => console.log(`SmartStore Live en puerto ${PORT}`));