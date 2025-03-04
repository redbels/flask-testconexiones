document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ resultados.js se ejecutó correctamente");

    let respuestas = JSON.parse(localStorage.getItem("respuestasTest"));

    if (!respuestas || Object.keys(respuestas).length < 20) {
        document.body.innerHTML = "<h1>Error: No hay respuestas guardadas o el test no está completo.</h1>";
        return;
    }

    let puntaje = calcularPuntaje(respuestas);
    let resultado = obtenerDiagnostico(puntaje);

    // 📌 Insertar resultados en el HTML
    document.getElementById("titulo-resultado").textContent = resultado.titulo;
    document.getElementById("traduccion").textContent = resultado.traduccion;
    document.getElementById("analisis").textContent = resultado.analisis;

    let accionesLista = document.getElementById("acciones");
    resultado.acciones.forEach(accion => {
        let li = document.createElement("li");
        li.textContent = accion;
        accionesLista.appendChild(li);
    });

    document.getElementById("futuro").textContent = resultado.futuro;

    // 📌 Agregar funcionalidad a los botones
    document.getElementById("share").addEventListener("click", compartirResultado);
    document.getElementById("download").addEventListener("click", enviarPorMail);
    document.getElementById("consult").addEventListener("click", abrirReflexion);
});

// 📌 Función para calcular el puntaje basado en respuestas
function calcularPuntaje(respuestas) {
    let puntaje = 0;

    // 📌 Ponderación de cada respuesta según el impacto en la relación
    let puntajes = {
        "diario": 2, "siempre": 2, "entusiasmo": 2,  // Respuestas claramente positivas
        "moderado": 1, "a_veces": 1, "neutral": 0,  // Respuestas intermedias
        "poco": -1, "nunca": -1, "evasivo": -2, "fantasma": -3  // Respuestas negativas
    };

    // Sumar puntajes de cada respuesta dada
    Object.values(respuestas).forEach(valor => {
        puntaje += puntajes[valor] || 0; // Si el valor no está en la tabla, suma 0
    });

    return puntaje;
}

// 📌 Función para obtener el diagnóstico basado en el puntaje final
function obtenerDiagnostico(puntaje) {
    if (puntaje > 15) {
        return {
            titulo: "¡Acá hay futuro! 🚀",
            traduccion: "Todo fluye, no hay dudas ni juegos. Esto va bien.",
            analisis: "La comunicación es clara, hay reciprocidad e interés real. La estabilidad en el vínculo indica que ambos tienen un apego seguro o una intención clara de construir algo sano.",
            acciones: [
                "🔥 Seguí disfrutando sin sobreanalizar cada detalle.",
                "📅 Generá más experiencias juntos, pero sin apurar nada.",
                "🛑 No te dejes llevar por la ansiedad, dejá que las cosas fluyan."
            ],
            futuro: "Si sigue así, esto puede ser el inicio de una relación sana y estable."
        };
    } else if (puntaje > 10) {
        return {
            titulo: "Va bien, pero no corras 🏃‍♂️",
            traduccion: "Hay química, pero no están al mismo ritmo.",
            analisis: "Parece que hay conexión, pero uno avanza más rápido que el otro. Puede ser una cuestión de tiempos emocionales o diferencias en la forma de vincularse.",
            acciones: [
                "📉 Observá si la otra persona te sigue el ritmo sin que tengas que empujar.",
                "🗣 Si sentís ansiedad por la incertidumbre, hablalo.",
                "🚀 No pongas toda tu energía si sentís que no hay reciprocidad total."
            ],
            futuro: "Si logran alinearse, esto puede crecer. Si no, la diferencia de ritmos podría generar frustración."
        };
    } else if (puntaje > 5) {
        return {
            titulo: "Te da señales mixtas 📡",
            traduccion: "A veces parece interesado/a, a veces no. Y eso te tiene confundido/a.",
            analisis: "Es posible que disfrute la conexión, pero no tenga claro qué quiere. También puede ser que tenga un estilo evitativo y se aleje cuando siente que la cosa se vuelve más seria.",
            acciones: [
                "🛑 No sobreinterpretes cada gesto, mirá la constancia.",
                "📉 Si te hace dudar más de lo que te hace sentir bien, revisá si esto vale la pena.",
                "🗣 Si querés algo serio, plantealo y mirá su reacción."
            ],
            futuro: "Si no se define en un tiempo razonable, es probable que siga en esta zona gris hasta que vos te canses."
        };
    } else if (puntaje > 0) {
        return {
            titulo: "No está muy interesado/a 😬",
            traducción: "Si tenés que preguntarte si le gustás, la respuesta probablemente sea 'no lo suficiente'.",
            analisis: "Las señales indican falta de reciprocidad. Puede haber interés superficial, pero no suficiente intención de avanzar.",
            acciones: [
                "📉 No persigas: lo que es real se da sin esfuerzo excesivo.",
                "🛑 Si te sentís ansioso/a por su falta de claridad, escuchá esa sensación.",
                "💡 Si la otra persona quisiera verte más seguido, lo haría."
            ],
            futuro: "Si la dinámica sigue igual, es poco probable que esto se transforme en algo serio."
        };
    } else {
        return {
            titulo: "Te está boludeando, salí de ahí 💀",
            traducción: "Si alguien quiere, se nota. Acá no se está notando.",
            analisis: "La falta de interés es clara. No es que 'no tiene tiempo' o 'es distraído/a', es que simplemente no prioriza la conexión.",
            acciones: [
                "🚪 Aceptá la realidad: no sos su prioridad.",
                "🛑 No sigas justificando su indiferencia.",
                "🔥 Redirigí tu energía a alguien que realmente te valore."
            ],
            futuro: "Si seguís en esto, lo único que va a pasar es que pierdas más tiempo. Y merecés algo mejor."
        };
    }
}

// 📌 Funciones para compartir y reflexionar
function compartirResultado() {
    alert("Función de compartir en redes aún en desarrollo 🚀");
}
function enviarPorMail() {
    alert("Función de envío por mail aún en desarrollo 📩");
}
function abrirReflexion() {
    alert("Aquí podríamos agregar un link para contactar con profesionales. 🧠");
}
