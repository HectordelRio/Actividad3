const express = require('express');
const router = express.Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');

const usersPath = path.join(__dirname, '../data/usuarios.json');

// LOGIN
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const usuarios = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

    // Buscamos usuario que coincida EXACTO en correo y contraseña
    const usuario = usuarios.find(u => u.email === email && u.password === password);

    if (usuario) {
        const token = jwt.sign({ email }, 'secreto_super_seguro', { expiresIn: '1h' });
        return res.json({ token });
    }

    res.status(401).json({ mensaje: "Correo o contraseña incorrectos" });
});

// REGISTRO
router.post('/register', (req, res) => {
    const { email, password } = req.body;
    const usuarios = JSON.parse(fs.readFileSync(usersPath, 'utf8'));

    // Verificamos si ya existe
    if (usuarios.find(u => u.email === email)) {
        return res.status(400).json({ mensaje: "El correo ya está registrado" });
    }

    // Guardamos directo (sin bcrypt para evitar errores de comparación)
    usuarios.push({ email, password });
    fs.writeFileSync(usersPath, JSON.stringify(usuarios, null, 2));

    res.json({ mensaje: "Usuario registrado con éxito" });
});

module.exports = router;