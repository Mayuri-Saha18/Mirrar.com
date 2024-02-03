function getData(){

    let city=document.getElementById("query").value;

    let url=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&appid=2a7417848e67bee949af373680eb9a6c`

    fetch(url)

    .then(function (res){
        return res.json();

    })
    .then(function (res){
        console.log(res);
        append(res);
    })
    .catch(function (err) {
        console.log(err);

        // display error message if city not found
    displayErrorMessage('City not found. Please enter a valid city name.');

    });
}

function append(data){
   
        let container=document.getElementById("container");
        container.innerHTML=null;

        let h2=document.createElement("h2");
        // searched city name 
        h2.innerText=data.city.name;

        let sunrise=document.createElement("p")
        let sunriseTimestamp = data.city.sunrise;
        let sunsetTimestamp = data.city.sunset;
    
        // Convert timestamps to Date objects
        let sunriseDate = new Date(sunriseTimestamp * 1000);
        let sunsetDate = new Date(sunsetTimestamp * 1000);
    
        // Format sunrise and sunset times with AM/PM
        let sunriseTime = sunriseDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        let sunsetTime = sunsetDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    
        sunrise.innerText=`Sunrise:- ${sunriseTime} `;
    
        let sunset=document.createElement("p")
        sunset.innerText=`Sunset:- ${sunsetTime} `;

        let humidity=document.createElement("p")
        humidity.innerText=`Humidity:- ${data.list[0].main.humidity} %`;

        let temp=document.createElement("p")
        // convert to degree celcius
        temp.innerText=`Temp:- ${Math.ceil(data.list[0].main.temp-273.15)} °C`;

        let min_temp=document.createElement("p")
        min_temp.innerText=`Min Temp:- ${Math.ceil(data.list[0].main.temp_min-273.15)} °C`;

        let max_temp=document.createElement("p")
        max_temp.innerText=`Max Temp:- ${Math.ceil(data.list[0].main.temp_max-273.15)} °C`;

        let wea=document.createElement("p")
        wea.innerText=`Weather:- ${data.list[0].weather[0].description}`;

        let wind=document.createElement("p")
        wind.innerText=`Wind-Speed:- ${data.list[0].wind.speed} m/s`;

        container.append(h2,sunrise,sunset,humidity,temp,min_temp,max_temp,wea,wind);
    

}

function displayErrorMessage(message) {

            let errorContainer = document.getElementById("container");
            errorContainer.innerHTML = `<p class="error">${message}</p>`;

        }



