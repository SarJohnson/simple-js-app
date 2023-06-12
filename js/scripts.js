let pokemonList= [
    {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']},
    {name: 'Ivysaur', height: 1, type: ['grass', 'poison']},
    {name: 'Venusaur', height: 2, type: ['grass', 'poison']},
    {name: 'Charizard', height: 1.7, type: ['fire', 'flying']}
];

for (let i=0; i<pokemonList.length; i++) {
    if (pokemonList[i].height <2 && pokemonList[i].height >=1) {
        document.write(pokemonList[i].name + "Height:" + pokemonList[i].height + "Wow that's big!" + "<br/>");
    } else if (pokemonList[i].height >=2) {
        document.write(pokemonList[i].name + "Height:" + pokemonList[i].height + "That is MASSIVE!" + "<br/>");
    } else {
        document.write(pokemonList[i].name + "Height:" + pokemonList[i].height + "So small!" + "<br/>");
    }
}