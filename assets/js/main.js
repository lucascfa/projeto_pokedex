const OFFSET = 0;
const LIMIT = 10;
const URL = `https://pokeapi.co/api/v2/pokemon/?offset=${OFFSET}&limit=${LIMIT}`;

function convertPokemonToLi(pokemon){
    return `
    <li class="pokemon">
    <span class="number">#001</span>
     <span class="name">${pokemon.name}</span>

     <div class="detail">
        <ol class="types">
            <li class="type">Grass</li>
            <li class="type">Poison</li>
        </ol>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/11.svg" alt="${pokemon.name}">
    </div>
</li>
    `
}

const pokemonLista = document.getElementById('listaPokemon');


fetch(URL)
.then((response) => response.json())
.then((responseBody) => responseBody.results)
.then((pokemons) => {

    for(let i = 0; i < pokemons.length; i++){
        const pokemon = pokemons[i]
        pokemonLista.innerHTML += convertPokemonToLi(pokemon);
    }
})
.catch((error) => console.log(error));

