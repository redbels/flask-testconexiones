document.addEventListener("DOMContentLoaded", function () {
  const storedAnswers = JSON.parse(localStorage.getItem("respuestasTest"));
  const resultContainer = document.getElementById("result-container");

  if (!storedAnswers) {
    resultContainer.innerHTML = "<p>No se encontraron respuestas. Volvé a hacer el test.</p>";
    return;
  }

  // Validar cantidad de respuestas
  const answerCount = Object.keys(storedAnswers).length;
  console.log("Cantidad de respuestas guardadas:", answerCount);

  if (answerCount < 20) {
    resultContainer.innerHTML = `<p>Error: Solo se guardaron ${answerCount} respuestas. Vuelve a hacer el test.</p>`;
    return;
  }

  function calculateScore(answers) {
    let totalScore = 0;
    Object.values(answers).forEach(answer => {
      totalScore += scoreMapping[answer] || 0;
    });
    console.log("Puntaje final calculado:", totalScore);
    return totalScore;
  }

  const score = calculateScore(storedAnswers);

  function getDiagnosis(score) {
    if (score >= 56) {
      return {
        title: "🟢 1. “Acá hay futuro”",
        translation: "Esto tiene toda la pinta de funcionar. No la cagues.",
        analysis: "Esta conexión muestra reciprocidad en el interés y la comunicación. No solo responde, sino que busca hablarte, te propone planes y demuestra entusiasmo.",
        detected: "Interés mutuo: No sos el único que toma la iniciativa.\nFluidez en la comunicación: No hay juegos ni silencios estratégicos.\nPresencia activa: La otra persona busca verte y mantiene la conexión.",
        actions: [
          "Seguí conociéndolo/a sin apresurar las cosas.",
          "Asegurate de que este interés se mantenga en el tiempo y no sea solo una racha inicial.",
          "No dejes de lado tu vida por esto, pero disfrutá la conexión."
        ],
        future: "Si la dinámica sigue igual, es altamente probable que esta relación evolucione bien."
      };
    } else if (score >= 51) {
      return {
        title: "🟡 2. “Va bien, pero con ritmo propio”",
        translation: "Hay química, pero no están al mismo ritmo. Tranquilo, no fuerces nada.",
        analysis: "Tus respuestas indican que hay un interés real, pero con ciertas diferencias en la frecuencia y la iniciativa.",
        detected: "Hay interés, pero no hay iniciativa constante.\nNo siempre está disponible emocionalmente en el mismo nivel que vos.\nFluctuaciones en la comunicación y el entusiasmo para hacer planes.",
        actions: [
          "Observar sin presionar.",
          "Evaluar si te sentís bien con esta dinámica o si te genera ansiedad.",
          "Enfocarte en vos y en tu vida. Si es una conexión genuina, no necesita ser forzada."
        ],
        future: "Depende de si esta diferencia de ritmos se mantiene o si se encuentra un punto medio."
      };
    } else if (score >= 46) {
      return {
        title: "🟡 3. \"Ni fu, ni fa. ¿Qué onda con esto?\"",
        translation: "No es malo, pero tampoco brilla. Está en un limbo entre el interés y la pereza emocional.",
        analysis: "La conexión tiene momentos de entusiasmo mezclados con distanciamientos repentinos.",
        detected: "Interés tibio, sin demasiada iniciativa.\nResponde, pero no impulsa la conexión.\nNo hay señales claras de avance ni de cierre.",
        actions: [
          "Preguntate si realmente esto te suma o si solo te acostumbraste a la incertidumbre.",
          "Observá si el interés de la otra persona sube cuando te alejás o si sigue igual.",
          "No pongas energía extra en algo que no te da seguridad ni entusiasmo."
        ],
        future: "Si nada cambia, esta conexión se va a desvanecer por falta de impulso real."
      };
    } else if (score >= 41) {
      return {
        title: "🟠 4. \"Te dan una de cal y otra de arena (y ya te mareaste)\"",
        translation: "Un día parece que quiere todo, al siguiente desaparece. Y vos te estás volviendo loco/a tratando de entender.",
        analysis: "Este tipo de dinámica es un clásico del refuerzo intermitente: te da lo justo para que te ilusiones, pero no lo suficiente para sentirte seguro/a.",
        detected: "Momentos de conexión intensos seguidos de frialdad inexplicable.\nInconsistencia en la comunicación y el nivel de interés.\nTe deja con dudas más seguido de lo que te da certezas.",
        actions: [
          "No entres en el juego de intentar descifrarlo/a.",
          "Poné límites: una conexión real no debería hacerte sentir inestable.",
          "Preguntate si esto te suma o si solo te engancha por la incertidumbre."
        ],
        future: "Si sigue igual, solo te generará ansiedad y desgaste."
      };
    } else if (score >= 36) {
      return {
        title: "🟠 5. \"Es como WiFi de aeropuerto: conexión inestable y sin contraseña\"",
        translation: "A veces está, a veces no. No sabés si es desinterés o si simplemente vive en otro planeta.",
        analysis: "La relación es intermitente y sin compromiso.",
        detected: "La comunicación y el interés van y vienen sin lógica.\nNo hay una clara intención de avanzar o profundizar el vínculo.\nTe deja más dudas que certezas sobre lo que siente.",
        actions: [
          "Analizar si esta persona realmente quiere estar con vos.",
          "No te conformes con migajas de atención disfrazadas de 'fluidez'.",
          "No pongas más energía de la que te está devolviendo."
        ],
        future: "Si esta persona no cambia, la historia seguirá igual."
      };
    } else {
      return {
        title: "🔴 9. \"Te estás boludeando, salí de ahí\"",
        translation: "Si tenés que preguntarte si le importás, ya sabés la respuesta.",
        analysis: "Falta total de compromiso y reciprocidad.",
        detected: "No hay interés real.",
        actions: [
          "Dejá de esperar a que cambie.",
          "No sigas en una relación sin reciprocidad."
        ],
        future: "Seguir en esto solo te desgastará emocionalmente."
      };
    }
  }

  const diagnosis = getDiagnosis(score);

  resultContainer.innerHTML = `<h2>${diagnosis.title}</h2>
    <p>${diagnosis.translation}</p>
    <p>${diagnosis.analysis}</p>
    <p>${diagnosis.detected}</p>
    <h3>¿Qué podés hacer?</h3>
    <ul>${diagnosis.actions.map(action => `<li>${action}</li>`).join('')}</ul>
    <h3>Futuro probable:</h3>
    <p>${diagnosis.future}</p>`;
});
