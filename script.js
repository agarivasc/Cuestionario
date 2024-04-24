document.addEventListener('DOMContentLoaded', function() {
    const preguntas = [
        {
            pregunta: '¿Cuál es la capital de Francia?',
            respuestas: ['París', 'Londres', 'Roma', 'Madrid'],
            correcta: 0
        },
        {
            pregunta: '¿Cuál es el río más largo del mundo?',
            respuestas: ['Nilo', 'Amazonas', 'Yangtsé', 'Misisipi'],
            correcta: 1
        },
        {
            pregunta: '¿Cuál es el océano más grande del mundo?',
            respuestas: ['Atlántico', 'Índico', 'Ártico', 'Pacífico'],
            correcta: 3
        },
        {
            pregunta: '¿Cuál es el país más grande del mundo?',
            respuestas: ['Canadá', 'China', 'Rusia', 'Estados Unidos'],
            correcta: 2
        },
        {
            pregunta: '¿Cuál es la montaña más alta del mundo?',
            respuestas: ['Monte Everest', 'Monte Aconcagua', 'Monte Kilimanjaro', 'Monte McKinley'],
            correcta: 0
        },
        {
            pregunta: '¿Cuál es el desierto más grande del mundo?',
            respuestas: ['Desierto del Sahara', 'Desierto de Atacama', 'Desierto de Gobi', 'Desierto de Kalahari'],
            correcta: 0
        },
        {
            pregunta: '¿Cuál es el lago más grande del mundo?',
            respuestas: ['Lago Superior', 'Lago Victoria', 'Lago Baikal', 'Lago Tanganica'],
            correcta: 2
        },
        {
            pregunta: '¿Cuál es el país más poblado del mundo?',
            respuestas: ['China', 'India', 'Estados Unidos', 'Indonesia'],
            correcta: 0
        },
        {
            pregunta: '¿Cuál es el país más pequeño del mundo?',
            respuestas: ['Mónaco', 'San Marino', 'Vaticano', 'Liechtenstein'],
            correcta: 2
        },
        {
            pregunta: '¿Cuál es el país más extenso de América?',
            respuestas: ['Canadá', 'Estados Unidos', 'Brasil', 'Argentina'],
            correcta: 0
        },
        // Agrega más preguntas aquí
    ];
    
    let indiceActual = 0;
    let btnSiguiente = document.getElementById('next-button');
    let respuestasContainer = document.getElementById('respuestas-container');

    function mostrarPregunta() {
        // Mostrar la pregunta
        document.getElementById('pregunta').innerText = preguntas[indiceActual].pregunta;

        // Limpiar las respuestas anteriores
        respuestasContainer.innerHTML = '';

        // Mostrar las opciones de respuesta
        preguntas[indiceActual].respuestas.forEach(function(respuesta, i) {
            let btn = document.createElement('button');
            btn.textContent = respuesta;
            btn.classList.add('respuesta-btn');
            btn.onclick = verificarRespuesta.bind(this, i);
            respuestasContainer.appendChild(btn);
        });

        btnSiguiente.style.display = 'none';
        anime({
            targets: '#pregunta',
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo'
        });
    }

    function verificarRespuesta(i) {
        if (i === preguntas[indiceActual].correcta) {
            if (indiceActual < preguntas.length - 1) {
                Swal.fire({
                    title: '¡Correcto!',
                    icon: 'success',
                    confirmButtonText: 'Siguiente',
                }).then((result) => {
                    if (result.isConfirmed) {
                        indiceActual++;
                        mostrarPregunta();
                    }
                });
            } else {
                Swal.fire({
                    title: '¡Correcto!',
                    text: '¡Has completado el cuestionario!',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload(); // Recarga la página
                    }
                });
            }
        } else {
            Swal.fire({
                title: 'Incorrecto',
                text: 'Intenta nuevamente.',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            });
        }
    }

    mostrarPregunta();
});