const jwt = require('jsonwebtoken');
const CLAVE = "mi_secreto_123";

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: "No autorizado: Falta el token" });
    }

    try {
        const verificado = jwt.verify(token, CLAVE);
        req.user = verificado;
        next();
    } catch (error) {
        res.status(403).json({ mensaje: "Token inválido o expirado" });
    }
};