const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// 🔹 URL de Firebase Realtime Database
const FIREBASE_URL = 'https://seguramente-ebe0d-default-rtdb.firebaseio.com/vehiculo/control_puerta.json';

// ✅ Ruta para recibir datos desde el SIM800C y enviarlos a Firebase
app.post('/actualizar', async (req, res) => {
    console.log("🔹 Recibida solicitud en /actualizar:", req.body); // 🔴 Agregamos este log

    const data = req.body;

    try {
        const response = await axios.patch(FIREBASE_URL, data);
        console.log("✅ Datos enviados a Firebase:", response.data);

        res.status(200).send({
            message: 'Datos actualizados en Firebase',
            firebase_response: response.data
        });
    } catch (error) {
        console.error("❌ Error al enviar datos a Firebase:", error.response ? error.response.data : error.message);

        res.status(500).send({
            message: 'Error al actualizar Firebase',
            error: error.response ? error.response.data : error.message
        });
    }
});

// ✅ Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
