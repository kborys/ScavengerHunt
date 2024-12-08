import { createContext, useContext, useState, ReactNode } from 'react';
import { Quest } from '../models/Quest';

interface QuestContextType {
  activeQuest: Quest | null;
  setActiveQuest: (quest: Quest | null) => void;
}

const QuestContext = createContext<QuestContextType | undefined>(undefined);

export function QuestProvider({ children }: { children: ReactNode }) {
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);

  return (
    <QuestContext.Provider value={{ activeQuest, setActiveQuest }}>
      {children}
    </QuestContext.Provider>
  );
}

export function useQuest() {
  const context = useContext(QuestContext);
  if (context === undefined) {
    throw new Error('useQuest must be used within a QuestProvider');
  }
  return context;
} 