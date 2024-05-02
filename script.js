// prevent default because it is a form

const select_pokemon = document.querySelector("#select-pokemon");
const filter_btn = document.querySelector("#filter");
const reset_btn = document.querySelector("#reset");
const search = document.querySelector("#search");

let counter = 1;
let n = 151;

let pokemons = [];

async function getDatafromAPI(url) {
  const response = await fetch(url);
  const result = await response.json();
  const data = await result;

  // console.log(data);
  return data;
}

async function getPokemons(counter) {
  for (let i = 0; i <= n; i++) {
    let poke = await getDatafromAPI(
      `https://pokeapi.co/api/v2/pokemon/${counter}`
    );
    // console.log(poke);
    pokemons.push(poke);
    counter++;
  }
}

// display to the screen

function displaypokemons(pokemons) {
  console.log(pokemons.length);
  const output = document.querySelector("#output");
  output.innerText = "";

  pokemons.forEach((element) => {
    const parentDiv = document.createElement("div");
    parentDiv.classList.add("parent");

    const image = document.createElement("img");
    // image.classList.add(image);
    image.src = element.sprites.front_shiny;

    const name = document.createElement("h3");
    name.classList.add("name");
    name.innerText = element.name;

    const type = document.createElement("h4");
    type.classList.add("type");
    type.innerText = element.types[0].type.name;
    parentDiv.append(image, name, type);
    output.append(parentDiv);
  });
  // console.log(output);
  // console.log(pokemons);
}

// displaypokemons(pokemons);

// pokemons.forEach((elem) => {
//   console.log(elem);
// });

// console.log(pokemons);

// pokemons to show on window load

window.addEventListener("load", async () => {
  await getPokemons(counter);
  displaypokemons(pokemons);
});

// filter on basis of selected type

filter_btn.addEventListener("click", (e) => {
  e.preventDefault();
  const view = select_pokemon.value;
  // console.log(view);
  const filteredPokemons = pokemons.filter((element) => {
    return element.types[0].type.name === view;
  });

  displaypokemons(filteredPokemons);
});

search.addEventListener("keyup", (e) => {
  e.preventDefault();
  let query = search.value;

  const searchPokemons = pokemons.filter((item) => {
    return item.name.toLowerCase().includes(query.toLowerCase());
  });

  displaypokemons(searchPokemons);
  console.log(searchPokemons);
});

console.log(pokemons);
