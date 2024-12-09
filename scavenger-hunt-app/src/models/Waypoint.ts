import { LatLng } from 'leaflet';

export interface Waypoint {
  id: string;
  name: string;
  description: string;
  position: LatLng;
  order: number;
  isCompleted: boolean;
}
