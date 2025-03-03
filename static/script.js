document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start-button");
  const introContainer = document.getElementById("intro-container");
  const testContainer = document.getElementById("test-container");
  const nextButton = document.getElementById("next-button");
  const questionContainer = document.getElementById("question-container");

  let currentQuestionIndex = 0;
  let answers = {};
  const blockSize = 2; // 🔹 Muestra 2 preguntas por bloque

  const questions = [
    // 🔹 BLOQUE 1: Comunicación y Contacto
    { question: "📌 BLOQUE 1: Comunicación y Contacto\n1️⃣ 📱 ¿Con qué frecuencia te escribe?", options: [
        "Todos los días con interés.",
        "Me responde, pero a veces tarda mucho.",
        "Solo me habla cuando yo escribo primero.",
        "Aparece y desaparece sin lógica."
    ]},
    { question: "2️⃣ 💬 ¿Inicia conversaciones por su cuenta?", options: [
        "Sí, le interesa hablar conmigo.",
        "A veces sí, a veces no.",
        "No, siempre tengo que escribir primero."
    ]},
    { question: "3️⃣ ⌛ ¿Cuánto tarda en responderte?", options: [
        "Responde rápido y con interés.",
        "A veces responde al instante, a veces tarda horas o días.",
        "Siempre deja los mensajes en visto por horas/días sin motivo."
    ]},
    { question: "4️⃣ 📵 ¿Alguna vez dejó de responder sin explicación y después apareció como si nada?", options: [
        "Nunca, siempre mantiene el contacto.",
        "Alguna vez, pero lo hablamos.",
        "Sí, varias veces, y cuando vuelve actúa como si nada."
    ]},

    // 🔹 BLOQUE 2: Interés y Esfuerzo
    { question: "📌 BLOQUE 2: Interés y Esfuerzo\n5️⃣ 🏃‍♂️ ¿Hace planes para verte?", options: [
        "Sí, se planifica y los propone.",
        "A veces, pero no con tanta iniciativa.",
        "No, siempre los propongo yo."
    ]},
    { question: "6️⃣ 📍 ¿Cómo son sus respuestas cuando hablás acerca de tu vida?", options: [
        "Se muestra interesado.",
        "Responde normal, sin mucho interés.",
        "Evita la conversación o cambia de tema."
    ]},
    { question: "7️⃣ 🗓️ ¿Cómo son sus planes con vos?", options: [
        "Los organiza con tiempo y los cumple.",
        "Los propone, pero a veces los cancelan.",
        "Siempre son improvisados, nunca se compromete a nada."
    ]},
    { question: "8️⃣ 😌 ¿Sentís que te da prioridad en tu vida?", options: [
        "Sí, claramente.",
        "No lo tengo claro, a veces sí a veces no.",
        "No, siempre soy su último plan."
    ]},

    // 🔹 BLOQUE 3: Conexión Emocional
    { question: "📌 BLOQUE 3: Conexión Emocional\n9️⃣ ❤️ ¿Hablan de cosas personales y profundas?", options: [
        "Sí, me cuenta cosas importantes de su vida.",
        "A veces, pero no demasiado.",
        "No, evita esos temas o cambia la conversación."
    ]},
    { question: "🔟 😏 ¿Te hace sentir especial cuando están juntos?", options: [
        "Sí, me presta atención real.",
        "A veces, pero hay momentos en que se distancia.",
        "No, siento que soy un pasatiempo más."
    ]},
    { question: "1️⃣1️⃣ 🤔 ¿Alguna vez te dijo que no está seguro de lo que siente por vos?", options: [
        "No, siempre fue claro/a conmigo.",
        "Fue muy ambiguo.",
        "Sí, varias veces."
    ]},
    { question: "1️⃣2️⃣ 💭 ¿Alguna vez te dio señales confusas sobre lo que quiere con vos?", options: [
        "No, siempre fue claro/a.",
        "A veces sí, pero en general nos llevamos bien.",
        "Sí, me da señales mixtas todo el tiempo."
    ]},

    // 🔹 BLOQUE 4: Actitud y Coherencia
    { question: "📌 BLOQUE 4: Actitud y Coherencia\n1️⃣3️⃣ 🎭 ¿Sus palabras y acciones coinciden?", options: [
        "Sí, lo que dice y lo que hace están alineados.",
        "A veces, pero noto contradicciones.",
        "No, dice una cosa y hace otra."
    ]},
    { question: "1️⃣4️⃣ 🔄 ¿Siente celos o te ha hecho comentarios sobre otras personas con las que salís?", options: [
        "No, respeta mi vida personal.",
        "A veces muestra interés o curiosidad.",
        "Sí, pero después desaparece como si nada."
    ]},

    // 🔹 BLOQUE 5: Dinámica General
    { question: "📌 BLOQUE 5: Dinámica General\n1️⃣9️⃣ 🎢 ¿Te sentiste seguro/a con esta relación o es una montaña rusa emocional?", options: [
        "Me siento seguro/a, hay estabilidad.",
        "A veces bien, a veces mal, no es claro.",
        "Siento que me genera ansiedad constante."
    ]},
    { question: "2️⃣0️⃣ 🚪 Si te alejás, ¿cómo reacciona?", options: [
        "Muestra interés y busca saber qué pasa.",
        "A veces lo nota, a veces no.",
        "No se da cuenta o le da lo mismo."
    ]}
  ];

  function isBlockAnswered() {
    for (let i = currentQuestionIndex; i < Math.min(currentQuestionIndex + blockSize, questions.length); i++) {
      if (!answers[i]) {
        return false;
      }
    }
    return true;
  }

  nextButton.addEventListener("click", function () {
    if (!isBlockAnswered()) {
      alert("Debes seleccionar una opción en cada pregunta del bloque antes de continuar.");
      return;
    }
    currentQuestionIndex += blockSize;
    if (currentQuestionIndex >= questions.length) {
      localStorage.setItem("respuestasTest", JSON.stringify(answers));
      window.location.href = "/resultados";
    } else {
      loadQuestions();
    }
  });

  startButton.addEventListener("click", function () {
    introContainer.style.display = "none";
    testContainer.style.display = "block";
    loadQuestions();
  });

  function loadQuestions() {
    questionContainer.innerHTML = "";
    let blockEnd = Math.min(currentQuestionIndex + blockSize, questions.length);
    for (let i = currentQuestionIndex; i < blockEnd; i++) {
      const q = questions[i];
      const questionDiv = document.createElement("div");
      questionDiv.innerHTML = `<p><strong>${q.question}</strong></p>`;
      q.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-button");
        button.onclick = () => {
          answers[i] = option;
          questionDiv.querySelectorAll(".option-button").forEach(btn => btn.classList.remove("selected"));
          button.classList.add("selected");
          if (isBlockAnswered()) nextButton.disabled = false;
        };
        questionDiv.appendChild(button);
      });
      questionContainer.appendChild(questionDiv);
    }
    nextButton.disabled = true;
  }
});
