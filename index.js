require("dotenv").config();
const express = require("express");
const cors = require("cors");
const messageRoutes = require("./src/routes/mensajes");

const app = express();
const port = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/mensajes", messageRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || "Error interno del servidor",
        error: process.env.NODE_ENV === "production" ? {} : err,
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
