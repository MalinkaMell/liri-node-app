require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const axios = require('axios');
const moment = require('moment');
const spotify = new Spotify(keys.spotify);
const dotenv = require('dotenv').config();
const chalk = require('chalk'); //colored text
const center = require('center-align'); //align center
const fs = require("fs");

let command = process.argv[2];
let seacrhTerm = process.argv.slice(3).join(" ");

switch (command) {
    case 'concert-this':
        console.log('we are in concert-this');
        concertThis(seacrhTerm);
        break;
    case 'spotify-this-song':
        console.log('we are in spotify-this-song');
        spotifyThis();
        break;
    case 'movie-this':
        console.log('we are in movie-this');
        movieThis(seacrhTerm);
        break;
    case 'do-what-it-says':
        console.log('we are in do-what-it-says');
        doWhatItSays()
        break;

    default:
        console.log('no comands')
        break;
}


function spotifyThis(seacrhTerm) {

}



//bands in town
function concertThis(seacrhTerm) {
    if (!seacrhTerm) {
        seacrhTerm = "Megadeth";
    }
    console.log(seacrhTerm)
    //using axios to fetch data from bands i  tomw
    axios
        .get("https://rest.bandsintown.com/artists/" + seacrhTerm + "/events?app_id=codingbootcamp")
        .then(function (response) {
            let arr = response.data; //give it short name
            console.log(`https://rest.bandsintown.com/artists/${seacrhTerm}/events?app_id=codingbootcamp`);
            
            console.log(chalk.blue`===================================================================`);
            console.log(chalk.blue`===`);
            //show number of upcoming shows
            console.log(chalk`{blue === }  There are ${arr.length} upcoming shows for {blue ${seacrhTerm.toUpperCase()}}!`);
            console.log(chalk.blue`===`);

            //itearate trough each show and fetch the data
            arr.forEach(element => {
                console.log(chalk.blue`===================================================================`);
                console.log(chalk`{blue === }  At ${element.venue.name}`);
                console.log(chalk`{blue === }  In ${(element.venue.city)} ${element.venue.region}, ${element.venue.country}`);
                console.log(chalk`{blue === }  ${moment(element.datetime).format("MMMM Do YYYY, h:mm a")}`);
                console.log(chalk.blue`===================================================================\n`);
            });

        })
        .catch(function (error) {
            console.log(error)
        });
}

//OMDB
function movieThis(seacrhTerm) {
    

    if (!seacrhTerm) {
        seacrhTerm = "Mr. Nobody";
    }
    axios
        .get("http://www.omdbapi.com/?t=" + seacrhTerm + "&apikey=" + keys.omdb.apikey)
        .then(function (response) {
            let arr = response.data; //give it short name
            let words = arr.Plot.split(" "); //grab plot and make an array of it
            //purely for aesthetic purposes
            let firstPart = words.slice(0, Math.floor(words.length / 2)).join(" "); // slice and join the first half of my array
            let secondPart = words.slice(Math.floor(words.length / 2), words.length).join(" "); // slice and join the second half of my array

            console.log(chalk.green("=================================================================================" +
                                    "================================================================================="));
            console.log(chalk.green`===`);
            //show number of upcoming shows
            console.log(chalk `{green ===                    Title:} {yellow ${arr.Title.toUpperCase()}}`);
            console.log(chalk `{green ===                     Year:} {yellow ${arr.Year}}`);
            console.log(chalk `{green ===                 Language:} {yellow ${arr.Language}}`);
            console.log(chalk `{green ===                  Country:} {yellow ${arr.Country}}`);
            console.log(chalk `{green ===  ${arr.Ratings[0].Source}:} {yellow ${arr.Ratings[0].Value}}`);
            console.log(chalk `{green ===          ${arr.Ratings[1].Source}:} {yellow ${arr.Ratings[1].Value}}`);
            console.log(chalk `{green ===                   Actors:} {yellow ${arr.Actors}}`);
            console.log(chalk `{green ===                     Plot:} {yellow ${firstPart}}`);
            console.log(chalk `{green ===                          } {yellow ${secondPart}}`);
            console.log(chalk.green`===`);
            console.log(chalk.green("=================================================================================" +
                                    "================================================================================="));
        })
        .catch(function (error) {
            console.log(error)
        });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf-8", function(err, data) {
        if(err) {
            return console.log(err);
        }
        let slitOnLineBreak = data.split("\n");
        let randomChoise = Math.floor(Math.random() * slitOnLineBreak.length);
        let splitCommands = slitOnLineBreak[randomChoise].split(",");
        command = splitCommands[0].trim();
        seacrhTerm = splitCommands[1].trim();
        console.log(command);
        console.log(seacrhTerm);
        
        if (command === "concert-this") {
            concertThis(seacrhTerm);
        } else if (command === "spotify-this-song") {
            spotifyThis(seacrhTerm);
        } else if (command === "movie-this") {
            movieThis(seacrhTerm);
        }
    })
}
/*



    * spotify-this-song
        - node comand: node liri.js spotify-this-song '<song name here>'
        - API: spotify
        - response: Artist(s), the song's name, a preview link of the song from Spotify, the album that the song is from
        - If no song is provided then your program will default to "The Sign" by Ace of Base.
        - package:
            npm install --save node-spotify-api
            https://www.npmjs.com/package/node-spotify-api






    * do-what-it-says
        - node comand: node liri.js do-what-it-says
        - package: fs
        - LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands
        - It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt
        - Edit the text in random.txt to test out the feature for movie-this and concert-this.

    BONUS:
        - In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
        - Make sure you append each command you run to the log.txt file.
        - Do not overwrite your file each time you run a command.
*/