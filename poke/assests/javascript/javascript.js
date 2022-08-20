var teamListElement = $("#team-list");
var teamElement = $("#team");
var playerListElement = $("#player-list");
var playerElement = $("#player");

// create a list of all team IDs for later
var teamIDList = [];
var playerIDList = [];

function empty(){
    //document.getElementById("imghold").remove();

    //doucment.getElementById("demo").remove();
}

function displayinput(){
    var input = document.getElementById("demo").innerHTML = document.getElementById("userin").value;
    var abilityURL = "https://pokeapi.co/api/v2/ability/" + input + "/";
    var pokemonURL = "https://pokeapi.co/api/v2/pokemon/mudkip/";

    $.ajax({
        url: abilityURL,
        method: "GET"
    }).done(function(data){
        

        //document.getElementById("placehere").appendChild(elem);

        /**
        imgSource = data.sprites.front_default;
        var x = new Image();
        x.src = imgSource;
        document.getElementById("imghold").appendChild(x);
        */
        //document.getElementById("demo").innerHTML = data.sprites.front_default;
        //document.getElementById("demo").innerHTML = data.effect_entries[1].effect;
        //document.getElementById("imghold").innerHTML = data.pokemon[0].pokemon.name;

        
        //var names = [];
        
        for(let i = 0; i < 3; i++){
            //document.getElementById("demo").appendChild(data.pokemon[i].pokemon.name);
            //names[i] = data.pokemon[i].pokemon.name;
            let ptag = document.createElement('p');
            ptag.classList.add(data.pokemon[i].pokemon.name);
            ptag.id = i;
            ptag.innerHTML = data.pokemon[i].pokemon.name;
            document.getElementById('demo').appendChild(ptag);
        }
        document.getElementById("demo").appendChild("emma");
        $.ajax({
            url: pokemonURL,
            method: "GET"
        }).done(function(pokeData){

            document.getElementById("demo").innerHTML = "emma";


        });
    });
}






