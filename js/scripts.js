let pokemonRepository= (function(){
    let pokemonList= [];
    let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

      function addListitem(pokemon) {
        let pokemonList= document.querySelector('.list-group');
        let listItem= document.createElement('li');
        let button= document.createElement('btn', 'btn-primary');
        listItem.classList.add('list-group-item');
        button.innerText= pokemon.name;
        button.classList.add('btn-primary');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        button.addEventListener('click', function(){showDetails(pokemon)});
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon= {
                    name: item.name,
                    detailsUrl: item.url,
                    height: item.height
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url= item.detailsUrl;
        return fetch(url).then(function (response){
            return response.json();
        }).then(function (details) {
            item.imageUrl=details.sprites.front_default;
            item.height=details.height;
            item.types=details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
       loadDetails(pokemon).then(function () {
        showModal(pokemon);
       });
    }

    function showModal(item) {
        let modalBody= $('.modal-body');
        let modalTitle= $('.modal-title');
        modalTitle.empty();
        modalBody.empty();
        let titleElement= $('<h1>' + item.name + '</h1>');
        let imageElement= $('<img class="modal-img" style= width:50%>');
        imageElement.attr('src', item.imageUrl);
        let heightElement = $('<p>' + 'Height : ' + item.height + ' decimeters' + '</p>');
        let typesElement = $('<p>' + 'Types : ' + item.types.map(getAllTypes).join(', ') + '</p>');
        function getAllTypes (item) {
            return [item.type.name]
        }
        modalTitle.append(titleElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(typesElement);
    }

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('show')) {
            hideModal();
        }
    })
    
    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll,
        addListitem: addListitem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails,
        showModal: showModal 
    };
}) ();


pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach( function (pokemon) {
        pokemonRepository.addListitem(pokemon);
    }); 
});