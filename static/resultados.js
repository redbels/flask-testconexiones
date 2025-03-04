document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ `resultados.js` se está ejecutando correctamente.");

  // 1. Recuperar las respuestas almacenadas en localStorage
  let storedAnswers = localStorage.getItem("respuestasTest");
  if (!storedAnswers) {
    console.error("❌ No se encontraron respuestas almacenadas en localStorage.");
    const resultContainer = document.getElementById("result-container");
    if (resultContainer) {
      resultContainer.innerHTML = "<p>No se encontraron respuestas. Volvé a hacer el test.</p>";
    }
    return;
  }
  storedAnswers = JSON.parse(storedAnswers);
  console.log("Respuestas crudas almacenadas:", storedAnswers);

  // Convertir a array si es necesario
  if (!Array.isArray(storedAnswers)) {
    storedAnswers = Object.values(storedAnswers);
    console.log("Respuestas convertidas en array:", storedAnswers);
  }
  
  if (storedAnswers.length !== 20) {
    console.error("❌ Error: Se esperaban 20 respuestas, pero se recibieron:", storedAnswers.length);
    const resultContainer = document.getElementById("result-container");
    if (resultContainer) {
      resultContainer.innerHTML = "<p>Error: el número de respuestas es incorrecto. Volvé a hacer el test.</p>";
    }
    return;
  }

  // 2. Definir el mapeo de puntuación para cada pregunta (índices 0 a 19)
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
    },
    // Bloque 2: Interés y Esfuerzo
    {
      "Sí, se planifica y los propone.": 3,
      "A veces, pero no con tanta iniciativa.": 2,
      "No, siempre los propongo yo.": 1
    },
    {
      "Se muestra interesado.": 3,
      "Responde normal, sin mucho interés.": 2,
      "Evita la conversación o cambia de tema.": 1
    },
    {
      "Los organiza con tiempo y los cumple.": 3,
      "Los propone, pero a veces los cancelan.": 2,
      "Siempre son improvisados, nunca se compromete a nada.": 1
    },
    {
      "Sí, claramente.": 3,
      "No lo tengo claro, a veces sí a veces no.": 2,
      "No, siempre soy su último plan.": 1
    },
    // Bloque 3: Conexión Emocional
    {
      "Sí, me cuenta cosas importantes de su vida.": 3,
      "A veces, pero no demasiado.": 2,
      "No, evita esos temas o cambia la conversación.": 1
    },
    {
      "Sí, me presta atención real.": 3,
      "A veces, pero hay momentos en que se distancia.": 2,
      "No, siento que soy un pasatiempo más.": 1
    },
    {
      "No, siempre fue claro/a conmigo.": 3,
      "Fue muy ambiguo.": 2,
      "Sí, varias veces.": 1
    },
    {
      "No, siempre fue claro/a.": 3,
      "A veces sí, pero en general nos llevamos bien.": 2,
      "Sí, me da señales mixtas todo el tiempo.": 1
    },
    // Bloque 4: Actitud y Coherencia
    {
      "Sí, lo que dice y lo que hace están alineados.": 3,
      "A veces, pero noto contradicciones.": 2,
      "No, dice una cosa y hace otra.": 1
    },
    {
      "No, respeta mi vida personal.": 3,
      "A veces muestra interés o curiosidad.": 2,
      "Sí, pero después desaparece como si nada.": 1
    },
    {
      "No, habla del tema sin problemas.": 3,
      "A veces parece incómodo.": 2,
      "Sí, evita el tema o se pone a la defensiva.": 1
    },
    {
      "Sí, y estamos en la misma página.": 3,
      "Sí, pero no sé si estamos alineados.": 2,
      "No, nunca lo hablamos.": 1
    },
    // Bloque 5: Dinámica General
    {
      "Me escucha y busca entenderme.": 3,
      "Me escucha, pero no veo cambios.": 2,
      "Si lo toma mal o lo evita.": 1
    },
    {
      "No, sigue igual o incluso más interesado/a.": 3,
      "Sí, siento que está más frío/a ahora.": 2,
      "Sí, al principio era atento/a y ahora apenas responde.": 1
    },
    {
      "Me siento seguro/a, hay estabilidad.": 3,
      "A veces bien, a veces mal, no es claro.": 2,
      "Siento que me genera ansiedad constante.": 1
    },
    {
      "Muestra interés y busca saber qué pasa.": 3,
      "A veces lo nota, a veces no.": 2,
      "No se da cuenta o le da lo mismo.": 1
    }
  ];

  // 3. Función para calcular el puntaje total
  function calculateScore(answers) {
    let total = 0;
    if (answers.length !== 20) {
      console.error("❌ Error: Se esperaban 20 respuestas, pero se recibieron:", answers.length);
      return 0;
    }
    for (let i = 0; i < 20; i++) {
      const answer = answers[i];
      const mapping = scoreMapping[i];
      if (!mapping) {
        console.warn(`No se encontró mapeo para la pregunta ${i + 1}`);
        continue;
      }
      if (mapping[answer] !== undefined) {
        total += mapping[answer];
      } else {
        console.warn(`La respuesta '${answer}' en la pregunta ${i + 1} no tiene coincidencia en scoreMapping.`);
      }
    }
    return total;
  }

  // 4. Función para obtener el diagnóstico basado en el puntaje
  // Se definen 9 diagnósticos; a mayor puntaje, mejor resultado.
  function getDiagnosis(score) {
    if (score >= 56 && score <= 60) {
      return {
        title: "🟢 1. “Acá hay futuro”",
        translation: "Esto tiene toda la pinta de funcionar. No la cagues.",
        analysis: "Esta conexión muestra reciprocidad en el interés y la comunicación. No solo responde, sino que busca hablarte, te propone planes y demuestra entusiasmo. Según la Teoría de la Interdependencia, cuando dos personas invierten en la relación de forma equilibrada, la satisfacción se incrementa. Además, la Teoría del Espejo sugiere que una atracción genuina se refleja naturalmente. Acá lo que ves es lo que hay.",
        detected: "Interés mutuo: No sos el único que toma la iniciativa.\nFluidez en la comunicación: No hay juegos ni silencios estratégicos.\nPresencia activa: La otra persona te integra en sus planes y mantiene la conexión.",
        actions: [
          "Seguí conociéndolo/a sin apresurar las cosas.",
          "Asegurate de que este interés se mantenga en el tiempo y no sea solo una racha inicial.",
          "No dejes de lado tu vida por esto, pero disfrutá la conexión."
        ],
        future: "Si la dinámica sigue igual, es altamente probable que esta relación evolucione bien. La clave será mantener el equilibrio entre el interés mutuo y el respeto por el espacio personal."
      };
    } else if (score >= 51 && score <= 55) {
      return {
        title: "🟡 2. “Va bien, pero con ritmo propio”",
        translation: "Hay química, pero no están al mismo ritmo. Tranquilo, no fuerces nada.",
        analysis: "Tus respuestas indican un interés real, pero hay diferencias en frecuencia e iniciativa. Esto puede deberse a distintos estilos de apego. La Teoría del Ritmo Relacional sugiere que cada persona se involucra a su propio tiempo, y la Teoría de la Expectativa y la Realidad plantea que lo que esperás de la otra persona es fundamental. Las señales confusas pueden indicar que no procesa la relación con la misma intensidad que vos.",
        detected: "Interés, pero sin iniciativa constante.\nFluctuaciones en la comunicación y en el entusiasmo para hacer planes.",
        actions: [
          "Observá sin presionar: ¿Es su ritmo natural o solo tibieza?",
          "Evaluá si la dinámica te genera ansiedad.",
          "Enfocate en vos y en tu vida. Si la conexión es genuina, no necesita forzarse."
        ],
        future: "Si con el tiempo la conexión se equilibra, puede fluir bien. Pero si das más de lo que recibís, probablemente termine en frustración."
      };
    } else if (score >= 46 && score <= 50) {
      return {
        title: "🟡 3. “Ni fu, ni fa. ¿Qué onda con esto?”",
        translation: "No es malo, pero tampoco brilla. Está en un limbo entre el interés y la pereza emocional.",
        analysis: "La conexión tiene momentos de entusiasmo y distanciamiento. Esto puede ser una estrategia inconsciente de refuerzo intermitente, que engancha porque nunca sabés qué esperar. Si te sientes confundido, es una señal.",
        detected: "Interés tibio, sin mucha iniciativa.\nResponde, pero no impulsa la conexión.\nNo hay señales claras de avance ni de cierre.",
        actions: [
          "Preguntate si esto realmente te suma o si solo te acostumbraste a la incertidumbre.",
          "Observá si el interés sube al alejarte o sigue igual.",
          "No inviertas energía extra en algo que no te brinda seguridad."
        ],
        future: "Si nada cambia, la conexión se desvanecerá por falta de impulso real, y eventualmente terminará agotándote."
      };
    } else if (score >= 41 && score <= 45) {
      return {
        title: "🟠 4. “Te dan una de cal y otra de arena (y ya te mareaste)”",
        translation: "Un día parece que quiere todo, al siguiente desaparece. Y vos te estás volviendo loco/a tratando de entender.",
        analysis: "Este patrón de refuerzo intermitente te da lo justo para ilusionarte pero no lo suficiente para sentirte seguro. También se relaciona con el Apego Ansioso-Evitativo: se acerca cuando siente que lo estás perdiendo y se aleja cuando estás cerca.",
        detected: "Conexión intensa seguida de frialdad inexplicable.\nInconsistencia en la comunicación y en el interés.",
        actions: [
          "No intentes descifrarlo, poné límites y cuidá tu estabilidad.",
          "Reflexioná si realmente te suma o solo te engancha por la incertidumbre."
        ],
        future: "Si la dinámica continúa, puede volverse adictiva y desgastante, dejando una sensación de inseguridad constante."
      };
    } else if (score >= 36 && score <= 40) {
      return {
        title: "🟠 5. “Es como WiFi de aeropuerto: conexión inestable y sin contraseña”",
        translation: "A veces está, a veces no. No sabés si es desinterés o si simplemente vive en otro planeta.",
        analysis: "La relación muestra una conexión intermitente, asociada a un estilo de apego evitativo. Hay interés, pero no suficiente consistencia para desarrollar algo real.",
        detected: "Comunicación y atención inconsistentes.",
        actions: [
          "No te conformes con migajas de atención disfrazadas de fluidez.",
          "No inviertas más energía de la que recibís."
        ],
        future: "Si la forma de conectar no cambia, la relación probablemente terminará desgastándote emocionalmente."
      };
    } else if (score >= 31 && score <= 35) {
      return {
        title: "🔵 6. “Parece amor, pero es un espejismo en el desierto”",
        translation: "Te hace sentir especial a ratos, pero cuando te das vuelta, se evapora. Hay algo ahí, pero nunca lo suficiente.",
        analysis: "Existe una interacción intensa seguida de distanciamiento, característica de dinámicas de refuerzo intermitente. Esto te mantiene en un estado de espera y confusión.",
        detected: "Ilusiones intensas seguidas de frialdad.",
        actions: [
          "Reflexioná si esta incertidumbre realmente te beneficia.",
          "No confundas momentos de intensidad con una conexión profunda."
        ],
        future: "Si esta dinámica continúa, es probable que nunca logres una estabilidad emocional real en la relación."
      };
    } else if (score >= 27 && score <= 30) {
      return {
        title: "🔵 7. “Te responde con demora, pero te tiene en la mira”",
        translation: "No sos su prioridad, pero tampoco quiere perderte. No está completamente dentro, pero tampoco fuera.",
        analysis: "Te mantienen en un limbo emocional: te responde esporádicamente, manteniéndote a medias. Este comportamiento indica una falta de compromiso pleno.",
        detected: "Iniciativa parcial y respuestas esporádicas.",
        actions: [
          "No inviertas más energía de la que recibís.",
          "Observá si su comportamiento cambia cuando te alejas."
        ],
        future: "Continuar en este punto medio puede llevar a una relación indefinida y frustrante."
      };
    } else if (score >= 23 && score <= 26) {
      return {
        title: "🔴 8. “Te quiero, pero no lo suficiente”",
        translation: "Te aprecia, pero no te elige. Estás en su vida, pero no en el lugar que deseás.",
        analysis: "Aunque existe interés, no es el suficiente para dar el siguiente paso. Si realmente te valorara, no tendrías que cuestionarte tu lugar en su vida.",
        detected: "Interés parcial, barreras invisibles al acercamiento.",
        actions: [
          "Aceptá la realidad tal cual es.",
          "No sobreinterpretes gestos pequeños.",
          "Si la otra persona no se compromete, hacete cargo de tu seguridad emocional."
        ],
        future: "Persistir en esta dinámica probablemente te mantenga en un limbo eterno."
      };
    } else if (score >= 19 && score <= 22) {
      return {
        title: "🔴 9. “Te estás boludeando, salí de ahí”",
        translation: "Si fueras más invisible, serías un fantasma. Si alguien te quiere, no te deja dudando constantemente.",
        analysis: "Si tenés que cuestionar continuamente si le importás, es señal de falta de compromiso real. La inconsistencia en la atención genera una dependencia emocional insana.",
        detected: "Atención intermitente y falta de compromiso real.",
        actions: [
          "Dejá de esperar un cambio que no va a llegar.",
          "Tomá distancia y poné límites claros."
        ],
        future: "Seguir en esta dinámica probablemente te desgastará emocionalmente y te impedirá crecer."
      };
    } else {
      return {
        title: "Diagnóstico Indeterminado",
        translation: "",
        analysis: "Los resultados no se pudieron clasificar adecuadamente. Revisa tus respuestas y vuelve a intentarlo.",
        detected: "",
        actions: [
          "Volvé a realizar el test.",
          "Consultá con un profesional para un análisis más detallado."
        ],
        future: "Una revisión externa podría ayudarte a identificar áreas de mejora."
      };
    }
  }

  // 5. Calcular el puntaje y obtener el diagnóstico
  const score = calculateScore(storedAnswers);
  console.log("Puntaje final:", score);
  const diagnosis = getDiagnosis(score);
  console.log("Diagnóstico seleccionado:", diagnosis);

  // 6. Mostrar el diagnóstico en la página
  const resultContainer = document.getElementById("result-container");
  if (!resultContainer) {
    console.error("❌ ERROR: No se encontró el contenedor de resultados.");
    return;
  }
  resultContainer.innerHTML = `
    <h2>${diagnosis.title}</h2>
    <p><strong>Traducción más directa:</strong> ${diagnosis.translation}</p>
    <p><strong>Análisis basado en el diagnóstico:</strong> ${diagnosis.analysis}</p>
    <p><strong>Detectado patrón en tus respuestas:</strong><br>${diagnosis.detected.replace(/\n/g, "<br>")}</p>
    <p><strong>Qué podés hacer ahora:</strong></p>
    <ul>${diagnosis.actions.map(action => `<li>${action}</li>`).join("")}</ul>
    <p><strong>¿Qué significa esto a largo plazo?:</strong> ${diagnosis.future}</p>
  `;
});
