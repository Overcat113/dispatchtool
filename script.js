
let map = L.map('map').setView([39.433, -77.415], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

// Geocoder control
const geocoder = L.Control.geocoder({
  defaultMarkGeocode: false
}).on('markgeocode', function(e) {
  const center = e.geocode.center;
  L.marker(center).addTo(map).bindPopup(e.geocode.name).openPopup();
  map.setView(center, 13);
}).addTo(map);

// Clear markers button
document.getElementById('clearIncidentBtn').onclick = () => {
  map.eachLayer(layer => {
    if (layer instanceof L.Marker && !layer._url) {
      map.removeLayer(layer);
    }
  });
};

// Reset all
document.getElementById('resetBtn').onclick = () => {
  location.reload();
};

// Load incident types from CSV
fetch('incident_types.csv')
  .then(response => response.text())
  .then(data => {
    const rows = data.split('\n').slice(1);
    const select = document.getElementById('incidentTypeSelect');
    rows.forEach(row => {
      const cols = row.split(',');
      if (cols.length >= 2) {
        const option = document.createElement('option');
        option.value = cols[0];
        option.textContent = `${cols[0]} - ${cols[1]}`;
        select.appendChild(option);
      }
    });

    // Make dropdown searchable
    select.addEventListener('click', function() {
      this.size = Math.min(10, this.options.length);
    });
    select.addEventListener('blur', function() {
      this.size = 0;
    });
  });
