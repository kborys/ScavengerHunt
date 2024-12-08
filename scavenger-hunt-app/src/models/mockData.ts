import { Quest } from './Quest';

export const mockQuests: Quest[] = [
  {
    id: '1',
    name: 'Odkryj Stare Miasto',
    description: 'Fascynująca wycieczka po zabytkach Starego Miasta',
    difficulty: 'medium',
    estimatedTime: 120,
    isActive: false,
    isCompleted: false,
    createdAt: new Date(),
    waypoints: [
      {
        id: 'w1',
        name: 'Rynek Główny',
        description: 'Znajdź fontannę na środku rynku',
        latitude: 52.2297,
        longitude: 21.0122,
        order: 1,
        isCompleted: false
      },
      {
        id: 'w2',
        name: 'Kościół Mariacki',
        description: 'Posłuchaj hejnału z wieży',
        latitude: 52.2299,
        longitude: 21.0125,
        order: 2,
        isCompleted: false
      }
    ]
  },
  {
    id: '2',
    name: 'Szlakiem Parków',
    description: 'Poznaj najpiękniejsze parki w mieście',
    difficulty: 'easy',
    estimatedTime: 90,
    isActive: false,
    isCompleted: false,
    createdAt: new Date(),
    waypoints: [
      {
        id: 'w3',
        name: 'Park Łazienkowski',
        description: 'Znajdź pomnik Chopina',
        latitude: 52.2151,
        longitude: 21.0353,
        order: 1,
        isCompleted: false
      },
      {
        id: 'w4',
        name: 'Park Ujazdowski',
        description: 'Odwiedź starą fontannę',
        latitude: 52.2229,
        longitude: 21.0279,
        order: 2,
        isCompleted: false
      }
    ]
  }
]; 