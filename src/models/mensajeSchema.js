const Joi = require("joi");

const mensajeSchema = Joi.object({
    id: Joi.number().integer().required(),
    titulo: Joi.string().min(3).max(100).required(),
    mensaje: Joi.string().min(5).max(500).required(),
});

module.exports = mensajeSchema;
