import { key as apikey } from './helpers/key.js';
import uvhelper from './helpers/uvray.js';

// DOM Selectors for UI interaction
const getlocation = document.getElementById("getlocation");
const showcurrentlocData = document.getElementById("showcurrentlocData");
const uvrayis = document.getElementById("uvray");
const icon = document.getElementById("icon");

// Creating elements dynamically to display weather info
const paragraph = document.createElement("p");
const image = document.createElement("img");
const uvrayparagraph = document.createElement("p");
uvrayparagraph.className = "uv-status";

// Callback function executed on successful geolocation
async function pass(su) {
    // Destructuring latitude and longitude from the GeolocationPosition object
    const { coords: { latitude: lat, longitude: lon } } = su;
    
    try {
        // Fetching weather data from WeatherAPI using coordinates
        const fetchweather = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${lat},${lon}&aqi=no`);
        const datais = await fetchweather.json();

        // Showing DOM elements once data is received
        paragraph.style.display = "block";
        uvrayis.style.display = "block";
        image.style.display = "block";

        showcurrentlocData.className = "weather-card active-card";

        // Injecting weather details into the paragraph element
        paragraph.innerHTML = `
        <div class="weather-info">
            <h3>${datais.location.name}, ${datais.location.region}</h3> 
            <div class="stat-box blue">Temperature: <b>${datais.current.temp_c}°C</b></div>
            <div class="stat-box green">Condition: <b>${datais.current.condition.text}</b></div>
            <div class="stat-box blue">Humidity: <b>${datais.current.humidity}%</b></div>
            <div class="stat-box green">Wind Speed: <b>${datais.current.wind_kph} km/h</b></div>
            <div class="stat-box blue">UV Index: <b>${datais.current.uv}</b></div>
        </div>`;

        // Setting image source and processing UV index via your helper
        image.src = datais.current.condition.icon;
        
        const { uvIndex, condition, color } = uvhelper(datais.current.uv);
        uvrayparagraph.style.backgroundColor = color;
        uvrayparagraph.innerHTML = `<b>${uvIndex}</b>, ${condition}`;

        // Appending elements to the container
        icon.prepend(image);
        showcurrentlocData.append(paragraph);
        uvrayis.append(uvrayparagraph);
        getlocation.style.display = "none";

    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Callback function executed if geolocation fails or is denied
async function fail(fu) {
    // Hiding initial weather UI
    getlocation.style.display = "none";
    showcurrentlocData.style.display = "none";
    paragraph.style.display = "none";
    uvrayis.style.display = "none";
    image.style.display = "none";

    // Creating fallback UI (manual city input)
    let appendbutton = document.getElementById("button");
    let input = document.createElement("input");
    input.id = "cityInput";
    input.placeholder = "Enter Your city Name";
    input.className = "city-input";

    let label = document.createElement("label");
    label.innerText = "Enter City name: ";
    label.htmlFor = "cityInput";
    label.className = "city-label";

    let button = document.createElement("button");
    button.innerText = "Submit";
    button.className = "submit-btn";

    showcurrentlocData.className = "weather-card fallback-card";
    showcurrentlocData.style.display = "block";

    // Injecting fallback controls into the DOM
    showcurrentlocData.prepend(input);
    showcurrentlocData.prepend(label);
    appendbutton.append(button);

    // Initial state for fallback UI
    paragraph.style.display = "none";
    uvrayis.style.display = "none";
    image.style.display = "none";

    // Event listener for manual search
    button.addEventListener('click', async () => {
        try {
            const cityName = input.value;
            // Fetching data for the specific city provided
            const worker = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${cityName}&aqi=no`);
            const datais = await worker.json();
            const warning = document.getElementById("warning");

            // Error handling for invalid location names using Safe Optional Chaining
            if (datais.error?.code === 1006) {
                // Case 1: Agar city name galat hai
                paragraph.style.display = "none";
                uvrayis.style.display = "none";
                image.style.display = "none";

                warning.innerText = "Please enter a correct city name!";
                warning.className = "warning-text";

            } else if (datais.error?.code === 2006 || datais.error?.code === 1002) {
                // Case 2: Agar API Key galat hai ya missing hai
                paragraph.style.display = "none";
                uvrayis.style.display = "none";
                image.style.display = "none";

                warning.innerText = "Developer Alert: Invalid or Missing API Key!";
                warning.className = "warning-text api-error";
                
            } else {
                // Displaying result for the manual search
                warning.style.display = "none";
                paragraph.style.display = "block";
                uvrayis.style.display = "block";
                image.style.display = "block";

                showcurrentlocData.className = "weather-card active-card";

                paragraph.innerHTML = `
                <div class="weather-info">
                    <h3>${datais.location.name}, ${datais.location.region}</h3> 
                    <div class="stat-box blue">Temperature: <b>${datais.current.temp_c}°C</b></div>
                    <div class="stat-box green">Condition: <b>${datais.current.condition.text}</b></div>
                    <div class="stat-box blue">Humidity: <b>${datais.current.humidity}%</b></div>
                    <div class="stat-box green">Wind Speed: <b>${datais.current.wind_kph} km/h</b></div>
                    <div class="stat-box blue">UV Index: <b>${datais.current.uv}</b></div>
                </div>`;

                image.src = datais.current.condition.icon;
                
                const { uvIndex, condition, color } = uvhelper(datais.current.uv);
                uvrayparagraph.style.backgroundColor = color;
                uvrayparagraph.innerHTML = `<b>${uvIndex}</b>, ${condition}`;

                icon.prepend(image);
                showcurrentlocData.append(paragraph);
                uvrayis.append(uvrayparagraph);
                getlocation.style.display = "none";
            }
        } catch (error) {
            console.error("Error fetching manual location data:", error);
        }
    });
}

// Triggering Geolocation on button click
getlocation.addEventListener('click', () => {
    // Geolocation options for accuracy and timeout management
    const option = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };
    // Initiating the browser's Geolocation API
    navigator.geolocation.watchPosition(pass, fail, option);
});
