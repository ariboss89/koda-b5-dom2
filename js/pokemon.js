const colours = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

let dataPokemon = {
  name: "name",
  image: "url",
  type: ["type"],
};

let pokemonAll = [];
let typePokemons = [];

async function getPokemonWithAbilities() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const result = data.results.map(async (pokemon) => {
      try {
        const res = await fetch(pokemon.url);
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`);
        }
        let groupPokemon = [];
        const data2 = await res.json();
        groupPokemon.push(data2);
        return groupPokemon;
      } catch (error) {
        throw error;
      }
    });
    const pokemons = await Promise.all(result);

    for (let i = 0; i < pokemons.length; i++) {
      const pokedex = {
        name: "",
        image: "",
        types: [],
      };

      pokedex.name = pokemons[i][0].name;
      pokedex.image = pokemons[i][0].sprites.front_default;

      for (let j = 0; j < pokemons[i][0].types.length; j++) {
        pokedex.types.push(pokemons[i][0].types[j].type.name);

        if (!typePokemons.includes(pokemons[i][0].types[j].type.name)) {
          typePokemons.push(pokemons[i][0].types[j].type.name);
        }
      }
      pokemonAll.push(pokedex);
    }
    createDiv(pokemonAll, typePokemons);
  } catch (error) {
    console.log(error);
  }
}
getPokemonWithAbilities();

const target = document.querySelector("section.hero-main");
let fragment = document.createDocumentFragment();

function createDiv(dataPokemon, typePokemon) {
  // tahap 2 membuat select
  const divSelect = document.createElement("div");
  divSelect.classList.add("flex-search");
  const select = document.createElement("select");
  select.setAttribute("class", "select");
  select.setAttribute("id", "selectType");
  divSelect.append(select);
  const theOpt = document.createElement("option");
  theOpt.value = "Choose Type Pokemon";
  theOpt.textContent = "Choose Type Pokemon";
  theOpt.selected = true;
  theOpt.disabled = true;
  select.appendChild(theOpt);

  const allOpt = document.createElement("option");
  allOpt.value = "All";
  allOpt.textContent = "All";
  select.appendChild(allOpt);

  for (let i = 0; i < typePokemon.length; i++) {
    const opt = document.createElement("option");
    opt.value = typePokemon[i];
    opt.textContent = typePokemon[i];
    select.appendChild(opt);
  }

  fragment.append(divSelect);
  target.append(fragment);

  const selectPokemon = document.querySelector("#selectType");

  if (selectPokemon.value === "Choose Type Pokemon") {
    filterData(dataPokemon);
  }

  selectPokemon.addEventListener("change", () => {
    if (
      selectPokemon.value === "All" ||
      selectPokemon.value === "Choose Type Pokemon"
    ) {
      filterData(dataPokemon);
    } else {
      let filterRes = [];
      for (let l = 0; l < dataPokemon.length; l++) {
        const isTrue = dataPokemon[l].types.includes(selectPokemon.value);

        if (isTrue) {
          filterRes.push(dataPokemon[l]);
        }
      }
      filterData(filterRes);
    }
  });
}

function filterData(dataPokemon) {
  const divToRemove = target.querySelector("#divMain");

  if (divToRemove) {
    divToRemove.remove();
  }

  const divMain = document.createElement("div");
  divMain.setAttribute("class", "hero-main");
  divMain.setAttribute("id", "divMain");

  for (let j = 0; j < dataPokemon.length; j++) {
    const div = document.createElement("div");
    div.classList.add("main-grid");
    const name = document.createElement("div");
    name.setAttribute("class", "item");
    name.textContent = dataPokemon[j].name.toUpperCase();
    div.append(name);

    const divImg = document.createElement("div");
    divImg.setAttribute("class", "item");
    div.append(divImg);

    const images = document.createElement("img");
    images.setAttribute("class", "item");
    images.setAttribute("src", dataPokemon[j].image);
    images.setAttribute("alt", `gambar ${dataPokemon[j].name}`);
    divImg.append(images);

    const divBlack = document.createElement("div");
    divBlack.setAttribute("class", "item");
    div.append(divBlack);

    const divType = document.createElement("div");
    divType.setAttribute("class", "item");
    div.append(divType);

    for (let k = 0; k < dataPokemon[j].types.length; k++) {
      let variant = dataPokemon[j].types[k];
      for (const key in colours) {
        if (variant == key) {
          const divTypeData = document.createElement("div");
          divTypeData.classList.add("flex-type");
          divTypeData.style.backgroundColor = colours[key];
          divTypeData.textContent = variant;
          divType.append(divTypeData);
        }
      }
    }
    divMain.append(div);
    fragment.append(divMain);
    target.append(fragment);
  }
}

const btnLogout = document.querySelector("#navLogout");
btnLogout.addEventListener("click", () => {
  localStorage.removeItem("user");
  localStorage.removeItem("pasw");
  location.replace("/views/login.html");
});

// async function getPokemon() {
//   const url = "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0";
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`${response.status} ${response.statusText}`);
//     }
//     const data = await response.json();
//     const chars = data.results;
//     const target = document.querySelector("section.hero-main");
//     const fragment = document.createDocumentFragment();

//     chars.forEach((character) => {
//       const div = document.createElement("div");
//       div.classList.add("main-grid");
//       const name = document.createElement("div");
//       name.setAttribute("class", "item");
//       name.textContent = character.name.toUpperCase();
//       div.append(name);

//       const url = character.url;

//       (async () => {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error(`${response.status} ${response.statusText}`);
//         }
//         const data = await response.json();
//         const types = data.types;

//         const divImg = document.createElement("div");
//         divImg.setAttribute("class", "item");
//         div.append(divImg);

//         const images = document.createElement("img");
//         images.setAttribute("class", "item");
//         images.setAttribute("src", data.sprites.front_default);
//         images.setAttribute("alt", `gambar ${character.name}`);
//         divImg.append(images);

//         const divBlack = document.createElement("div");
//         divBlack.setAttribute("class", "item");
//         div.append(divBlack);

//         const divType = document.createElement("div");
//         divType.setAttribute("class", "item");
//         div.append(divType);

//         dataPokemon.name = data.name;
//         dataPokemon.image = data.sprites.front_default;

//         for (let i = 0; i < types.length; i++) {
//           let variant = types[i].type.name;
//           for (const key in colours) {
//             if (variant == key) {
//               const divTypeData = document.createElement("div");
//               divTypeData.classList.add("flex-type");
//               divTypeData.style.backgroundColor = colours[key];
//               divTypeData.textContent = variant;
//               divType.append(divTypeData);

//               dataPokemon.type.push(variant);
//             }
//           }
//         }
//       })();

//       fragment.append(div);
//     });

//     target.append(fragment);
//   } catch (error) {}
// }
// //getPokemon();
