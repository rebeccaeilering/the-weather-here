  let lat, lon;
  if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
      let lat, lon, weather, air, date;
      try {
        date = new Date().toLocaleDateString();
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        const api_url = `weather/${lat},${lon}`;
        const response = await fetch(api_url);
        const json = await response.json();
        weather = json.weather.currently;
        air = json.air_quality.results[0].measurements[0];
        document.getElementById('weather').textContent = `The weather here at ${lat.toFixed(2)}, ${lon.toFixed(2)} on ${date} is ${weather.summary} with a temprature of ${weather.temperature.toFixed()} degrees F. The concentration of particulate matter (${air.parameter}) in the air is ${air.value}${air.unit} last read on ${air.lastUpdated}.`;
      } catch (error) {
        air = {value: -1};
        if (air.value < 0) {
        document.getElementById('weather').textContent = `The weather here at ${lat.toFixed(2)}, ${lon.toFixed(2)} on ${date} is ${weather.summary} with a temprature of ${weather.temperature.toFixed()} degrees F. No air quality reading.`;
       };
      };

      const data = {
        lat,
        lon,
        weather,
        air,
        date
      };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      const db_response = await fetch('/api', options);
      const db_json = await db_response.json();
      console.log(db_json);
    });
  } else {
    console.log('geolocation not available');
  }

  

