import { Marker, Polyline, Popup } from 'react-leaflet';
import L, { LatLngExpression } from 'leaflet';
import { useQuest } from '../contexts/QuestContext';
import { useEffect, useState } from 'react';
import { divIcon } from 'leaflet';
import { RouteService } from '../services/routeService';

const COMPLETION_RADIUS = 20; // 20 metrów

interface QuestWaypointsProps {
  userPosition: L.LatLng | null;
}

export function QuestWaypoints({ userPosition }: QuestWaypointsProps) {
  const { activeQuest, setActiveQuest } = useQuest();
  const [selectedWaypoint, setSelectedWaypoint] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [route, setRoute] = useState<LatLngExpression[]>([]);

  useEffect(() => {
    const getRouteWaypoints = async () => {
      const nextWaypoint = activeQuest?.waypoints
        .filter((wp) => !wp.isCompleted)
        .sort((a, b) => a.order - b.order)[0];

      if (
        userPosition === null ||
        nextWaypoint === null ||
        nextWaypoint === undefined
      ) {
        return;
      }

      const routePolyline = await RouteService.getRoutePolyline(
        userPosition,
        nextWaypoint.position,
      );

      setRoute(routePolyline);
    };

    getRouteWaypoints();
  }, [userPosition, activeQuest?.waypoints]);

  if (!activeQuest || !userPosition) return null;

  const handleCompleteWaypoint = (waypointId: string) => {
    if (!activeQuest) return;

    const updatedWaypoints = activeQuest.waypoints.map((wp) =>
      wp.id === waypointId ? { ...wp, isCompleted: true } : wp,
    );

    setActiveQuest({ ...activeQuest, waypoints: updatedWaypoints });
    setShowConfirmation(false);
    setSelectedWaypoint(null);
  };

  const nearbyWaypoints = activeQuest.waypoints.filter(
    (waypoint) =>
      !waypoint.isCompleted &&
      userPosition.distanceTo(waypoint.position) <= COMPLETION_RADIUS,
  );

  const createWaypointIcon = (order: number, isCompleted: boolean) => {
    const className = `waypoint-marker__icon ${isCompleted ? 'waypoint-marker__icon--completed' : ''}`;

    return divIcon({
      className: `waypoint-marker ${isCompleted ? 'waypoint-marker--completed' : ''}`,
      html: `<div class="${className}">${order}</div>`,
      iconSize: [25, 25],
      iconAnchor: [12.5, 12.5],
    });
  };

  return (
    <>
      {route && <Polyline positions={route} />}

      {nearbyWaypoints.length > 0 && (
        <div className="waypoint-notification">
          {nearbyWaypoints.map((waypoint) => (
            <div key={waypoint.id}>
              <button
                className="btn btn--waypoint"
                onClick={() => {
                  setSelectedWaypoint(waypoint.id);
                  setShowConfirmation(true);
                }}
              >
                Ukończ krok: {waypoint.name}
              </button>
            </div>
          ))}
        </div>
      )}

      {activeQuest.waypoints.map((waypoint) => (
        <Marker
          key={waypoint.id}
          position={waypoint.position}
          icon={createWaypointIcon(waypoint.order, waypoint.isCompleted)}
        >
          <Popup>
            <strong>{waypoint.name}</strong>
            <p>{waypoint.description}</p>
            {waypoint.isCompleted && (
              <p>
                <em>Ukończono!</em>
              </p>
            )}
          </Popup>
        </Marker>
      ))}

      {showConfirmation && selectedWaypoint && (
        <div className="waypoint-confirmation-overlay">
          <div className="waypoint-confirmation-modal">
            <h3>Potwierdzenie ukończenia</h3>
            <p>Czy na pewno ukończyłeś ten krok?</p>
            <p>
              <strong>Krok:</strong>{' '}
              {
                activeQuest.waypoints.find((wp) => wp.id === selectedWaypoint)
                  ?.description
              }
            </p>
            <div className="waypoint-confirmation-buttons">
              <button
                className="btn btn--cancel"
                onClick={() => {
                  setShowConfirmation(false);
                  setSelectedWaypoint(null);
                }}
              >
                Anuluj
              </button>
              <button
                className="btn btn--confirm"
                onClick={() => handleCompleteWaypoint(selectedWaypoint)}
              >
                Potwierdzam
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
