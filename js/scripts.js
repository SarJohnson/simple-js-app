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
    function addListitem(pokemon) {
        let pokemonList= document.querySelector('.pokemonList');
    }
    function getAll() {
        return pokemonList;
    }
    return {
        add: add,
        addListitem: addListitem,
        getAll: getAll
    };
}) ();


pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListitem(pokemon);
})