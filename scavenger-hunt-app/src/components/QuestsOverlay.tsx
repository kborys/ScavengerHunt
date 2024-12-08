import { useState, useEffect } from 'react';
import { Quest } from '../models/Quest';
import { QuestService } from '../services/questService';
import { useQuest } from '../contexts/QuestContext';

interface QuestsOverlayProps {
  onClose: () => void;
}

export function QuestsOverlay({ onClose }: QuestsOverlayProps) {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { activeQuest, setActiveQuest } = useQuest();

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const data = await QuestService.getAllQuests();
        setQuests(data);
      } catch (error) {
        setError(`Nie udało się pobrać questów: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
  }, []);

  const handleStartQuest = (quest: Quest) => {
    setActiveQuest(quest);
    onClose();
  };

  if (loading)
    return (
      <div className="quest-overlay">
        <button className="btn btn--close" onClick={onClose}>
          &times;
        </button>
        <div>Ładowanie questów...</div>
      </div>
    );

  if (error)
    return (
      <div className="quest-overlay">
        <button className="btn btn--close" onClick={onClose}>
          &times;
        </button>
        <div>Błąd: {error}</div>
      </div>
    );

  return (
    <div className="quest-overlay">
      <button className="btn btn--close" onClick={onClose}>
        &times;
      </button>
      <h2>Dostępne Questy</h2>

      {quests.map((quest) => (
        <div key={quest.id} className="quest-card">
          <h3 className="quest-card__title">{quest.name}</h3>
          <span
            className={`quest-card__difficulty quest-card__difficulty--${quest.difficulty}`}
          >
            {quest.difficulty.toUpperCase()}
          </span>
          <p>{quest.description}</p>
          <p>Czas: {quest.estimatedTime} minut</p>
          <p>Punkty: {quest.waypoints.length}</p>
          <button
            onClick={() => handleStartQuest(quest)}
            className={`btn btn--start-quest ${activeQuest?.id === quest.id ? 'is-active' : ''}`}
          >
            {activeQuest?.id === quest.id ? 'Aktywny' : 'Rozpocznij'}
          </button>
        </div>
      ))}
    </div>
  );
}
