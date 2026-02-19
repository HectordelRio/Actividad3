const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// CAMINO AL ARCHIVO - Verifica que la carpeta 'data' exista en GitHub
const DATA_PATH = path.join(__dirname, 'data', 'productos.json');

// RUTA PARA VER PRODUCTOS
app.get('/api/productos', (req, res) => {
    try {
        const data = fs.readFileSync(DATA_PATH, 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: "No se pudo leer el archivo de productos" });
    }
});

// LOGIN SENCILLO
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '1234') {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor de SmartStore activo en puerto ${PORT}`);
});