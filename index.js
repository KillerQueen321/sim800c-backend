const express = require('express');
const axios = require('axios');
const cors = require('cors'); // ✅ Importamos cors

const app = express();

app.use(cors()); // ✅ Habilitamos CORS para evitar bloqueos
app.use(express.json());

// 🔹 URL de Firebase Realtime Database
const FIREBASE_URL = 'https://seguramente-ebe0d-default-rtdb.firebaseio.com/vehiculo/control_puerta.json';

// ✅ Ruta para recibir datos desde el SIM800C y enviarlos a Firebase
app.post('/actualizar', async (req, res) => {
    console.log("🔹 Recibida solicitud en /actualizar:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
        console.error("❌ Error: No se enviaron datos en la solicitud.");
        return res.status(400).send({ message: 'Solicitud vacía' });
    }

    try {
        console.log("📡 Enviando datos a Firebase:", req.body);
        const response = await axios.patch(FIREBASE_URL, req.body);
        console.log("✅ Respuesta de Firebase:", response.data);

        res.status(200).send({
            message: 'Datos actualizados en Firebase',
            firebase_response: response.data
        });
    } catch (error) {
        console.error("❌ Error al enviar a Firebase:", error.message);
        res.status(500).send({
            message: 'Error al actualizar Firebase',
            error: error.message
        });
    }
});

// ✅ Puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
