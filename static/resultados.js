document.addEventListener("DOMContentLoaded", function () {
  const storedAnswers = JSON.parse(localStorage.getItem("respuestasTest"));
  const resultContainer = document.getElementById("result-container");

  if (!storedAnswers) {
    resultContainer.innerHTML = "<p>No se encontraron respuestas. Volvé a hacer el test.</p>";
    return;
  }

  // Mapeo de puntuación para cada pregunta
  const scoreMapping = [
    // Bloque 1: Comunicación y Contacto
    {
      "Todos los días con interés.": 3,
      "Me responde, pero a veces tarda mucho.": 2,
      "Solo me habla cuando yo escribo primero.": 1,
      "Aparece y desaparece sin lógica.": 0
    },
    {
      "Sí, le interesa hablar conmigo.": 3,
      "A veces sí, a veces no.": 2,
      "No, siempre tengo que escribir primero.": 1
    },
    {
      "Responde rápido y con interés.": 3,
      "A veces responde al instante, a veces tarda horas o días.": 2,
      "Siempre deja los mensajes en visto por horas/días sin motivo.": 1
    },
    {
      "Nunca, siempre mantiene el contacto.": 3,
      "Alguna vez, pero lo hablamos.": 2,
      "Sí, varias veces, y cuando vuelve actúa como si nada.": 1
    }
  ];

  function calculateScore(answers) {
    let total = 0;
    for (let i = 0; i < Object.keys(answers).length; i++) {
      const answer = answers[i];
      const mapping = scoreMapping[i];
      if (mapping && mapping[answer] !== undefined) {
        total += mapping[answer];
      }
    }
    return total;
  }

  const score = calculateScore(storedAnswers);

  function getDiagnosis(score) {
    if (score >= 56 && score <= 60) {
      return {
        title: "🟢 1. “Acá hay futuro”",
        translation: "Esto tiene toda la pinta de funcionar. No la cagues.",
        analysis: "Esta conexión muestra reciprocidad en el interés y la comunicación...",
        detected: "Interés mutuo: No sos el único que toma la iniciativa.",
        actions: [
          "Seguí conociéndolo/a sin apresurar las cosas.",
          "Asegurá que este interés se mantenga en el tiempo.",
          "No dejes de lado tu vida por esto, pero disfrutá la conexión."
        ],
        future: "Si la dinámica sigue igual, es altamente probable que esta relación evolucione bien."
      };
    } else if (score >= 51 && score <= 55) {
      return {
        title: "🟡 2. “Va bien, pero con ritmo propio”",
        translation: "Hay química, pero no están al mismo ritmo. Tranquilo, no fuerces nada.",
        analysis: "Tus respuestas indican que hay un interés real, pero con ciertas diferencias en la frecuencia y la iniciativa...",
        detected: "Hay interés, pero no hay iniciativa constante.",
        actions: [
          "Observá sin presionar.",
          "Evaluá si te sentís bien con esta dinámica.",
          "Enfócate en vos y en tu vida."
        ],
        future: "Depende de si esta diferencia de ritmos se mantiene o si se encuentra un punto medio."
      };
    } else if (score >= 46 && score <= 50) {
      return {
        title: "🟡 3. \"Ni fu, ni fa. ¿Qué onda con esto?\"",
        translation: "No es malo, pero tampoco brilla. Está en un limbo entre el interés y la pereza emocional.",
        analysis: "La conexión tiene momentos de entusiasmo mezclados con distanciamientos repentinos...",
        detected: "Interés tibio, sin demasiada iniciativa.",
        actions: [
          "Preguntate si realmente esto te suma.",
          "Observá si el interés sube cuando te alejás.",
          "No pongas energía extra en algo que no te da seguridad."
        ],
        future: "Si nada cambia, esta conexión se va a desvanecer por falta de impulso real."
      };
    } else {
      return {
        title: "🔴 9. \"Te estás boludeando, salí de ahí\"",
        translation: "Si fueras más invisible, serías un fantasma.",
        analysis: "Si tenés que preguntarte constantemente si le importas, ya tenés la respuesta: no lo suficiente.",
        detected: "Aparece y desaparece sin aviso.",
        actions: [
          "Dejá de esperar a que cambie, porque no va a pasar.",
          "No sigas jugando su juego: tomá distancia sin avisar.",
          "Si te busca cuando te alejás, no es amor, es control."
        ],
        future: "Seguir en esta situación solo te va a desgastar emocionalmente."
      };
    }
  }

  const diagnosis = getDiagnosis(score);

  resultContainer.innerHTML = `
    <h2>${diagnosis.title}</h2>
    <p><strong>Traducción más directa:</strong> ${diagnosis.translation}</p>
    <p><strong>Análisis basado en el diagnóstico:</strong> ${diagnosis.analysis}</p>
    <p><strong>Detectado patrón en tus respuestas:</strong><br>${diagnosis.detected}</p>
    <p><strong>Qué podés hacer ahora:</strong></p>
    <ul>${diagnosis.actions.map(action => `<li>${action}</li>`).join("")}</ul>
    <p><strong>¿Qué significa esto a largo plazo?:</strong> ${diagnosis.future}</p>
  `;

  // Botón para reiniciar el test
  document.getElementById("restart-button").addEventListener("click", function () {
    localStorage.removeItem("respuestasTest");
    window.location.href = "/";
  });
});
