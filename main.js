POKEMONS = [];
var pokemon1 = "flareon";
var pokemon2 = "dewgong";
var pokemon3 = "kadabra";

class Pokemons {
  constructor(images,name, type, id, hp, attack, defense, abilities) {
    this.images = images;
    this.name = name;
    this.type = type;
    this.id = id;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.abilities = abilities;
    trainerName.pokemons.push(this);
    POKEMONS.push(this);

  }
}

class PokemonsInfo {
  constructor(rate, evolves, infos) {
    this.rate = rate;
    this.evolves = evolves;
    this.infos = infos;
    trainerName.pokemons.push(this);
    POKEMONS.push(this);
  }
}

class TrainerName {
  constructor(name) {
    this.name = name;
    this.pokemons = [];
    this.info = [];
  }

  all() {
    //accepts no parameters and returns an array of pokemon objects
    console.log(this.pokemons);
  }

  get(name) {
    //accetps 1 parameter and returns a pokemon object for the pokemon it found!
    var i = 0;
    for(i in this.pokemons.length)
    if(name == this.pokemons[i].name) {
      i++;
      console.log(this.pokemons[i]);
      break;
    }
  }

}

////////////////////////////////////////////////////////////////////////////////////
//do prev and next buttons with the same eventlistener for both
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
// Search Button
let searchbtn = document.getElementById("searchbtn");
searchbtn.addEventListener("click", getPokemon);
searchbtn.addEventListener("click", getInfo);

function getPokemon(pokemon) {
  var pokemon = document.getElementById("searchbox").value;
  pokemon = pokemon.toLowerCase();
  console.log("You Searched: " +pokemon);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      console.log(data);
      //display poke info || check for id(if elseif) || display abilities (if else for num of abilities)
      var name = data["name"];
      var type = data["types"];
      var id = data["id"];
        if (id > 9 && id < 100) {
          id = id.toString();
          id = "0" + id;
        }
        else if(id < 10) {
          id = id.toString();
          id = "00" + id;
        }
      var images = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`
      var hp = data["stats"][5]["base_stat"];
      var attack = data["stats"][4]["base_stat"];
      var defense = data["stats"][3]["base_stat"];
      var abilities = data["abilities"];

      pokemons = new Pokemons(images, name, type, id, hp, attack, defense, abilities);
      console.log(pokemons);
      displayPokemon(pokemons);
    }

    else if(this.readyState == 4 && this.status == 404) {
      console.log("No file found!");
      alert("No File Found!");
    }

  };
  xhttp.open("GET", "https://fizal.me/pokeapi/api/v2/name/" +pokemon+ ".json", true);
  xhttp.send();
}

// var trainerName = new TrainerName("Christel");
var trainerName = new TrainerName("Christel", pokemon1, pokemon2, pokemon3);

////////////////////////////////////////////////////////////////////////////////////////
//Display pokemon on screen
function displayPokemon(pokemon) {
  //remove search block and h1
  let removebtn = document.getElementById("search");
  removebtn.classList.add("fadeOut");
  removebtn.classList.add("hidden");
  removebtn.classList.remove("fadeIn");
  let text = document.querySelector("h1");
  text.classList.add("hidden");
  text.classList.remove("fadeIn");
  //add image block
  let addimg = document.getElementById("pokemonImg");
  addimg.classList.add("blurFadein");
  addimg.classList.remove("fadeOut");

  let img = document.createElement("img");
  img.src = pokemon.images;
  document.getElementById("pokemonImg").appendChild(img);
  //add info block
  let addinfo = document.getElementById("pokemonInfo");
  addinfo.classList.add("blurFadein");
  addinfo.classList.remove("fadeOut");

  let h1 = document.createElement("h1");
  h1.innerHTML = pokemon.name.toUpperCase();
  document.getElementById("header").appendChild(h1);
  // display text
  let stats = document.createElement("span");
  stats.innerHTML = `ID: ${pokemon.id} <br>
                   HP: ${pokemon.hp} <br>
                   Attack: ${pokemon.attack} <br>
                   Defense: ${pokemon.defense} <br>`;
  document.getElementById("pokemonInfo").appendChild(stats);
  //type
  let t = 0;
  let types = "";
  typ = pokemon.type.length;
  console.log(typ);
  for(; t < typ;) {
    types += (pokemon["type"][t]["type"]["name"] + "\n");
    t++;
  }
  // console.log(types);
  let span3 = document.createElement("span");
  span3.innerHTML = ("Type: " +types);
  document.getElementById("pokemonInfo").appendChild(span3);

  // display abilitites
  let i = 0;
  let abilities = "";
  abil = pokemon.abilities.length;
  // console.log(abil);
  for(; i < abil;){
    abilities += (pokemon["abilities"][i]["ability"]["name"] + "\n") ;
    i++;
  }
  // console.log(abilities);
  let span2 = document.createElement("span");
  span2.innerHTML = ("Abilities: " +abilities);
  document.getElementById("pokemonInfo").appendChild(span2);

}
//////////////////////////////////////////////////////////////////////////////////////
//Get More Pokemon Information
function getInfo(pokemon) {
  var pokemon = document.getElementById("searchbox").value;
  pokemon = pokemon.toLowerCase();

  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon-species/" + pokemon + "/", true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      console.log(data);
      let rate = data["capture_rate"];
      let evolves = data["evolves_from_species"];
      // console.log(evolves);
      if(evolves === null) {
        // console.log("no");
        evolves = "No evolution";
      }
      else {
        evolves = data["evolves_from_species"]["name"].charAt(0).toUpperCase() + data["evolves_from_species"]["name"].slice(1);
      }
        for (i in data["flavor_text_entries"]) {
          // console.log(data[i]);
          if (data['flavor_text_entries'][(i)]['language']['name'] == 'en'){
            var infos = data['flavor_text_entries'][(i)]['flavor_text'];
          }
        }
        // console.log(infos);
      let info = new PokemonsInfo(rate, evolves, infos);
      // console.log(info);
      // displayPokemon(pokemons);
      writeOnScreen(info);
    }
  };
}

////////////////////////////////////////////////////////////////////////////////////////
//Display info on screen
function writeOnScreen(info) {
  // remove search block
  let removebtn = document.getElementById("search");
  removebtn.classList.add("fadeOut");
  removebtn.classList.add("hidden");
  removebtn.classList.remove("fadeIn");
  //add info block
  let addinfo = document.getElementById("pokemonText");
  addinfo.classList.add("blurFadein");
  addinfo.classList.remove("fadeOut");

  let flavor = document.createElement("span");
  flavor.innerHTML = `Capture Rate: ${info.rate} <br>
                  Evolves From: ${info.evolves} <br>
                  Description: ${info.infos}`;
  document.getElementById("pokemonText").appendChild(flavor);
}

//////////////////////////////////////////////////////////////////////////////////////
// Home Button
function button() {
  var btn = document.getElementById("homebtn").value;
  if(btn =="Off") {
    document.getElementById("homebtn").value="On";
    console.log("Click to turn button back "+btn);
    let text = document.createElement("h1");
    text.innerHTML= `Welcome ${trainerName.name}`;
    text.classList.add("blurFadein");
    document.getElementById("header").appendChild(text);
    let on = document.getElementById("search");
    on.classList.remove("fadeOut");
    on.classList.add("fadeIn");
  }
  else {
    document.getElementById("homebtn").value="Off";
    //page will reload (for now**)
    window.location.reload();
  }
}
