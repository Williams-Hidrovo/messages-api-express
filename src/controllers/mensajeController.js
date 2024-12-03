const mensajes = [
    {
        id: 1,
        titulo: "metodos C#",
        mensaje: "lenguaje que se origino de c++",
    },
    {
        id: 2,
        titulo: "metodos Api",
        mensaje: "devolvera respuestas a solicitudes http",
    },
    {
        id: 3,
        titulo: "metodos javascript",
        mensaje: "usados por node para aplicaciones del servidor",
    },
];

// Obtener todos los mensajes
const getMensajes = (req, res) => {
    res.json(mensajes);
};

// Buscar mensaje por ID
const getMensajeById = (req, res, next) => {
    const id = parseInt(req.params.mensajeId, 10);
    const mensaje = mensajes.find((m) => m.id === id);

    if (!mensaje) {
        const error = new Error("Mensaje no encontrado.");
        error.status = 404;
        return next(error);
    }

    res.json(mensaje);
};

// Agregar un nuevo mensaje
const addMensaje = (req, res, next) => {
    const { id, titulo, mensaje } = req.body;

    if (!id || !titulo || !mensaje) {
        const error = new Error("Todos los campos son requeridos.");
        error.status = 400;
        return next(error);
    }

    mensajes.push({ id, titulo, mensaje });
    res.status(201).json({ id, titulo, mensaje });
};

// Eliminar un mensaje por ID
const deleteMensaje = (req, res, next) => {
    const id = parseInt(req.params.mensajeId, 10);
    const index = mensajes.findIndex((m) => m.id === id);

    if (index === -1) {
        return res.status(404).json({ message: `No existe el mensaje con ID ${id}` });
    }

    mensajes.splice(index, 1);
    res.json({ message: `Mensaje con ID ${id} eliminado exitosamente.` });
};

module.exports = {
    getMensajes,
    getMensajeById,
    addMensaje,
    deleteMensaje,
};
