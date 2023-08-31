

const pokeApi = {}

function convertePokeApiDetailToPokemon(pokeDetail){
 const pokemo = new Pokemon ();
 pokemo.name =  pokeDetail.name;
 pokemo.ordem = pokeDetail.id;
 pokemo.habilidades = pokeDetail.abilities.map((abilities) => abilities.ability.name);
 pokemo.tamanho = pokeDetail.height;
 pokemo.peso = pokeDetail.weight;
 pokemo.especie = pokeDetail.species.name;

 pokemo.stats = pokeDetail.stats.map((status) => status.stat.name);
 pokemo.base_stats =  pokeDetail.stats.map((base) => base.base_stat);

 const types = pokeDetail.types.map((typeSlot)=> typeSlot.type.name);
 const [type] = types;

 pokemo.types = types;
 pokemo.type = type;

 pokemo.image = pokeDetail.sprites.other.dream_world.front_default;
 console.log("nome "+pokemo.name)

return pokemo;

}

pokeApi.getPokemonDetalhes = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then((response) => convertePokeApiDetailToPokemon(response))
}

pokeApi.getPokemons = (OFFSET, LIMIT) => {
const URL = `https://pokeapi.co/api/v2/pokemon/?offset=${OFFSET}&limit=${LIMIT}`


return fetch(URL)
.then((response) => response.json())
.then((jsonBody) => jsonBody.results)
.then((pokemons) => pokemons.map(pokeApi.getPokemonDetalhes))
.then((detailsRequest) => Promise.all(detailsRequest))
.then((pokemonDetalhes) => pokemonDetalhes)

}

pokeApi.getTotalPokemons = () => {
    const URL = `https://pokeapi.co/api/v2/pokemon/`
    return fetch(URL)
    .then((response) => response.json())
    .then((jsonBody) => {
        totalPokemon = jsonBody.count
        console.log("Total de pokemons " + totalPokemon)
        return jsonBody.count})   
}
pokeApi.getPokemon = (id) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
    return fetch(URL)
    .then((response) => response.json())
    .then((response) => {
        const pokemo = new Pokemon ();
        pokemo.name =  response.name;
        pokemo.ordem = response.id;
           
       return pokemo
       })
    }