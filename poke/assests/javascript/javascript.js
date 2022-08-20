function empty(){
    doucment.getElementById("abilityDescription").remove();
}

function getAbilities(){

    var input = document.getElementById("abilityDescription").innerHTML = document.getElementById("userin").value;
    var abilityURL = "https://pokeapi.co/api/v2/ability/" + input + "/";

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
