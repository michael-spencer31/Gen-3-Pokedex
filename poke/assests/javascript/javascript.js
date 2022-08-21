function empty(){
    doucment.getElementById("abilityDescription").remove();
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

    var pokeURL = "https://pokeapi.co/api/v2/pokemon/crobat";

    $.ajax({
        url: pokeURL,
        method: "GET"
    }).done(function(pokemonData){

        document.getElementById('pokemondata').innerHTML = pokemonData.height * 10 + "cm\n";
        document.getElementById('pokemondata').append("\n\n\n");
        document.getElementById('pokemondata').append(pokemonData.types[0].type.name + " ");
        document.getElementById('pokemondata').append(pokemonData.types[1].type.name);
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
