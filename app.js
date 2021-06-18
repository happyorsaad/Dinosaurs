// Create Dino Constructor

// Create Dino Objects

// Create Human Object

// Use IIFE to get human data from form

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Remove form from screen

// On button click, prepare and display infographic

function Dinosaur(data) {
  this.species = data.species;
  this.diet = data.diet;
  this.where = data.where;
  this.when = data.when;
  this.fact = data.fact;
}

Dinosaur.prototype = {
  compareWeight: function (humanWeight) {
    const weightRatio = (this.weight / humanWeight).toFixed(1);
    if (weightRatio > 1) {
      return `${this.species} weighed ${(this.weight / humanWeight).toFixed(
        1
      )} times more than you!`;
    }
    if (weightRatio < 1) {
      return `You weigh ${(humanWeight / this.weight).toFixed(
        1
      )} times more than ${this.species}!`;
    }
    return `You weigh the same as ${this.species}!`;
  },
  compareHeight: function (humanHeight) {
    const heightRatio = (this.height / humanHeight).toFixed(1);
    if (heightRatio > 1) {
      return `${this.species} was ${(this.height / humanHeight).toFixed(
        1
      )} times taller than you!`;
    }
    if (heightRatio < 1) {
      return `You are ${(humanHeight / this.height).toFixed(
        1
      )} times taller than ${this.species}!`;
    }
    return `You are the same height as ${this.species}!`;
  },
  compareDiet: function (humanDiet) {
    const article = humanDiet === "omnivore" ? "an" : "a";
    if (humanDiet === this.diet) {
      return `You are ${article} ${humanDiet} and ${this.species} was too!`;
    } else {
      return `You are ${article} ${humanDiet}, but ${this.species} was a ${this.diet}.`;
    }
  },
};

function getFormData() {
  let name = document.getElementById("name").value;
  let weight = document.getElementById("weight").value;
  let diet = document.getElementById("diet").value;
  let hFoot = document.getElementById("feet").value;
  let hInches = document.getElementById("inches").value;
  return {
    name: name,
    weight: weight,
    diet: diet,
    height: hFoot * 12 + hInches,
  };
}

function getGridBox(dino, human) {
  let fact = "";
  const randomNumber =
    dino.species === "Pigeon" ? 3 : Math.round(Math.random() * 5);
  switch (randomNumber) {
    case 0:
      fact = dino.compareWeight(human.weight);
      break;
    case 1:
      fact = dino.compareHeight(human.weight);
      break;
    case 2:
      fact = dino.compareDiet(human.weight);
      break;
    case 3:
      fact = dino.fact;
      break;
    case 4:
      fact = `The ${dino.species} lived in ${dino.where}.`;
      break;
    case 5:
      fact = `The ${dino.species} lived in the ${dino.when} period.`;
      break;
  }

  const div = document.createElement("div");
  const html = `
        <h3>${dino.species}</h3>
        <img src="images/${dino.species.toLowerCase()}.png">
        <p>${fact}</p>
    `;
  div.className = "grid-item";
  div.innerHTML = html;
  return div;
}

function getHumanBox(humanData) {
  const div = document.createElement("div");
  const html = `
        <h3>${humanData.name}</h3>
        <img src="images/human.png">
    `;
  div.className = "grid-item";
  div.innerHTML = html;
  return div;
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
function setGrid(dinos, humanData) {
  let boxes = dinos.map((dino) => getGridBox(dino, humanData));
  shuffleArray(boxes);
  let humanBox = getHumanBox(humanData);
  boxes.splice(4, 0, humanBox);
  let gridDiv = document.getElementById("grid");
  boxes.forEach((box, i) => {
    gridDiv.appendChild(box);
  });
}

function getDinosaurData() {
  return fetch("/dino.json")
    .then((res) => res.json())
    .then((val) => val["Dinos"].map((v) => new Dinosaur(v)));
}

async function onCompareMe() {
  // hide the form
  document.getElementById("dino-compare").style.display = "none";

  let human = getFormData();
  let dinoData = await getDinosaurData();
  setGrid(dinoData, human);
}

(function () {
  document.getElementById("btn").addEventListener("click", onCompareMe);
})();
