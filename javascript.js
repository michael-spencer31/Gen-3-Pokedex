//this function is called as soon as the page is loaded so data appears instantly
window.onload = function(){
    getPokemon();
}

function getPokemon(){

    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    //each pokemon has 6 stats (hp, attack, defense, special attack, special defense, speed) so loop through 6 times
    const BST = 6;
    //generation 3 starts at pokedex #252 (treecko) and goes to 386 (jirachi)
    const gen3Start = 252;
    const gen3End = 386;

    table.appendChild(thead);
    table.appendChild(tbody);

    //create headings for the table and append them to the first row
    document.getElementById('body').appendChild(table);
    let row_heading = document.createElement("tr");
    let pokemon_heading = document.createElement("th");
    pokemon_heading.innerHTML = "Pokemon";
    let type_heading = document.createElement("th");
    type_heading.innerHTML = "Type";
    let pokedex_heading = document.createElement("th");
    pokedex_heading.innerHTML = "Pokedex Number";
    let bst_heading = document.createElement("th");
    bst_heading.innerHTML = "BST";
    row_heading.appendChild(pokemon_heading);
    row_heading.appendChild(type_heading);
    row_heading.appendChild(pokedex_heading);
    row_heading.appendChild(bst_heading);
    thead.appendChild(row_heading);

    var idNum;

    for(var i = gen3Start; i < gen3End; i++){

        //setup table variables to use to populate the table later on
        let row = document.createElement("tr");
        let pokemon = document.createElement("td");
        let pokedexNum = document.createElement("td");
        let pokemonType = document.createElement("td");
        let pokemonStats = document.createElement("td");
        let imgURL = "";
        let pokemonBST = 0;

        //create the url to call on the api
        var pokemonURL = "https://pokeapi.co/api/v2/pokemon/" + i;

        //start the ajax call
        //async has to be set to false here to make sure everything prints in order
        $.ajax({
            url: pokemonURL,
            method: "GET",
            async: false
        }).done(function(pokedexData){

            pokedexNum.innerHTML = pokedexData.id;
            imgURL = pokedexData.sprites.innerHTML;

            pokemonType.innerHTML = "<img src='types/" + pokedexData.types[0].type.name + ".png' width=50>";

            //check if the pokemon has 2 types or not, if it does print the other type
            if(pokedexData.types[1] != null){
                pokemonType.innerHTML += "<img src='types/" + pokedexData.types[1].type.name + ".png' width=50>";   
            }
            idNum = pokedexData.id;
            //add the image of each pokemon to the tag
            pokemon.innerHTML += "<img src='pokemon/main-sprites/emerald/" + idNum + ".png' width=50>";
            
            for(let j = 0; j < BST; j++){

                pokemonBST += pokedexData.stats[j].base_stat;
            }
            pokemonStats.innerHTML = pokemonBST;
            //append the data to the table 
            row.appendChild(pokemon);
            row.appendChild(pokemonType);
            row.appendChild(pokedexNum);
            row.appendChild(pokemonStats);
            tbody.appendChild(row);
        });
    }
}