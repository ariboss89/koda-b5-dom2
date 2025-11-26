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

let allData = [];
let arrUrl = [];

let dataPokemon = {
  name: "name",
  image: "url",
  type: ["type"],
};

async function getPokemon() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=30&offset=0";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const chars = data.results;
    const target = document.querySelector("section.hero-main");
    const fragment = document.createDocumentFragment();

    chars.forEach((character) => {
      const div = document.createElement("div");
      div.classList.add("main-grid");
      const name = document.createElement("div");
      name.setAttribute("class", "item");
      name.textContent = character.name.toUpperCase();
      div.append(name);

      const url = character.url;
      // const pokeName = character.name;

      arrUrl.push(url);

      (async () => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const types = data.types;

        const divImg = document.createElement("div");
        divImg.setAttribute("class", "item");
        div.append(divImg);

        const images = document.createElement("img");
        images.setAttribute("class", "item");
        images.setAttribute("src", data.sprites.front_default);
        images.setAttribute("alt", `gambar ${character.name}`);
        divImg.append(images);

        const divBlack = document.createElement("div");
        divBlack.setAttribute("class", "item");
        div.append(divBlack);

        const divType = document.createElement("div");
        divType.setAttribute("class", "item");
        div.append(divType);

        dataPokemon.name = data.name;
        dataPokemon.image = data.sprites.front_default;

        for (let i = 0; i < types.length; i++) {
          let variant = types[i].type.name;
          for (const key in colours) {
            if (variant == key) {
              const divTypeData = document.createElement("div");
              divTypeData.classList.add("flex-type");
              divTypeData.style.backgroundColor = colours[key];
              divTypeData.textContent = variant;
              divType.append(divTypeData);

              dataPokemon.type.push(variant);
            }
          }
        }

        allData.push(dataPokemon);
        //
      })();
      fragment.append(div);
    });

    target.append(fragment);
  } catch (error) {}
}

getPokemon();

console.log(arrUrl, "bin");

const urls = [
  "https://pokeapi.co/api/v2/pokemon/1/",
  "https://pokeapi.co/api/v2/pokemon/2/",
  "https://pokeapi.co/api/v2/pokemon/3/",
];

console.log(urls, "aa");

Promise.all(arrUrl.map((url) => fetch(url).then((response) => response.json())))
  .then((data) => {
    console.log("All data fetched successfully:", data);
    // data will be an array like:
    // [
    //   { userId: 1, id: 1, title: 'delectus aut autem', completed: false },
    //   { userId: 1, id: 2, title: 'quis ut nam facilis et officia qui', completed: false },
    //   { userId: 1, id: 3, title: 'fugiat veniam minus', completed: false }
    // ]
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

// const fetchPromises = arrUrl.map((url) => fetch(url));

// Promise.all(fetchPromises).then((values) => {
//   console.log(values, "aa");
// });

// Promise.all(arrUrl.map((url) => fetch(url).then((response) => response.json())))
//   .then((data) => {
//     console.log("All data fetched successfully:", data);
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//   });

// Promise.all(fetchPromises)
//   .then((responses) => {
//     // All fetches completed successfully
//     // 'responses' is an array of Response objects
//     // You can further process each response, e.g., by calling .json()
//     return Promise.all(responses.map((response) => response.json()));
//   })
//   .then((data) => {
//     // 'data' is an array of JSON objects from all successful responses
//     console.log("All data fetched:", data);
//   })
//   .catch((error) => {
//     // Handle any errors that occurred during fetching or parsing
//     console.error("Error fetching data:", error);
//   });

//const pwd = document.querySelector("#selectType");

//pwd.addEventListener("change", function () {
// const test = pwd.getAttribute("type");
// if (test == "password") {
//   pwd.setAttribute("type", "text");
//   pwd.setAttribute("class", "pasw eye-slash");
// } else {
//   pwd.setAttribute("type", "password");
//   pwd.setAttribute("class", "pasw eye");
// }

//console.log(pwd.value, "apaa");
//});
