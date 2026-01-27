// variaveis do pokemon
const pokeName = document.querySelector(".pokeName");
const pokeId = document.querySelector(".pokeId");
const pokeImg = document.getElementById("imgPoke");
const type0 = document.querySelector(".type0");
const type1 = document.querySelector(".type1");

// formulario e input
const form = document.querySelector(".form");
const input_form = document.querySelector(".input_search");

// botões
const prevB = document.querySelector(".prev");
const nextB = document.querySelector(".next");

// pokemon atual
let actuallyPoke = 1;

// puxando a API
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}



// renderizando o pokemon
const renderPokemon = async (pokemon) => {
    pokeName.innerHTML = 'Loading...';
    pokeId.innerHTML = '';
    pokeImg.style.display = 'none';
    type0.style.display = 'none';
    type1.style.display = 'none';


    const data = await fetchPokemon(pokemon);
    const dataType0 = await fetchType0(pokemon);
    const dataType1 = await fetchType1(pokemon);


    if(data){
        // tipos do pokemon
        type0.style.display = 'block';
        type0.src = dataType0['sprites']['generation-vi']['x-y']['name_icon']
        if(dataType1){
            type1.style.display = 'block';
            type1.src = dataType1['sprites']['generation-vi']['x-y']['name_icon']
        }

        pokeImg.style.display = 'block';
        pokeName.innerHTML = data.name;
        pokeId.innerHTML = data.id;

        // sprite de acordo com a geração
        if(data.id >= 650){
            pokeImg.src = data["sprites"]["versions"]["generation-ix"]["scarlet-violet"]["front_default"]    
        }else{
            pokeImg.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
        }
        actuallyPoke = data.id;
    }else{
        pokeId.innerHTML = ''
        pokeName.innerHTML = 'Not Found :('
    }

    input_form.value = '';
}
// tipos pokemon
const fetchType0 = async (pokemon) =>{
    
    const data = await fetchPokemon(pokemon);
    if(data){
        const APIUrl = await data['types']['0']['type']['url'];
        const APIResponseType0 = await fetch(APIUrl);
        const dataType0 = await APIResponseType0.json();
        return dataType0;
    }
    
}

const fetchType1 = async (pokemon) =>{
    const data = await fetchPokemon(pokemon);
    if (data){
        if (data['types']['1']){
            const APIUrl = await data['types']['1']['type']['url'];
            const APIResponseType1 = await fetch(APIUrl);
            const dataType1 = await APIResponseType1.json();
            return dataType1;
        }
    }
    
}

form.addEventListener("submit", (event) =>{
    event.preventDefault();
    renderPokemon(input_form.value.toLowerCase());    
});

prevB.addEventListener("click", () =>{
    if(actuallyPoke == 1){
        renderPokemon(1025);
    }else{
        renderPokemon(actuallyPoke-1);
    }
})

nextB.addEventListener("click", () =>{
    if(actuallyPoke == 1025){
        renderPokemon(1);
    }else{
        renderPokemon(actuallyPoke+1);
    }
})

renderPokemon(actuallyPoke);


