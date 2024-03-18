const marvel = {
  heroes: [], // Array donde se almacenarán los héroes obtenidos de la API
  currentHeroIndex: 0, // Índice del héroe actual

  // Método para inicializar la aplicación
  init: function () {
    this.fetchHeroes();
  },
  shuffleArray: function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },
  // Método para obtener los héroes de la API
  fetchHeroes: function () {
    const urlAPI =
      "https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=85d9ef39f2a98cc2cee8c7f089361d43&hash=2393ba968f029d1cac40acb237125191";

    fetch(urlAPI)
      .then((res) => res.json())
      .then((json) => {
        this.heroes = json.data.results;
        this.render();
      })
      .catch((error) => {
        console.error("Error al obtener datos de la API:", error);
        // Puedes manejar el error aquí
      });
  },

  // Método para renderizar la interfaz con el héroe actual
  render: function () {
    const container = document.getElementById("marvel-row");
    const currentHero = this.heroes[this.currentHeroIndex];

    // Copiar las respuestas
    let answers = ["False", currentHero.name, "Jack Haze"];

    // Barajar las respuestas
    answers = this.shuffleArray(answers);

    let contentHTML = `
      <div class="col-md-4">
        <a href="${currentHero.urls[1].url}" target="_blank">
          <img
            src="${currentHero.thumbnail.path}.${currentHero.thumbnail.extension}"
            alt="${currentHero.name}"
            class="img-thumbnail"
          />
        </a>
      </div>
      <div class="col-md-8">
        <h2 class="question-tittle">Pregunta:</h2>

        <p class="question-text">¿Cuál es su nombre?</p>
        <ul id="answers">
          <li class="boton-respuesta">
            <button onclick="marvel.checkAnswer('${answers[0]}')">${answers[0]}</button>
          </li>
          <li class="boton-respuesta">
            <button onclick="marvel.checkAnswer('${answers[1]}')">${answers[1]}</button>
          </li>
          <li class="boton-respuesta">
            <button onclick="marvel.checkAnswer('${answers[2]}')">${answers[2]}</button>
          </li>
        </ul>
        <p id="result" class="resultado"></p>
      </div>
    `;

    container.innerHTML = contentHTML;
  },

  // Método para verificar la respuesta seleccionada
  checkAnswer: function (selectedAnswer) {
    const correctAnswer = this.heroes[this.currentHeroIndex].name;
    const resultContainer = document.getElementById("result");

    if (selectedAnswer === correctAnswer) {
      resultContainer.textContent = "¡Respuesta correcta!";
      // Incrementar el índice para pasar al siguiente héroe
      this.currentHeroIndex++;
      // Verificar si se ha alcanzado el final del array de héroes
      if (this.currentHeroIndex < this.heroes.length) {
        // Renderizar el siguiente héroe
        this.render();
      } else {
        resultContainer.textContent = "¡Has respondido todas las preguntas!";
      }
    } else {
      resultContainer.textContent = "Respuesta incorrecta. Inténtalo de nuevo.";
    }
  },
};

// Inicializar la aplicación
marvel.init();
