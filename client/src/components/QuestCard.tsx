// QuestCard.tsx
import React from "react";

interface QuestCardProps {
  title: string;
  description: string;
  progress: string;
  image: string;
}

const QuestCard: React.FC<QuestCardProps> = ({
  title,
  description,
  progress,
  image,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-6">
        <h4 className="font-bold text-blue-800 mb-2">{title}</h4>
        <p className="text-blue-600 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-500">Progress: {progress}</span>
          <i className="fa-solid fa-arrow-right text-blue-500"></i>
        </div>
      </div>
    </div>
  );
};

export default QuestCard;
