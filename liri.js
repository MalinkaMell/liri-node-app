require('dotenv').config(); //to read the .env
const keys = require('./keys.js'); //import my keys
const Spotify = require('node-spotify-api'); //spotify
const axios = require('axios'); //axios for GET requests
const moment = require('moment'); //moment for nice date and time display
const spotify = new Spotify(keys.spotify); //spotify
const chalk = require('chalk'); //colored text
const fs = require("fs"); //file system

let command = process.argv[2]; //track user command (concert-this || spotify-this-song || movie-this)
let seacrhTerm = process.argv.slice(3).join(' '); //track the artist || movie || song

//using switch for a change 
switch (command) {
    case 'concert-this':
        concertThis(seacrhTerm);
        break;
    case 'spotify-this-song':
        spotifyThis(seacrhTerm);
        break;
    case 'movie-this':
        movieThis(seacrhTerm);
        break;
    case 'do-what-it-says':
        doWhatItSays()
        break;
    default:
        console.log('||  (O.o)                                                                               (O.o)  ||'.length)
        console.log(chalk`{blue   _____                                                                                 _____}`);
        console.log(chalk`{blue  ===============================================================================================}`);
        console.log(chalk`{blue ||                                                                                             {blue ||}}`);
        console.log(chalk`{blue ||}  {green (\\_/)}               {cyan  Hello! I am Liri! How may I assist you today?}                  {green (\\_/)}  {blue ||}`);
        console.log(chalk`{blue ||}  {green (O.o)}                                                                               {green (O.o)}  {blue ||}`);
        console.log(chalk`{blue ||}  {green (> <)}                    {green  You can choose between four commands:}                     {green (> <)}  {blue ||}`);
        console.log(chalk`{blue ||}                                                                                             {blue ||}`);
        console.log(chalk`{blue ||}     {cyan  concert-this [arstist/band name] } {green  to display artist\'s upcoming events information}     {blue ||}`);
        console.log(chalk`{blue ||}      {cyan  spotify-this-song [song name]} {green  to display information about the song}                  {blue ||}`);
        console.log(chalk`{blue ||}      {cyan  movie-this [movie name]} {green  to display information about the movie}                       {blue ||}`);
        console.log(chalk`{blue ||}           {cyan  do-what-it-says} {green  to let me chose random between artist, movie or song!}          {blue  ||}`);
        console.log(chalk.blue`|||||                                                                                       |||||`);
        console.log(chalk.blue`    =========================================================================================`);
        console.log(chalk.blue`     ||                                                                                   ||`);
        console.log(chalk.blue`     ||___________________________________________________________________________________||`);
        
  
        break;
}

//bands in town
function concertThis(seacrhTerm) {
    //default for bands
    if (!seacrhTerm) {
        seacrhTerm = 'Megadeth';
    }
    console.log(seacrhTerm)
    //using axios to fetch data from bands i  town
    axios
        .get("https://rest.bandsintown.com/artists/" + seacrhTerm + "/events?app_id=codingbootcamp")
        .then(function (response) {
            let arr = response.data; //give it short name
            //all this mess to make it look pretty in console. is there an easier method?
            console.log(chalk.blue`===================================================================`);
            console.log(chalk.blue`===`);
            //show number of upcoming shows
            console.log(chalk`{blue === }  There are ${arr.length} upcoming shows for {blue ${seacrhTerm.toUpperCase()}}!`);
            console.log(chalk.blue`===`);
            //write it to log.txt
            fs.appendFile('log.txt', '===============================================================\n\n' + command +
                ' ' + seacrhTerm + '\n\n' +
                'There are ' + arr.length + ' upcoming shows for ' + seacrhTerm.toUpperCase() + '!\n\n',
                function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });

            //itearate trough each show and fetch the data
            arr.forEach(element => {
                console.log(chalk.blue`===================================================================`);
                console.log(chalk`{blue ===    Venue name: }  ${element.venue.name}`)
                console.log(chalk`{blue === City, country: }  ${(element.venue.city)} ${element.venue.region}, ${element.venue.country}`);
                console.log(chalk`{blue ===          Date: }  ${moment(element.datetime).format('MMMM Do YYYY, h:mm a')}`);
                console.log(chalk.blue`===================================================================\n`);

                //write it to log.txt
                fs.appendFile('log.txt', 'At ' + element.venue.name + '.\nIn ' + element.venue.city + element.venue.region +
                    element.venue.country + '\n' + moment(element.datetime).format('MMMM Do YYYY, h:mm a') +
                    '\n\n',
                    function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    });
            });
        })
        .catch(function (err) {
            console.log(err)
        });
}

