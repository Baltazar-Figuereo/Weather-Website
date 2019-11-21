const path = require("path");
const express = require("express"); // returns a single function
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");


// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, "../public"))

const port = process.env.PORT || 3000;

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Baltazar"
    });
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: 'Baltazar'
    });
})

app.get("", (req, res) => {
    res.send("Hello Express");
    //res.send("<h1>Weather</h1>")
})

app.get("/help", (req, res) => {
    //res.send("Help Page");  
    res.render("help", {
        message: "Help",
        title: "Help",
        name: "Baltazar"
    })
})

app.get("/about", (req, res) => {
    //res.send("About Page");   
})

app.get("/weather", (req, res) => {

    const Address = req.query.address;

    if(!Address)
    {
        const ErrorMessage = "There is no Address";

        res.send({ErrorMessage});
    }
    else
    {
        geocode(Address, (GeoError, {Latitude, Longitude, PlaceName}) => {

            if(GeoError)
            {
                res.send({GeoError})
            }
            else
            {
                forecast(Latitude, Longitude, (ForecastError, Message) => {

                    if(ForecastError)
                    {
                        res.send({ForecastError})
                    }
                    else
                    {
                        res.send({Address, Message, PlaceName});
                    }
                })
            }
        })
    }


    //res.send("Show Weather");
    /*
    res.send({
        forecast: "Sunny with a chance of Rain.",
        location: "New York",
        name: "Baltazar"
    })
    */

    /*
    const Address = req.query.address;

    if(!Address)
    {
        res.send({error: "Must provide an address."})
    }
    else
    {
        res.send({Address});
    }
    */
})

app.get("/product", (req,res)=> {
    if(!req.query.search) {
        return res.send({
            error: "you must provide a search term"
        })
    }
    

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    //res.send("Help article not found");
    res.render("error", {message: "Help article not found", title: "Not Found", name: "Baltazar"})
})

app.get("*", (req,res) => {
    //res.send("My 404 page");
    res.render("error", {message: "Page not found", title: "404", name: "Baltazar"})
})

app.listen(port, () => {
    console.log("Server is running on port 3000.")
})