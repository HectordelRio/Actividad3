const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta raíz
app.use(express.static(__dirname));

// RUTAS (Verifica que tus archivos en /routes se llamen así)
app.use('/auth', require('./routes/auth'));
app.use('/productos', require('./routes/productos'));

// Carga el HTML al entrar a localhost:3000
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor vivo en: http://localhost:${PORT}`);
});