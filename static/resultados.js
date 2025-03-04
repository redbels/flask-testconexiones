document.addEventListener("DOMContentLoaded", function () {
  const storedAnswers = JSON.parse(localStorage.getItem("respuestasTest"));
  const resultContainer = document.getElementById("result-container");

  if (!storedAnswers) {
    resultContainer.innerHTML = "<p>No se encontraron respuestas. Volvé a hacer el test.</p>";
    return;
  }

  // Mapeo de puntuación para las 20 preguntas
  // La pregunta 1 tiene 4 opciones y las preguntas 2 a 20 tienen 3 opciones.
  // Se asignan los valores de acuerdo a la tabla revisada:
  // En cada pregunta la opción más positiva vale 3, la intermedia 2, y la menos positiva 0.
  const scoreMapping = {
    // Pregunta 1 (4 opciones)
    "Todos los días con interés.": 3, 
    "Me responde, pero a veces tarda mucho.": 2,
    "Solo me habla cuando yo escribo primero.": 1,
    "Aparece y desaparece sin lógica.": 0,

    // Pregunta 2
    "Sí, le interesa hablar conmigo.": 3, 
    "A veces sí, a veces no.": 2,
    "No, siempre tengo que escribir primero.": 0,

    // Pregunta 3
    "Responde rápido y con interés.": 3, 
    "A veces responde al instante, a veces tarda horas o días.": 2,
    "Siempre deja los mensajes en visto por horas/días sin motivo.": 0,

    // Pregunta 4
    "Nunca, siempre mantiene el contacto.": 3, 
    "Alguna vez, pero lo hablamos.": 2,
    "Sí, varias veces, y cuando vuelve actúa como si nada.": 0,

    // Pregunta 5
    "Sí, se planifica y los propone.": 3, 
    "A veces, pero no con tanta iniciativa.": 2,
    "No, siempre los propongo yo.": 0,

    // Pregunta 6
    "Se muestra interesado.": 3, 
    "Responde normal, sin mucho interés.": 2,
    "Evita la conversación o cambia de tema.": 0,

    // Pregunta 7
    "Los organiza con tiempo y los cumple.": 3, 
    "Los propone, pero a veces los cancelan.": 2,
    "Siempre son improvisados, nunca se compromete a nada.": 0,

    // Pregunta 8
    "Sí, claramente.": 3, 
    "No lo tengo claro, a veces sí a veces no.": 2,
    "No, siempre soy su último plan.": 0,

    // Pregunta 9
    "Sí, me cuenta cosas importantes de su vida.": 3, 
    "A veces, pero no demasiado.": 2,
    "No, evita esos temas o cambia la conversación.": 0,

    // Pregunta 10
    "Sí, me presta atención real.": 3, 
    "A veces, pero hay momentos en que se distancia.": 2,
    "No, siento que soy un pasatiempo más.": 0,

    // Pregunta 11
    "No, siempre fue claro/a conmigo.": 3, 
    "Fue muy ambiguo.": 2,
    "Sí, varias veces.": 0,

    // Pregunta 12
    "No, siempre fue claro/a.": 3, 
    "A veces sí, pero en general nos llevamos bien.": 2,
    "Sí, me da señales mixtas todo el tiempo.": 0,

    // Pregunta 13
    "Sí, lo que dice y lo que hace están alineados.": 3, 
    "A veces, pero noto contradicciones.": 2,
    "No, dice una cosa y hace otra.": 0,

    // Pregunta 14
    "No, respeta mi vida personal.": 3, 
    "A veces muestra interés o curiosidad.": 2,
    "Sí, pero después desaparece como si nada.": 0,

    // Pregunta 15
    "Me siento seguro/a, hay estabilidad.": 3, 
    "A veces bien, a veces mal, no es claro.": 2,
    "Siento que me genera ansiedad constante.": 0,

    // Pregunta 16
    "Muestra interés y busca saber qué pasa.": 3, 
    "A veces lo nota, a veces no.": 2,
    "No se da cuenta o le da lo mismo.": 0,

    // Pregunta 17
    "No, habla del tema sin problemas.": 3, 
    "A veces parece incómodo.": 2,
    "Sí, evita el tema o se pone a la defensiva.": 0,

    // Pregunta 18
    "Sí, y estamos en la misma página.": 3, 
    "Sí, pero no sé si estamos alineados.": 2,
    "No, nunca lo hablamos.": 0,

    // Pregunta 19
    "Me escucha y busca entenderme.": 3, 
    "Me escucha, pero no veo cambios.": 2,
    "Si lo toma mal o lo evita.": 0,

    // Pregunta 20
    "No, sigue igual o incluso más interesado/a.": 3, 
    "Sí, siento que está más frío/a ahora.": 2,
    "Sí, al principio era atento/a y ahora apenas responde.": 0
  };

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
    } else if (score >= 31) {
      return {
        title: "🔵 6. \"Parece amor, pero es un espejismo en el desierto\"",
        translation: "Te hace sentir especial a ratos, pero cuando te das vuelta, se evapora.",
        analysis: "Las respuestas reflejan un patrón de interacción intensa y luego distanciamiento.",
        detected: "Te ilusiona con gestos fuertes, pero luego se enfría sin motivo.\nCuando lo/la sentís lejos, de golpe vuelve con intensidad.\nTe deja con más preguntas que respuestas sobre lo que realmente siente.",
        actions: [
          "Observar los patrones, no solo los momentos lindos.",
          "No confundas intensidad con conexión real.",
          "Si una relación te genera más ansiedad que disfrute, algo no está bien."
        ],
        future: "Si sigue así, nunca llegará a una estabilidad real."
      };
    } else if (score >= 27) {
      return {
        title: "🔵 7. \"Te responde con demora, pero te tiene en la mira\"",
        translation: "No sos su prioridad, pero tampoco quiere perderte.",
        analysis: "La persona no se compromete del todo, pero tampoco te deja ir.",
        detected: "No toma iniciativa real, pero tampoco te deja ir.\nAparece cuando siente que te estás alejando.\nLas conversaciones son irregulares, y a veces sentís que te habla por inercia más que por interés genuino.",
        actions: [
          "No pongas más energía de la que recibís.",
          "Si esta persona solo aparece cuando vos insistís, ya tenés la respuesta."
        ],
        future: "Si sigue igual, solo estarás perdiendo tiempo."
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

  resultContainer.innerHTML = `<h2>${diagnosis.title}</h2><p>${diagnosis.translation}</p><p>${diagnosis.detected}</p>`;
});
});
