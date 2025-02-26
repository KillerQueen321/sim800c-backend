const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// URL de Firebase Realtime Database
const FIREBASE_URL = 'https://seguramente-ebe0d-default-rtdb.firebaseio.com/vehiculo/control_puerta.json';

// Ruta para recibir datos desde el SIM800C y enviarlos a Firebase
app.post('/actualizar', async (req, res) => {
    const data = req.body;

    try {
        const response = await axios.patch(FIREBASE_URL, data);
        res.status(200).send({
            message: 'Datos actualizados en Firebase',
            firebase_response: response.data
        });
    } catch (error) {
        res.status(500).send({
            message: 'Error al actualizar Firebase',
            error: error.message
        });
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
