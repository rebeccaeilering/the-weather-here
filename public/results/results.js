// Making map and tiles
const mymap = L.map('checkinMap').setView([39.7817213, -89.6501481], 7);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">Open Street Map</a> contributors';
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileURL, {
  attribution
});
tiles.addTo(mymap);

getData();

async function getData() {
  const response = await fetch('/api');
  const data = await response.json();

  for (item of data) {

    const marker = L.marker([item.lat, item.lon]).addTo(mymap);
    let txt = `The weather here at ${item.lat}&deg; ${item.lon}&deg; on ${item.date} is ${item.weather.summary} with a temprature of ${item.weather.temperature.toFixed(0)} &deg; F.`;

    if (item.air.value < 0) {
      txt += ' No air quality reading.'
    } else {
      txt += ` The concentration of particulate matter (${item.air.parameter}) in the air is ${item.air.value} ${item.air.unit} last read on ${item.air.lastUpdated}.`
    }

    marker.bindPopup(txt);
  }
  console.log(data);
}