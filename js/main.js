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

async function get_pokemon() {
    const result = await fetch_json_from_url(url);
    const fetched_list = result.results;

    for (var species in fetched_list) {
        var fetched_pokemon = await fetch_json_from_url(fetched_list[species].url);
        pokemon_list.push(fetched_pokemon);
    }

    create_pokemon_overview(pokemon_list);
}

function create_pokemon_overview(filtered_pokemon_list) {
    overview_element.innerHTML = "";

    for(var pokemon in filtered_pokemon_list) {
        console.log(filtered_pokemon_list[pokemon]);
        console.log(`Creating an overview for '${filtered_pokemon_list[pokemon].name}.'`)

        const new_div = document.createElement("div");
        new_div.setAttribute("class", "species");
        overview_element.appendChild(new_div);
        new_div.appendChild(document.createTextNode(filtered_pokemon_list[pokemon].name))
    }
}

function filter_with_search(on_input_event) {
    console.log(on_input_event.target.value);
}

async function initialize() {
  get_pokemon();
}

initialize();