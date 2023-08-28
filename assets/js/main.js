const pokemonLista = document.getElementById('listaPokemon');
const botaoCarregar = document.getElementById('mostrarMais');
const limit = 5;
let offset = 0;

function convertPokemonToLi(pokemon){
    return `
    <li class="pokemon ${pokemon.type}">
    <span class="number">#${pokemon.ordem}</span>
     <span class="name">${pokemon.name}</span>

     <div class="detail">
        <ol class="types">
            ${pokemon.types.map((type) => `<li class="type"><span>${type}</span></li>`).join('')}
        </ol>
        <img src="${pokemon.image}" alt="${pokemon.name}">
    </div>
</li>
    `
}


function carregarMais(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonLista.innerHTML += newHtml;
    });
}

carregarMais(offset, limit);

pokeApi.getTotalPokemons();

botaoCarregar.addEventListener('click', ()=>{
        offset += limit;
        const qtd_proxima_page = offset + limit;
    if(qtd_proxima_page >= totalPokemon){
        const novo_limite = totalPokemon - offset;
        console.log("offset maior que total: "+ totalPokemon + "offset: " + offset)
        carregarMais(offset, novo_limite);
        botaoCarregar.parentElement.removeChild(botaoCarregar);
        
    }else{
        carregarMais(offset, limit);

    }

})