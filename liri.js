require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require('node-spotify-api');
const axios = require('axios');
const moment = require('moment');
const spotify = new Spotify(keys.spotify);
const dotenv = require('dotenv').config();
const chalk = require('chalk'); //colored text
const center = require('center-align'); //align center

moment().format();
console.log(moment().format())

let command = process.argv[2];
let seacrhTerm = process.argv[3];

switch (command) {
    case 'concert-this':
        console.log('we are in concert-this');
        concertThis();
        break;
    case 'spotify-this-song':
        console.log('we are in spotify-this-song');
        spotifyThis();
        break;
    case 'movie-this':
        console.log('we are in movie-this');
        movieThis();
        break;
    case 'do-what-it-says':
        console.log('we are in do-what-it-says');
        doWhatItSays();
        break;

    default:
        console.log('no comands')
        break;
}


function spotifyThis() {
    
}
function movieThis() {
    axios.get().then().catch();
}
function doWhatItSays() {
    
}


/*
Make it so liri.js can take in one of the following commands:
    * concert-this
        -  node comand: node liri.js concert-this <artist/band name here>
        -  API: bands in town
        -  API request: "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
        -  response: Name of the venue, venue location, date of the event (use moment to format this as "MM/DD/YYYY")
*/

//bands in town
function concertThis() {
    //using axios to fetch data from bands i  tomw
    axios
    .get("https://rest.bandsintown.com/artists/" + seacrhTerm + "/events?app_id=codingbootcamp")
    .then(function (response) {
        let arr = response.data; //give it short name
        console.log(`Artist:  ${seacrhTerm}\n`) ;// log the artista name
        console.log(`There are ${arr.length} upcoming shows for ${seacrhTerm}\n`); //show number of upcoming shows
        //itearate trough each show and fetch the data
        arr.forEach(element => {
            console.log(chalk.blue `============================================`);  
            console.log(chalk `{blue === }  At ${element.venue.name}`);
            console.log(chalk `{blue === }  In ${(element.venue.city)} ${element.venue.region}, ${element.venue.country}`);
            console.log(chalk `{blue === }  ${moment(element.datetime).format("MMMM Do YYYY, h:mm a")}`);
            console.log(chalk.blue `============================================\n`);     
                  

            
        });
        
    })
    .catch(function (error) {
        console.log(error)
    });
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


    * movie-this
        - node comand: node liri.js movie-this '<movie name here>'
        - API: OMDB
        - output:   * Title of the movie.
                    * Year the movie came out.
                    * IMDB Rating of the movie.
                    * Rotten Tomatoes Rating of the movie.
                    * Country where the movie was produced.
                    * Language of the movie.
                    * Plot of the movie.
                    * Actors in the movie.
        - If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'




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