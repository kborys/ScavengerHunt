import { Quest } from '../models/Quest';
import { mockQuests } from '../models/mockData';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class QuestService {
  static async getAllQuests(): Promise<Quest[]> {
    await delay(800);
    return mockQuests;
  }

  static async getQuestById(id: string): Promise<Quest | undefined> {
    await delay(500);
    return mockQuests.find((quest) => quest.id === id);
  }

  static async updateQuestStatus(
    questId: string,
    isCompleted: boolean,
  ): Promise<Quest | undefined> {
    await delay(300);
    const questIndex = mockQuests.findIndex((quest) => quest.id === questId);

    if (questIndex === -1) return undefined;

    mockQuests[questIndex] = {
      ...mockQuests[questIndex],
      isCompleted,
    };

    return mockQuests[questIndex];
  }

  static async updateWaypointStatus(
    questId: string,
    waypointId: string,
    isCompleted: boolean,
  ): Promise<Quest | undefined> {
    await delay(300);
    const questIndex = mockQuests.findIndex((quest) => quest.id === questId);

    if (questIndex === -1) return undefined;

    const quest = mockQuests[questIndex];
    const waypointIndex = quest.waypoints.findIndex(
      (wp) => wp.id === waypointId,
    );

    if (waypointIndex === -1) return undefined;

    const updatedWaypoints = [...quest.waypoints];
    updatedWaypoints[waypointIndex] = {
      ...updatedWaypoints[waypointIndex],
      isCompleted,
    };

    mockQuests[questIndex] = {
      ...quest,
      waypoints: updatedWaypoints,
    };

    return mockQuests[questIndex];
  }
}
