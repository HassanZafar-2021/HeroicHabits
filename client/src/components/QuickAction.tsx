const QuickActions: React.FC = () => {
  const actions = [
    {
      id: "new-task",
      icon: "fa-plus-circle",
      title: "New Task",
      description: "Create a new daily quest",
    },
    {
      id: "budget",
      icon: "fa-coins",
      title: "Budget",
      description: "Set daily spending limits",
    },
    {
      id: "progress",
      icon: "fa-chart-line",
      title: "Progress",
      description: "View your journey stats",
    },
    {
      id: "achievements",
      icon: "fa-trophy",
      title: "Achievements",
      description: "Check your badges",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {actions.map((action) => (
            <div
              key={action.id}
            >
              <i
                className={`fa-solid ${action.icon} text-blue-600 text-3xl mb-4`}
              ></i>
              <h4 className="font-bold text-blue-800 mb-2">{action.title}</h4>
              <p className="text-blue-600 text-sm">{action.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
