import * as React from "react";

interface QuestListProps {
  items: string[];
}

const QuestList: React.FC<QuestListProps> = ({ items }: QuestListProps) => {
  return (
    <ul className="quest-list">
      {items.map((quest: string, index: number) => (
        <li key={`${quest}-${index}`}>{quest}</li>
      ))}
    </ul>
  );
};

export default QuestList;
