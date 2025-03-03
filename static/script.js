document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("start-button");
  const introContainer = document.getElementById("intro-container");
  const testContainer = document.getElementById("test-container");
  const nextButton = document.getElementById("next-button");
  const questionContainer = document.getElementById("question-container");

  let currentQuestionIndex = 0;
  let answers = {};
  const blockSize = 2; // 🔹 Número de preguntas por bloque

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
    // 🔹 BLOQUE 2: Interés y Esfuerzo
    { question: "📌 BLOQUE 2: Interés y Esfuerzo\n3️⃣ 🏃‍♂️ ¿Hace planes para verte?", options: [
        "Sí, se planifica y los propone.",
        "A veces, pero no con tanta iniciativa.",
        "No, siempre los propongo yo."
    ]},
    { question: "4️⃣ 📍 ¿Cómo son sus respuestas cuando hablás acerca de tu vida?", options: [
        "Se muestra interesado.",
        "Responde normal, sin mucho interés.",
        "Evita la conversación o cambia de tema."
    ]},
    // 🔹 (Continúa con más preguntas...)
  ];

  function loadQuestions() {
    questionContainer.innerHTML = ""; // Limpia el contenedor

    let blockEnd = Math.min(currentQuestionIndex + blockSize, questions.length);
    for (let i = currentQuestionIndex; i < blockEnd; i++) {
      const q = questions[i];
      const questionDiv = document.createElement("div");

      // 🔹 Si la pregunta incluye un título de bloque, separarlo visualmente
      if (q.question.includes("\n")) {
        const parts = q.question.split("\n");
        const blockTitle = document.createElement("h3");
        blockTitle.textContent = parts[0];
        questionDiv.appendChild(blockTitle);
        questionDiv.appendChild(document.createElement("br"));
        const questionText = document.createElement("p");
        questionText.textContent = parts[1];
        questionDiv.appendChild(questionText);
      } else {
        questionDiv.innerHTML = `<p><strong>${q.question}</strong></p>`;
      }

      q.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-button");
        button.onclick = function () {
          saveAnswer(i, option);
          questionDiv.querySelectorAll(".option-button").forEach(btn => btn.classList.remove("selected"));
          this.classList.add("selected");
          if (isBlockAnswered()) {
            nextButton.disabled = false;
          }
        };
        questionDiv.appendChild(button);
      });

      questionContainer.appendChild(questionDiv);
    }
    nextButton.disabled = true;
  }

  function saveAnswer(index, answer) {
    answers[index] = answer;
  }

  function isBlockAnswered() {
    for (let i = currentQuestionIndex; i < Math.min(currentQuestionIndex + blockSize, questions.length); i++) {
      if (!(i in answers)) {
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

    currentQuestionIndex += blockSize; // 🔹 Avanza al siguiente bloque de preguntas

    if (currentQuestionIndex >= questions.length) {
      localStorage.setItem("respuestasTest", JSON.stringify(answers));
      window.location.href = "/resultados";  // 🔥 Redirigir a la página de resultados
    } else {
      loadQuestions(); // 🔹 Cargar el siguiente conjunto de preguntas
    }
  });

  startButton.addEventListener("click", function () {
    introContainer.style.display = "none";
    testContainer.style.display = "block";
    loadQuestions();
  });
});
