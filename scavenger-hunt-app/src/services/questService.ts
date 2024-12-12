import { Quest } from '../models/Quest';

const API_BASE_URL = 'http://192.168.100.10:5062';

export class QuestService {
  static async getAllQuests(): Promise<Quest[]> {
    const response = await fetch(`${API_BASE_URL}/quests`);
    if (!response.ok) {
      throw new Error('Failed to fetch quests');
    }
    return response.json();
  }

  static async getQuestById(id: string): Promise<Quest | undefined> {
    const response = await fetch(`${API_BASE_URL}/quests/${id}`);
    if (!response.ok) {
      throw new Error(`Quest with ID ${id} not found`);
    }
    return response.json();
  }

  static async updateQuestStatus(
    questId: string,
    isCompleted: boolean,
  ): Promise<Quest | undefined> {
    const response = await fetch(`${API_BASE_URL}/quests/${questId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isCompleted }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update quest status for ID ${questId}`);
    }

    return response.json();
  }

  static async completeWaypoint(
    questId: string,
    waypointId: string,
  ): Promise<Quest | undefined> {
    const response = await fetch(
      `${API_BASE_URL}/quests/${questId}/waypoints/${waypointId}/complete`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to update waypoint status for ID ${waypointId} in quest ${questId}`,
      );
    }

    return response.json();
  }
}
