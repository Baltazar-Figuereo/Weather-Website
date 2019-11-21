console.log("Client side javascript file");

// fetch("http://puzzle.mead.io/puzzle").then(result => result.json()).then(result => console.log(result));
// fetch("/weather?address=boston").catch(error => console.log(error)).then(result => result.json()).catch(error => console.log(error)).then(result => console.log(result));

const WeatherForm = document.querySelector("form");
const Search = document.querySelector("input");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

WeatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = Search.value;

    const Url = "/weather?address=" + location;

    //fetch(Url).catch(error => console.log(error)).then(result => result.json()).catch(error => console.log(error)).then(result => console.log(result));

    messageOne.textContent = "Loading...."
    messageTwo.textContent = "";

    fetch(Url).then(result => result.json()).then(result => {
        
        if(result.ErrorMessage)
        {
            //console.log(result.ErrorMessage);
            messageOne.textContent = result.ErrorMessage;
        }
        else if (result.GeoError)
        {
            messageOne.textContent = result.GeoError;
        }
        else
        {
            messageOne.textContent = result.PlaceName;
            messageTwo.textContent = result.Message;     
        }      
    });
})

