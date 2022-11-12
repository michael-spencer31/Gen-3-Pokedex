function getPokemon(){

    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    table.appendChild(thead);
    table.appendChild(tbody);

    document.getElementById('body').appendChild(table);
    let row_1 = document.createElement("tr");
    let heading_1 = document.createElement("th");
    heading_1.innerHTML = "Pokemon";
    let heading_2 = document.createElement("th");
    heading_2.innerHTML = "Number";
    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    thead.appendChild(row_1);
    var idNum;


    //gen 3 252 386
    for(var i = 252; i < 386; i++){

        let row = document.createElement("tr");
        let pokemon = document.createElement("td");
        let pokedexNum = document.createElement("td");
        let pokemonType = document.createElement("td");
        let imgURL = "";


        var pokemonURL = "https://pokeapi.co/api/v2/pokemon/" + i;

        $.ajax({
            url: pokemonURL,
            method: "GET"
        }).done(function(pokedexData){

            pokemon.innerHTML = pokedexData.name;
            pokedexNum.innerHTML = pokedexData.id;
            imgURL = pokedexData.sprites.innerHTML;

            pokemonType.innerHTML = "<img src='types/" + pokedexData.types[0].type.name + ".png' width=50>";

            if(pokedexData.types[1] != null){
                pokemonType.innerHTML += "<img src='types/" + pokedexData.types[1].type.name + ".png' width=50>";   
            }
    

            idNum = pokedexData.id;
            //add the image of each pokemon to the tag
            pokemon.innerHTML += "<img src='pokemon/main-sprites/emerald/" + idNum + ".png' width=50>";

            row.appendChild(pokemon);
            row.appendChild(pokemonType);
            row.appendChild(pokedexNum);


            tbody.appendChild(row);

            //generation 3 starts at pokemon #252 (which is treecko)
            var gen3Start = 252;
        });
    }
}