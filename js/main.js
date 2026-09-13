const url = "https://pokeapi.co/api/v2/pokemon/ditto";

async function fetch_from_api() {
    try {  
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        
        console.log(result.name);
    } catch(error){
       console.error(error.message); 
    }
}

fetch_from_api();