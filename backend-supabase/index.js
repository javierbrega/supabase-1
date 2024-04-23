const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Configurar Express
const app = express();
const port = process.env.PORT || 3000;

// Configurar Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Aquí maneja la lógica para buscar sugerencias en la base de datos
app.get('/sugerencias', async (req, res) => {
    try {
        const carrera = req.query.carrera;
        const universidad = req.query.universidad;

        // Construir la consulta SQL para buscar sugerencias
        const { data, error } = await supabase
            .from('carreras')
            .select('*')
            .ilike('nombre', `%${carrera}%`)
            .ilike('institucion', `%${universidad}%`);
        
        if (error) throw error;

        // Enviar los resultados como respuesta
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Ruta de prueba
app.get('/', async (req, res) => {
    try {
        // Mensaje simple para indicar que la base de datos está conectada
        const message = "¡Base de datos conectada! 🎉";

        res.send(`<h1 style="text-align: center; color: green;">${message}</h1>`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
