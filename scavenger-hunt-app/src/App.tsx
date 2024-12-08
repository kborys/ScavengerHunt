import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet';
import { useState, useEffect } from 'react';
import './App.css';
import { divIcon } from 'leaflet';
import { QuestsOverlay } from './components/QuestsOverlay';
import { QuestProvider } from './contexts/QuestContext';
import { QuestWaypoints } from './components/QuestWaypoints';

function App() {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const [isQuestsOpen, setIsQuestsOpen] = useState(false);

  function LocationMarker() {
    const map = useMapEvents({});

    useEffect(() => {
      map
        .locate({ enableHighAccuracy: true, watch: true })
        .on('locationfound', function (e: L.LocationEvent) {
          map.flyTo(e.latlng, map.getZoom());
          setPosition(e.latlng);
        });
    }, [map]);

    const createLocationIcon = () => {
      return divIcon({
        className: 'location-marker',
        html: `
          <div class="location-marker__pulse"></div>
          <div class="location-marker__dot"></div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });
    };

    return position === null ? null : (
      <Marker position={position} icon={createLocationIcon()}>
        <Popup>Twoja lokalizacja</Popup>
      </Marker>
    );
  }

  return (
    <QuestProvider>
      <div className="app-container">
        <MapContainer
          center={[52.2297, 21.0122]}
          zoom={13}
          className="map-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
          <QuestWaypoints userPosition={position} />
        </MapContainer>

        <button
          className="btn btn--quests"
          onClick={() => setIsQuestsOpen(true)}
        >
          Pokaż questy
        </button>

        {isQuestsOpen && (
          <QuestsOverlay onClose={() => setIsQuestsOpen(false)} />
        )}
      </div>
    </QuestProvider>
  );
}

export default App;
