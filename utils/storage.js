const fs = require('fs').promises;

async function leer(archivo) {
    try {
        const contenido = await fs.readFile(archivo, 'utf-8');
        // Si el archivo está vacío, JSON.parse fallará, por eso validamos
        return contenido ? JSON.parse(contenido) : [];
    } catch (error) {
        return []; 
    }
}

async function guardar(archivo, datos) {
    await fs.writeFile(archivo, JSON.stringify(datos, null, 2));
}

module.exports = { leer, guardar };