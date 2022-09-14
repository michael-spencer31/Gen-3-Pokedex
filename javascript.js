function empty(){
    doucment.getElementById("abilityDescription").remove();
    //doucment.getElementById("pokemontype").remove();
}

/* this code handle all ability related code */
function getAbilities(){

    /* create a query using the user input to call on the api */
    var input = document.getElementById("abilityDescription").innerHTML = document.getElementById("userin").value;
    var abilityURL = "https://pokeapi.co/api/v2/ability/" + input + "/";

    //create and then call the api using the ajax jQuery method
    $.ajax({
        url: abilityURL,
        //call the GET method on the data
        method: "GET"
    }).done(function(data){
       
       //get the element from the HTML page and set the text using data from the api
        document.getElementById('abilityDescription').innerHTML = data.effect_entries[1].effect;

        //create an array to use later
        var names = [];

        var pokemonNumber = data['pokemon'].length  

        //for each pokemon in the data, get their name    
        for(let i = 0; i < pokemonNumber; i++){
            names[i] = data.pokemon[i].pokemon.name;
            let ptag = document.createElement('p');
            ptag.classList.add(data.pokemon[i].pokemon.name);
            ptag.id = i;
            ptag.innerHTML = data.pokemon[i].pokemon.name;
        }
        //now, make another URL using the pokemon name found above
        var pokemonURL = "https://pokeapi.co/api/v2/pokemon/" + names[0] + "/";
        var counter = 1;

        //for each pokemon we found, loop
        for(let i = 0; i < pokemonNumber; i++){

            //make a new call to the API for each pokemon name
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

                //create an image for each pokemon and add it to the HTML
                imgSource = pokeData.sprites.front_default;
                var x = new Image();
                x.src = imgSource;
                document.getElementById('abilityImages').appendChild(x);            
            });
            //change the url for the call we are going to make
            pokemonURL = "https://pokeapi.co/api/v2/pokemon/" + names[counter] + "/";
            counter++;
        }
    });
}
//this function gets data about the specified pokemon
function getPokemon(){

    //get the input from the html document and create a url
    var input = document.getElementById('pokemonin').value;
    var pokemonURL = "https://pokeapi.co/api/v2/pokemon/" + input + "/";

    //call the api with the ajax jQuery method and get data back
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
        //determine if the pokemon has a held item
        var itemLength = (pokemonData.held_items).length;

        //check if the pokemon can have a held item when found in the wild
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
    });
}
//this function gets information about a specified item 
function getItems(){

    //get the input from the html document
    var input = document.getElementById('itemin').value;
    var itemURL = "https://pokeapi.co/api/v2/item/" + input + "/";

    //call the api with the ajax jQuery method
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
//this function gets information about a specific move
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
        document.getElementById('movepriority').innerHTML = moveData.priority;
        document.getElementById('movehealing').innerHTML = moveData.meta.healing + "%";
        document.getElementById('movecrit').innerHTML = "+" + moveData.meta.crit_rate;

    });
}
//this function gets information about the locations of a pokemon
function getEncounters(){

    var input = document.getElementById('encounterin').value;
    var encounterURL = "https://pokeapi.co/api/v2/pokemon/" + input + "/encounters/";

    $.ajax({
        url: encounterURL,
        method: "GET"
    }).done(function(encounterData){

        var encounterLength = encounterData.length;

        for(var i = 0; i < encounterLength; i++){

            document.getElementById('encounterdetails').innerHTML += "<br />" + encounterData[i].location_area.name 
            + " Level:" + encounterData[i].version_details[0].encounter_details[0].min_level + "-" 
            + encounterData[i].version_details[0].encounter_details[0].max_level + " "
            + "Encounter Rate: " + encounterData[i].version_details[0].encounter_details[0].chance + "%";
        }


    });
}
//clear the previously obtained data from the field
function resetEncounters(){
    document.getElementById('encounterdetails').innerHTML = " ";
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
