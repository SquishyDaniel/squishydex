const url = "https://pokeapi.co/api/v2/pokemon";
let pokemon_list = [];
const overview_element = document.querySelector("#overview");

async function fetch_from_url(url_to_fetch) {
    try {  
        const response = await fetch(url_to_fetch);

        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return response;
    } catch(error){
       console.error(error.message); 
    }
}

async function fetch_json_from_url(url_to_fetch) {
    console.log(`Fetching '${url_to_fetch}'`)

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

async function get_pokemon() {
    const result = await fetch_json_from_url(url);
    const fetched_list = result.results;

    for (var species in fetched_list) {
        var fetched_pokemon = await fetch_json_from_url(fetched_list[species].url);
        pokemon_list.push(fetched_pokemon);
    }
}

async function initialize() {
  get_pokemon();
  create_pokemon_overview();
}

initialize();