const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: "fa-plus-circle",
      title: "New Task",
      description: "Create a new daily quest",
    },
    {
      icon: "fa-coins",
      title: "Budget",
      description: "Set daily spending limits",
    },
    {
      icon: "fa-chart-line",
      title: "Progress",
      description: "View your journey stats",
    },
    {
      icon: "fa-trophy",
      title: "Achievements",
      description: "Check your badges",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h3 className="text-2xl font-bold text-blue-800 mb-8">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {actions.map((action, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
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
