function getPokemon(){

    //gen 3 252 386
    for(var i = 252; i < 386; i++){

        var pokemonURL = "https://pokeapi.co/api/v2/pokemon/" + i;

        $.ajax({
            url: pokemonURL,
            method: "GET"
        }).done(function(pokedexData){

            console.log(pokedexData.name);

            //generation 3 starts at pokemon #252 (which is treecko)
            var gen3Start = 252;
        });
    }
}