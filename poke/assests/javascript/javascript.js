function empty(){
    doucment.getElementById("abilityDescription").remove();
    //doucment.getElementById("pokemontype").remove();
}

/* this code handle all ability related activities */
function getAbilities(){

    /* create a query using the user input to call on the api */
    var input = document.getElementById("abilityDescription").innerHTML = document.getElementById("userin").value;
    var abilityURL = "https://pokeapi.co/api/v2/ability/" + input + "/";

    //create and then call the api using the ajax jQuery method
    $.ajax({
        url: abilityURL,
        method: "GET"
    }).done(function(data){
       
        document.getElementById('abilityDescription').innerHTML = data.effect_entries[1].effect;

        var names = [];

        var pokemonNumber = data['pokemon'].length      
        for(let i = 0; i < pokemonNumber; i++){
            names[i] = data.pokemon[i].pokemon.name;
            let ptag = document.createElement('p');
            ptag.classList.add(data.pokemon[i].pokemon.name);
            ptag.id = i;
            ptag.innerHTML = data.pokemon[i].pokemon.name;
        }
       
        var pokemonURL = "https://pokeapi.co/api/v2/pokemon/" + names[0] + "/";
        var counter = 1;

        for(let i = 0; i < pokemonNumber; i++){

            $.ajax({
                url: pokemonURL,
                method: "GET",
                statusCode: {
                    404: function(responseObject, textStatus, jqXHR){

                    },
                    200: function(responseObject, textStatus, jqXHR){
                       
                    }
                }
            }).done(function(pokeData){

                imgSource = pokeData.sprites.front_default;
                var x = new Image();
                x.src = imgSource;
                document.getElementById('abilityImages').appendChild(x);            
            });
            pokemonURL = "https://pokeapi.co/api/v2/pokemon/" + names[counter] + "/";
            counter++;
        }
    });
}
function getPokemon(){

    var input = document.getElementById('pokemonin').value;
    var pokemonURL = "https://pokeapi.co/api/v2/pokemon/" + input + "/";

    $.ajax({
        url: pokemonURL,
        method: "GET"
    }).done(function(pokemonData){

        imgSource = pokemonData.sprites.front_default;
        var z = new Image();
        z.src = imgSource;
        document.getElementById('pokemonimage').appendChild(z);

        document.getElementById('height').innerHTML = pokemonData.height * 10 + "cm\n";
        document.getElementById('weight').innerHTML = pokemonData.weight / 10 + "kg\n";

        //determine if pokemon has 1 or 2 types than print them
        var numberOfTypes = (pokemonData.types).length;
        document.getElementById('pokemontype').innerHTML = (pokemonData.types[0].type.name);

        //this indicates the pokemon has 2 types
        if(numberOfTypes == 2){
            document.getElementById('secondtype').innerHTML = ("/" + pokemonData.types[1].type.name);
        }
        var itemLength = (pokemonData.held_items).length;

        if(itemLength != 0){
            document.getElementById('helditemdata').innerHTML = (pokemonData.held_items[0].item.name);
        }else{
            document.getElementById('helditemdata').innerHTML = ("None");
        }
        document.getElementById('pokemonability').innerHTML = pokemonData.abilities[0].ability.name;

        var numberOfAbilities = (pokemonData.abilities).length;

        //check if a pokemon has a second ability
        if(numberOfAbilities == 2){
            document.getElementById('secondability').innerHTML = pokemonData.abilities[1].ability.name;
        }else{
            document.getElementById('secondability').innerHTML = "None";
        }
        //check if a pokemon has a second or hidden ability
        if(numberOfAbilities == 3){
            document.getElementById('secondability').innerHTML = pokemonData.abilities[1].ability.name;
            document.getElementById('hiddenability').innerHTML = pokemonData.abilities[2].ability.name;
        }else{
            document.getElementById('hiddenability').innerHTML = "None";
        }
        document.getElementById('pokedexnumber').innerHTML = pokemonData.game_indices[0].game_index;
        //document.getElementById('pokemonimage').removeChild(z);

    });
}
function getItems(){

    var input = document.getElementById('itemin').value;
    var itemURL = "https://pokeapi.co/api/v2/item/" + input + "/";

    $.ajax({
        url: itemURL,
        method: "GET"
    }).done(function(itemData){

        //get the effect of the given item from the api
        document.getElementById('itemdata').innerHTML = itemData.effect_entries[0].short_effect;

        //create an image and use the data to populate it
        itemImg = itemData.sprites.default;
        var y = new Image();
        y.src = itemImg;
        document.getElementById('itemimage').appendChild(y);
    });
}
function getMoves(){

    var input = document.getElementById('movein').value;
    var moveURL = "https://pokeapi.co/api/v2/move/" + input + "/";

    $.ajax({
        url: moveURL,
        method: "GET"
    }).done(function(moveData){

        document.getElementById('movepower').innerHTML = moveData.power;
        document.getElementById('moveaccuracy').innerHTML = moveData.accuracy;
        document.getElementById('movepp').innerHTML = moveData.pp;
        document.getElementById('movetype').innerHTML = moveData.damage_class.name;
        document.getElementById('moveeffect').innerHTML = moveData.effect_entries[0].effect;

    });
}
//this code controls all the tabs at the top of the page
function openTabs(evt, tabName){

    //declare variables
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");

    for(i = 0; i < tabcontent.length; i++){
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");

    for(i = 0; i < tablinks.length; i++){
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
function defaultTab(){
    document.getElementById("defaultOpen").click();
}
