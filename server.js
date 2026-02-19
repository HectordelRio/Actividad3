const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());


app.use(express.static(__dirname));


app.use('/auth', require('./routes/auth'));
app.use('/productos', require('./routes/productos'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor vivo en: http://localhost:${PORT}`);

});
