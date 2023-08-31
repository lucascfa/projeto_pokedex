const pokemonLista = document.getElementById('listaPokemon');
const botaoCarregar = document.getElementById('mostrarMais');
const carregarPokemon = document.getElementById('details_poke');
const modal_detalhes = document.getElementById('modal');
let listaPokemons = [];
let pokemo = new Pokemon();

const limit = 5;
let offset = 0;

function convertPokemonToLi(pokemon){
    
    listaPokemons.push(pokemon);

    return `
    <li id="details_poke" onclick="carregarPokemonUnico(${pokemon.ordem})"
    class="pokemon ${pokemon.type}">
    <span id="numero" class="number" value="${pokemon.ordem}">#${pokemon.ordem}</span>
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


function carregarPokemonUnico(numero) {
    let index = numero - 1;

    let visibilidade = modal_detalhes.style.display
    if(visibilidade == "none"){
        modal_detalhes.style.display = "block";
        carregarDetalhesHTML(listaPokemons[index])

    }else{
        fecharModal();
    }

    console.log(listaPokemons[index])
}


function carregarDetalhesHTML(pokemon){
 ele_nome = document.getElementById("txt_nome").textContent = pokemon.name;
 ele_numero = document.getElementById("txt_numero").textContent = "#" + pokemon.ordem;
 ele_type1 = document.getElementById("txt_type1").textContent = pokemon.types[0];
 ele_type2 = document.getElementById("txt_type2").textContent = pokemon.types[1];
 ele_especie = document.getElementById("txt_especie").textContent = pokemon.especie;
 ele_tamanho = document.getElementById("txt_tamanho").textContent = pokemon.tamanho;
 ele_peso = document.getElementById("txt_peso").textContent = pokemon.peso;
 ele_habilidades = document.getElementById("txt_habilidades").textContent = pokemon.habilidades.join();
 ele_status_1 = document.getElementById("barra_status_1").style.width =  `${pokemon.base_stats[0]}%`;
 ele_status_2 = document.getElementById("barra_status_2").style.width =  `${pokemon.base_stats[1]}%`;
 ele_status_3 = document.getElementById("barra_status_3").style.width =  `${pokemon.base_stats[2]}%`;
 ele_status_4 = document.getElementById("barra_status_4").style.width =  `${pokemon.base_stats[3]}%`;
 ele_status_5 = document.getElementById("barra_status_5").style.width =  `${pokemon.base_stats[4]}%`;

 ele_stats_1 = document.getElementById("stats1").textContent =  pokemon.stats[0]
 ele_stats_2 = document.getElementById("stats2").textContent =  pokemon.stats[1]
 ele_stats_3 = document.getElementById("stats3").textContent =  pokemon.stats[2]
 ele_stats_4 = document.getElementById("stats4").textContent =  pokemon.stats[3]
 ele_stats_5 = document.getElementById("stats5").textContent =  pokemon.stats[4]
 ele_image = document.getElementById("imagem_pokemon").setAttribute("src", `${pokemon.image}` );

}

function fecharModal(){
    modal_detalhes.style.display = "none"
}