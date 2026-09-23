const url = "https://pokeapi.co/api/v2/pokemon";
let pokemon_list = [];
const overview_element = document.querySelector("#overview");

async function fetch_from_url() {
    try {  
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return response;
    } catch(error){
       console.error(error.message); 
    }
}

async function fetch_json_from_url(url_to_fetch) {
    let response = await fetch_from_url(url_to_fetch);

    let data = await response.json();

    console.log(data);

    return data;
}

function create_pokemon_overview() {
    overview_element.innerHTML = "";

    for(var pokemon in pokemon_list) {
        console.log(pokemon_list[pokemon]);
    }
}

async function initialize() {
  const result = await fetch_json_from_url(url);
  const fetched_list = result.results;
  
  for (var species in fetched_list) {
    pokemon_list.push(fetched_list[species]);
  }

  create_pokemon_overview();
}

initialize();