//OMDB
function movieThis(seacrhTerm) {
    //default for movies
    if (!seacrhTerm) {
        seacrhTerm = 'Mr. Nobody';
    }
    axios
        .get("http://www.omdbapi.com/?t=" + seacrhTerm + "&apikey=" + keys.omdb.apikey)
        .then(function (response) {
            let arr = response.data; //give it short name
            let words = arr.Plot.split(' '); //grab plot and make an array of it
            //purely for aesthetic purposes 
            let firstPart = words.slice(0, Math.floor(words.length / 2)).join(' '); // slice and join the first half of my array
            let secondPart = words.slice(Math.floor(words.length / 2), words.length).join(' '); // slice and join the second half of my array

            //loggin everything to console in very pretty window
            console.log(chalk.green('=================================================================================' +
                '================================================================================='));
            console.log(chalk.green`===`);
            //show number of upcoming shows
            console.log(chalk`{green ===                    Title:} {yellow ${arr.Title.toUpperCase()}}`);
            console.log(chalk`{green ===                     Year:} {yellow ${arr.Year}}`);
            console.log(chalk`{green ===                 Language:} {yellow ${arr.Language}}`);
            console.log(chalk`{green ===                  Country:} {yellow ${arr.Country}}`);
            console.log(chalk`{green ===  ${arr.Ratings[0].Source}:} {yellow ${arr.Ratings[0].Value}}`);
            console.log(chalk`{green ===          ${arr.Ratings[1].Source}:} {yellow ${arr.Ratings[1].Value}}`);
            console.log(chalk`{green ===                   Actors:} {yellow ${arr.Actors}}`);
            console.log(chalk`{green ===                     Plot:} {yellow ${firstPart}}`);
            console.log(chalk`{green ===                          } {yellow ${secondPart}}`);
            console.log(chalk.green`===`);
            console.log(chalk.green('=================================================================================' +
                '================================================================================='));
            //write it to log.txt
            fs.appendFile('log.txt', '===============================================================\n\n' +
                command + ' ' + seacrhTerm + '\n\n' +
                'Title: ' + arr.Title + '\n' +
                'Year: ' + arr.Year + '\n' +
                'Language: ' + arr.Language + '\n' +
                'Country: ' + arr.Country + '\n' +
                arr.Ratings[0].Source + ': ' + arr.Ratings[0].Value + '\n' +
                arr.Ratings[1].Source + ': ' + arr.Ratings[1].Value + '\n' +
                'Actors: ' + arr.Actors + '\n' +
                'Plot: ' + arr.Plot + '\n\n',
                function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
        })
        .catch(function (err) {
            console.log('logging error ' + err);
            //ask for help one of TAs, it's not catching
            /* fs.appendFile('log.txt', '===============================================================\n\n' + err + '\n\n',
                function (err) {
                    if (err) {
                        return console.log(err);
                    }
                }); */
        });
}

//spotify
function spotifyThis(seacrhTerm) {
    //default for song
    if (!seacrhTerm) {
        seacrhTerm = "The Sign Ace of Base";
    }
    // response: Artist(s), the song's name, a preview link of the song from Spotify, the album that the song is from
    spotify
        .search({ type: 'track', query: seacrhTerm })
        .then(function (response) {
            let makeItShort = response.tracks.items[0];

            //hell yeah! that's a rock hand! made it myself! you more than welcome to use it if you like it, grab it clean from from design.js
            console.log(chalk`
{yellow ===============================================================================================
===         __ 
===        |  |      __ 
===        |  |__   |  |
===        |  |  |__|  |}    Artist: {cyan ${makeItShort.artists[0].name}}
{yellow ===     __ |  |  |  |  |}      Song: {cyan ${makeItShort.name}}
{yellow ===    |  |   |  |  |  |}     Album: {cyan ${makeItShort.album.name}}
{yellow ===    |  |         |  |}      Link: {blue.underline ${makeItShort.external_urls.spotify}}
{yellow ===    |_              | 
===       |           | 
===        |         | 
===        |         | 
===============================================================================================}`)
            //write it to log.txt
            fs.appendFile('log.txt', '===============================================================\n\n' +
                command + ' ' + seacrhTerm + '\n\n' +
                'Artist: ' + makeItShort.artists[0].name +' \n' +
                'Song: ' + makeItShort.name + '\n' +
                'Album: ' + makeItShort.album.name + '\n' +
                'Link: ' + makeItShort.external_urls.spotify + '\n\n',
                function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
        })
        .catch(function (err) {
            console.log(err);
        });
}

//do-what-it-says
function doWhatItSays() {
    //read it from random.txt
    fs.readFile('random.txt', 'utf-8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        //split string on line break and put it in array
        let slitOnLineBreak = data.split('\n');
        //random number from 0 to 2
        let randomChoise = Math.floor(Math.random() * slitOnLineBreak.length);
        //splitting the element, dividing the command and value
        let splitCommands = slitOnLineBreak[randomChoise].split(',');
        //chosen command
        command = splitCommands[0].trim();
        //and value
        seacrhTerm = splitCommands[1].trim();
        //calling function based on the command choosen
        if (command === 'concert-this') {
            concertThis(seacrhTerm);
        } else if (command === 'spotify-this-song') {
            spotifyThis(seacrhTerm);
        } else if (command === 'movie-this') {
            movieThis(seacrhTerm);
        }
    })
}


