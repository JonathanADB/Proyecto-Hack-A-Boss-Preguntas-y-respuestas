"use strict"
let preguntasRespuestas;  
let preguntaActualIndex = 0;
let respuestasIncorrectas = 0;


function cargarPreguntasYMostrar() {
  fetch('preguntasRespuestas.json')
    .then(response => response.json())
    .then(data => {
      preguntasRespuestas = data;
      mostrarPreguntaYRespuestas();
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));
}


function mostrarPreguntaYRespuestas() {
  let preguntaActual = preguntasRespuestas[preguntaActualIndex];

  
  let preguntaParrafo = document.getElementById("pregunta");
  preguntaParrafo.textContent = "Pregunta: " + preguntaActual.question;

  
  let respuestasAleatorias = preguntaActual.answers.slice().sort(function() {
    return 0.5 - Math.random();
  });

  
  let respuestasContainer = document.getElementById("respuestas-container");
  respuestasContainer.innerHTML = ''; 

  respuestasAleatorias.forEach(function(respuesta) {
    let botonRespuesta = document.createElement("button");
    botonRespuesta.textContent = respuesta;
    botonRespuesta.classList.add("respuesta");
    botonRespuesta.addEventListener("click", function(event) {
      verificarRespuesta(respuesta, preguntaActual.correct, event.target);
    });
    respuestasContainer.appendChild(botonRespuesta);
  });
}


function verificarRespuesta(respuestaSeleccionada, respuestaCorrecta, botonRespuesta) {
  if (respuestaSeleccionada === respuestaCorrecta) {
    botonRespuesta.classList.add("correcta"); 
    alert("¡Respuesta correcta!");
  } else {
    botonRespuesta.classList.add("incorrecta");
    alert(`Respuesta incorrecta. La respuesta correcta es:${respuestaCorrecta}`);
    respuestasIncorrectas++;

    
    if (respuestasIncorrectas >= 7) {
      reiniciarJuego();
      return; 
    }
  }

  
  setTimeout(function() {
    botonRespuesta.classList.remove("correcta", "incorrecta"); 
    pasarAProximaPregunta();
  }, 2000);
}


function pasarAProximaPregunta() {
  preguntaActualIndex++;

 
  if (preguntaActualIndex < preguntasRespuestas.length) {
    mostrarPreguntaYRespuestas();
  } else {
    alert(`¡Felicidades! Has completado todas las preguntas. Puntuación final: ${preguntasRespuestas.length - respuestasIncorrectas}`);
    reiniciarJuego();
  }
}


function reiniciarJuego() {
  preguntaActualIndex = 0;
  respuestasIncorrectas = 0;
  alert("El juego ha sido reiniciado. ¡Inténtalo de nuevo suerte!");
  mostrarPreguntaYRespuestas();
}

function mostrarAyuda() {
  let ayudaActual = preguntasRespuestas[preguntaActualIndex].ayuda;
  alert(`Información de ayuda:${ ayudaActual}`);
}

document.addEventListener("DOMContentLoaded", cargarPreguntasYMostrar);
