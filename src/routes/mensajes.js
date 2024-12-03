const express = require("express");
const router = express.Router();
const mensajeController = require("../controllers/mensajeController");
const mensajeSchema = require("../models/mensajeSchema");

// Middleware de validación de esquemas
const validateSchema = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

// Obtener todos los mensajes
router.get("/", mensajeController.getMensajes);

// Obtener mensaje por ID
router.get("/:mensajeId", mensajeController.getMensajeById);

// Agregar nuevo mensaje
router.post("/", validateSchema(mensajeSchema), mensajeController.addMensaje);

// Eliminar mensaje por ID
router.delete("/:mensajeId", mensajeController.deleteMensaje);

module.exports = router;
