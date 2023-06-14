let pokemonRepository= (function(){
    let pokemonList= [
        {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']},
        {name: 'Ivysaur', height: 1, type: ['grass', 'poison']},
        {name: 'Venusaur', height: 2, type: ['grass', 'poison']},
        {name: 'Charizard', height: 1.7, type: ['fire', 'flying']}
    ];
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    function getAll() {
        return pokemonList;
    }
    return {
        add: add,
        getAll: getAll
    };
}) ();

function myLoopFunction(pokemon){
    if (pokemon.height <2 && pokemon.height >=1) {
        document.write(pokemon.name + "Height:" + pokemon.height + "<br/>");
    } else if (pokemon.height >=2) {
        document.write(pokemon.name + "Height:" + pokemon.height + "That is MASSIVE!" + "<br/>");
    } else {
        document.write(pokemon.name + "Height:" + pokemon.height + "So small" + "<br/>");
    }
}
pokemonRepository.getAll().forEach(myLoopFunction);