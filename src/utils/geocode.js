const request = require("request");

const geocode = (address, callback) => {
    const UrlMapBox = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
    const Location = address;
    const EncodedLocation = encodeURIComponent(Location) + ".json";
    const QueryString = "?access_token=pk.eyJ1IjoiYmZpZ3VlcmVvMjAiLCJhIjoiY2sybmczanZoMDA1cTNucXExbHRhc2EweSJ9.lv3ZfTnxfY1wqp9ftu4Kgw&limit=1";

    const url  = UrlMapBox + EncodedLocation + QueryString;
    const proxy = "http://185.46.212.88:10560";
    const rejectUnauthorized = false;
    const json = true;

    /*
    const options = {
        url: url,
        proxy: "http://185.46.212.88:10560",
        rejectUnauthorized: false,
        json: true
    }
    */

    const port = process.env.PORT || 3000;

    var options = {};

    if(port === 3000)
        options = {url, proxy, rejectUnauthorized, json};
    else
        options = {url, json};

    //const options = {url, proxy, rejectUnauthorized, json};

    request(options, (error, {body}) => {
        if(error)
        {
            callback("Unable to connect to location services!", undefined);
        }
        else if(body.features.length === 0) {
            callback("Unable to find location. Try another search.", undefined)
        }
        else
        {
            const Latitude = body.features[0].center[1];
            const Longitude = body.features[0].center[0];
            const PlaceName = body.features[0].place_name;

            //console.log(`The Latitude is ${Latitude} and the Longitude is ${Longitude}`);

            callback(undefined, {Latitude, Longitude, PlaceName});
        }
    });
 
}

module.exports = geocode;