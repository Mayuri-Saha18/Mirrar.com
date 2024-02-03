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
        
    
        let weatherIconCode = data.list[0].weather[0].icon;
        let weatherIcon = document.createElement("img");
        weatherIcon.src = `http://openweathermap.org/img/w/${weatherIconCode}.png`;
        weatherIcon.alt = wea;
    
                                    
        wea.innerText = `Weather:- ${data.list[0].weather[0].description}`;
        wea.appendChild(weatherIcon);
    
        let wind=document.createElement("p")
        wind.innerText=`Wind-Speed:- ${data.list[0].wind.speed} m/s`;
    
        let weatherReport = document.getElementById("weatherReport");
        weatherReport.innerHTML = ''; // Clear previous content
    
        // upto day 7 weather forecast
    
                for (let i = 0; i < 7; i++) {
                    let box = document.createElement("div");
                    let day = document.createElement("p");
                    let date = new Date(data.list[i].dt * 1000);
                    day.innerText = `Day ${i + 1} (${date.toDateString()})`;
    
                    let tmax = document.createElement("p");
                    tmax.innerText = `Max Temp:- ${Math.ceil(data.list[i].main.temp_max - 273.15)} °C`;
    
                    let tmin = document.createElement("p");
                    tmin.innerText = `Min Temp:- ${Math.ceil(data.list[i].main.temp_min - 273.15)} °C`;
    
                    let weatherDesc = document.createElement("p");
                    let weatherIconCodeDay = data.list[i].weather[0].icon;
                    let weatherIconDay = document.createElement("img");
                    weatherIconDay.src = `http://openweathermap.org/img/w/${weatherIconCodeDay}.png`;
                    weatherIconDay.alt = data.list[i].weather[0].description;
                    weatherDesc.innerText = `Weather:- ${data.list[i].weather[0].description}`;
                    weatherDesc.appendChild(weatherIconDay);
    
                    box.append(day, tmax, tmin, weatherDesc);
                    weatherReport.appendChild(box);
                }
    
        container.append(h2,sunrise,sunset,humidity,temp,min_temp,max_temp,wea,wind);
       
    
    
    }
    
    function displayErrorMessage(message) {
    
            let errorContainer = document.getElementById("container");
            errorContainer.innerHTML = `<p class="error">${message}</p>`;
    
        }
    