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
        button.classList.add('btn');
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

    function showModal(name, height, imageUrl) {
        modalContainer.innerHTML='';
        let modal= document.createElement('div');
        modal.classList.add('modal');
        let closeButtonElement= document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText= 'Close';
        closeButtonElement.addEventListener('click', hideModal);
        let titleElement= document.createElement('h1');
        titleElement.innerText= name;
        let imageContainer= document.createElement('div');
        imageContainer.classList.add('image');
        let imageElement= document.createElement('img');
        imageElement.src= imageUrl;
        let contentElement= document.createElement('p');
        contentElement.innerText= 'Height: ';
        contentElement.innerHTML += height;
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(imageContainer);
        imageContainer.appendChild(imageElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);
        modalContainer.classList.add('is-visible');
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
        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject= null;
        }
    }

    function showDialog() {
        let modal= modalContainer.querySelector('.modal');
        let confirmButton= document.createElement('button');
        confirmButton.classList.add('modal-confirm');
        confirmButton.innerText= 'Confirm';
        let cancelButton= document.createElement('button');
        cancelButton.classList.add('modal-cancel');
        cancelButton.innerText= 'Cancel';
        modal.appendChild(confirmButton);
        modal.appendChild(cancelButton);
        confirmButton.focus();
        return new Promise((resolve, reject) => {
            cancelButton.addEventListener('click', hideModal);
            confirmButton.addEventListener('click', () => {
                dialogPromiseReject= null;
                hideModal();
                resolve();
            });
            dialogPromiseReject= reject;
        });
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
    };
}) ();


pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach( function (pokemon) {
        pokemonRepository.addListitem(pokemon);
    }); 
});