const url = "https://pokeapi.co/api/v2/pokemon";
let pokemon_list = [];
const overview_element = document.querySelector("#overview");
const selection_element = document.querySelector("#type_filter");

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

function match_types(pokemon, type_name) {
    if (type_name == "none") {
        return true;
    }
    
    else {
        for(type in pokemon.types) {
            if(pokemon.types[type].type.name==type_name) {
                return true;
            }
        }

        return false;
    } 
}

// This is called whenever someone types into the input search bar.
function filter_with_search(on_input_event) {
    const search_term = on_input_event.target.value.trim(); 

    if(pokemon_list.length > 0) {
        let pokemon_list_filtered = pokemon_list.filter(
            (pokemon) =>
                pokemon.name.startsWith(search_term) && 
                match_types(pokemon, selection_element.value )
        );

        create_pokemon_overview(pokemon_list_filtered);
    }
}

function filter_with_selector(on_select_event) {
    let pokemon_list_filtered = pokemon_list.filter(
            (pokemon) => match_types(pokemon, on_select_event.target.value) == true,
    );

    create_pokemon_overview(pokemon_list_filtered);

    return pokemon_list_filtered;
}

async function initialize() {
  get_pokemon();
}

initialize();