// Obtener referencias a los campos de entrada y a las listas de sugerencias
const inputCarrera = document.getElementById('inputCarrera');
const inputUniversidad = document.getElementById('inputUniversidad');
const sugerenciasCarreraList = document.getElementById('sugerenciasCarrera');
const sugerenciasUniversidadList = document.getElementById('sugerenciasUniversidad');

// Escuchar eventos de entrada en los campos de entrada
inputCarrera.addEventListener('input', buscarSugerencias);
inputUniversidad.addEventListener('input', buscarSugerencias);



// Función para buscar sugerencias
function buscarSugerencias() {
    const carrera = inputCarrera.value;
    const universidad = inputUniversidad.value;

    fetch(`/sugerencias?carrera=${encodeURIComponent(carrera)}&universidad=${encodeURIComponent(universidad)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al buscar sugerencias');
            }
            return response.json();
        })
        .then(sugerencias => {
            // Limpiar las listas de sugerencias
            sugerenciasCarreraList.innerHTML = '';
            sugerenciasUniversidadList.innerHTML = '';

            // Mostrar las sugerencias en las listas correspondientes
            sugerencias.carreras.forEach(sugerencia => {
                const li = document.createElement('li');
                li.textContent = sugerencia.nombre;
                sugerenciasCarreraList.appendChild(li);
            });

            sugerencias.universidades.forEach(sugerencia => {
                const li = document.createElement('li');
                li.textContent = sugerencia.nombre;
                sugerenciasUniversidadList.appendChild(li);
            });
        })
        .catch(error => console.error('Error al buscar sugerencias:', error));
}

// script.js

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Hacer una solicitud al servidor para obtener las carreras de programación
        const response = await fetch('/carreras/programacion');
        const carreras = await response.json();

        // Obtener el contenedor de carreras
        const carrerasContainer = document.getElementById('carrerasContainer');

        // Limpiar el contenedor
        carrerasContainer.innerHTML = '';

        // Mostrar cada carrera en una tarjeta
        carreras.forEach(carrera => {
            const card = document.createElement('div');
            card.classList.add('card');

            const nombre = document.createElement('h2');
            nombre.textContent = carrera.nombre;

            const descripcion = document.createElement('p');
            descripcion.textContent = carrera.descripcion;

            card.appendChild(nombre);
            card.appendChild(descripcion);

            carrerasContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error al obtener las carreras de programación:', error);
    }
});
