import polyline from '@mapbox/polyline';
import { LatLng } from 'leaflet';

enum RoutingStrategy {
  Foot = 'foot',
  Car = 'car',
  Bike = 'bike',
}

export class RouteService {
  private static routingStrategy = RoutingStrategy.Foot;

  private static readonly OSRM_URL = `http://router.project-osrm.org/route/v1/${this.routingStrategy}/`;

  static getRoutePolyline = async (start: LatLng, end: LatLng) => {
    const response = await fetch(
      `${this.OSRM_URL}${start.lng},${start.lat};${end.lng},${end.lat}?overview=full`,
    );
    const data = await response.json();
    const encodedPolyline = data.routes[0].geometry;
    return polyline.decode(encodedPolyline);
  };
}
