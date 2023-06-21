let pokemonRepository= (function(){
    let pokemonList= [];
    let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer= document.querySelector('#modal-container');

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function addListitem(pokemon) {
        let pokemonListItems= document.querySelector('list-group');
        let listItem= document.createElement('li');
        let button= document.createElement('button');
        listItem.classList.add('list-group-item');
        button.innerText= pokemon.name;
        button.classList.add('btn','btn-primary');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');
        listItem.appendChild(button);
        pokemonListItems.appendChild(listItem);
        button.addEventListener('click', function(){showDetails(pokemon)});
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
        showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
       });
    }

    function showModal(pokemon) {
        let modalBody= $(".modal-body");
        let modalTitle= $(".modal-title");
        modalTitle.empty();
        modalBody.empty();
        let titleElement= $("<h1>" + pokemon.name + "</h1>");
        let imageElement= $('<img class="modal-img" style= width:50%>');
        imageElement.attr("src", pokemon.imageUrl);
        let heightElement = $("<p>" + "height : " + pokemon.height + "</p>");
        let typesElement = $("<p>" + "types : " + pokemon.types + "</p>");
        modalTitle.append(titleElement);
        modalBody.append(imageElement);
        modalBody.append(heightElement);
        modalBody.append(typesElement);
    }

    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal('Modal tite', 'This is the content');
    });

    modalContainer.addEventListener('click', (e) => {
        let target= e.target;
        if (target === modalContainer) {
            hideModal();
        }
    })

    let dialogPromiseReject;

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains(is-visible)) {
            hideModal();
        }
    })
    
    document.querySelector('#show-dialog').addEventListener('click', () => {
        showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
            alert('confirmed!');
        }, () => {
            alert('not confirmed');
        });
    });

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