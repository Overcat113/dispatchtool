
let map = L.map('map').setView([39.433, -77.415], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

const geocoder = L.Control.geocoder({
  defaultMarkGeocode: false
})
.on('markgeocode', function(e) {
  const center = e.geocode.center;
  L.marker(center).addTo(map).bindPopup(e.geocode.name).openPopup();
  map.setView(center, 13);
})
.addTo(map);

document.getElementById('resetBtn').onclick = () => {
  location.reload();
};

document.getElementById('clearIncidentBtn').onclick = () => {
  map.eachLayer(layer => {
    if (layer instanceof L.Marker && !layer._url) {
      map.removeLayer(layer);
    }
  });
};
