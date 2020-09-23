window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureFeels = document.querySelector('.temperature-feels');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `https://fcc-weather-api.freecodecamp.repl.co/api/current?lat=${lat}&lon=${long}`;
            fetch(api)
            .then(response =>{
                return response.json();

            })
            .then(data =>{
                console.log(data);
                const {temp} = data.main;
                const {feels_like} = data.main;
                const {description} = data.weather[0];
                //DOM api
                temperatureDegree.textContent = Math.floor(temp);
                temperatureDescription.textContent = description.toUpperCase();
                locationTimezone.textContent = data.name;
                temperatureFeels.textContent = Math.floor(feels_like);



                // change C to F
                let fahrenheit = (temp * 9/5)+32;
                let fahrenheitFeels = (feels_like * 9/5)+32;

            temperatureSection.addEventListener('click', ()=>{
                if(temperatureSpan.textContent === "C"){
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = Math.floor(fahrenheit);
                    temperatureFeels.textContent = Math.floor(fahrenheitFeels);
                }else{
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor(temp);
                    temperatureFeels.textContent = Math.floor(feels_like);


                }
            });

            });
        
        });
        
    }



});