const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const UrlDarkSky = "https://api.darksky.net/forecast/fdf46b222d2bf67f5e48c124e504677d/" + latitude + "," + longitude;
    const QueryString = "?units=us";

    const url = UrlDarkSky + QueryString;
    const proxy = "http://185.46.212.88:10560";
    const rejectUnauthorized = false;
    const json = true;

    /*
    const options = { 
        url: UrlDarkSky + QueryString,
        proxy: "http://185.46.212.88:10560",
        rejectUnauthorized: false,
        json: true
    }
    */

    const options = {url, proxy, rejectUnauthorized, json};

    request(options, (error, { body }) => {

        if(body.error)
        {
            //console.log("Unable to find location!");
            callback("Unable to find location!", undefined);
        }
        else if(error)
        {
            callback("ERROR", undefined);
        }
        else {
            const Temperature = body.currently.temperature;
            const RainProb = body.currently.precipProbability;
            const Summary = body.daily.data[0].summary;
    
            const WeatherMessage = `${Summary}. It is currently ${Temperature} degrees out. There is a ${RainProb * 100}% chance of Rain`;
            //console.log(response.body.daily.data[0].summary + WeatherMessage);
            //callback(undefined, {WeatherMessage, Summary});
            callback(undefined, WeatherMessage)
        }
    })

    
}

module.exports = forecast;