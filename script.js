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

    ];
    let indiceActual = 0;
    let respuestasCorrectas = 0; // Contador de respuestas correctas
    let intervalo; // Variable para el temporizador
    let tiempoRestante = 10; // Tiempo inicial del temporizador

    let btnSiguiente = document.getElementById('next-button');
    let respuestasContainer = document.getElementById('respuestas-container');
    let tiempoMostrado = document.getElementById('tiempo-restante');

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

        // Mostrar el temporizador
        tiempoMostrado.innerText = tiempoRestante;

        // Comenzar temporizador
        clearInterval(intervalo);
        intervalo = setInterval(function() {
            tiempoRestante--;
            tiempoMostrado.innerText = tiempoRestante;
            if (tiempoRestante <= 0) {
                clearInterval(intervalo);
                mostrarSiguientePregunta();
            }
        }, 1000);

        btnSiguiente.style.display = 'none';
        anime({
            targets: '#pregunta',
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo'
        });
    }

    function verificarRespuesta(i) {
        clearInterval(intervalo); // Detener el temporizador al responder
        if (i === preguntas[indiceActual].correcta) {
            respuestasCorrectas++; // Incrementar contador de respuestas correctas
        }

        if (indiceActual < preguntas.length - 1) {
            mostrarSiguientePregunta();
        } else {
            Swal.fire({
                title: '¡Fin del cuestionario!',
                text: 'Respuestas correctas: ' + respuestasCorrectas + '/' + preguntas.length,
                icon: 'info',
                confirmButtonText: 'OK'
            }).then(() => {
                Swal.fire({
                    title: '¿Quieres reiniciar el cuestionario?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Sí',
                    cancelButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload(); // Recarga la página para reiniciar el cuestionario
                    } else {
                        Swal.fire({
                            title: '¡Gracias por jugar!',
                            icon: 'success',
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                            showConfirmButton: false,
                        })
                    }
                });
            });
        }
    }

    function mostrarSiguientePregunta() {
        indiceActual++;
        tiempoRestante = 10; // Reiniciar temporizador
        mostrarPregunta();
    }

    function reiniciarCuestionario() {
        indiceActual = 0;
        respuestasCorrectas = 0;
        mostrarPregunta();
    }

    mostrarPregunta();
     document.getElementById('reiniciar-button').addEventListener('click', function() {
        location.reload(); // Recargar la página
    });
});