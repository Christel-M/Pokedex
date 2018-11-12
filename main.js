POKEMONS = [];
// var pokemon1 = "flareon";
// var pokemon2 = "dewgong";
// var pokemon3 = "kadabra";

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
  constructor(rate, evolution, info) {
    this.rate = rate;
    this.evolution = evolution;
    this.info = info;
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
  console.log("You Searched: " +pokemon);
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      console.log(data);
      //display poke info || check for id(if elseif) || display abilities (if else for num of abilities)
      var name = data["name"];
      var type = data["types"][0]["type"]["name"];
      var id = data["id"];
      id = parseInt(id);
        if (id > 9 && id < 100) {
          id = id.toString();
          id = '0' + id;
        }
        else if (id < 10) {
          id = id.toString();
          id = '00' + id;
        }
      var images = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`
      var hp = data["stats"][5]["base_stat"];
      var attack = data['stats'][4]['base_stat'];
      var defense = data['stats'][3]['base_stat'];
      var abilities = [];
      ability1 = data['abilities'][0]['ability']['name'];
      ability2 = data['abilities'][1]['ability']['name'];
      ability3 = data['abilities'][2];
      if (ability3 != undefined) {
        abilities.push(ability3['ability']['name']);
      }
      // else if (ability3 != undefined) {
      //   abilities.push(ability3['ability']['name']);
      // }
      //change to a for loop
      // for(i in abilitites.length) {
      //   if(ability2 != undefined) {
      //     // abilities[i].push(ability2['ability']['name']);
      //     console.log(abilitites[i]);
      //   }
      //   else if (ability3 != undefined) {
      //     abilities[i].push(ability3['ability']['name']);
      //   }
      //   abilitites.push(abilities[i]);
      // }
      abilities.push(ability1, ability2);
      pokemons = new Pokemons(images, name, type, id, hp, attack, defense, abilities);
      // let info = new PokemonsInfo();
      console.log(pokemons);
      // showPokeImgs(pokemons)
      displayPokemon(pokemons);
      // writeOnScreen(pokemons);
    }

    else if(this.readyState == 4 && this.status == 404) {
      console.log("No file found!");
      alert("No File Found!");
    }

  };
  xhttp.open("GET", "http://fizal.me/pokeapi/api/v2/name/" +pokemon+ ".json", true);
  xhttp.send();
}

var trainerName = new TrainerName("Christel");
// var trainerName = new TrainerName("Christel", pokemon1, pokemon2, pokemon3);

////////////////////////////////////////////////////////////////////////////////////////
//Display pokemon on screen
function displayPokemon(pokemon) {
  //remove search block and h1
  let removebtn = document.getElementById("search");
  removebtn.classList.add("fadeOut");
  removebtn.classList.remove("fadeIn");
  let text = document.querySelector("h1");
  text.classList.add("hidden");
  text.classList.remove("fadeIn");
  //add image block
  let addimg = document.getElementById("pokemonImg");
  addimg.classList.add("blurFadein");
  addimg.classList.remove("fadeOut");

  var img = document.createElement("img");
  img.src = pokemon.images;
  document.getElementById("pokemonImg").appendChild(img);
  //add info block
  let addinfo = document.getElementById("pokemonInfo");
  addinfo.classList.add("blurFadein");
  addinfo.classList.remove("fadeOut");

  var h1 = document.createElement("h1");
  h1.innerHTML = pokemon.name.toUpperCase();
  document.getElementById("header").appendChild(h1);
  var div = document.createElement("div");
  div.innerHTML = `ID: ${pokemon.id} <br>
                   Type: ${pokemon.type} <br>
                   HP: ${pokemon.hp} <br>
                   Attack: ${pokemon.attack} <br>
                   Defense: ${pokemon.defense} <br>
                   Abilities: <br>
                   ${pokemon.abilities}`;
  document.getElementById("pokemonInfo").appendChild(div);
}
//////////////////////////////////////////////////////////////////////////////////////
//Get More Pokemon Information
function getInfo(pokemon) {
  var pokemon = document.getElementById("searchbox").value;
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://pokeapi.co/api/v2/pokemon-species/" + pokemon + "/", true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      console.log(data);
      let info = new PokemonsInfo(
            data["capture_rate"],
            data["evolves_from_species"]["name"],
            data["flavor_text_entries"][2]["flavor_text"]
      );
      console.log(info);
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
  removebtn.classList.remove("fadeIn");
  //add info block
  let addinfo = document.getElementById("pokemonText");
  addinfo.classList.add("blurFadein");
  addinfo.classList.remove("fadeOut");

  var div = document.createElement("div");
  div.innerHTML = `Capture Rate: ${info.rate} <br>
                  Evolves From: ${info.evolution} <br>
                  Description: ${info.info}`;
  document.getElementById("pokemonText").appendChild(div);
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
    // let off = document.getElementById("search");
    // off.classList.add("fadeOut");
    // off.classList.remove("fadeIn");
    //page will reload (for now**)
    window.location.reload();
  }
}
