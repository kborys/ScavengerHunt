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
  const [isFollowing, setIsFollowing] = useState<boolean>(true);

  function LocationMarker() {
    const map = useMapEvents({});

    useEffect(() => {
      map
        .locate({ enableHighAccuracy: false, watch: true })
        .on('locationfound', function (e: L.LocationEvent) {
          setPosition(e.latlng);
        });
    }, [map]);

    useEffect(() => {
      if (position === null || !isFollowing) return;

      const timeoutId = setTimeout(() => {
        if (
          map.getCenter().lat !== position.lat ||
          map.getCenter().lng !== position.lng
        ) {
          map.setView(position);
        }
      }, 500);

      return () => clearTimeout(timeoutId); // Czyszczenie timeoutu
    }, [position]);

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
          zoom={20}
          center={[52.2297, 21.0122]}
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

        <button
          className="btn btn--follow"
          onClick={() => setIsFollowing(!isFollowing)}
        >
          {isFollowing ? 'Nie śledź' : 'Śledź'}
        </button>

        {isQuestsOpen && (
          <QuestsOverlay onClose={() => setIsQuestsOpen(false)} />
        )}
      </div>
    </QuestProvider>
  );
}

export default App;
