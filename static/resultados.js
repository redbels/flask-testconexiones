document.addEventListener("DOMContentLoaded", function () {
  const storedAnswers = JSON.parse(localStorage.getItem("respuestasTest"));
  const resultContainer = document.getElementById("result-container");

  if (!storedAnswers) {
    resultContainer.innerHTML = "<p>No se encontraron respuestas. Volvé a hacer el test.</p>";
    return;
  }

  // Mapeo de puntuación para cada pregunta (índice 0 a 19)
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
      "Se muestra interesado": 3,
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
      "No lo tengo claro, a veces sí ya veces no.": 2,
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
      "Sí, al principio era atento/ay ahora apenas responde.": 1
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

  function calculateScore(answers) {
    let total = 0;
    for (let i = 0; i < scoreMapping.length; i++) {
      const answer = answers[i];
      const mapping = scoreMapping[i];
      if (mapping[answer] !== undefined) {
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
        analysis: "Esta conexión muestra reciprocidad en el interés y la comunicación. No solo responde, sino que busca hablarte, te propone planes y demuestra entusiasmo. Según la Teoría de la Interdependencia , cuando dos personas invierten en la relación de forma equilibrada, la satisfacción m\nAdemás, la Teoría del Espejo sugiere que cuando alguien siente una atracción genuina y conexión emocional, refleja de manera natural su nivel de interés. Acá no hay que analizar demasiado: lo que ves es lo que hay.",
        detected: "Interés mutuo: No sos el único que toma la iniciativa.\nFluidez en la comunicación: No hay juegos ni silencios estratégicos.\nPresencia activa: La otra persona busca verte, te integra en sus planes y mantiene la conexión.",
        actions: [
          "Seguí conociéndolo/a sin apresurar las cosas.",
          "Asegúrese de que este interés se mantenga en el tiempo y no sea solo una racha inicial.",
          "No dejes de lado tu vida por esto, pero disfrutá la conexión."
        ],
        future: "Si la dinámica sigue igual, es altamente probable que esta relación evolucione bien. La clave será mantener el equilibrio entre el interés mutuo y el respeto por el espacio personal.\nLas relaciones sanas no se sienten como un rompecabezas. Si esto fluye, es porque funciona. 🚀🔥"
      };
    } else if (score >= 51 && score <= 55) {
      return {
        title: "🟡 2. “Va bien, pero con ritmo propio”",
        translation: "Hay química, pero no están al mismo ritmo. Tranquilo, no fuerces nada.",
        analysis: "Tus respuestas indican que hay un interés real, pero con ciertas diferencias en la frecuencia y la iniciativa. Esto puede deberse a distintos estilos de apego o ritmos personales en la vinculación. Según la Teoría del Ritmo Relacional , cada persona se involucra emocionalmente a su propio tiempo, y cuando las velocidades no coinciden, uno de los dos suele sentir ansiedad o inseguridad.\nPor otro lado, la Teoría de la Expectativa y la Realidad sugiere que el problema no es solo lo que la otra persona hace, sino lo que vos esperas que haga. Si sentiste que a veces te da señales confusas, puede ser porque no está procesando la relación con la misma intensidad que vos.",
        detected: "Hay interés, pero no hay iniciativa constante.\nNo siempre estás disponible emocionalmente en el mismo nivel que tú.\nFluctuaciones en la comunicación y en el entusiasmo para hacer planes.",
        actions: [
          "Observará sin presionar: ¿Es su ritmo natural o solo tibieza?",
          "Evalúá si te sentiste bien con esta dinámica o si te genera ansiedad.",
          "Enfócate en vos y en tu vida. Si es una conexión genuina, no necesita ser forzada."
        ],
        future: "Depende de si esta diferencia de ritmos se mantiene o si se encuentra un punto medio. Si con el tiempo la conexión se equilibra, puede fluir bien. Pero si sigues sintiendo que das más de lo que recibes, es probable que esto termine en frustración.\nA veces, no es que no funcione, sino que no funciona ahora . ⏳"
      };
    } else if (score >= 46 && score <= 50) {
      return {
        title: "🟡 3. \"Ni fu, ni fa. ¿Qué onda con esto?\"",
        translation: "No es malo, pero tampoco brilla. Está en un limbo entre el interés y la pereza emocional.",
        analysis: "La conexión tiene momentos de entusiasmo mezclados con distanciamientos repentinos. Esto puede ser una estrategia inconsciente de refuerzo intermitente , que genera más enganche porque nunca sabés qué esperar. Si te sentiste confundido/a, no es casualidad: es una señal.",
        detected: "Interés tibio, sin demasiada iniciativa.\nResponde, pero no impulsa la conexión.\nNo hay señales claras de avance ni de cierre.",
        actions: [
          "Preguntate si realmente esto te suma o si solo te acostumbraste a la incertidumbre.",
          "Observa si el interés de la otra persona sube cuando te alejas o si sigue igual.",
          "No pongas energía extra en algo que no te da seguridad ni entusiasmo."
        ],
        future: "Si nada cambia, esta conexión se va a desvanecer por falta de impulso real. Puede durar un tiempo más en este estado de indefinición, pero si no hay un cambio concreto, terminará por agotarte."
      };
    } else if (score >= 41 && score <= 45) {
      return {
        title: "🟠 4. \"Te dan una de cal y otra de arena (y ya te mareaste)\"",
        translation: "Un día parece que quiere todo, al siguiente desaparece. Y vos te estás volviendo loco/a tratando de entender.",
        analysis: "Este tipo de dinámica es un clásico del patrón de refuerzo intermitente : te da lo justo para que te ilusiones, pero no lo suficiente para sentirte seguro/a. Es un sube y baja emocional que genera ansiedad y engancha más de lo que parece.\nTambién puede estar relacionado con la Teoría del Apego Ansioso-Evitativo , donde una persona se acerca cuando siente que te está perdiendo, pero cuando te tiene cerca, se aleja de nuevo.",
        detected: "Momentos de conexión intensos seguidos de frialdad inexplicable.\nInconsistencia en la comunicación y el nivel de interés.\nTe deja con dudas más seguido de lo que te da certezas.",
        actions: [
          "No entres en el juego de intentar descifrarlo/a.",
          "Poné límites: una conexión real no debería hacerte sentir inestable.",
          "Preguntate si esto te suma o si solo estás enganchado/a por la incertidumbre."
        ],
        future: "Si nada cambia, esta dinámica puede volverse adictiva y desgastante. La sensación de \"ganar su atención\" cada vez que se aleja puede generarte un falso sentido de logro, pero en el fondo, siempre vas a estar en una posición de inseguridad."
      };
    } else if (score >= 36 && score <= 40) {
      return {
        title: "🟠 5. \"Es como WiFi de aeropuerto: conexión inestable y sin contraseña\"",
        translation: "A veces está, a veces no. No sabés si es desinterés o si simplemente vive en otro planeta.",
        analysis: "Lo que mostraron tus respuestas es una relación con conexión intermitente . No es que haya un rechazo claro, pero tampoco hay suficiente consistencia como para construir algo real.\nEsta situación suele estar asociada a personas con un estilo de apego evitativo , que pueden tener interés, pero manejan el contacto de manera esporádica, sin compromiso emocional.",
        detected: "La comunicación y el interés van y vienen sin lógica aparente.\nNo hay una clara intención de avanzar o profundizar el vínculo.\nTe deja más dudas que certezas sobre lo que siente.",
        actions: [
          "Analizar",
          "No te conformes con migajas de atención disfrazadas de \"fluidez\".",
          "No le pongas más energía de la que te está devolviendo."
        ],
        future: "Si esta persona no cambia su forma de conectarse, la historia seguirá igual: a ratos intensos, a ratos fríos. Si quieres algo estable, este tipo de relación te va a desgastar y frustrar."
      };
    } else if (score >= 31 && score <= 35) {
      return {
        title: "🔵 6. \"Parece amor, pero es un espejismo en el desierto\"",
        translation: "Te hace sentir especial a ratos, pero cuando te das vuelta, se evapora. Hay algo ahí… pero nunca lo suficiente.",
        analysis: "Tus respuestas reflejan un patrón de interacción intensa y luego distanciamiento . Esto es muy común en vínculos con dinámicas de refuerzo intermitente , donde te dan dosis de atención y cariño justo cuando estás por rendirte, lo que hace que te quedes esperando más.",
        detected: "Te ilusiona con gestos fuertes, pero luego se enfría sin motivo.\nCuando lo/la sentís lejos, de golpe vuelve con intensidad.\nTe deja con más preguntas que respuestas sobre lo que realmente siente.",
        actions: [
          "Observará los patrones, no solo los momentos lindos.",
          "No confundas intensidad con conexión real.",
          "Si una relación te genera más ansiedad que disfrute, algo no está bien."
        ],
        future: "Si sigues en esta dinámica, es probable que nunca llegues a una estabilidad real. En algún punto, vas a tener que elegir si quieres seguir esperando a alguien que da amor a cuentagotas o si prefieres salir de la montaña rusa emocional."
      };
    } else if (score >= 27 && score <= 30) {
      return {
        title: "🔵 7. \"Te responde con demora, pero te tiene en la mira\"",
        translation: "No sos su prioridad, pero tampoco quiere perderte. No está 100% dentro, pero tampoco 100% fuera.",
        analysis: "Esta persona te mantiene en un \"limbo emocional\" . No te ignora del todo, pero tampoco se muestra completamente comprometida. Sus respuestas son esporádicas, muestra interés a medias y siempre parece haber una excusa para no avanzar demasiado.",
        detected: "No toma iniciativa real, pero tampoco te deja ir.\nAparece cuando siente que te estás alejando.\nLas conversaciones son irregulares, y a veces sentís que te habla por inercia más que por interés genuino.",
        actions: [
          "Deja de invertir más de lo que recibirás. Si solo está cuando vos empujás, ya tenés tu respuesta.",
          "Probá dar un paso atrás y observar: si realmente le importa, va a aparecer. Si desaparece, es porque nunca estuvo de verdad."
        ],
        future: "Si sigues en este punto medio, vas a terminar perdiendo tiempo y energía en alguien que nunca se va a definir."
      };
    } else if (score >= 23 && score <= 26) {
      return {
        title: "🔴 8. \"Te quiero, pero no lo suficiente\"",
        translation: "Te aprecia, pero no te elige. Estás en su vida, pero no en el lugar que te gustaría.",
        analysis: "Hay interés, sí. Pero no es suficiente como para dar el siguiente paso. Tal vez le gustás, tal vez te tiene cariño, pero si realmente sintiera que sos esa persona especial, no estarías en esta incertidumbre.",
        detected: "Hay cierta constancia, pero no suficiente como para sentirse seguro/a.\nLa conexión existe, pero siempre parece haber una barrera invisible.\nCuando intentás acercarte más, sentís resistencia o respuestas tibias.",
        actions: [
          "Acepta la realidad tal cual es.",
          "Deja de sobreinterpretar pequeños gestos.",
          "Si la otra persona no está segura, vos sí tenés que estarlo."
        ],
        future: "Si sigues apostando a esto, vas a estar en un limbo eterno."
      };
    } else if (score >= 19 && score <= 22) {
      return {
        title: "🔴 9. \"Te estás boludeando, salí de ahí\"",
        translation: "Si fueras más invisible, serías un fantasma. Si alguien te quiere en su vida, no te deja dudando todo el tiempo.",
        analysis: "Si tenés que preguntarte constantemente si le importas, ya tenés la respuesta: no lo suficiente . Puede ser que disfrute tu atención, que le guste la validación, pero lo que no hay aquí es compromiso real. Esta persona no tiene miedo a perderte porque en el fondo sabe que siempre estás disponible.\nSegún la Teoría del Refuerzo Intermitente , cuanto más inconsistente es alguien con su afecto, más adictivo puede volverse para la otra persona. ¿Por qué? Porque el cerebro recibe una recompensa aleatoria: a veces te da atención, a veces te ignora, y eso te deja en un estado de expectativa constante, buscando el próximo \"premio\".",
        detected: "Aparece y desaparece sin aviso, sin dar explicaciones.\nCuando lo/la necesitás, no está, pero cuando quieras alejarte, reaparece.\nNo hay consistencia ni intención real de construir algo sólido.",
        actions: [
          "Deja de esperar a que cambie, porque no va a pasar.",
          "No sigas jugando su juego: tomá distancia sin avisar.",
          "Si te busca cuando te alejás, no es amor, es control."
        ],
        future: "Seguir en esta situación solo te va a desgastar emocionalmente. Este tipo de vínculo no mejora con el tiempo: **o te deja de lastimar porque se transforma en algo real (spoiler: casi nunca pasa), o te deja de lastimar porque aprendes a soltarlo.\nSi quieres claridad, primero tenés que empezar por vos mismo/a: dejar de darle tiempo a quien no lo merece. 🚪🔥"
      };
    } else {
      return {
        title: "Diagnóstico Indeterminado",
        translation: "",
        analysis: "Los resultados no se pudieron clasificar adecuadamente. Revisa tus respuestas y vuelve a intentarlo.",
        detected: "",
        actions: [
          "Vuelve a realizar el test.",
          "Consulta con un profesional para un análisis más detallado."
        ],
        future: "Una revisión externa podría ayudarte a identificar áreas de mejora."
      };
    }
  }

  const diagnosis = getDiagnosis(score);

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

