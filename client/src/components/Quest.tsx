import QuestCard from "./QuestCard";

const Quests: React.FC = () => {
  const quests = [
    {
      title: "Forest of Focus",
      description: "Complete daily meditation tasks",
      progress: "7/10",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/21abd35af0-a38af54f0951f27fd82f.png",
    },
    {
      title: "Peak Performance",
      description: "Fitness goals tracking",
      progress: "5/10",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/1acceabec3-38d674ae3a94cf57bab5.png",
    },
    {
      title: "Crystal Clarity",
      description: "Mind training exercises",
      progress: "3/10",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/5fb43c4e64-b880b55f8bd39b4fb40a.png",
    },
  ];

  return (
    <section className="py-16 container mx-auto px-6">
      <h3 className="text-2xl font-bold text-blue-800 mb-8">
        Your Active Quests
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {quests.map((quest) => (
          <QuestCard key={quest.title} {...quest} />
        ))}
      </div>
    </section>
  );
};

export default Quests;
