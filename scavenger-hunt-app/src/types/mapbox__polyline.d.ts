declare module '@mapbox/polyline' {
  import { LatLngExpression } from 'leaflet';

  /**
   * Decodes a polyline string into an array of [latitude, longitude] pairs.
   * @param polyline - The encoded polyline string.
   * @param precision - The precision factor (default is 5 for OSRM).
   * @returns An array of [latitude, longitude] pairs.
   */
  export function decode(
    polyline: string,
    precision?: number,
  ): LatLngExpression[];

  /**
   * Encodes an array of [latitude, longitude] pairs into a polyline string.
   * @param coordinates - An array of [latitude, longitude] pairs.
   * @param precision - The precision factor (default is 5 for OSRM).
   * @returns The encoded polyline string.
   */
  export function encode(
    coordinates: LatLngExpression[],
    precision?: number,
  ): string;
}
