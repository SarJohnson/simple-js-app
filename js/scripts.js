let pokemonRepository= (function(){
    let pokemonList= [];
    let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    function addListitem(pokemon) {
        let pokemonListItems= document.querySelector('.pokemon-list');
        let listItem= document.createElement('li');
        let button= document.createElement('button');
        button.innerText= pokemon.name;
        button.classList.add('button-class');
        listItem.appendChild(button);
        pokemonListItems.appendChild(listItem);
        button.addEventListener('click', function(){showDetails(pokemon);});
    }
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon= {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }
    function showDetails(pokemon) {
        console.log(pokemon);
    }
    function getAll() {
        return pokemonList;
    }
    return {
        add: add,
        getAll: getAll,
        addListitem: addListitem,
        loadList: loadList
    };
}) ();


pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach( function (pokemon) {
        pokemonRepository.addListitem(pokemon);
    }); 
});