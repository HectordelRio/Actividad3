const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const DATA_PATH = path.join(__dirname, 'data', 'productos.json');


app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '1234') {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false });
    }
});


app.get('/api/catalogo', (req, res) => {
    try {
        const data = fs.readFileSync(DATA_PATH, 'utf-8');
        res.json(JSON.parse(data));
    } catch (e) {
        res.status(500).json({ error: "Error base de datos" });
    }
});


app.post('/api/comprar', (req, res) => {
    const productos = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    const { id } = req.body;
    const index = productos.findIndex(p => p.id === id);

    if (index !== -1 && productos[index].stock > 0) {
        productos[index].stock -= 1; 
        fs.writeFileSync(DATA_PATH, JSON.stringify(productos, null, 2));
        res.json({ success: true });
    } else {
        res.status(400).json({ success: false, message: "Sin stock" });
    }
});

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));